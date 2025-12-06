# Admin Dashboard Deployment Guide (Render)

## What This Is
This is the **ADMIN DASHBOARD** where you manage all appointments.
It includes the backend API that both client and admin use.

## Deployment Steps

### 1. Push to GitHub
Already done ✅
Repository: `https://github.com/BakesTheDeveloper/autustrade-schedule-admin-side.git`

### 2. Deploy to Render

1. Go to https://dashboard.render.com
2. Click **New +** → **Web Service**
3. Connect GitHub repository: `autustrade-schedule-admin-side`
4. Configure:
   - **Name:** `autustrade-admin` (or your choice)
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free
5. Click **Create Web Service**

### 3. Wait for Deployment
- First deploy takes 2-5 minutes
- You'll get a URL like: `https://autustrade-admin.onrender.com`

### 4. Update Client API URL
Go to your client repository and update the API URL to point to this Render service.

## Access URLs
- **Admin Dashboard:** `https://autustrade-admin.onrender.com`
- **API Endpoint:** `https://autustrade-admin.onrender.com/api/appointments`

## Important Notes
- Free tier sleeps after 15 min of inactivity (first request takes ~30 sec to wake)
- Data stored in `appointments.json` file
- For production, consider upgrading to paid tier or using a database

## Security
✅ Admin has full access to view, edit, delete appointments  
✅ API is open (add authentication for production)
