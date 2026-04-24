import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export const SITE_CONTENT_KEY = 'main';

const uploadPath = (filename) => `/uploads/posters/${filename}`;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const backendRoot = path.resolve(__dirname, '../..');
const repoRoot = path.resolve(backendRoot, '..');
const uploadsDir = path.join(backendRoot, 'uploads', 'posters');

export const siteContentSeedUploads = [
  { source: 'frontend/src/assets/bikaner-hero.png', target: 'bikaner-hero.png' },
  { source: 'frontend/src/assets/sculpture-jaipur.png', target: 'sculpture-jaipur.png' },
  { source: 'frontend/src/assets/aparajita-jain.png', target: 'aparajita-jain.png' },
  { source: 'frontend/src/assets/vidisha-aggarwal.png', target: 'vidisha-aggarwal.png' },
  { source: 'frontend/src/assets/profile-habda.png', target: 'profile-habda.png' },
  { source: 'frontend/src/assets/profile-jitish.png', target: 'profile-jitish.png' },
  { source: 'frontend/src/assets/profile-kamini.png', target: 'profile-kamini.png' },
  { source: 'frontend/src/assets/profile-sandhini.png', target: 'profile-sandhini.png' },
  { source: 'frontend/src/assets/profile-dhyandra.png', target: 'profile-dhyandra.png' },
  { source: 'frontend/src/assets/profile-nawar.png', target: 'profile-nawar.png' },
  { source: 'frontend/src/assets/profile-catherine.png', target: 'profile-catherine.png' },
  { source: 'frontend/src/assets/profile-helen.png', target: 'profile-helen.png' },
  { source: 'frontend/src/assets/profile-diana-f.png', target: 'profile-diana-f.png' },
  { source: 'frontend/src/assets/profile-laura.png', target: 'profile-laura.png' },
  { source: 'frontend/src/assets/profile-dieter.png', target: 'profile-dieter.png' },
  { source: 'frontend/src/assets/profile-brett.png', target: 'profile-brett.png' },
  { source: 'frontend/src/assets/profile-lauren.png', target: 'profile-lauren.png' },
  { source: 'frontend/src/assets/profile-rachel.png', target: 'profile-rachel.png' },
  { source: 'frontend/src/assets/profile-nora.png', target: 'profile-nora.png' },
  { source: 'frontend/src/assets/initiative1.png', target: 'initiative1.png' },
  { source: 'frontend/src/assets/sculpture-park2.png', target: 'sculpture-park2.png' },
  { source: 'frontend/src/assets/sculpture-park-hero.png', target: 'sculpture-park-hero.png' },
  { source: 'frontend/src/assets/sculpture-park-logo.png', target: 'sculpture-park-logo.png' },
];

export const ensureSiteContentSeedUploads = () => {
  fs.mkdirSync(uploadsDir, { recursive: true });

  siteContentSeedUploads.forEach(({ source, target }) => {
    const sourcePath = path.join(repoRoot, source);
    const targetPath = path.join(uploadsDir, target);

    if (!fs.existsSync(sourcePath)) {
      throw new Error(`Missing seed asset: ${sourcePath}`);
    }

    if (!fs.existsSync(targetPath)) {
      fs.copyFileSync(sourcePath, targetPath);
    }
  });
};

