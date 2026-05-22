// Admin panel logic

document.addEventListener('DOMContentLoaded', () => {
    // Admin Tabs functionality
    const tabs = document.querySelectorAll('.admin-tab');
    if (tabs.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                // Normally you would switch content views here
                if(window.showToast) {
                    window.showToast('Tab switched: ' + tab.innerText);
                }
            });
        });
    }
});
