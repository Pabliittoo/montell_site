(() => {
  const current = document.documentElement.lang === 'en' ? 'en' : 'uk';
  const explicit = new URLSearchParams(location.search).get('lang');
  let preferred;
  try {
    if (explicit === 'uk' || explicit === 'en') {
      localStorage.setItem('montell-language', explicit);
      preferred = explicit;
    } else if (location.pathname.endsWith('/en.html')) {
      preferred = 'en';
      localStorage.setItem('montell-language', 'en');
    } else preferred = localStorage.getItem('montell-language');
  } catch { preferred = explicit; }
  if ((preferred === 'uk' || preferred === 'en') && preferred !== current) {
    const target = new URL(location.href);
    target.pathname = preferred === 'en' ? '/en.html' : '/';
    target.searchParams.set('lang', preferred);
    location.replace(target.href);
    return;
  }
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.language-switch a').forEach(link => {
      const target = new URL(link.href);
      target.hash = location.hash;
      link.href = target.href;
      link.addEventListener('click', () => {
        try { localStorage.setItem('montell-language', link.hreflang); } catch {}
      });
    });
  });
})();
