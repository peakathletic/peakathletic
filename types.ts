
export interface ScheduleItem {
  id: string;
  time: string;
  activity: string;
  hall: string;
  coachName: string;
  coachImage: string;
  day: string;
  branch: string;
  type: string; // e.g., 'fitness', 'combat', 'ball'
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
}

export interface LocationItem {
  id: string;
  name: string;
  address: string;
  image: string;
  mapUrl: string;
}

export interface SocialLinkItem {
  id: string;
  platform: 'facebook' | 'instagram' | 'tiktok' | 'whatsapp' | 'amazon' | 'website';
  url: string;
}

export interface ProductItem {
  id: string;
  name: string;
  price: string;
  image: string;
}

export interface FooterContent {
  description: string;
  email: string;
  phone: string;
  address: string;
  copyrightText: string;
}

export interface StoreContent {
  title: string;
  subtitle: string;
  backgroundImage: string;
}

export interface MissionContent {
  title: string;
  text: string;
  backgroundImage: string;
}

// New Types for Dynamic Modals
export interface VisionItem {
  id: string;
  title: string;
  text: string;
  color: 'blue' | 'cyan' | 'indigo';
}

export interface GoalItem {
  id: string;
  text: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  text: string;
  icon: 'ClipboardCheck' | 'Users' | 'Apple' | 'TrendingUp'; 
  color: 'blue' | 'green' | 'orange' | 'purple';
}

export interface ProgramItem {
  id: string;
  title: string;
  icon: 'Flame' | 'Target' | 'Trophy' | 'Dumbbell';
  
  phase1Title: string;
  phase1Duration: string;
  phase1Details: string[]; // Handled as newline separated string in EditModal
  phase1Theme: 'blue' | 'red';
  
  phase2Title: string;
  phase2Duration: string;
  phase2Details: string[];
  phase2Theme: 'blue' | 'red';
}

export interface SiteContent {
  header: {
    logoImage: string;
    title: string;
  };
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
    backgroundImage: string;
  };
  mission: MissionContent;
  socialLinks: SocialLinkItem[];
  // about: { title: string; text: string; }; // Removed old simple about
  locations: LocationItem[];
  events: EventItem[];
  teams: TeamMember[];
  schedule: ScheduleItem[];
  store: StoreContent;
  storeProducts: ProductItem[];
  storeLinks: SocialLinkItem[];
  footer: FooterContent;
  
  // New Sections
  vision: VisionItem[];
  goals: GoalItem[];
  features: FeatureItem[];
  trainingPrograms: ProgramItem[];
}

export type SectionKey = keyof SiteContent;

export interface EditContextProps {
  isEditing: boolean;
  content: SiteContent;
  updateContent: (section: SectionKey, data: any) => void;
  updateSchedule: (items: ScheduleItem[]) => void;
  login: (password: string) => boolean;
  logout: () => void;
}
