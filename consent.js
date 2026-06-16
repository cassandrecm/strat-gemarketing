// Loi 25 — Gestion du consentement aux témoins
(function () {
  var GA_ID = 'G-2VR2Q9LEE4';
  var STORAGE_KEY = 'ccm_consent';

  function loadGA() {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID);
  }

  function hideBanner() {
    var b = document.getElementById('consent-banner');
    if (b) b.remove();
  }

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    hideBanner();
    loadGA();
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, 'declined');
    hideBanner();
  }

  function showBanner() {
    var banner = document.createElement('div');
    banner.id = 'consent-banner';
    banner.innerHTML = [
      '<div class="consent-inner">',
      '  <div class="consent-text">',
      '    <strong>Témoins de connexion (cookies)</strong>',
      '    <p>Conformément à la <strong>Loi 25</strong>, nous vous informons que ce site utilise Google Analytics pour mesurer son audience. Aucune donnée n\'est collectée sans votre accord.</p>',
      '  </div>',
      '  <div class="consent-actions">',
      '    <button id="consent-decline">Refuser</button>',
      '    <button id="consent-accept">Accepter</button>',
      '  </div>',
      '</div>'
    ].join('');

    var style = document.createElement('style');
    style.textContent = [
      '#consent-banner {',
      '  position: fixed; bottom: 0; left: 0; right: 0; z-index: 9998;',
      '  background: #161614; color: #EDECE7;',
      '  padding: 20px 32px;',
      '  border-top: 1px solid rgba(237,236,231,.15);',
      '  font-family: "DM Sans", sans-serif;',
      '  animation: slideUp .35s ease;',
      '}',
      '@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }',
      '.consent-inner {',
      '  max-width: 1100px; margin: 0 auto;',
      '  display: flex; align-items: center; justify-content: space-between; gap: 32px; flex-wrap: wrap;',
      '}',
      '.consent-text strong { font-size: 14px; font-weight: 600; display: block; margin-bottom: 4px; color: #fff; }',
      '.consent-text p { font-size: 13px; color: rgba(237,236,231,.65); line-height: 1.5; margin: 0; }',
      '.consent-actions { display: flex; gap: 10px; flex-shrink: 0; }',
      '#consent-decline {',
      '  padding: 10px 20px; border-radius: 6px; font-size: 13px; font-weight: 500; cursor: pointer;',
      '  background: transparent; color: rgba(237,236,231,.6); border: 1px solid rgba(237,236,231,.25);',
      '  transition: all .2s; font-family: inherit;',
      '}',
      '#consent-decline:hover { color: #fff; border-color: rgba(237,236,231,.6); }',
      '#consent-accept {',
      '  padding: 10px 20px; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer;',
      '  background: #B81C1C; color: #fff; border: none;',
      '  transition: background .2s; font-family: inherit;',
      '}',
      '#consent-accept:hover { background: #8C1515; }',
      '@media (max-width: 600px) {',
      '  #consent-banner { padding: 16px 20px; }',
      '  .consent-inner { flex-direction: column; gap: 16px; }',
      '  .consent-actions { width: 100%; }',
      '  #consent-decline, #consent-accept { flex: 1; text-align: center; }',
      '}'
    ].join('\n');

    document.head.appendChild(style);
    document.body.appendChild(banner);

    document.getElementById('consent-accept').addEventListener('click', accept);
    document.getElementById('consent-decline').addEventListener('click', decline);
  }

  // Vérifier si un choix a déjà été fait
  var stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'accepted') {
    loadGA();
  } else if (!stored) {
    // Attendre que le DOM soit prêt
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', showBanner);
    } else {
      showBanner();
    }
  }
})();
