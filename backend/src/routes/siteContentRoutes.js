import express from 'express';
import { getSiteContent, updateSiteContent } from '../controllers/siteContentController.js';
import { protect } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/', getSiteContent);
router.put('/', protect, upload.fields([
  { name: 'heroImages', maxCount: 10 },
  { name: 'leadershipImages', maxCount: 10 },
  { name: 'awardeeImage', maxCount: 1 },
  { name: 'juryImages', maxCount: 10 },
  { name: 'archiveImages', maxCount: 20 },
  { name: 'programImages', maxCount: 10 },
  { name: 'spHeroImage', maxCount: 1 },
  { name: 'spLogoImage', maxCount: 1 },
  { name: 'conjecturesImage', maxCount: 1 },
  { name: 'grantsBgImage', maxCount: 1 },
]), updateSiteContent);

export default router;
