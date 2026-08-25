import type { Request, Response } from 'express';
import mongoose, { Schema, model } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://farms_admin:QVtrqICqAdqGvg1N@cluster0.j1egxfs.mongodb.net/farms_db?retryWrites=true&w=majority&appName=Cluster0';
const JWT_SECRET = process.env.JWT_SECRET || 'acb4e505474c84731ac60ce62ed886d880a7c75a722075654d6bf49450ef3a8b';

// --- Mongoose Schemas ---
const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    urduTitle: { type: String },
    urduShort: { type: String },
    description: { type: String, required: true },
    shortDescription: { type: String },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    compareAtPrice: { type: Number },
    sku: { type: String, required: true },
    stock: { type: Number, default: 50 },
    weight: { type: String, default: '200g' },
    images: [{ url: String, alt: String }],
    tags: [String],
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    ratingAvg: { type: Number, default: 4.9 },
    ratingCount: { type: Number, default: 24 },
  },
  { timestamps: true }
);

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['customer', 'admin', 'editor'], default: 'customer' },
  },
  { timestamps: true }
);

const OrderSchema = new Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    customer: {
      name: String,
      email: String,
      phone: String,
      address: {
        street: String,
        city: String,
        state: String,
        postalCode: String,
        country: String,
      },
    },
    items: [
      {
        productId: String,
        title: String,
        price: Number,
        quantity: Number,
        total: Number,
      },
    ],
    subtotal: Number,
    shippingFee: Number,
    total: Number,
    status: { type: String, default: 'pending' },
    paymentMethod: { type: String, default: 'cod' },
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || model('Product', ProductSchema);
const User = mongoose.models.User || model('User', UserSchema);
const Order = mongoose.models.Order || model('Order', OrderSchema);

