window.addEventListener('load', function () {
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 500);
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
const profileDropdownToggle = document.querySelector('.profile-dropdown-toggle');
const profileDropdownMenu = document.querySelector('.profile-dropdown-menu');

profileDropdownToggle.addEventListener('click', function () {
    profileDropdownMenu.style.display = profileDropdownMenu.style.display === 'block' ? 'none' : 'block';
});

document.addEventListener('click', function (e) {
    if (!e.target.closest('.profile-dropdown')) {
        profileDropdownMenu.style.display = 'none';
    }
});

const profileTabs = document.querySelectorAll('.profile-tab');
profileTabs.forEach(tab => {
    tab.addEventListener('click', function () {
        profileTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');

    });
});

const profileMenuLinks = document.querySelectorAll('.profile-menu-link');
profileMenuLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        profileMenuLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');

    });
});


document.addEventListener('DOMContentLoaded', function () {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');

        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            const isOpen = menu.style.display === 'block';

            document.querySelectorAll('.dropdown-menu').forEach(m => {
                m.style.display = 'none';
            });

            menu.style.display = isOpen ? 'none' : 'block';
        });
    });

    document.addEventListener('click', function (e) {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.style.display = 'none';
            });
        }
    });
});