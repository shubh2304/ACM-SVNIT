# 🚀 SVNIT ACM Student Chapter — Official Website

<div align="center">
  <h3>World-class website for SVNIT's premier computing society</h3>
  <p>Built for the ACM India "Outstanding Chapter Website" award</p>
  
  [![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)](https://nextjs.org)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat&logo=typescript)](https://typescriptlang.org)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com)
  [![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat&logo=mongodb)](https://mongodb.com)
  [![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=flat&logo=vercel)](https://vercel.com)
</div>

---

## ✨ Features

- 🌐 **Full-stack Next.js 14** with App Router and TypeScript
- 🎨 **Dark Futurism design** — custom palette, glassmorphism, noise textures
- 🌀 **Three.js particle sphere** — draggable, interactive 3D hero element
- ✨ **Framer Motion** animations throughout — scroll reveals, counter animations
- 🎯 **Lenis smooth scroll** — buttery smooth inertia-based scrolling
- 🖱️ **Custom animated cursor** — dot + ring with hover effects
- 🧲 **Magnetic button effects** on all primary CTAs
- 📊 **Full CMS Admin Panel** — manage events, team, blogs, members, achievements
- 🔐 **NextAuth v5 authentication** — JWT-based with role management
- ☁️ **Cloudinary integration** — for all image storage
- 📧 **Resend email integration** — transactional emails for registrations
- 📱 **Fully responsive** — from 320px to 2560px
- ♿ **Accessible** — `prefers-reduced-motion` respected, semantic HTML
- 🗺️ **SEO optimized** — dynamic metadata, OpenGraph, structured data

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 14, TypeScript |
| **Styling** | Tailwind CSS, Custom CSS |
| **Animations** | Framer Motion, GSAP, Lenis |
| **3D / WebGL** | Three.js, React Three Fiber |
| **Backend** | Next.js API Routes |
| **Database** | MongoDB Atlas + Mongoose |
| **Auth** | NextAuth.js v5 |
| **Media** | Cloudinary |
| **Email** | Resend |
| **Deployment** | Vercel |

## 📋 Prerequisites

- Node.js 18.17+
- npm 9+
- MongoDB Atlas account (free tier works)
- Cloudinary account (free tier works)
- Resend account (free tier works)

## 🛠️ Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/svnitacm/website.git
cd website/svnit-acm
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your values:

```env
MONGODB_URI=mongodb+srv://...
NEXTAUTH_SECRET=your-32-char-secret
NEXTAUTH_URL=http://localhost:3000
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
RESEND_API_KEY=re_...
EMAIL_FROM=noreply@svnitacm.in
SEED_ADMIN_EMAIL=admin@svnitacm.in
SEED_ADMIN_PASSWORD=Admin@123
```

### 4. Seed the first admin user

```bash
node scripts/seed-admin.js
```

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the website.
Open [http://localhost:3000/admin/login](http://localhost:3000/admin/login) for the admin panel.

## 🔐 Admin Panel Usage

### Login
Navigate to `/admin/login` and enter the credentials you set in `SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD`.

### Sections

| Section | Path | Description |
|---|---|---|
| Dashboard | `/admin/dashboard` | Overview stats and quick actions |
| Events | `/admin/events` | Create, edit, delete events |
| Team | `/admin/team` | Manage team members by year |
| Blogs | `/admin/blogs` | Write and publish blog posts |
| Members | `/admin/members` | Review and approve join requests |
| Achievements | `/admin/achievements` | Track awards and milestones |
| Gallery | `/admin/gallery` | Upload photos to Cloudinary |
| Newsletter | `/admin/newsletter` | View and export subscribers |
| Settings | `/admin/settings` | Site-wide configuration |
| Admin Users | `/admin/users` | Manage admin access |

## 🗂️ Project Structure

```
svnit-acm/
├── app/
│   ├── (public)/          # Public pages with Navbar/Footer
│   │   ├── page.tsx       # Home page
│   │   ├── about/
│   │   ├── events/
│   │   ├── team/
│   │   ├── blogs/
│   │   ├── achievements/
│   │   ├── contact/
│   │   └── join/
│   ├── (admin)/           # Admin panel (protected)
│   │   └── admin/
│   │       ├── login/
│   │       ├── dashboard/
│   │       ├── events/
│   │       ├── team/
│   │       ├── blogs/
│   │       ├── members/
│   │       ├── achievements/
│   │       ├── gallery/
│   │       ├── newsletter/
│   │       ├── settings/
│   │       └── users/
│   └── api/               # API routes
├── components/
│   ├── three/             # Three.js components
│   ├── animations/        # Animation utilities
│   ├── ui/                # Reusable UI components
│   ├── layout/            # Navbar, Footer
│   └── admin/             # Admin-specific components
├── lib/                   # Utilities (DB, Auth, Email, Cloudinary)
├── models/                # Mongoose schemas
└── scripts/               # Utility scripts
```

## 🚀 Deployment to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "feat: initial SVNIT ACM website"
git push origin main
```

### 2. Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Add all environment variables from `.env.local`
4. Set `NEXTAUTH_URL` to your Vercel URL (e.g., `https://svnitacm.vercel.app`)
5. Deploy!

### 3. Post-deployment

- Update `NEXTAUTH_URL` with your actual domain
- Run the seed script pointing to production MongoDB
- Add your custom domain in Vercel settings

## 🌍 Environment Variables Reference

| Variable | Required | Description |
|---|---|---|
| `MONGODB_URI` | ✅ | MongoDB Atlas connection string |
| `NEXTAUTH_SECRET` | ✅ | Random 32+ char secret for JWT |
| `NEXTAUTH_URL` | ✅ | Full URL of your site |
| `CLOUDINARY_CLOUD_NAME` | ✅ | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | ✅ | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | ✅ | Cloudinary API secret |
| `RESEND_API_KEY` | ✅ | Resend email API key |
| `EMAIL_FROM` | ✅ | Sender email address |
| `ADMIN_EMAIL` | ❌ | Admin notification email |
| `SEED_ADMIN_EMAIL` | ❌ | First admin user email (seed only) |
| `SEED_ADMIN_PASSWORD` | ❌ | First admin user password (seed only) |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/amazing-feature`
3. Make your changes following existing code style
4. Commit: `git commit -m 'feat: add amazing feature'`
5. Push: `git push origin feat/amazing-feature`
6. Open a Pull Request

## 📝 License

MIT License — SVNIT ACM Student Chapter, 2024.

---

<div align="center">
  <p>Built with ❤️ by <strong>SVNIT ACM Student Chapter</strong></p>
  <p>Surat, Gujarat — India</p>
</div>
