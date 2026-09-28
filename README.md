# The AI Society Website 2025

Official website for The AI Society at Arizona State University

## Tech Stack

- **Framework**: Next.js 15.2.4 (App Router)
- **UI**: React 19, Tailwind CSS, Framer Motion
- **Authentication**: NextAuth.js v5 (Discord OAuth with role verification)
- **Database**: MongoDB with Mongoose (Relink + Software Corner)
- **File Storage**: GridFS for project thumbnails
- **Deployment**: Vercel

## Features

- **Home**: Society overview, programs, team, and contact
- **Programs**: AI Makerspace, ML Lab, NLP Lab
- **Events**: Upcoming events and workshops
- **Projects**: Student projects showcase
- **Software Corner**: Officer project showcase with admin dashboard
- **Relink**: Link management system (officers only)
- **Legacy**: The 2024–25 site (projects, labs, Software Corner) archived at `/legacy`

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB instance (for Relink & Software Corner features)
- Discord Application with OAuth & Bot enabled

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Environment Variables

Copy `.env.example` to `.env.local` and fill in values:

```bash
# MongoDB (for Relink & Software Corner)
MONGODB_URI="mongodb+srv://..."

# Collections
BANNERS_COLLECTION_NAME="banners"
LINKS_COLLECTION_NAME="links"

# Discord OAuth (for officer authentication)
DISCORD_CLIENT_ID="your-client-id"
DISCORD_CLIENT_SECRET="your-client-secret"

# Discord Bot (for role verification)
DISCORD_BOT_TOKEN="your-bot-token"
DISCORD_GUILD_ID="your-server-id"
ADMIN_ROLE_ID="your-admin-role-id"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# Auth.js - trust host in development
AUTH_TRUST_HOST=true
```

Optional Clerk keys (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`) are listed in `.env.example` but are not used by the app today.
### Discord Setup

1. Create a Discord Application at [discord.com/developers](https://discord.com/developers/applications)
2. Enable OAuth2 and add redirect: `http://localhost:3000/api/auth/callback/discord`
3. Enable Bot and add to your Discord server with permissions: View Channels, View Server Members
4. Copy Client ID, Client Secret, and Bot Token to `.env.local`
5. Enable Developer Mode in Discord, right-click your server → Copy ID (Guild ID)
6. Right-click the admin role → Copy ID (Admin Role ID)

## Authentication

Protected routes (`/relink/edit`, `/admin/software-corner`) are only accessible to users who:
1. Sign in with Discord
2. Are members of the specified Discord server
3. Have the specified admin role

Authentication uses NextAuth.js v5 with JWT-only sessions (no database required for auth).

## Software Corner

The Software Corner feature allows officers to showcase their projects. See [SOFTWARE_CORNER_README.md](SOFTWARE_CORNER_README.md) for detailed setup and integration instructions.

**Quick start:**
```bash
# Seed sample projects
node scripts/seed.js

# Visit pages
# Public: http://localhost:3000/software-corner
# Admin: http://localhost:3000/admin/software-corner
```

## Project Structure

```
app/                       # Next.js app router pages
  ├── api/                # API routes
  │   ├── auth/           # NextAuth handlers
  │   ├── projects/       # Software Corner API
  │   └── relink/         # Relink CRUD operations
  ├── admin/
  │   └── software-corner/ # Project management dashboard
  ├── events/             # Events page
  ├── ml_lab/             # ML Lab page
  ├── nlp_lab/            # NLP Lab page
  ├── projects/           # Projects page
  ├── software-corner/    # Public project showcase
  └── relink/             # Relink pages
      ├── page.tsx        # Public link viewer
      ├── signin/         # Discord OAuth sign-in
      └── edit/           # Protected editor

components/               # React components
  ├── home/              # Homepage sections
  ├── labs/              # Lab components
  ├── layout/            # Navbar, Footer
  ├── projects/          # Project components
  ├── providers/         # Context providers
  ├── software-corner/   # Software Corner components
  └── ui/                # Reusable UI components

lib/                      # Utilities and configurations
  ├── auth.ts            # NextAuth configuration
  ├── auth-middleware.ts # API authentication
  ├── auth-types.ts      # TypeScript type extensions
  ├── gridfs.ts          # GridFS file storage
  ├── models/            # Mongoose models
  │   └── Project.ts     # Project model
  ├── mongodb.ts         # MongoDB connection (native)
  ├── mongoose.ts        # Mongoose connection
  └── types.ts           # Shared types

scripts/                  # Utility scripts
  └── seed.js            # Database seeding

middleware.ts             # Route protection
```

## Deployment

### Production Environment Variables

Update these for production:
```bash
NEXTAUTH_URL="https://yourdomain.com"
# Add other production URLs/secrets
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or push to GitHub and connect to Vercel via the dashboard.

## Development

```bash
# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Contributing

This is a fork. Push changes to upstream and notify Darsh Chaurasia for production deployment.

## License

© 2025 The AI Society at Arizona State University
