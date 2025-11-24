# 🚂 Railway Database Setup Guide

Complete guide to setting up Railway MySQL database for Orkestra Ventures.

---

## 🎯 Why Railway?

✅ **$5 free credit** - No credit card required  
✅ **2-minute setup** - Fastest database setup  
✅ **MySQL included** - Fully managed database  
✅ **Automatic backups** - Daily backups included  
✅ **Easy to use** - Simple dashboard  
✅ **Great for startups** - Perfect for small to medium projects  

---

## 📋 Step-by-Step Setup

### Step 1: Create Railway Account (1 minute)

1. Go to **https://railway.app**
2. Click **"Login"** or **"Start a New Project"**
3. Choose **"Login with GitHub"**
4. Authorize Railway to access your GitHub account
5. You're logged in! ✅

**Free Credit:** You automatically get **$5 free credit** (no credit card needed)

---

### Step 2: Create MySQL Database (1 minute)

1. Click **"New Project"** button
2. Select **"Provision MySQL"** from the list
3. Wait 30-60 seconds for provisioning...
4. You'll see a MySQL service card appear ✅

**Your database is now running!**

---

### Step 3: Get Connection String (30 seconds)

1. Click on the **MySQL service card**
2. Go to **"Variables"** tab (top menu)
3. Scroll down to find **"MYSQL_URL"**
4. Click the **copy icon** next to MYSQL_URL
5. Save this URL - you'll need it for Vercel! ✅

**Connection string format:**
```
mysql://root:PASSWORD@containers-us-west-123.railway.app:7654/railway
```

**Important:** Keep this URL secure - it contains your database password!

---

## 🔧 Understanding Railway Variables

Railway provides several connection variables:

| Variable | Description | Use Case |
|----------|-------------|----------|
| `MYSQL_URL` | **Complete connection string** | ✅ Use this for Vercel |
| `MYSQL_HOST` | Database host | Manual configuration |
| `MYSQL_PORT` | Database port | Manual configuration |
| `MYSQL_USER` | Database username | Manual configuration |
| `MYSQL_PASSWORD` | Database password | Manual configuration |
| `MYSQL_DATABASE` | Database name | Manual configuration |

**For Vercel deployment, you only need `MYSQL_URL`!**

---

## 📊 Railway Dashboard Overview

### Service Overview Tab
- **Status**: Shows if database is running (green = healthy)
- **Metrics**: CPU, Memory, Network usage
- **Deployments**: Deployment history

### Variables Tab
- **Connection strings**: MYSQL_URL and other variables
- **Custom variables**: Add your own environment variables
- **Shared variables**: Variables shared across services

### Settings Tab
- **Service name**: Rename your database
- **Region**: Change deployment region
- **Delete service**: Remove database (careful!)

### Metrics Tab
- **CPU usage**: Monitor CPU consumption
- **Memory usage**: Monitor RAM usage
- **Network**: Inbound/outbound traffic

### Logs Tab
- **Real-time logs**: See database activity
- **Error logs**: Debug connection issues
- **Query logs**: Monitor database queries

---

## 💰 Understanding Railway Pricing

### Free Credit
- **$5 free credit** on signup
- **No credit card required**
- **Lasts 2-3 months** for small projects

### Usage Calculation
Railway charges based on:
- **CPU usage**: ~$0.000463/min
- **Memory usage**: ~$0.000231/GB/min
- **Network egress**: ~$0.10/GB

### Typical Costs for Orkestra Ventures

| Usage Level | Monthly Cost |
|-------------|--------------|
| **Low** (< 100 visitors/day) | $3-5/month |
| **Medium** (100-500 visitors/day) | $5-10/month |
| **High** (500+ visitors/day) | $10-20/month |

### Monitoring Usage

1. Go to Railway dashboard
2. Click on your account (top right)
3. Go to **"Usage"**
4. See current credit balance and usage

**Tip:** Set up usage alerts in Settings → Notifications

---

## 🔒 Security Best Practices

### 1. Keep Connection String Secret
- ❌ Never commit to Git
- ❌ Never share publicly
- ✅ Only add to Vercel environment variables
- ✅ Use `.env.local` for local development

### 2. Use Environment Variables
```bash
# .env.local (never commit this file)
DATABASE_URL="mysql://root:password@host:port/railway"
```

### 3. Enable SSL (Automatic)
Railway MySQL connections use SSL by default. No configuration needed!

