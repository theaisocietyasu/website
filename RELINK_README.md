# Relink - AI Society Linktree

A custom Linktree-like page for the AI Society at ASU with an admin editor for officers to manage links and announcements.

## Features

- **Public Page (`/relink`)**: Displays the AI Society logo, name, important announcements (banners), and links
- **Admin Editor (`/relink/edit`)**: Protected page for officers to manage content (requires Clerk authentication)
- **MongoDB Integration**: All data stored in MongoDB with GridFS for image storage
- **Markdown Support**: Banners support full markdown formatting
- **Image Upload**: Officers can upload images for banners stored in MongoDB GridFS
- **Clerk Authentication**: Secure sign-in system for officers only

## Collections

The system uses two MongoDB collections in the `Relink` database:

1. **`links`**: Stores all links displayed on the page
   - `title`: Link title
   - `url`: Target URL
   - `description`: Optional description
   - `order`: Display order
   - `createdAt`, `updatedAt`: Timestamps

2. **`banners`**: Stores announcement banners
   - `title`: Banner title
   - `content`: Markdown content
   - `imageUrl`: Optional image URL (from GridFS)
   - `order`: Display order
   - `createdAt`, `updatedAt`: Timestamps

## Usage

### For Officers

1. Navigate to `/relink/edit`
2. Sign in with your Clerk account (you'll be prompted automatically)
3. Once authenticated, use the tabs to switch between managing Links and Banners
4. Click "Add New Link" or "Add New Banner" to create new content
5. Edit existing items by clicking the edit icon
6. Delete items using the trash icon
7. Preview the public page using the "Preview" button
8. Sign out using the user button in the top right corner

### For the Public

1. Visit `/relink` to see all published links and announcements
2. Click on any link to visit the destination

## Image Upload

When uploading images for banners:
- Images are stored in MongoDB GridFS
- Supports all common image formats (PNG, JPG, GIF, etc.)
- Images are served via `/api/relink/upload/[id]`
- Automatic content-type detection and caching

## API Routes

- `GET /api/relink/links` - Fetch all links
- `POST /api/relink/links` - Create a new link
- `PUT /api/relink/links` - Update a link
- `DELETE /api/relink/links?id={id}` - Delete a link

- `GET /api/relink/banners` - Fetch all banners
- `POST /api/relink/banners` - Create a new banner
- `PUT /api/relink/banners` - Update a banner
- `DELETE /api/relink/banners?id={id}` - Delete a banner

- `POST /api/relink/upload` - Upload an image
- `GET /api/relink/upload/[id]` - Download an image

## Environment Variables

Make sure `.env.local` contains:

```
MONGODB_URI=mongodb+srv://softwareTeam:Wt4qADxB0WsNK3tQ@cluster0.pj0m3k9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
LINKS_COLLECTION_NAME=links
BANNERS_COLLECTION_NAME=banners
```

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **MongoDB** - Database with GridFS for file storage
- **Clerk** - Authentication and user management
- **Framer Motion** - Animations
- **React Markdown** - Markdown rendering with GitHub Flavored Markdown
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## Security Notes

- The `/relink/edit` route is protected by Clerk authentication
- Only authenticated users can access the editor
- Middleware automatically redirects unauthenticated users to sign in
- MongoDB connection string should be kept secure in environment variables
- Clerk credentials should be kept secure in environment variables

## Setting Up Authentication

1. Create a Clerk account at [clerk.com](https://clerk.com)
2. Create a new application in Clerk
3. Copy your publishable key to `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
4. Copy your secret key to `CLERK_SECRET_KEY`
5. Add officer email addresses to your Clerk application
6. Officers can now sign in at `/relink/edit`
