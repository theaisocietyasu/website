# Software Corner - Setup & Integration Guide

## Overview

The Software Corner is a production-ready feature that allows AIS officers to showcase their projects. It includes:

- **Public listing page** at `/software-corner` with cursor-based pagination and search
- **Admin dashboard** at `/admin/software-corner` for officers to manage projects
- **GridFS-based** thumbnail storage with streaming
- **Full CRUD API** with authentication
- **Responsive design** matching the existing AIS website theme

## Architecture

### Database Layer
- **MongoDB Atlas** with Mongoose ODM
- **GridFS** for thumbnail storage (jpg, jpeg, png only, max 5MB)
- **Connection pooling** optimized for Vercel serverless functions
- **Indexes** for performance:
  - `{ published: 1, created_at: -1 }` - Public listing queries
  - Text index on `title` + `description` - Search functionality
  - `{ collaborators: 1 }` - Collaborator queries
  - `{ owner_discord_id: 1 }` - Owner queries

### API Routes
All routes are in `/app/api/projects/`:

- `GET /api/projects` - List projects (supports pagination, search, filters)
- `GET /api/projects/:id` - Get single project
- `GET /api/projects/:id/thumbnail` - Stream thumbnail from GridFS
- `POST /api/projects` - Create project (officer only)
- `PUT /api/projects/:id` - Update project (owner only)
- `DELETE /api/projects/:id` - Delete project (owner only)
- `POST /api/projects/:id/publish` - Toggle publish status (owner only)
- `POST /api/projects/:id/collaborators` - Add collaborator (owner only)
- `DELETE /api/projects/:id/collaborators/:username` - Remove collaborator (owner only)

### Frontend Components

**Components** (`/components/software-corner/`):
- `ProjectCard` - Grid card with thumbnail, collaborator avatars, and links
- `EditProjectModal` - Create/edit modal with form validation

**Pages**:
- `/app/software-corner/page.tsx` - Public listing with infinite scroll
- `/app/admin/software-corner/page.tsx` - Admin dashboard with stats

## Setup Instructions

### 1. Environment Variables

Add these to your `.env.local` (see also `.env.example`):

```bash
# MongoDB (required)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority

# Discord OAuth (already configured)
DISCORD_CLIENT_ID=your_client_id
DISCORD_CLIENT_SECRET=your_client_secret
DISCORD_BOT_TOKEN=your_bot_token
DISCORD_GUILD_ID=your_guild_id
ADMIN_ROLE_ID=your_admin_role_id

# NextAuth (already configured)
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
AUTH_TRUST_HOST=true
```

### 2. Install Dependencies

The required dependencies are already in `package.json`:
- `mongoose` - MongoDB ODM
- `mongodb` - MongoDB driver (for GridFS)
- `next-auth` - Authentication
- All other dependencies are already installed

```bash
npm install
```

### 3. Seed the Database

Run the seed script to create sample projects:

```bash
node scripts/seed.js
```

This will:
- Connect to your MongoDB database
- Create sample projects with various states (published/draft)
- Create required indexes for performance
- Display a summary of seeded data

### 4. Run Development Server

```bash
npm run dev
```

Visit:
- Public page: http://localhost:3000/software-corner
- Admin dashboard: http://localhost:3000/admin/software-corner (requires Discord officer login)

### 5. Deploy to Vercel

The feature is Vercel-ready with:
- Connection pooling cached on `globalThis`
- GridFS streaming (no memory buffering)
- Optimized API routes
- SSR/ISR support

Set all environment variables in Vercel dashboard, then deploy:

```bash
vercel --prod
```

## Integration with Existing Site

### Add to Navigation

The Software Corner is currently a standalone feature. To add it to your main navigation:

**Option 1: Add to existing pages**

Edit `/app/page.tsx` (or any page) to add Software Corner to nav items:

```typescript
const navItems: NavItem[] = [
  { name: "Home", link: "/", icon: <IconHome /> },
  { name: "Projects", link: "/projects", icon: <IconUsers /> },
  { name: "Events", link: "/events", icon: <IconCalendar /> },
  { name: "Software Corner", link: "/software-corner", icon: <IconCode /> }, // Add this
]
```

**Option 2: Replace existing Projects page**

If you want to replace the current `/projects` page with Software Corner:

1. Rename `/app/projects/page.tsx` to `/app/projects/archive.tsx` or similar
2. Rename `/app/software-corner/page.tsx` to `/app/projects/page.tsx`
3. Update admin route from `/admin/software-corner` to `/admin/projects`

### Add Admin Link

For officers to easily access the dashboard, add a link in your existing admin panel or navbar:

```tsx
{session && (
  <Link href="/admin/software-corner">
    Manage Projects
  </Link>
)}
```

## Authentication Flow

The Software Corner reuses your existing Godfather Discord authentication:

