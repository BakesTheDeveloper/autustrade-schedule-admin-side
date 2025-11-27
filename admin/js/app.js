// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const mainContent = document.querySelector('.main-content');

// Toggle sidebar on mobile
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('show');
    });
}

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 1024 && !sidebar.contains(e.target) && e.target !== menuToggle) {
        sidebar.classList.remove('show');
    }
});

// Modal functionality
const modal = document.getElementById('appointmentModal');
const openModalBtn = document.getElementById('addAppointmentBtn');
const closeModalBtn = document.getElementById('closeModal');
const saveAppointmentBtn = document.getElementById('saveAppointment');
const appointmentForm = document.getElementById('appointmentForm');
let isEditMode = false;
let currentAppointmentId = null;

// Open modal
function openModal() {
    modal.classList.add('show');    
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    modal.classList.remove('show');
    appointmentForm.reset();
    isEditMode = false;
    currentAppointmentId = null;
    document.body.style.overflow = '';
}

// Event listeners for modal
if (openModalBtn) {
    openModalBtn.addEventListener('click', openModal);
}

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Format date for display
function formatDate(dateString) {
    const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Get status class based on status value
function getStatusClass(status) {
    switch (status.toLowerCase()) {
        case 'pending':
            return 'status-pending';
        case 'confirmed':
            return 'status-confirmed';
        case 'cancelled':
            return 'status-cancelled';
        default:
            return '';
    }
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Update statistics
function updateStats() {
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    
    document.getElementById('totalAppointments').textContent = appointments.length;
    document.getElementById('pendingAppointments').textContent = 
        appointments.filter(a => a.status === 'pending').length;
    document.getElementById('confirmedAppointments').textContent = 
        appointments.filter(a => a.status === 'confirmed').length;
    document.getElementById('cancelledAppointments').textContent = 
        appointments.filter(a => a.status === 'cancelled').length;
}

// Render appointments table
function renderAppointments() {
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const tbody = document.querySelector('#appointmentsTable tbody');
    
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    if (appointments.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" class="text-center py-4 text-gray-500">
                    No appointments found. Click "Add Appointment" to create one.
                </td>
            </tr>
        `;
        return;
    }
    
    // Sort appointments by date (newest first)
    const sortedAppointments = [...appointments].sort((a, b) => 
        new Date(b.date + ' ' + b.time) - new Date(a.date + ' ' + a.time)
    );
    
    sortedAppointments.forEach(appointment => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${appointment.name}</td>
            <td>${appointment.email}</td>
            <td>${appointment.phone}</td>
            <td>${formatDate(appointment.date + 'T' + appointment.time)}</td>
            <td>${appointment.type}</td>
            <td><span class="status ${getStatusClass(appointment.status)}">${appointment.status}</span></td>
            <td class="text-right">
                <button class="btn btn-edit btn-sm" onclick="editAppointment('${appointment.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-delete btn-sm" onclick="deleteAppointment('${appointment.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
    
    // Update statistics
    updateStats();
}

// Edit appointment
function editAppointment(id) {
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const appointment = appointments.find(a => a.id === id);
    
    if (!appointment) {
        showNotification('Appointment not found', 'error');
        return;
    }
    
    // Set form values
    document.getElementById('name').value = appointment.name || '';
    document.getElementById('email').value = appointment.email || '';
    document.getElementById('phone').value = appointment.phone || '';
    document.getElementById('date').value = appointment.date || '';
    document.getElementById('time').value = appointment.time || '';
    document.getElementById('type').value = appointment.type || 'consultation';
    document.getElementById('status').value = appointment.status || 'pending';
    document.getElementById('notes').value = appointment.notes || '';
    
    // Set edit mode
    isEditMode = true;
    currentAppointmentId = id;
    
    // Update modal title
    document.querySelector('.modal-title').textContent = 'Edit Appointment';
    
    // Open modal
    openModal();
}

// Delete appointment
function deleteAppointment(id) {
    if (!confirm('Are you sure you want to delete this appointment?')) {
        return;
    }
    
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const updatedAppointments = appointments.filter(a => a.id !== id);
    
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    
    showNotification('Appointment deleted successfully');
    renderAppointments();
}

// Save appointment (add or update)
function saveAppointment(e) {
    e.preventDefault();
    
    // Get form values
    const formData = new FormData(appointmentForm);
    const appointmentData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        date: formData.get('date'),
        time: formData.get('time'),
        type: formData.get('type'),
        status: formData.get('status'),
        notes: formData.get('notes'),
        createdAt: new Date().toISOString(),
        id: isEditMode ? currentAppointmentId : Date.now().toString()
    };
    
    // Basic validation
    if (!appointmentData.name || !appointmentData.email || !appointmentData.phone || 
        !appointmentData.date || !appointmentData.time) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(appointmentData.email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Save to localStorage
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    
    if (isEditMode) {
        // Update existing appointment
        const index = appointments.findIndex(a => a.id === currentAppointmentId);
        if (index !== -1) {
            appointments[index] = appointmentData;
        }
    } else {
        // Add new appointment
        appointments.push(appointmentData);
    }
    
    localStorage.setItem('appointments', JSON.stringify(appointments));
    
    // Show success message
    showNotification(`Appointment ${isEditMode ? 'updated' : 'created'} successfully`);
    
    // Close modal and refresh the list
    closeModal();
    renderAppointments();
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    // Initialize date picker with min date as today
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('date');
    if (dateInput) {
        dateInput.min = today;
    }
    
    // Set default time to next hour
    const timeInput = document.getElementById('time');
    if (timeInput) {
        const now = new Date();
        const nextHour = new Date(now.getTime() + 60 * 60 * 1000);
        timeInput.value = `${String(nextHour.getHours()).padStart(2, '0')}:${String(nextHour.getMinutes()).padStart(2, '0')}`;
    }
    
    // Set default status to pending
    const statusInput = document.getElementById('status');
    if (statusInput) {
        statusInput.value = 'pending';
    }
    
    // Set default type to consultation
    const typeInput = document.getElementById('type');
    if (typeInput) {
        typeInput.value = 'consultation';
    }
    
    // Add event listener for form submission
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', saveAppointment);
    }
    
    // Initial render
    renderAppointments();
});