export const getDefaultSiteContent = () => ({
  key: SITE_CONTENT_KEY,

  heroSlides: [
    {
      title: 'Conjectures on a Paper Sky',
      subtitle: 'Jitish Kallat at Bikaner House, New Delhi',
      ctaText: 'Learn More',
      ctaLink: '/programs/conjectures-paper-sky',
      isExternal: false,
      imageUrl: uploadPath('bikaner-hero.png'),
      order: 0,
    },
    {
      title: 'The Sculpture Park Jaipur',
      subtitle: 'A long-term public art project at Jaigarh Palace',
      ctaText: 'Visit Sculpture Park',
      ctaLink: 'https://www.thesculpturepark.org/',
      isExternal: true,
      imageUrl: uploadPath('sculpture-jaipur.png'),
      order: 1,
    },
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
    {
      name: 'Aparajita Jain',
      title: 'Founding Director',
      imageUrl: uploadPath('aparajita-jain.png'),
      order: 0,
    },
    {
      name: 'Vidisha Aggarwal',
      title: 'Head of Programs',
      imageUrl: uploadPath('vidisha-aggarwal.png'),
      order: 1,
    },
  ],

  programsSectionLabel: 'Programs & Initiatives',
  programsSectionHeading: 'Engaging Communities Through Art',
  grantsSectionLabel: 'Grants & Support',
  grantsSectionHeading: 'Empowering the Arts Ecosystem',
  grantsSectionCta: 'Apply for a Grant',
  grantsPageBgImage: 'https://images.unsplash.com/photo-1646600950096-0489e2a461cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFudHMlMjBiYWNrZ3JvdW5kJTIwdGV4dHVyZSUyMHBhcGVyfGVufDF8fHx8MTc3MjY4NTc4Nnww&ixlib=rb-4.1.0&q=80&w=1080',

  footerTagline: 'A New Delhi-based non-profit organisation advancing critical dialogue between India and the wider world through contemporary visual art.',
  footerCopyright: 'Saat Saath Arts Foundation. All rights reserved.',
  address: 'A-7, Poorvi Marg, Block A\nVasant Vihar\nNew Delhi, Delhi 110057\nIndia',
  emailGeneral: 'info@saatsaathartsfoundation.org',
  emailGrants: 'grants@saatsaathartsfoundation.org',
  emailPrograms: 'programs@saatsaathartsfoundation.org',
  instagram: '@saatsaatharts.foundation',
  instagramUrl: 'https://www.instagram.com/saatsaatharts.foundation?igsh=a2U3d3pxZjQ4andw',

  grants: {
    pageLabel: 'Funding Opportunities',
    pageTitle: 'Grants',
    pageSubtitle: 'Research-led curatorial grants supporting sustained engagement with contemporary art from India.',
    currentTabLabel: 'SSA-IAF Grant (Current)',
    archiveTabLabel: 'Saat Saath Grant (Archive)',
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
      role: '2025–26 Awardee',
      imageUrl: uploadPath('profile-habda.png'),
      bio: "Habda Rashid is the Senior Curator of Modern and Contemporary Art at the Fitzwilliam Museum, University of Cambridge where she develops global perspectives in the museum's collection and leads major exhibitions. Previously she was the Senior Curator and Interim Artistic Director at Create London and worked at the Whitechapel Gallery. Her research focuses on expanding art histories to include under-represented voices. She is a 2025 Turner Prize jury member.",
      order: 0,
    },
    jury: [
      {
        name: 'Jitish Kallat',
        role: '2025–26 Jury',
        imageUrl: uploadPath('profile-jitish.png'),
        bio: "Jitish Kallat is an Indian contemporary artist working across painting, sculpture, photography, installation and multimedia. His art explores urban life, history, time, memory and the cosmos, often rooted in Mumbai's imagery and narratives. Kallat has exhibited widely at major global institutions including the Art Institute of Chicago, Tate Modern and NGMA New Delhi. He served as Curator and Artistic Director of the 2014 Kochi-Muziris Biennale. He is also an Ex-Trustee of the India Foundation of Arts. Kallat lives and works in Mumbai and holds a BFA from Sir J.J. School of Art (1996).",
        order: 0,
      },
      {
        name: 'Kamini Sawhney',
        role: '2025–26 Jury',
        imageUrl: uploadPath('profile-kamini.png'),
        bio: 'Kamini Sawhney is an Indian museum professional and curator, known for shaping contemporary art engagement in India. She was the first Director of the Museum of Art & Photography (MAP) in Bengaluru and helped launch it as a digital-first museum. Earlier, she led the Jehangir Nicholson Art Foundation at CSMVS, Mumbai, organising major exhibitions. Sawhney began her career as a journalist, serving as the NDTV Mumbai Bureau Chief. In 2022 she became the first Indian elected to the board of CIMAM, the International Committee for Museums and Collections of Modern Art.',
        order: 1,
      },
      {
        name: 'Sandhini Poddar',
        role: '2025–26 Jury',
        imageUrl: uploadPath('profile-sandhini.png'),
        bio: 'Sandhini Poddar is a London-based art historian and curator focused on modern and contemporary Asian art. She serves as the Adjunct Curator at Large for the Guggenheim Abu Dhabi project, leading research, acquisitions and special exhibitions. Previously she was on the curatorial team at the Solomon R. Guggenheim Museum, where she organized major exhibitions including those on V.S. Gaitonde, Anish Kapoor and global Asian art. Poddar writes on art, aesthetics and politics for publications such as Artforum and ArtAsia Pacific. She holds postgraduate degrees from New York University and the University of Mumbai and is a Trustee of the South London Gallery.',
        order: 2,
      },
      {
        name: 'Dhyandra Lawson',
        role: '2025–26 Jury',
        imageUrl: uploadPath('profile-dhyandra.png'),
        bio: "Dhyandra Lawson is the Andy Song Assistant Curator of Contemporary Art at the Los Angeles County Museum of Art (LACMA). She leads major exhibitions including Imagining Black Diasporas: 21st Century Art and Poetics (2024-25). Lawson previously curated shows like Family Album and Eleanor Antin: Time's Arrow. She has written for LACMA publications on photography and visual culture. Beyond LACMA, she teaches at the Occidental College and California Institute of the Arts. Her work expands representation and global perspectives in contemporary art.",
        order: 3,
      },
      {
        name: 'Nawar Al Qassimi',
        role: '2025–26 Jury',
        imageUrl: uploadPath('profile-nawar.png'),
        bio: 'Nawar Al Qassimi is the Vice President of the Sharjah Art Foundation. She joined the Foundation in 2010, initially in audience engagement and later leading development and strategic planning. She holds a degree in communications and advertising from the American University of Sharjah. Al Qassimi helps shape programs, partnerships, and advocacy for art locally and globally. She is recognised as an influential cultural voice in the Arab art scene.',
        order: 4,
      },
    ],
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
      {
        name: 'Catherine David',
        role: 'Select Awardee (2015–2024)',
        imageUrl: uploadPath('profile-catherine.png'),
        bio: "Catherine David is a French art historian and curator. She served as the Deputy Director of the Musee National d'Art Moderne at the Centre Georges Pompidou, Paris. David was also the Artistic Director of documenta X in Kassel, the first woman to lead the major global exhibition. She has curated major international shows including at Venice Biennale and in Abu Dhabi, Doha, and Paris. Her work bridges contemporary art with cultural and global dialogues.",
        order: 0,
      },
      {
        name: 'Helen Lucy Pheby',
        role: 'Select Awardee (2015–2024)',
        imageUrl: uploadPath('profile-helen.png'),
        bio: 'Helen Lucy Pheby is a British curator known for her work in contemporary sculpture and public art. She serves as the Head of Culture, Heritage and Sport at the West Yorkshire Combined Authority and was formerly the Associate Director, Programme at the Yorkshire Sculpture Park. Her PhD focused on public engagement with art, and she has curated international projects like the Kyiv Sculpture Project and the Art by Email exhibitions. Pheby has advised the Arts Council Collection, chaired UP Projects in London, and lectures globally on art and access. Her career spans over two decades promoting inclusive and accessible art experiences.',
        order: 1,
      },
      {
        name: 'Diana Freundl',
        role: 'Select Awardee (2015–2024)',
        imageUrl: uploadPath('profile-diana-f.png'),
        bio: 'Diana Freundl is the Interim Chief Curator and Associate Director at the Vancouver Art Gallery, with a focus on Asian art exhibitions. She curates major shows and leads the Gallery\'s public art space Offsite, commissioning site-specific projects. Before joining the Gallery in 2013, she lived and worked in mainland China and Taiwan, including curatorial roles in Shanghai. Her academic background spans comparative religion, philosophy, and journalism, with studies at the Tsinghua University, Beijing. She has contributed to art publications and co-authored books like Moving Still: Performative Photography in India.',
        order: 2,
      },
      {
        name: 'Laura Raicovich',
        role: 'Select Awardee (2015–2024)',
        imageUrl: uploadPath('profile-laura.png'),
        bio: "Laura Raicovich is a New York-based writer and curator known for her work on art, museums, and cultural institutions. She authored Culture Strike: Art and Museums in an Age of Protest and other books on art and society. She has led major institutions including the Queens Museum and served as interim director of the Leslie-Lohman Museum of Art. Raicovich co-founded Protodispatch and The Francis Kite Club, blending cultural practice with public dialogue. She received fellowships from the Rockefeller Foundation and the Emily H. Tremaine Journalism Fellowship for Curators. Raicovich lectures internationally and works on projects exploring equity, freedom of speech, and art's role in public life.",
        order: 3,
      },
      {
        name: 'Dieter Roelstraete',
        role: 'Select Awardee (2015–2024)',
        imageUrl: uploadPath('profile-dieter.png'),
        bio: 'Dieter Roelstraete is a Belgian-born contemporary art curator and theorist, trained in philosophy at the University of Ghent. He is curator at the Neubauer Collegium for Culture and Society at the University of Chicago, where he also teaches. His career includes senior curatorial roles at the Museum of Contemporary Art Chicago and the Antwerp Museum of Contemporary Art (MuHKA). He served on the curatorial team for Documenta 14. Roelstraete has published widely on contemporary art and philosophical issues and organized major exhibitions internationally.',
        order: 4,
      },
      {
        name: 'Brett Littman',
        role: 'Select Awardee (2015–2024)',
        imageUrl: uploadPath('profile-brett.png'),
        bio: 'Brett Littman is a New York-based museum director, curator, and writer with more than 30 years leading art institutions and programs. He currently heads Shakkei Consulting, advising on museum strategy and exhibitions. He previously served as the Senior Director at the Carpenters Workshop Gallery and Director of the Isamu Noguchi Foundation and Garden Museum. Littman has led and curated many multidisciplinary exhibitions and written widely on art, design, and culture. He holds a B.A. in Philosophy from the University of California, San Diego, and is a Chevalier of the Order of Arts and Letters (France).',
        order: 5,
      },
      {
        name: 'Lauren Cornell',
        role: 'Select Awardee (2015–2024)',
        imageUrl: uploadPath('profile-lauren.png'),
        bio: 'Lauren Cornell is an American curator, writer, and art professional based in New York. She is the Artistic Director of the Hessel Museum of Art and was the Director of the Graduate Program at the Center for Curatorial Studies, Bard College. Previously she curated at the New Museum and led its tech-art affiliate Rhizome. She co-founded the art-tech conference Seven on Seven and has edited Mass Effect: Art and the Internet in the Twenty-First Century. Cornell has organized major exhibitions and contributed to international art publications.',
        order: 6,
      },
      {
        name: 'Rachel Kent',
        role: 'Select Awardee (2015–2024)',
        imageUrl: uploadPath('profile-rachel.png'),
        bio: 'Rachel Kent is an Australian art historian and curator with extensive experience at major museums and institutions. She served as the Chief Curator at the Museum of Contemporary Art Australia and has presented exhibitions across Australia, New Zealand, Japan, the USA, and Canada. Kent is a strong advocate for contemporary and First Nations art and builds philanthropic and government support for the arts. She has delivered public talks, served on editorial and advisory panels, and authored award-winning artist monographs. Kent is also the CEO of Bundanon Trust, leading its artistic vision and programs nationally and internationally.',
        order: 7,
      },
      {
        name: 'Nora Lawrence',
        role: 'Select Awardee (2015–2024)',
        imageUrl: uploadPath('profile-nora.png'),
        bio: "Nora Lawrence is the Executive Director of the Storm King Art Center, a major 500-acre outdoor sculpture museum in New York's Hudson Valley. She previously served as the Artistic Director and Chief Curator, shaping ambitious exhibitions and growing audiences. Lawrence has collaborated with artists like Rashid Johnson, Wangechi Mutu, and Martin Puryear on site-specific commissions. Her early career includes work at The Museum of Modern Art and the National Gallery of Art. She holds degrees from Pomona College, University of Southern California, and CUNY Graduate Center.",
        order: 8,
      },
    ],
  },

  programs: {
    pageTitle: 'Programs',
    pageSubtitle: 'Supporting exhibitions, commissions, and long-term cultural projects that advance contemporary art from India.',
    sculptureParklinkText: 'Visit Sculpture Park',
    sculptureParklinkUrl: 'https://www.thesculpturepark.org/',
    cards: [
      {
        title: 'Conjectures on a Paper Sky',
        description: "Jitish Kallat's expansive exhibition, curated by Alexandra Munroe.",
        date: '4–10 February 2026',
        imageUrl: uploadPath('initiative1.png'),
        link: '/programs/conjectures-paper-sky',
        isExternal: false,
        order: 0,
      },
      {
        title: 'Covering Letter',
        description: 'The foundation supported Jitish Kallat\'s poetic piece "Covering Letter" at the Chhatrapati Shivaji Maharaj Vastu Sangrahalaya in Mumbai.',
        date: '',
        imageUrl: 'https://images.unsplash.com/photo-1723974591057-ccadada1f283?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBhcnQlMjBnYWxsZXJ5JTIwZXhoaWJpdGlvbiUyMG1vZGVybnxlbnwxfHx8fDE3NzI2ODU3ODR8MA&ixlib=rb-4.1.0&q=80&w=1080',
        link: '',
        isExternal: false,
        order: 1,
      },
      {
        title: 'Matter',
        description: 'Supported "Matter," featuring the work of artist Bharti Kher at the Vancouver Art Gallery—resulting from a research trip funded by the organisation.',
        date: '',
        imageUrl: 'https://images.unsplash.com/photo-1761386001767-4bc6f2648077?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBpbnN0YWxsYXRpb24lMjBtdXNldW0lMjBzcGFjZXxlbnwxfHx8fDE3NzI2ODU3ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        link: '',
        isExternal: false,
        order: 2,
      },
      {
        title: 'The Sculpture Park Jaipur',
        description: 'A long-term public art project at Jaigarh Palace, realised in partnership with the Government of Rajasthan.',
        date: '',
        imageUrl: uploadPath('sculpture-park2.png'),
        link: '',
        isExternal: false,
        order: 3,
      },
    ],
  },

  sculpturePark: {
    pageLabel: 'Major Initiative',
    pageTitle: 'The Sculpture Park',
    pageSubtitle: "A landmark public-private partnership creating unique dialogue between contemporary art and historic architecture in Rajasthan's heritage sites.",
    officialWebsite: 'https://www.thesculpturepark.org/',
    heroImageUrl: uploadPath('sculpture-park-hero.png'),
    logoImageUrl: uploadPath('sculpture-park-logo.png'),
    foundingTitle: 'Founding',
    foundingBody1: 'The Sculpture Park was founded on December 10, 2017, through a landmark public-private partnership between the Saat Saath Arts Foundation and the Government of Rajasthan.',
    foundingBody2: "Its mission is to create a unique dialogue between contemporary art and historic architecture, making art accessible to a wider public and promoting India's rich heritage. By placing cutting-edge sculptures within a historical palace, the park aims to boost cultural tourism and foster a deeper appreciation for artistic innovation.",
    evolutionTitle: 'Historical Development',
    evolutionIntro: 'Since its inception, The Sculpture Park has evolved significantly, establishing itself as a cornerstone of contemporary art in Rajasthan.',
    evolutionMilestones: [
      {
        heading: 'January 2025: Jaigarh Palace',
        body: 'The park is hosted at the historic Jaigarh Palace, establishing its reputation as a dynamic platform for contemporary sculpture, expanding its scope in collaboration with the Jaipur Centre for Art (JCA).',
      },
      {
        heading: 'Exhibitions & Programs',
        body: 'Five major annual exhibitions, each curated by Peter Nagy, featuring a diverse roster of leading Indian and international artists.',
      },
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
      {
        title: 'Government Support',
        body: 'The Government of Rajasthan provides the heritage venues and logistical support.',
      },
      {
        title: 'Corporate and Private Funding',
        body: 'Generous donations and partnerships with corporate sponsors (such as INOX and Borosil for the 5th edition) and private individuals are crucial for its operation.',
      },
      {
        title: 'Gallery Partnerships',
        body: 'Leading national and international galleries support the participation of their artists, contributing to the high caliber of the exhibitions.',
      },
    ],
    supportNote: 'This collaborative funding structure ensures the foundation can continue its mission of nurturing artistic innovation in a public, non-commercial space.',
    visitTitle: 'Visit Us',
    visitVenueName: 'Jaigarh Fort',
    visitVenueDesc: "Current venue for The Sculpture Park's fifth edition.",
    visitDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Jaigarh+Fort+Jaipur',
    visitMapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.5666890580544!2d75.81512897549344!3d26.98493147669896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db5c6a2b8f9af%3A0x1c7c4b3c6c5c6c5c!2sJaigarh%20Fort!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin',
  },

  conjectures: {
    label: 'Exhibition',
    title: 'Conjectures on a Paper Sky',
    subtitle: 'Jitish Kallat at Bikaner House, New Delhi',
    dates: '4–10 February 2026',
    imageUrl: uploadPath('initiative1.png'),
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
