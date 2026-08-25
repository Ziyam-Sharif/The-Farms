import mongoose, { Schema, Document } from 'mongoose';
import { IAuditLog } from '@farms/shared-types';

export interface IAuditLogDocument extends Omit<IAuditLog, '_id' | 'timestamp' | 'actor'>, Document {
  actor: mongoose.Types.ObjectId;
  timestamp: Date;
}

const AuditLogSchema = new Schema<IAuditLogDocument>(
  {
    actor: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    action: { type: String, required: true, index: true },
    target: { type: String, required: true },
    metadata: { type: Schema.Types.Mixed },
    ip: { type: String },
    timestamp: { type: Date, default: Date.now, index: true },
  },
  { timestamps: false }
);

export const AuditLog = mongoose.model<IAuditLogDocument>('AuditLog', AuditLogSchema);
