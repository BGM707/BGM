// Esperar a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', function () {

    // -------------------- Mensaje de bienvenida en varios idiomas --------------------
    const welcomeElement = document.getElementById('welcome'); // Obtener el elemento donde se mostrará el mensaje
    const welcomeMessages = [ // Array con los mensajes de bienvenida en diferentes idiomas
        "Bienvenido", "Welcome", "Bienvenue", "Willkommen", "Benvenuto",
        "ようこそ", "欢迎", "Bem-vindo", "Добро пожаловать", "환영합니다",
        "Akukonpayamün, kuyaykuyay", "Karşılama", "Hoş geldiniz", "wena ql"
    ];
    let currentIndex = 0; // Índice para rastrear el mensaje actual

    // Función para cambiar el mensaje de bienvenida
    function changeWelcomeMessage() {
        welcomeElement.textContent = welcomeMessages[currentIndex]; // Actualizar el texto del mensaje
        currentIndex = (currentIndex + 1) % welcomeMessages.length; // Avanzar al siguiente mensaje
    }

    // Establecer el mensaje de bienvenida inicial según la hora del día
    const date = new Date(); // Obtener la fecha y hora actual
    const hours = date.getHours(); // Obtener la hora actual
    let welcomeMessage = ''; // Variable para almacenar el mensaje inicial

    if (hours >= 0 && hours < 12) {
        welcomeMessage = 'Buenos días'; // Mensaje para la mañana
    } else if (hours >= 12 && hours < 18) {
        welcomeMessage = 'Buenas tardes'; // Mensaje para la tarde
    } else {
        welcomeMessage = 'Buenas noches'; // Mensaje para la noche
    }

    welcomeElement.textContent = welcomeMessage; // Mostrar el mensaje inicial

    // Cambiar el mensaje de bienvenida cada 3 segundos
    setInterval(changeWelcomeMessage, 3000);

    // -------------------- Funcionalidad de gotas de sangre --------------------
    function initBloodDrops() {
        const heroSection = document.querySelector('.hero'); // Obtener la sección hero

        // Función para crear una gota de sangre
        function createBloodDrop() {
            const bloodDrop = document.createElement('div'); // Crear un nuevo elemento div
            bloodDrop.classList.add('blood-drop'); // Añadir la clase CSS

            // Posición aleatoria en el eje X
            const randomX = Math.random() * window.innerWidth;
            bloodDrop.style.left = `${randomX}px`;

            // Tamaño aleatorio entre 10px y 30px
            const size = Math.random() * 20 + 10;
            bloodDrop.style.width = `${size}px`;
            bloodDrop.style.height = `${size}px`;

            // Duración de la animación aleatoria entre 1s y 3s
            const animationDuration = Math.random() * 2 + 1;
            bloodDrop.style.animationDuration = `${animationDuration}s`;

            // Añadir la gota al contenedor hero
            heroSection.appendChild(bloodDrop);

            // Eliminar la gota después de que termine la animación
            bloodDrop.addEventListener('animationend', () => {
                bloodDrop.remove();
            });
        }

        // Crear una nueva gota cada 500ms
        setInterval(createBloodDrop, 500);
    }

    // Inicializar las gotas de sangre
    initBloodDrops();

    // -------------------- Funcionalidad de la barra de navegación --------------------
    function initNavbar() {
        const navbar = document.querySelector('.header'); // Obtener la barra de navegación
        const navLinks = document.querySelectorAll('.nav-links ul li a'); // Obtener todos los enlaces de navegación
        const menuBtn = document.getElementById('openMenu'); // Botón para abrir el menú móvil
        const closeBtn = document.getElementById('closeMenu'); // Botón para cerrar el menú móvil
        const navLinksContainer = document.getElementById('navLinks'); // Contenedor de los enlaces de navegación

        // Cambiar el estilo de la barra de navegación al hacer scroll
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled'); // Añadir clase 'scrolled' al hacer scroll
            } else {
                navbar.classList.remove('scrolled'); // Quitar clase 'scrolled' al volver al inicio
            }
        });

        // Agregar la clase 'active' al enlace de navegación correspondiente
        window.addEventListener('scroll', function () {
            let current = ''; // Variable para almacenar la sección actual
            const sections = document.querySelectorAll('section[id]'); // Obtener todas las secciones con ID

            sections.forEach(section => {
                const sectionTop = section.offsetTop; // Posición superior de la sección
                const sectionHeight = section.clientHeight; // Altura de la sección

                if (pageYOffset >= (sectionTop - 200)) {
                    current = section.getAttribute('id'); // Obtener el ID de la sección actual
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active'); // Quitar la clase 'active' de todos los enlaces
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active'); // Añadir la clase 'active' al enlace correspondiente
                }
            });
        });

        // Abrir el menú móvil
        menuBtn.addEventListener('click', function () {
            navLinksContainer.style.right = '0'; // Mostrar el menú
        });

        // Cerrar el menú móvil
        closeBtn.addEventListener('click', function () {
            navLinksContainer.style.right = '-300px'; // Ocultar el menú
        });

        // Cerrar el menú al hacer clic en un enlace (solo en móviles)
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                if (window.innerWidth <= 768) {
                    navLinksContainer.style.right = '-300px'; // Ocultar el menú
                }
            });
        });
    }

    // Inicializar la barra de navegación
    initNavbar();

    // -------------------- Funcionalidad de los formularios --------------------
    function initContactForm() {
        const contactForm = document.getElementById('contactForm'); // Obtener el formulario de contacto

        if (!contactForm) return; // Si no existe, salir de la función

        // Manejar el envío del formulario
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Evitar el envío por defecto

            // Mostrar una alerta de éxito con SweetAlert2
            Swal.fire({
                title: '¡Mensaje Enviado!',
                text: 'Gracias por contactarme. Te responderé pronto.',
                icon: 'success',
                confirmButtonColor: '#1db954'
            });

            contactForm.reset(); // Limpiar el formulario
        });
    }

    function initNewsletterForm() {
        const newsletterForm = document.getElementById('newsletterForm'); // Obtener el formulario de newsletter

        if (!newsletterForm) return; // Si no existe, salir de la función

        // Manejar el envío del formulario
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Evitar el envío por defecto

            // Mostrar una alerta de éxito con SweetAlert2
            Swal.fire({
                title: '¡Suscripción Exitosa!',
                text: 'Gracias por suscribirte a mi newsletter.',
                icon: 'success',
                confirmButtonColor: '#1db954'
            });

            newsletterForm.reset(); // Limpiar el formulario
        });
    }

    // Inicializar los formularios
    initContactForm();
    initNewsletterForm();

    // -------------------- Funcionalidad de las tarjetas de música y videos --------------------
    function renderMusicCards(category = 'all') {
        const musicCardsContainer = document.getElementById('musicCards'); // Obtener el contenedor de las tarjetas de música

        if (!musicCardsContainer) return; // Si no existe, salir de la función

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
            button.addEventListener('click', function () {
                const spotifyUrl = this.getAttribute('data-spotify');
                openSpotifyPlayer(spotifyUrl);
            });
        });
    }

    function renderVideoCards(category = 'all') {
        const videoCardsContainer = document.getElementById('videoCards'); // Obtener el contenedor de las tarjetas de video

        if (!videoCardsContainer) return; // Si no existe, salir de la función

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
            button.addEventListener('click', function () {
                const videoUrl = this.getAttribute('data-video');
                openVideoModal(videoUrl, this.closest('.card').querySelector('.card-title').textContent);
            });
        });
    }

    // Inicializar los filtros para música y videos
    function initFilters() {
        // Filtros de música
        const musicFilterBtns = document.querySelectorAll('.music-section .filter-btn');
        musicFilterBtns.forEach(btn => {
            btn.addEventListener('click', function () {
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
            btn.addEventListener('click', function () {
                // Actualizar estado activo del botón
                videoFilterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                // Aplicar filtro
                const category = this.getAttribute('data-filter');
                renderVideoCards(category);
            });
        });
    }

    // Inicializar los filtros
    initFilters();

    // -------------------- Funcionalidad de reproductor y modal --------------------
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
        closeBtn.addEventListener('click', function () {
            document.body.removeChild(modal);
        });

        // Cerrar modal al hacer clic fuera del contenido
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

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
        closeBtn.addEventListener('click', function () {
            document.body.removeChild(modal);
        });

        // Cerrar modal al hacer clic fuera del contenido
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }
});