1. Officers sign in via Discord OAuth (existing flow)
2. NextAuth verifies admin role via Discord Bot API
3. Session includes `discordId` for ownership checks
4. Middleware protects `/admin/software-corner` route
5. API routes verify ownership before allowing edits/deletes

**Key files**:
- `/lib/auth.ts` - NextAuth configuration (existing)
- `/lib/auth-middleware.ts` - API route middleware (new)
- `/middleware.ts` - Route protection (updated)

## Data Model

```typescript
interface Project {
  _id: ObjectId
  title: string                    // Required, max 120 chars
  description: string              // Required
  thumbnail_file_id?: ObjectId     // GridFS file ID
  github_url?: string
  live_url?: string
  collaborators: string[]          // GitHub usernames
  published: boolean               // Default: false
  owner_discord_id: string         // From session
  created_at: Date
  updated_at: Date
}
```

## Pagination

The public listing uses **cursor-based pagination** for performance:

```typescript
// Request
GET /api/projects?pageSize=12&cursor=2024-01-15T10:30:00.000Z

// Response
{
  data: [...],           // Array of projects
  nextCursor: "2024-01-10T08:20:00.000Z",  // ISO date string
  hasMore: true          // Boolean
}
```

This avoids the `skip()` operation which becomes slow on large datasets.

## File Upload

Thumbnails are streamed directly to GridFS without buffering in memory:

1. Client uploads file via `multipart/form-data`
2. API route validates file type (jpg, jpeg, png) and size (max 5MB)
3. File is streamed to GridFS using `uploadFile()` helper
4. GridFS returns `ObjectId` which is stored in project document
5. Thumbnails are served via streaming endpoint at `/api/projects/:id/thumbnail`

**Important**: Old thumbnails are automatically deleted when updating or deleting projects.

## Search & Filters

Text search is powered by MongoDB text indexes:

```typescript
// Search projects
GET /api/projects?search=chatbot&published=true

// Admin view - show drafts
GET /api/projects?published=false
```

## Collaborator Avatars

GitHub usernames are stored as strings. The frontend fetches avatars in real-time:

```typescript
// In ProjectCard component
fetch(`https://api.github.com/users/${username}`)
```

**Rate limiting**: Avatar fetches are unauthenticated today. Higher limits would need a `GITHUB_TOKEN` wired into those requests.

## Security

- **Authentication**: All write operations require valid Discord officer session
- **Ownership**: Users can only edit/delete their own projects
- **Validation**: Client + server-side validation for all inputs
- **File uploads**: Strict type and size validation
- **SQL injection**: N/A (using MongoDB with Mongoose)
- **XSS**: Next.js escapes all user content by default

## Performance Optimizations

1. **Connection pooling**: MongoDB connections cached on `globalThis`
2. **Cursor pagination**: No `skip()` on large datasets
3. **GridFS streaming**: No memory buffering
4. **Image optimization**: Next.js Image component
5. **Code splitting**: Dynamic imports for components
6. **Indexes**: All query patterns have supporting indexes

## Troubleshooting

### "Failed to connect to MongoDB"
- Verify `MONGODB_URI` in `.env.local`
- Check MongoDB Atlas network access (allow Vercel IPs)
- Ensure database user has read/write permissions

### "Unauthorized" when accessing admin dashboard
- Make sure you're signed in via Discord
- Verify you have the admin role in Discord server
- Check `ADMIN_ROLE_ID` in environment variables

### Thumbnails not loading
- Check GridFS bucket exists in MongoDB
- Verify file was uploaded successfully
- Check browser console for 404/500 errors
- Ensure `thumbnail_file_id` is valid ObjectId

### "Rate limit exceeded" for GitHub avatars
- Reduce number of collaborators per project
- Implement authenticated GitHub requests (e.g. `GITHUB_TOKEN`) and avatar caching in the future

## Future Enhancements

Consider adding:
- **Categories/Tags**: Filter projects by technology stack
- **Likes/Views**: Engagement metrics
- **Comments**: Community feedback
- **Analytics**: Track popular projects
- **Email notifications**: When projects are published
- **Bulk operations**: Publish/delete multiple projects
- **Export**: Download project data as CSV/JSON

## File Structure

```
/home/user/ais-website/
├── app/
│   ├── api/projects/              # API routes
│   ├── software-corner/           # Public page
│   └── admin/software-corner/     # Admin dashboard
├── components/software-corner/    # React components
├── lib/
│   ├── models/Project.ts          # Mongoose model
│   ├── mongoose.ts                # Mongoose connection
│   ├── gridfs.ts                  # GridFS helpers
│   ├── auth-middleware.ts         # API auth
│   └── types.ts                   # TypeScript interfaces
├── scripts/
│   └── seed.js                    # Database seeding
└── middleware.ts                  # Route protection
```

## Support

For questions or issues:
1. Check this README
2. Review the code comments
3. Test with seed data first
4. Check MongoDB Atlas logs
5. Review Vercel function logs

## License

This feature is part of the AIS website and follows the same license.
