import { SiteContent } from '../types';

export const defaultContent: SiteContent = {
  nav: {
    logoText: "Sam K.",
    links: [
      { name: "About", href: "#about" },
      { name: "Services", href: "#services" },
      { name: "Diagnostic", href: "#philosophy" },
      { name: "Feed Showcase", href: "#work" },
      { name: "Contact", href: "#contact" }
    ],
    ctaText: "Let's Work Together"
  },
  hero: {
    bgImage: "/images/hero-editorial-capture.jpg",
    titleLine1: "WE",
    titleItalic1: "are here",
    titleAfterItalic1: "TO HELP",
    titleLine2: "YOUR SOCIAL MEDIA",
    titleItalic2: "grow.",
    description: "Helping founder-led brands adapt their marketing strategies to build genuine brand authority, on-location iPhone 4K content, and high-converting paid campaigns.",
    ctaPrimaryText: "Get In Touch",
    ctaPrimaryLink: "#contact",
    ctaSecondaryText: "Meet Samrah",
    ctaSecondaryLink: "#about",
    tickerItems: [
      "Social Media Management",
      "Content Strategy Roadmap",
      "On-Location iPhone 4K Shoots",
      "Meta & Google Ads",
      "VIP Bespoke Retainers"
    ]
  },
  mission: {
    eyebrow: "The Studio Mission",
    statementPart1: "A BESPOKE SOCIAL MEDIA & CONTENT STUDIO",
    statementItalic1: "driven to",
    statementPart2: "HELPING BRANDS ADAPT THEIR SOCIAL STRATEGIES IN ORDER TO",
    statementItalic2: "authentically",
    statementPart3: "COMMAND AUTHORITY ONLINE.",
    badge: "EST. 2026 • SAM K. SOCIALS"
  },
  philosophy: {
    founderName: "Samrah Khan",
    founderTitle: "Founder & Strategist",
    founderImage1: "/images/founder-blazer.jpg",
    founderImage2: "/images/founder-trench.jpg",
    eyebrow: "About Sam K. Socials",
    heading: "Help you stand out in the",
    headingItalic: "crowd.",
    headingEnd: "",
    description: "Founded by Samrah Khan, Sam K. Socials brings over 7 years of hands-on experience across organic social strategy, platform-native iPhone content, and paid advertising. We partner directly with ambitious founders and modern businesses in Sydney and worldwide to replace social media chaos with calm, intentional strategy that drives qualified enquiries.",
    onSetLabel: "On Set",
    onSetSub: "4K Capture",
    pillars: [
      "Zero Generic Templates",
      "High-Ticket Brand Voice",
      "Direct Founder Care",
      "Clear Commercial ROI"
    ],
    ctaPrimaryText: "View Capabilities",
    ctaSecondaryText: "Let's Talk"
  },
  checklist: {
    eyebrow: "Strategic Fit Diagnostic",
    heading: "Do you need",
    headingItalic: "to",
    description: "A diagnostic for founder-led brands ready to shift from sporadic posting to intentional, high-converting authority.",
    ctaText: "Book A Fit Call",
    responseTimeText: "Personalized Review • Response in 24–48h",
    items: [
      {
        num: "01",
        title: "Develop a bespoke social media strategy",
        desc: "A tailored roadmap that defines your visual identity, target audience, and content pillars without relying on generic gimmicks.",
        image: "/images/workspace-couch.jpg",
        caption: "STUDIO ARCHIVE • WORKSPACE 03",
        quote: "Strategy is deciding what not to do."
      },
      {
        num: "02",
        title: "Capture on-location 4K photo & video on iPhone",
        desc: "Authentic, social-first visual assets captured in your studio, space or venue that feel natural, tactile and expensive.",
        image: "/images/founder-trench.jpg",
        caption: "ON LOCATION • SYDNEY SHOOT",
        quote: "Natural light, tactile angles, zero corporate polish."
      },
      {
        num: "03",
        title: "Scale targeted Meta & Google Ads",
        desc: "Data-led advertising campaigns built for tangible client inquiries, bookings, and measurable commercial return.",
        image: "/images/workspace-travertine.jpg",
        caption: "PERFORMANCE • COMMERCIAL SCALE",
        quote: "Creative without data is art. Creative with data is commerce."
      },
      {
        num: "04",
        title: "Eliminate the daily friction of content management",
        desc: "End-to-end copywriting, scheduling, community management and reporting so social media stops being an unpaid chore.",
        image: "/images/founder-blazer.jpg",
        caption: "STUDIO LEAD • FULL DELEGATION",
        quote: "Replace daily panic with calm, repeatable systems."
      },
      {
        num: "05",
        title: "Curate a recognizable, high-authority brand feed",
        desc: "Transform your profile into a magnetic digital flagship that commands respect and justifies premium pricing.",
        image: "/images/feed-atelier-travertin.jpg",
        caption: "VISUAL DIRECTION • FEED FLAGSHIP",
        quote: "Your grid should justify your pricing before a call is booked."
      }
    ]
  },
  gallery: {
    eyebrow: "Visual Portfolio",
    heading: "The Social Edit &",
    headingItalic: "Feed Showcase",
    description: "A glimpse into the on-location iPhone content capture, aesthetic curation and cohesive storytelling we produce for founder-led brands.",
    cueText: "← Drag horizontally or click cards to view feed details →",
    ctaText: "Request Feed Audit & Proposal",
    items: [
      { id: "feed-1", image: "/images/feed-atelier-travertin.jpg", text: "@ATELIER.TRAVERTIN", subtext: "Interior Architecture" },
      { id: "feed-2", image: "/images/feed-maison-solene.jpg", text: "@MAISON.SOLENE", subtext: "Luxury Lifestyle" },
      { id: "feed-3", image: "/images/feed-samk-socials.jpg", text: "@SAMK.SOCIALS", subtext: "Studio Flagship" },
      { id: "feed-4", image: "/images/feed-kinfolk-roast.jpg", text: "@KINFOLK.ROAST", subtext: "Boutique Hospitality" },
      { id: "feed-5", image: "/images/feed-botanica-studio.jpg", text: "@BOTANICA.STUDIO", subtext: "Creative Direction" },
      { id: "feed-6", image: "/images/feed-luminary-atelier.jpg", text: "@LUMINARY.ATELIER", subtext: "Bespoke Retainer" },
      { id: "feed-7", image: "/images/feed-serene-living.jpg", text: "@SERENE.LIVING", subtext: "Architectural Living" },
      { id: "feed-8", image: "/images/feed-aurelia-curated.jpg", text: "@AURELIA.CURATED", subtext: "Fine Objects & Design" }
    ]
  },
  servicesHeader: {
    eyebrow: "Capabilities & Offerings",
    heading: "Ways I can support your",
    headingItalic: "business.",
    description: "Deliberate, full-service creative partnerships tailored to establish brand prestige and accelerate qualified inquiries.",
    inclusionsLabel: "Inclusions:",
    inquireCtaText: "Inquire for this service",
    bottomNote: "Need a bespoke combination of services? Custom hybrid scopes are tailored upon inquiry.",
    bottomCtaText: "Request Custom Scope"
  },
  services: [
    {
      id: "srv-1",
      num: "01",
      name: "Social Media Management",
      badge: "Monthly Retainer • 3-Month Minimum",
      scopeLabel: "Full-Service Monthly Retainer",
      tagline: "End-to-end, high-touch done-for-you growth.",
      description: "Full-scale social presence management crafted for brands ready to delegate with total confidence. We handle content calendars, aesthetic grid curation, high-converting copywriting, scheduling, community engagement and detailed performance analytics.",
      deliverables: [
        "Monthly content calendar & strategy",
        "12–20 bespoke high-aesthetic feed posts",
        "Engaging Reels & short-form video editing",
        "Strategic caption copywriting & hashtag frameworks",
        "Proactive community engagement & DM support",
        "End-of-month commercial analytics review"
      ],
      image: "/images/workspace-travertine.jpg",
      caption: "STUDIO ARCHIVE • CURATION & PLANNING"
    },
    {
      id: "srv-2",
      num: "02",
      name: "Content Strategy Roadmap",
      badge: "Strategic Intensive • 2-Week Turnaround",
      scopeLabel: "One-Off Strategic Playbook",
      tagline: "Your high-level roadmap to market clarity.",
      description: "A comprehensive, actionable strategic playbook built for founders and in-house teams who want to execute their own social media with the intentionality and precision of a creative agency.",
      deliverables: [
        "In-depth competitor & visual benchmark audit",
        "Audience persona & buying triggers roadmap",
        "Core content pillars & editorial themes",
        "Visual aesthetic guidelines & font pairings",
        "60-day launch calendar & posting blueprint",
        "Bi-weekly strategy check-in calls"
      ],
      image: "/images/workspace-couch.jpg",
      caption: "STRATEGY SUITE • POSITIONING INTENSIVE"
    },
    {
      id: "srv-3",
      num: "03",
      name: "Content Sessions",
      badge: "On-Location Booking • Sydney & Travel",
      scopeLabel: "On-Location Editorial Capture",
      tagline: "Social-first, editorial iPhone 4K capture.",
      description: "Tactile, candid and editorial photo & video capture shot on-location using the latest iPhone technology. We create an extensive bank of social-first assets that feel natural, expensive and effortlessly authentic.",
      deliverables: [
        "Creative direction & pre-shoot moodboards",
        "Detailed shot lists & location planning",
        "Half-day or full-day on-location content capture",
        "100+ raw high-resolution 4K photos & clips",
        "15 polished, color-graded aesthetic Reels",
        "Fast 5-day cloud gallery asset delivery"
      ],
      image: "/images/founder-trench.jpg",
      caption: "ON SET • IPHONE 4K CINEMATIC CAPTURE"
    },
    {
      id: "srv-4",
      num: "04",
      name: "Meta & Google Advertising",
      badge: "Paid Acquisition & Revenue Scale",
      scopeLabel: "Monthly Performance Management",
      tagline: "Profitable paid campaigns engineered to scale.",
      description: "Targeted performance advertising designed to put your highest-converting creative in front of ready-to-buy audiences. We build and optimize full-funnel paid campaigns with clear commercial ROI focus.",
      deliverables: [
        "Full-funnel campaign architecture & setup",
        "Ad creative direction & high-CTR copywriting",
        "Pixel setup, tracking & conversion API",
        "Audience retargeting & lookalike testing",
        "Continuous weekly budget & bid optimization",
        "Transparent real-time performance dashboard"
      ],
      image: "/images/hero-editorial-desk.jpg",
      caption: "PAID ACQUISITION • CONVERSION ARCHITECTURE"
    },
    {
      id: "srv-5",
      num: "05",
      name: "Custom Support & VIP Days",
      badge: "Bespoke Consulting Partnership",
      scopeLabel: "Custom Scope by Request",
      tagline: "Tailored creative packages designed around your goals.",
      description: "Flexible advisory and intensive strategy sessions for established brands seeking bespoke consulting, team training or hybrid execution models.",
      deliverables: [
        "1-on-1 private VIP strategy intensive",
        "Full social profile architecture overhaul",
        "Direct WhatsApp voice access & advisory",
        "Custom workflow design for in-house staff",
        "Agile campaign support for upcoming launches",
        "Hybrid deliverables tailored to business scope"
      ],
      image: "/images/founder-blazer.jpg",
      caption: "FOUNDER PARTNERSHIP • PRIVATE ADVISORY"
    }
  ],
  testimonialsHeader: {
    eyebrow: "Client Notes & Partnership"
  },
  testimonials: [
    {
      id: "test-1",
      name: "Sarah Chen",
      role: "Founder & Director, Maison Solène",
      quote: "Working with Sam transformed our entire social presence. The attention to detail and editorial restraint made our feed feel like an architectural publication, bringing qualified inquiries within weeks.",
      image: "/images/testimonial-sarah.jpg"
    },
    {
      id: "test-2",
      name: "Marcus Johnson",
      role: "Creative Lead, Botanica Studio",
      quote: "A rare talent who pairs genuine strategic thinking with flawless on-location iPhone capture. Having her take over our content pipeline replaced daily chaos with calm, repeatable momentum.",
      image: "/images/testimonial-marcus.jpg"
    },
    {
      id: "test-3",
      name: "Elena Voss",
      role: "Principal, Voss Curated Living",
      quote: "The most seamless creative collaboration we've had. She understands modern high-end aesthetics, simplified our messaging, and eliminated all the stress around posting.",
      image: "/images/testimonial-elena.jpg"
    }
  ],
  contact: {
    eyebrow: "Start The Conversation",
    heading: "Let's work",
    headingItalic: "together.",
    description: "Submit your enquiry below. I will personally review your brand, existing content and social presence, and reply within 24–48 business hours with next steps and discovery call availability.",
    formLabels: {
      name: "Your Name *",
      studio: "Brand / Studio Name *",
      email: "Email Address *",
      handle: "Instagram / Website",
      service: "Primary Service Interest *",
      message: "Tell Me About Your Goals & Desired Timeline",
      submitButton: "Submit Client Enquiry",
      assurance: "Direct Founder Review • Response in 24–48h"
    },
    founderImage: "/images/founder-trench.jpg",
    founderRole: "SAM K. • FOUNDER & STRATEGIST",
    founderQuote: "I partner with brands I genuinely believe in.",
    email: "hamzaiqbal333@gmail.com",
    location: "Sydney, Australia • Worldwide",
    instagramHandle: "@samk.socials",
    availability: "Now Booking Client Partnerships",
    footerBio: "Bespoke social media management, on-location iPhone 4K content sessions and performance advertising for founder-led brands."
  },
  footer: {
    exploreTitle: "Explore",
    inquiriesTitle: "Direct Inquiries",
    copyright: "© 2026 Sam K. Socials. All Rights Reserved.",
    backToTopText: "Back To Top ↑",
    links: [
      { name: "Home", href: "#" },
      { name: "About", href: "#about" },
      { name: "Services", href: "#services" },
      { name: "Diagnostic", href: "#philosophy" },
      { name: "Feed Showcase", href: "#work" },
      { name: "Contact", href: "#contact" }
    ]
  }
};
