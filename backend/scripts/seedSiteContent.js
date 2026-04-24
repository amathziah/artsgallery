import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from '../src/config/database.js';
import { ensureSiteContentSeedUploads, getDefaultSiteContent, SITE_CONTENT_KEY } from '../src/data/defaultSiteContent.js';
import SiteContent from '../src/models/SiteContent.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const backendRoot = path.resolve(__dirname, '..');

dotenv.config({ path: path.join(backendRoot, '.env') });

const seedSiteContent = async () => {
  ensureSiteContentSeedUploads();
  await connectDB();

  const content = {
    ...getDefaultSiteContent(),
    key: SITE_CONTENT_KEY,
    updatedAt: new Date(),
  };

  await SiteContent.findOneAndReplace(
    { key: SITE_CONTENT_KEY },
    content,
    { new: true, upsert: true }
  );

  console.log('Seeded site content from SSA New into MongoDB and backend uploads.');
  await mongoose.disconnect();
};

seedSiteContent().catch(async (error) => {
  console.error(error.message);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
