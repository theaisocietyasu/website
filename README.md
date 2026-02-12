# The AI Society Website 2025

Official website for The AI Society at Arizona State University

## Tech Stack

- **Framework**: Next.js 15.2.4 (App Router)
- **UI**: React 19, Tailwind CSS, Framer Motion
- **Authentication**: NextAuth.js v5 (Discord OAuth with role verification)
- **Database**: MongoDB (for Relink feature only)
- **Deployment**: Vercel

## Features

- **Home**: Society overview, programs, team, and contact
- **Programs**: AI Makerspace, ML Lab, NLP Lab
- **Events**: Upcoming events and workshops
- **Projects**: Student projects showcase
- **Relink**: Link management system (officers only)

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- MongoDB instance (for Relink feature)
- Discord Application with OAuth & Bot enabled

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Environment Variables

Create a `.env.local` file:

```bash
# MongoDB (for Relink feature)
MONGODB_URI="mongodb+srv://..."

# Discord OAuth (for officer authentication)
DISCORD_CLIENT_ID="your-client-id"
DISCORD_CLIENT_SECRET="your-client-secret"

# Discord Bot (for role verification)
DISCORD_BOT_TOKEN="your-bot-token"
DISCORD_GUILD_ID="your-server-id"
ADMIN_ROLE_ID="your-admin-role-id"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
```

### Discord Setup

1. Create a Discord Application at [discord.com/developers](https://discord.com/developers/applications)
2. Enable OAuth2 and add redirect: `http://localhost:3000/api/auth/callback/discord`
3. Enable Bot and add to your Discord server with permissions: View Channels, View Server Members
4. Copy Client ID, Client Secret, and Bot Token to `.env.local`
5. Enable Developer Mode in Discord, right-click your server → Copy ID (Guild ID)
6. Right-click the admin role → Copy ID (Admin Role ID)

## Authentication

The Relink editor (`/relink/edit`) is protected and only accessible to users who:
1. Sign in with Discord
2. Are members of the specified Discord server
3. Have the specified admin role

Authentication uses NextAuth.js v5 with JWT-only sessions (no database required for auth).

## Project Structure

```
app/                    # Next.js app router pages
  ├── api/             # API routes
  │   ├── auth/        # NextAuth handlers
  │   └── relink/      # Relink CRUD operations
  ├── events/          # Events page
  ├── ml_lab/          # ML Lab page
  ├── nlp_lab/         # NLP Lab page
  ├── projects/        # Projects page
  └── relink/          # Relink pages
      ├── page.tsx     # Public link viewer
      ├── signin/      # Discord OAuth sign-in
      └── edit/        # Protected editor

components/            # React components
  ├── home/           # Homepage sections
  ├── labs/           # Lab components
  ├── layout/         # Navbar, Footer
  ├── projects/       # Project components
  ├── providers/      # Context providers
  └── ui/             # Reusable UI components

lib/                   # Utilities and configurations
  ├── auth.ts         # NextAuth configuration
  ├── auth-types.ts   # TypeScript type extensions
  ├── mongodb.ts      # MongoDB connection
  └── types.ts        # Shared types

middleware.ts          # Route protection
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
pnpm add -g vercel

# Deploy
vercel
```

Or push to GitHub and connect to Vercel via the dashboard.

## Development

```bash
# Run dev server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
```

## Contributing

This is a fork. Push changes to upstream and notify Darsh Chaurasia for production deployment.

## License

© 2025 The AI Society at Arizona State University
