# 🚀 Deploy to Vercel - Complete Guide

## Prerequisites
- ✅ Forms working locally with Railway database
- ✅ GitHub account (for connecting repository)
- ✅ Vercel account
- ✅ Railway database set up and running

---

## Step 1: Push Code to GitHub

```powershell
# Initialize git if not already done
cd "c:\Users\asad.ali\OneDrive - VIDIZMO.AI\Desktop\orkestra-railway-fixed-v3.1.0\orkestra-vercel-fullstack"
git init
git add .
git commit -m "Initial commit: Forms working with Railway database"

# Add your GitHub repo (create one on github.com first)
git remote add origin https://github.com/YOUR_USERNAME/orkestra-ventures.git
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy to Vercel

### Option A: Using Vercel CLI (Recommended)

```powershell
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
cd "c:\Users\asad.ali\OneDrive - VIDIZMO.AI\Desktop\orkestra-railway-fixed-v3.1.0\orkestra-vercel-fullstack"
vercel --prod
```

### Option B: Connect GitHub on Vercel Dashboard

1. Go to https://vercel.com
2. Click "Add New..." → "Project"
3. Select "Import Git Repository"
4. Choose your GitHub repo
5. Click "Import"

---

## Step 3: Configure Environment Variables in Vercel

**This is CRITICAL for forms to work!**

Go to Vercel Dashboard → Project Settings → Environment Variables

Add these variables:

### Database Configuration
```
DATABASE_URL = mysql://root:tvLZawWzDLQriGbgwZrvyNhZiiFaOgKD@yamanote.proxy.rlwy.net:49643/railway
```

### OAuth Configuration
```
OAUTH_SERVER_URL = https://your-vercel-domain.vercel.app
```
(Replace with your actual Vercel domain - you'll know this after first deployment)

### JWT Secret
```
JWT_SECRET = your_secure_jwt_secret_here_change_this
```

### Vite Variables (for frontend)
```
VITE_APP_ID = orkestra-production
VITE_ANALYTICS_ENDPOINT = (leave empty if not needed)
VITE_ANALYTICS_WEBSITE_ID = (leave empty if not needed)
```

### Forge API (Optional)
```
BUILT_IN_FORGE_API_URL = (leave empty if not needed)
BUILT_IN_FORGE_API_KEY = (leave empty if not needed)
```

---

## Step 4: Verify Deployment

Once deployed, Vercel will give you a URL like: `https://orkestra-ventures.vercel.app`

### Test Each Form:

**1. Newsletter Form**
- Go to https://your-domain.vercel.app
- Scroll to footer
- Enter email
- Click "Subscribe"
- ✅ Should save to Railway database

**2. Contact Form**
- Go to https://your-domain.vercel.app/contact
- Fill all fields
- Click "Send Message"
- ✅ Should save to Railway database

**3. Application Form**
- Go to https://your-domain.vercel.app/apply
- Fill all fields
- Click "Submit"
- ✅ Should save to Railway database

**4. Check Browser Console (F12)**
- Open DevTools
- Look for logs showing successful submissions
- No errors should appear

**5. Verify in Railway Database**
- Go to https://railway.app
- Select your MySQL database
- Run queries to verify data:
  ```sql
  SELECT * FROM newsletter_subscribers;
  SELECT * FROM contacts;
  SELECT * FROM applications;
  ```

---

## Step 5: Update OAUTH_SERVER_URL (Important!)

After your first deployment, you'll have your Vercel domain:

1. Get your domain from Vercel Dashboard
2. Update `OAUTH_SERVER_URL` environment variable:
   - Change from: `http://localhost:3000`
   - Change to: `https://your-domain.vercel.app`
3. Redeploy

---

## Troubleshooting

### Forms Not Working on Vercel

**Check 1: Environment Variables**
```
Go to Vercel Settings → Environment Variables
✅ DATABASE_URL is set
✅ OAUTH_SERVER_URL is set to your Vercel domain
✅ JWT_SECRET is set
```

**Check 2: Build Succeeded**
```
Go to Vercel Deployments
✅ Check for build errors
✅ Ensure "Build successful" message
```

**Check 3: Browser Console Errors**
```
F12 → Console tab
Look for tRPC errors or network errors
```

**Check 4: Vercel Function Logs**
```
Vercel Dashboard → Deployments → Latest
Click on logs to see server errors
```

### Error: "Database not available"
- ✅ DATABASE_URL is set in Vercel env variables
- ✅ Railway database is still running
- ✅ Database URL hasn't expired

### Error: "Failed to send message"
- ✅ Check browser console for actual error
- ✅ Check Vercel function logs
- ✅ Verify all required fields are filled

### Error: "Connection timeout"
- ✅ Railway database might be down
- ✅ Check Railway dashboard status
- ✅ Verify DATABASE_URL is correct

---

## Production Checklist

Before marking as complete:

- [ ] Website loads on Vercel domain
- [ ] All pages are accessible
- [ ] Hero animation works
- [ ] Newsletter form works (saves to DB)
- [ ] Contact form works (saves to DB)
- [ ] Application form works (saves to DB)
- [ ] Admin panel loads at /admin
- [ ] No console errors
- [ ] No Vercel function errors
- [ ] Mobile responsive
- [ ] HTTPS working (automatic)
- [ ] Forms respond in < 2 seconds

---

## Quick Deploy Command

Once everything is set up:

```powershell
# From your project directory
vercel --prod
```

---

## Important Files for Reference

- `vercel.json` - Deployment configuration ✅ Already configured
- `package.json` - Build scripts ✅ Already configured
- `server/_core/index.ts` - Server with environment loading ✅ Already fixed
- `.env.local` - Local development only (not deployed)

---

## Support

If forms don't work after deployment:

1. **Check Vercel logs**: Deployments → View Function Logs
2. **Check Railway status**: Make sure database is running
3. **Verify env variables**: All required variables set in Vercel
4. **Test API directly**: Use browser network tab to see API responses
5. **Review error messages**: Browser console + Vercel logs will show the issue

---

## Next Steps After Deployment

1. Set up custom domain (optional)
2. Configure analytics if needed
3. Set up monitoring/alerts
4. Test form emails/notifications
5. Set up admin user accounts
