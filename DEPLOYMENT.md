# Deployment Guide: Frontend on GitHub Pages + Backend & DB on Firebase

This application is built with **React + Vite + TypeScript + Tailwind CSS** as a Single Page Application (SPA), connected in real-time to **Google Firebase Firestore** and **Firebase Authentication**.

---

## 1. Firebase Backend & Database Setup (Already Active)

Your Firebase configuration is bundled in the app via `firebase-applet-config.json`:
- **Project ID**: `samksocials-d6da5`
- **Firestore Database ID**: `ai-studio-webclone-d43a5825-c878-4c9a-8739-2944b8d4813a`
- **Auth**: Google OAuth & Email/Password
- **Firestore Collections**:
  - `/inquiries`: Contact form submissions received from website visitors in real time.
  - `/content/main`: Live Site CMS storage where services, portfolio, testimonials, and copy persist.

### Important: Add your GitHub Pages domain to Firebase Authorized Domains
1. Go to [Firebase Console](https://console.firebase.google.com/) -> Select project **`samksocials-d6da5`**.
2. Go to **Authentication** -> **Settings** -> **Authorized domains**.
3. Click **Add domain** and enter your GitHub Pages domain:
   - Example: `<your-username>.github.io`
   - (This allows Google OAuth and Firebase Auth to securely authorize logins from GitHub Pages).

---

## 2. Deploy Frontend to GitHub Pages

An automated GitHub Actions workflow (`.github/workflows/deploy.yml`) has been included in the repository.

### Option A: Automated Deployment via GitHub Actions (Recommended)
1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "chore: setup github pages workflow and firebase config"
   git push origin main
   ```
2. On your GitHub repository page:
   - Go to **Settings** -> **Pages**.
   - Under **Build and deployment** -> **Source**, select **GitHub Actions**.
3. Every time you push to `main`, GitHub Actions will automatically compile Vite (`npm run build`) and publish the `/dist` folder to your GitHub Pages URL:
   - `https://<your-username>.github.io/<your-repo-name>/`

### Option B: Manual Deploy using `gh-pages` branch
If you prefer deploying directly from your terminal:
```bash
# 1. Install gh-pages
npm install --save-dev gh-pages

# 2. Add deploy script to package.json:
# "deploy": "npm run build && gh-pages -d dist"

# 3. Deploy
npm run deploy
```

---

## 3. Verify Live Connection
Once deployed to GitHub Pages:
1. Open your live GitHub Pages link.
2. Submit a discovery inquiry through the Contact form — it will instantly show in your Firebase Firestore `/inquiries` collection.
3. Access `/admin` on your live site, sign in with your admin credentials (`HamzaIqbal333@gmail.com`), and verify that you can edit services, copy, and testimonials directly in Firestore.
