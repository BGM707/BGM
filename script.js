document.addEventListener('DOMContentLoaded', function () {
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
    initializeColorPalette();
    initializeQuotationCalculator();
    initializeLazyLoadVideo();
    initializeInfoAlerts();
    initializeCacheVideos();

    // Mostrar SweetAlert al cargar la página
    Swal.fire({
        title: 'Welcome!',
        html: `
            <p>Here is a brief explanation of some technologies I use:</p>
            <ul>
                <li><strong>JavaScript</strong>: A programming language primarily used to make web pages interactive.</li>
                <li><strong>HTML</strong>: The standard markup language for creating and designing web pages.</li>
                <li><strong>CSS</strong>: The language used to describe the presentation of a document written in HTML.</li>
                <li><strong>Python</strong>: An interpreted programming language whose philosophy emphasizes code readability.</li>
                <li><strong>Django</strong>: A high-level web framework for Python that encourages rapid development and clean, pragmatic design.</li>
                <li><strong>React</strong>: A JavaScript library for building user interfaces.</li>
            </ul>
            <p>Enjoy exploring my website!</p>
        `,
        confirmButtonText: 'Got it!'
    });

    // Agregar animación hover para agrandar el card
    const cards = document.querySelectorAll('.hover-card');
    cards.forEach(card => {
        card.addEventListener('mouseover', function () {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s';
        });
        card.addEventListener('mouseout', function () {
            this.style.transform = 'scale(1)';
        });
    });

    // Manejar clics en los íconos de información
    const infoBtns = document.querySelectorAll('.info-btn');
    infoBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const type = this.getAttribute('data-type');
            let title, text, examples;
            switch (type) {
                case 'inputs':
                    title = 'What is an Input?';
                    text = 'An input is a field where users can enter information. For example: contact forms, search fields, or registration forms.';
                    examples = 'Example: A lawyer needs a form for clients to request appointments (simple form) vs a complete legal case management system (complex system).';
                    break;
                case 'outputs':
                    title = 'What is an Output?';
                    text = 'An output is any information that the system displays to the user, such as search results, listings, or reports.';
                    examples = 'Example: A musician wants to show their upcoming events (simple) vs a ticket sales system with sales reports (complex).';
                    break;
                case 'layouts':
                    title = 'What is a Layout?';
                    text = 'A layout is the design and visual structure of a page. Each different section of your site may require a distinct layout.';
                    examples = 'Example: A home page vs a contact page vs a photo gallery.';
                    break;
                case 'informative':
                    title = 'What is an Informative Page?';
                    text = 'An informative page provides static and non-interactive information to the user.';
                    examples = 'Example: A lawyer\'s presentation page vs a complete legal blog.';
                    break;
                case 'interactive':
                    title = 'What is an Interactive Page?';
                    text = 'An interactive page allows the user to interact with the page, such as clicking buttons, filling out forms, etc.';
                    examples = 'Example: A simple event calendar vs a real-time booking system.';
                    break;
                case 'api':
                    title = 'What is API Integration?';
                    text = 'An API allows your site to connect with other services. For example, online payments, maps, or social networks.';
                    examples = 'Example: Displaying a Google map vs integrating a complete payment system.';
                    break;
                case 'modal':
                    title = 'What is a Modal Window?';
                    text = 'A modal window is a pop-up window that overlays the main content of the page. It is used to display additional information or perform actions without leaving the current page.';
                    examples = 'Example: A contact form that appears when clicking a button vs a confirmation window for deleting an item.';
                    break;
            }
            showAlert(title, text, examples);
        });
    });

    // Inicializar la carga perezosa de los videos
    initializeLazyLoadVideo();

    // Agregar evento de clic al botón en la modal de la calculadora de costos
    const requestMeetingBtn = document.querySelector('#request-meeting-btn');
    if (requestMeetingBtn) {
        requestMeetingBtn.addEventListener('click', function () {
            Swal.fire({
                title: 'Meeting Request!',
                text: 'You have requested a meeting to discuss the details of your project. Please complete the contact form and we will get in touch with you as soon as possible.',
                icon: 'info',
                confirmButtonText: 'Understood'
            });
        });
    }

    // Agregar botones para exportar a PDF y Excel
    const exportButtons = document.createElement('div');
    exportButtons.innerHTML = `
        <button id="export-pdf-btn" class="btn-custom">Export to PDF</button>
        <button id="export-excel-btn" class="btn-custom">Export to Excel</button>
    `;
    document.body.appendChild(exportButtons);

    // Agregar eventos de clic a los botones de exportación
    document.querySelector('#export-pdf-btn').addEventListener('click', () => {
        exportToPDF();
        showExportSuccessAlert('PDF');
    });
    document.querySelector('#export-excel-btn').addEventListener('click', () => {
        exportToExcel();
        showExportSuccessAlert('Excel');
    });

    // Agregar evento de clic al botón de cerrar en el modal
    const closeModalBtn = document.querySelector('#closeModalBtn');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function () {
            const modal = document.querySelector('#quotationModal');
            modal.classList.remove('show');
            modal.style.display = 'none';
        });
    }
});

