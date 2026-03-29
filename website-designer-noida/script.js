function toggleFAQ(btn) {
    const answer = btn.nextElementSibling;
    const isOpen = answer.classList.contains('open');
    document.querySelectorAll('.faq-a.open').forEach(a => a.classList.remove('open'));
    document.querySelectorAll('.faq-q[aria-expanded="true"]').forEach(b => b.setAttribute('aria-expanded','false'));
    if (!isOpen) {
      answer.classList.add('open');
      btn.setAttribute('aria-expanded','true');
    }
  }

  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.1 });
  reveals.forEach(r => observer.observe(r));