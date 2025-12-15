// Language management
let currentLang = localStorage.getItem('language') || 'en';

const langNames = {
    en: 'EN',
    ru: 'RU',
    fr: 'FR',
    es: 'ES',
    pt: 'PT',
    zh: '中文',
    ja: '日本語'
};

function getNestedValue(obj, path) {
    return path.split('.').reduce((o, p) => o && o[p], obj);
}

function translatePage(lang) {
    const t = translations[lang];
    if (!t) return;
    
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        const translation = getNestedValue(t, key);
        if (translation) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.value = translation;
            } else {
                el.textContent = translation;
            }
        }
    });
    
    document.documentElement.lang = lang;
    currentLang = lang;
    localStorage.setItem('language', lang);
    document.getElementById('currentLang').textContent = langNames[lang] || lang.toUpperCase();
}

// Initialize language
translatePage(currentLang);

// Language selector
const langBtn = document.getElementById('langBtn');
const langDropdown = document.getElementById('langDropdown');

langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    langDropdown.classList.toggle('active');
});

document.querySelectorAll('.lang-dropdown a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = link.getAttribute('data-lang');
        translatePage(lang);
        langDropdown.classList.remove('active');
    });
});

document.addEventListener('click', (e) => {
    if (!langBtn.contains(e.target) && !langDropdown.contains(e.target)) {
        langDropdown.classList.remove('active');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to header
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.background = 'rgba(10, 14, 39, 0.98)';
    } else {
        header.style.background = 'rgba(10, 14, 39, 0.9)';
    }
    
    lastScroll = currentScroll;
});

// Add fade-in animation on scroll
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

// Observe sections for fade-in
document.querySelectorAll('.section, .feature-card, .social-card, .character-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
