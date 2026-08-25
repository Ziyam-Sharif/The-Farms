import { Request, Response, NextFunction } from 'express';
import { Category } from '../models/Category';

export const getCategories = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    return res.json({ success: true, data: { categories } });
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = new Category(req.body);
    await category.save();
    return res.status(201).json({ success: true, data: { category } });
  } catch (error) {
    next(error);
  }
};
