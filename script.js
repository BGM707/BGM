document.addEventListener('DOMContentLoaded', function() {
    initializeAOS();
    initializeNavbar();
    initializeSmoothScroll();
    initializeContactForm();
    initializeTypeWriter();
    initializeProjectFilters();
    initializeLazyLoading();
    initializeLoader();
    initializeModal();
    initializeScrollToTop();
    initializeThemeToggle();
    initializeQuotationCalculator();
});

function initializeAOS() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-in-out'
    });
}

function initializeNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        updateActiveNavLink();
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            const headerOffset = 70;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });
}

function initializeContactForm() {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            if (!validateForm(data)) {
                showNotification('Please fill in all fields correctly', 'error');
                return;
            }

            try {
                await sendEmail(data);
                showNotification('Message sent successfully!', 'success');
                form.reset();
            } catch (error) {
                showNotification('Error sending message. Please try again.', 'error');
            }
        });
    }
}

async function sendEmail(data) {
    const response = await fetch('http://localhost:3000/send-sms', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.text();
}

function validateForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/; // Ajusta según el formato de teléfono de tu país

    if (!data.name || data.name.length < 2) return false;
    if (!data.email || !emailRegex.test(data.email)) return false;
    if (!data.phone || !phoneRegex.test(data.phone)) return false;
    if (!data.message || data.message.length < 10) return false;

    return true;
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add('show'), 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function initializeTypeWriter() {
    const text = document.querySelector('.hero-subtitle');
    if (text) {
        const words = ['FullStack Developer', 'Python Developer', 'IOS Developer', 'Problem Solver', 'WebSite Maker'];
        let wordIndex = 0;
        let letterIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];

            if (isDeleting) {
                text.textContent = currentWord.substring(0, letterIndex - 1);
                letterIndex--;
            } else {
                text.textContent = currentWord.substring(0, letterIndex + 1);
                letterIndex++;
            }

            if (!isDeleting && letterIndex === currentWord.length) {
                setTimeout(() => isDeleting = true, 1500);
            } else if (isDeleting && letterIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }

            const typingSpeed = isDeleting ? 100 : 200;
            setTimeout(type, typingSpeed);
        }

        type();
    }
}

function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.card');

    if (filterButtons.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                projects.forEach(project => {
                    const projectType = project.dataset.type;
                    if (filter === 'all' || filter === projectType) {
                        project.style.display = 'block';
                        project.classList.add('show');
                    } else {
                        project.style.display = 'none';
                        project.classList.remove('show');
                    }
                });
            });
        });
    }
}

function initializeLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}

function initializeThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const sunIcon = themeToggle.querySelector('.bi-sun-fill');
    const moonIcon = themeToggle.querySelector('.bi-moon-fill');

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');

            const isDarkTheme = document.body.classList.contains('dark-theme');
            localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');

            sunIcon.style.display = isDarkTheme ? 'none' : 'inline';
            moonIcon.style.display = isDarkTheme ? 'inline' : 'none';
        });
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'inline';
    }
}

function initializeLoader() {
    const loader = document.querySelector('.loader');
    if (loader) {
        window.addEventListener('load', () => {
            loader.classList.add('hidden');
        });
    }
}

function initializeModal() {
    const modal = document.querySelector('.modal');
    const closeModal = document.querySelector('.close-modal');

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.classList.remove('show');
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('show');
        }
    });
}

function initializeScrollToTop() {
    const scrollToTopBtn = document.querySelector('.scroll-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function initializeQuotationCalculator() {
    const options = document.querySelectorAll('.option-card');
    const totalCost = document.querySelector('#total-cost');
    const totalTime = document.querySelector('#total-time');

    let cost = 0;
    let time = 0;

    options.forEach(option => {
        option.addEventListener('click', () => {
            const selected = option.classList.toggle('selected');
            const optionCost = parseInt(option.dataset.cost);
            const optionTime = parseInt(option.dataset.time);

            if (selected) {
                cost += optionCost;
                time += optionTime;
            } else {
                cost -= optionCost;
                time -= optionTime;
            }

            totalCost.textContent = cost;
            totalTime.textContent = time;
        });
    });
}

function showModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.classList.add('show');
    }
}