function showAlert(title, text, examples) {
    const alertContainer = document.getElementById('alert-container');
    const alert = document.createElement('div');
    alert.className = 'alert alert-info';
    alert.innerHTML = `
        <strong>${title}</strong><br>
        ${text}<br>
        <strong>Example:</strong> ${examples}
    `;
    alertContainer.appendChild(alert);

    setTimeout(() => {
        alert.classList.add('fade-out');
        setTimeout(() => {
            alert.remove();
        }, 3000);
    }, 5000);
}

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
        anchor.addEventListener('click', function (e) {
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
    const phoneRegex = /^\d{10}$/; // Adjust according to the phone format of your country

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
        const words = [
            'FullStack Developer',
            'Python Developer',
            'IOS Developer',
            'Problem Solver',
            'WebSite Maker',
            '풀스택 개발자', // Korean
            ' フルスタック開発者', // Japanese
            ' ウェブサイトビルダー', // Japanese
            ' アプリ作成者', // Japanese
            'عامل تطوير ويب', // Arabic
            'مطور بايثون', // Arabic
            'مطور آي أو إس', // Arabic
            'حلال مشاكل', // Arabic
            'صانع مواقع', // Arabic
            'Umbutho obukhulu obusebenza ngokweqile', // Zulu
            'Umbutho wokuqala uPython', // Zulu
            'Umbutho wokuqala uIOS', // Zulu
            'Umbutho wokuthatha imibono', // Zulu
            'Umbutho wokwenza iwebhusayithi', // Zulu
            'Mimari FullStack', // Swahili
            'Mhandisi Python', // Swahili
            'Mhandisi IOS', // Swahili
            'Mwathibiti wa Matatizo', // Swahili
            'Mtengenezaji wa Tovuti', // Swahili
            'Umbutho wobukhulu obusebenza ngokweqile', // Xhosa
            'Umbutho wokuqala uPython', // Xhosa
            'Umbutho wokuqala uIOS', // Xhosa
            'Umbutho wokuthatha imibono', // Xhosa
            'Umbutho wokwenza iwebhusayithi', // Xhosa
            'FullStack 开发人员', // Chinese (Simplified)
            'Python 开发人员', // Chinese (Simplified)
            'IOS 开发人员', // Chinese (Simplified)
            '问题解决者', // Chinese (Simplified)
            '网站制作人', // Chinese (Simplified)
            'FullStack 開發人員', // Chinese (Traditional)
            'Python 開發人員', // Chinese (Traditional)
            'IOS 開發人員', // Chinese (Traditional)
            '問題解決者', // Chinese (Traditional)
            '網站製作人', // Chinese (Traditional)
            'Geliştirici FullStack', // Turkish
            'Python Geliştirici', // Turkish
            'IOS Geliştirici', // Turkish
            'Problem Çözücü', // Turkish
            'Web Sitesi Yapımcısı', // Turkish
            'Mimari FullStack', // Kiswahili
            'Mhandisi Python', // Kiswahili
            'Mhandisi IOS', // Kiswahili
            'Mwathibiti wa Matatizo', // Kiswahili
            'Mtengenezaji wa Tovuti', // Kiswahili
            'Entwickler FullStack', // German
            'Python-Entwickler', // German
            'IOS-Entwickler', // German
            'Problemlöser', // German
            'Website-Ersteller', // German
            'Sviluppatore FullStack', // Italian
            'Sviluppatore Python', // Italian
            'Sviluppatore IOS', // Italian
            'Risolutore di Problemi', // Italian
            'Creatore di Siti Web', // Italian
            'Ontwikkelaar FullStack', // Dutch
            'Python Ontwikkelaar', // Dutch
            'IOS Ontwikkelaar', // Dutch
            'Probleemoplosser', // Dutch
            'Website Maker', // Dutch
            'Разработчик FullStack', // Russian
            'Разработчик Python', // Russian
            'Разработчик IOS', // Russian
            'Решатель проблем', // Russian
            'Создатель сайтов', // Russian
            'Desenvolvedor FullStack', // Portuguese
            'Desenvolvedor Python', // Portuguese
            'Desenvolvedor IOS', // Portuguese
            'Solucionador de Problemas', // Portuguese
            'Criador de Sites', // Portuguese
            'Développeur FullStack', // French
            'Développeur Python', // French
            'Développeur IOS', // French
            'Résolveur de Problemes', // French
            'Créateur de Sites Web', // French
            'Desarrollador FullStack', // Spanish
            'Desarrollador Python', // Spanish
            'Desarrollador IOS', // Spanish
            'Solucionador de Problemas', // Spanish
            'Creador de Sitios Web', // Spanish
            'Pengembang FullStack', // Indonesian
            'Pengembang Python', // Indonesian
            'Pengembang IOS', // Indonesian
            'Penyelesaian Masalah', // Indonesian
            'Pembuat Situs Web', // Indonesian
            'Desenvolvedor FullStack', // Catalan
            'Desenvolvedor Python', // Catalan
            'Desenvolvedor IOS', // Catalan
            'Resolvedor de Problemes', // Catalan
            'Creador de Llocs Web', // Catalan
            'FullStack-utvecklare', // Swedish
            'Pythonutvecklare', // Swedish
            'IOS-utvecklare', // Swedish
            'Problemlösare', // Swedish
            'Webbplatsbyggare', // Swedish
            'FullStack-utvikler', // Norwegian
            'Python-utvikler', // Norwegian
            'IOS-utvikler', // Norwegian
            'Problemløser', // Norwegian
            'Websideutvikler', // Norwegian
            'FullStack-kehittäjä', // Finnish
            'Python-kehittäjä', // Finnish
            'IOS-kehittäjä', // Finnish
            'Ongelmanratkaisija', // Finnish
            'Verkkosivusten tekijä', // Finnish
            'FullStack fejlesztő', // Hungarian
            'Python fejlesztő', // Hungarian
            'IOS fejlesztő', // Hungarian
            'Problémamegoldó', // Hungarian
            'Webhely fejlesztő', // Hungarian
            'FullStack разработчик', // Ukrainian
            'Python розробник', // Ukrainian
            'IOS розробник', // Ukrainian
            'Вирішувач проблем', // Ukrainian
            'Створювач веб-сайтів', // Ukrainian
            'FullStack developer', // English
            'Python developer', // English
            'IOS developer', // English
            'Problem solver', // English
            'Website maker', // English
        ];
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

function initializeColorPalette() {
    const colorToggle = document.querySelector('.color-toggle');
    const colorPaletteModal = document.querySelector('#colorPaletteModal');
    const closeColorModal = colorPaletteModal.querySelector('.close-modal');
    const colorOptions = document.querySelectorAll('.color-option');

    if (colorToggle) {
        colorToggle.addEventListener('click', () => {
            colorPaletteModal.classList.add('show');
        });
    }

    if (closeColorModal) {
        closeColorModal.addEventListener('click', () => {
            colorPaletteModal.classList.remove('show');
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target === colorPaletteModal) {
            colorPaletteModal.classList.remove('show');
        }
    });

    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            const color = option.getAttribute('data-color');
            document.documentElement.style.setProperty('--primary-color', `var(--color-${color})`);
            document.documentElement.style.setProperty('--secondary-color', `var(--color-${color}-light)`);
            document.documentElement.style.setProperty('--accent-color', `var(--color-${color}-dark)`);
            document.documentElement.style.setProperty('--text-color', `var(--color-${color}-text)`);
            document.documentElement.style.setProperty('--background-color', `var(--color-${color}-bg)`);
            colorPaletteModal.classList.remove('show');
        });
    });
}

