/* Scroll Reveal */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* Stagger USP cards */
document.querySelectorAll('.usp-card').forEach((card, i) => {
  card.style.transitionDelay = i * 0.07 + 's';
  card.classList.add('reveal');
  revealObs.observe(card);
});

/* Stagger tier cards */
document.querySelectorAll('.tier-card').forEach((card, i) => {
  card.style.transitionDelay = i * 0.12 + 's';
  revealObs.observe(card);
});

/* FAQ Accordion */
function toggleFAQ(btn) {
  const item = btn.closest('.faq-item');
  const answer = item.querySelector('.faq-a');
  const icon = btn.querySelector('.faq-icon');
  const isOpen = answer.classList.contains('open');
  document.querySelectorAll('.faq-a.open').forEach(a => a.classList.remove('open'));
  document.querySelectorAll('.faq-icon.open').forEach(ic => ic.classList.remove('open'));
  document.querySelectorAll('.faq-q').forEach(q => q.setAttribute('aria-expanded','false'));
  if (!isOpen) {
    answer.classList.add('open');
    icon.classList.add('open');
    btn.setAttribute('aria-expanded','true');
  }
}

/* Active nav link */
const navLinks = document.querySelectorAll('.nav-links a');
const sectionObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + e.target.id
          ? 'var(--gold-light)' : 'rgba(244,240,234,.5)';
      });
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('section[id]').forEach(s => sectionObs.observe(s));

/* ── HAMBURGER MENU ── */
const hamburgerBtn   = document.getElementById('hamburgerBtn');
const mobileMenu     = document.getElementById('mobileMenu');
const mobileClose    = document.getElementById('mobileClose');
const mobileBackdrop = document.getElementById('mobileBackdrop');
const mobileLinks    = document.querySelectorAll('.mobile-link');

function openMenu() {
  mobileMenu.classList.add('open');
  hamburgerBtn.classList.add('open');
  hamburgerBtn.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  mobileMenu.classList.remove('open');
  hamburgerBtn.classList.remove('open');
  hamburgerBtn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

hamburgerBtn.addEventListener('click', openMenu);
mobileClose.addEventListener('click', closeMenu);
mobileBackdrop.addEventListener('click', closeMenu);
mobileLinks.forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMenu();
});