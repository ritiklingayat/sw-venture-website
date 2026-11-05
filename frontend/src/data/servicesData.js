export const serviceCategories = [
  {
    id: 'development',
    name: 'Development',
    slug: '/services/development',
    tagline: 'High-performance web applications, responsive corporate sites & native mobile apps.',
    iconName: 'Code2',
    accentColor: '#0059FF',
    subServices: [
      {
        title: 'Website Development',
        slug: '/services/website-development',
        desc: 'Custom corporate websites, e-commerce stores, CMS platforms and web applications built for speed, SEO, and conversions.',
      },
      {
        title: 'Mobile App Development',
        slug: '/services/app-development',
        desc: 'Native Android, iOS & cross-platform Flutter/React Native mobile applications with robust backend APIs.',
      },
    ],
  },
  {
    id: 'performance-marketing',
    name: 'Performance Marketing',
    slug: '/services/performance-marketing',
    tagline: 'Data-driven paid advertising designed to generate high-intent leads and measurable revenue.',
    iconName: 'TrendingUp',
    accentColor: '#00D9FF',
    subServices: [
      {
        title: 'Meta Ads (Facebook & Instagram)',
        slug: '/services/meta-ads',
        desc: 'Audience-targeted sales campaigns, lead generation funnels, dynamic retargeting, and creative testing.',
      },
      {
        title: 'Google Search & Display Ads',
        slug: '/services/google-ads',
        desc: 'High-intent search ads, display network remarketing, conversion tracking, and keyword optimization.',
      },
      {
        title: 'YouTube Ads',
        slug: '/services/youtube-ads',
        desc: 'Video ads, product promotions, brand awareness campaigns, and full funnel video ad strategies.',
      },
      {
        title: 'Email Marketing Software (SaaS)',
        slug: '/services/email-marketing',
        desc: 'Cloud email marketing service software (SaaS) built for automated drip sequences, 99.4% deliverability, and subscriber growth.',
      },
    ],
  },
  {
    id: 'social-media',
    name: 'Social Media Management',
    slug: '/services/social-media-marketing',
    tagline: 'End-to-end community growth, visual storytelling, content calendars, and viral brand engagement.',
    iconName: 'Share2',
    accentColor: '#0059FF',
    subServices: [
      {
        title: 'Instagram & Facebook Management',
        slug: '/services/instagram-facebook',
        desc: 'Monthly content calendars, high-impact carousels, viral reel planning, publishing, and community engagement.',
      },
      {
        title: 'LinkedIn & YouTube Growth',
        slug: '/services/linkedin-youtube',
        desc: 'B2B personal branding, executive thought-leadership, YouTube channel SEO, and video optimization.',
      },
    ],
  },
  {
    id: 'creative-branding',
    name: 'Creative Design & Branding',
    slug: '/services/creative-design-branding',
    tagline: 'Visual identities, logo design, brand guidelines, and high-converting marketing collateral.',
    iconName: 'Palette',
    accentColor: '#00D9FF',
    subServices: [
      {
        title: 'Brand Identity & Logo Design',
        slug: '/services/creative-design-branding',
        desc: 'Logo packages, brand typography, style guides, brochure design, and social media creative toolkits.',
      },
    ],
  },
  {
    id: 'content-production',
    name: 'Content & Production',
    slug: '/services/content-production',
    tagline: 'Commercial studio shoots, 4K video ads, anchoring reels, podcasts, and AI-assisted video creation.',
    iconName: 'Video',
    accentColor: '#0059FF',
    subServices: [
      {
        title: 'Product Photography & Shoots',
        slug: '/services/product-shoots',
        desc: 'E-commerce white-background photos, lifestyle shoots, and premium 4K product showcase videos.',
      },
      {
        title: 'Reels & Advertising Shoots',
        slug: '/services/reels-ad-shoots',
        desc: 'Short-form vertical video production, professional anchoring reels, and social media ad shoots.',
      },
      {
        title: 'Podcast Production',
        slug: '/services/podcast-production',
        desc: 'Multi-camera podcast recording, crystal-clear audio engineering, video snippets, and episode distribution.',
      },
      {
        title: 'TV Commercial Production (TVC)',
        slug: '/services/tvc-production',
        desc: 'High-concept television commercials, cinema ads, scripted brand films, and post-production color grading.',
      },
      {
        title: 'AI Video Creation',
        slug: '/services/ai-video-creation',
        desc: 'AI-generated brand explainers, synthetic avatars, multilingual voiceovers, and rapid video testing.',
      },
    ],
  },
  {
    id: 'strategy-growth',
    name: 'Strategy & Business Growth',
    slug: '/services/business-growth-strategy',
    tagline: 'Strategic positioning, competitor intelligence, market penetration, and qualified lead funnels.',
    iconName: 'Target',
    accentColor: '#00D9FF',
    subServices: [
      {
        title: 'Digital Growth Strategy',
        slug: '/services/business-growth-strategy',
        desc: 'Complete digital audits, competitor benchmarking, channel prioritization, and 12-month revenue roadmaps.',
      },
      {
        title: 'Lead Generation Engines',
        slug: '/services/lead-generation',
        desc: 'High-converting landing pages, lead capture automation, CRM integration, and qualification workflows.',
      },
    ],
  },
];