function initializeLoader() {
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 5000); // 5000 milisegundos = 5 segundos
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
    const descriptions = {
        inputs: {
            title: "What is an Input?",
            desc: "An input is a field where users can enter information. For example: contact forms, search fields, or registration forms.",
            examples: "Example: A lawyer needs a form for clients to request appointments (simple form) vs a complete legal case management system (complex system).",
            cost: 50,
            time: 2
        },
        outputs: {
            title: "What is an Output?",
            desc: "An output is any information that the system displays to the user, such as search results, listings, or reports.",
            examples: "Example: A musician wants to show their upcoming events (simple) vs a ticket sales system with sales reports (complex).",
            cost: 60,
            time: 2
        },
        layouts: {
            title: "What is a Layout?",
            desc: "A layout is the design and visual structure of a page. Each different section of your site may require a distinct layout.",
            examples: "Example: A home page vs a contact page vs a photo gallery.",
            cost: 100,
            time: 2
        },
        informative: {
            title: "Informative Pages",
            desc: "Pages that display static information such as 'About', 'Services', or 'Contact'.",
            examples: "Example: A lawyer's presentation page vs a complete legal blog.",
            cost: 150,
            time: 2
        },
        interactive: {
            title: "Interactive Pages",
            desc: "Pages where users can interact, such as forms, calendars, or booking systems.",
            examples: "Example: A simple event calendar vs a real-time booking system.",
            cost: 200,
            time: 2
        },
        api: {
            title: "API Integration",
            desc: "An API allows your site to connect with other services. For example, online payments, maps, or social networks.",
            examples: "Example: Displaying a Google map vs integrating a complete payment system.",
            cost: 300,
            time: 2
        },
        modal: {
            title: "Modal Window Integration",
            desc: "A modal window is a pop-up window that overlays the main content of the page. It is used to display additional information or perform actions without leaving the current page.",
            examples: "Example: A contact form that appears when clicking a button vs a confirmation window for deleting an item.",
            cost: 150,
            time: 2
        }
    };

    const formData = {
        inputs: 0,
        outputs: 0,
        layouts: 0,
        informative: 0,
        interactive: 0,
        api: 0,
        modal: 0
    };

    const totalCost = document.querySelector('#estimated-cost');
    const totalTime = document.querySelector('#estimated-time');

    function calculateTotal() {
        let cost = 0;
        let time = 0;

        Object.entries(formData).forEach(([key, value]) => {
            if (descriptions[key]) {
                cost += value * descriptions[key].cost;
                time += value * descriptions[key].time;
            }
        });

        totalCost.textContent = cost;
        totalTime.textContent = time;

        // Show recommendation based on total
        if (cost > 5000) {
            Swal.fire({
                title: 'Complex Project!',
                text: 'Your project seems quite complex. Would you like to schedule a meeting to discuss the details?',
                icon: 'info',
                showCancelButton: true,
                confirmButtonText: 'Schedule Meeting',
                cancelButtonText: 'Continue Quoting'
            });
        }
    }

    function updateField(field, value) {
        formData[field] = parseInt(value) || 0;
        calculateTotal();
    }

    function showInfo(type) {
        Swal.fire({
            title: descriptions[type].title,
            html: `
              <p>${descriptions[type].desc}</p>
              <p class="mt-3"><strong>Example:</strong><br>${descriptions[type].examples}</p>
            `,
            icon: 'info',
            confirmButtonText: 'Understood'
        });
    }

    document.querySelectorAll('.modal input[type="number"]').forEach(input => {
        input.addEventListener('input', (e) => {
            updateField(e.target.id, e.target.value);
        });
    });

    document.querySelectorAll('.info-btn').forEach(button => {
        button.addEventListener('click', () => {
            const type = button.dataset.type;
            showInfo(type);
        });
    });
}

