# Setup Guide for Autus Trades Appointment System

This guide will help you set up and deploy the Autus Trades Appointment System on your local machine or web server.

## Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- A text editor (VS Code, Sublime Text, etc.)
- (Optional) A local web server (like Live Server in VS Code, XAMPP, or MAMP)

## Local Setup

### 1. Clone the Repository

```bash
git clone [your-repository-url]
cd appointment-system
```

### 2. Project Structure

The project has two main directories:
- `client/` - Contains the client-facing booking interface
- `admin/` - Contains the admin dashboard

## Running the Application

### Option 1: Direct File Access
1. Simply open the following files in your web browser:
   - Client: `client/index.html`
   - Admin: `admin/index.html`

### Option 2: Using a Local Server (Recommended)
1. **Using VS Code with Live Server**
   - Install the "Live Server" extension in VS Code
   - Right-click on `index.html` in either the client or admin folder
   - Select "Open with Live Server"

2. **Using Python's Built-in Server**
   ```bash
   # Navigate to the project root
   python -m http.server 8000
   # Then visit http://localhost:8000/client/ or http://localhost:8000/admin/
   ```

## Configuration

### Client Configuration
Edit `client/js/app.js` to configure:
- Available time slots
- Business hours
- Form validation rules
- Confirmation email settings (if implemented with a backend)

### Admin Configuration
Edit `admin/js/app.js` to configure:
- Admin credentials (for demo purposes only - implement proper authentication for production)
- Default settings
- Notification preferences

## Data Storage

This demo uses the browser's LocalStorage to persist data. In a production environment, you would typically connect to a backend API.

### Resetting Data
To clear all stored data:
1. Open your browser's developer tools (F12)
2. Go to the Application/Storage tab
3. Find and clear LocalStorage for your domain

## Deployment

### Static Hosting
You can deploy this application to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting

### Steps for Netlify Deployment
1. Push your code to a GitHub repository
2. Sign in to Netlify
3. Click "New site from Git"
4. Select your repository
5. Set the publish directory to the project root
6. Click "Deploy site"

## Security Considerations

For production use, consider the following:
1. Implement proper user authentication
2. Move sensitive logic to a backend server
3. Replace LocalStorage with a proper database
4. Implement CSRF protection
5. Set up HTTPS

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - These occur when trying to load resources from different origins
   - Solution: Use a local server instead of direct file access

2. **Styles Not Loading**
   - Check browser console for 404 errors
   - Verify file paths in your HTML files

3. **LocalStorage Not Persisting**
   - Ensure cookies and site data are enabled in your browser
   - Try in a private/incognito window to rule out extension conflicts

---

*Last updated: November 2025*
