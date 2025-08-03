const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

menuToggle.addEventListener('click', function () {
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !isExpanded);
    nav.classList.toggle('active');
    this.innerHTML = isExpanded ? '<i class="fas fa-bars"></i>' : '<i class="fas fa-times"></i>';
});

const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 992) {
            menuToggle.setAttribute('aria-expanded', 'false');
            nav.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});

const header = document.getElementById('main-header');
window.addEventListener('scroll', function () {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    const icon = this.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
}

const ratingStars = document.querySelectorAll('.rating-star');
const ratingValue = document.getElementById('rating-value');

ratingStars.forEach(star => {
    star.addEventListener('click', function () {
        const rating = parseInt(this.getAttribute('data-rating'));

        ratingStars.forEach((s, index) => {
            if (index < rating) {
                s.classList.remove('far');
                s.classList.add('fas');
            } else {
                s.classList.remove('fas');
                s.classList.add('far');
            }
        });

        ratingValue.value = rating;
    });

    star.addEventListener('mouseover', function () {
        const rating = parseInt(this.getAttribute('data-rating'));

        ratingStars.forEach((s, index) => {
            if (index < rating) {
                s.classList.add('hover');
            } else {
                s.classList.remove('hover');
            }
        });
    });

    star.addEventListener('mouseout', function () {
        ratingStars.forEach(s => {
            s.classList.remove('hover');
        });
    });
});

const imageModal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');
const modalClose = document.querySelector('.modal-close');
const reviewImages = document.querySelectorAll('.review-image img');

reviewImages.forEach(img => {
    img.addEventListener('click', function () {
        modalImage.src = this.src;
        modalImage.alt = this.alt;
        imageModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

modalClose.addEventListener('click', function () {
    imageModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

imageModal.addEventListener('click', function (e) {
    if (e.target === this) {
        this.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

const helpfulButtons = document.querySelectorAll('.helpful-btn');

helpfulButtons.forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault();
        const countElement = this.nextElementSibling;
        let count = parseInt(countElement.textContent);
        countElement.textContent = (count + 1) + ' pessoas acharam isso útil';

        this.disabled = true;
        this.style.opacity = '0.7';
        this.style.cursor = 'default';
    });
});

const eventFilter = document.getElementById('event-filter');
const groupFilter = document.getElementById('group-filter');
const ratingFilter = document.getElementById('rating-filter');
const sortFilter = document.getElementById('sort-filter');

[eventFilter, groupFilter, ratingFilter, sortFilter].forEach(filter => {
    filter.addEventListener('change', function () {
        console.log('Filtrando avaliações...');
        console.log('Evento:', eventFilter.value);
        console.log('Grupo:', groupFilter.value);
        console.log('Avaliação:', ratingFilter.value);
        console.log('Ordenar por:', sortFilter.value);

        const reviewsContainer = document.querySelector('.reviews-container');
        reviewsContainer.style.opacity = '0.5';

        setTimeout(() => {
            reviewsContainer.style.opacity = '1';
        }, 500);
    });
});

const feedbackForm = document.getElementById('feedback-form');

feedbackForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!ratingValue.value) {
        alert('Por favor, selecione uma avaliação com as estrelas.');
        return;
    }

    alert('Obrigado pelo seu feedback! Sua avaliação foi enviada com sucesso.');
    this.reset();

    ratingStars.forEach(star => {
        star.classList.remove('fas');
        star.classList.add('far');
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            if (history.pushState) {
                history.pushState(null, null, targetId);
            } else {
                location.hash = targetId;
            }
        }
    });
});