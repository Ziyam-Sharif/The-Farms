import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser, UserRole } from '@farms/shared-types';

export interface IUserDocument extends Omit<IUser, '_id' | 'createdAt' | 'updatedAt'>, Document {
  passwordHash: string;
  verificationToken?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const AddressSchema = new Schema({
  label: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  province: { type: String, required: true },
  isDefault: { type: Boolean, default: false },
});

const UserSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    passwordHash: { type: String, required: true },
    phone: { type: String, trim: true },
    role: { type: String, enum: ['customer', 'admin', 'editor'], default: 'customer' },
    addresses: [AddressSchema],
    refreshTokenVersion: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
  },
  {
    timestamps: true,
  }
);

// Pre-save password hashing hook
UserSchema.pre('save', async function (next) {
  if (!this.isModified('passwordHash')) return next();
  try {
    const salt = await bcrypt.genSalt(12);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
    next();
  } catch (err: any) {
    next(err);
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

// Safe JSON serialization
UserSchema.set('toJSON', {
  transform: (_doc, ret: any) => {
    delete ret.passwordHash;
    delete ret.verificationToken;
    delete ret.resetPasswordToken;
    delete ret.resetPasswordExpires;
    delete ret.__v;
    return ret;
  },
});

export const User = mongoose.model<IUserDocument>('User', UserSchema);
