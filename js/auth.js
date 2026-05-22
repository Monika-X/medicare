// Auth specific JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Password strength meter
    const pwdInput = document.getElementById('pwd');
    const strengthBar = document.querySelector('.strength-fill');
    const strengthText = document.querySelector('.strength-text');

    if (pwdInput && strengthBar && strengthText) {
        pwdInput.addEventListener('input', function() {
            const val = this.value;
            let strength = 0;
            
            if (val.length >= 8) strength += 1;
            if (/[A-Z]/.test(val)) strength += 1;
            if (/[0-9]/.test(val)) strength += 1;
            if (/[^A-Za-z0-9]/.test(val)) strength += 1;

            strengthBar.className = 'strength-fill';
            strengthText.className = 'strength-text';

            if (val.length === 0) {
                strengthBar.style.width = '0';
                strengthText.innerText = '';
            } else if (strength < 2) {
                strengthBar.classList.add('weak');
                strengthText.classList.add('weak');
                strengthText.innerText = 'Weak password';
            } else if (strength === 2 || strength === 3) {
                strengthBar.classList.add('medium');
                strengthText.classList.add('medium');
                strengthText.innerText = 'Medium strength';
            } else {
                strengthBar.classList.add('strong');
                strengthText.classList.add('strong');
                strengthText.innerText = 'Strong password';
            }
        });
    }
});
