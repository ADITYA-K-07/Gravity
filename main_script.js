// ===========================
// NAVBAR — scroll behavior + active section
// ===========================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
navbar.classList.toggle('scrolled', window.scrollY > 60);

// Active link highlight
let current = '';
sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
});
navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
});
});

// ===========================
// HAMBURGER MENU
// ===========================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobLinks = document.querySelectorAll('.mob-link');

hamburger.addEventListener('click', () => {
hamburger.classList.toggle('open');
mobileMenu.classList.toggle('open');
document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});
mobLinks.forEach(link => {
link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
});
});

// ===========================
// SCROLL ANIMATIONS (fade-up)
// ===========================
const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
    if (entry.isIntersecting) {
    entry.target.classList.add('visible');
    }
});
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ===========================
// COUNTER ANIMATION
// ===========================
function animateCounter(el) {
const target = parseFloat(el.dataset.target);
const suffix = el.dataset.suffix || '';
const decimal = parseInt(el.dataset.decimal || 0);
const duration = 1800;
const start = performance.now();

function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const ease = 1 - Math.pow(1 - progress, 3);
    const value = target * ease;
    el.textContent = (decimal > 0 ? value.toFixed(decimal) : Math.floor(value)) + suffix;
    if (progress < 1) requestAnimationFrame(update);
}
requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
entries.forEach(entry => {
    if (entry.isIntersecting) {
    animateCounter(entry.target);
    counterObserver.unobserve(entry.target);
    }
});
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

// ===========================
// SMOOTH SCROLL for anchor links
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
});
});