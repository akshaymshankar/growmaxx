# 🚀 GROWMAXX — Complete Go-To-Market & Operations Plan

**Version:** 1.0  
**Date:** December 7, 2025  
**Author:** Founder  
**Target Launch:** MVP in 2 weeks, Pilot in 4 weeks, 50 clients in 6 months

---

## TABLE OF CONTENTS
1. [Positioning & Taglines](#1-positioning--taglines)
2. [8-Week Roadmap](#2-8-week-roadmap)
3. [MVP Technical Spec](#3-mvp-technical-spec)
4. [Sales Playbook](#4-sales-playbook)
5. [Marketing Plan](#5-marketing-plan)
6. [Operational SOPs](#6-operational-sops)
7. [Pricing & Billing](#7-pricing--billing)
8. [KPI Dashboard](#8-kpi-dashboard)
9. [Investor Pitch Outline](#9-investor-pitch-outline-6-slides)
10. [Risk Matrix](#10-risk-matrix--mitigation)
11. [Notion/Asana Task Board](#11-notionasana-task-board)

---

## 1. POSITIONING & TAGLINES

### One-Paragraph Positioning Statement

**GrowMaxx** is the fastest way for local businesses in Tamil Nadu to get online and start growing. We deliver professional, mobile-first landing pages with WhatsApp-first customer funnels, Google Business setup, and AI-powered FAQ bots — all in just 48 hours. Unlike expensive agencies or DIY website builders, GrowMaxx is built specifically for bakeries, clinics, salons, tailors, tuition centers, and boutiques who need real results, not complicated tech. Starting at just ₹499/month, we handle everything so business owners can focus on what they do best — serving customers.

### Three Taglines (Short)

| # | Tagline | Use Case |
|---|---------|----------|
| 1 | **"48 மணி நேரத்தில் உங்கள் வணிகம் ஆன்லைன்" (Your Business Online in 48 Hours)** | Primary — Hero, Ads |
| 2 | **"WhatsApp-ல் விற்கவும். Google-ல் காணப்படவும்."** (Sell on WhatsApp. Be Found on Google.) | Features Focus |
| 3 | **"₹499-ல் துவங்குங்கள். கடையை வளர்க்குங்கள்."** (Start at ₹499. Grow Your Shop.) | Pricing Focus |

---

## 2. 8-WEEK ROADMAP

### Phase Overview
- **Week 1-2:** MVP Development & Internal Testing
- **Week 3-4:** Pilot Launch (5 shops in Tiruppur)
- **Week 5-6:** Refinement & Scale Prep
- **Week 7-8:** Expand to 20 clients, Begin Coimbatore Outreach

---

### WEEK 1 (Dec 7-13)
| Task | Owner | Deliverable | Acceptance Criteria |
|------|-------|-------------|---------------------|
| Finalize tech stack & repo setup | Founder | GitHub repo live | Can `npm run dev` successfully |
| Design 3 demo templates (Bakery, Salon, Clinic) | Founder | Figma/Code components | Mobile-first, < 3s load time |
| Set up WhatsApp Business + Auto-replies | Founder | WA Business account | Test message flow works |
| Create Google Sheets CRM | Founder | `GrowMaxx-CRM.gsheet` | Columns defined, sample row added |
| Build landing page generator MVP | Founder | `/generate` endpoint | Can create page from JSON input |

### WEEK 2 (Dec 14-20)
| Task | Owner | Deliverable | Acceptance Criteria |
|------|-------|-------------|---------------------|
| Complete 5 demo pages (internal) | Founder | 5 live URLs | Each loads < 2s, mobile perfect |
| Integrate GA4 tracking | Founder | Analytics live | Events: page_view, wa_click, form_submit |
| Set up Razorpay test account | Founder | Payment link working | ₹1 test payment succeeds |
| Create sales collateral | Founder | Pitch deck, scripts | Door-to-door script ready |
| Internal QA all demos | Founder | Bug list resolved | 0 critical bugs |

### WEEK 3 (Dec 21-27)
| Task | Owner | Deliverable | Acceptance Criteria |
|------|-------|-------------|---------------------|
| Door-to-door sales — 20 shops visited | Founder | 20 shop visits logged | CRM updated with notes |
| Convert 3 free demos | Founder | 3 demo pages live | Client approves preview |
| Collect assets (photos, menus) | Founder | Assets folder per client | Min 5 photos, menu PDF |
| Deploy 3 client demos | Founder | 3 subdomains live | WhatsApp flow working |
| First WhatsApp group promotion | Founder | Post in 5 local groups | Track link clicks |

### WEEK 4 (Dec 28 - Jan 3)
| Task | Owner | Deliverable | Acceptance Criteria |
|------|-------|-------------|---------------------|
| Close 5 paying clients | Founder | 5 signed + paid | ₹2,495+ received |
| Complete Google Business setup for all 5 | Founder | 5 GMB listings | All verified or pending |
| Collect testimonials (video/text) | Founder | 3 testimonials | At least 1 video |
| Create case study template | Founder | `case-study-template.md` | Reusable format |
| Refine onboarding SOP | Founder | SOP v1.1 | < 2hr onboarding time |

### WEEK 5 (Jan 4-10)
| Task | Owner | Deliverable | Acceptance Criteria |
|------|-------|-------------|---------------------|
| Analyze pilot metrics | Founder | Pilot report | Conversion rate, NPS captured |
| A/B test 2 pricing displays | Founder | Winner identified | 20%+ improvement in clicks |
| Add AI FAQ bot v1 | Founder | Bot live on 2 sites | Answers 5 FAQs correctly |
| Create referral program | Founder | Referral landing page | ₹500 credit per referral |
| Begin Coimbatore research | Founder | 30 target shops list | Contact info collected |

### WEEK 6 (Jan 11-17)
| Task | Owner | Deliverable | Acceptance Criteria |
|------|-------|-------------|---------------------|
| Scale to 15 total clients | Founder | 15 active | All sites live |
| Launch FB/Insta ads (₹500 budget) | Founder | Ad live | CTR > 2% |
| Partner with 1 local business association | Founder | MOU signed | Access to member list |
| Monthly analytics report v1 | Founder | Report template | Auto-generated from GA4 |
| Hire part-time sales help (commission) | Founder | 1 person onboarded | First 5 visits completed |

### WEEK 7 (Jan 18-24)
| Task | Owner | Deliverable | Acceptance Criteria |
|------|-------|-------------|---------------------|
| Coimbatore pilot — 5 shops | Founder | 5 demos delivered | 2 converted to paid |
| Launch Growth tier (₹999) | Founder | Tier live | First Growth client signed |
| Create video walkthrough | Founder | 2-min YouTube video | 100+ views |
| Automate monthly invoicing | Founder | Razorpay subscriptions | Auto-debit working |
| Content: 4 social posts/week | Founder | 4 posts live | 50+ engagement total |

### WEEK 8 (Jan 25-31)
| Task | Owner | Deliverable | Acceptance Criteria |
|------|-------|-------------|---------------------|
| Reach 25 total clients | Founder | 25 active | MRR ≥ ₹15,000 |
| Chennai market research | Founder | 50 target shops | Categorized by type |
| Investor pitch prep | Founder | Deck v1 complete | 6 slides ready |
| Process documentation | Founder | All SOPs final | < 4hr new client delivery |
| Plan Month 3 expansion | Founder | M3 roadmap | Targets for 50 clients |

---

## 3. MVP TECHNICAL SPEC

### Technology Stack

```
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND                                │
├─────────────────────────────────────────────────────────────┤
│  React 19 + Vite 7                                          │
│  Tailwind CSS 3.4 (utility-first styling)                   │
│  Framer Motion (animations)                                  │
│  Deployed on: Vercel / Netlify (free tier)                  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      BACKEND                                 │
├─────────────────────────────────────────────────────────────┤
│  Vercel Serverless Functions (Node.js 18)                   │
│  OR: Cloudflare Workers (free tier)                         │
│  Database: Google Sheets API (CRM) + JSON files (content)   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    INTEGRATIONS                              │
├─────────────────────────────────────────────────────────────┤
│  WhatsApp Business API (via wa.me links + webhooks)         │
│  Google Business Profile API                                 │
│  Google Analytics 4                                          │
│  Razorpay (payments)                                         │
│  Cloudinary (image hosting - free tier)                     │
└─────────────────────────────────────────────────────────────┘
```

### Repository Layout

```
growmaxx/
├── README.md
├── package.json
├── .env.example
├── .gitignore
│
├── public/
│   ├── favicon.ico
│   ├── og-image.png
│   └── robots.txt
│
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Layout.jsx
│   │   │
│   │   ├── landing/
│   │   │   ├── Hero.jsx
│   │   │   ├── Features.jsx
│   │   │   ├── Pricing.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   └── Contact.jsx
│   │   │
│   │   ├── templates/
│   │   │   ├── BakeryTemplate.jsx
│   │   │   ├── SalonTemplate.jsx
│   │   │   ├── ClinicTemplate.jsx
│   │   │   ├── TuitionTemplate.jsx
│   │   │   └── BoutiqueTemplate.jsx
│   │   │
│   │   └── ui/
│   │       ├── Button.jsx
│   │       ├── Card.jsx
│   │       ├── Input.jsx
│   │       └── Modal.jsx
│   │
│   ├── hooks/
│   │   ├── useAnalytics.js
│   │   └── useWhatsApp.js
│   │
│   ├── lib/
│   │   ├── analytics.js
│   │   ├── sheets.js
│   │   └── whatsapp.js
│   │
│   └── data/
│       ├── templates.json
│       └── pricing.json
│
├── api/                          # Serverless functions
│   ├── lead.js                   # POST /api/lead
│   ├── generate.js               # POST /api/generate
│   └── webhook.js                # WhatsApp webhook
│
├── scripts/
│   ├── deploy-client.sh          # 48-hr deployment script
│   └── setup-gmb.js              # Google Business automation
│
└── docs/
    ├── ONBOARDING.md
    ├── DEPLOYMENT.md
    └── API.md
```

### API Contracts

#### `POST /api/lead` — Capture New Lead

**Request:**
```json
{
  "name": "Rajesh Kumar",
  "business_name": "Rajesh Tailors",
  "phone": "+919876543210",
  "city": "Tiruppur",
  "business_type": "tailor",
  "notes": "Want WhatsApp orders for stitching",
  "source": "website_form",
  "utm_source": "whatsapp_group",
  "utm_campaign": "dec2025_pilot"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "lead_id": "LEAD-2025-001",
  "message": "Lead captured. We'll contact you within 2 hours.",
  "next_steps": [
    "WhatsApp confirmation sent",
    "Added to CRM",
    "Assigned to founder"
  ]
}
```

**Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "VALIDATION_ERROR",
  "message": "Phone number is required",
  "field": "phone"
}
```

#### `POST /api/generate` — Generate Demo Page

**Request:**
```json
{
  "template": "bakery",
  "business": {
    "name": "Anna's Bakery",
    "tagline": "Fresh Cakes Daily",
    "phone": "+919876543210",
    "address": "123 Main Road, Tiruppur",
    "hours": "9 AM - 9 PM",
    "google_maps_url": "https://goo.gl/maps/xxx"
  },
  "content": {
    "hero_title": "Freshly Baked with Love",
    "hero_subtitle": "Order cakes, pastries & snacks via WhatsApp",
    "services": [
      { "name": "Birthday Cakes", "price": "₹500 onwards" },
      { "name": "Pastries", "price": "₹30 each" },
      { "name": "Snacks", "price": "₹20 onwards" }
    ],
    "gallery": [
      "https://cdn.growmaxx.com/clients/anna/cake1.jpg",
      "https://cdn.growmaxx.com/clients/anna/cake2.jpg"
    ]
  },
  "theme": {
    "primary_color": "#E91E63",
    "accent_color": "#FFC107"
  },
  "features": {
    "whatsapp_cta": true,
    "google_map": true,
    "faq_bot": false,
    "contact_form": true
  }
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "site_id": "anna-bakery-tiruppur",
  "preview_url": "https://preview.growmaxx.com/anna-bakery-tiruppur",
  "estimated_live": "2025-12-09T10:00:00Z",
  "status": "generating"
}
```

#### `POST /api/lead` Schema (TypeScript)

```typescript
interface LeadRequest {
  // Required fields
  name: string;              // Business owner's name (2-100 chars)
  phone: string;             // WhatsApp number with country code
  city: string;              // City name
  
  // Optional fields
  business_name?: string;    // Business name
  business_type?: 'bakery' | 'clinic' | 'salon' | 'tailor' | 'tuition' | 'boutique' | 'other';
  notes?: string;            // Additional notes (max 500 chars)
  email?: string;            // Email address
  source?: 'website_form' | 'whatsapp' | 'referral' | 'walk_in' | 'social_media';
  utm_source?: string;       // UTM source parameter
  utm_medium?: string;       // UTM medium parameter
  utm_campaign?: string;     // UTM campaign parameter
  preferred_language?: 'en' | 'ta';  // English or Tamil
}

interface LeadResponse {
  success: boolean;
  lead_id?: string;
  message: string;
  next_steps?: string[];
  error?: string;
  field?: string;
}
```

### Database Schema (Google Sheets)

**Sheet: `Leads`**
| Column | Type | Description |
|--------|------|-------------|
| A: lead_id | String | Auto-generated: LEAD-YYYY-NNN |
| B: created_at | DateTime | Timestamp of submission |
| C: name | String | Owner name |
| D: business_name | String | Business name |
| E: phone | String | WhatsApp number |
| F: email | String | Email (optional) |
| G: city | String | City |
| H: business_type | String | Category |
| I: notes | String | Additional notes |
| J: source | String | Lead source |
| K: status | String | new/contacted/demo_sent/converted/lost |
| L: assigned_to | String | Team member |
| M: follow_up_date | Date | Next follow-up |
| N: conversion_value | Number | Deal value in ₹ |
| O: utm_source | String | UTM tracking |
| P: utm_campaign | String | Campaign name |

**Sheet: `Clients`**
| Column | Type | Description |
|--------|------|-------------|
| A: client_id | String | CLIENT-YYYY-NNN |
| B: lead_id | String | Original lead reference |
| C: business_name | String | Business name |
| D: owner_name | String | Owner name |
| E: phone | String | Primary contact |
| F: plan | String | onetime/basic/growth |
| G: mrr | Number | Monthly recurring revenue |
| H: start_date | Date | Service start |
| I: site_url | String | Live website URL |
| J: gmb_status | String | pending/verified/na |
| K: last_edit_date | Date | Last content update |
| L: next_billing | Date | Next payment due |
| M: status | String | active/paused/churned |

---

## 4. SALES PLAYBOOK

### Door-to-Door Script (Tamil + English)

#### Opening (Tamil)
```
வணக்கம்! நான் [உங்கள் பெயர்], GrowMaxx-லிருந்து வர்றேன்.
உங்க கடைக்கு ஒரு நல்ல வாய்ப்பு கொண்டு வந்திருக்கேன்.

உங்க customers WhatsApp-ல message பண்ணி order பண்ண முடியும்,
Google-ல search பண்ணா உங்க கடை first-ல வரும் -
இதெல்லாம் 48 மணி நேரத்தில் ready பண்ணிடுவோம்.

இப்போ busy-ன்னா, 2 நிமிஷம் போதும் - demo காட்டுறேன்.
```

#### Opening (English)
```
Hello! I'm [Your Name] from GrowMaxx.
I have a great opportunity for your business.

Your customers can message you on WhatsApp to place orders,
When people search on Google, your shop will appear first -
We'll set all this up in just 48 hours.

If you're busy, just 2 minutes - let me show you a demo.
```

#### Demo Script (Show phone)
```
[Open demo site on phone]

பாருங்க - இது Anna's Bakery-க்கு நாங்க பண்ணது.
(Look - this is what we made for Anna's Bakery.)

[Point to WhatsApp button]
Customer இந்த button press பண்ணா, direct WhatsApp-ல message வரும்.
(When customer presses this, message comes directly to WhatsApp.)

[Point to menu]
Menu, photos, timing - எல்லாம் ஒரே இடத்தில.
(Menu, photos, timing - everything in one place.)

[Point to map]
Google Maps-ல direction-உம் கிடைக்கும்.
(They can get directions on Google Maps too.)

உங்களுக்கும் இப்படி பண்ணலாம். ₹499 தான் monthly.
(We can make this for you too. Only ₹499 monthly.)
```

#### Closing
```
இப்போ free demo பண்ணிடுவோம் - உங்களுக்கு பிடிச்சா continue பண்ணலாம்.
நாளைக்குள் உங்க site ready.

உங்க WhatsApp number என்ன?
(We'll make a free demo now - if you like it, you can continue.
Your site will be ready by tomorrow.
What's your WhatsApp number?)
```

---

### WhatsApp Cold Message Templates

#### Template 1: Direct Offer (Tamil)
```
வணக்கம் 🙏

நான் GrowMaxx-லிருந்து. உங்க [business_type] கடைக்கு 
professional website + WhatsApp ordering system பண்ணிடுவோம்.

✅ 48 மணி நேரத்தில் ready
✅ ₹499/மாதம் மட்டுமே
✅ Google-ல் உங்க கடை காணும்

Free demo பார்க்க: [link]

Interested-ன்னா reply பண்ணுங்க! 👍
```

#### Template 2: Value-First (English)
```
Hi! 👋

I noticed [Business Name] doesn't have an online presence yet.

We help local shops like yours get:
• A professional website (ready in 48hrs)
• WhatsApp ordering system
• Google Maps listing

Starting at just ₹499/month.

Want me to create a FREE demo for you?
Reply "YES" and I'll send it tomorrow!
```

#### Template 3: Social Proof
```
வணக்கம்!

Tiruppur-ல் [X] கடைகள் already GrowMaxx use பண்றாங்க.

Anna's Bakery சொல்றாங்க: "WhatsApp orders 3x ஆச்சு!"

உங்களுக்கும் FREE demo பண்றோம் - interested-ன்னா reply பண்ணுங்க 🙂
```

#### Template 4: Follow-up
```
Hi [Name]! 

நேத்து நான் உங்க கடைக்கு வந்தேன். 
உங்க FREE demo ready ஆயிடுச்சு! 🎉

பாருங்க: [preview_link]

பிடிச்சா சொல்லுங்க, live பண்ணிடுவோம்!
```

---

### 30-Second Pitch

**English:**
> "GrowMaxx helps local businesses get online in 48 hours. We build professional landing pages with WhatsApp ordering, Google Maps, and everything a shop needs to get more customers. Anna's Bakery in Tiruppur saw their WhatsApp orders triple after working with us. It's just ₹499 a month - cheaper than one newspaper ad. Can I show you a quick demo?"

**Tamil:**
> "GrowMaxx local business-க்கு 48 மணி நேரத்தில் online presence தருது. WhatsApp ordering, Google Maps, எல்லாம் include. Tiruppur Anna's Bakery-க்கு WhatsApp orders மூணு மடங்கு ஆச்சு. Monthly ₹499 தான் - ஒரு newspaper ad-விட cheap. Demo காட்டட்டுமா?"

---

### Objection Handling Sheet

| Objection | Response (Tamil) | Response (English) |
|-----------|-----------------|---------------------|
| **"விலை அதிகம்" (Too expensive)** | "₹499 - அது daily ₹16 தான். ஒரு tea விட கம்மி. ஒரு customer extra வந்தாலே profit-ல cover ஆயிடும்." | "₹499 is just ₹16/day - less than a tea. One extra customer covers the cost." |
| **"Time இல்ல" (No time)** | "உங்க time waste பண்ண மாட்டோம். 15 நிமிஷம் photos, menu குடுங்க - மீதி நாங்க பார்த்துக்குறோம். 48 மணி நேரத்தில் ready." | "We won't waste your time. Give us 15 mins for photos and menu - we handle everything. Ready in 48 hours." |
| **"Technology புரியாது" (Don't understand tech)** | "நீங்க ஒன்னும் பண்ண வேண்டாம். WhatsApp message வரும் - அவ்வளவுதான். உங்க customer message பண்ணா, நீங்க reply பண்ணுங்க. Simple." | "You don't need to do anything. Messages come to WhatsApp - that's it. Customer messages, you reply. Simple." |
| **"Already customers இருக்காங்க" (Already have customers)** | "அது நல்லது! ஆனா Google-ல் search பண்றவங்க உங்க competitor-கிட்ட போறாங்க. அவங்களையும் பிடிக்கலாம்." | "That's great! But people searching on Google are going to your competitors. Let's capture them too." |
| **"Think பண்றேன்" (Need to think)** | "Sure! இப்போ free demo பண்ணிடுறேன் - நாளைக்கு பாருங்க, பிடிச்சா continue பண்ணலாம். Risk இல்ல." | "Sure! Let me make a free demo now - see it tomorrow, continue if you like it. No risk." |
| **"Competitor already இருக்கு" (Competitor has this)** | "Exactly! அதான் point. அவங்க online இருக்காங்க, நீங்களும் இருக்கணும். இல்லன்னா customers அவங்ககிட்ட போயிடுவாங்க." | "Exactly! That's the point. They're online, you should be too. Otherwise customers go to them." |

---

## 5. MARKETING PLAN

### Channels & Strategy

| Channel | Budget | Action | Expected Result |
|---------|--------|--------|-----------------|
| **WhatsApp Groups** | ₹0 | Join 20 local business groups, post weekly | 50 leads/month |
| **Facebook/Instagram Ads** | ₹500/month | Geo-targeted ads to Tiruppur business owners | 100 impressions/day, 5 leads |
| **Google Local Services** | ₹0 (organic) | SEO-optimized GrowMaxx site | Long-term visibility |
| **College Campus** | ₹0 | Partner with MBA students for sales commission | 10 leads/month |
| **Referral Program** | ₹500/referral | Existing clients refer new ones | 3 referrals/month |
| **Local Business Associations** | ₹0 | Present at meetings, sponsor small events | 20 leads/quarter |

---

### 6 Ad Copy Variations

#### Ad 1: Problem-Solution (Tamil)
```
🏪 கடை இருக்கு... Customers வரல?

Google-ல் search பண்ணா உங்க competitor தான் வர்றாங்க!

GrowMaxx-ல் 48 மணி நேரத்தில்:
✅ Professional website
✅ WhatsApp ordering
✅ Google-ல் first page

₹499/மாதம் - FREE demo இப்போவே!
👉 [Link]
```

#### Ad 2: Social Proof (English)
```
"My WhatsApp orders tripled!" - Anna's Bakery, Tiruppur

50+ local businesses trust GrowMaxx.

Get your shop online in 48 hours:
• Professional landing page
• WhatsApp-first customer flow  
• Google Business setup

Starting ₹499/month. FREE demo!
👉 [Link]
```

#### Ad 3: Urgency (Tamil)
```
⚡ இந்த வாரம் மட்டும்!

First 10 shops-க்கு FREE Google Business setup (worth ₹2000)

உங்க bakery, salon, clinic, tuition -
எதுவா இருந்தாலும் 48 மணி நேரத்தில் online!

₹499/month - Hurry!
👉 [Link]
```

#### Ad 4: Question Hook
```
🤔 உங்க competitor Google-ல் first-ல வர்றாங்க...
நீங்க ஏன் இல்ல?

GrowMaxx = 48-hour website + WhatsApp orders + Google visibility

₹499 மட்டுமே. Demo FREE!
```

#### Ad 5: Benefit Stack
```
What ₹499/month gets you:

✅ Professional mobile website
✅ WhatsApp ordering system
✅ Google Maps listing
✅ Monthly updates included
✅ Customer analytics

Your shop, online, in 48 hours.
👉 Start FREE demo
```

#### Ad 6: Local Pride (Tamil)
```
Tiruppur businesses are going digital! 🚀

Join Anna's Bakery, Kumar Clinic, Style Salon -
எல்லாரும் GrowMaxx use பண்றாங்க.

உங்க கடையும் online-ல் கொண்டு வாங்க.
48 மணி நேரம். ₹499/மாதம்.

👉 FREE demo: [Link]
```

---

### 8-Week Content Calendar

| Week | Mon | Wed | Fri | Sat |
|------|-----|-----|-----|-----|
| **W1** | Launch post: "GrowMaxx is here!" | Feature: WhatsApp ordering explained | Client story: Bakery demo | Tip: Why your shop needs Google |
| **W2** | Behind-the-scenes: Building a site | Feature: Google Business benefits | Before/after: Salon client | Weekend offer post |
| **W3** | Testimonial video | Tip: 5 ways to get more customers | Feature: AI FAQ bot | Local business spotlight |
| **W4** | Milestone: 5 clients! | How-to: Take better product photos | Client success metrics | FAQ post |
| **W5** | New feature announcement | Industry tip: Bakery marketing | Client testimonial | Weekend engagement post |
| **W6** | Referral program launch | Feature deep-dive | Client case study | Community question |
| **W7** | Expansion to Coimbatore! | Local business tips | Success story | Poll: What features you want? |
| **W8** | Month recap + metrics | Educational content | Client spotlight | Thank you post |

**Content Types:**
- 🎥 Video (Reels/Stories): 2x/week
- 📸 Image posts: 3x/week
- 📝 Text/carousel: 2x/week
- 💬 Stories: Daily

---

## 6. OPERATIONAL SOPs

### Client Onboarding Checklist

```markdown
## NEW CLIENT ONBOARDING CHECKLIST
Client: _______________
Date: _______________
Plan: [ ] One-time  [ ] Basic  [ ] Growth

### PRE-ONBOARDING
- [ ] Lead converted to client in CRM
- [ ] Payment received (or payment link sent)
- [ ] Welcome WhatsApp message sent
- [ ] Onboarding call scheduled

### ASSET COLLECTION (Required)
- [ ] Business name (exact spelling)
- [ ] Owner name + phone
- [ ] Business address (full)
- [ ] Operating hours
- [ ] 5+ product/service photos (min 1080x1080)
- [ ] Logo (if available) or color preferences
- [ ] Menu/price list (PDF or text)
- [ ] WhatsApp Business number
- [ ] Google account (for GMB)

### OPTIONAL ASSETS
- [ ] Existing social media links
- [ ] Tagline/slogan
- [ ] Special offers/promotions
- [ ] FAQ list (5-10 questions)
- [ ] Owner photo
- [ ] Team photos
- [ ] Customer testimonials

### SITE BUILD
- [ ] Template selected
- [ ] Content written
- [ ] Images optimized & uploaded
- [ ] WhatsApp flow configured
- [ ] Contact form connected
- [ ] Mobile testing passed
- [ ] Desktop testing passed
- [ ] Analytics installed
- [ ] SEO meta tags added

### DEPLOYMENT
- [ ] Domain/subdomain configured
- [ ] SSL certificate active
- [ ] Site live at final URL
- [ ] Google Business Profile created
- [ ] GMB linked to website
- [ ] Owner walkthrough completed
- [ ] Feedback collected

### POST-LAUNCH
- [ ] 24-hour check-in call
- [ ] 7-day metrics review
- [ ] First month edit scheduled
- [ ] Testimonial request sent
```

---

### Mock Onboarding Form

```
═══════════════════════════════════════════════════════
          GROWMAXX CLIENT ONBOARDING FORM
═══════════════════════════════════════════════════════

SECTION 1: BUSINESS INFORMATION

Business Name*: _________________________________
Business Type*:  [ ] Bakery  [ ] Salon  [ ] Clinic
                 [ ] Tailor  [ ] Tuition  [ ] Boutique
                 [ ] Other: _____________

Owner Name*: ___________________________________
Phone (WhatsApp)*: _____________________________
Email: ________________________________________
Address*: _____________________________________
City*: ________________________________________
PIN Code: _____________________________________

Operating Hours*:
  Monday-Friday: _______ to _______
  Saturday: _______ to _______
  Sunday: [ ] Closed  [ ] Open: _______ to _______

───────────────────────────────────────────────────────
SECTION 2: BRANDING

Do you have a logo?  [ ] Yes  [ ] No

Primary Color Preference:
  [ ] Red/Pink  [ ] Blue  [ ] Green  [ ] Orange
  [ ] Purple    [ ] Custom: ____________

Tagline/Slogan (optional): ________________________

───────────────────────────────────────────────────────
SECTION 3: SERVICES/PRODUCTS

List your main services/products (up to 10):

1. Name: _______________ Price: ₹___________
2. Name: _______________ Price: ₹___________
3. Name: _______________ Price: ₹___________
4. Name: _______________ Price: ₹___________
5. Name: _______________ Price: ₹___________

Special offers/promotions: ________________________

───────────────────────────────────────────────────────
SECTION 4: PHOTOS

Please provide via WhatsApp:
[ ] Storefront photo
[ ] Interior photos (2-3)
[ ] Product/service photos (5+)
[ ] Owner/team photo
[ ] Logo file (PNG/JPG)

───────────────────────────────────────────────────────
SECTION 5: GOOGLE BUSINESS

Do you have Google Business Profile?  [ ] Yes  [ ] No

If Yes, provide login email: _____________________
If No, we will create one for you.

───────────────────────────────────────────────────────
SECTION 6: PREFERENCES

WhatsApp auto-reply message (optional):
"Hello! Thanks for contacting [Business Name]..."
__________________________________________________
__________________________________________________

FAQ questions your customers ask:
1. _______________________________________________
2. _______________________________________________
3. _______________________________________________

───────────────────────────────────────────────────────

Signature: ___________________ Date: _______________

═══════════════════════════════════════════════════════
```

---

### Dev Handoff Checklist

```markdown
## DEV HANDOFF CHECKLIST

Client ID: _______________
Priority: [ ] Standard (48hr)  [ ] Rush (24hr)

### ASSETS RECEIVED
- [ ] All required photos (optimized, named)
- [ ] Logo (or color palette confirmed)
- [ ] Content (menu, services, prices)
- [ ] Contact information verified
- [ ] Google account access

### BUILD INSTRUCTIONS
Template: [ ] Bakery  [ ] Salon  [ ] Clinic  [ ] Other
Primary Color: #___________
Accent Color: #___________

Content Doc: /clients/[client_id]/content.md
Assets Folder: /clients/[client_id]/assets/

### SPECIAL REQUIREMENTS
- [ ] Custom section needed: _______________
- [ ] Integration required: _______________
- [ ] Multiple locations: _______________
- [ ] Bilingual content (EN/TA): _______________

### QA REQUIREMENTS
- [ ] Mobile responsive (iPhone, Android)
- [ ] WhatsApp link works
- [ ] All images load < 2s
- [ ] Contact form submits correctly
- [ ] Google Maps embed works

### DEPLOYMENT TARGET
Subdomain: [client-name].growmaxx.com
OR Custom domain: _______________

ETA: _______________
Assigned to: _______________
```

---

### 48-Hour Deployment SOP

```bash
#!/bin/bash
# GrowMaxx 48-Hour Deployment SOP
# File: scripts/deploy-client.sh

# ═══════════════════════════════════════════════════════
# HOUR 0-2: SETUP & ASSET PREP
# ═══════════════════════════════════════════════════════

echo "🚀 Starting deployment for: $CLIENT_NAME"

# 1. Create client folder structure
mkdir -p clients/$CLIENT_ID/{assets,content,build}

# 2. Download and organize assets from WhatsApp/Drive
# Manual step: Save all photos to clients/$CLIENT_ID/assets/

# 3. Optimize images
cd clients/$CLIENT_ID/assets
for img in *.jpg *.png; do
  # Resize to max 1200px width, quality 80%
  convert "$img" -resize 1200x\> -quality 80 "optimized_$img"
done

# 4. Upload to CDN (Cloudinary)
# cloudinary upload optimized_* --folder=$CLIENT_ID

# ═══════════════════════════════════════════════════════
# HOUR 2-6: CONTENT & BUILD
# ═══════════════════════════════════════════════════════

# 5. Create content.json from onboarding form
cat > clients/$CLIENT_ID/content.json << EOF
{
  "business": {
    "name": "$BUSINESS_NAME",
    "tagline": "$TAGLINE",
    "phone": "$PHONE",
    "address": "$ADDRESS",
    "hours": "$HOURS"
  },
  "services": [...],
  "gallery": [...],
  "theme": {
    "primary": "$PRIMARY_COLOR",
    "accent": "$ACCENT_COLOR"
  }
}
EOF

# 6. Generate site from template
npm run generate -- --template=$TEMPLATE --config=clients/$CLIENT_ID/content.json

# 7. Build production bundle
npm run build -- --outDir=clients/$CLIENT_ID/build

# ═══════════════════════════════════════════════════════
# HOUR 6-12: QA & PREVIEW
# ═══════════════════════════════════════════════════════

# 8. Deploy to preview URL
vercel deploy clients/$CLIENT_ID/build --name=$CLIENT_ID-preview

# 9. Run automated tests
npm run test:e2e -- --url=https://$CLIENT_ID-preview.vercel.app

# 10. Manual QA checklist
echo "
QA CHECKLIST:
[ ] Mobile view (iPhone SE, iPhone 14)
[ ] Android view (Samsung Galaxy)
[ ] Desktop view (1920x1080)
[ ] WhatsApp button → Opens correct chat
[ ] Contact form → Submits to CRM
[ ] All images load
[ ] Google Maps works
[ ] Page speed < 3s
"

# 11. Send preview to client
# WhatsApp: "உங்க website preview ready! பாருங்க: [preview_url]"

# ═══════════════════════════════════════════════════════
# HOUR 12-24: CLIENT REVIEW & REVISIONS
# ═══════════════════════════════════════════════════════

# 12. Collect feedback via WhatsApp
# 13. Make revisions (max 2 rounds)
# 14. Get final approval

# ═══════════════════════════════════════════════════════
# HOUR 24-36: PRODUCTION DEPLOYMENT
# ═══════════════════════════════════════════════════════

# 15. Deploy to production URL
vercel deploy clients/$CLIENT_ID/build --prod --name=$CLIENT_ID

# 16. Configure custom domain (if applicable)
vercel domains add $CUSTOM_DOMAIN --project=$CLIENT_ID

# 17. SSL auto-configured by Vercel

# ═══════════════════════════════════════════════════════
# HOUR 36-48: GOOGLE BUSINESS & HANDOFF
# ═══════════════════════════════════════════════════════

# 18. Create/claim Google Business Profile
# Manual: Use client's Google account

# 19. Add website to GMB
# Manual: GMB Dashboard → Info → Website

# 20. Configure analytics
# GA4 property already in template, verify data flowing

# 21. Client walkthrough call (15 min)
echo "
WALKTHROUGH AGENDA:
1. Show live site
2. Demonstrate WhatsApp flow
3. Show Google Business listing
4. Explain analytics basics
5. Confirm monthly edit process
6. Collect testimonial
"

# 22. Update CRM status
# Status: deployed → active

# 23. Schedule 7-day follow-up
# Add calendar reminder

echo "✅ Deployment complete for $CLIENT_NAME!"
```

---

## 7. PRICING & BILLING

### Pricing Tiers (Final)

| Plan | Price | Billing | Includes |
|------|-------|---------|----------|
| **One-Time E2E** | ₹14,999 | One-time | 5-page website, brand kit, Google setup, 30-day support, 3 revisions |
| **Basic** | ₹499/mo | Monthly | Landing page, hosting, WhatsApp CTA, 1 edit/month, GA4 |
| **Growth** | ₹999/mo | Monthly | Everything in Basic + AI FAQ bot, booking system, priority support, monthly report |

**Add-ons:**
- Extra pages: ₹500/page
- Logo design: ₹999
- Rush delivery (24hr): ₹500
- Custom domain setup: ₹299 (one-time)

---

### Invoice Template

```
═══════════════════════════════════════════════════════
                    GROWMAXX
              Digital Growth for Local Business
═══════════════════════════════════════════════════════

INVOICE

Invoice #: INV-2025-001
Date: December 7, 2025
Due Date: December 14, 2025

───────────────────────────────────────────────────────
BILL TO:
[Client Business Name]
[Owner Name]
[Address]
Phone: [WhatsApp Number]
───────────────────────────────────────────────────────

DESCRIPTION                              AMOUNT (₹)
───────────────────────────────────────────────────────
Basic Plan - Monthly Subscription            499.00
  → Professional landing page
  → Hosting & SSL
  → WhatsApp CTA integration
  → 1 content edit included
  → Google Analytics tracking

───────────────────────────────────────────────────────
                              SUBTOTAL:      499.00
                              GST (18%):      89.82
                              ─────────────────────
                              TOTAL:         588.82
───────────────────────────────────────────────────────

PAYMENT OPTIONS:

1. UPI: growmaxx@upi
   (Scan QR code attached)

2. Bank Transfer:
   Account Name: [Your Name / Business]
   Account #: XXXXXXXXXXXX
   IFSC: XXXXXXX
   Bank: [Bank Name]

3. Razorpay Link:
   https://rzp.io/l/growmaxx-pay

───────────────────────────────────────────────────────
NOTES:
- Payment due within 7 days
- Late payment may result in service pause
- For queries: WhatsApp +91-XXXXXXXXXX

Thank you for choosing GrowMaxx! 🙏
───────────────────────────────────────────────────────
GSTIN: [Your GST Number]
PAN: [Your PAN]
═══════════════════════════════════════════════════════
```

---

### Payment Routes

| Method | Setup | Pros | Cons |
|--------|-------|------|------|
| **UPI** | Create UPI ID (growmaxx@upi) | Instant, free, familiar | Manual tracking |
| **Bank Transfer** | Share account details | Works for larger amounts | Manual reconciliation |
| **Razorpay Payment Links** | razorpay.com/payment-links | Automated, professional | 2% fee |
| **Razorpay Subscriptions** | razorpay.com/subscriptions | Auto-debit monthly | 2% fee, needs mandate |

**Recommended Flow:**
1. One-time payments: UPI / Bank Transfer
2. Monthly subscriptions: Start with payment links, move to auto-debit after 2 months

---

### Razorpay Setup Steps

```
1. Sign up at dashboard.razorpay.com
2. Complete KYC (PAN, bank details)
3. Generate API keys (Settings → API Keys)
4. Create Payment Links:
   - Products → Payment Links → Create
   - Set amount: ₹499 (Basic) / ₹999 (Growth)
   - Enable partial payments: No
   - Expiry: 7 days
   
5. For Subscriptions:
   - Products → Subscriptions → Plans
   - Create "Basic" plan: ₹499/month
   - Create "Growth" plan: ₹999/month
   - Share subscription link with client
   - Client completes UPI mandate
   - Auto-debit happens monthly
```

---

### Churn Mitigation Steps

| Trigger | Detection | Action |
|---------|-----------|--------|
| **Payment failed** | Razorpay webhook | Day 0: Auto WhatsApp reminder, Day 3: Call, Day 7: Pause site |
| **No engagement** | GA4: 0 visits in 2 weeks | Call to understand, offer help, share tips |
| **Edit request backlog** | CRM: pending > 7 days | Prioritize and complete, apologize |
| **Competitor mention** | Sales call notes | Offer free upgrade/discount |
| **Price complaint** | Support message | Explain value, offer annual discount (2 months free) |
| **Tech frustration** | Support message | Free training call, simplified docs |

**Retention Playbook:**
1. **Day 7:** Check-in call - "How's it going?"
2. **Day 30:** First metrics report - show value
3. **Day 60:** Testimonial request + referral offer
4. **Day 90:** Upgrade pitch (Basic → Growth)
5. **Monthly:** Newsletter with tips + new features

---

## 8. KPI DASHBOARD

### Key Performance Indicators

| KPI | Definition | Target (Week 8) | Formula |
|-----|------------|-----------------|---------|
| **Leads Generated** | Total form submissions + WhatsApp inquiries | 100 | Count |
| **MQL (Marketing Qualified)** | Leads with valid contact + interest confirmed | 60 | Leads × 60% |
| **SQL (Sales Qualified)** | Leads after discovery call | 30 | MQL × 50% |
| **Demos Delivered** | Free demos created | 25 | Count |
| **Conversion Rate** | SQL → Paid | 80% | Paid / SQL |
| **Paying Clients** | Active subscriptions | 25 | Count |
| **MRR** | Monthly Recurring Revenue | ₹15,000 | Sum(monthly plans) |
| **ARPU** | Average Revenue Per User | ₹600 | MRR / Clients |
| **Churn Rate** | Monthly cancellations | < 5% | Churned / Total |
| **NPS** | Net Promoter Score | > 50 | Survey |
| **CAC** | Customer Acquisition Cost | < ₹200 | Marketing spend / New clients |
| **LTV** | Lifetime Value (6 months) | ₹3,000 | ARPU × 6 × (1 - churn) |

---

### Google Sheets Dashboard Layout

**Sheet: `Dashboard`**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  A           │  B          │  C          │  D          │  E          │  F  │
├─────────────────────────────────────────────────────────────────────────────┤
│  METRIC      │  WEEK 1     │  WEEK 2     │  WEEK 3     │  WEEK 4     │ ... │
├─────────────────────────────────────────────────────────────────────────────┤
│  Leads       │  =Leads!W1  │  =Leads!W2  │  ...        │             │     │
│  MQL         │  =B2*0.6    │  =C2*0.6    │             │             │     │
│  SQL         │  =B3*0.5    │  =C3*0.5    │             │             │     │
│  Demos       │  [manual]   │             │             │             │     │
│  Conversions │  [manual]   │             │             │             │     │
│  Clients     │  =SUM(B6:B) │             │             │             │     │
│  MRR         │  =SUMIF()   │             │             │             │     │
│  Churn       │  =churned/B7│             │             │             │     │
│  CAC         │  =spend/B6  │             │             │             │     │
├─────────────────────────────────────────────────────────────────────────────┤
│  FUNNEL CONVERSION RATES                                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│  Lead→MQL    │  =B3/B2     │  60%        │             │             │     │
│  MQL→SQL     │  =B4/B3     │  50%        │             │             │     │
│  SQL→Demo    │  =B5/B4     │  83%        │             │             │     │
│  Demo→Paid   │  =B6/B5     │  80%        │             │             │     │
│  Overall     │  =B6/B2     │  20%        │             │             │     │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Key Formulas:**

```
// MRR Calculation
=SUMIF(Clients!F:F, "basic", 499) + SUMIF(Clients!F:F, "growth", 999)

// Churn Rate
=COUNTIF(Clients!M:M, "churned") / COUNTIF(Clients!M:M, "<>")

// CAC
=Marketing!B:B / COUNTIF(Clients!B:B, ">=" & DATE_RANGE)

// LTV (simplified)
=AVERAGE(Clients!G:G) * 6 * (1 - churn_rate)

// Conversion Rate
=COUNTIF(Clients!K:K, "paid") / COUNTIF(Leads!K:K, "demo_sent")
```

---

### 6-Week Targets

| Week | Leads | MQL | SQL | Demos | Clients | MRR |
|------|-------|-----|-----|-------|---------|-----|
| 1 | 10 | 6 | 3 | 2 | 0 | ₹0 |
| 2 | 15 | 9 | 5 | 4 | 2 | ₹998 |
| 3 | 25 | 15 | 8 | 6 | 5 | ₹2,995 |
| 4 | 30 | 18 | 10 | 8 | 10 | ₹5,990 |
| 5 | 35 | 21 | 12 | 10 | 15 | ₹8,985 |
| 6 | 40 | 24 | 14 | 12 | 20 | ₹12,980 |

---

## 9. INVESTOR PITCH OUTLINE (6 Slides)

### Slide 1: Problem
**Title:** "Local Shops Are Invisible Online"

- 90% of SMBs in tier-2/3 cities have no web presence
- Customers search Google/WhatsApp first — if you're not there, you lose
- Existing solutions (Wix, agencies) are too expensive or complex for ₹50k/month shops

### Slide 2: Solution
**Title:** "GrowMaxx: 48-Hour Digital Presence for Every Shop"

- Professional landing page + WhatsApp ordering in 48 hours
- Zero technical knowledge required from shop owner
- Starting at just ₹499/month — affordable for any business

### Slide 3: Market
**Title:** "₹50,000 Cr Opportunity in Bharat's Main Streets"

- 63 million MSMEs in India, <10% digitized
- Tamil Nadu alone: 4.8 million MSMEs
- Target: 50 cities, 10,000 clients in 3 years = ₹72 Cr ARR potential

### Slide 4: Traction
**Title:** "Early Proof in Tiruppur"

- [X] clients onboarded in [X] weeks
- ₹[X] MRR, growing [X]% week-over-week
- [X]% client retention, NPS [X]
- Testimonial: "WhatsApp orders tripled" - Anna's Bakery

### Slide 5: Business Model
**Title:** "Scalable, Recurring Revenue"

- Unit economics: CAC ₹200, LTV ₹3,000+ (15x)
- 80% gross margin on subscription plans
- Expansion revenue: Basic → Growth upgrades, add-ons
- Clear path to ₹1 Cr ARR in 18 months

### Slide 6: Ask
**Title:** "Join Us in Digitizing Bharat"

- Raising: ₹25 lakhs seed round
- Use of funds: Team (sales + dev), marketing, 10-city expansion
- Offer: [X]% equity, SAFE note
- Contact: [founder@growmaxx.com] | [WhatsApp]

---

## 10. RISK MATRIX & MITIGATION

| # | Risk | Probability | Impact | Mitigation |
|---|------|-------------|--------|------------|
| 1 | **Technical: Site downtime** | Medium | High | Use Vercel/Netlify (99.99% uptime), monitor with UptimeRobot, have backup deployment ready |
| 2 | **Technical: WhatsApp API limits** | Low | Medium | Use wa.me links (no API needed initially), upgrade to official API at scale |
| 3 | **Legal: GST compliance** | Medium | Medium | Register for GST before ₹20L revenue, use Zoho Invoice for compliance |
| 4 | **Legal: Client content liability** | Low | High | Terms of service stating client owns content, no illegal content clause |
| 5 | **Market: Low demand/awareness** | Medium | High | Heavy ground sales initially, build case studies, offer free demos |
| 6 | **Market: Price sensitivity** | High | Medium | Anchor on value (ROI), offer flexible payment, annual discount |
| 7 | **Operational: Founder burnout** | High | Critical | Strict SOP automation, hire help at 20 clients, batch similar tasks |
| 8 | **Competition: Agencies undercut** | Medium | Medium | Differentiate on speed (48hr), focus on SMB segment agencies ignore |

### Detailed Mitigation Plans

**Risk 1: Site Downtime**
```
Prevention:
- Use Vercel with automatic failover
- All sites are static (no server dependency)
- CDN caching for all assets

Response Plan:
1. UptimeRobot alerts via SMS within 1 minute
2. Check Vercel status page
3. If Vercel issue: Communicate to clients via WhatsApp
4. If code issue: Rollback to previous deployment
5. RCA and fix within 4 hours
```

**Risk 5: Low Demand**
```
Prevention:
- Lead with free demos (no risk for client)
- Strong social proof (testimonials, numbers)
- Ground presence (door-to-door builds trust)

Response Plan:
1. Week 3 check: If < 3 paying clients
2. Double down on door-to-door (40 visits/week)
3. Offer first month free for next 5 clients
4. Partner with local business association
5. Consider pivoting pricing/features based on feedback
```

**Risk 7: Founder Burnout**
```
Prevention:
- Batch tasks: All sales Mon-Wed, delivery Thu-Sat
- Template everything (scripts, sites, emails)
- Set hard stop: No work after 9 PM

Response Plan:
1. At 15 clients: Hire part-time sales (commission only)
2. At 25 clients: Hire part-time dev/support
3. Revenue > ₹50k/month: Consider full-time hire
4. Take 1 full day off per week (Sunday)
```

---

## 11. NOTION/ASANA TASK BOARD

### Export as Markdown

```markdown
# GROWMAXX PROJECT BOARD

## 🎯 ACTIVE SPRINT (Week 1-2)

### To Do
- [ ] Set up GitHub repository with folder structure
- [ ] Configure Vercel deployment pipeline
- [ ] Design Bakery template in code
- [ ] Design Salon template in code
- [ ] Design Clinic template in code
- [ ] Create WhatsApp Business account
- [ ] Configure auto-reply messages
- [ ] Set up Google Sheets CRM
- [ ] Create lead capture API endpoint
- [ ] Install GA4 on all templates
- [ ] Create Razorpay account
- [ ] Generate payment links for each tier
- [ ] Write door-to-door sales script (Tamil)
- [ ] Write door-to-door sales script (English)
- [ ] Create WhatsApp message templates
- [ ] Design pitch deck (6 slides)
- [ ] Print 50 business cards
- [ ] Create demo video (2 min)

### In Progress
- [ ] Build landing page for GrowMaxx website
- [ ] Write onboarding SOP document

### Done
- [x] Define pricing tiers
- [x] Create GTM plan document
- [x] Define technical architecture

---

## 📋 BACKLOG

### Sales & Marketing
- [ ] Identify 20 local WhatsApp business groups
- [ ] Create social media accounts (FB, Insta)
- [ ] Design 6 ad creatives
- [ ] Write 8-week content calendar
- [ ] Create referral program landing page
- [ ] Partner outreach to business associations
- [ ] College campus ambassador program

### Product
- [ ] AI FAQ bot integration
- [ ] Booking system for Growth tier
- [ ] Multi-language support (Tamil toggle)
- [ ] Client dashboard for self-edits
- [ ] Monthly analytics email automation
- [ ] Template library expansion (Tuition, Boutique, Tailor)

### Operations
- [ ] Legal: Terms of Service document
- [ ] Legal: Privacy Policy
- [ ] Legal: GST registration
- [ ] Create client feedback survey
- [ ] Automate invoice generation
- [ ] Automate monthly reports
- [ ] Hire: Part-time sales (commission)
- [ ] Hire: Part-time support

---

## 🏆 MILESTONES

### Week 2: MVP Launch
- [ ] All templates functional
- [ ] 5 internal demo sites live
- [ ] Sales collateral ready
- [ ] Payment system working

### Week 4: First 5 Clients
- [ ] 5 paying clients active
- [ ] All sites deployed
- [ ] Google Business setup complete
- [ ] First testimonial collected

### Week 8: Scale Ready
- [ ] 25 active clients
- [ ] ₹15,000 MRR
- [ ] Coimbatore pilot started
- [ ] Investor deck ready

### Month 6: 50 Clients
- [ ] 50 active clients
- [ ] ₹40,000+ MRR
- [ ] Chennai expansion
- [ ] Team of 3

---

## 📊 WEEKLY TRACKING

### Week 1 (Dec 7-13)
| Metric | Target | Actual |
|--------|--------|--------|
| Shops visited | 20 | |
| Demos created | 5 | |
| Leads collected | 10 | |

### Week 2 (Dec 14-20)
| Metric | Target | Actual |
|--------|--------|--------|
| Shops visited | 25 | |
| Demos delivered | 8 | |
| Conversions | 3 | |

---

## 🔄 RECURRING TASKS

### Daily
- [ ] Check WhatsApp messages (9 AM, 1 PM, 6 PM)
- [ ] Update CRM with new leads
- [ ] Post 1 story on Instagram

### Weekly
- [ ] Review KPI dashboard (Monday)
- [ ] Plan sales visits (Monday)
- [ ] Content batch creation (Wednesday)
- [ ] Client check-in calls (Friday)
- [ ] Week review & planning (Sunday)

### Monthly
- [ ] Send analytics reports to all clients
- [ ] Invoice generation & follow-up
- [ ] Churn analysis
- [ ] Feature roadmap review
- [ ] Team sync (if applicable)

---

## 📁 RESOURCES

### Documents
- GTM Plan: `/docs/GTM-PLAN-GROWMAXX.md`
- Sales Scripts: `/docs/sales-playbook.md`
- Onboarding SOP: `/docs/onboarding-sop.md`
- Technical Spec: `/docs/tech-spec.md`

### Links
- CRM: [Google Sheets Link]
- Analytics: [GA4 Dashboard]
- Payments: [Razorpay Dashboard]
- Hosting: [Vercel Dashboard]

### Contacts
- Founder: [Phone/Email]
- Razorpay Support: support@razorpay.com
- Vercel Support: support@vercel.com
```

---

## APPENDIX: QUICK REFERENCE

### Emergency Contacts
- Vercel Status: status.vercel.com
- Razorpay Status: status.razorpay.com
- WhatsApp Business: business.whatsapp.com/support

### Key URLs
- GrowMaxx Website: growmaxx.com
- Preview Sites: preview.growmaxx.com/[client-id]
- Client Sites: [client].growmaxx.com

### Important Dates
- MVP Launch: December 20, 2025
- Pilot Complete: January 3, 2026
- 25 Clients Target: January 31, 2026
- 50 Clients Target: June 7, 2026

---

*Document Version: 1.0*
*Last Updated: December 7, 2025*
*Owner: Founder*

---

**🚀 LET'S BUILD GROWMAXX!**



