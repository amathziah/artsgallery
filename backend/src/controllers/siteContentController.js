import SiteContent from '../models/SiteContent.js';

const KEY = 'main';

const getDefaults = () => ({
  key: KEY,

  // ── Homepage ──────────────────────────────────────────────────────────────
  heroSlides: [
    { title: 'Conjectures on a Paper Sky', subtitle: 'Jitish Kallat at Bikaner House, New Delhi', ctaText: 'Learn More', ctaLink: '/programs/conjectures-paper-sky', isExternal: false, imageUrl: '', order: 0 },
    { title: 'The Sculpture Park Jaipur', subtitle: 'A long-term public art project at Jaigarh Palace', ctaText: 'Visit Sculpture Park', ctaLink: 'https://www.thesculpturepark.org/', isExternal: true, imageUrl: '', order: 1 },
  ],
  vision: 'To create the India we believe in.',
  mission: 'To support research-led curatorial inquiry, international exchange, and public engagement with contemporary art from India.',
  visionLabel: 'Our Vision',
  missionLabel: 'Our Mission',
  aboutLabel: 'About Us',
  aboutHeading: 'The Saat Saath Arts Foundation is a New Delhi–based non-profit organisation established in 2010 as the non-profit arm of Nature Morte.',
  aboutBody: "Founded by Aparajita Jain, the foundation was created to extend the gallery's commitment to research, education, and shared working practices beyond the commercial framework, with a focus on long-term cultural exchange and public engagement. Operating independently as a non-profit, the foundation advances critical dialogue between India and the wider world through contemporary visual art, curatorial research, and educational initiatives. Its programmes prioritise research-led engagement, institutional collaboration, and sustained inquiry rather than short-term, exhibition-driven visibility. The foundation works closely with international museums, biennales, cultural institutions, and independent practitioners, supporting curators and artists through grants, commissions, and site-responsive projects. Key initiatives include the Saat Saath Curatorial Research Grants and the development of The Sculpture Park Jaipur—a long-term public art project realised in partnership with the Government of Rajasthan.",
  leadershipHeading: 'Leadership',
  leadership: [
    { name: 'Aparajita Jain', title: 'Founding Director', imageUrl: '', order: 0 },
    { name: 'Vidisha Aggarwal', title: 'Head of Programs', imageUrl: '', order: 1 },
  ],

  // ── Homepage sections ─────────────────────────────────────────────────────
  programsSectionLabel: 'Programs & Initiatives',
  programsSectionHeading: 'Engaging Communities Through Art',
  grantsSectionLabel: 'Grants & Support',
  grantsSectionHeading: 'Empowering the Arts Ecosystem',
  grantsSectionCta: 'Apply for a Grant',
  grantsPageBgImage: '',

  // ── Footer ────────────────────────────────────────────────────────────────
  footerTagline: 'A New Delhi-based non-profit organisation advancing critical dialogue between India and the wider world through contemporary visual art.',
  footerCopyright: 'Saat Saath Arts Foundation. All rights reserved.',
  address: 'A-7, Poorvi Marg, Block A\nVasant Vihar\nNew Delhi, Delhi 110057\nIndia',
  emailGeneral: 'info@saatsaathartsfoundation.org',
  emailGrants: 'grants@saatsaathartsfoundation.org',
  emailPrograms: 'programs@saatsaathartsfoundation.org',
  instagram: '@saatsaatharts.foundation',
  instagramUrl: 'https://www.instagram.com/saatsaatharts.foundation',

  // ── Grants page ───────────────────────────────────────────────────────────
  grants: {
    pageLabel: 'Funding Opportunities',
    pageTitle: 'Grants',
    pageSubtitle: 'Research-led curatorial grants supporting sustained engagement with contemporary art from India.',
    currentTabLabel: 'SSA-IAF Grant (Current)',
    currentGrantTitle: 'SSA-IAF Curatorial Research Grant (2025–ongoing)',
    currentGrantBody1: "The SSA-IAF Curatorial Research Grant, reimagined in 2025 through a partnership between Saat Saath Arts Foundation and India Art Fair, is a research-led residency designed to foster sustained engagement with India's contemporary art ecosystem.",
    currentGrantBody2: 'Awarded annually to one international curator, the grant prioritises long-term inquiry, dialogue, and institutional relationship-building over immediate exhibition outcomes.',
    currentStructureTitle: 'Grant Structure',
    currentStructureBody: "The grant supports a fully funded two-week research residency anchored around India Art Fair and extending across multiple cities, institutions, studios, and cultural contexts in India. Support includes international airfare, domestic travel, accommodation, and logistical coordination. The research itinerary is developed in close dialogue with the curator's proposed focus.",
    currentEligibilityTitle: 'Eligibility',
    currentEligibilityBody: 'Open to curators practising professionally outside India, including independent, freelance, and institutionally affiliated curators, typically with 8–10 years of experience.',
    currentAwardeeHeading: '2025–26 Awardee',
    currentJuryHeading: '2025–26 Jury',
    awardee: {
      name: 'Habda Rashid',
      role: '2025-26 Awardee',
      imageUrl: '',
      bio: 'Habda Rashid is the Senior Curator of Modern and Contemporary Art at the Fitzwilliam Museum, University of Cambridge where she develops global perspectives in the museum\'s collection and leads major exhibitions. Previously she was the Senior Curator and Interim Artistic Director at Create London and worked at the Whitechapel Gallery. Her research focuses on expanding art histories to include under-represented voices. She is a 2025 Turner Prize jury member.',
    },
    jury: [
      { name: 'Jitish Kallat', role: '2025-26 Jury', imageUrl: '', bio: 'Jitish Kallat is an Indian contemporary artist working across painting, sculpture, photography, installation and multimedia. His art explores urban life, history, time, memory and the cosmos, often rooted in Mumbai\'s imagery and narratives.', order: 0 },
      { name: 'Kamini Sawhney', role: '2025-26 Jury', imageUrl: '', bio: 'Kamini Sawhney is an Indian museum professional and curator, known for shaping contemporary art engagement in India. She was the first Director of the Museum of Art & Photography (MAP) in Bengaluru.', order: 1 },
      { name: 'Sandhini Poddar', role: '2025-26 Jury', imageUrl: '', bio: 'Sandhini Poddar is a London-based art historian and curator focused on modern and contemporary Asian art. She serves as the Adjunct Curator at Large for the Guggenheim Abu Dhabi project.', order: 2 },
      { name: 'Dhyandra Lawson', role: '2025-26 Jury', imageUrl: '', bio: 'Dhyandra Lawson is the Andy Song Assistant Curator of Contemporary Art at the Los Angeles County Museum of Art (LACMA).', order: 3 },
      { name: 'Nawar Al Qassimi', role: '2025-26 Jury', imageUrl: '', bio: 'Nawar Al Qassimi is the Vice President of the Sharjah Art Foundation.', order: 4 },
    ],
    archiveTabLabel: 'Saat Saath Grant (Archive)',
    archiveGrantTitle: 'Saat Saath Curatorial Research Grant (2015–2024)',
    archiveGrantBody1: 'Established in 2015, the original Saat Saath Curatorial Research Grant was conceived by Aparajita Jain in collaboration with Diana Campbell Betancourt as one of the earliest research-first curatorial grants focused on India.',
    archiveGrantBody2: 'At a time when international engagement with Indian contemporary art was largely exhibition-driven, the grant foregrounded research as an autonomous and critical curatorial process.',
    archiveStructureTitle: 'Structure & Administration',
    archiveStructureBody: 'The grant supported international curators undertaking in-depth, self-directed research on Indian artists, practices, and contexts. Rather than prescribing outcomes, it enabled long-term institutional, scholarly, and curatorial engagements. For several editions, the programme was administered by Beth Citron, ensuring continuity, rigour, and international reach until 2024.',
    archiveAwardeesHeading: 'Select Awardees (2015–2024)',
    archiveAwardeesNote: 'Including curators who worked in India and with Indian artists: Helen Pheby (Yorkshire Sculpture Park, Tate & Tate Britain, Brooklyn Museum, Jaipur Kendra), among others.',
    archiveLegacyTitle: 'Legacy',
    archiveLegacyBody: 'The original grant played a formative role in expanding sustained international curatorial engagement with Indian contemporary art, contributing to exhibitions, publications, acquisitions, and long-term institutional relationships worldwide.',
    archiveAwardees: [
      { name: 'Catherine David', role: 'Select Awardee (2015-2024)', imageUrl: '', bio: 'Catherine David is a French art historian and curator. She served as the Deputy Director of the Musée National d\'Art Moderne at the Centre Georges Pompidou, Paris.', order: 0 },
      { name: 'Helen Lucy Pheby', role: 'Select Awardee (2015-2024)', imageUrl: '', bio: 'Helen Lucy Pheby is a British curator known for her work in contemporary sculpture and public art.', order: 1 },
      { name: 'Diana Freundl', role: 'Select Awardee (2015-2024)', imageUrl: '', bio: 'Diana Freundl is the Interim Chief Curator and Associate Director at the Vancouver Art Gallery.', order: 2 },
      { name: 'Laura Raicovich', role: 'Select Awardee (2015-2024)', imageUrl: '', bio: 'Laura Raicovich is a New York-based writer and curator known for her work on art, museums, and cultural institutions.', order: 3 },
      { name: 'Dieter Roelstraete', role: 'Select Awardee (2015-2024)', imageUrl: '', bio: 'Dieter Roelstraete is a Belgian-born contemporary art curator and theorist.', order: 4 },
      { name: 'Brett Littman', role: 'Select Awardee (2015-2024)', imageUrl: '', bio: 'Brett Littman is a New York-based museum director, curator, and writer.', order: 5 },
      { name: 'Lauren Cornell', role: 'Select Awardee (2015-2024)', imageUrl: '', bio: 'Lauren Cornell is an American curator, writer, and art professional based in New York.', order: 6 },
      { name: 'Rachel Kent', role: 'Select Awardee (2015-2024)', imageUrl: '', bio: 'Rachel Kent is an Australian art historian and curator with extensive experience at major museums.', order: 7 },
      { name: 'Nora Lawrence', role: 'Select Awardee (2015-2024)', imageUrl: '', bio: 'Nora Lawrence is the Executive Director of the Storm King Art Center.', order: 8 },
    ],
  },

  // ── Programs page ─────────────────────────────────────────────────────────
  programs: {
    pageTitle: 'Programs',
    pageSubtitle: 'Supporting exhibitions, commissions, and long-term cultural projects that advance contemporary art from India.',
    sculptureParklinkText: 'Visit Sculpture Park',
    sculptureParklinkUrl: 'https://www.thesculpturepark.org/',
    cards: [
      { title: 'Conjectures on a Paper Sky', description: "Jitish Kallat's expansive exhibition, curated by Alexandra Munroe.", date: '4–10 February 2026', imageUrl: '', link: '/programs/conjectures-paper-sky', isExternal: false, order: 0 },
      { title: 'Covering Letter', description: 'The foundation supported Jitish Kallat\'s poetic piece "Covering Letter" at the Chhatrapati Shivaji Maharaj Vastu Sangrahalaya in Mumbai.', date: '', imageUrl: '', link: '', isExternal: false, order: 1 },
      { title: 'Matter', description: 'Supported "Matter," featuring the work of artist Bharti Kher at the Vancouver Art Gallery—resulting from a research trip funded by the organisation.', date: '', imageUrl: '', link: '', isExternal: false, order: 2 },
      { title: 'The Sculpture Park Jaipur', description: 'A long-term public art project at Jaigarh Palace, realised in partnership with the Government of Rajasthan.', date: '', imageUrl: '', link: '', isExternal: false, order: 3 },
    ],
  },

  // ── Sculpture Park page ───────────────────────────────────────────────────
  sculpturePark: {
    pageLabel: 'Major Initiative',
    pageTitle: 'The Sculpture Park',
    pageSubtitle: "A landmark public-private partnership creating unique dialogue between contemporary art and historic architecture in Rajasthan's heritage sites.",
    officialWebsite: 'https://www.thesculpturepark.org/',
    heroImageUrl: '',
    logoImageUrl: '',
    foundingTitle: 'Founding',
    foundingBody1: 'The Sculpture Park was founded on December 10, 2017, through a landmark public-private partnership between the Saat Saath Arts Foundation and the Government of Rajasthan.',
    foundingBody2: "Its mission is to create a unique dialogue between contemporary art and historic architecture, making art accessible to a wider public and promoting India's rich heritage. By placing cutting-edge sculptures within a historical palace, the park aims to boost cultural tourism and foster a deeper appreciation for artistic innovation.",
    evolutionTitle: 'Historical Development',
    evolutionIntro: 'Since its inception, The Sculpture Park has evolved significantly, establishing itself as a cornerstone of contemporary art in Rajasthan.',
    evolutionMilestones: [
      { heading: 'January 2025: Jaigarh Palace', body: 'The park is hosted at the historic Jaigarh Palace, establishing its reputation as a dynamic platform for contemporary sculpture, expanding its scope in collaboration with the Jaipur Centre for Art (JCA).' },
      { heading: 'Exhibitions & Programs', body: 'Five major annual exhibitions, each curated by Peter Nagy, featuring a diverse roster of leading Indian and international artists.' },
    ],
    impactTitle: 'Contemporary Impact',
    impactBody1: 'The Sculpture Park is significantly impacting the contemporary art world by democratizing the art experience. By moving art out of the conventional "white cube" gallery and into a magnificent public heritage site, it has engaged millions of visitors who might not otherwise visit a contemporary art museum.',
    impactBody2: "This initiative has successfully positioned Jaipur as a vital hub in the global art landscape and has set a precedent for future public art projects across India, seamlessly blending the nation's past and present.",
    impactStats: [
      { value: '5', label: 'Annual Exhibitions' },
      { value: 'Millions', label: 'Visitors Engaged' },
      { value: '2', label: 'Heritage Sites' },
    ],
    supportTitle: 'Support and Funding',
    supportIntro: "The park's continued growth and success are made possible by its unique and robust public-private partnership model.",
    supportItems: [
      { title: 'Government Support', body: 'The Government of Rajasthan provides the heritage venues and logistical support.' },
      { title: 'Corporate and Private Funding', body: 'Generous donations and partnerships with corporate sponsors (such as INOX and Borosil for the 5th edition) and private individuals are crucial for its operation.' },
      { title: 'Gallery Partnerships', body: 'Leading national and international galleries support the participation of their artists, contributing to the high caliber of the exhibitions.' },
    ],
    supportNote: 'This collaborative funding structure ensures the foundation can continue its mission of nurturing artistic innovation in a public, non-commercial space.',
    visitTitle: 'Visit Us',
    visitVenueName: 'Jaigarh Fort',
    visitVenueDesc: "Current venue for The Sculpture Park's fifth edition.",
    visitDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Jaigarh+Fort+Jaipur',
    visitMapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.5666890580544!2d75.81512897549344!3d26.98493147669896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db5c6a2b8f9af%3A0x1c7c4b3c6c5c6c5c!2sJaigarh%20Fort!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin',
  },

  // ── Conjectures page ──────────────────────────────────────────────────────
  conjectures: {
    label: 'Exhibition',
    title: 'Conjectures on a Paper Sky',
    subtitle: 'Jitish Kallat at Bikaner House, New Delhi',
    dates: '4–10 February 2026',
    imageUrl: '',
    leadParagraph: "Jitish Kallat's expansive exhibition brings together new and recent works exploring cosmic time, human perception, and contemporary anxieties.",
    body1: 'Curated by Alexandra Munroe, the exhibition features large-scale installations, paintings, and multimedia works that reflect on history, politics, and the human condition through poetic and philosophical lenses.',
    body2: 'The exhibition is presented at Bikaner House, a historic venue in New Delhi, in partnership with Saat Saath Arts Foundation.',
    detailsHeading: 'Exhibition Details',
    detailVenue: 'Bikaner House, New Delhi',
    detailDates: '4–10 February 2026',
    detailCurator: 'Alexandra Munroe',
    detailArtist: 'Jitish Kallat',
  },
});

// ── Controller ────────────────────────────────────────────────────────────────
export const getSiteContent = async (req, res) => {
  try {
    let content = await SiteContent.findOne({ key: KEY });
    if (!content) content = await SiteContent.create(getDefaults());
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

    const content = await SiteContent.findOneAndUpdate({ key: KEY }, body, { new: true, upsert: true });
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
