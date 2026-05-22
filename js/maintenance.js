// Live countdown timer for MediCare Maintenance Page
document.addEventListener("DOMContentLoaded", () => {
    // Set target time: 3 hours from the user's first load (stored in localStorage for persistence)
    let targetTime = localStorage.getItem("medicare_maintenance_target");
    
    if (!targetTime) {
        // Create target: 2 hours, 44 minutes and 30 seconds from now
        const now = new Date().getTime();
        const duration = (2 * 60 * 60 * 1000) + (44 * 60 * 1000) + (30 * 1000); // 2h 44m 30s
        targetTime = now + duration;
        localStorage.setItem("medicare_maintenance_target", targetTime);
    } else {
        targetTime = parseInt(targetTime);
        const now = new Date().getTime();
        // If the timer has already expired, reset it to another 3 hours to keep the page looking active
        if (targetTime < now) {
            const duration = (3 * 60 * 60 * 1000) + (15 * 60 * 1000); // 3h 15m
            targetTime = now + duration;
            localStorage.setItem("medicare_maintenance_target", targetTime);
        }
    }

    const hoursVal = document.getElementById("timer-hours");
    const minutesVal = document.getElementById("timer-minutes");
    const secondsVal = document.getElementById("timer-seconds");
    const progressBar = document.getElementById("maintenance-progress-bar");

    // Total duration for progress calculations (assume 4 hours total = 14,400,000 ms)
    const totalDuration = 4 * 60 * 60 * 1000;

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetTime - now;

        if (distance < 0) {
            if (hoursVal) hoursVal.textContent = "00";
            if (minutesVal) minutesVal.textContent = "00";
            if (secondsVal) secondsVal.textContent = "00";
            if (progressBar) progressBar.style.width = "100%";
            return;
        }

        // Calculate hours, minutes, seconds
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Format to double digits
        if (hoursVal) hoursVal.textContent = String(hours).padStart(2, '0');
        if (minutesVal) minutesVal.textContent = String(minutes).padStart(2, '0');
        if (secondsVal) secondsVal.textContent = String(seconds).padStart(2, '0');

        // Progress bar percentage calculation (going from 60% to 98%)
        const elapsed = totalDuration - distance;
        let percentage = (elapsed / totalDuration) * 100;
        
        // Boundaries to keep it realistic
        if (percentage < 60) percentage = 63.5;
        if (percentage > 98) percentage = 98.2;

        if (progressBar) {
            progressBar.style.width = percentage.toFixed(1) + "%";
        }

        // Sync percentage label text
        const pctLabel = document.getElementById("progress-label-pct");
        if (pctLabel) {
            pctLabel.textContent = percentage.toFixed(0) + "%";
        }
    }

    // Run initially
    updateCountdown();
    // Update every second
    const timerInterval = setInterval(updateCountdown, 1000);
});
