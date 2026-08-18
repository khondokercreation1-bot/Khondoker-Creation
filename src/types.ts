export type CategoryType = 
  | 'All' 
  | 'Logo Design'
  | 'Social Media Post'
  | 'Label Design'
  | 'Packaging Design'
  | 'Box Design'
  | 'Pattern Design'
  | 'Techpack Design'
  | 'Branding' 
  | '3D Mockups' 
  | 'Social Media' 
  | 'Posters' 
  | 'UI Visuals';

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  features: string[];
  deliverables: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: Exclude<CategoryType, 'All'>;
  image: string;
  client: string;
  year: string;
  description: string;
  tags: string[];
  featured?: boolean;
  gridSpan?: string; // e.g., 'col-span-1 md:col-span-2'
}

export interface StatItem {
  value: string;
  label: string;
  description: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
}