function initializeLazyLoadVideo() {
    const lazyVideos = document.querySelectorAll('.hero-video.lazy, iframe[data-src]');

    const videoObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                video.src = video.dataset.src;
                video.classList.remove('lazy');
                observer.unobserve(video);
            }
        });
    });

    lazyVideos.forEach(video => videoObserver.observe(video));
}

function initializeInfoAlerts() {
    const descriptions = {
        inputs: {
            title: "What is an Input?",
            desc: "An input is a field where users can enter information. For example: contact forms, search fields, or registration forms.",
            examples: "Example: A lawyer needs a form for clients to request appointments (simple form) vs a complete legal case management system (complex system).",
            cost: 50,
            time: 2
        },
        outputs: {
            title: "What is an Output?",
            desc: "An output is any information that the system displays to the user, such as search results, listings, or reports.",
            examples: "Example: A musician wants to show their upcoming events (simple) vs a ticket sales system with sales reports (complex).",
            cost: 60,
            time: 2
        },
        layouts: {
            title: "What is a Layout?",
            desc: "A layout is the design and visual structure of a page. Each different section of your site may require a distinct layout.",
            examples: "Example: A home page vs a contact page vs a photo gallery.",
            cost: 100,
            time: 2
        },
        informative: {
            title: "Informative Pages",
            desc: "Pages that display static information such as 'About', 'Services', or 'Contact'.",
            examples: "Example: A lawyer's presentation page vs a complete legal blog.",
            cost: 150,
            time: 2
        },
        interactive: {
            title: "Interactive Pages",
            desc: "Pages where users can interact, such as forms, calendars, or booking systems.",
            examples: "Example: A simple event calendar vs a real-time booking system.",
            cost: 200,
            time: 2
        },
        api: {
            title: "API Integration",
            desc: "An API allows your site to connect with other services. For example, online payments, maps, or social networks.",
            examples: "Example: Displaying a Google map vs integrating a complete payment system.",
            cost: 300,
            time: 2
        },
        modal: {
            title: "Modal Window Integration",
            desc: "A modal window is a pop-up window that overlays the main content of the page. It is used to display additional information or perform actions without leaving the current page.",
            examples: "Example: A contact form that appears when clicking a button vs a confirmation window for deleting an item.",
            cost: 150,
            time: 2
        }
    };

    document.querySelectorAll('.info-btn').forEach(button => {
        button.addEventListener('click', () => {
            const type = button.dataset.type;
            Swal.fire({
                title: descriptions[type].title,
                html: `
                  <p>${descriptions[type].desc}</p>
                  <p class="mt-3"><strong>Example:</strong><br>${descriptions[type].examples}</p>
                `,
                icon: 'info',
                confirmButtonText: 'Understood'
            });
        });
    });
}

