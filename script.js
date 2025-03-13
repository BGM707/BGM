// Archivo JavaScript principal para la web de Crisoull

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas las funcionalidades
    initNavbar();
    renderMusicCards();
    renderVideoCards();
    initFilters();
    initContactForm();
    initNewsletterForm();
    initBloodDrops(); // Inicializar las gotas de sangre

});

// ------------- Funcionalidad de gotas de sangre -------------

function initBloodDrops() {
    const heroSection = document.querySelector('.hero');

    function createBloodDrop() {
        const bloodDrop = document.createElement('div');
        bloodDrop.classList.add('blood-drop');

        // Posición aleatoria en el eje X
        const randomX = Math.random() * window.innerWidth;
        bloodDrop.style.left = `${randomX}px`;

        // Tamaño aleatorio
        const size = Math.random() * 20 + 10; // Entre 10px y 30px
        bloodDrop.style.width = `${size}px`;
        bloodDrop.style.height = `${size}px`;

        // Duración de la animación aleatoria
        const animationDuration = Math.random() * 2 + 1; // Entre 1s y 3s
        bloodDrop.style.animationDuration = `${animationDuration}s`;

        // Añadir la gota al contenedor
        heroSection.appendChild(bloodDrop);

        // Eliminar la gota después de que termine la animación
        bloodDrop.addEventListener('animationend', () => {
            bloodDrop.remove();
        });
    }

    // Crear una nueva gota cada cierto tiempo
    setInterval(createBloodDrop, 500);
}   


// ------------- Funcionalidades de navegación -------------

function initNavbar() {
    // Referencias a elementos del DOM
    const navbar = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-links ul li a');
    const menuBtn = document.getElementById('openMenu');
    const closeBtn = document.getElementById('closeMenu');
    const navLinksContainer = document.getElementById('navLinks');

    // Cambiar estilo de navbar al hacer scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Agregar la clase active al link de navegación cuando corresponda
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Funcionalidad para el menú móvil
    menuBtn.addEventListener('click', function() {
        navLinksContainer.style.right = '0';
    });

    closeBtn.addEventListener('click', function() {
        navLinksContainer.style.right = '-300px';
    });

    // Cerrar menú al hacer clic en un enlace (móvil)
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinksContainer.style.right = '-300px';
            }
        });
    });
}

// ------------- Renderizado y filtrado de cards -------------

// Renderizar las tarjetas de música
function renderMusicCards(category = 'all') {
    const musicCardsContainer = document.getElementById('musicCards');
    
    if (!musicCardsContainer) return;
    
    // Filtrar por categoría si es necesario
    const filteredData = category === 'all' 
        ? musicData 
        : musicData.filter(item => item.category === category);
    
    // Limpiar el contenedor
    musicCardsContainer.innerHTML = '';
    
    // Generar HTML para cada tarjeta
    filteredData.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card music-card';
        card.innerHTML = `
            <div class="card-media">
                <img src="${item.image}" alt="${item.title}">
                <div class="card-play" data-spotify="${item.spotifyUrl}">
                    <i class="fas fa-play"></i>
                </div>
            </div>
            <div class="card-content">
                <h3 class="card-title">${item.title}</h3>
                <div class="card-date">${item.date}</div>
                <p class="card-description">${item.description}</p>
            </div>
        `;
        
        musicCardsContainer.appendChild(card);
    });
    
    // Añadir event listeners a los botones de reproducción
    const playButtons = document.querySelectorAll('.music-card .card-play');
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            const spotifyUrl = this.getAttribute('data-spotify');
            openSpotifyPlayer(spotifyUrl);
        });
    });
}

// Renderizar las tarjetas de videos
function renderVideoCards(category = 'all') {
    const videoCardsContainer = document.getElementById('videoCards');
    
    if (!videoCardsContainer) return;
    
    // Filtrar por categoría si es necesario
    const filteredData = category === 'all' 
        ? videoData 
        : videoData.filter(item => item.category === category);
    
    // Limpiar el contenedor
    videoCardsContainer.innerHTML = '';
    
    // Generar HTML para cada tarjeta
    filteredData.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card video-card';
        card.innerHTML = `
            <div class="card-media">
                <img src="${item.thumbnailUrl}" alt="${item.title}" class="video-thumbnail">
                <div class="card-play" data-video="${item.embedUrl}">
                    <i class="fas fa-play"></i>
                </div>
            </div>
            <div class="card-content">
                <h3 class="card-title">${item.title}</h3>
                <div class="card-date">${item.date}</div>
                <p class="card-description">${item.description}</p>
            </div>
        `;
        
        videoCardsContainer.appendChild(card);
    });
    
    // Añadir event listeners a los botones de reproducción
    const playButtons = document.querySelectorAll('.video-card .card-play');
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            const videoUrl = this.getAttribute('data-video');
            openVideoModal(videoUrl, this.closest('.card').querySelector('.card-title').textContent);
        });
    });
}

// Inicializar filtros para música y videos
function initFilters() {
    // Filtros de música
    const musicFilterBtns = document.querySelectorAll('.music-section .filter-btn');
    
    musicFilterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Actualizar estado activo del botón
            musicFilterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Aplicar filtro
            const category = this.getAttribute('data-filter');
            renderMusicCards(category);
        });
    });
    
    // Filtros de video
    const videoFilterBtns = document.querySelectorAll('.videos-section .filter-btn');
    
    videoFilterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Actualizar estado activo del botón
            videoFilterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Aplicar filtro
            const category = this.getAttribute('data-filter');
            renderVideoCards(category);
        });
    });
}

