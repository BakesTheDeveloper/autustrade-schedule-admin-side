# Vercel Deployment Guide

## Quick Fix for Your Error

I've restructured the app for Vercel's serverless architecture. Here's what changed:

### New Files Created:
- `api/appointments.js` - Serverless function (replaces server.js)
- `vercel.json` - Vercel configuration
- Updated API URLs in client and admin JS files

## Deploy to Vercel

### Option 1: Via Vercel Dashboard (Easiest)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Configure for Vercel"
   git push
   ```

2. **Go to Vercel**
   - Visit https://vercel.com
   - Sign up/login with GitHub
   - Click "Add New Project"
   - Import your repository
   - Click "Deploy"

3. **Done!** Your app will be live at:
   ```
   https://your-project.vercel.app/client/index.html
   https://your-project.vercel.app/admin/index.html
   ```

### Option 2: Via Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

## Important Notes

### ⚠️ Data Storage Limitation

Vercel serverless functions use `/tmp` storage which is **temporary**. Your appointments will be lost when the function restarts.

### Solutions:

**Option A: Use Vercel KV (Redis) - Recommended**

1. Add Vercel KV to your project in dashboard
2. Install: `npm install @vercel/kv`
3. Update `api/appointments.js`:

```javascript
const { kv } = require('@vercel/kv');

async function readAppointments() {
    return await kv.get('appointments') || [];
}

async function writeAppointments(data) {
    await kv.set('appointments', data);
}
```

**Option B: Use MongoDB Atlas (Free)**

1. Create free cluster at https://mongodb.com/cloud/atlas
2. Get connection string
3. Add to Vercel environment variables
4. Install: `npm install mongodb`
5. Update API to use MongoDB

**Option C: Use Vercel Postgres**

1. Add Vercel Postgres in dashboard
2. Install: `npm install @vercel/postgres`
3. Update API to use database

## Testing Locally

```bash
# Install Vercel CLI
npm install -g vercel

# Run locally
vercel dev
```

Access at: http://localhost:3000

## Environment Variables

If using a database, add environment variables in Vercel dashboard:
- Settings → Environment Variables
- Add: `DATABASE_URL`, `MONGODB_URI`, etc.

## Troubleshooting

**Error: 500 FUNCTION_INVOCATION_FAILED**
- ✅ Fixed! The new structure should work

**Appointments disappear**
- Use Vercel KV or external database (see above)

**CORS errors**
- Already handled in `api/appointments.js`

## Recommended Setup

For production, use **Vercel KV**:

```bash
# In Vercel dashboard
Storage → Create KV Database
```

Then update `api/appointments.js` to use KV instead of file system.

## Next Steps

1. Deploy with current setup (works but data is temporary)
2. Add Vercel KV for persistent storage
3. Test your live URLs
4. Share your appointment system!
