/* =========================================================
   EXIT-INTENT POPUP â€” drop-in script
   =========================================================
   HOW TO USE:
   1. Save this file as "exit-popup.js" and upload it to your
      website (e.g. alongside your other .js/.css files).
   2. On every page where you want the popup, add this single
      line right before the closing </body> tag:

        <script src="exit-popup.js"></script>

   That's it â€” no other HTML or CSS needs to be added to your
   pages. This script injects everything itself.

   CUSTOMIZE:
   - Colors/fonts: this now pulls from your site's existing CSS variables
     (--navy-mid, --gold, --gold-light, --white, --muted, --border) and
     fonts ('Cormorant Garamond', 'Jost'), so it matches style.css
     automatically. The fallback values after each var() are just
     backups in case those variables aren't defined on a given page.
   - Headline / offer text: edit the HTML in injectMarkup().
   - Delay / cooldown timings: edit the constants in initPopup().
   - What happens on submit: edit the form submit handler near
     the bottom â€” currently just shows an alert.
   ========================================================= */

(function () {

  // ---------------------------------------------------------
  // 1. INJECT CSS
  // ---------------------------------------------------------
  function injectStyles() {
    var css = `
      .exit-popup-overlay {
        position: fixed;
        inset: 0;
        background: rgba(6, 10, 20, 0.78);
        backdrop-filter: blur(4px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease;
        padding: 16px;
        font-family: 'Jost', sans-serif;
      }

      .exit-popup-overlay.active {
        opacity: 1;
        visibility: visible;
      }

      .exit-popup-card {
        background: var(--navy-mid, #112040);
        border: 1px solid var(--border, rgba(201,149,74,.22));
        width: 100%;
        max-width: 420px;
        box-shadow: 6px 6px 0 var(--gold, #c9954a);
        transform: translateY(20px) scale(0.97);
        transition: transform 0.3s ease;
        position: relative;
      }

      .exit-popup-overlay.active .exit-popup-card {
        transform: translateY(0) scale(1);
      }

      .exit-popup-header {
        padding: 2.25rem 2rem 1.5rem;
        text-align: center;
        border-bottom: 1px solid var(--border, rgba(201,149,74,.22));
      }

      .exit-popup-eyebrow {
        font-size: .7rem;
        font-weight: 600;
        letter-spacing: .14em;
        text-transform: uppercase;
        color: var(--gold, #c9954a);
        margin-bottom: .6rem;
      }

      .exit-popup-header h2 {
        margin: 0;
        font-family: 'Cormorant Garamond', serif;
        font-size: 2rem;
        font-weight: 700;
        line-height: 1.1;
        color: var(--white, #f4f0ea);
      }

      .exit-popup-header h2 em {
        font-style: italic;
        color: var(--gold-light, #e2b87a);
      }

      .exit-popup-header p {
        margin: .65rem 0 0;
        font-size: .85rem;
        font-weight: 300;
        color: var(--muted, rgba(244,240,234,.5));
      }

      .exit-popup-close {
        position: absolute;
        top: .9rem;
        right: .9rem;
        width: 34px;
        height: 34px;
        background: transparent;
        border: 1px solid var(--border, rgba(201,149,74,.22));
        color: var(--gold, #c9954a);
        font-size: 1.1rem;
        line-height: 1;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
      }

      .exit-popup-close:hover {
        background: var(--gold, #c9954a);
        color: var(--navy, #0b1526);
        border-color: var(--gold, #c9954a);
      }

      .exit-popup-body {
        padding: 1.75rem 2rem 2rem;
      }

      .exit-popup-body label {
        display: block;
        font-size: .7rem;
        font-weight: 600;
        letter-spacing: .1em;
        text-transform: uppercase;
        color: var(--gold, #c9954a);
        margin-bottom: .6rem;
      }

      .exit-popup-input {
        margin-bottom: 1.25rem;
      }

      .exit-popup-input input {
        width: 100%;
        padding: .85rem 1rem;
        background: var(--navy, #0b1526);
        border: 1px solid var(--border, rgba(201,149,74,.22));
        color: var(--white, #f4f0ea);
        font-family: 'Jost', sans-serif;
        font-size: .9rem;
        box-sizing: border-box;
        transition: border-color 0.2s;
      }

      .exit-popup-input input::placeholder {
        color: var(--muted, rgba(244,240,234,.5));
      }

      .exit-popup-input input:focus {
        outline: none;
        border-color: var(--gold, #c9954a);
      }

      .exit-popup-submit {
        width: 100%;
        padding: .9rem;
        background: linear-gradient(135deg, var(--gold, #c9954a) 0%, var(--gold-light, #e2b87a) 100%);
        color: var(--navy, #0b1526);
        border: none;
        font-family: 'Jost', sans-serif;
        font-weight: 600;
        font-size: .82rem;
        letter-spacing: .08em;
        text-transform: uppercase;
        cursor: pointer;
        transition: all 0.25s;
      }

      .exit-popup-submit:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(201,149,74,.35);
      }

      .exit-popup-fineprint {
        margin-top: .9rem;
        font-size: .7rem;
        font-weight: 300;
        letter-spacing: .03em;
        color: var(--muted, rgba(244,240,234,.5));
        text-align: center;
      }
    `;

    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  }

  // ---------------------------------------------------------
  // 2. INJECT HTML MARKUP
  // ---------------------------------------------------------
  function injectMarkup() {
    var html = `
      <div class="exit-popup-overlay" id="exitPopupOverlay">
        <div class="exit-popup-card">
          <div class="exit-popup-header">
            <button class="exit-popup-close" id="exitPopupClose" aria-label="Close">&times;</button>
            <div class="exit-popup-eyebrow">&#9670; Before You Go</div>
            <h2>Get <em>10% Off</em> Your Project</h2>
            <p>Leave your number and we'll send your discount code on WhatsApp</p>
          </div>
          <div class="exit-popup-body">
            <form id="exitPopupForm">
              <label for="exitPopupEmail">Email Address</label>
              <div class="exit-popup-input">
                <input type="email" id="exitPopupEmail" name="email" placeholder="Enter your email address" required>
              </div>
              <label for="exitPopupPhone">Mobile Number</label>
              <div class="exit-popup-input">
                <input type="tel" id="exitPopupPhone" name="phone" placeholder="Enter your mobile number" required pattern="[0-9]{10}">
              </div>
              <button type="submit" class="exit-popup-submit">Claim My Discount</button>
              <div class="exit-popup-fineprint">
                We respect your privacy. No spam, ever.
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
  }

  // ---------------------------------------------------------
  // 3. POPUP BEHAVIOR
  // ---------------------------------------------------------
  function initPopup() {
    var overlay = document.getElementById('exitPopupOverlay');
    var closeBtn = document.getElementById('exitPopupClose');
    var form = document.getElementById('exitPopupForm');
    var STORAGE_KEY = 'exitPopupConverted'; // only set once they actually claim the offer
    var COOLDOWN_MS = 4000;                 // wait this long after a close before it can re-trigger
    var INACTIVITY_MS = 30000;              // fallback delay if exit-intent never fires
    var visible = false;

    function showPopup() {
      if (visible) return;
      if (sessionStorage.getItem(STORAGE_KEY)) return; // already claimed the offer this session
      overlay.classList.add('active');
      visible = true;
    }

    function closePopup() {
      overlay.classList.remove('active');
      setTimeout(function () { visible = false; }, COOLDOWN_MS);
    }

    // Desktop: exit-intent (mouse moves toward top of the window)
    document.addEventListener('mouseout', function (e) {
      if (e.clientY < 10 && !e.relatedTarget) {
        showPopup();
      }
    });

    // Mobile: back-button / back-gesture intent
    history.pushState(null, '', location.href);
    window.addEventListener('popstate', function () {
      showPopup();
      history.pushState(null, '', location.href); // stay on page
    });

    // Fallback for everyone
    setTimeout(showPopup, INACTIVITY_MS);

    // Close interactions
    closeBtn.addEventListener('click', closePopup);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closePopup();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closePopup();
    });

    // Form submission
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // ====================================================================
      // STEP 1: Sign up at https://formspree.io and create a form.
      // STEP 2: Replace YOUR_FORM_ID below with the ID Formspree gives you
      //         (the part after https://formspree.io/f/ )
      // STEP 3: Submit the form once on your live site, then click the
      //         confirmation link Formspree emails you - this activates it.
      // ====================================================================
      var FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

      var submitBtn = form.querySelector('.exit-popup-submit');
      var emailVal = document.getElementById('exitPopupEmail').value;
      var phoneVal = document.getElementById('exitPopupPhone').value;

      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';

      fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: emailVal,
          phone: phoneVal,
          _subject: 'New 10% off lead - exit popup',
          source_page: window.location.href
        })
      })
        .then(function (response) {
          if (!response.ok) throw new Error('Submission failed');
          alert('Thanks! Your code is WELCOME10 - we will text it to you shortly.');
          sessionStorage.setItem(STORAGE_KEY, '1'); // don't show again this session
          closePopup();
        })
        .catch(function () {
          alert('Something went wrong. Please try again, or message us on WhatsApp.');
          submitBtn.disabled = false;
          submitBtn.textContent = 'Claim My Discount';
        });
    });
  }

  // ---------------------------------------------------------
  // 4. BOOTSTRAP
  // ---------------------------------------------------------
  function start() {
    injectStyles();
    injectMarkup();
    initPopup();
  }

  if (document.body) {
    start();
  } else {
    document.addEventListener('DOMContentLoaded', start);
  }

})();