# Autus Trades Admin Dashboard

Admin dashboard for managing appointments with real-time synchronization.

## Features

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
admin-dashboard/
├── server.js              # Backend API server
├── package.json           # Node.js dependencies
├── appointments.json      # Data storage (auto-created)
├── css/
│   └── styles.css         # Admin styles
├── js/
│   └── app.js            # Admin JavaScript
└── index.html             # Admin dashboard
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

- **Admin Dashboard:** http://localhost:3000

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