function initializeCacheVideos() {
    const lazyVideos = document.querySelectorAll('.hero-video.lazy, iframe[data-src]');

    lazyVideos.forEach(video => {
        const src = video.dataset.src;
        if (src) {
            const cachedVideo = localStorage.getItem(src);
            if (cachedVideo) {
                video.src = cachedVideo;
                video.classList.remove('lazy');
            } else {
                video.src = src;
                localStorage.setItem(src, src);
            }
        }
    });
}

function showModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.classList.add('show');
    }
}

function exportToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const totalCost = document.getElementById('estimated-cost').textContent;
    const totalTime = document.getElementById('estimated-time').textContent;

    const formData = {
        inputs: document.querySelector('#inputs').value,
        outputs: document.querySelector('#outputs').value,
        layouts: document.querySelector('#layouts').value,
        informative: document.querySelector('#informative').value,
        interactive: document.querySelector('#interactive').value,
        api: document.querySelector('#api').value,
        modal: document.querySelector('#modal').value
    };

    const descriptions = {
        inputs: {
            title: "Inputs",
            desc: "An input is a field where users can enter information. For example: contact forms, search fields, or registration forms.",
            cost: 50,
            time: 2
        },
        outputs: {
            title: "Outputs",
            desc: "An output is any information that the system displays to the user, such as search results, listings, or reports.",
            cost: 60,
            time: 2
        },
        layouts: {
            title: "Layouts",
            desc: "A layout is the design and visual structure of a page. Each different section of your site may require a distinct layout.",
            cost: 100,
            time: 2
        },
        informative: {
            title: "Informative Pages",
            desc: "Pages that display static information such as 'About', 'Services', or 'Contact'.",
            cost: 150,
            time: 2
        },
        interactive: {
            title: "Interactive Pages",
            desc: "Pages where users can interact, such as forms, calendars, or booking systems.",
            cost: 200,
            time: 2
        },
        api: {
            title: "API Integration",
            desc: "An API allows your site to connect with other services. For example, online payments, maps, or social networks.",
            cost: 300,
            time: 2
        },
        modal: {
            title: "Modal Window Integration",
            desc: "A modal window is a pop-up window that overlays the main content of the page. It is used to display additional information or perform actions without leaving the current page.",
            cost: 150,
            time: 2
        }
    };

    let yOffset = 10;

    doc.text('Project Quotation', 10, yOffset);
    yOffset += 10;

    Object.entries(formData).forEach(([key, value]) => {
        if (value > 0) {
            doc.text(`${descriptions[key].title}: ${value}`, 10, yOffset);
            yOffset += 10;
            doc.text(`Description: ${descriptions[key].desc}`, 10, yOffset);
            yOffset += 10;
            doc.text(`Cost: $${descriptions[key].cost * value}`, 10, yOffset);
            yOffset += 10;
            doc.text(`Time: ${descriptions[key].time * value} days`, 10, yOffset);
            yOffset += 20;
        }
    });

    doc.text(`Total Cost: $${totalCost}`, 10, yOffset);
    yOffset += 10;
    doc.text(`Estimated Time: ${totalTime} days`, 10, yOffset);

    doc.save('quotation.pdf');
}

