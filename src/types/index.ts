export interface NavItem {
  name: string;
  href: string;
}

export interface DiagnosticItem {
  num: string;
  title: string;
  desc: string;
  image: string;
  caption: string;
  quote: string;
}

export interface GalleryItem {
  id: string;
  image: string;
  text: string;
  subtext: string;
}

export interface ServiceItem {
  id: string;
  num: string;
  name: string;
  badge: string;
  scopeLabel: string;
  tagline: string;
  description: string;
  deliverables: string[];
  image: string;
  caption: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  quote: string;
  image: string;
}

export interface InquiryRecord {
  id: string;
  name: string;
  studio: string;
  email: string;
  handle?: string;
  service: string;
  message: string;
  status: 'new' | 'reviewed' | 'contacted' | 'archived';
  createdAt: any;
  notes?: string;
}

export interface SiteContent {
  nav: {
    logoText: string;
    links: NavItem[];
    ctaText: string;
  };
  hero: {
    bgImage: string;
    titleLine1: string;
    titleItalic1: string;
    titleAfterItalic1: string;
    titleLine2: string;
    titleItalic2: string;
    description: string;
    ctaPrimaryText: string;
    ctaPrimaryLink: string;
    ctaSecondaryText: string;
    ctaSecondaryLink: string;
    tickerItems: string[];
  };
  mission: {
    eyebrow: string;
    statementPart1: string;
    statementItalic1: string;
    statementPart2: string;
    statementItalic2: string;
    statementPart3: string;
    badge: string;
  };
  philosophy: {
    founderName: string;
    founderTitle: string;
    founderImage1: string;
    founderImage2: string;
    eyebrow: string;
    heading: string;
    headingItalic: string;
    headingEnd: string;
    description: string;
    onSetLabel: string;
    onSetSub: string;
    pillars: string[];
    ctaPrimaryText: string;
    ctaSecondaryText: string;
  };
  checklist: {
    eyebrow: string;
    heading: string;
    headingItalic: string;
    description: string;
    ctaText: string;
    responseTimeText: string;
    items: DiagnosticItem[];
  };
  gallery: {
    eyebrow: string;
    heading: string;
    headingItalic: string;
    description: string;
    cueText: string;
    ctaText: string;
    items: GalleryItem[];
  };
  servicesHeader: {
    eyebrow: string;
    heading: string;
    headingItalic: string;
    description: string;
    inclusionsLabel: string;
    inquireCtaText: string;
    bottomNote: string;
    bottomCtaText: string;
  };
  services: ServiceItem[];
  testimonialsHeader: {
    eyebrow: string;
  };
  testimonials: TestimonialItem[];
  contact: {
    eyebrow: string;
    heading: string;
    headingItalic: string;
    description: string;
    formLabels: {
      name: string;
      studio: string;
      email: string;
      handle: string;
      service: string;
      message: string;
      submitButton: string;
      assurance: string;
    };
    founderImage: string;
    founderRole: string;
    founderQuote: string;
    email: string;
    location: string;
    instagramHandle: string;
    availability: string;
    footerBio: string;
  };
  footer: {
    exploreTitle: string;
    inquiriesTitle: string;
    copyright: string;
    backToTopText: string;
    links: NavItem[];
  };
}
