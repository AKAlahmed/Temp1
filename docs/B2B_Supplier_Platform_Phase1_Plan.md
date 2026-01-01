# 📋 Phase 1: Complete Implementation Plan
## B2B Supplier Profile Platform

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [User Flow & Journey Mapping](#2-user-flow--journey-mapping)
3. [Landing Page Planning](#3-landing-page-planning)
4. [Profile System Architecture](#4-profile-system-architecture)
5. [Profile Setup Wizard](#5-profile-setup-wizard)
6. [Dashboard Planning](#6-dashboard-planning)
7. [Profile Management (Editor)](#7-profile-management-editor)
8. [Products Management](#8-products-management)
9. [Rating & Comments System](#9-rating--comments-system)
10. [Public Profile Page](#10-public-profile-page)
11. [Subscription & Payment (Tap Integration)](#11-subscription--payment-tap-integration)
12. [Email Notifications](#12-email-notifications)
13. [Database Schema (PostgreSQL)](#13-database-schema-postgresql)
14. [Complete Folder Structure](#14-complete-folder-structure)
15. [Implementation Order](#15-implementation-order)
16. [Final Checklist Before Launch](#16-final-checklist-before-launch)

---

## 1. Project Overview

### 1.1 What We're Building
A B2B platform that allows suppliers to create professional profile pages to showcase their business.  The profile acts as a digital business card that suppliers can share with potential clients.

### 1.2 Core Features (Phase 1)
- ✅ Landing page with value proposition
- ✅ Supplier profile creation and management
- ✅ Product catalog display
- ✅ Rating and comments from other users
- ✅ Subscription system (monthly/yearly)
- ✅ Tap payment integration
- ✅ Email notifications

### 1.3 Tech Stack
| Component | Technology |
|-----------|------------|
| Framework | Next.js |
| Database | PostgreSQL |
| Payment | Tap Payment |
| Email | (TBD - Resend, SendGrid, or similar) |

### 1.4 Business Rules
- Profile is visible but NOT shareable until subscribed
- Profile becomes invisible immediately when subscription expires
- Two subscription options: Monthly and Yearly
- Only logged-in platform users can leave reviews
- Unlimited products for Phase 1 subscription

---

## 2. User Flow & Journey Mapping

### 2.1 User States
Your system will track 3 user states: 

| State | Description | Access Level |
|-------|-------------|--------------|
| **State A** | Registered, profile NOT completed | Setup Wizard only |
| **State B** | Profile completed, NOT subscribed | Dashboard (limited), Profile visible to self only |
| **State C** | Profile completed AND subscribed | Full access, Profile shareable |

### 2.2 Post-Login Redirect Logic

```
┌─────────────────┐
│   User Logs In  │
└────────┬────────┘
         │
         ▼
┌─────────────────────┐
│ Check Profile Status │
└────────┬────────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
Profile    Profile
Incomplete  Complete
    │         │
    ▼         │
┌──────────┐  │
│  Setup   │  │
│  Wizard  │  │
└──────────┘  │
              ▼
       ┌──────────────┐
       │  Dashboard   │
       │ (State B/C)  │
       └──────────────┘
```

### 2.3 Complete User Journeys

**New User Journey:**
```
Landing Page → Register → Email Verification → Login → 
Profile Setup Wizard → Dashboard (State B) → 
View Subscription Plans → Subscribe via Tap → 
Payment Success → Dashboard (State C) → Share Profile
```

**Returning User (Not Subscribed):**
```
Login → Dashboard (State B) → See Upgrade Banner → 
Can Edit Profile → Cannot Share Link
```

**Returning User (Subscribed):**
```
Login → Dashboard (State C) → Full Access → 
Share Profile Link → View Analytics
```

**Subscription Expired User:**
```
Login → Dashboard (State B) → 
See "Subscription Expired" Banner → 
Profile Invisible to Public → Renew Subscription
```

### 2.4 Access Control Matrix

| Page/Feature | State A | State B | State C |
|--------------|---------|---------|---------|
| Setup Wizard | ✅ | ❌ | ❌ |
| Dashboard | ❌ | ✅ | ✅ |
| Profile Editor | ❌ | ✅ | ✅ |
| Products Management | ❌ | ✅ | ✅ |
| View Own Profile | ❌ | ✅ (Preview) | ✅ |
| Share Profile Link | ❌ | ❌ | ✅ |
| Profile Visible to Public | ❌ | ❌ | ✅ |
| View Reviews | ❌ | ✅ | ✅ |
| Receive Reviews | ❌ | ❌ | ✅ |

---

## 3. Landing Page Planning

### 3.1 Page Structure Overview

```
┌─────────────────────────────────────────────────────┐
│                    NAVIGATION                        │
│  Logo    Features  Pricing  FAQ    [Login] [SignUp] │
├─────────────────────────────────────────────────────┤
│                                                     │
│                  HERO SECTION                       │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│              PROBLEM & SOLUTION                     │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│               FEATURES SHOWCASE                     │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│                HOW IT WORKS                         │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│              PROFILE DEMO/PREVIEW                   │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│                   PRICING                           │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│                     FAQ                             │
│                                                     │
├─────────────────────────────────────────────────────┤
│                    FOOTER                           │
└─────────────────────────────────────────────────────┘
```

### 3.2 Section Details

#### Section 1: Navigation Bar
**Elements:**
- Logo (left)
- Navigation links (center): Features, Pricing, FAQ
- Auth buttons (right): Login, Sign Up (primary)
- Mobile:  Hamburger menu

**Behavior:**
- Sticky on scroll
- Transparent on hero, solid background when scrolled

---

#### Section 2: Hero Section
**Elements:**
- **Headline:** "Showcase Your Business Professionally"
- **Sub-headline:** "Create a stunning digital profile for your business.  Share one link with all your clients."
- **Primary CTA:** "Get Started Free" → Goes to Register
- **Secondary CTA:** "See Demo Profile" → Opens sample profile
- **Hero Image:** Illustration or mockup of a profile page

**Layout:**
```
┌─────────────────────────────────────────────┐
│  ┌──────────────────┐  ┌─────────────────┐  │
│  │                  │  │                 │  │
│  │  Headline        │  │   Hero Image    │  │
│  │  Sub-headline    │  │   or Mockup     │  │
│  │                  │  │                 │  │
│  │  [CTA] [CTA]     │  │                 │  │
│  │                  │  │                 │  │
│  └──────────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────┘
```

---

#### Section 3: Problem & Solution
**Purpose:** Address pain points and show how you solve them

**Content Structure:**
| Problem | Solution |
|---------|----------|
| "Sharing business info is messy - PDFs, multiple links, outdated brochures" | "One beautiful profile page with everything" |
| "No professional online presence without expensive websites" | "Professional profile in minutes, no technical skills needed" |
| "Hard to showcase products to potential clients" | "Built-in product catalog with images and prices" |
| "No way to collect and display client feedback" | "Integrated rating and review system" |

**Layout:** 2-column grid or alternating left-right sections

---

#### Section 4: Features Showcase
**Features to Display:**

1. **Professional Profile Pages**
   - Icon:  User/Profile icon
   - Description: "Create a stunning business profile with your logo, cover image, and company information"
   - Visual: Screenshot of profile header

2. **Product Catalog**
   - Icon: Grid/Products icon
   - Description: "Showcase your products with images, descriptions, and pricing"
   - Visual: Screenshot of products section

3. **Ratings & Reviews**
   - Icon:  Star icon
   - Description: "Build trust with authentic reviews from your business partners"
   - Visual: Screenshot of reviews section

4. **Contact Integration**
   - Icon: Phone/Contact icon
   - Description: "Make it easy for clients to reach you - phone, email, WhatsApp, location"
   - Visual: Screenshot of contact section

5. **One Link to Share**
   - Icon: Link/Share icon
   - Description: "Share your profile anywhere - WhatsApp, email, social media, business cards"
   - Visual:  Mockup of sharing

**Layout:** 3-column grid (2 columns on tablet, 1 on mobile)

---

#### Section 5: How It Works
**Steps:**

```
    ┌─────────┐      ┌─────────┐      ┌─────────┐
    │    1    │      │    2    │      │    3    │
    │  ┌───┐  │      │  ┌───┐  │      │  ┌───┐  │
    │  │ 📝 │  │ ──▶  │  │ ✨ │  │ ──▶  │  │ 🚀 │  │
    │  └───┘  │      │  └───┘  │      │  └───┘  │
    │ Create  │      │  Build  │      │  Share  │
    │ Account │      │ Profile │      │  Link   │
    └─────────┘      └─────────┘      └─────────┘
```

1. **Create Account**
   - "Sign up in seconds with just your email"

2. **Build Your Profile**
   - "Add your business info, products, and contact details"

3. **Subscribe & Share**
   - "Choose a plan and start sharing your profile link"

---

#### Section 6: Profile Demo/Preview
**Purpose:** Show exactly what they'll get

**Options:**
- **Option A:** Embed an actual demo profile (interactive)
- **Option B:** Video walkthrough of a profile
- **Option C:** Image carousel showing different profile sections

**Recommendation:** Option A - Create a sample profile and embed it in an iframe or show screenshots with a "View Full Demo" button

---

#### Section 7: Pricing Section
**Layout:**

```
┌─────────────────────────────────────────────────┐
│              Choose Your Plan                    │
│                                                 │
│  ┌───────────────────┐  ┌───────────────────┐  │
│  │     MONTHLY       │  │      YEARLY       │  │
│  │                   │  │    ⭐ POPULAR      │  │
│  │    $XX/month      │  │    $XX/year       │  │
│  │                   │  │   (Save XX%)      │  │
│  │  ✓ Feature 1      │  │  ✓ Feature 1      │  │
│  │  ✓ Feature 2      │  │  ✓ Feature 2      │  │
│  │  ✓ Feature 3      │  │  ✓ Feature 3      │  │
│  │  ✓ Feature 4      │  │  ✓ Feature 4      │  │
│  │                   │  │                   │  │
│  │  [Get Started]    │  │  [Get Started]    │  │
│  │                   │  │                   │  │
│  └───────────────────┘  └───────────────────┘  │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Features to List:**
- ✓ Professional profile page
- ✓ Unlimited products
- ✓ Ratings & reviews
- ✓ Contact information display
- ✓ Shareable profile link
- ✓ Profile analytics (views count)

---

#### Section 8: FAQ Section
**Questions to Include:**

1. **What is [Your Platform Name]?**
   - Brief explanation of the service

2. **How does the profile work?**
   - Explain the profile creation and sharing process

3. **Who can see my profile?**
   - Explain visibility (only after subscription)

4. **What payment methods do you accept?**
   - Mention Tap payment options (cards, etc.)

5. **What happens when my subscription ends?**
   - Profile becomes invisible immediately
   - Can renew anytime to restore visibility

6. **Can I change my profile after publishing?**
   - Yes, edit anytime from dashboard

7. **How do ratings and reviews work?**
   - Other platform users can review your business

**Layout:** Accordion style (click to expand)

---

#### Section 9: Footer
**Elements:**
- **Column 1:** Logo + short description
- **Column 2:** Quick Links (Features, Pricing, FAQ)
- **Column 3:** Legal (Privacy Policy, Terms of Service)
- **Column 4:** Contact (Email, Social Media)
- **Bottom:** Copyright © 2025 [Your Company]

---

### 3.3 Landing Page Files

```
/app/(marketing)/
├── page.tsx                    # Landing page
├── layout.tsx                  # Marketing layout
└── demo/
    └── page.tsx               # Demo profile page

/components/landing/
├── Navbar.tsx
├── HeroSection.tsx
├── ProblemSolution.tsx
├── FeaturesSection.tsx
├── HowItWorks.tsx
├── ProfileDemo.tsx
├── PricingSection.tsx
├── FAQSection.tsx
└── Footer.tsx
```

---

## 4. Profile System Architecture

### 4.1 Profile Data Structure

#### Basic Information
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| business_name | string | Yes | Company/Business name |
| slug | string | Yes | URL-friendly unique identifier |
| logo_url | string | Yes | Business logo image |
| cover_url | string | No | Header/cover image |
| tagline | string | No | Short description (max 150 chars) |
| category | string | Yes | Business category/industry |
| location_city | string | Yes | City |
| location_country | string | Yes | Country |
| establishment_year | integer | No | Year founded |

#### About Us Section
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| description | text | Yes | Full business description (rich text) |
| mission | text | No | Mission statement |
| vision | text | No | Vision statement |
| certifications | json | No | Array of certifications/achievements |

#### Contact Information
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| email | string | Yes | Contact email |
| phone | string | Yes | Phone number |
| whatsapp | string | No | WhatsApp number |
| website | string | No | External website URL |
| address | text | No | Physical address |
| working_hours | json | No | Working hours by day |
| social_links | json | No | Social media links |

### 4.2 Profile States

```
┌─────────────┐
│    DRAFT    │ ──── Profile being created
└──────┬──────┘
       │ User completes setup wizard
       ▼
┌─────────────┐
│  PUBLISHED  │ ──── Profile complete, not subscribed
└──────┬──────┘      (Visible only to owner)
       │ User subscribes
       ▼
┌─────────────┐
│   ACTIVE    │ ──── Profile live and shareable
└──────┬──────┘
       │ Subscription expires
       ▼
┌─────────────┐
│   EXPIRED   │ ──── Back to invisible
└─────────────┘      (Can resubscribe to reactivate)
```

### 4.3 Profile URL Structure

**Format:**
```
https://yourdomain.com/profile/[business-slug]
```

**Examples:**
```
https://yourdomain.com/profile/al-ahmed-trading
https://yourdomain.com/profile/gulf-electronics
https://yourdomain.com/profile/modern-furniture-co
```

**Slug Rules:**
- Generated from business name
- Lowercase only
- Spaces replaced with hyphens
- Special characters removed
- Must be unique (add number if duplicate)

**Slug Generation Examples:**
| Business Name | Generated Slug |
|---------------|----------------|
| Al Ahmed Trading | al-ahmed-trading |
| Gulf Electronics LLC | gulf-electronics-llc |
| Modern Furniture Co.  | modern-furniture-co |
| ABC & Sons | abc-sons |

---

## 5. Profile Setup Wizard

### 5.1 Purpose
Guide new users through profile creation step-by-step to reduce overwhelm and increase completion rates.

### 5.2 Wizard Flow

```
┌─────────────────────────────────────────────────────────┐
│  Step 1    Step 2    Step 3    Step 4    Step 5        │
│   [●]───────[○]───────[○]───────[○]───────[○]          │
│  Basic     About    Contact   Products   Preview       │
└─────────────────────────────────────────────────────────┘
```

### 5.3 Step Details

#### Step 1: Basic Information
**Title:** "Let's start with the basics"

**Fields:**
- Business Name* (text input)
- Logo* (image upload with preview)
- Business Category* (dropdown/select)
- Location - City* (text input)
- Location - Country* (dropdown)
- Establishment Year (number input, optional)

**Validation:**
- Business name: 2-100 characters
- Logo: Required, max 2MB, jpg/png
- Category: Must select one
- City & Country: Required

**UI Notes:**
- Show logo preview after upload
- Auto-generate slug from business name (show preview)

---

#### Step 2: About Your Business
**Title:** "Tell us about your business"

**Fields:**
- Cover Image (image upload, optional but encouraged)
- Tagline (text input, max 150 chars)
- Full Description* (rich text editor)
- Mission Statement (text area, optional)
- Vision Statement (text area, optional)

**Validation:**
- Description:  Minimum 100 characters
- Cover image: Max 5MB, recommended 1920x400px

**UI Notes:**
- Show character count for tagline
- Rich text editor with basic formatting (bold, italic, lists)
- Cover image preview with aspect ratio guide

---

#### Step 3: Contact Information
**Title:** "How can clients reach you?"

**Fields:**
- Contact Email* (email input)
- Phone Number* (tel input with country code)
- WhatsApp Number (tel input, optional)
- Website URL (url input, optional)
- Physical Address (text area, optional)
- Working Hours (structured input, optional)
- Social Media Links (optional)
  - Facebook
  - Instagram
  - LinkedIn
  - Twitter/X

**Validation:**
- Email: Valid email format
- Phone: Valid phone format
- Website: Valid URL format
- Social links: Valid URLs

**UI Notes:**
- Pre-fill WhatsApp with phone number
- Working hours:  Dropdown for each day (Open/Closed + times)

---

#### Step 4: Add Your First Product
**Title:** "Showcase your products"

**Message:** "Add at least one product to make your profile more attractive.  You can add more later."

**Fields (for one product):**
- Product Name* (text input)
- Product Image* (image upload)
- Description* (text area)
- Price* (number input)
- Price Unit* (dropdown:  per piece, per kg, per box, etc.)
- Category (text input)
- Availability (toggle:  In Stock / Out of Stock)

**Actions:**
- "Add Product" button
- "Skip for now" link (allowed but discouraged)
- If product added: "Add Another Product" option

**Validation:**
- If adding product, all required fields must be filled
- Skip allowed without adding products

---

#### Step 5: Preview & Publish
**Title:** "Your profile is ready!"

**Content:**
- Full preview of the profile as it will appear
- All sections visible (About, Products, Contact)
- Checklist of completed items: 
  - ✅ Basic information
  - ✅ About section
  - ✅ Contact information
  - ⚠️ Products (0 added) - warning if skipped
  - ⚠️ Cover image (not added) - warning if skipped

**Actions:**
- "Publish Profile" button (primary)
- "Go Back and Edit" button (secondary)

**After Publish:**
- Redirect to Dashboard
- Show success message
- Show prompt to subscribe

---

### 5.4 Wizard Behavior Rules

1. **Progress Saving:**
   - Auto-save after each step completion
   - User can close browser and continue later
   - Save current step in database

2. **Navigation:**
   - Can go back to previous steps
   - Cannot skip ahead without completing current step
   - Show confirmation if leaving with unsaved changes

3. **Progress Indicator:**
   - Show step numbers and names
   - Highlight current step
   - Show checkmark on completed steps

4. **Validation:**
   - Validate on "Next" button click
   - Show inline errors
   - Scroll to first error

5. **Mobile Considerations:**
   - Single column layout
   - Large touch targets for uploads
   - Simplified working hours input

### 5.5 Wizard Files

```
/app/(dashboard)/setup/
├── page.tsx                    # Wizard container & logic
├── layout.tsx                  # Clean layout (no sidebar)

/components/setup/
├── WizardContainer.tsx         # Main wizard logic
├── WizardProgress.tsx          # Progress bar component
├── WizardNavigation.tsx        # Back/Next buttons
├── Step1BasicInfo.tsx
├── Step2About.tsx
├── Step3Contact.tsx
├── Step4Products.tsx
├── Step5Preview.tsx
├── ImageUpload.tsx             # Reusable image upload
└── WorkingHoursInput.tsx       # Working hours component
```

---

## 6. Dashboard Planning

### 6.1 Dashboard Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  LOGO          Search (future)    🔔    👤 Profile Menu  │   │
│  └─────────────────────────────────────────────────────────┘   │
├─────────────┬───────────────────────────────────────────────────┤
│             │                                                   │
│   SIDEBAR   │              MAIN CONTENT AREA                    │
│             │                                                   │
│  ┌────────┐ │                                                   │
│  │  🏠    │ │                                                   │
│  │ Home   │ │                                                   │
│  └────────┘ │                                                   │
│  ┌────────┐ │                                                   │
│  │  👤    │ │                                                   │
│  │Profile │ │                                                   │
│  └────────┘ │                                                   │
│  ┌────────┐ │                                                   │
│  │  📦    │ │                                                   │
│  │Products│ │                                                   │
│  └────────┘ │                                                   │
│  ┌────────┐ │                                                   │
│  │  ⭐    │ │                                                   │
│  │Reviews │ │                                                   │
│  └────────┘ │                                                   │
│  ┌────────┐ │                                                   │
│  │  💳    │ │                                                   │
│  │  Sub   │ │                                                   │
│  └────────┘ │                                                   │
│  ┌────────┐ │                                                   │
│  │  ⚙️    │ │                                                   │
│  │Settings│ │                                                   │
│  └────────┘ │                                                   │
│             │                                                   │
└─────────────┴───────────────────────────────────────────────────┘
```

### 6.2 Dashboard Home - State B (Not Subscribed)

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  ⚠️  YOUR PROFILE IS READY!                              │   │
│  │      Subscribe now to share your profile with clients    │   │
│  │                                          [View Plans →]  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Profile Completion                                      │   │
│  │  ████████████████████░░░░░░░░  80%                      │   │
│  │  [Complete Your Profile]                                 │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐              │
│  │   🔒        │ │   📦        │ │   ⭐        │              │
│  │  Profile    │ │   Total     │ │  Average    │              │
│  │   Views     │ │  Products   │ │   Rating    │              │
│  │  ───────    │ │    12       │ │   N/A       │              │
│  │  Upgrade    │ │             │ │  No reviews │              │
│  │  to see     │ │             │ │     yet     │              │
│  └─────────────┘ └─────────────┘ └─────────────┘              │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │   YOUR PROFILE PREVIEW                                  │   │
│  │   ┌─────────────────────────────────────────────────┐   │   │
│  │   │  [Mini preview of profile]                      │   │   │
│  │   └─────────────────────────────────────────────────┘   │   │
│  │                                                         │   │
│  │   [Preview Full Profile]        [Edit Profile]          │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  🔗 Your Profile Link                                   │   │
│  │                                                         │   │
│  │  yourdomain.com/profile/your-business                   │   │
│  │                                                         │   │
│  │  🔒 [Upgrade to Unlock Sharing]                         │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 6.3 Dashboard Home - State C (Subscribed)

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  ✅ Active Subscription                                  │   │
│  │     Monthly Plan • Renews on Jan 15, 2026               │   │
│  │                                        [Manage Plan →]  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐              │
│  │   👁️        │ │   📦        │ │   ⭐        │              │
│  │   Profile   │ │   Total     │ │  Average    │              │
│  │   Views     │ │  Products   │ │   Rating    │              │
│  │    234      │ │    12       │ │    4.5      │              │
│  │  +15 today  │ │             │ │  (8 reviews)│              │
│  └─────────────┘ └─────────────┘ └─────────────┘              │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  🔗 Your Profile Link                                   │   │
│  │                                                         │   │
│  │  ┌─────────────────────────────────────────────────┐   │   │
│  │  │  yourdomain.com/profile/your-business       📋  │   │   │
│  │  └─────────────────────────────────────────────────┘   │   │
│  │                                                         │   │
│  │  [Copy Link]   [Share on WhatsApp]   [More Options ▼]  │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  📊 Recent Activity                                     │   │
│  │                                                         │   │
│  │  • New review from ABC Trading Co.         2 hours ago │   │
│  │  • 15 profile views                             Today  │   │
│  │  • Product "Steel Pipes" viewed 8 times    Yesterday   │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  ⭐ Recent Reviews                                      │   │
│  │                                                         │   │
│  │  "Great supplier, fast delivery!"                       │   │
│  │   ⭐⭐⭐⭐⭐ - ABC Trading Co.             Jan 10, 2026  │   │
│  │                                                         │   │
│  │  [View All Reviews →]                                   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 6.4 Dashboard Pages Overview

| Page | Purpose | Key Elements |
|------|---------|--------------|
| Home | Overview & quick actions | Stats, profile link, recent activity |
| Profile | Edit profile information | Form with all profile sections |
| Products | Manage product catalog | Product list, add/edit/delete |
| Reviews | View received reviews | Reviews list, average rating |
| Subscription | Manage subscription | Current plan, upgrade/renew, history |
| Settings | Account settings | Email, password, notifications |

### 6.5 Dashboard Files

```
/app/(dashboard)/
├── layout.tsx                  # Dashboard layout with sidebar
├── dashboard/
│   └── page.tsx               # Dashboard home
├── profile/
│   └── page. tsx               # Profile editor
├── products/
│   ├── page.tsx               # Products list
│   ├── new/
│   │   └── page.tsx           # Add new product
│   └── [id]/
│       └── page. tsx           # Edit product
├── reviews/
│   └── page.tsx               # Reviews list
├── subscription/
│   ├── page.tsx               # Subscription management
│   ├── success/
│   │   └── page.tsx           # Payment success
│   └── failed/
│       └── page.tsx           # Payment failed
└── settings/
    └── page.tsx               # Account settings

/components/dashboard/
├── Sidebar.tsx
├── TopBar.tsx
├── ProfileMenu.tsx
├── StatsCard.tsx
├── UpgradeBanner.tsx
├── SubscriptionBanner.tsx
├── ProfileLinkCard.tsx
├── RecentActivity.tsx
└── RecentReviews.tsx
```

---

## 7. Profile Management (Editor)

### 7.1 Editor Layout

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Edit Profile                    [Preview] [Save Changes]       │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  [Basic Info]  [About Us]  [Contact]  [Settings]        │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │              TAB CONTENT AREA                           │   │
│  │                                                         │   │
│  │                                                         │   │
│  │                                                         │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Last saved: 2 minutes ago                                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 7.2 Editor Tabs

#### Tab 1: Basic Info
- Business Name
- Logo (with current preview, change option)
- Cover Image (with current preview, change option)
- Tagline
- Business Category
- Location (City, Country)
- Establishment Year

#### Tab 2: About Us
- Full Description (rich text editor)
- Mission Statement
- Vision Statement
- Certifications/Achievements (add/remove list)

#### Tab 3: Contact
- Contact Email
- Phone Number
- WhatsApp Number
- Website URL
- Physical Address
- Working Hours
- Social Media Links

#### Tab 4: Settings
- Profile URL/Slug
  - Show current URL
  - Allow changing (with availability check)
  - Warning about changing URL
- Profile Status (for future use)

### 7.3 Editor Features

1. **Auto-Save:**
   - Save changes automatically every 30 seconds
   - Or save on field blur (when user leaves a field)
   - Show "Saving..." indicator
   - Show "All changes saved" confirmation

2. **Manual Save:**
   - "Save Changes" button always visible
   - Disable button if no changes
   - Show success toast on save

3. **Preview:**
   - "Preview Profile" button
   - Opens profile in new tab
   - Preview mode (not the actual public URL)

4. **Unsaved Changes Warning:**
   - If user tries to leave with unsaved changes
   - Show confirmation dialog

5. **Validation:**
   - Real-time validation as user types
   - Show errors inline
   - Prevent save if errors exist

### 7.4 Editor Files

```
/app/(dashboard)/profile/
└── page.tsx                    # Profile editor page

/components/profile-editor/
├── ProfileEditor.tsx           # Main editor container
├── EditorTabs.tsx             # Tab navigation
├── BasicInfoTab.tsx
├── AboutTab.tsx
├── ContactTab.tsx
├── SettingsTab.tsx
├── ImageUploader.tsx
├── RichTextEditor.tsx
├── CertificationsList.tsx
├── SocialLinksEditor.tsx
└── WorkingHoursEditor.tsx
```

---

## 8. Products Management

### 8.1 Products List Page

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Products                                    [+ Add Product]    │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  🔍 Search products...           Category:  [All ▼]       │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │  ┌───────┐  Steel Pipes                    In Stock    │   │
│  │  │ IMAGE │  Industrial steel pipes                     │   │
│  │  └───────┘  $150 / per meter        [Edit] [Delete]    │   │
│  │                                                         │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │                                                         │   │
│  │  ┌───────┐  Copper Wires                   In Stock    │   │
│  │  │ IMAGE │  High quality copper wires                  │   │
│  │  └───────┘  $80 / per kg            [Edit] [Delete]    │   │
│  │                                                         │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │                                                         │   │
│  │  ┌───────┐  Aluminum Sheets               Out of Stock │   │
│  │  │ IMAGE │  Various sizes available                    │   │
│  │  └───────┘  $200 / per sheet        [Edit] [Delete]    │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Showing 3 of 12 products              [1] [2] [3] [→]         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 8.2 Add/Edit Product Form

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ← Back to Products              Add New Product                │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────┐  ┌────────────────────────┐  │
│  │                              │  │                        │  │
│  │       PRODUCT IMAGES         │  │    Product Name *      │  │
│  │                              │  │    ┌────────────────┐  │  │
│  │   ┌─────┐ ┌─────┐ ┌─────┐   │  │    │                │  │  │
│  │   │ IMG │ │ IMG │ │  +  │   │  │    └────────────────┘  │  │
│  │   │  1  │ │  2  │ │ Add │   │  │                        │  │
│  │   └─────┘ └─────┘ └─────┘   │  │    Category            │  │
│  │                              │  │    ┌────────────────┐  │  │
│  │   First image = Main image   │  │    │   Select...  ▼  │  │  │
│  │                              │  │    └────────────────┘  │  │
│  └──────────────────────────────┘  │                        │  │
│                                    │    Price *             │  │
│  Description *                     │    ┌────────┐ ┌─────┐  │  │
│  ┌──────────────────────────────┐  │    │  150   │ │/meter│  │  │
│  │                              │  │    └────────┘ └─────┘  │  │
│  │                              │  │                        │  │
│  │                              │  │    Availability        │  │
│  │                              │  │    ◉ In Stock          │  │
│  └──────────────────────────────┘  │    ○ Out of Stock      │  │
│                                    │                        │  │
│                                    └────────────────────────┘  │
│                                                                 │
│                          [Cancel]  [Save Product]               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 8.3 Product Data Fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| name | string | Yes | Max 100 characters |
| description | text | Yes | Max 1000 characters |
| price | decimal | Yes | Positive number |
| price_unit | string | Yes | Dropdown selection |
| category | string | No | Free text or select |
| images | array | Yes | At least 1, max 5 |
| is_available | boolean | Yes | Default: true |
| display_order | integer | No | For sorting |

### 8.4 Price Units Options
- Per piece
- Per kg
- Per meter
- Per box
- Per set
- Per unit
- Per dozen
- Custom (allow input)

### 8.5 Product Features

1. **Multiple Images:**
   - Upload up to 5 images
   - Drag to reorder
   - First image = main/thumbnail

2. **Categories:**
   - User-defined categories
   - Or select from their previous categories
   - Optional field

3. **Display Order:**
   - Drag-and-drop reordering on list page
   - Or manual number input

4. **Duplicate Product:**
   - Quick action to duplicate
   - Opens edit form with pre-filled data

5. **Bulk Actions (Future):**
   - Select multiple
   - Bulk delete
   - Bulk update availability

### 8.6 Products Files

```
/app/(dashboard)/products/
├── page.tsx                    # Products list
├── new/
│   └── page.tsx               # Add product
└── [id]/
    └── page.tsx               # Edit product

/components/products/
├── ProductsList.tsx
├── ProductCard.tsx
├── ProductForm.tsx
├── ProductImageUpload.tsx
├── CategorySelect.tsx
└── PriceUnitSelect.tsx
```

---

## 9. Rating & Comments System

### 9.1 How Reviews Work

```
┌─────────────────────────────────────────────────────────────────┐
│                         REVIEW FLOW                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. User A (Subscribed) has a public profile                   │
│                                                                 │
│  2. User B (Logged in) visits User A's profile                 │
│                                                                 │
│  3. User B clicks "Write a Review"                             │
│                                                                 │
│  4. User B submits rating (1-5 stars) + comment                │
│                                                                 │
│  5. Review appears on User A's profile                         │
│                                                                 │
│  6. User A can see all reviews in their dashboard              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 9.2 Review Rules

| Rule | Description |
|------|-------------|
| Who can review | Only logged-in users (other suppliers) |
| Reviews per user | One review per profile (can edit own review) |
| Who can receive | Only subscribed (active) profiles |
| Rating range | 1-5 stars |
| Comment required | Yes, minimum 10 characters |
| Edit allowed | Yes, can edit own review |
| Delete allowed | Yes, can delete own review |
| Moderation | Future:  Flag inappropriate reviews |

### 9.3 Review Display on Profile

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Ratings & Reviews                                              │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │     ⭐ 4.5           ████████████████░░░░  5 stars (5)  │   │
│  │    Average           ██████████░░░░░░░░░░  4 stars (2)  │   │
│  │   8 reviews          ░░░░░░░░░░░░░░░░░░░░  3 stars (0)  │   │
│  │                      ██░░░░░░░░░░░░░░░░░░  2 stars (1)  │   │
│  │                      ░░░░░░░░░░░░░░░░░░░░  1 star  (0)  │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  [Write a Review]  (only shown if logged in & hasn't reviewed) │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  ┌────┐                                                 │   │
│  │  │LOGO│  ABC Trading Co.                                │   │
│  │  └────┘  ⭐⭐⭐⭐⭐                      Jan 10, 2026    │   │
│  │                                                         │   │
│  │  "Excellent supplier! Fast delivery and great quality   │   │
│  │   products. Highly recommended for steel materials."    │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  ┌────┐                                                 │   │
│  │  │LOGO│  XYZ Industries                                 │   │
│  │  └────┘  ⭐⭐⭐⭐☆                      Jan 5, 2026     │   │
│  │                                                         │   │
│  │  "Good products but delivery took longer than expected.  │   │
│  │   Customer service was helpful though."                 │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  [Load More Reviews]                                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 9.4 Write Review Form

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Write a Review for [Business Name]                        ✕   │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Your Rating *                                                  │
│                                                                 │
│       ☆     ☆     ☆     ☆     ☆                               │
│     (Click to select rating)                                   │
│                                                                 │
│  Your Review *                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │  Write your experience with this supplier...             │   │
│  │                                                         │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│  Minimum 10 characters                                         │
│                                                                 │
│                                    [Cancel]  [Submit Review]    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 9.5 Dashboard Reviews Page

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Reviews                                                        │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │  Average Rating: ⭐ 4.5   |   Total Reviews: 8          │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Sort by: [Most Recent ▼]                                      │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │  ABC Trading Co.            ⭐⭐⭐⭐⭐    Jan 10, 2026   │   │
│  │                                                         │   │
│  │  "Excellent supplier!  Fast delivery and great quality   │   │
│  │   products.  Highly recommended for steel materials."    │   │
│  │                                                         │   │
│  │                                         [View Profile]  │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  (more reviews...)                                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 9.6 Review Data Structure

```
reviews
├── id (UUID)
├── profile_id (FK → profiles)      # Profile being reviewed
├── reviewer_id (FK → users)        # User who wrote review
├── rating (INTEGER 1-5)
├── comment (TEXT)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

### 9.7 Reviews Files

```
/components/profile/
├── ReviewsSection.tsx              # Display on public profile
├── ReviewCard.tsx                  # Single review display
├── WriteReviewModal.tsx            # Review form modal
├── RatingStars.tsx                 # Star rating component
└── RatingSummary.tsx               # Average + distribution

/components/dashboard/
└── ReviewsList.tsx                 # Dashboard reviews list

/app/api/reviews/
├── route.ts                        # Create review (POST)
└── [id]/
    └── route. ts                    # Update/Delete review
```

---

## 10. Public Profile Page

### 10.1 Profile URL Access Rules

| Profile Status | Viewer | Result |
|----------------|--------|--------|
| Active (Subscribed) | Anyone | Full profile visible |
| Active (Subscribed) | Logged in user | Full profile + "Write Review" button |
| Published (Not Subscribed) | Owner | Preview with "Subscribe to Share" banner |
| Published (Not Subscribed) | Others | "Profile Not Available" page |
| Draft | Anyone | 404 Not Found |

### 10.2 Profile Page Layout

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │                    COVER IMAGE                          │   │
│  │                                                         │   │
│  │    ┌─────────┐                                          │   │
│  │    │         │                                          │   │
│  │    │  LOGO   │                                          │   │
│  │    │         │                                          │   │
│  │    └─────────┘                                          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│       Business Name                                             │
│       Tagline goes here                                         │
│       📍 City, Country  •  🏭 Industry Category                 │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  [About]    [Products]    [Reviews]    [Contact]        │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                     SECTION CONTENT                             │
│                                                                 │
│              (Based on selected tab/section)                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 10.3 Alternative:  Single Page Scroll Layout
**Recommended for better mobile experience**

```
┌─────────────────────────────────────────────────────────────────┐
│                        HEADER                                   │
│                  (Cover + Logo + Info)                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ─────────────────── ABOUT US ───────────────────              │
│                                                                 │
│  Full description text here...                                   │
│  Mission, Vision, Certifications...                             │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ─────────────────── PRODUCTS ───────────────────              │
│                                                                 │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐           │
│  │ Product │  │ Product │  │ Product │  │ Product │           │
│  │    1    │  │    2    │  │    3    │  │    4    │           │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘           │
│                                                                 │
│  [View All Products]                                            │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ─────────────────── REVIEWS ────────────────────              │
│                                                                 │
│  ⭐ 4.5 Average (8 reviews)                                    │
│                                                                 │
│  Review cards...                                                 │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ─────────────────── CONTACT US ─────────────────              │
│                                                                 │
│  📧 email@example.com                                          │
│  📞 +971 XX XXX XXXX                                           │
│  💬 WhatsApp                                                   │
│  📍 Address                                                    │
│  🕐 Working Hours                                              │
│  🌐 Social Links                                               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 10.4 Profile Sections Detail

#### Header Section
- Cover image (full width, ~300px height)
- Logo (overlapping cover, ~120px)
- Business name (large)
- Tagline
- Location badge
- Category badge
- Establishment year (if set)

#### About Section
- Full description (formatted text)
- Mission statement (if set)
- Vision statement (if set)
- Certifications list (if set)

#### Products Section
- Grid of product cards (4 per row desktop, 2 tablet, 1 mobile)
- Each card:  Image, Name, Price, Availability badge
- Click to view product detail (modal or expand)
- "View All" if more than 8 products

#### Reviews Section
- Average rating (large)
- Rating distribution bars
- "Write a Review" button (if logged in)
- Review cards list
- Pagination or "Load More"

#### Contact Section
- Email (with mailto link)
- Phone (with tel link)
- WhatsApp (with wa. me link)
- Website (external link)
- Address (with Google Maps link)
- Working hours table
- Social media icons/links

### 10.5 Profile Not Available Page

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                                                                 │
│                         🔒                                      │
│                                                                 │
│              This Profile is Not Available                      │
│                                                                 │
│     The business owner hasn't activated their profile yet.      │
│                                                                 │
│                                                                 │
│     Are you a supplier? Create your own profile!                │
│                                                                 │
│                    [Create Your Profile]                        │
│                                                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 10.6 Profile Preview Banner (For Owner, Not Subscribed)

```
┌─────────────────────────────────────────────────────────────────┐
│  ⚠️  PREVIEW MODE - This profile is only visible to you         │
│      Subscribe to share this link with your clients             │
│                                              [Subscribe Now →]  │
└─────────────────────────────────────────────────────────────────┘

(Profile content below)
```

### 10.7 Share Functionality (Subscribed Only)

**Share Options:**
- Copy Link button
- Share on WhatsApp
- Share on LinkedIn
- Share on Facebook
- Share on Twitter/X
- Email share
- QR Code download

### 10.8 Profile Files

```
/app/profile/
├── [slug]/
│   ├── page.tsx                # Public profile page
│   └── not-found.tsx           # 404 for invalid profiles

/components/profile/
├── ProfileHeader.tsx
├── ProfileNavigation.tsx       # Tab/section navigation
├── AboutSection.tsx
├── ProductsSection.tsx
├── ProductCard.tsx
├── ProductModal.tsx            # Product detail view
├── ReviewsSection.tsx
├── ReviewCard.tsx
├── ContactSection.tsx
├── ShareButtons.tsx
├── ProfileNotAvailable.tsx
└── PreviewBanner.tsx
```

---

## 11. Subscription & Payment (Tap Integration)

### 11.1 Subscription Plans

| Plan | Duration | Price | Features |
|------|----------|-------|----------|
| Monthly | 30 days | $XX | All features, renews monthly |
| Yearly | 365 days | $XX | All features, save XX% |

**Phase 1 Features (Same for both plans):**
- ✓ Professional profile page
- ✓ Unlimited products
- ✓ Ratings & reviews
- ✓ Contact information display
- ✓ Shareable profile link
- ✓ Profile analytics (view count)

### 11.2 Subscription States

```
┌─────────────┐
│   NO PLAN   │ ◄─── New user or never subscribed
└──────┬──────┘
       │ User subscribes
       ▼
┌─────────────┐
│   ACTIVE    │ ◄─── Payment successful, profile shareable
└──────┬──────┘
       │ Subscription period ends
       ▼
┌─────────────┐
│   EXPIRED   │ ◄─── Profile immediately invisible
└──────┬──────┘
       │ User renews
       ▼
┌─────────────┐
│   ACTIVE    │
└─────────────┘
```

### 11.3 Subscription Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                      