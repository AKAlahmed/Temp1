# 📋 B2B Supplier Profile Platform - Summary

## 🎯 The Idea
A platform where B2B suppliers can create professional digital profile pages to showcase their business and share with potential clients via a single link.

---

## 💡 Core Value Proposition
- Suppliers get a professional online presence without building a website
- One shareable link containing all business information
- Built-in product catalog and review system

---

## 🔑 Phase 1 Features

### 1. Landing Page
- Explains platform benefits
- Shows demo profile
- Pricing (Monthly & Yearly plans)
- FAQ section

### 2. Supplier Profile (4 Sections)
- **About Us**:  Business description, logo, cover image
- **Products**: Unlimited product listings with images & prices
- **Ratings & Reviews**: Other platform users can review
- **Contact Us**: Email, phone, WhatsApp, address, social links

### 3. Profile Management Dashboard
- Edit profile information
- Manage products (add/edit/delete)
- Manage subscription
- Share profile link (subscribers only)

### 4. Subscription System
- **Monthly Plan**: 30 days access
- **Yearly Plan**: 365 days access (discounted)
- Payment via **Tap Payment**
- Profile becomes invisible immediately when expired

---

## 👤 User States & Flow

| State | Description | Profile Visibility |
|-------|-------------|-------------------|
| A | Registered, profile incomplete | Not visible |
| B | Profile complete, not subscribed | Visible to self only |
| C | Profile complete + subscribed | Public & shareable |

**Post-Login Logic:**
- State A → Redirect to Setup Wizard
- State B/C → Redirect to Dashboard

---

## 📧 Email Notifications
- Welcome email (after registration)
- Subscription confirmation
- Subscription expiry reminder (before expiration)
- Subscription expired notice

---

## 🛠️ Tech Stack
| Component | Technology |
|-----------|------------|
| Framework | Next. js |
| Database | PostgreSQL |
| Payment | Tap Payment |

---

## 📊 Key Business Rules
1. Profile shareable ONLY after subscription
2. Profile invisible IMMEDIATELY when subscription expires
3. Only logged-in users can leave reviews
4. One review per user per profile
5. Unlimited products in Phase 1

---

## 🚀 Success Criteria for Phase 1
- [ ] Suppliers can register and create profiles
- [ ] Profiles look professional and modern
- [ ] Payment system works (Tap integration)
- [ ] Subscribed users can share their profile link
- [ ] Reviews system functional
- [ ] Email notifications working