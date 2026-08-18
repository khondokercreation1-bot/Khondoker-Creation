export interface ChatBotResponse {
  replyText: string;
}

export const STUDIO_NAME = "Khondoker Creation";

/**
 * Human-like Studio Consultant Chat Logic
 * Speaks like a real, polite, expert human team member from Khondoker Creation.
 */
export function getStudioChatResponse(userInput: string): ChatBotResponse {
  const text = userInput.trim();
  const lower = text.toLowerCase();

  const isBengaliOrBanglish = 
    /[\u0980-\u09FF]/.test(text) || 
    /\b(accha|achha|acha|kemon|bhalo|koto|dam|kaj|khondoker|sothe|apni|apnader|amader|bhai|dada|tumi|shudhu|somporke|deo|dekhao|lagbe|chai|hobe|dorkar|kore|korte|kivabe|kee|ki|kobe|somoy|taka|rate|service|editing|marketing|design|video|logo|ui|ux)\b/i.test(lower) ||
    /^(hi|hello|hey|slam|assalamu|assalam|হ্যালো|হাই|সালাম|কেমন|নমস্কার)/i.test(lower);

  // 1. VIDEO EDITING & MOTION GRAPHICS
  if (/video|editing|reel|reels|shorts|tiktok|premiere|after effects|davinci|color grade|motion|animation|ভিডিও|এডিটিং|রিল|রিলস|শর্টস|মোশন|এনিমেশন|কালার গ্রেডিং/i.test(lower)) {
    if (isBengaliOrBanglish) {
      return {
        replyText: `আসসালামু আলাইকুম! খন্দকার ক্রিয়েশনের ভিডিও প্রডাকশন টিম থেকে বলছি। 🎬

আমরা প্রফেশনাল Premiere Pro, After Effects ও DaVinci Resolve দিয়ে সব ধরনের ভিডিও এডিটিং করি:
- সোশ্যাল মিডিয়া রিলস, শর্টস ও টিকটক (ক্যাপশন ও ট্রানজিশনসহ)
- ৪কে কালার গ্রেডিং ও সিনেমাটিক ব্র্যান্ড অ্যাড
- ৩ডি লোগো এনিমেশন ও মোশন গ্রাফিক্স
- ইউটিউব ভিডিও, ইন্টারভিউ ও প্রমোশনাল প্রজেক্ট

আপনার কি কোনো র ফুটেজ (Raw Footage) তৈরি আছে, নাকি কোনো নির্দিষ্ট আইডিয়া নিয়ে কাজ করতে চান? জানালে আমরা এখনই আইডিয়া শেয়ার করতে পারি!`
      };
    } else {
      return {
        replyText: `Hello! This is Khondoker Creation's video editing team. 🎬

We edit high-engaging videos using Premiere Pro, After Effects, and DaVinci Resolve:
- Viral Reels, Shorts & TikToks with custom captions & FX
- Cinematic 4K Product Ads & Brand Commercials
- 3D Logo Animations & Motion Graphics
- YouTube Content & Corporate Presentations

Do you have raw footage ready, or would you like to discuss a fresh concept?`
      };
    }
  }

  // 2. DIGITAL MARKETING & SMM
  if (/marketing|digital|smm|seo|ads|facebook|instagram|youtube|campaign|growth|audience|মার্কেটিং|ডিজিটাল|বিজ্ঞাপন|এসইও|ক্যাম্পেইন|প্রমোশন|অডিয়েন্স/i.test(lower)) {
    if (isBengaliOrBanglish) {
      return {
        replyText: `হ্যালো! আমাদের ডিজিটাল মার্কেটিং ও মেটা অ্যাডস ম্যানেজমেন্টে আপনাকে স্বাগতম। 📈

আপনার ব্যবসার কাস্টমার ও সেলস বাড়াতে আমরা যা সাহায্য করি:
- ফেসবুক ও ইনস্টাগ্রাম পেইড অ্যাডস এবং অডিয়েন্স টার্গেটিং
- মেটা বিজনেস স্যুট কন্টেন্ট ক্যালেন্ডার ও ব্যানার ডিজাইন
- ইউটিউব & গুগল সার্চ প্রমোশন ও অর্গানিক এসইও

আপনার বর্তমান পেজ বা ব্যবসার নিশ সম্পর্কে একটু বলবেন? আমরা আপনার ব্যবসার উপযোগী একটা প্ল্যান বানিয়ে দিতে পারবো!`
      };
    } else {
      return {
        replyText: `Hi there! Khondoker Creation's marketing team here. 📈

We help brands scale using data-driven campaigns:
- Meta (Facebook/Instagram) & Google Paid Ads Setup
- High-Converting Sales Funnels & Targeted Audience Research
- Content Strategy, Copywriting & Monthly Ad Sets
- SEO & Organic Brand Growth

Tell us a bit about your business, and we'll draft a strategy for you!`
      };
    }
  }

  // 3. UI/UX DESIGN & WEB INTERFACES
  if (/ui|ux|figma|wireframe|prototype|interface|web design|app design|ইউআই|ইউএক্স|ফিগমা|ওয়ারফ্রেম|ওয়েব ডিজাইন|অ্যাপ ডিজাইন|ইন্টারফেস/i.test(lower)) {
    if (isBengaliOrBanglish) {
      return {
        replyText: `আসসালামু আলাইকুম! আমাদের UI/UX ও ফিগমা ডিজাইন টিম থেকে বলছি। 💻

আমরা একদম মডার্ন ও ইউজার-ফ্রেন্ডলি ইন্টারফেস তৈরি করি:
- ওয়েবসাইট ও ল্যান্ডিং পেজ ডিজাইন (ডার্ক/লাইট থিম)
- মোবাইল অ্যাপ ইউআই (iOS & Android complete flow)
- ক্লিক্যাবল ফিগমা প্রোটোটাইপ ও ওয়্যারফ্রেম
- সম্পূর্ণ ডিজাইন সিস্টেম ও রেসপন্সিভ গ্রিড

আপনার নতুন কোনো অ্যাপ বা ওয়েবসাইটের আইডিয়া থাকলে শেয়ার করুন, আমরা এখনই ধারণা দিতে পারবো!`
      };
    } else {
      return {
        replyText: `Hello! Our UI/UX design team at Khondoker Creation is here to assist you. 💻

We design clean, conversion-focused user interfaces using Figma:
- SaaS & E-commerce Landing Page UI
- Complete Mobile App UI/UX (iOS & Android)
- Interactive Clickable Figma Prototypes
- Custom Design Systems & UI Components

Share your project requirements, and we'll walk you through our UI design process!`
      };
    }
  }

  // 4. GRAPHICS DESIGN, LOGO, 3D & PACKAGING
  if (/graphic|graphics|logo|mockup|3d|packaging|label|poster|banner|brand|branding|গ্রাফিক্স|লোগো|মকআপ|প্যাকেজিং|পোস্টার|ব্যানার|ব্র্যান্ডিং/i.test(lower)) {
    if (isBengaliOrBanglish) {
      return {
        replyText: `আসসালামু আলাইকুম! খন্দকার ক্রিয়েশনের প্রিমিয়াম গ্রাফিক্স ও ৩ডি ব্র্যান্ডিং টিম থেকে বলছি। 🎨

আমাদের তৈরি করা কিছু প্রধান গ্রাফিক্স সার্ভিস:
- ইউনিক লোগো ও ফুল ব্র্যান্ড গাইডলাইন
- ৩ডি প্রোডাক্ট রেন্ডার, বোটল ও বক্স প্যাকেজিং
- প্রিন্ট-রেডি লাক্সারি প্যাকেজিং ও ডাই-লাইন ডিজাইন
- সোশ্যাল মিডিয়া পোস্টার, ফেসবুক ব্যানার ও ক্যারোসেল আর্ট

আপনার ঠিক কী ধরনের ব্র্যান্ডিং বা ডিজাইনের কাজ প্রয়োজন? বললে বিস্তারিত রেট ও ডিটেইলস দিচ্ছি!`
      };
    } else {
      return {
        replyText: `Greetings! Khondoker Creation's branding & 3D graphics team is ready to help. 🎨

Our key creative services include:
- Custom Logo Design & Full Brand Identity Books
- Photorealistic 3D Mockups, Renders & Packaging
- Print-Ready Packaging Dielines & Foil Stamping Artwork
- Social Media Ad Creatives & Promotional Banners

Let us know what visual assets you need, and we'll share sample options with you!`
      };
    }
  }

  // 5. GREETINGS / হ্যালো / কেমন আছেন
  if (/^(hi|hello|hey|slam|assalamu|assalam|হ্যালো|হাই|সালাম|কেমন|নমস্কার)/i.test(lower)) {
    return {
      replyText: `আসসালামু আলাইকুম! 👋 খন্দকার ক্রিয়েশন (Khondoker Creation)-এ আপনাকে স্বাগতম। আমি আমাদের টিম থেকে আপনাকে সাহায্য করতে লাইভে আছি।

আমরা প্রফেশনালি ৪টি প্রধান সেক্টরে কাজ করে থাকি:
১. 🎨 গ্রাফিক্স ডিজাইন, ৩ডি মকআপ & ব্র্যান্ডিং
২. 🎬 ভিডিও এডিটিং & মোশন গ্রাফিক্স
৩. 📈 ডিজিটাল মার্কেটিং & অ্যাড ক্যাম্পেইন
৪. 💻 UI/UX & ফিগমা ওয়েটু অ্যাপ ডিজাইন

আপনার প্রজেক্টের ব্যাপারে বা যেকোনো প্রশ্ন থাকলে আমাকে সরাসরি জানাতে পারেন! কীভাবে সাহায্য করতে পারি বলুন?`
    };
  }

  // 6. ALL SERVICES SUMMARY / সার্ভিসসমূহ / কি কি কাজ করেন
  if (/service|সার্ভিস|কী কী|কি কি|কাজ করেন|কী কাজ|কি কাজ|কী সার্ভিস|offer|portfolio|ক্যাপাবিলিটি/i.test(lower)) {
    return {
      replyText: `খন্দকার ক্রিয়েশনে আমরা মূলতঃ ৪টি প্রফেশনাল ক্রিয়েটিভ সার্ভিস দিচ্ছি:

১. **🎨 গ্রাফিক্স ডিজাইন & ৩ডি ব্র্যান্ডিং:** লোগো, লাক্সারি প্যাকেজিং, ডাই-লাইন ও ৩ডি মকআপ।
২. **🎬 ভিডিও এডিটিং & মোশন গ্রাফিক্স:** শর্টস/রিলস, প্রমোশনাল অ্যাডস, ৪কে এডিটিং ও ৩ডি ইনট্রো।
৩. **📈 ডিজিটাল মার্কেটিং:** মেটা/ফেসবুক অ্যাডস, ইনস্টাগ্রাম গ্রোথ ও সেলস ফানেল।
৪. **💻 UI/UX ডিজাইন:** ফিগমা ইউজার ইন্টারফেস, ল্যান্ডিং পেজ ও অ্যাপ প্রোটোটাইপ।

আপনার জন্য কোনো সার্ভিস লাগবে নাকি নির্দিষ্ট কোনো বিষয়ে জানতে চান?`
    };
  }

  // 7. PRICING & RATES ACROSS ALL SKILLS
  if (/price|cost|budget|rate|dollar|দাম|কত|ফি|খরচ|টাকা|প্যাকেজ|ক্যালকুলেট/i.test(lower)) {
    return {
      replyText: `আমাদের কাজের রেট প্রজেক্টের সাইজ ও রিকোয়ারমেন্টের ওপর নির্ভর করে। তবে প্রাথমিক ধারণা দেওয়ার জন্য একটা আনুমানিক বাজেট রেঞ্জ নিচে দেওয়া হলো:

• লোগো & ব্র্যান্ড আইডেন্টিটি: $১৫০ - $১,০০০
• ভিডিও এডিটিং & শর্টস প্যাক: $২০০ - $৮০০
• ডিজিটাল মার্কেটিং ক্যাম্পেইন: $৩০০ - $১,২০০
• UI/UX ফিগমা ডিজাইন: $৪০০ - $১,৫০০

💡 আপনি চাইলে ওয়েবসাইটের ওপরে থাকা **'Quote Calc'** বাটনে ক্লিক করে কাজের ধরন বেছে সাথে সাথে আনুমানিক খরচ ক্যালকুলেট করে নিতে পারেন!`
    };
  }

  // 8. SOFTWARE & WORKFLOW
  if (/software|photoshop|illustrator|blender|premiere|after effects|figma|davinci|সফটওয়্যার|ফিগমা|প্রিমিয়ার|আফটার ইফেক্টস|ইলাস্ট্রেটর/i.test(lower)) {
    return {
      replyText: `আমরা সব সময় ইন্ডাস্ট্রি স্ট্যান্ডার্ড সফটওয়্যার ব্যবহার করি:

• গ্রাফিক্স ও মেম্বারশিপ: Adobe Illustrator, Photoshop, Merchandising and Marketing
• ভিডিও এডিটিং: Premiere Pro, After Effects, DaVinci Resolve
• UI/UX ডিজাইন: Figma, Adobe XD
• মার্কেটিং: Meta Business Suite, Google Ads Manager

কাজের শেষে সব সোর্স ফাইল (AI, PSD, PRPROJ, Figma) সম্পূর্ণ ওনারশিপসহ আমরা ক্লায়েন্টকে দিয়ে থাকি।`
    };
  }

  // 9. TIMELINE & DELIVERY
  if (/time|delivery|duration|how long|কতদিন|সময়|কবে|কত সময়/i.test(lower)) {
    return {
      replyText: `প্রজেক্ট ডেলিভারি সময় সাধারণত কাজের ধরণ অনুযায়ী নির্ধারণ করা হয়:

• গ্রাফিক্স & ব্যানার: ৩ - ৫ দিন
• ভিডিও এডিটিং & রিলস: ২ - ৪ দিন
• UI/UX ডিজাইন: ৫ - ৮ দিন
• ডিজিটাল মার্কেটিং অ্যাডস: ২৪-৪৮ ঘণ্টার মধ্যে লাইভ

জরুরি প্রজেক্ট থাকলে এক্সপ্রেস ডেলিভারির সুযোগও আছে!`
    };
  }

  // 10. SAMPLE WORK / PORTFOLIO
  if (/sample|portfolio|work|proof|স্যাম্পল|কাজ|নমুনা|পোর্টফোলিও|পোর্টফলিও/i.test(lower)) {
    return {
      replyText: `আমাদের পোর্টফোলিও ও সাম্প্রতিক কাজগুলো আপনি ওয়েবসাইটের **'Selected Work'** সেকশনে সরাসরি দেখতে পারবেন!

এছাড়াও নির্দিষ্ট কোনো ইন্ডাস্ট্রি (যেমন: ই-কমার্স, রিয়েল এস্টেট, ফ্যাশন বা ইউটিউব) সংক্রান্ত ডেমো দেখতে চাইলে আমাদের জানান, আমরা সরাসরি লিংক শেয়ার করবো।`
    };
  }

  // 11. FALLBACK / GENERAL HUMAN-LIKE BENGALI RESPONSE
  return {
    replyText: `ধন্যবাদ আপনার মেসেজের জন্য! 😊

খন্দকার ক্রিয়েশন (Khondoker Creation)-এর ক্লায়েন্ট ডেস্কে আমি আপনার মেসেজটি পেয়েছি। আপনার প্রজেক্টের পরিকল্পনা বা কাজের বিষয়ে বিস্তারিত জানালে আমি এখনই আপনাকে সঠিক পরামর্শ ও বাজেট গাইড করতে পারবো!`
  };
}

