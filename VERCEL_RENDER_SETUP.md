# Vercel (Frontend) + Render (Backend) Setup

## Setup Steps

### 1. Deploy Backend to Render

1. **Push your code to GitHub** (if not already done)

2. **Go to Render Dashboard** (https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: `appointment-system-api` (or your choice)
     - **Environment**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
   - Click "Create Web Service"

3. **Wait for deployment** - You'll get a URL like:
   ```
   https://appointment-system-api.onrender.com
   ```

4. **Copy your Render URL** - You'll need it for the next step

### 2. Update Frontend Code

Replace `your-render-app-name` with your actual Render app name in:

**In `client/js/app.js`:**
```javascript
const API_URL = 'https://YOUR-ACTUAL-RENDER-URL.onrender.com/api/appointments';
```

**In `admin/js/app.js`:**
```javascript
const API_URL = 'https://YOUR-ACTUAL-RENDER-URL.onrender.com/api/appointments';
```

Example:
```javascript
const API_URL = 'https://appointment-system-api.onrender.com/api/appointments';
```

### 3. Deploy Frontend to Vercel

1. **Commit your changes**
   ```bash
   git add .
   git commit -m "Update API URL for Render backend"
   git push
   ```

2. **Vercel will auto-deploy** (if already connected)
   - Or manually trigger deployment in Vercel dashboard

3. **Your app is live!**
   - Frontend: `https://your-project.vercel.app/client/index.html`
   - Backend: `https://your-render-app.onrender.com`

## Important: CORS Configuration

Make sure your `server.js` has CORS enabled (it already does):

```javascript
const cors = require('cors');
app.use(cors());
```

This allows your Vercel frontend to communicate with your Render backend.

## Testing

1. **Test backend directly:**
   ```
   https://your-render-app.onrender.com/api/appointments
   ```
   Should return `[]` or your appointments

2. **Test frontend:**
   - Go to your Vercel URL
   - Book an appointment
   - Check admin dashboard
   - Click refresh to see new appointments

## Troubleshooting

### Error: Failed to fetch / CORS error
- Check that CORS is enabled in `server.js`
- Verify your Render URL is correct in the frontend code
- Make sure Render backend is running (check Render dashboard)

### Appointments not appearing
- Check browser console (F12) for errors
- Verify API URL is correct
- Test backend URL directly in browser
- Click "Refresh" button on admin dashboard

### Render backend sleeping
- Free tier Render apps sleep after 15 minutes of inactivity
- First request after sleep takes ~30 seconds to wake up
- Upgrade to paid plan ($7/month) to prevent sleeping

## File Structure

```
Vercel (Frontend):
├── client/
│   ├── index.html
│   ├── css/styles.css
│   └── js/app.js  ← Points to Render backend
└── admin/
    ├── index.html
    ├── css/styles.css
    └── js/app.js  ← Points to Render backend

Render (Backend):
├── server.js      ← Your API server
├── package.json
└── appointments.json  ← Data storage
```

## Quick Reference

**Your URLs:**
- Vercel Frontend: `https://[your-project].vercel.app`
- Render Backend: `https://[your-app].onrender.com`
- API Endpoint: `https://[your-app].onrender.com/api/appointments`

**Update these files with your Render URL:**
- `client/js/app.js`
- `admin/js/app.js`

Then commit and push to deploy!
