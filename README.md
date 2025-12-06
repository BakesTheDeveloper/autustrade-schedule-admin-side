# Autus Trades Appointment System

A modern, responsive appointment booking system with separate client and admin interfaces. This system allows clients to book appointments and administrators to manage them efficiently with real-time synchronization.

## Features

### Client Side
- Intuitive appointment booking interface
- Multi-step booking process
- Real-time availability checking
- Email confirmation
- Responsive design for all devices

### Admin Dashboard
- Comprehensive appointment management
- Real-time appointment updates with refresh button
- Calendar view of appointments
- Client management
- Statistics and reporting
- Responsive admin interface

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js, Express
- **Storage**: JSON file storage (easily upgradeable to database)
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Inter)

## Project Structure

```
appointment-system/
├── server.js              # Backend API server
├── package.json           # Node.js dependencies
├── appointments.json      # Data storage (auto-created)
├── admin/                 # Admin dashboard files
│   ├── css/
│   │   └── styles.css     # Admin styles
│   ├── js/
│   │   └── app.js        # Admin JavaScript
│   └── index.html         # Admin dashboard
├── client/                # Client-facing files
│   ├── css/
│   │   └── styles.css     # Client styles
│   ├── js/
│   │   └── app.js        # Client JavaScript
│   └── index.html         # Client booking page
├── README.md             # This file
├── SETUP.md              # Setup and installation guide
└── SERVER_SETUP.md       # Server setup instructions
```

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Server

```bash
npm start
```

### 3. Access the Application

- **Client Booking:** http://localhost:3000/client/index.html
- **Admin Dashboard:** http://localhost:3000/admin/index.html

For detailed setup instructions, see [SERVER_SETUP.md](SERVER_SETUP.md).

## How It Works

1. **Client books appointment** → Data sent to server
2. **Server stores appointment** → Saved in appointments.json
3. **Admin clicks Refresh** → Loads all appointments from server
4. **Real-time sync** → New appointments appear immediately after refresh

## Key Features

### Client Side
- Step-by-step booking wizard
- Date and time slot selection
- Form validation
- Confirmation page with booking details

### Admin Side
- View all appointments in a table
- **Refresh button** to load new appointments
- Edit existing appointments
- Delete appointments
- Status management (Pending, Confirmed, Cancelled, Completed)
- Statistics dashboard

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
