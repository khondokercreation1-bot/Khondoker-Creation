import { ServiceItem, PortfolioItem, StatItem, TestimonialItem } from '../types';

import heroImg from '../assets/images/hero_3d_mockup_1785848200418.jpg';
import brandingImg from '../assets/images/portfolio_branding_1785848216933.jpg';
import poster3dImg from '../assets/images/portfolio_3d_poster_1785848229723.jpg';
import packagingImg from '../assets/images/portfolio_packaging_1785848240142.jpg';
import cyber3dLogoImg from '../assets/images/cyber_3d_logo_1785850040412.jpg';
import luxuryBizCardImg from '../assets/images/luxury_biz_card_1785850101468.jpg';

export const HERO_IMAGE = heroImg;

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'brand-identity',
    title: 'Brand Identity & Strategy',
    subtitle: 'High-Impact Brand Systems',
    description: 'Complete visual identity design from concept to guidelines. We create memorable logo marks, typography scales, color psychology, and brand strategy books that command authority.',
    iconName: 'Palette',
    features: ['Custom Logo Design', 'Brand Architecture', 'Typography & Color Systems', 'Brand Guidelines Book'],
    deliverables: ['Vector Assets (SVG, EPS, AI)', 'Brand Guidelines PDF', '3D Logo Mockups', 'Social Media Kit']
  },
  {
    id: 'fashion-textile-design',
    title: 'Fashion Design & Textile',
    subtitle: 'Apparel & Fabric Visuals',
    description: 'Innovative fashion concepts, garment CADs, seamless textile pattern designs, and comprehensive apparel collection graphics for fashion labels and garment producers.',
    iconName: 'Shirt',
    features: ['Fashion & Apparel Design', 'Seamless Textile Pattern Design', 'Garment CAD & Techpacks', 'Color Separation & Print Specs'],
    deliverables: ['Vector CAD Specs (AI, EPS, PDF)', 'Seamless Pattern Tiles', 'Factory-Ready Techpacks', 'Photorealistic Apparel Mockups']
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing Graphics',
    subtitle: 'High-Converting Creative Assets',
    description: 'Performance-driven visual assets for paid ad campaigns, high-converting social media carousels, banner ads, and digital billboard campaigns.',
    iconName: 'Sparkles',
    features: ['Ad Banner Suites', 'Instagram/LinkedIn Carousels', 'Promotional Campaign Assets', 'Motion Banners'],
    deliverables: ['Optimized Ad Formats', 'Editable Figma/PSD Templates', 'A/B Test Creative Variants', 'Exported Motion GIFs/MP4']
  },
  {
    id: 'merchandising-textile',
    title: 'Merchandising & Marketing Textile',
    subtitle: 'Apparel & Textile Visuals',
    description: 'Custom textile graphics, apparel merchandising, factory-ready techpacks, pattern designs, and promotional marketing textile assets engineered for fashion brands and retail products.',
    iconName: 'Shirt',
    features: ['Garment Techpacks & Spec Sheets', 'Seamless Textile Pattern Design', 'Apparel & Merchandising Graphics', 'Promotional Marketing Textiles'],
    deliverables: ['Vector Production Files (AI, EPS, PDF)', 'Factory-Ready Techpacks', 'Photorealistic 3D Garment Mockups', 'Color Separations & Print Specs']
  },
  {
    id: 'packaging-design',
    title: 'Luxury Packaging & Labeling',
    subtitle: 'Tactile Consumer Experiences',
    description: 'Premium print-ready packaging solutions featuring custom dielines, foil stamping specifications, embossed textures, and eco-luxury material choices.',
    iconName: 'PackageCheck',
    features: ['Custom Die-Cut Lines', 'Spot UV & Foil Specs', 'Unboxing Experience Design', 'Print Proof Consultation'],
    deliverables: ['Print-Ready PDF/AI Files', 'CMYK Color Separation', '3D Unboxing Mockups', 'Material Sourcing Notes']
  },
  {
    id: 'motion-posters',
    title: 'Motion Design & Posters',
    subtitle: 'Kinetic Visual Typography',
    description: 'Event artwork, kinetic poster designs, graphic apparel graphics, and looped motion graphics that grab attention in noisy feeds.',
    iconName: 'Zap',
    features: ['Kinetic Typography', 'Event Poster Series', 'Merch & Graphic Apparel', 'Looping Social Stories'],
    deliverables: ['4K Animated Video Files', 'High-Res Print PDF', 'Vector Apparel Specs', 'Layered PSD Files']
  }
];

