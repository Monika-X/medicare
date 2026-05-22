// Booking specific logic

document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('appointment-booking-form');
    
    if(bookingForm) {
        // Set minimum date to today for date picker
        const dateInput = bookingForm.querySelector('input[type="date"]');
        if(dateInput) {
            function getTodayString() {
                const now = new Date();
                const year = now.getFullYear();
                const month = String(now.getMonth() + 1).padStart(2, '0');
                const day = String(now.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}`;
            }
            const todayFormatted = getTodayString();
            dateInput.setAttribute('min', todayFormatted);
        }
    }
});
