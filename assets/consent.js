/* Cookie consent + Google Analytics 4. Analytics loads ONLY after the visitor accepts. */
(function () {
  var ID = 'G-EJJ73RSSZY', KEY = 'pg_consent', loaded = false;
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });

  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  function loadGA() {
    if (loaded) return; loaded = true;
    gtag('consent', 'update', { analytics_storage: 'granted' });
    var s = document.createElement('script');
    s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID;
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('config', ID);
  }
  function revoke() {
    gtag('consent', 'update', { analytics_storage: 'denied' });
    window['ga-disable-' + ID] = true;
    document.cookie.split(';').forEach(function (c) {
      var n = c.split('=')[0].trim();
      if (n.indexOf('_ga') === 0) {
        ['', '.' + location.hostname, '.privaglobe.com'].forEach(function (d) {
          document.cookie = n + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + (d ? '; domain=' + d : '');
        });
      }
    });
  }

  var css = document.createElement('style');
  css.textContent = '#pgc{position:fixed;left:12px;right:12px;bottom:calc(12px + env(safe-area-inset-bottom,0px));z-index:40;max-width:620px;margin:0 auto;padding:18px 20px;border-radius:22px;background:rgba(255,255,255,.96);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid #fff;box-shadow:0 20px 60px rgba(79,70,229,.3);color:#1E1B4B;font:400 15px/1.5 "Source Sans 3",system-ui,sans-serif}#pgc p{margin:0 0 12px}#pgc a{color:#4F46E5}#pgc .r{display:flex;gap:10px;flex-wrap:wrap}#pgc button{font:700 14px Sora,system-ui,sans-serif;padding:10px 20px;border-radius:999px;border:1.5px solid #4F46E5;cursor:pointer;background:#fff;color:#4F46E5}#pgc button.y{background:linear-gradient(135deg,#4F46E5,#9333EA);color:#fff;border-color:transparent}#pgc button:focus-visible{outline:3px solid #DB2777;outline-offset:2px}@media(max-width:560px){#pgc{left:8px;right:8px;bottom:84px}}';
  document.head.appendChild(css);

  function close() { var b = document.getElementById('pgc'); if (b) b.remove(); }
  function show() {
    close();
    var b = document.createElement('div');
    b.id = 'pgc'; b.setAttribute('role', 'dialog'); b.setAttribute('aria-label', 'Cookie consent');
    b.innerHTML = '<p>We use Google Analytics cookies to understand how the site is used. They stay off unless you accept. See our <a href="/privacy-policy.html">Privacy Policy</a>.</p><div class="r"><button type="button" class="y">Accept</button><button type="button" class="n">Decline</button></div>';
    b.querySelector('.y').onclick = function () { set('granted'); loadGA(); close(); };
    b.querySelector('.n').onclick = function () { set('denied'); revoke(); close(); };
    document.body.appendChild(b);
  }

  function init() {
    var f = document.querySelector('footer .w > p:last-child, footer .w');
    var l = document.createElement('a');
    l.href = '#'; l.textContent = 'Cookie settings'; l.style.cssText = 'margin-left:14px;text-decoration:underline';
    l.onclick = function (e) { e.preventDefault(); show(); };
    var foot = document.querySelector('footer p[style]') || document.querySelector('footer .w');
    if (foot) foot.appendChild(l);
    var c = get();
    if (c === 'granted') loadGA(); else if (c !== 'denied') show();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
