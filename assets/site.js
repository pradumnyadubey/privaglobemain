/* Shared site script: mobile menu toggle and frame-busting. No inline scripts are used, so the CSP can forbid them. */
(function () {
  // Clickjacking mitigation (meta CSP cannot set frame-ancestors on GitHub Pages)
  try {
    if (window.top !== window.self) { window.top.location = window.self.location; }
  } catch (e) {
    document.documentElement.style.display = 'none';
  }

  var n = document.querySelector('.nav'), m = n && n.querySelector('.menu');
  if (!m) return;
  function set(o) {
    n.classList.toggle('open', o);
    m.setAttribute('aria-expanded', o);
    m.setAttribute('aria-label', o ? 'Close menu' : 'Open menu');
    m.innerHTML = o ? '&times;' : '&#9776;';
  }
  m.addEventListener('click', function () { set(!n.classList.contains('open')); });
  n.querySelectorAll('nav a').forEach(function (a) {
    a.addEventListener('click', function () { set(false); });
  });
})();
