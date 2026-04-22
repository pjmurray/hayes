/* HAYES — bilingual page toggle.
   data-en / data-ja on text nodes; data-en-src / data-ja-src on images;
   data-en-alt / data-ja-alt on alt text; data-en-title / data-ja-title swap document title.
   Toggle anchors carry data-lang-link="en" or "ja". */
(function () {
  var DEFAULT = (document.documentElement.getAttribute('data-default-lang') || 'en').toLowerCase();
  var VALID = { en: 1, ja: 1 };

  function readUrlLang() {
    try {
      var p = new URLSearchParams(location.search);
      var l = (p.get('lang') || '').toLowerCase();
      return VALID[l] ? l : DEFAULT;
    } catch (e) { return DEFAULT; }
  }

  function setUrlLang(lang) {
    try {
      var url = new URL(location.href);
      if (lang === DEFAULT) url.searchParams.delete('lang');
      else url.searchParams.set('lang', lang);
      history.replaceState(null, '', url);
    } catch (e) {}
  }

  function each(sel, fn) {
    var nodes = document.querySelectorAll(sel);
    for (var i = 0; i < nodes.length; i++) fn(nodes[i]);
  }

  function apply(lang) {
    document.documentElement.lang = lang;
    document.documentElement.setAttribute('data-lang', lang);

    each('[data-en],[data-ja]', function (el) {
      var v = el.getAttribute('data-' + lang);
      if (v != null) el.innerHTML = v;
    });
    each('[data-en-src],[data-ja-src]', function (el) {
      var v = el.getAttribute('data-' + lang + '-src');
      if (v) el.setAttribute('src', v);
    });
    each('[data-en-alt],[data-ja-alt]', function (el) {
      var v = el.getAttribute('data-' + lang + '-alt');
      if (v != null) el.setAttribute('alt', v);
    });
    each('[data-en-href],[data-ja-href]', function (el) {
      var v = el.getAttribute('data-' + lang + '-href');
      if (v) el.setAttribute('href', v);
    });
    each('[data-en-aria-label],[data-ja-aria-label]', function (el) {
      var v = el.getAttribute('data-' + lang + '-aria-label');
      if (v != null) el.setAttribute('aria-label', v);
    });

    var titleEl = document.querySelector('title[data-en-title],title[data-ja-title]');
    if (titleEl) {
      var t = titleEl.getAttribute('data-' + lang + '-title');
      if (t) document.title = t;
    }

    each('[data-lang-link]', function (a) {
      if (a.getAttribute('data-lang-link') === lang) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
  }

  function wire() {
    each('[data-lang-link]', function (a) {
      a.addEventListener('click', function (e) {
        // honor modifier keys / middle-click — let those navigate normally
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button === 1) return;
        e.preventDefault();
        var lang = a.getAttribute('data-lang-link');
        if (!VALID[lang]) return;
        apply(lang);
        setUrlLang(lang);
      });
    });
  }

  apply(readUrlLang());
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', wire);
  else wire();
})();
