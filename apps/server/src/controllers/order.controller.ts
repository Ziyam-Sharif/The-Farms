import { Request, Response, NextFunction } from 'express';
import { Order } from '../models/Order';
import { Product } from '../models/Product';
import { AuditLog } from '../models/AuditLog';

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { items: clientItems, shippingAddress, paymentMethod } = req.body;

    if (!clientItems || !Array.isArray(clientItems) || clientItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart items are required to place an order',
      });
    }

    // Security: Recalculate totals server-side from database prices
    let subtotal = 0;
    const validatedItems = [];

    for (const item of clientItems) {
      let dbProduct = null;
      if (item.product && typeof item.product === 'string' && item.product.match(/^[0-9a-fA-F]{24}$/)) {
        dbProduct = await Product.findById(item.product);
      }
      if (!dbProduct) {
        dbProduct = await Product.findOne({
          $or: [
            { slug: item.product },
            { sku: item.product },
            { title: new RegExp(`^${item.title || item.product}$`, 'i') },
            { title: new RegExp(`.*${item.title || item.product}.*`, 'i') },
          ],
        });
      }
      if (!dbProduct || !dbProduct.isActive) {
        return res.status(400).json({
          success: false,
          message: `Product "${item.title || item.product}" is currently unavailable`,
        });
      }

      if (dbProduct.stock < item.qty) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${dbProduct.title}. Available: ${dbProduct.stock}`,
        });
      }

      const itemTotal = dbProduct.price * item.qty;
      subtotal += itemTotal;

      validatedItems.push({
        product: dbProduct._id,
        title: dbProduct.title,
        price: dbProduct.price,
        qty: item.qty,
        image: dbProduct.images[0]?.url || '',
      });

      // Deduct stock
      dbProduct.stock -= item.qty;
      await dbProduct.save();
    }

    const shipping = subtotal >= 2000 ? 0 : 200; // Free shipping over PKR 2000
    const tax = 0; // Tax included
    const total = subtotal + shipping + tax;

    // Generate unique order number (e.g. PK-FARMS-100234)
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const orderNumber = `FARMS-${randomNum}`;

    const order = new Order({
      orderNumber,
      user: req.user ? req.user.userId : undefined,
      items: validatedItems,
      shippingAddress,
      subtotal,
      shipping,
      tax,
      total,
      paymentMethod,
      paymentStatus: paymentMethod === 'COD' ? 'pending' : 'pending',
      orderStatus: 'placed',
      statusHistory: [
        {
          status: 'placed',
          timestamp: new Date().toISOString(),
          note: 'Order placed by customer',
        },
      ],
    });

    await order.save();

    return res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: { order },
    });
  } catch (error) {
    next(error);
  }
};

export const getOrderByNumber = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { orderNumber } = req.params;
    const { email, phone } = req.query;

    const order = await Order.findOne({ orderNumber }).populate('items.product');

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Verify phone or email matches for guest access control
    if (phone && order.shippingAddress.phone !== phone) {
      return res.status(403).json({ success: false, message: 'Verification details do not match' });
    }

    return res.json({
      success: true,
      data: { order },
    });
  } catch (error) {
    next(error);
  }
};

export const getAdminOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status, page = '1', limit = '20' } = req.query;
    const query: any = {};

    if (status) {
      query.orderStatus = status;
    }

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const skip = (pageNum - 1) * limitNum;

    const [orders, total] = await Promise.all([
      Order.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum).populate('user', 'name email'),
      Order.countDocuments(query),
    ]);

    return res.json({
      success: true,
      data: {
        orders,
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { status, note } = req.body;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    order.orderStatus = status;
    order.statusHistory.push({
      status,
      changedBy: req.user ? (req.user.userId as any) : undefined,
      timestamp: new Date().toISOString() as any,
      note,
    });

    if (status === 'delivered') {
      order.paymentStatus = 'paid';
    }

    await order.save();

    if (req.user) {
      await AuditLog.create({
        actor: req.user.userId,
        action: 'UPDATE_ORDER_STATUS',
        target: `Order:${order.orderNumber}`,
        metadata: { status, note },
      });
    }

    return res.json({
      success: true,
      message: `Order status updated to ${status}`,
      data: { order },
    });
  } catch (error) {
    next(error);
  }
};