// Detailed service pages with rich content for each route
export const detailedServices = {
  // 1. Development Category & Sub-pages
  '/services/development': {
    category: 'Development',
    title: 'Web & Mobile App Development',
    tagline: 'Custom digital platforms built with modern technology stacks for speed, security, and measurable conversion.',
    heroDescription: 'From responsive business websites and e-commerce platforms to scalable iOS and Android applications, we develop bespoke software that empowers your business growth.',
    offerings: [
      'Corporate & Business Website Development',
      'E-commerce & Storefront Development (Shopify, WooCommerce, Custom)',
      'Custom Full-Stack Web Applications (React, Next.js, Node.js)',
      'Native Android & iOS Mobile Applications',
      'Cross-Platform Mobile Development (Flutter & React Native)',
      'UI/UX Prototyping & User Journey Design',
      'API Integrations, Payment Gateways & CRM Sync',
      'Website Redesign, Maintenance & Speed Optimization',
    ],
    process: [
      { step: '01', title: 'Architecture & UX', desc: 'Sitemap structuring, wireframing, and user-journey prototyping tailored to your business goals.' },
      { step: '02', title: 'Modern Engineering', desc: 'Clean, performant coding with Next.js, React, Node.js, and scalable cloud databases.' },
      { step: '03', title: 'Rigorous QA', desc: 'Cross-browser testing, mobile responsiveness, Lighthouse performance auditing, and security checks.' },
      { step: '04', title: 'Launch & Support', desc: 'Zero-downtime DNS rollout, SSL configuration, CDN setup, and ongoing maintenance.' },
    ],
    faqs: [
      { q: 'How long does a website or app take to develop?', a: 'Standard corporate websites typically take 2-4 weeks, while complex web applications or mobile apps range between 6-12 weeks depending on scope.' },
      { q: 'Will the website be mobile-friendly and fast?', a: 'Yes. Every project is built mobile-first, fully responsive, and optimized to score 90+ on Google PageSpeed Insights.' },
      { q: 'Can our internal team edit website content without coding?', a: 'Absolutely. We provide intuitive content management tools so you can update text, blogs, portfolio items, and media effortlessly.' },
    ],
  },

  '/services/website-development': {
    category: 'Development',
    title: 'Website Development Services',
    tagline: 'High-converting business websites, corporate portals & e-commerce solutions.',
    heroDescription: 'Your website is your 24/7 digital storefront. We design and engineer fast, modern, and SEO-optimized websites that attract visitors and turn them into paying clients.',
    offerings: [
      'Business & Corporate Websites',
      'High-Conversion Landing Pages',
      'E-Commerce Portals & Custom Checkouts',
      'CMS-Powered Blogs & News Sites',
      'Website Redesigns & Performance Overhauls',
      'Technical On-Page SEO & Schema Markup',
      'Interactive Web Calculators & Inquiry Tools',
      'Enterprise Security & Daily Automated Backups',
    ],
    process: [
      { step: '01', title: 'Discovery & Wireframes', desc: 'Analyzing user personas, competitor gaps, and drafting high-converting page wireframes.' },
      { step: '02', title: 'UI/UX Visual Design', desc: 'Crafting brand-aligned visual designs with custom iconography, typography, and responsive layouts.' },
      { step: '03', title: 'Modern Frontend & Backend', desc: 'Coding responsive components with Next.js/React, fast backend APIs, and database integration.' },
      { step: '04', title: 'SEO & Live Deployment', desc: 'Configuring technical SEO tags, analytics tracking, and deploying with global CDN edge caching.' },
    ],
    faqs: [
      { q: 'Do you build custom designs or use standard templates?', a: 'We design 100% custom websites tailored strictly to your brand guidelines and business objectives.' },
      { q: 'Do you assist with domain, hosting, and business emails?', a: 'Yes, we assist with DNS setup, SSL certificates, hosting infrastructure, and professional domain email configuration.' },
    ],
  },

  '/services/app-development': {
    category: 'Development',
    title: 'Mobile App Development (Android & iOS)',
    tagline: 'Native and cross-platform mobile apps engineered for fluid user experience and business utility.',
    heroDescription: 'Transform your idea or business service into a powerful smartphone application. We build high-performance mobile apps for Android and iOS that keep your users engaged.',
    offerings: [
      'Android App Development (Kotlin & Java)',
      'iOS App Development (Swift)',
      'Cross-Platform Development (Flutter & React Native)',
      'Customer & E-Commerce Apps',
      'Admin & Field Staff Mobility Applications',
      'Push Notification & Engagement Systems',
      'Secure Authentication & Payment Gateways',
      'App Store Optimization (ASO) & Play Store Rollout',
    ],
    process: [
      { step: '01', title: 'Product Specification', desc: 'Defining features, user roles, security rules, and data schemas.' },
      { step: '02', title: 'Interactive UX Prototypes', desc: 'Figma click-through prototypes simulating the real smartphone experience.' },
      { step: '03', title: 'Full-Stack Development', desc: 'Native/Flutter UI development connected to secure, scalable cloud APIs.' },
      { step: '04', title: 'Store Submission & Support', desc: 'App Store and Google Play compliance review, submission, and post-launch maintenance.' },
    ],
    faqs: [
      { q: 'Should we build native or cross-platform?', a: 'For most business and e-commerce applications, cross-platform (Flutter/React Native) offers a single codebase for both iOS and Android, saving 40% in cost and time without sacrificing performance.' },
      { q: 'Do you handle App Store and Play Store approval?', a: 'Yes, we guide your app through Google Play and Apple App Store review guidelines and handle the submission process.' },
    ],
  },

  // 2. Performance Marketing Category & Sub-pages
  '/services/performance-marketing': {
    category: 'Performance Marketing',
    title: 'Performance Marketing & Paid Advertising',
    tagline: 'Engineered ad campaigns focused on measurable ROI, cost-per-lead optimization, and revenue growth.',
    heroDescription: 'Stop burning ad budget on vanity impressions. We run precision-targeted advertising campaigns across Meta, Google, and YouTube designed to deliver qualified inquiries and verifiable sales.',
    offerings: [
      'Full-Funnel Paid Advertising Strategy',
      'Meta Ads (Facebook & Instagram Feed, Stories, Reels)',
      'Google Search, Display & Performance Max Ads',
      'YouTube Video Advertising & Discovery Ads',
      'High-Intent Lead Generation Campaigns',
      'Retargeting & Dynamic Product Remarketing',
      'A/B Creative & Copy Testing Frameworks',
      'Transparent Weekly Reporting & ROAS Analytics',
    ],
    process: [
      { step: '01', title: 'Audience & Offer Audit', desc: 'Reviewing your past campaigns, target demographics, customer pain points, and lead offer.' },
      { step: '02', title: 'Tracking & Pixel Setup', desc: 'Configuring Meta Conversions API (CAPI), Google Tag Manager, GA4 events, and offline conversions.' },
      { step: '03', title: 'Creative Production & Launch', desc: 'Designing high-converting ad images, hook-based video ads, and persuasive ad copy.' },
      { step: '04', title: 'Optimization & Scale', desc: 'Pruning underperforming ad sets, scaling winners, and driving down your cost per acquisition.' },
    ],
    faqs: [
      { q: 'How is ad budget handled?', a: 'You pay advertising platforms directly (Meta/Google), ensuring 100% transparency. Our agency charges a transparent monthly management and creative fee.' },
      { q: 'What is the minimum recommended ad budget?', a: 'We typically recommend a minimum starting ad spend of ₹25,000 to ₹50,000/month to allow sufficient data collection and algorithm optimization.' },
    ],
  },

  '/services/meta-ads': {
    category: 'Performance Marketing',
    title: 'Meta Ads Management (Facebook & Instagram)',
    tagline: 'Reach targeted consumers and decision-makers where they spend their daily attention.',
    heroDescription: 'Maximize your ROI with hyper-targeted Instagram and Facebook ad campaigns. From instant lead forms to high-converting landing page traffic, we optimize every rupee of your budget.',
    offerings: [
      'Instant Lead Generation Ads with WhatsApp sync',
      'E-commerce Sales & Catalog Retargeting',
      'High-Engagement Reel & Story Ads',
      'Custom & Lookalike Audience Building',
      'Creative Fatigue Management & Weekly Refresh',
      'Conversion API (CAPI) Server-Side Tracking',
      'Local Business Footfall & Inquiries',
      'Weekly ROAS & Cost-Per-Acquisition Reports',
    ],
    process: [
      { step: '01', title: 'Targeting Matrix', desc: 'Identifying buyer personas, interest buckets, lookalike sources, and geography.' },
      { step: '02', title: 'Ad Creative Engine', desc: 'Producing scroll-stopping reels, carousel ads, and value-driven ad copy.' },
      { step: '03', title: 'Campaign Architecture', desc: 'Setting up testing, retargeting, and scale campaigns with automated budget rules.' },
      { step: '04', title: 'Daily Optimization', desc: 'Monitoring frequency, CTR, cost-per-lead, and refining bidding strategies.' },
    ],
    faqs: [
      { q: 'Can Meta ads generate leads for B2B businesses?', a: 'Yes! Through targeted demographic filters, job titles, interest layering, and retargeting, Meta ads generate strong B2B inquiries at lower costs than LinkedIn.' },
    ],
  },

  '/services/google-ads': {
    category: 'Performance Marketing',
    title: 'Google Ads & Search Marketing',
    tagline: 'Capture high-intent prospects at the exact moment they search for your products and services.',
    heroDescription: 'Be visible at the very top of Google when potential customers are actively searching for solutions. We engineer high-converting Google Search, Display, and Performance Max campaigns.',
    offerings: [
      'High-Intent Google Search Ads',
      'Performance Max (PMax) Campaigns',
      'Display Remarketing Across Top Websites',
      'Negative Keyword Filtering & Budget Protection',
      'Call-Only Ads for Service Businesses',
      'Google Tag Manager & Enhanced Conversion Tracking',
      'Quality Score & Landing Page Relevance Tuning',
      'Competitor Keyword Domination Strategies',
    ],
    process: [
      { step: '01', title: 'Keyword Intelligence', desc: 'In-depth research identifying high-commercial intent keywords with buyer urgency.' },
      { step: '02', title: 'Ad Copy & Extensions', desc: 'Writing compelling ad headlines, sitelinks, callouts, and structured snippets.' },
      { step: '03', title: 'Conversion Tracking', desc: 'Setting up GA4, Google Ads conversion actions, call tracking, and form tracking.' },
      { step: '04', title: 'Continuous Bid Tuning', desc: 'Adjusting device bids, keyword match types, and scaling profitable search queries.' },
    ],
    faqs: [
      { q: 'How quickly do Google Ads produce results?', a: 'Search ads can begin generating qualified clicks and phone calls within 24 to 48 hours of campaign launch.' },
    ],
  },

  '/services/youtube-ads': {
    category: 'Performance Marketing',
    title: 'YouTube Video Advertising',
    tagline: 'Build authority, brand recall, and demand through cinematic video ads on the world’s largest video platform.',
    heroDescription: 'Engage your audience with skippable in-stream ads, non-skippable bumpers, and in-feed video ads targeted by topic, channel, and search history.',
    offerings: [
      'Skippable In-Stream Video Ads',
      'Non-Skippable 6-Second Bumper Ads',
      'In-Feed Video Discovery Campaigns',
      'Audience Affinity & In-Market Targeting',
      'Competitor Channel Placement Targeting',
      'Video Ad Creative Scripting & Production',
      'View-Through & Website Action Tracking',
      'Brand Lift & Recall Measurement',
    ],
    process: [
      { step: '01', title: 'Hook & Scripting', desc: 'Designing the critical 5-second hook to qualify viewers before the skip button.' },
      { step: '02', title: 'Targeting & Placement', desc: 'Curating channels, topics, search queries, and custom intent segments.' },
      { step: '03', title: 'Campaign Setup', desc: 'Configuring CPV/tCPA bidding with landing page destination integration.' },
      { step: '04', title: 'Audience Retargeting', desc: 'Building retargeting pools of users who watched your videos for bottom-funnel conversion.' },
    ],
    faqs: [
      { q: 'Do we only pay when someone watches the video?', a: 'With skippable in-stream ads (CPV model), you only pay when a viewer watches at least 30 seconds of your video (or the full ad if shorter) or clicks an interactive element.' },
    ],
  },

  // 3. Social Media Management Category & Sub-pages
  '/services/social-media-marketing': {
    category: 'Social Media',
    title: 'Social Media Management & Marketing',
    tagline: 'Strategic content creation, community engagement, and brand building across Instagram, Facebook, LinkedIn & YouTube.',
    heroDescription: 'Transform your social channels into active client acquisition engines. We plan, design, produce, and manage your complete social presence with measurable consistency.',
    offerings: [
      'Comprehensive Social Media Audit & Strategy',
      'Monthly Structured Content Calendars',
      'High-Impact Static Posts & Informative Carousels',
      'Viral Reel Concept, Scripting & Editing',
      'Stories, Highlights & Brand Asset Design',
      'Active Community Management & Response Care',
      'Influencer Collaborations & Co-Marketing',
      'Monthly Growth & Engagement Analytics',
    ],
    process: [
      { step: '01', title: 'Account Audit & Tone', desc: 'Analyzing existing metrics, profile bios, visual aesthetics, and establishing brand voice.' },
      { step: '02', title: 'Content Pillar Matrix', desc: 'Designing educational, entertaining, inspirational, and promotional content buckets.' },
      { step: '03', title: 'Production & Approval', desc: 'Designing graphics, editing video reels, writing captions, and getting client sign-off.' },
      { step: '04', title: 'Publishing & Engagement', desc: 'Scheduled publishing at peak times, replying to comments, and monthly performance review.' },
    ],
    faqs: [
      { q: 'How many posts and reels do you publish each month?', a: 'We offer tailored packages ranging from 12 to 24 pieces of high-quality monthly content (mix of reels, carousels, and stories).' },
    ],
  },

  '/services/instagram-facebook': {
    category: 'Social Media',
    title: 'Instagram & Facebook Growth Management',
    tagline: 'Capture visual attention, cultivate loyal followers, and drive direct messages from interested prospects.',
    heroDescription: 'Dominate feeds and explore pages with scroll-stopping visuals, strategic hashtags, trending audio reels, and community interaction tailored for Instagram and Facebook.',
    offerings: [
      'Profile Optimization & Bio Revamp',
      'Weekly Reel Production & Trend Adaptation',
      'Multi-Slide Educational Carousels',
      'Interactive Daily Story Campaigns',
      'Direct Message (DM) Lead Qualification',
      'Hashtag Intelligence & Algorithmic Growth',
      'Competitor Monitoring & Content Benchmarking',
      'Performance Dashboard & Monthly Review',
    ],
    process: [
      { step: '01', title: 'Visual Identity', desc: 'Setting up custom grid templates, story highlight covers, and brand aesthetic.' },
      { step: '02', title: 'Calendar Rollout', desc: 'Planning high-impact themes aligned with company milestones and product launches.' },
      { step: '03', title: 'Creative Execution', desc: 'Producing captivating graphics, typography-driven carousels, and edited reels.' },
      { step: '04', title: 'Growth Review', desc: 'Tracking reach, profile visits, follower velocity, and inquiry volume.' },
    ],
    faqs: [
      { q: 'Do you create original reels or only static images?', a: 'We specialize in reel-first strategies. Short-form vertical video is the #1 driver of organic reach across Instagram and Facebook.' },
    ],
  },

  '/services/linkedin-youtube': {
    category: 'Social Media',
    title: 'LinkedIn & YouTube B2B Growth',
    tagline: 'Position your founders and company as authoritative industry leaders.',
    heroDescription: 'Attract corporate clients, investors, and high-value partnerships through structured LinkedIn personal branding and SEO-optimized YouTube video strategies.',
    offerings: [
      'Founder & Executive LinkedIn Profile Optimization',
      'B2B Thought-Leadership Content & Articles',
      'Slide-Deck Document Posts & Case Summaries',
      'YouTube Channel Branding, Banners & Setup',
      'YouTube SEO: Keyword Titles, Descriptions & Tags',
      'High-CTR Custom YouTube Thumbnails',
      'Video Chapters & Audience Retention Strategy',
      'B2B Direct Outreach & Networking Tactics',
    ],
    process: [
      { step: '01', title: 'Executive Voice', desc: 'Interviewing leadership to capture authentic insights, industry stories, and viewpoints.' },
      { step: '02', title: 'Content Engineering', desc: 'Drafting high-signal text posts, carousels, and YouTube video scripts.' },
      { step: '03', title: 'Thumbnail & SEO Mastery', desc: 'Designing eye-catching thumbnails and optimizing metadata for search longevity.' },
      { step: '04', title: 'Network Building', desc: 'Engaging with industry leaders and prospective enterprise clients.' },
    ],
    faqs: [
      { q: 'Why is LinkedIn important for our business?', a: 'LinkedIn is where corporate decision-makers spend their professional time. A strong presence builds unassailable trust and unlocks enterprise contracts.' },
    ],
  },

  // 4. Creative Design & Branding
  '/services/creative-design-branding': {
    category: 'Creative Design',
    title: 'Creative Design & Brand Identity',
    tagline: 'Distinctive visual identities, memorable logos, and unified marketing collateral.',
    heroDescription: 'Great branding makes your business instantly recognizable and commands premium pricing. We craft complete brand identity systems that reflect your company’s true value.',
    offerings: [
      'Original Logo Design & Vector Iconography',
      'Complete Brand Guidelines (Color, Typography, Rules)',
      'Corporate Stationery (Business Cards, Letterheads, Envelopes)',
      'Company Profiles, Pitch Decks & Brochures',
      'Social Media Creative Templates & Banners',
      'Product Packaging & Label Design',
      'Outdoor Advertising (Billboards, Banners, Standees)',
      'Digital Ad Creative Packages & Vector Graphics',
    ],
    process: [
      { step: '01', title: 'Brand Discovery', desc: 'Uncovering brand personality, target demographics, values, and competitive positioning.' },
      { step: '02', title: 'Concept Ideation', desc: 'Presenting distinct creative directions, logo marks, and color psychology variations.' },
      { step: '03', title: 'Refinement & Systematization', desc: 'Perfecting chosen concepts, defining typography rules, and drafting the brand book.' },
      { step: '04', title: 'Asset Delivery', desc: 'Delivering full vector packages (AI, EPS, SVG, PNG) ready for digital and print execution.' },
    ],
    faqs: [
      { q: 'Will I own all copyright and source files?', a: 'Yes, upon project completion and handover, you receive 100% intellectual property ownership and all open vector source files.' },
    ],
  },

  // 5. Content & Production Category & Sub-pages
  '/services/content-production': {
    category: 'Content & Production',
    title: 'Content & Media Production Studio',
    tagline: 'Professional 4K videography, studio product shoots, podcast production, and TV commercials.',
    heroDescription: 'High production value signals market leadership. Our in-house production team scripts, films, edits, and delivers broadcast-quality commercial media that sets you apart.',
    offerings: [
      'Studio & Lifestyle Product Photography',
      'Cinematic Commercial Video Shoots',
      'Professional Reels with On-Camera Anchors',
      'Multi-Camera Podcast Studio Production',
      'Television Commercials (TVC) & Cinema Ads',
      'AI Video Creation & Multilingual Avatars',
      'Color Grading, Sound Design & Motion Graphics',
      'Corporate Documentaries & Factory Walkthroughs',
    ],
    process: [
      { step: '01', title: 'Pre-Production & Script', desc: 'Concept development, scriptwriting, storyboard creation, and location/talent scouting.' },
      { step: '02', title: 'Production & Shoot', desc: 'Filming with professional cinema cameras, studio lighting rigs, and sound gear.' },
      { step: '03', title: 'Post-Production', desc: 'Editing, cinematic color grading, sound mixing, motion graphics, and subtitling.' },
      { step: '04', title: 'Format Delivery', desc: 'Exporting tailored aspect ratios for Instagram (9:16), YouTube (16:9), and print.' },
    ],
    faqs: [
      { q: 'Can you shoot at our factory, hospital, or office location?', a: 'Yes! We travel with full production equipment to conduct on-site corporate shoots, facility walkthroughs, and executive interviews.' },
    ],
  },

  '/services/product-shoots': {
    category: 'Content & Production',
    title: 'Product Photography & Video Shoots',
    tagline: 'E-commerce white-background shots, creative lifestyle setups, and 360° product showcases.',
    heroDescription: 'Turn browsers into buyers with crisp, high-resolution product photography and dynamic showcase videos engineered for Amazon, Flipkart, your website, and ad creatives.',
    offerings: [
      'Clean E-Commerce White-Background Photography',
      'Creative Styled & Lifestyle Setups',
      '360-Degree Product Spin Videos',
      'Macro & Close-Up Detail Shots',
      'Infographic-Style Product Feature Images',
      'Short Product Demo & Unboxing Videos',
      'Packaging & Label Studio Photography',
      'High-Resolution Retouching & Color Correction',
    ],
    process: [
      { step: '01', title: 'Product Ingestion', desc: 'Receiving, cataloging, and prepping items for glare-free studio lighting.' },
      { step: '02', title: 'Lighting & Photography', desc: 'Executing shots with calibrated color-accurate sensors and macro lenses.' },
      { step: '03', title: 'Advanced Retouching', desc: 'Dust removal, background clipping, contrast tuning, and shadow enhancements.' },
      { step: '04', title: 'Marketplace Deliverables', desc: 'Exporting optimized dimensions formatted for web store and marketplace guidelines.' },
    ],
    faqs: [
      { q: 'Do you provide models and props for lifestyle product shoots?', a: 'Yes, we source professional models, props, and backgrounds to match your brand style and product category.' },
    ],
  },

  '/services/reels-ad-shoots': {
    category: 'Content & Production',
    title: 'Reels & Advertising Video Shoots',
    tagline: 'High-energy vertical video production engineered for algorithmic virality and paid conversions.',
    heroDescription: 'Short-form video is the king of digital engagement. We write, film with professional anchors, and edit high-velocity reels that hook viewers within the first 3 seconds.',
    offerings: [
      'Scripted Hook-Based Advertising Reels',
      'Professional On-Camera Anchor & Presenter Shoots',
      'Street Vox-Pop & Customer Reaction Videos',
      'Fast-Paced Trend & Audio Adaptations',
      'Dynamic Typography, B-Roll & SFX Integration',
      'Educational Micro-Lesson Series',
      'Before & After Transformation Showcases',
      'Batch-Shooting Days (10-20 Reels in 1 Session)',
    ],
    process: [
      { step: '01', title: 'Viral Hooks & Scripts', desc: 'Crafting scripts with compelling 3-second visual and auditory hooks.' },
      { step: '02', title: 'Anchor & Studio Shoot', desc: 'Filming with professional teleprompters, wireless mics, and multi-angle lighting.' },
      { step: '03', title: 'High-Retention Editing', desc: 'Adding dynamic cuts, zoom-ins, sound effects, subtitles, and motion graphics.' },
      { step: '04', title: 'Publishing & Boosting', desc: 'Ready-to-upload files optimized with caption copy and trending music suggestions.' },
    ],
    faqs: [
      { q: 'Do you provide the anchors or do we speak on camera?', a: 'Both options are available! We have experienced in-house anchors, or our directors can guide your team to speak confidently on camera.' },
    ],
  },

  '/services/podcast-production': {
    category: 'Content & Production',
    title: 'Podcast Studio Production',
    tagline: 'Record, edit, and distribute studio-grade audio and video podcasts.',
    heroDescription: 'Podcasts build deep customer loyalty and unmatched authority. We provide full studio facilities, multi-camera 4K recording, broadcast sound mixing, and viral short clips for social media.',
    offerings: [
      'Acoustically Treated Multi-Mic Studio Setup',
      'Multi-Camera 4K Video Recording',
      'Broadcast Audio Engineering & Noise Removal',
      'Full Episode Editing & Video Switching',
      'Viral Short-Form Social Clips (Reels/Shorts)',
      'Custom Intro/Outro Music & Title Animations',
      'Audio Distribution to Spotify, Apple & Google Podcasts',
      'Episode Transcripts & SEO Show Notes',
    ],
    process: [
      { step: '01', title: 'Format & Set Design', desc: 'Configuring custom studio lighting, neon backdrops, and microphone settings.' },
      { step: '02', title: 'Recording Session', desc: 'Full multi-angle recording with live audio monitoring and backup systems.' },
      { step: '03', title: 'Post-Production Master', desc: 'Audio equalization, multi-cam cut editing, color grading, and clip extraction.' },
      { step: '04', title: 'Distribution Kit', desc: 'Delivering full YouTube master, podcast audio files, and 5-10 promotional reel clips.' },
    ],
    faqs: [
      { q: 'How many short clips do we get per episode?', a: 'Each 45-60 minute podcast episode typically yields 5 to 10 high-impact vertical short clips with captions, perfect for Instagram, YouTube Shorts, and LinkedIn.' },
    ],
  },

  '/services/tvc-production': {
    category: 'Content & Production',
    title: 'TV Commercial & Cinema Ad Production (TVC)',
    tagline: 'Cinematic storytelling that creates lasting emotional connection and brand prestige.',
    heroDescription: 'From broadcast television to cinema halls and digital OTT platforms, we conceptualize, script, direct, and produce high-concept television commercials that leave a lasting mark.',
    offerings: [
      'Creative Conceptualization & Storyboarding',
      'Screenplay & Scriptwriting',
      'Professional Casting & Talent Management',
      'High-End Cinema Camera & Lighting Rigs',
      'Art Direction, Costume & Set Construction',
      'Original Music Composition & Sound Design',
      'Cinematic Color Grading (DaVinci Resolve)',
      'Broadcast & Cinema Censor / DCP Mastering',
    ],
    process: [
      { step: '01', title: 'Creative Pitch', desc: 'Developing distinct storylines, emotional beats, and production budgets.' },
      { step: '02', title: 'Pre-Production', desc: 'Casting actors, scouting locations, locking shooting schedules, and client briefing.' },
      { step: '03', title: 'Principal Photography', desc: 'Directing the shoot with high-end cinema lenses and crew.' },
      { step: '04', title: 'Mastering & Delivery', desc: 'Compositing VFX, mastering Dolby audio, and delivering TVC/cinema DCP formats.' },
    ],
    faqs: [
      { q: 'Can a TVC also be adapted for digital platforms?', a: 'Yes! We deliver cutdowns (30s, 15s, 6s bumpers) and vertical 9:16 cuts specifically optimized for YouTube, Instagram, and digital OTT platforms.' },
    ],
  },

  '/services/ai-video-creation': {
    category: 'Content & Production',
    title: 'AI Video Creation & Synthetic Media',
    tagline: 'Generate multilingual product explainers, synthetic avatars, and rapid creative variations.',
    heroDescription: 'Leverage cutting-edge AI video technology to produce engaging video explainers, automated product demos, and multilingual localized videos at a fraction of traditional production costs.',
    offerings: [
      'Realistic AI Avatar Presenter Videos',
      'Multilingual Voice Dubbing (Hindi, Marathi, English & More)',
      'Automated Script-To-Video Product Demos',
      'Rapid Video Ad Creative Variations for Meta Testing',
      'Text-To-Speech Studio Quality Voiceovers',
      'AI Upscaling, Frame Interpolation & Denoising',
      'Personalized Video Outreach Campaigns',
      'Cost-Effective Internal Training & Onboarding Media',
    ],
    process: [
      { step: '01', title: 'Script & Persona Selection', desc: 'Drafting the marketing script and selecting the appropriate AI presenter persona.' },
      { step: '02', title: 'Voice & Language Tuning', desc: 'Synthesizing voice tone, pacing, inflection, and regional language translations.' },
      { step: '03', title: 'B-Roll & Graphic Fusion', desc: 'Enhancing the AI presentation with motion graphics, screen captures, and sound effects.' },
      { step: '04', title: 'Batch Render & Output', desc: 'Rendering in full HD/4K with subtitle overlays ready for deployment.' },
    ],
    faqs: [
      { q: 'When should a business choose AI video over live shoots?', a: 'AI video is ideal for software tutorials, FAQ explainers, localized regional language versions, and testing 20+ ad hooks rapidly without scheduling camera crews.' },
    ],
  },

  // 6. Strategy & Business Growth Category & Sub-pages
  '/services/business-growth-strategy': {
    category: 'Strategy & Growth',
    title: 'Digital Growth Strategy & Consulting',
    tagline: 'Strategy before execution. Data-backed roadmaps designed to scale revenue predictably.',
    heroDescription: 'Random digital marketing tactics yield random results. We construct comprehensive digital growth frameworks that align your technology, advertising, content, and sales pipelines.',
    offerings: [
      '360-Degree Digital Presence Audit',
      'Competitor Intelligence & Market Gap Analysis',
      'Customer Acquisition Cost (CAC) & LTV Modeling',
      'Omnichannel Marketing Roadmap (12 Months)',
      'Brand Positioning & Value Proposition Refinement',
      'Conversion Rate Optimization (CRO) Roadmaps',
      'Marketing Tech Stack & CRM Implementation',
      'Executive Leadership Consultation & Team Upskilling',
    ],
    process: [
      { step: '01', title: 'Diagnostic Audit', desc: 'Dissecting your website metrics, past ad spends, organic reach, and customer feedback.' },
      { step: '02', title: 'Opportunity Mapping', desc: 'Identifying underserved customer segments and high-leverage acquisition channels.' },
      { step: '03', title: 'Execution Blueprint', desc: 'Creating step-by-step quarterly targets, team responsibilities, and KPI benchmarks.' },
      { step: '04', title: 'Bi-Weekly Review', desc: 'Reviewing real performance data, adjusting allocations, and accelerating growth.' },
    ],
    faqs: [
      { q: 'What does a digital growth audit include?', a: 'It includes technical website performance, competitor ad intelligence, organic search ranking gaps, social media engagement benchmarks, and lead conversion leaks.' },
    ],
  },

  '/services/lead-generation': {
    category: 'Strategy & Growth',
    title: 'B2B & B2C Lead Generation Engines',
    tagline: 'Predictable qualified leads delivered straight to your sales team with automated CRM integration.',
    heroDescription: 'Tired of dead leads and unqualified inquiries? We build end-to-end lead generation engines combining high-intent ads, psychological landing pages, qualification surveys, and instant WhatsApp alerts.',
    offerings: [
      'High-Converting Custom Lead Landing Pages',
      'Multi-Step Lead Qualification Questionnaires',
      'Instant WhatsApp & Email Lead Notifications',
      'Automated CRM Integration (HubSpot, Zoho, Google Sheets)',
      'Meta Instant Forms with Validation Questions',
      'Google Search Call & Lead Form Extensions',
      'Lead Magnet Creation (E-books, Calculators, Whitepapers)',
      'Lead Pipeline Tracking & Cost-Per-Qualified-Lead Audits',
    ],
    process: [
      { step: '01', title: 'Irresistible Offer', desc: 'Crafting high-value lead magnets, consultations, or assessment offers that prompt immediate action.' },
      { step: '02', title: 'Conversion Funnel', desc: 'Engineering mobile-optimized landing pages with trust badges, social proof, and minimal friction.' },
      { step: '03', title: 'Traffic Activation', desc: 'Deploying targeted paid campaigns across Google Search and Meta Ads.' },
      { step: '04', title: 'Instant Notification', desc: 'Connecting webhooks to deliver every lead directly to your sales team’s phone within 60 seconds.' },
    ],
    faqs: [
      { q: 'How do you prevent junk or spam leads?', a: 'We employ multi-step qualification questions, mandatory phone OTP or verification fields, honeypot spam traps, and negative audience exclusions.' },
    ],
  },

  '/services/email-marketing': {
    category: 'Performance Marketing & SaaS',
    title: 'Email Marketing Software as a Service (SaaS)',
    tagline: 'Enterprise-grade cloud email marketing software engineered for automated workflows, high inbox deliverability, and scalable customer lifetime value.',
    heroDescription: 'Stop losing revenue to spam filters. SW provides specialized Email Marketing Service Software (SaaS) equipped with dedicated IP warmup, drag-and-drop campaign automation, granular audience segmentation, and deep CRM integration.',
    offerings: [
      'Cloud Email Marketing SaaS Platform & Dedicated Inboxes',
      'Automated Multi-Step Drip & Onboarding Funnels',
      'Enterprise Deliverability Protocols (SPF, DKIM, DMARC Setup)',
      'Behavioral Customer Segmentation & Tagging Engines',
      'Mobile-Optimized Dynamic Newsletter Templates',
      'A/B Split Testing for Subject Lines & CTAs',
      'Real-Time Open Rate, Click-Through & Bounce Telemetry',
      'Native E-Commerce & CRM Webhook Integrations',
    ],
    process: [
      { step: '01', title: 'Platform Setup & IP Warmup', desc: 'Configuring custom sending domains, cryptographic DNS records, and automated IP warmup to guarantee primary inbox delivery.' },
      { step: '02', title: 'Workflow Automation', desc: 'Constructing behavioral triggers for cart abandonment, welcome sequences, customer surveys, and re-engagement.' },
      { step: '03', title: 'Template Engineering', desc: 'Designing responsive, brand-aligned HTML templates tested across Apple Mail, Gmail, Outlook, and mobile clients.' },
      { step: '04', title: 'Telemetry & Scale', desc: 'Monitoring engagement heatmaps, segmenting high-value VIPs, and maximizing recurring customer revenue.' },
    ],
    faqs: [
      { q: 'Is this a software subscription (SaaS) or an agency managed service?', a: 'SW provides both! You can license our full SaaS software platform for your internal marketing team, or opt for our fully managed service where our specialists craft copy, design templates, and manage campaigns for you.' },
      { q: 'How does your SaaS ensure emails do not land in spam?', a: 'We enforce automated SPF, DKIM, DMARC, and BIMI protocols, paired with algorithmic send throttling, spam-trap sanitization, and reputation monitoring.' },
    ],
  },
};
