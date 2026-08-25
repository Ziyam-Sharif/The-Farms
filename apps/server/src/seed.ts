import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import dns from 'dns';
import { User } from './models/User';
import { Category } from './models/Category';
import { Product } from './models/Product';
import { BlogPost } from './models/BlogPost';

try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch {
  // fallback
}

dotenv.config({ path: path.resolve(process.cwd(), '../../.env') });
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/farms_db';

export const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log('[Seed] Connected to MongoDB...');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Category.deleteMany({}),
      Product.deleteMany({}),
      BlogPost.deleteMany({}),
    ]);

    // Create Initial Admin & Editor Accounts
    const adminUser = new User({
      name: "The Farm's Master Admin",
      email: 'admin@farmsfoodpk.com',
      passwordHash: 'AdminFarm2026!',
      role: 'admin',
      isVerified: true,
      phone: '+923001234567',
    });
    await adminUser.save();

    const editorUser = new User({
      name: 'Farm Content Editor',
      email: 'editor@farmsfoodpk.com',
      passwordHash: 'EditorFarm2026!',
      role: 'editor',
      isVerified: true,
    });
    await editorUser.save();

    console.log('[Seed] Admin accounts created.');

    // Create Categories
    await Category.insertMany([
      {
        name: 'Spices',
        slug: 'spices',
        description: 'Traditional Pakistani cold-ground pure spices from our Changa Manga farms.',
        image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1000&q=80',
      },
      {
        name: 'Honey',
        slug: 'honey',
        description: 'Raw, unpasteurized Sidr and wild flora honey harvested naturally.',
        image: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=1000&q=80',
      },
      {
        name: 'Wellness',
        slug: 'wellness',
        description: 'Pure Himalayan Salajit, organic curcumin, and natural wellness supplements.',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1000&q=80',
      },
    ]);

    // Sample Products with High-Res Real Spice Images
    await Product.insertMany([
      {
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
    ]);

    console.log('[Seed] Database seeded with real spice products successfully.');
    await mongoose.disconnect();
  } catch (error) {
    console.error('[Seed] Error seeding database:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  seedDatabase();
}
