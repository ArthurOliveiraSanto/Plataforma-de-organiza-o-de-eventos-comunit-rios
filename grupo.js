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

const createGroupButton = document.getElementById('create-group-button');
const createGroupModal = document.getElementById('create-group-modal');
const modalCloseButtons = document.querySelectorAll('.modal-close');

createGroupButton.addEventListener('click', function () {
    createGroupModal.classList.add('active');
    document.body.style.overflow = 'hidden';
});

modalCloseButtons.forEach(button => {
    button.addEventListener('click', function () {
        createGroupModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

createGroupModal.addEventListener('click', function (e) {
    if (e.target === this) {
        this.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

const createGroupForm = document.getElementById('create-group-form');
createGroupForm.addEventListener('submit', function (e) {
    e.preventDefault();

    alert('Grupo criado com sucesso!');
    createGroupModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    this.reset();
});

const filterSelects = document.querySelectorAll('.filter-select');
filterSelects.forEach(select => {
    select.addEventListener('click', function () {
        filterSelects.forEach(s => s.classList.remove('active'));
        this.classList.add('active');

    });
});