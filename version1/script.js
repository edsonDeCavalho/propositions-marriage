// Navigation mobile
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Fermer le menu mobile lors du clic sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navigation sticky avec effet de transparence
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
    }
    
    lastScroll = currentScroll;
});

// Smooth scroll pour les liens d'ancrage
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Galerie slider
const gallerySlider = document.getElementById('gallery-slider');
const gallerySlides = document.querySelectorAll('.gallery-slide');
const galleryPrev = document.getElementById('gallery-prev');
const galleryNext = document.getElementById('gallery-next');
const galleryDots = document.querySelectorAll('.dot');

let currentSlide = 0;
let slideInterval;

function showSlide(index) {
    // S'assurer que l'index est dans les limites
    if (index >= gallerySlides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = gallerySlides.length - 1;
    } else {
        currentSlide = index;
    }
    
    // Masquer toutes les slides
    gallerySlides.forEach(slide => slide.classList.remove('active'));
    galleryDots.forEach(dot => dot.classList.remove('active'));
    
    // Afficher la slide active
    gallerySlides[currentSlide].classList.add('active');
    galleryDots[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

// Boutons de navigation
if (galleryNext) {
    galleryNext.addEventListener('click', () => {
        nextSlide();
        resetSlideInterval();
    });
}

if (galleryPrev) {
    galleryPrev.addEventListener('click', () => {
        prevSlide();
        resetSlideInterval();
    });
}

// Navigation par points
galleryDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
        resetSlideInterval();
    });
});

// Auto-play du slider
function startSlideInterval() {
    slideInterval = setInterval(nextSlide, 5000);
}

function resetSlideInterval() {
    clearInterval(slideInterval);
    startSlideInterval();
}

// Démarrer l'auto-play si la galerie existe
if (gallerySlides.length > 0) {
    startSlideInterval();
    
    // Pause au survol
    if (gallerySlider) {
        gallerySlider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        gallerySlider.addEventListener('mouseleave', () => {
            startSlideInterval();
        });
    }
}

// Formulaire RSVP
const rsvpForm = document.getElementById('rsvp-form');
const rsvpSuccess = document.getElementById('rsvp-success');

if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Récupérer les données du formulaire
        const formData = new FormData(rsvpForm);
        const data = {
            name: formData.get('name'),
            guests: formData.get('guests'),
            attendance: formData.get('attendance'),
            dietary: formData.get('dietary'),
            message: formData.get('message')
        };
        
        // Ici, vous pouvez ajouter l'envoi des données à un serveur
        // Pour l'instant, on simule juste l'envoi
        console.log('Données RSVP:', data);
        
        // Afficher le message de succès
        rsvpForm.style.display = 'none';
        rsvpSuccess.style.display = 'block';
        
        // Scroll vers le message de succès
        rsvpSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Optionnel: Réinitialiser le formulaire après 5 secondes
        // setTimeout(() => {
        //     rsvpForm.reset();
        //     rsvpForm.style.display = 'block';
        //     rsvpSuccess.style.display = 'none';
        // }, 5000);
    });
}

// Animation au scroll (fade in)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les éléments à animer
const animateElements = document.querySelectorAll('.info-card, .program-item, .timeline-item, .dresscode-card, .hotel-item');

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Effet parallaxe léger pour la section hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Gestion du chargement des images
const images = document.querySelectorAll('img');
images.forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    
    // Si l'image est déjà chargée
    if (img.complete) {
        img.style.opacity = '1';
    } else {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    }
});

// Ajout d'un effet de hover sur les cartes
const cards = document.querySelectorAll('.info-card, .dresscode-card, .hotel-item');
cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    });
});

// Validation du formulaire en temps réel
const formInputs = document.querySelectorAll('#rsvp-form input, #rsvp-form select, #rsvp-form textarea');
formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.hasAttribute('required') && !this.value) {
            this.style.borderColor = '#e74c3c';
        } else {
            this.style.borderColor = '';
        }
    });
    
    input.addEventListener('input', function() {
        if (this.style.borderColor === 'rgb(231, 76, 60)') {
            this.style.borderColor = '';
        }
    });
});

// Gestion du clavier pour la galerie
document.addEventListener('keydown', (e) => {
    if (gallerySlider && document.querySelector('.gallery-slide.active')) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetSlideInterval();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetSlideInterval();
        }
    }
});

// Lazy loading pour les images (amélioration des performances)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Console message de bienvenue
console.log('%c💕 Bienvenue sur le site de mariage de Yannick & Lydia 💕', 'color: #D4A5A5; font-size: 16px; font-weight: bold;');
console.log('%cFait avec amour pour célébrer notre union', 'color: #5A5A5A; font-size: 12px;');