function exportToExcel() {
    const totalCost = document.getElementById('estimated-cost').textContent;
    const totalTime = document.getElementById('estimated-time').textContent;

    const formData = {
        inputs: document.querySelector('#inputs').value,
        outputs: document.querySelector('#outputs').value,
        layouts: document.querySelector('#layouts').value,
        informative: document.querySelector('#informative').value,
        interactive: document.querySelector('#interactive').value,
        api: document.querySelector('#api').value,
        modal: document.querySelector('#modal').value
    };

    const descriptions = {
        inputs: {
            title: "Inputs",
            desc: "An input is a field where users can enter information. For example: contact forms, search fields, or registration forms.",
            cost: 50,
            time: 2
        },
        outputs: {
            title: "Outputs",
            desc: "An output is any information that the system displays to the user, such as search results, listings, or reports.",
            cost: 60,
            time: 2
        },
        layouts: {
            title: "Layouts",
            desc: "A layout is the design and visual structure of a page. Each different section of your site may require a distinct layout.",
            cost: 100,
            time: 2
        },
        informative: {
            title: "Informative Pages",
            desc: "Pages that display static information such as 'About', 'Services', or 'Contact'.",
            cost: 150,
            time: 2
        },
        interactive: {
            title: "Interactive Pages",
            desc: "Pages where users can interact, such as forms, calendars, or booking systems.",
            cost: 200,
            time: 2
        },
        api: {
            title: "API Integration",
            desc: "An API allows your site to connect with other services. For example, online payments, maps, or social networks.",
            cost: 300,
            time: 2
        },
        modal: {
            title: "Modal Window Integration",
            desc: "A modal window is a pop-up window that overlays the main content of the page. It is used to display additional information or perform actions without leaving the current page.",
            cost: 150,
            time: 2
        }
    };

    const data = [
        ['Project Quotation', '', '', ''],
        ['Item', 'Quantity', 'Cost', 'Time'],
    ];

    Object.entries(formData).forEach(([key, value]) => {
        if (value > 0) {
            data.push([
                descriptions[key].title,
                value,
                `$${descriptions[key].cost * value}`,
                `${descriptions[key].time * value} days`
            ]);
            data.push([descriptions[key].desc, '', '', '']);
        }
    });

    data.push(['', '', '', '']);
    data.push(['Total Cost', '', `$${totalCost}`, '']);
    data.push(['Estimated Time', '', `${totalTime} days`, '']);

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Quotation');

    XLSX.writeFile(wb, 'quotation.xlsx');
}

function showExportSuccessAlert(format) {
    Swal.fire({
        title: 'Success!',
        text: `The file has been successfully exported in ${format} format.`,
        icon: 'success',
        confirmButtonText: 'Understood'
    });
}
