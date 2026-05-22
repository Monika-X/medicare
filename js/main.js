// Main JavaScript for MediCare Diagnostic Center

document.addEventListener('DOMContentLoaded', () => {
    
    // Preloader Logic
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Ensure minimum display time for the cool heartbeat animation (e.g., 1.5 seconds)
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 600);
        }, 1500);
    }

    // Set Current Year in Footer
    const yearSpan = document.getElementById('current-year');
    if(yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Scroll to Top Button
    const scrollTopBtn = document.getElementById('scroll-top-btn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Counter Animation for Stats
    const statsElements = document.querySelectorAll('.num[data-val]');
    if (statsElements.length > 0) {
        const animateStats = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const stat = entry.target;
                    const endVal = parseInt(stat.getAttribute('data-val'));
                    const duration = 2000;
                    const frameRate = 1000 / 60;
                    const totalFrames = Math.round(duration / frameRate);
                    let currentFrame = 0;

                    const suffix = stat.innerHTML.replace(/[0-9]/g, '');

                    const counter = setInterval(() => {
                        currentFrame++;
                        const progress = currentFrame / totalFrames;
                        // Use easeOutQuad for smoother deceleration
                        const easeOutProgress = 1 - (1 - progress) * (1 - progress);
                        const currentVal = Math.round(endVal * easeOutProgress);
                        stat.innerHTML = currentVal + suffix;

                        if (currentFrame === totalFrames) {
                            clearInterval(counter);
                            stat.innerHTML = endVal + suffix;
                        }
                    }, frameRate);

                    observer.unobserve(stat);
                }
            });
        };

        const statsObserver = new IntersectionObserver(animateStats, {
            threshold: 0.5
        });

        statsElements.forEach(stat => statsObserver.observe(stat));
    }
});

// Testimonial Slider Logic
let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.slider-dots .dot');

window.goToTestimonial = function(index) {
    if(!slides.length) return;
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = index;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
};

window.nextTestimonial = function() {
    if(!slides.length) return;
    let next = currentSlide + 1;
    if (next >= slides.length) next = 0;
    goToTestimonial(next);
};

window.prevTestimonial = function() {
    if(!slides.length) return;
    let prev = currentSlide - 1;
    if (prev < 0) prev = slides.length - 1;
    goToTestimonial(prev);
};

// Auto slide every 6 seconds
let slideInterval;
if(document.getElementById('testimonial-slider')) {
    slideInterval = setInterval(window.nextTestimonial, 6000);
    
    // Pause on hover
    const sliderContainer = document.querySelector('.testimonials-section');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
        sliderContainer.addEventListener('mouseleave', () => {
            slideInterval = setInterval(window.nextTestimonial, 6000);
        });
    }
}

// Toast Notification System
window.showToast = function(message, type = 'success') {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    
    const icon = type === 'success' ? '<i class="fa-solid fa-circle-check"></i>' : '<i class="fa-solid fa-circle-exclamation"></i>';
    toast.className = `toast ${type}`;
    toast.innerHTML = `${icon} <span>${message}</span>`;
    
    // Trigger reflow
    void toast.offsetWidth;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
};

// FAQ Accordion Logic
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        const answer = question.nextElementSibling;
        
        // Close all other open items
        document.querySelectorAll('.faq-item').forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
        if (item.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + "px";
        } else {
            answer.style.maxHeight = null;
        }
    });
});
