window.addEventListener('load', function () {
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 500);
});

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

const animateOnScroll = function () {
    const elements = document.querySelectorAll('.feature-card, .stat-item, .event-card');

    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;

        if (elementPosition < screenPosition) {
            element.classList.add('animated');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
document.addEventListener('DOMContentLoaded', animateOnScroll);

const counters = document.querySelectorAll('.stat-number');
const speed = 200;

function animateCounters() {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateCounters, 1);
        } else {
            counter.innerText = target.toLocaleString();
        }
    });
}

const statsSection = document.querySelector('.stats');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

observer.observe(statsSection);

const eventButtons = document.querySelectorAll('.event-details');
const eventModal = document.getElementById('event-modal');
const modalClose = document.querySelectorAll('.modal-close');

eventButtons.forEach(button => {
    button.addEventListener('click', function () {
        const eventId = this.getAttribute('data-event');
        const events = {
            '1': {
                title: 'Workshop de Marketing Digital',
                date: '15 de Outubro 2023',
                location: 'Online',
                description: 'Aprenda as melhores estratégias de marketing para alavancar seus negócios com especialistas do mercado. Este workshop abordará desde conceitos básicos até técnicas avançadas de marketing digital, incluindo SEO, mídias sociais, conteúdo e análise de dados.',
                image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=600&q=80'
            },
            '2': {
                title: 'Congresso de Tecnologia',
                date: '22 de Novembro 2023',
                location: 'Centro de Convenções, São Paulo',
                description: 'As principais inovações e tendências tecnológicas do mercado atual com palestrantes internacionais. O evento contará com keynotes, painéis de discussão e workshops práticos sobre IA, blockchain, cloud computing e muito mais.',
                image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80'
            },
            '3': {
                title: 'Feira de Empreendedorismo',
                date: '05 de Dezembro 2023',
                location: 'Expo Center Norte, São Paulo',
                description: 'Conheça cases de sucesso e network com outros empreendedores de diversos segmentos. A feira reunirá startups, investidores e especialistas para compartilhar conhecimentos e oportunidades de negócios.',
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80'
            }
        };

        const event = events[eventId];
        document.getElementById('modal-event-title').textContent = event.title;
        document.querySelector('.event-modal-date span').textContent = event.date;
        document.querySelector('.event-modal-location span').textContent = event.location;
        document.querySelector('.event-modal-description p').textContent = event.description;
        document.querySelector('.event-modal-image').style.backgroundImage = `url(${event.image})`;

        eventModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

modalClose.forEach(button => {
    button.addEventListener('click', function () {
        eventModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

eventModal.addEventListener('click', function (e) {
    if (e.target === this) {
        this.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

const ctaForm = document.getElementById('cta-form');
ctaForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;

    if (!email.includes('@') || !email.includes('.')) {
        alert('Por favor, insira um e-mail válido.');
        return;
    }

    alert(`Obrigado! Em breve entraremos em contato no e-mail ${email}`);
    this.reset();
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