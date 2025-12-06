const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'appointments.json');

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Initialize data file
async function initDataFile() {
    try {
        await fs.access(DATA_FILE);
    } catch {
        await fs.writeFile(DATA_FILE, '[]');
    }
}

// Get all appointments
app.get('/api/appointments', async (req, res) => {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ error: 'Failed to read appointments' });
    }
});

// Create appointment
app.post('/api/appointments', async (req, res) => {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        const appointments = JSON.parse(data);
        const newAppointment = {
            ...req.body,
            id: Date.now().toString(),
            createdAt: new Date().toISOString()
        };
        appointments.push(newAppointment);
        await fs.writeFile(DATA_FILE, JSON.stringify(appointments, null, 2));
        res.status(201).json(newAppointment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create appointment' });
    }
});

// Update appointment
app.put('/api/appointments/:id', async (req, res) => {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        const appointments = JSON.parse(data);
        const index = appointments.findIndex(a => a.id === req.params.id);
        if (index === -1) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
        appointments[index] = { ...appointments[index], ...req.body };
        await fs.writeFile(DATA_FILE, JSON.stringify(appointments, null, 2));
        res.json(appointments[index]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update appointment' });
    }
});

// Delete appointment
app.delete('/api/appointments/:id', async (req, res) => {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        const appointments = JSON.parse(data);
        const filtered = appointments.filter(a => a.id !== req.params.id);
        await fs.writeFile(DATA_FILE, JSON.stringify(filtered, null, 2));
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete appointment' });
    }
});

initDataFile().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
});