// ------------- Funcionalidades de reproductor y modal -------------

// Abrir reproductor de Spotify
function openSpotifyPlayer(spotifyUrl) {
    // Crear modal para el reproductor de Spotify
    const modal = document.createElement('div');
    modal.className = 'spotify-modal modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <iframe src="${spotifyUrl.replace('https://open.spotify.com/', 'https://open.spotify.com/embed/')}" 
                    width="100%" height="380" frameborder="0" allowtransparency="true" 
                    allow="encrypted-media"></iframe>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Cerrar modal
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    // Cerrar modal al hacer clic fuera del contenido
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Abrir modal de video
function openVideoModal(videoUrl, title) {
    // Crear modal para el video
    const modal = document.createElement('div');
    modal.className = 'video-modal modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h3>${title}</h3>
            <div class="video-container">
                <iframe width="100%" height="315" src="${videoUrl}" 
                        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
                        gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Cerrar modal
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    // Cerrar modal al hacer clic fuera del contenido
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// ------------- Funcionalidades de formularios -------------

// Inicializar formulario de contacto
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Recoger datos del formulario
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Aquí normalmente enviarías los datos a un servidor
        // Para este ejemplo, simulamos una respuesta exitosa
        
        // Mostrar alerta de éxito con SweetAlert2
        Swal.fire({
            title: '¡Mensaje Enviado!',
            text: `Gracias ${name}, te responderemos pronto.`,
            icon: 'success',
            confirmButtonColor: '#1db954'
        });
        
        // Limpiar formulario
        contactForm.reset();
    });
}

// Inicializar formulario de newsletter
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Recoger email
        const email = this.querySelector('input[type="email"]').value;
        
        // Aquí normalmente enviarías los datos a un servidor
        // Para este ejemplo, simulamos una respuesta exitosa
        
        // Mostrar alerta de éxito con SweetAlert2
        Swal.fire({
            title: '¡Suscripción Exitosa!',
            text: 'Gracias por suscribirte a mi newsletter.',
            icon: 'success',
            confirmButtonColor: '#1db954'
        });
        
        // Limpiar formulario
        newsletterForm.reset();
    });
}

// ------------- Estilo adicional para el modal (agregar al CSS o usar aquí dinámicamente) -------------

// Crear estilos para modales
const modalStyles = document.createElement('style');
modalStyles.textContent = `
    .modal {
        display: block;
        position: fixed;
        z-index: 2000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        overflow: auto;
    }

    .modal-content {
        background-color: var(--card-bg);
        margin: 5% auto;
        padding: 20px;
        border-radius: 10px;
        width: 80%;
        max-width: 800px;
        position: relative;
        animation: modalFadeIn 0.3s;
    }

    @keyframes modalFadeIn {
        from {opacity: 0; transform: translateY(-50px);}
        to {opacity: 1; transform: translateY(0);}
    }

    .close-modal {
        color: var(--text-secondary);
        position: absolute;
        top: 10px;
        right: 20px;
        font-size: 28px;
        font-weight: bold;
        cursor: pointer;
        transition: var(--transition);
    }

    .close-modal:hover {
        color: var(--primary-color);
    }

    .video-modal .modal-content h3 {
        margin-bottom: 15px;
    }

    .video-container {
        position: relative;
        padding-bottom: 56.25%;
        height: 0;
        overflow: hidden;
    }

    .video-container iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    @media (max-width: 768px) {
        .modal-content {
            width: 95%;
            margin: 10% auto;
        }
    }
`;

document.head.appendChild(modalStyles);

// ------------- Agregar estilos adicionales para navegación móvil -------------

// Media queries para diseño responsivo
(function addResponsiveStyles() {
    const responsiveStyles = document.createElement('style');
    responsiveStyles.textContent = `
        @media (max-width: 768px) {
            .nav-links {
                position: fixed;
                height: 100vh;
                width: 250px;
                top: 0;
                right: -300px;
                background-color: var(--dark-bg);
                z-index: 1001;
                transition: 0.5s;
                padding-top: 60px;
                box-shadow: -5px 0 15px rgba(0, 0, 0, 0.3);
            }
            
            .nav-links ul {
                flex-direction: column;
                padding: 0 20px;
            }
            
            .nav-links ul li {
                margin: 15px 0;
            }
            
            .open-menu, .close-menu {
                display: block;
            }
            
            .close-menu {
                position: absolute;
                top: 20px;
                right: 20px;
            }
            
            .hero-buttons {
                flex-direction: column;
                gap: 15px;
            }
            
            .about-content {
                flex-direction: column;
                text-align: center;
            }
            
            .about-text {
                margin-top: 30px;
            }
            
            .about-text h2::after {
                left: 50%;
                transform: translateX(-50%);
            }
            
            .newsletter-form {
                flex-direction: column;
            }
            
            .newsletter-form input,
            .newsletter-form .btn {
                width: 100%;
                border-radius: 30px;
                margin-bottom: 10px;
            }
        }
    `;
    
    document.head.appendChild(responsiveStyles);
})();