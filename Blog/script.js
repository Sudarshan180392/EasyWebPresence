/* Tab switching */
function switchTab(tab) {
  document.querySelectorAll('.tab-btn').forEach(function(b) { b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
  document.querySelectorAll('.tab-panel').forEach(function(p) { p.classList.remove('active'); });
  document.getElementById('tab-'+tab).classList.add('active');
  document.getElementById('tab-'+tab).setAttribute('aria-selected','true');
  document.getElementById('panel-'+tab).classList.add('active');
}

/* Toggle full article */
function toggleArticle(id, btnId) {
  var full = document.getElementById(id);
  var btn  = document.getElementById(btnId);
  var isOpen = full.classList.contains('open');
  full.classList.toggle('open');
  btn.textContent = isOpen ? 'Read Full Article' : 'Collapse Article';
  if (!isOpen) {
    setTimeout(function() { full.scrollIntoView({ behavior:'smooth', block:'nearest' }); }, 80);
  }
}

/* Share */
function shareArticle() {
  if (navigator.share) {
    navigator.share({
      title: 'Why You Might Need an HTML CSS JS Website — Not WordPress',
      text: 'An honest breakdown on why custom-coded websites outperform WordPress for small businesses in India.',
      url: window.location.href
    }).catch(function(){});
  } else {
    navigator.clipboard.writeText(window.location.href).then(function() {
      alert('Link copied to clipboard!');
    }).catch(function() { prompt('Copy this link:', window.location.href); });
  }
}

/* Scroll reveal */
function initReveal() {
  var els = document.querySelectorAll('.fade-in');
  if (!('IntersectionObserver' in window)) { els.forEach(function(el){ el.style.opacity='1'; el.style.transform='none'; }); return; }
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) { if (e.isIntersecting) { e.target.style.opacity='1'; e.target.style.transform='translateY(0)'; obs.unobserve(e.target); } });
  }, { threshold: 0.06 });
  els.forEach(function(el, i) {
    el.style.opacity='0'; el.style.transform='translateY(22px)';
    el.style.transition='opacity .65s ease, transform .65s ease';
    el.style.transitionDelay=(i*0.07)+'s';
    obs.observe(el);
  });
}
initReveal();

/* Newsletter */
async function handleSubscribe(e) {
  e.preventDefault();
  var btn=e.target.querySelector('.nl-btn'), input=e.target.querySelector('.nl-input'), note=document.getElementById('nl-note');
  btn.textContent='Adding you...'; btn.disabled=true;
  try {
    var r=await fetch('/api/subscribe',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({email:input.value.trim()})});
    var d=await r.json();
    if (!r.ok) throw new Error(d.error||'Something went wrong');
    btn.textContent="You're on the list!"; btn.style.cssText='background:rgba(201,149,74,.15);color:#e2b87a;border:1px solid #c9954a;';
    input.value=''; input.placeholder='Check your inbox!';
    note.textContent="Welcome email sent. We'll be in touch when we publish.";
  } catch(err) {
    btn.textContent='Try Again'; btn.disabled=false;
    note.textContent='Something went wrong. Please try again or email us directly.'; note.style.color='#e07070';
  }
}

/* Hamburger */
var hBtn=document.getElementById('hamburgerBtn'), mMenu=document.getElementById('mobileMenu'), mClose=document.getElementById('mobileClose'), mBack=document.getElementById('mobileBackdrop');
function openMenu(){ mMenu.classList.add('open'); hBtn.classList.add('open'); hBtn.setAttribute('aria-expanded','true'); document.body.style.overflow='hidden'; }
function closeMenu(){ mMenu.classList.remove('open'); hBtn.classList.remove('open'); hBtn.setAttribute('aria-expanded','false'); document.body.style.overflow=''; }
hBtn.addEventListener('click',openMenu); mClose.addEventListener('click',closeMenu); mBack.addEventListener('click',closeMenu);
document.querySelectorAll('.mobile-link').forEach(function(l){ l.addEventListener('click',closeMenu); });
document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&mMenu.classList.contains('open')) closeMenu(); });

/* Disable right click */
document.addEventListener('contextmenu',function(e){ e.preventDefault(); });