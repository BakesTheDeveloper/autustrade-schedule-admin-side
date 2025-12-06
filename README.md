# Autus Trades Appointment System

Complete appointment booking system with client booking interface and admin dashboard.

## Features

### Client Side
- Simple appointment booking form
- Real-time submission to server
- Email and phone validation

### Admin Dashboard
- Comprehensive appointment management
- Real-time appointment updates with refresh button
- Edit and delete appointments
- Status management (Pending, Confirmed, Cancelled, Completed)
- Statistics dashboard

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
├── appointments.json      # Data storage
├── client/                # Client booking interface
│   ├── index.html
│   ├── styles.css
│   └── app.js
└── admin/                 # Admin dashboard
    ├── index.html
    ├── css/styles.css
    └── js/app.js
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

- **Client Booking:** http://localhost:3000
- **Admin Dashboard:** http://localhost:3000/admin

## Key Features

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
