import { Request, Response, NextFunction } from 'express';
import { BlogPost } from '../models/BlogPost';
import { sanitizeHtml } from '../utils/sanitize';

export const getBlogPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category, tag, page = '1', limit = '9' } = req.query;
    const query: any = { status: 'published' };

    if (category) query.category = category;
    if (tag) query.tags = tag;

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const skip = (pageNum - 1) * limitNum;

    const [posts, total] = await Promise.all([
      BlogPost.find(query).sort({ publishedAt: -1 }).skip(skip).limit(limitNum).populate('author', 'name'),
      BlogPost.countDocuments(query),
    ]);

    return res.json({
      success: true,
      data: { posts, total, page: pageNum, limit: limitNum, totalPages: Math.ceil(total / limitNum) },
    });
  } catch (error) {
    next(error);
  }
};

export const getBlogPostBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;
    const post = await BlogPost.findOne({ slug, status: 'published' }).populate('author', 'name');

    if (!post) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }

    return res.json({ success: true, data: { post } });
  } catch (error) {
    next(error);
  }
};

export const createBlogPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, slug, excerpt, contentHtml, coverImage, tags, category, status } = req.body;

    const sanitizedHtml = sanitizeHtml(contentHtml);

    const post = new BlogPost({
      title,
      slug,
      excerpt,
      contentHtml: sanitizedHtml,
      coverImage,
      author: req.user?.userId,
      tags,
      category,
      status,
      publishedAt: status === 'published' ? new Date() : undefined,
    });

    await post.save();
    return res.status(201).json({ success: true, data: { post } });
  } catch (error) {
    next(error);
  }
};
