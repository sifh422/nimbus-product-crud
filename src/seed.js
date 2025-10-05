import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from './models/Product.js';
import { connectToDatabase } from './utils/db.js';

dotenv.config();

async function seed() {
  await connectToDatabase();

  const count = await Product.countDocuments();
  if (count > 0) {
    console.log(`Products already exist (${count}). Skipping seed.`);
    await mongoose.connection.close();
    return;
  }

  const sample = [
    { name: 'Smartphone X', price: 699.99, category: 'electronics', inStock: true },
    { name: 'Running Shoes', price: 89.5, category: 'sports', inStock: true },
    { name: 'Sofa Cover', price: 24.99, category: 'home', inStock: true },
    { name: 'Jeans Classic', price: 49.99, category: 'fashion', inStock: false },
  ];

  const created = await Product.insertMany(sample);
  console.log(`Inserted ${created.length} products.`);

  await mongoose.connection.close();
}

seed().catch(async (e) => {
  console.error('Seed failed:', e);
  try { await mongoose.connection.close(); } catch {}
  process.exit(1);
});


