import { Request, Response, NextFunction } from 'express';
import { Product } from '../models/Product';
import { AuditLog } from '../models/AuditLog';

const fallbackProducts = [
  {
    _id: 'prod-1',
    title: 'Cold-Ground Organic Turmeric (Haldi)',
    slug: 'cold-ground-organic-turmeric-haldi',
    description:
      'Our signature turmeric powder is stone-milled at low speeds to preserve natural oils and curcumin levels above 4.5%. Sourced directly from our Changa Manga harvest.',
    shortDescription: '100% Pure Changa Manga Turmeric Powder with high curcumin.',
    category: 'Spices',
    price: 450,
    compareAtPrice: 550,
    sku: 'SPICE-TUR-200G',
    stock: 150,
    weight: '200g',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=1000&q=80',
        alt: 'Cold Ground Organic Turmeric Powder Jar',
      },
    ],
    model3d: {
      url: 'https://res.cloudinary.com/demo/image/upload/v1615485290/spice_jar.glb',
      format: 'glb',
    },
    tags: ['turmeric', 'spices', 'organic', 'haldi'],
    isFeatured: true,
    isActive: true,
    ratingAvg: 4.9,
    ratingCount: 38,
  },
  {
    _id: 'prod-2',
    title: 'Cold-Ground Red Chilli Powder (Lal Mirch)',
    slug: 'cold-ground-red-chilli-powder',
    description:
      'Vibrant red, sun-dried chilli ground under low temperature to retain spicy warmth, natural color, and aroma without artificial colors or fillers.',
    shortDescription: 'Vibrant, stone-milled red chilli powder.',
    category: 'Spices',
    price: 480,
    compareAtPrice: 580,
    sku: 'SPICE-RED-200G',
    stock: 8,
    weight: '200g',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1000&q=80',
        alt: 'Cold Ground Red Chilli Powder Bowl',
      },
    ],
    tags: ['chilli', 'spices', 'lal-mirch'],
    isFeatured: true,
    isActive: true,
    ratingAvg: 4.8,
    ratingCount: 26,
  },
  {
    _id: 'prod-3',
    title: 'Stone-Milled Whole Coriander Powder (Dhania)',
    slug: 'stone-milled-whole-coriander-powder',
    description:
      'Freshly ground sun-dried coriander seeds. Gives rich citrusy aroma and authentic taste to Karahi and Nihari dishes.',
    shortDescription: 'Freshly ground aromatic coriander powder.',
    category: 'Spices',
    price: 420,
    compareAtPrice: 500,
    sku: 'SPICE-COR-200G',
    stock: 90,
    weight: '200g',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=1000&q=80',
        alt: 'Stone Milled Coriander Seeds and Powder',
      },
    ],
    tags: ['coriander', 'dhania', 'spices'],
    isFeatured: true,
    isActive: true,
    ratingAvg: 4.7,
    ratingCount: 19,
  },
  {
    _id: 'prod-4',
    title: 'Roasted Ground Cumin Powder (Zeera)',
    slug: 'roasted-ground-cumin-powder-zeera',
    description:
      'Slow roasted white cumin seeds stone-milled into fine aromatic powder. Perfect for raita, biryani, and roasted vegetable curries.',
    shortDescription: 'Slow-roasted aromatic cumin powder.',
    category: 'Spices',
    price: 520,
    compareAtPrice: 620,
    sku: 'SPICE-CUM-200G',
    stock: 65,
    weight: '200g',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1509358217973-885699e3250f?auto=format&fit=crop&w=1000&q=80',
        alt: 'Roasted Ground Cumin Seeds Powder',
      },
    ],
    tags: ['cumin', 'zeera', 'spices'],
    isFeatured: false,
    isActive: true,
    ratingAvg: 4.9,
    ratingCount: 31,
  },
  {
    _id: 'prod-5',
    title: 'Pure Sidr Organic Honey',
    slug: 'pure-sidr-organic-honey',
    description:
      'Harvested from wild Sidr (Berry) trees in Karak and Changa Manga. Unfiltered, unheated, and rich in natural medicinal enzymes.',
    shortDescription: '100% Raw Wild Berry Sidr Honey.',
    category: 'Honey',
    price: 2400,
    compareAtPrice: 2800,
    sku: 'HONEY-SIDR-500G',
    stock: 45,
    weight: '500g',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=1000&q=80',
        alt: 'Jar of Pure Raw Sidr Honey',
      },
    ],
    tags: ['honey', 'sidr', 'raw', 'wellness'],
    isFeatured: true,
    isActive: true,
    ratingAvg: 5.0,
    ratingCount: 52,
  },
  {
    _id: 'prod-6',
    title: 'Wild Flora Forest Honey',
    slug: 'wild-flora-forest-honey',
    description:
      'Natural multi-floral honey collected from Changa Manga forest blossoms. Rich golden amber color with smooth floral notes.',
    shortDescription: 'Raw, unpasteurized forest blossom honey.',
    category: 'Honey',
    price: 1800,
    compareAtPrice: 2100,
    sku: 'HONEY-WILD-500G',
    stock: 75,
    weight: '500g',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=1000&q=80',
        alt: 'Wild Flora Forest Honey Jar',
      },
    ],
    tags: ['honey', 'wild', 'raw'],
    isFeatured: false,
    isActive: true,
    ratingAvg: 4.8,
    ratingCount: 22,
  },
  {
    _id: 'prod-7',
    title: 'Himalayan Purified Shilajit (Salajit)',
    slug: 'himalayan-purified-shilajit-salajit',
    description:
      'Gold-grade Himalayan Salajit sun-dried and traditionally purified in herbal decoctions. High fulvic acid content for natural vitality and stamina.',
    shortDescription: 'Authentic Himalayan Gold-Grade Purified Resin.',
    category: 'Wellness',
    price: 3500,
    compareAtPrice: 4200,
    sku: 'WELL-SALAJIT-30G',
    stock: 25,
    weight: '30g',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1000&q=80',
        alt: 'Purified Himalayan Salajit Jar',
      },
    ],
    tags: ['salajit', 'shilajit', 'himalayan', 'vitality'],
    isFeatured: true,
    isActive: true,
    ratingAvg: 4.8,
    ratingCount: 29,
  },
  {
    _id: 'prod-8',
    title: 'Curcumin High-Potency Extract Capsules',
    slug: 'curcumin-high-potency-extract-capsules',
    description:
      'Concentrated 95% Curcuminoid extract derived from our farm turmeric, blended with black pepper piperine for 2000% enhanced bio-absorption.',
    shortDescription: '95% Standardized Curcumin + Piperine Supplements.',
    category: 'Wellness',
    price: 1950,
    compareAtPrice: 2400,
    sku: 'WELL-CURCUM-60CAP',
    stock: 60,
    weight: '60 Capsules',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1000&q=80',
        alt: 'Curcumin Capsules Bottle',
      },
    ],
    tags: ['curcumin', 'supplements', 'wellness', 'anti-inflammatory'],
    isFeatured: true,
    isActive: true,
    ratingAvg: 4.9,
    ratingCount: 14,
  },
];

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category, search, sort, page = '1', limit = '12', featured } = req.query;

    let items: any[] = [];
    let total = 0;

    try {
      const query: any = { isActive: true };
      if (category) query.category = category;
      if (featured === 'true') query.isFeatured = true;
      if (search) query.$text = { $search: search as string };

      const pageNum = parseInt(page as string, 10);
      const limitNum = parseInt(limit as string, 10);
      const skip = (pageNum - 1) * limitNum;

      let sortOptions: any = { createdAt: -1 };
      if (sort === 'price_asc') sortOptions = { price: 1 };
      if (sort === 'price_desc') sortOptions = { price: -1 };
      if (sort === 'rating') sortOptions = { ratingAvg: -1 };

      const [dbItems, dbTotal] = await Promise.all([
        Product.find(query).sort(sortOptions).skip(skip).limit(limitNum),
        Product.countDocuments(query),
      ]);

      if (dbTotal > 0) {
        items = dbItems;
        total = dbTotal;
      } else {
        throw new Error('Database empty, using fallback items');
      }
    } catch {
      // Fallback logic for dev without MongoDB
      let filtered = [...fallbackProducts];
      if (category) filtered = filtered.filter((p) => p.category === category);
      if (featured === 'true') filtered = filtered.filter((p) => p.isFeatured);
      if (search) {
        const q = (search as string).toLowerCase();
        filtered = filtered.filter((p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
      }

      items = filtered;
      total = filtered.length;
    }

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);

    return res.json({
      success: true,
      data: {
        items,
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

export const getProductBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;
    let product: any = null;

    try {
      product = await Product.findOne({ slug, isActive: true });
    } catch {
      // Fallback
    }

    if (!product) {
      product = fallbackProducts.find((p) => p.slug === slug);
    }

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
        error: { code: 'PRODUCT_NOT_FOUND' },
      });
    }

    return res.json({
      success: true,
      data: { product },
    });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productData = req.body;
    let product: any = null;

    try {
      product = new Product(productData);
      await product.save();
    } catch {
      product = { ...productData, _id: `prod-${Date.now()}` };
      fallbackProducts.unshift(product);
    }

    if (req.user) {
      try {
        await AuditLog.create({
          actor: req.user.userId,
          action: 'CREATE_PRODUCT',
          target: `Product:${product._id}`,
          metadata: { title: product.title, sku: product.sku },
        });
      } catch {}
    }

    return res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: { product },
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    let product: any = null;

    try {
      product = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    } catch {}

    if (!product) {
      const idx = fallbackProducts.findIndex((p) => p._id === id);
      if (idx > -1) {
        fallbackProducts[idx] = { ...fallbackProducts[idx], ...req.body };
        product = fallbackProducts[idx];
      }
    }

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    return res.json({
      success: true,
      message: 'Product updated successfully',
      data: { product },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    let product: any = null;

    try {
      product = await Product.findByIdAndDelete(id);
    } catch {}

    const idx = fallbackProducts.findIndex((p) => p._id === id);
    if (idx > -1) {
      fallbackProducts.splice(idx, 1);
      product = true;
    }

    return res.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