export const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: 'cyber-brand',
    title: 'Cyberpunk 3D Logo & Brand System',
    category: 'Branding',
    image: cyber3dLogoImg,
    client: 'Nexis Cybernetics',
    year: '2026',
    description: 'A futuristic 3D cyberpunk logo mockup engraved on dark titanium metal with glowing laser lights, holographic depth effects, and luxury brand guidelines.',
    tags: ['Cyberpunk 3D Logo', '3D Mockup', 'Brand Identity', 'Laser Neon'],
    featured: true,
    gridSpan: 'md:col-span-2 md:row-span-2'
  },
  {
    id: 'fluid-3d-poster',
    title: 'Chromatic Geometry Poster',
    category: 'Posters',
    image: poster3dImg,
    client: 'Vanguard Music Fest',
    year: '2026',
    description: 'Abstract 3D liquid metal poster design rendered with custom Merchandising and Marketing aesthetics and neon cyan typography.',
    tags: ['3D Render', 'Typography', 'Kinetic Art'],
    gridSpan: 'md:col-span-1 md:row-span-1'
  },
  {
    id: 'luxury-fragrance',
    title: 'Obsidian Noir Packaging',
    category: '3D Mockups',
    image: packagingImg,
    client: 'Maison Noir Paris',
    year: '2025',
    description: 'High-end 3D packaging design and bottle render for luxury unisex fragrance line featuring matte dark obsidian and foil cyan stamping.',
    tags: ['Packaging', '3D Render', 'Luxury'],
    gridSpan: 'md:col-span-1 md:row-span-1'
  },
  {
    id: 'fintech-ui-kit',
    title: 'Tech System Brand & Mockup',
    category: 'UI Visuals',
    image: brandingImg,
    client: 'Aura Protocol',
    year: '2026',
    description: 'A sleek, glassmorphic analytics interface designed for decentralized finance traders with dark mode visual hierarchy.',
    tags: ['UI/UX', 'Dashboard', 'Design System'],
    gridSpan: 'md:col-span-1 md:row-span-2'
  },
  {
    id: 'social-campaign',
    title: 'Pulse 3D Visual Master Art',
    category: 'Social Media',
    image: heroImg,
    client: 'Pulse Studio',
    year: '2026',
    description: 'Dynamic 3D product visual graphics and layout design kit tailored for modern digital campaigns and brand identity.',
    tags: ['Social Media', '3D Visual', 'Ad Campaign'],
    gridSpan: 'md:col-span-1 md:row-span-1'
  },
  {
    id: 'vector-mono',
    title: 'Luxury Gold-Foil Business Card Suite',
    category: 'Branding',
    image: luxuryBizCardImg,
    client: 'Maison de Luxe',
    year: '2026',
    description: 'Ultra-exclusive matte black business card mockups featuring tactile gold-foil foil stamping, bevel embossing, and bespoke stationery guidelines.',
    tags: ['Luxury Business Card', 'Gold Foil', 'Branding', 'Stationery'],
    gridSpan: 'md:col-span-1 md:row-span-1'
  }
];

export const STATS_DATA: StatItem[] = [
  {
    value: '10+',
    label: 'Projects Completed',
    description: 'Crafted with precision across global brands & startups'
  },
  {
    value: '100%',
    label: 'Client Satisfaction',
    description: 'Dedicated 1-on-1 creative direction & quality guarantees'
  },
  {
    value: '5+ Years',
    label: 'Design Expertise',
    description: 'Spearheading luxury branding and modern 3D design'
  },
  {
    value: '45+',
    label: 'Global Clients',
    description: 'Partnering with visionaries from USA, UK, Europe & Asia'
  }
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 't1',
    quote: 'Khondoker Creation redefined our entire brand architecture. The 3D mockups and dark mode aesthetic they crafted gave our launch the luxury feel we desperately needed.',
    author: 'Marcus Vance',
    role: 'Creative Director',
    company: 'Nexis AI',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    rating: 5
  },
  {
    id: 't2',
    quote: 'The visual clarity and turnaround speed were unbelievable. Every card, packaging detail, and ad asset was delivered pixel-perfect and print-ready.',
    author: 'Elena Rostova',
    role: 'Head of Marketing',
    company: 'Maison Noir',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    rating: 5
  },
  {
    id: 't3',
    quote: 'Finding a design studio that combines deep brand strategy with cutting-edge 3D visual art is rare. Khondoker Creation is our go-to partner.',
    author: 'David Chen',
    role: 'Founder & CEO',
    company: 'Aura Protocol',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    rating: 5
  }
];
