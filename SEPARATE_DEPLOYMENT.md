# Deploy Client and Admin Separately

Yes! Both frontends can share the same Render backend. Here's how:

## Structure

```
Backend (Render):
└── Your existing server.js
    URL: https://your-backend.onrender.com

Client Frontend (Vercel #1):
└── client-only/ folder
    URL: https://client.vercel.app

Admin Frontend (Vercel #2):
└── admin-only/ folder
    URL: https://admin.vercel.app
```

## Setup Steps

### 1. Backend (Already Done on Render)

Your backend is already deployed. Just note the URL:
```
https://your-backend.onrender.com
```

### 2. Deploy Client Frontend

**Option A: Create new GitHub repo**
```bash
cd client-only
git init
git add .
git commit -m "Client frontend"
git remote add origin https://github.com/yourusername/appointment-client.git
git push -u origin main
```

Then in Vercel:
- Import this new repo
- Framework: **Other**
- Deploy

**Option B: Deploy from local folder**
```bash
cd client-only
vercel
```

### 3. Deploy Admin Frontend

**Option A: Create new GitHub repo**
```bash
cd admin-only
git init
git add .
git commit -m "Admin frontend"
git remote add origin https://github.com/yourusername/appointment-admin.git
git push -u origin main
```

Then in Vercel:
- Import this new repo
- Framework: **Other**
- Deploy

**Option B: Deploy from local folder**
```bash
cd admin-only
vercel
```

### 4. Update API URLs

**In `client-only/app.js`:**
```javascript
const API_URL = 'https://YOUR-RENDER-BACKEND.onrender.com/api/appointments';
```

**In `admin-only/app.js`:**
```javascript
const API_URL = 'https://YOUR-RENDER-BACKEND.onrender.com/api/appointments';
```

Replace `YOUR-RENDER-BACKEND` with your actual Render URL.

## Result

You'll have 3 separate URLs:

1. **Client Booking**: `https://appointment-client.vercel.app`
2. **Admin Dashboard**: `https://appointment-admin.vercel.app`
3. **Backend API**: `https://your-backend.onrender.com`

Both frontends talk to the same backend = shared data!

## Folder Structure Created

I've created two new folders for you:

```
appointment-system/
├── client-only/          ← Deploy this to Vercel #1
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── admin-only/           ← Deploy this to Vercel #2
│   ├── index.html
│   ├── styles.css
│   └── app.js
└── server.js            ← Already on Render
```

## Quick Deploy Commands

```bash
# Deploy client
cd client-only
vercel

# Deploy admin (in new terminal)
cd admin-only
vercel
```

## Benefits

✅ Separate URLs for client and admin
✅ Can update each independently
✅ Share same backend/database
✅ Better security (admin on different domain)
✅ Easier to manage

## Important

Make sure both `app.js` files point to your Render backend URL!
