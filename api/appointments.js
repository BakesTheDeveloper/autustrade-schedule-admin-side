const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join('/tmp', 'appointments.json');

function readAppointments() {
    try {
        if (!fs.existsSync(DATA_FILE)) {
            fs.writeFileSync(DATA_FILE, '[]');
        }
        return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    } catch {
        return [];
    }
}

function writeAppointments(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const appointments = readAppointments();

        if (req.method === 'GET') {
            return res.status(200).json(appointments);
        }

        if (req.method === 'POST') {
            const newAppointment = {
                ...req.body,
                id: Date.now().toString(),
                createdAt: new Date().toISOString()
            };
            appointments.push(newAppointment);
            writeAppointments(appointments);
            return res.status(201).json(newAppointment);
        }

        if (req.method === 'PUT') {
            const id = req.query.id;
            const index = appointments.findIndex(a => a.id === id);
            if (index === -1) {
                return res.status(404).json({ error: 'Not found' });
            }
            appointments[index] = { ...appointments[index], ...req.body };
            writeAppointments(appointments);
            return res.status(200).json(appointments[index]);
        }

        if (req.method === 'DELETE') {
            const id = req.query.id;
            const filtered = appointments.filter(a => a.id !== id);
            writeAppointments(filtered);
            return res.status(200).json({ success: true });
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
