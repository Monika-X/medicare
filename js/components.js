// ─── Path Helpers ─────────────────────────────────────────────────────────────
// Detect if the current page is inside the /pages/ folder
const _inPages = window.location.pathname.replace(/\\/g, '/').includes('/pages/');

// Link to the home page (root)
const _idx = _inPages ? '../index.html' : 'index.html';

// Link to any page in /pages/ — resolves correctly from BOTH root and /pages/
// From root     : pages/about.html
// From /pages/* : about.html  (same directory — NO ../ prefix needed)
const _p = (file) => _inPages ? file : `pages/${file}`;

// ─── Navbar Web Component ──────────────────────────────────────────────────────
class MainHeader extends HTMLElement {
    connectedCallback() {
        const path = window.location.pathname.replace(/\\/g, '/');

        // Active link helpers
        const cls  = (kw) => path.includes(kw) ? 'active' : '';
        const homeActive    = !_inPages ? 'active' : '';
        const isAbout       = cls('about');
        const isTests       = cls('tests');
        const isPkgs        = cls('packages');
        const isSample      = cls('sample-collection');
        const isContact     = cls('contact');
        const isFaq         = cls('faq');
        const isServicesGrp = (isTests || isPkgs || isSample) ? 'active' : '';

        this.innerHTML = `
            <nav class="navbar" id="navbar">
                <div class="nav-inner">

                    <a href="${_idx}" class="nav-logo">
                        <div class="logo-icon"><i class="fa-solid fa-staff-snake"></i></div>
                        <div class="logo-text">Medi<span>Care</span></div>
                    </a>

                    <div class="nav-links">
                        <a href="${_idx}"                   class="${homeActive}">Home</a>
                        <a href="${_p('about.html')}"       class="${isAbout}">About</a>
                        <div class="nav-dropdown">
                            <a href="${_p('tests.html')}" class="${isServicesGrp}">
                                Services <i class="fa-solid fa-chevron-down drop-icon"></i>
                            </a>
                            <div class="dropdown-menu glass-panel">
                                <a href="${_p('tests.html')}">
                                    <div class="drop-icon-bg"><i class="fa-solid fa-microscope"></i></div> All Tests
                                </a>
                                <a href="${_p('packages.html')}">
                                    <div class="drop-icon-bg"><i class="fa-solid fa-box-open"></i></div> Health Packages
                                </a>
                                <a href="${_p('collection.html')}">
                                    <div class="drop-icon-bg"><i class="fa-solid fa-house-medical"></i></div> Home Collection
                                </a>
                            </div>
                        </div>
                        <a href="${_p('contact.html')}"     class="${isContact}">Contact</a>
                        <a href="${_p('faq.html')}"         class="${isFaq}">FAQ</a>
                    </div>

                    <div class="nav-actions">
                        <div class="nav-dropdown profile-dropdown">
                            <button class="icon-btn" aria-label="User Profile" style="background:var(--gray-50); border:1px solid var(--gray-200); width:40px; height:40px; border-radius:50%; display:flex; align-items:center; justify-content:center; color:var(--dark); cursor:pointer;">
                                <i class="fa-solid fa-user"></i>
                            </button>
                            <div class="dropdown-menu glass-panel" style="right: 0; left: auto; min-width: 180px;">
                                <a href="${_p('login.html')}">
                                    <div class="drop-icon-bg"><i class="fa-solid fa-hospital-user"></i></div> Patient Login
                                </a>
                                <a href="${_p('login.html?role=admin')}">
                                    <div class="drop-icon-bg"><i class="fa-solid fa-user-shield"></i></div> Admin Login
                                </a>
                            </div>
                        </div>
                        <a href="${_p('booking.html')}"  class="btn btn-primary pulse-btn">Book Test</a>
                    </div>

                    <!-- Hamburger: always visible on mobile -->
                    <button class="hamburger" id="hamburger-btn" aria-label="Open navigation menu">
                        <span></span><span></span><span></span>
                    </button>

                </div>
            </nav>

            <!-- Mobile Fullscreen Nav -->
            <div class="mobile-nav" id="mobile-nav">
                <div class="mobile-nav-bg"></div>
                <button class="mobile-close" id="mobile-close-btn" aria-label="Close menu">
                    <i class="fa-solid fa-xmark"></i>
                </button>
                <div class="mobile-nav-logo">
                    <div class="logo-icon"><i class="fa-solid fa-staff-snake"></i></div>
                    <div class="logo-text">Medi<span>Care</span></div>
                </div>
                <div class="mobile-nav-links">
                    <a href="${_idx}"                         style="animation-delay:0.10s"><i class="fa-solid fa-house"></i> Home</a>
                    <a href="${_p('about.html')}"             style="animation-delay:0.15s"><i class="fa-solid fa-info-circle"></i> About</a>
                    <a href="${_p('tests.html')}"             style="animation-delay:0.20s"><i class="fa-solid fa-microscope"></i> All Tests</a>
                    <a href="${_p('packages.html')}"          style="animation-delay:0.25s"><i class="fa-solid fa-box-open"></i> Health Packages</a>
                    <a href="${_p('collection.html')}" style="animation-delay:0.30s"><i class="fa-solid fa-house-medical"></i> Home Collection</a>
                    <a href="${_p('contact.html')}"           style="animation-delay:0.35s"><i class="fa-solid fa-phone"></i> Contact</a>
                    <a href="${_p('login.html')}"             style="animation-delay:0.40s"><i class="fa-solid fa-hospital-user"></i> Patient Login</a>
                    <a href="${_p('login.html?role=admin')}"             style="animation-delay:0.45s"><i class="fa-solid fa-user-shield"></i> Admin Login</a>
                </div>
                <a href="${_p('booking.html')}" class="btn btn-primary mobile-book-btn" style="animation-delay:0.45s;">
                    Book Test Now
                </a>
            </div>
        `;

        this._initBehaviour();
    }

