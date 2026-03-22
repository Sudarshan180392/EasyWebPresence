const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

/* Stagger service cards */
document.querySelectorAll('.svc-card').forEach((c, i) => {
  c.style.transitionDelay = i * 0.07 + 's';
  c.classList.add('reveal');
  obs.observe(c);
});

/* Stagger why cards */
document.querySelectorAll('.why-card').forEach((c, i) => {
  c.style.transitionDelay = i * 0.1 + 's';
  c.classList.add('reveal');
  obs.observe(c);
});

/* Hamburger */
const hamburgerBtn   = document.getElementById('hamburgerBtn');
const mobileMenu     = document.getElementById('mobileMenu');
const mobileClose    = document.getElementById('mobileClose');
const mobileBackdrop = document.getElementById('mobileBackdrop');

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
document.querySelectorAll('.mobile-link').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMenu();
});