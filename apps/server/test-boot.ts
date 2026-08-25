import express from 'express';
import mongoose from 'mongoose';

async function testBoot() {
  console.log('Testing boot imports...');
  try {
    const authRoutes = (await import('./src/routes/auth.routes')).default;
    console.log('authRoutes OK');
    const productRoutes = (await import('./src/routes/product.routes')).default;
    console.log('productRoutes OK');
    const orderRoutes = (await import('./src/routes/order.routes')).default;
    console.log('orderRoutes OK');
    const categoryRoutes = (await import('./src/routes/category.routes')).default;
    console.log('categoryRoutes OK');
    const blogRoutes = (await import('./src/routes/blog.routes')).default;
    console.log('blogRoutes OK');
    const reviewRoutes = (await import('./src/routes/review.routes')).default;
    console.log('reviewRoutes OK');
    const contactRoutes = (await import('./src/routes/contact.routes')).default;
    console.log('contactRoutes OK');
    const newsletterRoutes = (await import('./src/routes/newsletter.routes')).default;
    console.log('newsletterRoutes OK');
    const adminRoutes = (await import('./src/routes/admin.routes')).default;
    console.log('adminRoutes OK');
    console.log('ALL ROUTES IMPORTED WITH 100% SUCCESS!');
  } catch (err) {
    console.error('BOOT IMPORT ERROR:', err);
  }
}

testBoot();
