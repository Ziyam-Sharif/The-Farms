import { Request, Response, NextFunction } from 'express';
import { NewsletterSubscriber } from '../models/NewsletterSubscriber';

export const subscribeNewsletter = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    const existing = await NewsletterSubscriber.findOne({ email: email.toLowerCase() });

    if (existing) {
      existing.isActive = true;
      await existing.save();
    } else {
      await NewsletterSubscriber.create({ email: email.toLowerCase() });
    }

    return res.json({
      success: true,
      message: 'Subscribed to newsletter successfully!',
    });
  } catch (error) {
    next(error);
  }
};

export const exportNewsletterCSV = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const subscribers = await NewsletterSubscriber.find({ isActive: true });
    let csv = 'Email,SubscribedAt\n';
    subscribers.forEach((sub) => {
      csv += `"${sub.email}","${sub.subscribedAt.toISOString()}"\n`;
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="newsletter_subscribers.csv"');
    return res.send(csv);
  } catch (error) {
    next(error);
  }
};
