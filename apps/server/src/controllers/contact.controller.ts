import { Request, Response, NextFunction } from 'express';
import { ContactMessage } from '../models/ContactMessage';

export const submitContactForm = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    const contactMsg = new ContactMessage({ name, email, phone, subject, message });
    await contactMsg.save();

    return res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! We will contact you shortly.',
    });
  } catch (error) {
    next(error);
  }
};

export const getContactMessages = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    return res.json({ success: true, data: { messages } });
  } catch (error) {
    next(error);
  }
};
