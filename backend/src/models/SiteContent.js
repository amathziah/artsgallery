import mongoose from 'mongoose';

// ── Shared sub-schemas ─────────────────────────────────────────────────────
const heroSlideSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  ctaText: String,
  ctaLink: String,
  isExternal: { type: Boolean, default: false },
  imageUrl: String,
  order: { type: Number, default: 0 },
});

const leadershipSchema = new mongoose.Schema({
  name: String,
  title: String,
  imageUrl: String,
  order: { type: Number, default: 0 },
});

// ── Grants ─────────────────────────────────────────────────────────────────
const grantProfileSchema = new mongoose.Schema({
  name: String,
  role: String,
  imageUrl: String,
  bio: String,
  order: { type: Number, default: 0 },
});

const grantsContentSchema = new mongoose.Schema({
  pageLabel: String,
  pageTitle: String,
  pageSubtitle: String,
  // Current grant tab
  currentTabLabel: String,
  currentGrantTitle: String,
  currentGrantBody1: String,
  currentGrantBody2: String,
  currentStructureTitle: String,
  currentStructureBody: String,
  currentEligibilityTitle: String,
  currentEligibilityBody: String,
  currentAwardeeHeading: String,
  currentJuryHeading: String,
  awardee: grantProfileSchema,
  jury: [grantProfileSchema],
  // Archive tab
  archiveTabLabel: String,
  archiveGrantTitle: String,
  archiveGrantBody1: String,
  archiveGrantBody2: String,
  archiveStructureTitle: String,
  archiveStructureBody: String,
  archiveAwardeesHeading: String,
  archiveAwardeesNote: String,
  archiveLegacyTitle: String,
  archiveLegacyBody: String,
  archiveAwardees: [grantProfileSchema],
});

// ── Programs ───────────────────────────────────────────────────────────────
const programCardSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  imageUrl: String,
  link: String,
  isExternal: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
});

const programsContentSchema = new mongoose.Schema({
  pageTitle: String,
  pageSubtitle: String,
  sculptureParklinkText: String,
  sculptureParklinkUrl: String,
  cards: [programCardSchema],
});

// ── Sculpture Park ─────────────────────────────────────────────────────────
const sculptureStatSchema = new mongoose.Schema({
  value: String,
  label: String,
});

const sculptureParkContentSchema = new mongoose.Schema({
  pageLabel: String,
  pageTitle: String,
  pageSubtitle: String,
  officialWebsite: String,
  heroImageUrl: String,
  logoImageUrl: String,
  // Tabs
  foundingTitle: String,
  foundingBody1: String,
  foundingBody2: String,
  evolutionTitle: String,
  evolutionIntro: String,
  evolutionMilestones: [{ heading: String, body: String }],
  impactTitle: String,
  impactBody1: String,
  impactBody2: String,
  impactStats: [sculptureStatSchema],
  supportTitle: String,
  supportIntro: String,
  supportItems: [{ title: String, body: String }],
  supportNote: String,
  // Visit
  visitTitle: String,
  visitVenueName: String,
  visitVenueDesc: String,
  visitDirectionsUrl: String,
  visitMapEmbed: String,
});

// ── Conjectures page ───────────────────────────────────────────────────────
const conjecturesContentSchema = new mongoose.Schema({
  label: String,
  title: String,
  subtitle: String,
  dates: String,
  imageUrl: String,
  leadParagraph: String,
  body1: String,
  body2: String,
  detailsHeading: String,
  detailVenue: String,
  detailDates: String,
  detailCurator: String,
  detailArtist: String,
});

// ── Root schema ────────────────────────────────────────────────────────────
const siteContentSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },

  // Homepage
  heroSlides: [heroSlideSchema],
  vision: String,
  mission: String,
  visionLabel: String,
  missionLabel: String,
  aboutLabel: String,
  aboutHeading: String,
  aboutBody: String,
  leadershipHeading: String,
  leadership: [leadershipSchema],

  // Homepage sections
  programsSectionLabel: String,
  programsSectionHeading: String,
  grantsSectionLabel: String,
  grantsSectionHeading: String,
  grantsSectionCta: String,
  grantsPageBgImage: String,

  // Footer
  footerTagline: String,
  footerCopyright: String,
  address: String,
  emailGeneral: String,
  emailGrants: String,
  emailPrograms: String,
  instagram: String,
  instagramUrl: String,

  // Pages
  grants: grantsContentSchema,
  programs: programsContentSchema,
  sculpturePark: sculptureParkContentSchema,
  conjectures: conjecturesContentSchema,

  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('SiteContent', siteContentSchema);
