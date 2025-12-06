document.getElementById('bookingForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = document.getElementById('message');
    
    const appointment = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        service: document.getElementById('service').value,
        status: 'Pending'
    };

    try {
        const response = await fetch('/api/appointments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(appointment)
        });

        if (response.ok) {
            message.className = 'success';
            message.textContent = 'Appointment booked successfully!';
            document.getElementById('bookingForm').reset();
        } else {
            throw new Error('Failed to book appointment');
        }
    } catch (error) {
        message.className = 'error';
        message.textContent = 'Failed to book appointment. Please try again.';
    }
});
