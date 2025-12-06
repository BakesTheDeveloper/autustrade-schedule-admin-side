const API_URL = 'https://autustrade-schedule.onrender.com';

const modal = document.getElementById('appointmentModal');
const openModalBtn = document.getElementById('addAppointmentBtn');
const closeModalBtn = document.getElementById('closeModal');
const cancelBtn = document.getElementById('cancelAppointment');
const saveAppointmentBtn = document.getElementById('saveAppointment');
const appointmentForm = document.getElementById('appointmentForm');
let isEditMode = false;
let currentAppointmentId = null;

function openModal() {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('show');
    appointmentForm.reset();
    isEditMode = false;
    currentAppointmentId = null;
    document.body.style.overflow = '';
}

if (openModalBtn) openModalBtn.addEventListener('click', openModal);
if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

window.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

function formatDateTime(date, time) {
    const dateObj = new Date(`${date}T${time}`);
    return dateObj.toLocaleString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric',
        hour: '2-digit', 
        minute: '2-digit' 
    });
}

function getStatusBadge(status) {
    const badges = {
        pending: '<span class="badge badge-warning">Pending</span>',
        confirmed: '<span class="badge badge-success">Confirmed</span>',
        cancelled: '<span class="badge badge-danger">Cancelled</span>',
        completed: '<span class="badge badge-info">Completed</span>'
    };
    return badges[status] || badges.pending;
}

async function loadAppointments() {
    try {
        const response = await fetch(API_URL);
        const appointments = await response.json();
        renderAppointments(appointments);
        updateStats(appointments);
    } catch (error) {
        console.error('Error loading appointments:', error);
        alert('Failed to load appointments. Make sure the server is running.');
    }
}

function renderAppointments(appointments) {
    const tbody = document.getElementById('appointmentsTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    if (appointments.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 2rem;">No appointments found</td></tr>';
        return;
    }
    
    appointments.sort((a, b) => new Date(`${b.date}T${b.time}`) - new Date(`${a.date}T${a.time}`));
    
    appointments.forEach(apt => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${apt.name}</td>
            <td>${apt.type}</td>
            <td>${formatDateTime(apt.date, apt.time)}</td>
            <td>${apt.email}<br><small>${apt.phone}</small></td>
            <td>${getStatusBadge(apt.status)}</td>
            <td>
                <button class="btn-icon" onclick="editAppointment('${apt.id}')" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon" onclick="deleteAppointment('${apt.id}')" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function updateStats(appointments) {
    const stats = {
        total: appointments.length,
        pending: appointments.filter(a => a.status === 'pending').length,
        confirmed: appointments.filter(a => a.status === 'confirmed').length,
        cancelled: appointments.filter(a => a.status === 'cancelled').length
    };
    
    const statCards = document.querySelectorAll('.stat-card .stat-info h3');
    if (statCards.length >= 4) {
        statCards[0].textContent = stats.total;
        statCards[1].textContent = stats.confirmed;
        statCards[2].textContent = stats.pending;
        statCards[3].textContent = stats.cancelled;
    }
}

async function editAppointment(id) {
    try {
        const response = await fetch(API_URL);
        const appointments = await response.json();
        const apt = appointments.find(a => a.id === id);
        
        if (!apt) {
            alert('Appointment not found');
            return;
        }
        
        document.getElementById('clientName').value = apt.name;
        document.getElementById('appointmentType').value = apt.type;
        document.getElementById('appointmentDate').value = apt.date;
        document.getElementById('appointmentTime').value = apt.time;
        document.getElementById('clientEmail').value = apt.email;
        document.getElementById('clientPhone').value = apt.phone;
        document.getElementById('appointmentStatus').value = apt.status;
        document.getElementById('appointmentNotes').value = apt.notes || '';
        
        isEditMode = true;
        currentAppointmentId = id;
        document.querySelector('.modal-title').textContent = 'Edit Appointment';
        openModal();
    } catch (error) {
        console.error('Error loading appointment:', error);
        alert('Failed to load appointment');
    }
}

async function deleteAppointment(id) {
    if (!confirm('Delete this appointment?')) return;
    
    try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        loadAppointments();
    } catch (error) {
        console.error('Error deleting appointment:', error);
        alert('Failed to delete appointment');
    }
}

if (saveAppointmentBtn) {
    saveAppointmentBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        
        const data = {
            name: document.getElementById('clientName').value,
            type: document.getElementById('appointmentType').value,
            date: document.getElementById('appointmentDate').value,
            time: document.getElementById('appointmentTime').value,
            email: document.getElementById('clientEmail').value,
            phone: document.getElementById('clientPhone').value,
            status: document.getElementById('appointmentStatus').value,
            notes: document.getElementById('appointmentNotes').value
        };
        
        if (!data.name || !data.type || !data.date || !data.time || !data.email || !data.phone) {
            alert('Please fill in all required fields');
            return;
        }
        
        try {
            const url = isEditMode ? `${API_URL}/${currentAppointmentId}` : API_URL;
            const method = isEditMode ? 'PUT' : 'POST';
            
            await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            
            closeModal();
            loadAppointments();
        } catch (error) {
            console.error('Error saving appointment:', error);
            alert('Failed to save appointment');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('appointmentDate');
    if (dateInput) dateInput.min = today;
    
    loadAppointments();
});

window.editAppointment = editAppointment;
window.deleteAppointment = deleteAppointment;
