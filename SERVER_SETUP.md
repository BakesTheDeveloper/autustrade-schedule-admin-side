# Server Setup Guide

This guide will help you set up the backend server to enable real-time synchronization between the client booking system and admin dashboard.

## Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

## Installation Steps

### 1. Install Node.js

If you don't have Node.js installed:

**macOS:**
```bash
# Using Homebrew
brew install node

# Or download from https://nodejs.org
```

**Windows:**
- Download the installer from https://nodejs.org
- Run the installer and follow the prompts

**Linux:**
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nodejs npm

# Fedora
sudo dnf install nodejs npm
```

### 2. Install Dependencies

Open a terminal in the project directory and run:

```bash
npm install
```

This will install:
- `express` - Web server framework
- `cors` - Enable cross-origin requests

### 3. Start the Server

Run the following command:

```bash
npm start
```

You should see:
```
Server running at http://localhost:3000
```

### 4. Access the Application

With the server running:

1. **Client Side (Booking):** Open `http://localhost:3000/client/index.html` in your browser
2. **Admin Dashboard:** Open `http://localhost:3000/admin/index.html` in your browser

## How It Works

### Data Flow

1. **Client books an appointment** → Sends data to server via POST request
2. **Server saves** → Stores appointment in `appointments.json` file
3. **Admin clicks Refresh** → Fetches all appointments from server
4. **Admin sees new appointments** → Displays in the dashboard table

### API Endpoints

The server provides these endpoints:

- `GET /api/appointments` - Get all appointments
- `POST /api/appointments` - Create new appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Delete appointment

### Data Storage

Appointments are stored in `appointments.json` in the project root directory. This file is automatically created when the server starts.

## Testing the System

### Test Client Booking:

1. Start the server (`npm start`)
2. Open `http://localhost:3000/client/index.html`
3. Fill out the booking form:
   - Select appointment type
   - Choose date and time
   - Enter your information
4. Click "Book Appointment"
5. You should see a confirmation message

### Test Admin Dashboard:

1. Open `http://localhost:3000/admin/index.html`
2. Click the "Refresh" button (🔄 icon)
3. You should see the appointment you just created
4. Try editing or deleting appointments

## Troubleshooting

### Server won't start

**Error: "Cannot find module 'express'"**
- Solution: Run `npm install` in the project directory

**Error: "Port 3000 is already in use"**
- Solution: Stop other applications using port 3000, or change the PORT in `server.js`

### Appointments not appearing

**Check these:**
1. Is the server running? Look for "Server running at..." message
2. Check browser console for errors (F12 → Console tab)
3. Make sure you're accessing via `http://localhost:3000` not `file://`

### CORS errors

If you see CORS errors in the browser console:
- Make sure the server is running
- Verify you're accessing the pages through `http://localhost:3000`

## Production Deployment

For production use, consider:

1. **Use a real database** (PostgreSQL, MongoDB, MySQL)
2. **Add authentication** for the admin dashboard
3. **Use environment variables** for configuration
4. **Deploy to a cloud service** (AWS, Heroku, DigitalOcean)
5. **Add HTTPS** for secure connections
6. **Implement email notifications** for appointment confirmations

## Stopping the Server

Press `Ctrl + C` in the terminal where the server is running.

## File Structure

```
appointment-system/
├── server.js              # Backend server
├── package.json           # Node.js dependencies
├── appointments.json      # Data storage (auto-created)
├── client/               # Client booking interface
│   ├── index.html
│   ├── css/styles.css
│   └── js/app.js
└── admin/                # Admin dashboard
    ├── index.html
    ├── css/styles.css
    └── js/app.js
```

## Support

If you encounter issues:
1. Check that Node.js is installed: `node --version`
2. Check that npm is installed: `npm --version`
3. Verify all dependencies are installed: `npm install`
4. Check the server console for error messages
5. Check browser console (F12) for client-side errors
