# Sahil Thorat Portfolio

This is a premium, real-time portfolio website built with **Next.js 14**, **Firebase Realtime Database**, and **Lucide React**.

## Features

- **Real-time Content Updates**: Manage stats, video projects, experience, and bio directly from the admin panel.
- **Google Sheets Integration**: Campaign data is synced live from a public Google Sheets CSV export.
- **Premium Aesthetics**: Dark mode, glassmorphism, smooth animations, and cinematic video gallery.
- **Admin Dashboard**: Secure panel to manage all site content without touching code.

## Setup Instructions

### 1. Environment Variables
Create a `.env.local` file in the root directory and add the following:
```env
NEXT_PUBLIC_ADMIN_EMAIL=your-email@example.com
NEXT_PUBLIC_ADMIN_PASSWORD=your-secure-password
```

### 2. Firebase Configuration
The project is pre-configured with Firebase. If you wish to use your own Firebase project:
1. Create a project on [Firebase Console](https://console.firebase.google.com/).
2. Enable **Realtime Database**.
3. Copy your Web App configuration into `app/lib/firebase.js`.

### 3. Local Development
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the site.
Open [http://localhost:3000/admin](http://localhost:3000/admin) to manage content.

## Deployment to Vercel (via GitHub)

1. **Push to GitHub**:
   - Create a new repository on GitHub.
   - Initialize git: `git init`
   - Add files: `git add .`
   - Commit: `git commit -m "Initial commit"`
   - Push: `git push origin main`

2. **Connect to Vercel**:
   - Go to [Vercel](https://vercel.com/new).
   - Import your GitHub repository.
   - Add your environment variables in the Vercel dashboard settings.
   - Deploy!

## Credits
Built with ❤️ by Sahil Thorat.
