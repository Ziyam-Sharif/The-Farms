import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { User } from '../models/User';
import {
  generateAccessToken,
  generateRefreshToken,
  setRefreshTokenCookie,
  clearRefreshTokenCookie,
  JwtPayload,
} from '../middlewares/auth';
import { env } from '../config/env';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, phone, role } = req.body;

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email already exists',
        error: { code: 'EMAIL_EXISTS' },
      });
    }

    // Default to 'customer' unless specified (in production, admin creation is restricted)
    const userRole = role && ['admin', 'editor', 'customer'].includes(role) ? role : 'customer';

    const user = new User({
      name,
      email: email.toLowerCase(),
      passwordHash: password, // Pre-save hook hashes this
      phone,
      role: userRole,
    });

    await user.save();

    const payload: JwtPayload = {
      userId: user._id.toString(),
      role: user.role,
      tokenVersion: user.refreshTokenVersion,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    setRefreshTokenCookie(res, refreshToken);

    return res.status(201).json({
      success: true,
      message: 'Account registered successfully',
      data: {
        user: user.toJSON(),
        accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
        error: { code: 'INVALID_CREDENTIALS' },
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
        error: { code: 'INVALID_CREDENTIALS' },
      });
    }

    const payload: JwtPayload = {
      userId: user._id.toString(),
      role: user.role,
      tokenVersion: user.refreshTokenVersion,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    setRefreshTokenCookie(res, refreshToken);

    return res.json({
      success: true,
      message: 'Logged in successfully',
      data: {
        user: user.toJSON(),
        accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token missing',
        error: { code: 'REFRESH_TOKEN_REQUIRED' },
      });
    }

    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as JwtPayload;
    } catch {
      clearRefreshTokenCookie(res);
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired refresh token',
        error: { code: 'INVALID_REFRESH_TOKEN' },
      });
    }

    const user = await User.findById(decoded.userId);
    if (!user || user.refreshTokenVersion !== decoded.tokenVersion) {
      clearRefreshTokenCookie(res);
      return res.status(401).json({
        success: false,
        message: 'Refresh token revoked or invalid',
        error: { code: 'TOKEN_REVOKED' },
      });
    }

    // Refresh token rotation: issue new pair
    const payload: JwtPayload = {
      userId: user._id.toString(),
      role: user.role,
      tokenVersion: user.refreshTokenVersion,
    };

    const newAccessToken = generateAccessToken(payload);
    const newRefreshToken = generateRefreshToken(payload);
    setRefreshTokenCookie(res, newRefreshToken);

    return res.json({
      success: true,
      data: {
        accessToken: newAccessToken,
        user: user.toJSON(),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (_req: Request, res: Response) => {
  clearRefreshTokenCookie(res);
  return res.json({
    success: true,
    message: 'Logged out successfully',
  });
};

export const logoutAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) return res.status(401).json({ success: false, message: 'Unauthorized' });

    const user = await User.findById(req.user.userId);
    if (user) {
      user.refreshTokenVersion += 1;
      await user.save();
    }

    clearRefreshTokenCookie(res);
    return res.json({
      success: true,
      message: 'Logged out of all devices successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });

    if (user) {
      const resetToken = crypto.randomBytes(32).toString('hex');
      user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
      user.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
      await user.save();

      // Stub email sending logic
      console.log(`[Stub Email] Reset password token for ${email}: ${resetToken}`);
    }

    // Always return success to avoid user enumeration
    return res.json({
      success: true,
      message: 'If an account exists with that email, a password reset link has been sent.',
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token, password } = req.body;
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired password reset token',
        error: { code: 'INVALID_RESET_TOKEN' },
      });
    }

    user.passwordHash = password; // Pre-save hook will hash
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    user.refreshTokenVersion += 1; // Invalidate current sessions
    await user.save();

    return res.json({
      success: true,
      message: 'Password reset successfully. Please log in with your new password.',
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) return res.status(401).json({ success: false, message: 'Unauthorized' });

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.json({
      success: true,
      data: { user: user.toJSON() },
    });
  } catch (error) {
    next(error);
  }
};
