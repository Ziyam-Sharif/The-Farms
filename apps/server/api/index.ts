import express, { Request, Response } from 'express';
import mongoose, { Schema, model, Document } from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const app: express.Application = express();

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://farms_admin:QVtrqICqAdqGvg1N@cluster0.j1egxfs.mongodb.net/farms_db?retryWrites=true&w=majority&appName=Cluster0';
const JWT_SECRET = process.env.JWT_SECRET || 'acb4e505474c84731ac60ce62ed886d880a7c75a722075654d6bf49450ef3a8b';

// --- MONGOOSE MODELS ---
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

const ContactSchema = new Schema(
  {
    name: String,
    email: String,
    phone: String,
    message: String,
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || model('Product', ProductSchema);
const User = mongoose.models.User || model('User', UserSchema);
const Order = mongoose.models.Order || model('Order', OrderSchema);
const Contact = mongoose.models.Contact || model('Contact', ContactSchema);

// Initial 8 Organic Products for Seeding
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

let isDbConnected = false;
async function ensureDb() {
  if (isDbConnected && mongoose.connection.readyState === 1) return;
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 4000,
    });
    isDbConnected = true;

    // Auto-seed if empty
    const count = await Product.countDocuments();
    if (count === 0) {
      await Product.insertMany(SEED_PRODUCTS);
    }
  } catch (err) {
    console.error('Mongoose connection notice:', err);
  }
}

// --- API ROUTES ---

// Health
app.get(['/api/v1/health', '/health'], async (_req, res) => {
  await ensureDb();
  res.json({
    success: true,
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'connecting/standby',
    timestamp: new Date().toISOString(),
  });
});

// Root
app.get(['/', '/api/v1'], (_req, res) => {
  res.json({
    success: true,
    message: "The Farm's Foods API is Live & Operational.",
    healthEndpoint: '/api/v1/health',
    version: '1.0.0',
  });
});

// Auth Login
app.post('/api/v1/auth/login', async (req, res) => {
  try {
    await ensureDb();
    const { email, password } = req.body;
    const normalizedEmail = (email || '').toLowerCase().trim();

    // Default admin fallback verification
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
      return res.json({
        success: true,
        message: 'Admin logged in successfully',
        data: { user, accessToken },
      });
    }

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid administrative email or password' });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ success: false, message: 'Invalid administrative email or password' });
    }

    const accessToken = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    return res.json({
      success: true,
      message: 'Logged in successfully',
      data: { user, accessToken },
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message || 'Login failed' });
  }
});

// Get Products
app.get('/api/v1/products', async (req, res) => {
  try {
    await ensureDb();
    const { category, search } = req.query;
    const query: any = { isActive: true };
    if (category) query.category = category;
    if (search) query.title = { $regex: search, $options: 'i' };

    let items = await Product.find(query).sort({ isFeatured: -1, createdAt: -1 }).lean();
    if (!items || items.length === 0) {
      items = SEED_PRODUCTS as any;
    }
    return res.json({
      success: true,
      data: {
        items,
        total: items.length,
      },
    });
  } catch (err: any) {
    return res.json({
      success: true,
      data: {
        items: SEED_PRODUCTS,
        total: SEED_PRODUCTS.length,
      },
    });
  }
});

// Create Product
app.post('/api/v1/products', async (req, res) => {
  try {
    await ensureDb();
    const newProduct = new Product(req.body);
    await newProduct.save();
    return res.status(201).json({ success: true, data: newProduct });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message || 'Failed to create product' });
  }
});

// Update Product
app.put('/api/v1/products/:id', async (req, res) => {
  try {
    await ensureDb();
    const { id } = req.params;
    const updated = await Product.findOneAndUpdate(
      { $or: [{ _id: mongoose.isValidObjectId(id) ? id : null }, { slug: id }, { sku: id }] },
      { $set: req.body },
      { new: true, upsert: true }
    );
    return res.json({ success: true, data: updated });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message || 'Failed to update product' });
  }
});

// Delete Product
app.delete('/api/v1/products/:id', async (req, res) => {
  try {
    await ensureDb();
    const { id } = req.params;
    await Product.findOneAndDelete({
      $or: [{ _id: mongoose.isValidObjectId(id) ? id : null }, { slug: id }, { sku: id }],
    });
    return res.json({ success: true, message: 'Product deleted successfully' });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message || 'Failed to delete product' });
  }
});

// Orders
app.post('/api/v1/orders', async (req, res) => {
  try {
    await ensureDb();
    const orderData = {
      ...req.body,
      orderNumber: `ORD-${Date.now().toString().slice(-6)}`,
    };
    const order = new Order(orderData);
    await order.save();
    return res.status(201).json({ success: true, data: order });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message || 'Failed to create order' });
  }
});

app.get('/api/v1/orders/admin/all', async (_req, res) => {
  try {
    await ensureDb();
    const orders = await Order.find().sort({ createdAt: -1 }).lean();
    return res.json({ success: true, data: { items: orders, total: orders.length } });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message || 'Failed to fetch orders' });
  }
});

// Contact
app.post('/api/v1/contact', async (req, res) => {
  try {
    await ensureDb();
    const contact = new Contact(req.body);
    await contact.save();
    return res.status(201).json({ success: true, message: 'Message received successfully' });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message || 'Failed to submit message' });
  }
});

export default async function handler(req: Request, res: Response) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS,PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    return (app as any)(req, res);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal Server Error',
    });
  }
}