    _initBehaviour() {
        const navbar       = this.querySelector('#navbar');
        const hamburgerBtn = this.querySelector('#hamburger-btn');
        const closeBtn     = this.querySelector('#mobile-close-btn');
        const mobileNav    = this.querySelector('#mobile-nav');

        // ── Sticky scroll logic ──
        const applyScroll = () => {
            // Always scrolled on inner pages; on index only when scrolled past 50px
            if (_inPages || window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        };
        applyScroll();
        window.addEventListener('scroll', applyScroll, { passive: true });

        // ── Hamburger open ──
        hamburgerBtn.addEventListener('click', () => {
            mobileNav.classList.add('open');
            document.body.style.overflow = 'hidden';
        });

        // ── Hamburger close ──
        closeBtn.addEventListener('click', () => {
            mobileNav.classList.remove('open');
            document.body.style.overflow = '';
        });

        // ── Close on backdrop click ──
        mobileNav.addEventListener('click', (e) => {
            if (e.target === mobileNav || e.target.classList.contains('mobile-nav-bg')) {
                mobileNav.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    }
}

// ─── Footer Web Component ──────────────────────────────────────────────────────
class MainFooter extends HTMLElement {
    connectedCallback() {
        const yr = new Date().getFullYear();

        this.innerHTML = `
            <footer class="footer modern-footer">
                <div class="footer-wave">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
                    </svg>
                </div>
                <div class="container relative z-10">
                    <div class="footer-grid">

                        <!-- Brand -->
                        <div class="footer-col brand-col">
                            <a href="${_idx}" class="nav-logo footer-brand-logo">
                                <div class="logo-icon" style="background:white;color:var(--primary);">
                                    <i class="fa-solid fa-staff-snake"></i>
                                </div>
                                <div class="logo-text" style="color:white;">Medi<span style="color:var(--accent2);">Care</span></div>
                            </a>
                            <p class="footer-desc">MediCare Diagnostic Center is a premium, NABL-accredited healthcare facility providing world-class pathology and radiology services with a commitment to accuracy and care.</p>
                            <div class="footer-socials">
                                <a href="https://facebook.com" target="_blank" class="social-icon hover-lift" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
                                <a href="https://twitter.com" target="_blank" class="social-icon hover-lift" aria-label="Twitter"><i class="fa-brands fa-twitter"></i></a>
                                <a href="https://instagram.com" target="_blank" class="social-icon hover-lift" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
                                <a href="https://linkedin.com" target="_blank" class="social-icon hover-lift" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
                            </div>
                        </div>

                        <!-- Quick Links -->
                        <div class="footer-col">
                            <h4 class="footer-heading">Quick Links</h4>
                            <ul class="footer-links">
                                <li><a href="${_idx}"><i class="fa-solid fa-chevron-right footer-chev"></i>Home</a></li>
                                <li><a href="${_p('about.html')}"><i class="fa-solid fa-chevron-right footer-chev"></i>About Us</a></li>
                                <li><a href="${_p('tests.html')}"><i class="fa-solid fa-chevron-right footer-chev"></i>Our Services</a></li>
                                <li><a href="${_p('packages.html')}"><i class="fa-solid fa-chevron-right footer-chev"></i>Health Packages</a></li>
                                <li><a href="${_p('contact.html')}"><i class="fa-solid fa-chevron-right footer-chev"></i>Contact Us</a></li>
                            </ul>
                        </div>

                        <!-- Patient Care -->
                        <div class="footer-col">
                            <h4 class="footer-heading">Patient Care</h4>
                            <ul class="footer-links">
                                <li><a href="${_p('booking.html')}"><i class="fa-solid fa-chevron-right footer-chev"></i>Book a Test</a></li>
                                <li><a href="${_p('collection.html')}"><i class="fa-solid fa-chevron-right footer-chev"></i>Home Collection</a></li>
                                <li><a href="${_p('login.html')}"><i class="fa-solid fa-chevron-right footer-chev"></i>View Reports</a></li>
                                <li><a href="${_p('faq.html')}"><i class="fa-solid fa-chevron-right footer-chev"></i>FAQ</a></li>
                            </ul>
                        </div>

                        <!-- Contact -->
                        <div class="footer-col">
                            <h4 class="footer-heading">Contact Info</h4>
                            <div class="footer-contact-list">
                                <div class="contact-item">
                                    <div class="contact-icon"><i class="fa-solid fa-location-dot"></i></div>
                                    <div class="contact-text"><a href="https://maps.google.com/?q=123+Medical+Boulevard,+Health+City" target="_blank" style="color:inherit; text-decoration:none;">123 Medical Boulevard,<br>Health City, HC 10020</a></div>
                                </div>
                                <div class="contact-item">
                                    <div class="contact-icon"><i class="fa-solid fa-phone"></i></div>
                                    <div class="contact-text"><a href="tel:+18001234567" style="color:inherit; text-decoration:none;">+1 (800) 123-4567</a><br><a href="tel:+18009876543" style="color:inherit; text-decoration:none;">+1 (800) 987-6543</a></div>
                                </div>
                                <div class="contact-item">
                                    <div class="contact-icon"><i class="fa-solid fa-envelope"></i></div>
                                    <div class="contact-text"><a href="mailto:info@medicarediagnostics.com" style="color:inherit; text-decoration:none;">info@medicarediagnostics.com</a></div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="footer-bottom">
                        <p>&copy; ${yr} MediCare Diagnostic Center. All Rights Reserved.</p>
                        <div class="footer-bottom-links">
                            <a href="${_p('maintenance.html')}">Sitemap</a>
                            <span class="separator">|</span>
                            <a href="${_p('privacy.html')}">Privacy Policy</a>
                            <span class="separator">|</span>
                            <a href="${_p('terms.html')}">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }
}

// ─── Register custom elements ──────────────────────────────────────────────────
customElements.define('main-header', MainHeader);
customElements.define('main-footer', MainFooter);
