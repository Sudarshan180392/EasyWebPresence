const revealEls = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 80);
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    revealEls.forEach(el => observer.observe(el));

    // Hamburger
   const hamburgerBtn   = document.getElementById('hamburgerBtn');
const mobileMenu     = document.getElementById('mobileMenu');
const mobileClose    = document.getElementById('mobileClose');
const mobileBackdrop = document.getElementById('mobileBackdrop');
function openMenu()  { mobileMenu.classList.add('open'); hamburgerBtn.classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeMenu() { mobileMenu.classList.remove('open'); hamburgerBtn.classList.remove('open'); document.body.style.overflow = ''; }
hamburgerBtn.addEventListener('click', openMenu);
mobileClose.addEventListener('click', closeMenu);
mobileBackdrop.addEventListener('click', closeMenu);
document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
    // Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.testi-card:not([style*="dashed"])');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        cards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });

    // DRC
document.addEventListener("contextmenu", function(event) {
  event.preventDefault();
});