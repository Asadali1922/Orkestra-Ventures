# 🚀 Quick Vercel Deployment - 3 Steps

## Step 1: Push to GitHub (2 minutes)

```powershell
cd "c:\Users\asad.ali\OneDrive - VIDIZMO.AI\Desktop\orkestra-railway-fixed-v3.1.0\orkestra-vercel-fullstack"

# Initialize git
git init
git add .
git commit -m "Orkestra Ventures with working forms and Railway database"

# Create repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/orkestra-ventures.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy on Vercel (2 minutes)

**Option A: CLI (Easiest)**
```powershell
npm install -g vercel
vercel login
vercel --prod
```

**Option B: Dashboard**
- Go to vercel.com
- Click "Add New" → "Project"
- Select your GitHub repo
- Click Import

## Step 3: Configure Environment Variables (3 minutes)

In Vercel Dashboard → Project Settings → Environment Variables:

```
DATABASE_URL = mysql://root:tvLZawWzDLQriGbgwZrvyNhZiiFaOgKD@yamanote.proxy.rlwy.net:49643/railway
OAUTH_SERVER_URL = https://your-vercel-domain.vercel.app
JWT_SECRET = your-secure-key-here
VITE_APP_ID = orkestra-production
```

**⚠️ IMPORTANT:** After deployment completes:
1. Get your Vercel domain (e.g., orkestra-ventures.vercel.app)
2. Update `OAUTH_SERVER_URL` to your domain
3. Redeploy (Vercel will auto-rebuild)

---

## ✅ Done! Test Your Forms

1. Newsletter: https://your-domain.vercel.app
2. Contact: https://your-domain.vercel.app/contact
3. Apply: https://your-domain.vercel.app/apply

All forms should save to Railway database!

---

## If Forms Don't Work

1. **Check Vercel logs:** Deployments tab → View Function Logs
2. **Check env vars:** Verify all 4 variables are set
3. **Verify Railway:** Database still running on railway.app
4. **Browser console (F12):** Look for error messages
