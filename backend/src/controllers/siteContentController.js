import SiteContent from '../models/SiteContent.js';
import { ensureSiteContentSeedUploads, getDefaultSiteContent, SITE_CONTENT_KEY } from '../data/defaultSiteContent.js';

// ── Controller ────────────────────────────────────────────────────────────────
export const getSiteContent = async (req, res) => {
  try {
    ensureSiteContentSeedUploads();
    let content = await SiteContent.findOne({ key: SITE_CONTENT_KEY });
    if (!content) content = await SiteContent.create(getDefaultSiteContent());
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Utility: parse a JSON field that may arrive as a string
const parseField = (val) => {
  if (typeof val === 'string') { try { return JSON.parse(val); } catch { return val; } }
  return val;
};

export const updateSiteContent = async (req, res) => {
  try {
    const body = { ...req.body };

    // Parse any JSON-stringified nested objects/arrays
    const jsonFields = ['heroSlides', 'leadership', 'grants', 'programs', 'sculpturePark', 'conjectures', 'navLinks'];
    jsonFields.forEach((f) => { if (body[f]) body[f] = parseField(body[f]); });

    // Handle file uploads – map uploaded files back to the right slot
    if (req.files) {
      const fileMap = req.files; // key → array of files (from upload.fields)

      if (fileMap['heroImages'] && body.heroSlides) {
        fileMap['heroImages'].forEach((file, i) => {
          if (body.heroSlides[i]) body.heroSlides[i].imageUrl = `/uploads/posters/${file.filename}`;
        });
      }
      if (fileMap['leadershipImages'] && body.leadership) {
        fileMap['leadershipImages'].forEach((file, i) => {
          if (body.leadership[i]) body.leadership[i].imageUrl = `/uploads/posters/${file.filename}`;
        });
      }
      if (fileMap['awardeeImage'] && body.grants) {
        body.grants.awardee = body.grants.awardee || {};
        body.grants.awardee.imageUrl = `/uploads/posters/${fileMap['awardeeImage'][0].filename}`;
      }
      if (fileMap['juryImages'] && body.grants?.jury) {
        fileMap['juryImages'].forEach((file, i) => {
          if (body.grants.jury[i]) body.grants.jury[i].imageUrl = `/uploads/posters/${file.filename}`;
        });
      }
      if (fileMap['archiveImages'] && body.grants?.archiveAwardees) {
        fileMap['archiveImages'].forEach((file, i) => {
          if (body.grants.archiveAwardees[i]) body.grants.archiveAwardees[i].imageUrl = `/uploads/posters/${file.filename}`;
        });
      }
      if (fileMap['programImages'] && body.programs?.cards) {
        fileMap['programImages'].forEach((file, i) => {
          if (body.programs.cards[i]) body.programs.cards[i].imageUrl = `/uploads/posters/${file.filename}`;
        });
      }
      if (fileMap['spHeroImage'] && body.sculpturePark) {
        body.sculpturePark.heroImageUrl = `/uploads/posters/${fileMap['spHeroImage'][0].filename}`;
      }
      if (fileMap['spLogoImage'] && body.sculpturePark) {
        body.sculpturePark.logoImageUrl = `/uploads/posters/${fileMap['spLogoImage'][0].filename}`;
      }
      if (fileMap['conjecturesImage'] && body.conjectures) {
        body.conjectures.imageUrl = `/uploads/posters/${fileMap['conjecturesImage'][0].filename}`;
      }
      if (fileMap['grantsBgImage']) {
        body.grantsPageBgImage = `/uploads/posters/${fileMap['grantsBgImage'][0].filename}`;
      }
    }

    body.updatedAt = new Date();

    const content = await SiteContent.findOneAndUpdate({ key: SITE_CONTENT_KEY }, body, { new: true, upsert: true });
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
