import { Request, Response, NextFunction } from 'express';
import { Review } from '../models/Review';
import { Product } from '../models/Product';

export const getProductReviews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ product: productId, isApproved: true })
      .sort({ createdAt: -1 })
      .populate('user', 'name');

    return res.json({ success: true, data: { reviews } });
  } catch (error) {
    next(error);
  }
};

export const createReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.params;
    const { rating, title, body } = req.body;

    if (!req.user) return res.status(401).json({ success: false, message: 'Unauthorized' });

    const review = new Review({
      product: productId,
      user: req.user.userId,
      rating,
      title,
      body,
      isApproved: false, // Moderated by default
    });

    await review.save();

    return res.status(201).json({
      success: true,
      message: 'Review submitted for moderation. Thank you!',
      data: { review },
    });
  } catch (error) {
    next(error);
  }
};

export const approveReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const review = await Review.findByIdAndUpdate(id, { isApproved: true }, { new: true });

    if (!review) return res.status(404).json({ success: false, message: 'Review not found' });

    // Recalculate ratingAvg & ratingCount on Product
    const approvedReviews = await Review.find({ product: review.product, isApproved: true });
    const count = approvedReviews.length;
    const avg = count > 0 ? approvedReviews.reduce((sum, r) => sum + r.rating, 0) / count : 0;

    await Product.findByIdAndUpdate(review.product, {
      ratingAvg: Math.round(avg * 10) / 10,
      ratingCount: count,
    });

    return res.json({ success: true, message: 'Review approved successfully', data: { review } });
  } catch (error) {
    next(error);
  }
};
