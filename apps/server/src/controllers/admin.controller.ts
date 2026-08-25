import { Request, Response, NextFunction } from 'express';
import { Order } from '../models/Order';
import { Product } from '../models/Product';
import { User } from '../models/User';
import { AuditLog } from '../models/AuditLog';

export const getDashboardStats = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const [totalOrders, totalRevenueData, totalProducts, lowStockProducts, totalCustomers] =
      await Promise.all([
        Order.countDocuments(),
        Order.aggregate([
          { $match: { paymentStatus: 'paid' } },
          { $group: { _id: null, total: { $sum: '$total' } } },
        ]),
        Product.countDocuments({ isActive: true }),
        Product.find({ stock: { $lte: 10 } }).select('title stock sku images'),
        User.countDocuments({ role: 'customer' }),
      ]);

    const totalRevenue = totalRevenueData[0]?.total || 0;
    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5).populate('user', 'name');

    return res.json({
      success: true,
      data: {
        stats: {
          totalOrders,
          totalRevenue,
          totalProducts,
          totalCustomers,
          lowStockCount: lowStockProducts.length,
        },
        lowStockProducts,
        recentOrders,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getAuditLogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = '1', limit = '30' } = req.query;
    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);

    const [logs, total] = await Promise.all([
      AuditLog.find()
        .sort({ timestamp: -1 })
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum)
        .populate('actor', 'name email role'),
      AuditLog.countDocuments(),
    ]);

    return res.json({
      success: true,
      data: { logs, total, page: pageNum, totalPages: Math.ceil(total / limitNum) },
    });
  } catch (error) {
    next(error);
  }
};