const SEED_PRODUCTS = [
  {
    title: 'Turmeric Powder (Haldi)',
    slug: 'turmeric-powder',
    urduTitle: 'خالص ہلدی پاؤڈر',
    urduShort: 'ہلدی',
    description: 'Our signature Haldi — organic roots, sun-dried and slowly ground to protect curcumin and warm aroma.',
    shortDescription: 'Organic roots, sun-dried and slowly cold-ground to protect natural curcumin.',
    category: 'Spices',
    price: 650,
    compareAtPrice: 750,
    sku: 'SPICE-TUR-01',
    stock: 85,
    weight: '200g',
    images: [{ url: '/farms-images/turmeric-main.jpg', alt: 'Turmeric Powder' }],
    tags: ['organic', 'haldi', 'spices'],
    isFeatured: true,
    isActive: true,
  },
  {
    title: 'Coriander Powder (Dhania)',
    slug: 'coriander-powder',
    urduTitle: 'خالص دھنیا پاؤڈر',
    urduShort: 'دھنیا',
    description: 'Freshly ground Dhania with a rich aroma and cooling citrusy lift for every curry.',
    shortDescription: 'Freshly ground Dhania with a rich aroma and cooling citrusy lift for every curry.',
    category: 'Spices',
    price: 550,
    compareAtPrice: 650,
    sku: 'SPICE-COR-02',
    stock: 92,
    weight: '200g',
    images: [{ url: '/farms-images/coriander-main.jpg', alt: 'Coriander Powder' }],
    tags: ['organic', 'dhania', 'spices'],
    isFeatured: true,
    isActive: true,
  },
  {
    title: 'Red Chilli Powder (Lal Mirch)',
    slug: 'red-chilli-powder',
    urduTitle: 'لال مرچ',
    urduShort: 'لال مرچ',
    description: 'Sun-ripened chillies slowly ground — a vibrant red powder with clean, sharp heat.',
    shortDescription: 'Sun-ripened chillies slowly ground — vibrant red powder with clean, sharp heat.',
    category: 'Spices',
    price: 600,
    compareAtPrice: 700,
    sku: 'SPICE-CHI-03',
    stock: 64,
    weight: '200g',
    images: [{ url: '/farms-images/chilli-main.jpg', alt: 'Red Chilli Powder' }],
    tags: ['organic', 'lal-mirch', 'spices'],
    isFeatured: true,
    isActive: true,
  },
  {
    title: 'Chhoti Beri Sidr Honey',
    slug: 'chhoti-beri-honey',
    urduTitle: 'سدر شہد',
    urduShort: 'شہد',
    description: 'Wild-harvested Sidr honey from Changa Manga — thick, buttery and 100% raw.',
    shortDescription: 'Raw, unheated monofloral Sidr honey directly from Changa Manga wild groves.',
    category: 'Honey',
    price: 2450,
    compareAtPrice: 2800,
    sku: 'HNY-SDR-04',
    stock: 42,
    weight: '500g',
    images: [{ url: '/farms-images/honey-main.jpg', alt: 'Pure Raw Sidr Honey' }],
    tags: ['honey', 'sidr', 'wellness'],
    isFeatured: true,
    isActive: true,
  },
  {
    title: 'Pure Himalayan Salajit',
    slug: 'himalayan-salajit',
    urduTitle: 'سلاجیت',
    urduShort: 'سلاجیت',
    description: 'A potent, mineral-rich resin sun-dried and purified naturally to protect 84+ minerals.',
    shortDescription: '100% Pure gold-grade Himalayan resin rich in natural fulvic acid & minerals.',
    category: 'Wellness',
    price: 3200,
    compareAtPrice: 3800,
    sku: 'WLN-SHL-05',
    stock: 35,
    weight: '20g',
    images: [{ url: '/farms-images/shilajit-main.jpg', alt: 'Wild Mountain Shilajit' }],
    tags: ['shilajit', 'salajit', 'wellness'],
    isFeatured: true,
    isActive: true,
  },
  {
    title: 'Turmeric Curcumin Capsules',
    slug: 'turmeric-curcumin-capsules',
    urduTitle: 'کیپسول',
    urduShort: 'کیپسول',
    description: 'High-potency organic turmeric curcumin, enhanced with piperine for optimal absorption.',
    shortDescription: 'High-potency curcumin extract with piperine for optimal bio-absorption.',
    category: 'Wellness',
    price: 1850,
    compareAtPrice: 2100,
    sku: 'WLN-CAP-06',
    stock: 58,
    weight: '60 Capsules',
    images: [{ url: '/farms-images/capsules-main.jpg', alt: 'Organic Turmeric Capsules' }],
    tags: ['curcumin', 'capsules', 'wellness'],
    isFeatured: false,
    isActive: true,
  },
  {
    title: 'Whole Cumin Seeds (Zeera)',
    slug: 'cumin-seeds',
    urduTitle: 'سفید زیرہ',
    urduShort: 'زیرہ',
    description: 'Aromatic whole white cumin seeds with intense natural aroma and warmth.',
    shortDescription: 'Aromatic whole white cumin seeds with intense natural aroma.',
    category: 'Spices',
    price: 700,
    compareAtPrice: 800,
    sku: 'SPICE-CUM-07',
    stock: 75,
    weight: '200g',
    images: [{ url: '/farms-images/spices-spread.jpg', alt: 'Whole Cumin Seeds' }],
    tags: ['zeera', 'cumin', 'spices'],
    isFeatured: false,
    isActive: true,
  },
  {
    title: 'Organic Garam Masala',
    slug: 'garam-masala',
    urduTitle: 'گرم مصالحہ',
    urduShort: 'گرم مصالحہ',
    description: 'Heritage 12-spice royal blend roasted and ground in small farm batches.',
    shortDescription: 'Heritage 12-spice blend roasted and ground in small farm batches.',
    category: 'Spices',
    price: 850,
    compareAtPrice: 950,
    sku: 'SPICE-GRM-08',
    stock: 60,
    weight: '150g',
    images: [{ url: '/farms-images/spices-spread.jpg', alt: 'Organic Garam Masala' }],
    tags: ['garam-masala', 'spices'],
    isFeatured: false,
    isActive: true,
  },
];

let isConnected = false;
async function connectDb() {
  if (isConnected || mongoose.connection.readyState === 1) return;
  try {
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 4000 });
    isConnected = true;
    const count = await Product.countDocuments();
    if (count === 0) {
      await Product.insertMany(SEED_PRODUCTS);
    }
  } catch (e) {
    console.error('[DB] Notice:', e);
  }
}

// SSE Broadcast Manager
let sseClients: any[] = [];
function broadcastSse(data: any) {
  const payload = `data: ${JSON.stringify(data)}\n\n`;
  sseClients = sseClients.filter((client) => {
    try {
      client.write(payload);
      return true;
    } catch {
      return false;
    }
  });
}

