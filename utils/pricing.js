// Pricing configuration for all services
export const PRICING_PLANS = {
  'blog-writing': {
    name: 'Content Writing',
    description: 'Professional AI-powered blog posts and articles',
    price: 3999,
    currency: 'INR',
    billing: 'monthly',
    features: [
      'Up to 50 blog posts per month',
      'SEO optimized content',
      'Multiple niches supported',
      'Plagiarism-free guarantee',
      'Fast 24-hour delivery',
      'Unlimited revisions'
    ],
    popular: true
  },
  'video-editing': {
    name: 'Video Editing',
    description: 'Professional video editing and production',
    price: 5999,
    currency: 'INR',
    billing: 'monthly',
    features: [
      'Up to 20 videos per month',
      'Professional editing',
      'Custom transitions & effects',
      'Color correction & grading',
      'Audio enhancement',
      'Multiple format exports'
    ],
    popular: false
  },
  'graphics-design': {
    name: 'Graphics Design',
    description: 'AI-powered graphics and visual content',
    price: 2999,
    currency: 'INR',
    billing: 'monthly',
    features: [
      'Up to 100 graphics per month',
      'Social media posts',
      'Logos & branding',
      'Web graphics',
      'Print-ready designs',
      'Custom dimensions'
    ],
    popular: false
  },
  'voiceover': {
    name: 'Voiceover Services',
    description: 'AI-generated professional voiceovers',
    price: 1999,
    currency: 'INR',
    billing: 'monthly',
    features: [
      'Up to 30 voiceovers per month',
      'Multiple voice options',
      'Natural AI voices',
      'Multiple languages',
      'Commercial usage rights',
      'High-quality audio'
    ],
    popular: false
  },
  'complete-package': {
    name: 'Complete Digital Package',
    description: 'All services in one comprehensive package',
    price: 12999,
    currency: 'INR',
    billing: 'monthly',
    originalPrice: 14996,
    discount: 13,
    features: [
      'All content writing features',
      'All video editing features',
      'All graphics design features',
      'All voiceover features',
      'Priority support',
      'Dedicated account manager',
      'Custom branding',
      'Analytics & reporting'
    ],
    popular: true,
    bestValue: true
  }
};

// Individual service pricing for one-time purchases
export const ONE_TIME_PRICING = {
  'blog-writing': {
    name: 'Single Blog Post',
    price: 199,
    currency: 'INR',
    description: 'One professional blog post (500-1000 words)'
  },
  'video-editing': {
    name: 'Single Video Edit',
    price: 499,
    currency: 'INR',
    description: 'Professional editing for one video (up to 10 minutes)'
  },
  'graphics-design': {
    name: 'Single Graphic',
    price: 99,
    currency: 'INR',
    description: 'One custom graphic design'
  },
  'voiceover': {
    name: 'Single Voiceover',
    price: 149,
    currency: 'INR',
    description: 'One professional voiceover (up to 5 minutes)'
  }
};

// Monetization settings
export const MONETIZATION_CONFIG = {
  // Earnings per user visit (in INR)
  visitEarning: 0.50,
  
  // Earnings per user action (in INR)
  actionEarnings: {
    signup: 5.00,
    login: 1.00,
    orderPlaced: 25.00,
    paymentCompleted: 50.00,
    serviceUsed: 10.00
  },
  
  // Ad revenue settings
  adRevenue: {
    enabled: true,
    cpmRate: 2.00, // Cost per 1000 impressions in INR
    clickRate: 5.00, // Cost per click in INR
    adSlots: [
      'header-banner',
      'sidebar-ad',
      'footer-ad',
      'in-content-ad'
    ]
  },
  
  // Referral program
  referralProgram: {
    enabled: true,
    referrerBonus: 500, // INR for successful referral
    refereeDiscount: 10 // Percentage discount for new user
  }
};

// Utility functions
export const formatPrice = (price, currency = 'INR') => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

export const calculateDiscount = (originalPrice, discountedPrice) => {
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
};

export const getPlanById = (planId) => {
  return PRICING_PLANS[planId] || null;
};

export const getOneTimePriceById = (serviceId) => {
  return ONE_TIME_PRICING[serviceId] || null;
};

// Track user activity for monetization
export const trackUserActivity = async (userId, activityType, metadata = {}) => {
  try {
    const earning = MONETIZATION_CONFIG.actionEarnings[activityType] || 0;
    
    // Log activity to analytics
    const activityData = {
      userId,
      activityType,
      earning,
      timestamp: new Date(),
      metadata
    };
    
    // In a real app, you'd send this to your analytics service
    console.log('User activity tracked:', activityData);
    
    // You could also store this in Firestore for admin analytics
    // await addDoc(collection(db, 'user_activities'), activityData);
    
    return earning;
  } catch (error) {
    console.error('Error tracking user activity:', error);
    return 0;
  }
};

// Track page visits for monetization
export const trackPageVisit = async (userId, page) => {
  try {
    const earning = MONETIZATION_CONFIG.visitEarning;
    
    const visitData = {
      userId: userId || 'anonymous',
      page,
      earning,
      timestamp: new Date()
    };
    
    console.log('Page visit tracked:', visitData);
    
    return earning;
  } catch (error) {
    console.error('Error tracking page visit:', error);
    return 0;
  }
};