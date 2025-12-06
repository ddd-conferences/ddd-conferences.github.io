# DDD Conferences Website

## Cloudinary Setup Instructions

This project uses Cloudinary for responsive image optimization, which works perfectly with static site exports.

### Step 1: Create a Cloudinary Account

1. Sign up for a free account at [cloudinary.com](https://cloudinary.com/)
2. Note your **Cloud Name** from the dashboard

### Step 2: Upload Images to Cloudinary

Upload the images from `public/images/` to your Cloudinary account in a folder called `ddd-conferences`:

**Option A: Using Cloudinary Upload Widget (Manual)**
1. Go to your Cloudinary dashboard
2. Click "Media Library" → "Upload"
3. Create a folder called `ddd-conferences`
4. Upload all images from `public/images/`

**Option B: Using Cloudinary CLI (Recommended)**
```bash
# Install Cloudinary CLI
npm install -g cloudinary-cli

# Configure with your credentials
cld config

# Upload all images
cld uploader upload public/images/*.jpg folder=ddd-conferences
```

### Step 3: Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Add your Cloudinary cloud name to `.env.local`:
   ```
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-actual-cloud-name
   ```

### Step 4: Build and Deploy

```bash
# Install dependencies
pnpm install

# Build the static site
pnpm build

# The static files will be in the 'out' directory
```

## How It Works

The custom Cloudinary loader (`lib/cloudinary-loader.ts`) automatically:
- Generates responsive image URLs based on device screen size
- Converts images to modern formats (WebP, AVIF) when supported
- Optimizes quality automatically
- Works with static exports (no server required)

Images are loaded with these responsive sizes:
- **Carousel images**: 100vw on mobile, 50vw on tablet, 33vw on desktop
- **Hotel thumbnails**: Fixed 80px width
- **Icons**: Fixed 16x16px

External hotel images are passed through as-is (not processed by Cloudinary).

## Benefits

✅ Automatic format optimization (WebP/AVIF)
✅ Responsive image sizing
✅ Quality optimization
✅ Works with static site generation
✅ Free tier supports up to 25GB storage and 25GB monthly bandwidth
