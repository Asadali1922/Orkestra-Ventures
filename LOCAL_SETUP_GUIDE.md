# 🔧 Local Development Setup - Forms Fix Guide

## Problem
Forms are not submitting because the database is not configured locally.

**Error:** "Failed to send message. Please try again."

**Root Cause:** `DATABASE_URL` environment variable is missing

---

## Solution: Setup Local MySQL Database

### Step 1: Install MySQL (if you don't have it)

**Windows Options:**

**Option A: MySQL Community Server (Recommended)**
1. Download from: https://dev.mysql.com/downloads/mysql/
2. Run installer
3. Choose "Developer Default" setup
4. Install MySQL Server and MySQL Workbench
5. During configuration, set:
   - Port: 3306
   - Root user password: (set one or leave empty for testing)

**Option B: Using Homebrew/Package Manager**
```powershell
# For Windows with Chocolatey:
choco install mysql

# Then start MySQL:
$env:Path += ";C:\Program Files\MySQL\MySQL Server 8.0\bin"
mysqld --console
```

**Option C: Docker (Easiest)**
```powershell
# Install Docker Desktop from: https://www.docker.com/products/docker-desktop
# Then run:
docker run --name mysql-orkestra -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -d mysql:8.0
```

---

### Step 2: Create Database

Open PowerShell or Command Prompt and run:

```powershell
# Connect to MySQL (adjust password if you set one)
mysql -u root -p

# In MySQL prompt, create database:
CREATE DATABASE IF NOT EXISTS orkestra;
EXIT;
```

---

### Step 3: Update .env.local

The `.env.local` file is already configured, but verify:

```env
DATABASE_URL=mysql://root@localhost:3306/orkestra

# If you set a password, use:
# DATABASE_URL=mysql://root:yourpassword@localhost:3306/orkestra
```

---

### Step 4: Run Database Migrations

```powershell
cd "c:\Users\asad.ali\OneDrive - VIDIZMO.AI\Desktop\orkestra-railway-fixed-v3.1.0\orkestra-vercel-fullstack"

# Generate and run migrations
pnpm run db:push
```

**What this does:**
- Generates SQL from Drizzle schema
- Creates all tables in your local database
- Sets up schema for: applications, contacts, newsletter_subscribers, users

---

### Step 5: Restart Dev Server

```powershell
# Kill existing server (Ctrl+C in terminal)
# Then restart:
pnpm dev
```

---

## Testing Forms

Once setup is complete:

1. **Newsletter Form**
   - Go to http://localhost:3000
   - Scroll to footer
   - Enter email and click "Subscribe"
   - Should see: ✅ "Subscribed successfully!"

2. **Contact Form**
   - Go to http://localhost:3000/contact
   - Fill in all fields
   - Click "Send Message"
   - Should see: ✅ "Message sent successfully!"

3. **Application Form**
   - Go to http://localhost:3000/apply
   - Fill in application
   - Click "Submit Application"
   - Should see: ✅ "Application submitted successfully!"

4. **Admin Panel**
   - Go to http://localhost:3000/admin
   - Login (credentials from your settings)
   - Should see all submissions from database

---

## Troubleshooting

### Error: "Access denied for user 'root'"
**Solution:** MySQL password mismatch
```powershell
# Use correct password in DATABASE_URL:
$env:DATABASE_URL = "mysql://root:yourpassword@localhost:3306/orkestra"
pnpm dev
```

### Error: "Can't connect to MySQL server"
**Solution:** MySQL is not running
```powershell
# Check if MySQL is running
Get-Process mysqld

# If not, start it:
# On Windows: Services > MySQL > Start
# Or with Docker: docker start mysql-orkestra
```

### Error: "Database 'orkestra' doesn't exist"
**Solution:** Create the database
```powershell
mysql -u root -p -e "CREATE DATABASE orkestra;"
```

### Error: "ECONNREFUSED on localhost:3306"
**Solution:** Port is already in use or MySQL not listening
```powershell
# Check what's using port 3306:
Get-NetTCPConnection -LocalPort 3306

# Kill the process and restart MySQL
# Or use different port:
$env:DATABASE_URL = "mysql://root@localhost:3307/orkestra"
```

---

## Environment Variables Reference

| Variable | Required | Example | Notes |
|----------|----------|---------|-------|
| `DATABASE_URL` | ✅ Yes | `mysql://root@localhost:3306/orkestra` | Must be MySQL for migrations to work |
| `OAUTH_SERVER_URL` | ✅ Yes | `http://localhost:3000` | For OAuth integration |
| `JWT_SECRET` | ✅ Yes | `dev_secret_key` | Used for session cookies |
| `VITE_APP_ID` | Optional | `local-dev` | Application identifier |
| `BUILT_IN_FORGE_API_URL` | Optional | (leave empty) | For advanced features |
| `BUILT_IN_FORGE_API_KEY` | Optional | (leave empty) | For advanced features |

---

## Quick MySQL Commands

```powershell
# Login to MySQL
mysql -u root -p

# List databases
SHOW DATABASES;

# Use database
USE orkestra;

# List tables
SHOW TABLES;

# Check newsletter subscriptions
SELECT * FROM newsletter_subscribers;

# Check contacts
SELECT * FROM contacts;

# Check applications
SELECT * FROM applications;

# Exit
EXIT;
```

---

## What to Do If Still Not Working

1. **Check server logs**
   ```powershell
   # Look for errors in terminal running "pnpm dev"
   # Should show: "Server running on http://localhost:3000/"
   ```

2. **Check browser console** (F12)
   - Open DevTools
   - Go to Console tab
   - Submit form and check for error messages

3. **Test API directly**
   ```powershell
   # In PowerShell:
   $body = @{
       email = "test@example.com"
       name = "Test User"
   } | ConvertTo-Json

   Invoke-WebRequest -Uri "http://localhost:3000/api/trpc/newsletter.subscribe" `
     -Method POST `
     -ContentType "application/json" `
     -Body $body
   ```

---

## Success Indicators

✅ All of these should be true:
- [ ] MySQL is running
- [ ] Database "orkestra" exists
- [ ] `pnpm run db:push` completed without errors
- [ ] Dev server shows "Server running on http://localhost:3000/"
- [ ] Newsletter form works
- [ ] Contact form works
- [ ] Application form works
- [ ] Admin panel loads with data

---

## Need More Help?

Check these files for additional details:
- `DEPLOYMENT_SUMMARY.md` - Full deployment guide
- `FIX_NOTES.md` - Technical fixes applied
- `README.md` - General project info
