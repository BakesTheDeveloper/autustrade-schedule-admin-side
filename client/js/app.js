// Sample data for available time slots
const availableSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM'
];

// DOM Elements
const nextBtn = document.getElementById('next-step-1');
const prevBtn = document.getElementById('back-to-step-1');
const submitBtn = document.getElementById('book-appointment');
const timeSlotsContainer = document.querySelector('.time-slots');
const appointmentType = document.getElementById('appointment-type');
const appointmentDate = document.getElementById('appointment-date');
const nameInput = document.getElementById('full-name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const notesInput = document.getElementById('notes');

// Application state
let selectedTimeSlot = null;
let currentStep = 1;

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    if (appointmentDate) {
        appointmentDate.min = today;
        
        // Set default date to tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        appointmentDate.value = tomorrow.toISOString().split('T')[0];
    }
    
    // Initialize time slots
    generateTimeSlots();
    
    // Setup navigation
    setupNavigation();
    
    // Update step indicator
    updateStepIndicator(1);
});

// Generate time slots (mock data)
function generateTimeSlots() {
    if (!timeSlotsContainer) return;
    
    timeSlotsContainer.innerHTML = '';
    const selectedDate = new Date(appointmentDate.value);
    const today = new Date();
    const isToday = selectedDate.toDateString() === today.toDateString();
    const currentHour = today.getHours();
    
    availableSlots.forEach(slot => {
        const slotHour = parseInt(slot.split(':')[0]);
        const isPastSlot = isToday && (slotHour < currentHour);
        
        const slotElement = document.createElement('button');
        slotElement.type = 'button';
        slotElement.className = `time-slot ${isPastSlot ? 'disabled' : ''}`;
        slotElement.textContent = slot;
        slotElement.disabled = isPastSlot;
        
        if (!isPastSlot) {
            slotElement.addEventListener('click', () => {
                document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
                slotElement.classList.add('selected');
                selectedTimeSlot = slot;
            });
        }
        
        timeSlotsContainer.appendChild(slotElement);
    });
}

// Setup navigation between steps
function setupNavigation() {
    // Next button (step 1 -> step 2)
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Validate step 1 fields
            if (!appointmentType.value || !appointmentDate.value || !selectedTimeSlot) {
                alert('Please select appointment type, date, and time slot');
                return;
            }
            
            document.getElementById('step-1').style.display = 'none';
            document.getElementById('step-2').style.display = 'block';
            updateStepIndicator(2);
        });
    }
    
    // Back button (step 2 -> step 1)
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('step-2').style.display = 'none';
            document.getElementById('step-1').style.display = 'block';
            updateStepIndicator(1);
        });
    }
    
    // Book Appointment button (step 2 -> step 3)
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get form values
            const nameValue = nameInput ? nameInput.value : '';
            const emailValue = emailInput ? emailInput.value : '';
            const phoneValue = phoneInput ? phoneInput.value : '';
            
            // Validate required fields
            if (!nameValue || !emailValue || !phoneValue) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailValue)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Validate phone number (basic validation)
            const phoneRegex = /^[0-9\-\+\(\)\s]{10,}$/;
            if (!phoneRegex.test(phoneValue)) {
                alert('Please enter a valid phone number');
                return;
            }
            
            // Handle form submission
            submitAppointment();
        });
    }
    
    // When date changes, update available time slots
    if (appointmentDate) {
        appointmentDate.addEventListener('change', function() {
            generateTimeSlots();
            if (nextBtn) nextBtn.disabled = true;
        });
    }
    
    // When time slot is selected, enable next button
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('time-slot') && !e.target.classList.contains('disabled')) {
            if (nextBtn) nextBtn.disabled = false;
        }
    });
}

// Handle form submission
function submitAppointment() {
    // Check if all required fields are present
    if (!appointmentType || !appointmentDate || !selectedTimeSlot || !nameInput || !emailInput || !phoneInput) {
        console.error('Required form elements not found');
        return;
    }
    
    const appointmentData = {
        type: appointmentType.value,
        date: appointmentDate.value,
        time: selectedTimeSlot,
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        notes: notesInput ? notesInput.value : '',
        status: 'pending',
        createdAt: new Date().toISOString(),
        id: Date.now().toString() // Unique ID as string for consistency
    };
    
    try {
        // Save to localStorage
        const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
        appointments.push(appointmentData);
        localStorage.setItem('appointments', JSON.stringify(appointments));
        
        // Show success message with appointment details
        const confirmationDetails = document.getElementById('confirmation-details');
        if (confirmationDetails) {
            confirmationDetails.innerHTML = `
                <div class="confirmation-detail">
                    <span class="detail-label">Type:</span>
                    <span class="detail-value">${appointmentData.type}</span>
                </div>
                <div class="confirmation-detail">
                    <span class="detail-label">Date:</span>
                    <span class="detail-value">${new Date(appointmentData.date).toLocaleDateString()}</span>
                </div>
                <div class="confirmation-detail">
                    <span class="detail-label">Time:</span>
                    <span class="detail-value">${appointmentData.time}</span>
                </div>
                <div class="confirmation-detail">
                    <span class="detail-label">Name:</span>
                    <span class="detail-value">${appointmentData.name}</span>
                </div>
                <div class="confirmation-detail">
                    <span class="detail-label">Email:</span>
                    <span class="detail-value">${appointmentData.email}</span>
                </div>
                ${appointmentData.notes ? `
                <div class="confirmation-detail">
                    <span class="detail-label">Notes:</span>
                    <span class="detail-value">${appointmentData.notes}</span>
                </div>` : ''}
            `;
        }
        
        // Move to confirmation step
        const step2 = document.getElementById('step-2');
        const step3 = document.getElementById('step-3');
        if (step2 && step3) {
            step2.style.display = 'none';
            step3.style.display = 'block';
            updateStepIndicator(3);
        }
        
        // Reset form for next booking
        resetForm();
        
    } catch (error) {
        console.error('Error saving appointment:', error);
        alert('There was an error saving your appointment. Please try again.');
    }
}

// Reset form
function resetForm() {
    // Reset form fields if they exist
    if (appointmentType) appointmentType.value = 'consultation';
    
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    
    if (appointmentDate) appointmentDate.value = tomorrowStr;
    if (nameInput) nameInput.value = '';
    if (emailInput) emailInput.value = '';
    if (phoneInput) phoneInput.value = '';
    if (notesInput) notesInput.value = '';
    
    selectedTimeSlot = null;
    
    // Reset time slots UI
    const timeSlots = document.querySelectorAll('.time-slot');
    if (timeSlots.length > 0) {
        timeSlots.forEach(slot => {
            slot.classList.remove('selected');
        });
    }
    
    currentStep = 1;
    updateStepIndicator(1);
    
    // Regenerate time slots for the default date
    generateTimeSlots();
    
    // Disable next button until time slot is selected
    if (nextBtn) nextBtn.disabled = true;
}

// Update step indicator
function updateStepIndicator(activeStep) {
    const steps = document.querySelectorAll('.step');
    if (steps.length === 0) return;
    
    steps.forEach((step, index) => {
        if (index < activeStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
    
    // Update current step
    currentStep = activeStep;
}
