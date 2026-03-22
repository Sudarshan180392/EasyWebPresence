const hamburgerBtn   = document.getElementById('hamburgerBtn');
const mobileMenu     = document.getElementById('mobileMenu');
const mobileClose    = document.getElementById('mobileClose');
const mobileBackdrop = document.getElementById('mobileBackdrop');
function openMenu() { mobileMenu.classList.add('open'); hamburgerBtn.classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeMenu() { mobileMenu.classList.remove('open'); hamburgerBtn.classList.remove('open'); document.body.style.overflow = ''; }
hamburgerBtn.addEventListener('click', openMenu);
mobileClose.addEventListener('click', closeMenu);
mobileBackdrop.addEventListener('click', closeMenu);
document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

// DRC
document.addEventListener("contextmenu", function(event) {
  event.preventDefault();
});