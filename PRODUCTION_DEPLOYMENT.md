# Production Deployment Guide

This guide explains how to deploy your appointment system to a real server (not localhost) so it's accessible from anywhere on the internet.

## Deployment Options

### Option 1: Heroku (Easiest - Free Tier Available)

#### Prerequisites
- Heroku account (sign up at https://heroku.com)
- Git installed

#### Steps

1. **Install Heroku CLI**
   ```bash
   # macOS
   brew tap heroku/brew && brew install heroku
   
   # Windows - Download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Prepare your app**
   
   Update `server.js` to use environment port:
   ```javascript
   const PORT = process.env.PORT || 3000;
   ```

4. **Create Heroku app**
   ```bash
   cd /path/to/appointment-system
   heroku create your-app-name
   ```

5. **Deploy**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

6. **Update frontend URLs**
   
   In `client/js/app.js` and `admin/js/app.js`, change:
   ```javascript
   // From:
   const API_URL = 'http://localhost:3000/api/appointments';
   
   // To:
   const API_URL = 'https://your-app-name.herokuapp.com/api/appointments';
   ```

7. **Access your app**
   ```
   https://your-app-name.herokuapp.com/client/index.html
   https://your-app-name.herokuapp.com/admin/index.html
   ```

---

### Option 2: DigitalOcean (More Control - $5/month)

#### Prerequisites
- DigitalOcean account
- Basic Linux knowledge

#### Steps

1. **Create a Droplet**
   - Go to DigitalOcean dashboard
   - Create Droplet → Ubuntu 22.04
   - Choose $5/month plan
   - Add SSH key

2. **Connect to server**
   ```bash
   ssh root@your_server_ip
   ```

3. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   apt-get install -y nodejs
   ```

4. **Install PM2 (Process Manager)**
   ```bash
   npm install -g pm2
   ```

5. **Upload your code**
   ```bash
   # On your local machine
   scp -r /path/to/appointment-system root@your_server_ip:/var/www/
   ```

6. **Start the app**
   ```bash
   # On the server
   cd /var/www/appointment-system
   npm install
   pm2 start server.js --name appointment-system
   pm2 startup
   pm2 save
   ```

7. **Setup Nginx (Web Server)**
   ```bash
   apt-get install nginx
   ```
   
   Create config: `/etc/nginx/sites-available/appointment-system`
   ```nginx
   server {
       listen 80;
       server_name your_domain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
   
   Enable site:
   ```bash
   ln -s /etc/nginx/sites-available/appointment-system /etc/nginx/sites-enabled/
   nginx -t
   systemctl restart nginx
   ```

8. **Setup SSL (HTTPS)**
   ```bash
   apt-get install certbot python3-certbot-nginx
   certbot --nginx -d your_domain.com
   ```

9. **Update frontend URLs**
   ```javascript
   const API_URL = 'https://your_domain.com/api/appointments';
   ```

---

### Option 3: AWS EC2 (Enterprise - Free Tier Available)

#### Steps

1. **Launch EC2 Instance**
   - Go to AWS Console → EC2
   - Launch Instance → Ubuntu 22.04
   - t2.micro (free tier)
   - Create/select key pair
   - Allow HTTP (80) and HTTPS (443) in security group

2. **Connect and setup**
   ```bash
   ssh -i your-key.pem ubuntu@your_ec2_ip
   ```

3. **Follow same steps as DigitalOcean** (steps 3-9 above)

---

### Option 4: Render (Easy - Free Tier)

#### Steps

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/appointment-system.git
   git push -u origin main
   ```

2. **Create Render account** at https://render.com

3. **Create Web Service**
   - New → Web Service
   - Connect GitHub repository
   - Name: appointment-system
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Create Web Service

4. **Update frontend URLs**
   ```javascript
   const API_URL = 'https://your-app-name.onrender.com/api/appointments';
   ```

5. **Access your app**
   ```
   https://your-app-name.onrender.com/client/index.html
   https://your-app-name.onrender.com/admin/index.html
   ```

---

## Required Code Changes for Production

### 1. Update `server.js`

```javascript
const PORT = process.env.PORT || 3000;

// Add this for production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname));
}
```

### 2. Create environment variable file

Create `.env` file:
```
NODE_ENV=production
PORT=3000
```

Install dotenv:
```bash
npm install dotenv
```

Update `server.js`:
```javascript
require('dotenv').config();
```

### 3. Update API URLs in frontend

Create `config.js` in both `client/js/` and `admin/js/`:

```javascript
const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000/api/appointments'
    : 'https://your-production-domain.com/api/appointments';
```

Then use `API_URL` in your code.

---

## Comparison Table

| Platform | Cost | Ease | Best For |
|----------|------|------|----------|
| **Heroku** | Free tier available | ⭐⭐⭐⭐⭐ Easiest | Quick deployment, testing |
| **Render** | Free tier available | ⭐⭐⭐⭐⭐ Easiest | Modern alternative to Heroku |
| **DigitalOcean** | $5/month | ⭐⭐⭐ Moderate | Full control, scalability |
| **AWS EC2** | Free tier 1 year | ⭐⭐ Complex | Enterprise, AWS ecosystem |

---

## Recommended: Start with Render or Heroku

For beginners, I recommend **Render** because:
- ✅ Free tier (no credit card required)
- ✅ Automatic deployments from GitHub
- ✅ Built-in SSL
- ✅ Easy to use
- ✅ No server management needed

---

## Database Upgrade (Optional)

For production, consider upgrading from JSON file to a real database:

### MongoDB Atlas (Free Tier)

1. Create account at https://mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Install mongoose: `npm install mongoose`
5. Update `server.js` to use MongoDB instead of JSON file

### PostgreSQL (Heroku/Render)

Both Heroku and Render offer free PostgreSQL databases:
- Add PostgreSQL addon
- Install `pg`: `npm install pg`
- Update `server.js` to use PostgreSQL

---

## Security Checklist

Before going live:

- [ ] Add admin authentication
- [ ] Use HTTPS (SSL certificate)
- [ ] Add rate limiting
- [ ] Validate all inputs
- [ ] Use environment variables for secrets
- [ ] Add CORS restrictions
- [ ] Regular backups of appointments.json
- [ ] Monitor server logs

---

## Next Steps

1. Choose a deployment platform
2. Follow the steps for that platform
3. Update API URLs in your frontend code
4. Test thoroughly
5. Share your live URL!

## Support

- Heroku Docs: https://devcenter.heroku.com
- Render Docs: https://render.com/docs
- DigitalOcean Tutorials: https://www.digitalocean.com/community/tutorials