export default async function handler(req: any, res: any) {
  // Edge CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS,PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const url = req.url || '/';
  const method = req.method || 'GET';

  try {
    await connectDb();

    // 1. SSE Real-Time Stream Endpoint
    if ((url === '/api/v1/events' || url === '/events') && method === 'GET') {
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      res.flushHeaders?.();

      res.write(`data: ${JSON.stringify({ type: 'CONNECTED', timestamp: Date.now() })}\n\n`);
      sseClients.push(res);

      req.on('close', () => {
        sseClients = sseClients.filter((c) => c !== res);
      });
      return;
    }

    // 2. Health check & Root
    if (url === '/' || url === '/api/v1' || url === '/api/v1/health' || url === '/health') {
      return res.status(200).json({
        success: true,
        message: "The Farm's Foods API is Live & Operational.",
        database: mongoose.connection.readyState === 1 ? 'connected' : 'connecting/standby',
        timestamp: new Date().toISOString(),
      });
    }

    // 3. Auth Login
    if (url.startsWith('/api/v1/auth/login') && method === 'POST') {
      const { email, password } = req.body || {};
      const normalizedEmail = (email || '').toLowerCase().trim();

      if (
        (normalizedEmail === 'admin@farmsfoodpk.com' && password === 'AdminFarm2026!') ||
        (normalizedEmail === 'editor@farmsfoodpk.com' && password === 'EditorFarm2026!')
      ) {
        const role = normalizedEmail.includes('admin') ? 'admin' : 'editor';
        const user = {
          _id: 'admin-master-01',
          name: role === 'admin' ? "The Farm's Master Admin" : 'Farm Content Editor',
          email: normalizedEmail,
          role,
        };
        const accessToken = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
        return res.status(200).json({
          success: true,
          message: 'Admin logged in successfully',
          data: { user, accessToken },
        });
      }

      const user = await User.findOne({ email: normalizedEmail });
      if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
        return res.status(401).json({ success: false, message: 'Invalid administrative email or password' });
      }

      const accessToken = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
      return res.status(200).json({
        success: true,
        message: 'Logged in successfully',
        data: { user, accessToken },
      });
    }

    // 4. Products GET
    if (url.startsWith('/api/v1/products') && method === 'GET') {
      let items = await Product.find({ isActive: true }).sort({ isFeatured: -1, createdAt: -1 }).lean();
      if (!items || items.length === 0) {
        items = SEED_PRODUCTS as any;
      }
      return res.status(200).json({
        success: true,
        data: { items, total: items.length },
      });
    }

    // 5. Products POST
    if (url.startsWith('/api/v1/products') && method === 'POST') {
      const newProduct = new Product(req.body);
      await newProduct.save();
      broadcastSse({ type: 'PRODUCT_CREATED', product: newProduct });
      return res.status(201).json({ success: true, data: newProduct });
    }

    // 6. Products PUT
    if (url.startsWith('/api/v1/products') && method === 'PUT') {
      const parts = url.split('/');
      const id = parts[parts.length - 1];
      const updated = await Product.findOneAndUpdate(
        { $or: [{ _id: mongoose.isValidObjectId(id) ? id : null }, { slug: id }, { sku: id }] },
        { $set: req.body },
        { new: true, upsert: true }
      );
      broadcastSse({ type: 'PRODUCT_UPDATED', product: updated });
      return res.status(200).json({ success: true, data: updated });
    }

    // 7. Products DELETE
    if (url.startsWith('/api/v1/products') && method === 'DELETE') {
      const parts = url.split('/');
      const id = parts[parts.length - 1];
      await Product.findOneAndDelete({
        $or: [{ _id: mongoose.isValidObjectId(id) ? id : null }, { slug: id }, { sku: id }],
      });
      broadcastSse({ type: 'PRODUCT_DELETED', id });
      return res.status(200).json({ success: true, message: 'Product deleted successfully' });
    }

    // 8. Orders POST
    if (url.startsWith('/api/v1/orders') && method === 'POST') {
      const order = new Order({
        ...req.body,
        orderNumber: `ORD-${Date.now().toString().slice(-6)}`,
      });
      await order.save();
      return res.status(201).json({ success: true, data: order });
    }

    // Fallback
    return res.status(200).json({
      success: true,
      message: "The Farm's API Operational",
      path: url,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal Serverless Error',
    });
  }
}