### 4. Regular Backups
Railway provides automatic daily backups. To manually backup:
1. Go to Railway dashboard
2. Click on MySQL service
3. Go to "Data" tab
4. Click "Create Backup"

---

## 🐛 Troubleshooting

### "Connection refused" error

**Cause:** Database is not running or wrong connection string

**Solution:**
1. Go to Railway dashboard
2. Check MySQL service status (should be green)
3. If stopped, click "Restart"
4. Copy MYSQL_URL again and update Vercel

### "Access denied" error

**Cause:** Wrong username or password in connection string

**Solution:**
1. Go to Railway dashboard → MySQL service
2. Go to "Variables" tab
3. Copy fresh MYSQL_URL
4. Update DATABASE_URL in Vercel
5. Redeploy

### "Too many connections" error

**Cause:** Connection pool exhausted

**Solution:**
1. Check if you have connection leaks in code
2. Restart MySQL service in Railway
3. Consider upgrading Railway plan for more connections

### Database is slow

**Possible causes:**
- High CPU/memory usage
- Large dataset
- Inefficient queries

**Solutions:**
1. Check Railway metrics for resource usage
2. Optimize database queries
3. Add indexes to frequently queried columns
4. Consider upgrading Railway plan

### Can't connect from local machine

**Cause:** Railway databases are private by default

**Solution:**
Use the MYSQL_URL connection string:
```bash
# Pull environment variables from Vercel
vercel env pull .env.local

# Now you can run migrations
pnpm run db:push
```

---

## 📈 Scaling Your Database

### When to Upgrade

Consider upgrading when:
- Free credit runs out
- Database is consistently slow
- High traffic (> 500 visitors/day)
- Large dataset (> 1GB)

### Upgrade Options

1. **Add credit card** to Railway account
2. **Pay-as-you-go** based on usage
3. **No fixed plans** - only pay for what you use

### Migration to Larger Database

If Railway becomes too expensive:

**Option 1: Planetscale (Free tier)**
- 5GB storage free
- Good for medium projects

**Option 2: AWS RDS**
- More control
- Better for large projects
- Requires more setup

**Option 3: Self-hosted**
- Cheapest for large scale
- Requires DevOps knowledge

---

## 🔄 Backup & Restore

### Automatic Backups

Railway provides automatic daily backups:
1. Go to Railway dashboard
2. Click on MySQL service
3. Go to "Data" tab
4. See "Backups" section

### Manual Backup

```bash
# Export database to SQL file
mysqldump -h HOST -P PORT -u USER -p DATABASE > backup.sql

# Get credentials from Railway Variables tab
```

### Restore from Backup

```bash
# Import SQL file to database
mysql -h HOST -P PORT -u USER -p DATABASE < backup.sql
```

---

## 📞 Railway Support

### Documentation
- **Official Docs**: https://docs.railway.app
- **MySQL Guide**: https://docs.railway.app/databases/mysql
- **Pricing**: https://railway.app/pricing

### Community Support
- **Discord**: https://discord.gg/railway
- **GitHub**: https://github.com/railwayapp/railway
- **Twitter**: @Railway

### Getting Help

1. Check Railway documentation
2. Search Railway Discord
3. Open GitHub issue
4. Email support: team@railway.app

---

## ✅ Quick Checklist

After setting up Railway:

- [ ] Created Railway account
- [ ] Provisioned MySQL database
- [ ] Copied MYSQL_URL connection string
- [ ] Added DATABASE_URL to Vercel
- [ ] Redeployed Vercel project
- [ ] Ran `pnpm run db:push` locally
- [ ] Tested forms on live site
- [ ] Checked Railway usage dashboard
- [ ] Set up usage alerts (optional)

---

## 🎯 Next Steps

1. **Add DATABASE_URL to Vercel**
   - See QUICK_START.md Step 3

2. **Run Database Migrations**
   - See QUICK_START.md Step 4

3. **Monitor Usage**
   - Check Railway dashboard weekly
   - Set up usage alerts

4. **Optimize Queries**
   - Monitor slow queries in Railway logs
   - Add indexes where needed

---

**Railway Setup Time:** 2 minutes  
**Free Credit:** $5  
**Typical Cost:** $3-10/month  
**Backup:** Automatic daily  
**Support:** Discord, Docs, Email  

**Railway is the easiest way to get started! 🚂**
