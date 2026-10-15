'use strict';
/* =====================================================================
   Reusable auto-sliding carousel (used on Home and About pages)

   HTML:   carousel(arrayOfHtmlStrings, 'big,mid,small', delayMs)
           big = cards per view on desktop (>=980px), mid = tablet (>=640px),
           small = phone. Example: carousel(cards, '3,2,1', 4000)
   JS:     initCarousels() is called from each page's pageInit()
   ===================================================================== */
var CARS = [],
  carResizeBound = false;

function carousel(items, pv, delay) {
  if (!items.length) return '';
  return (
    '<div class="car" data-pv="' +
    pv +
    '" data-delay="' +
    (delay || 4000) +
    '"><div class="cartrack">' +
    items
      .map(function (h) {
        return '<div class="carslide">' + h + '</div>';
      })
      .join('') +
    '</div></div><div class="carctl"><button class="carbtn" data-car="prev" aria-label="Previous">‹</button><div class="cardots"></div><button class="carbtn" data-car="next" aria-label="Next">›</button></div>'
  );
}

/* round photo (students / instructors). Shows initials if the file is missing. */
function avatarImg(src, name, cls, size) {
  size = size || 56;
  return (
    '<img class="sphoto ' +
    (cls || '') +
    '" src="' +
    esc(src) +
    '" alt="' +
    esc(name) +
    '" data-ini="' +
    esc(initials(name)) +
    '" width="' +
    size +
    '" height="' +
    size +
    '" loading="lazy">'
  );
}

function photoFallback() {
  document.querySelectorAll('img.sphoto').forEach(function (img) {
    function fallback() {
      if (!img.parentNode) return;
      var s = document.createElement('span');
      s.className = ('avatar ' + img.className.replace('sphoto', '')).trim();
      s.textContent = img.dataset.ini || '';
      img.replaceWith(s);
    }
    if (img.complete && img.naturalWidth === 0) fallback();
    else img.addEventListener('error', fallback);
  });
}

function setupCarousel(root) {
  var track = root.querySelector('.cartrack'),
    n = track.children.length,
    ctl = root.nextElementSibling,
    dwrap = ctl.querySelector('.cardots'),
    P = root.dataset.pv.split(',').map(Number),
    delay = Number(root.dataset.delay) || 4000,
    reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    page = 0,
    per = 1,
    pages = 1,
    c = { root: root, timer: null };

  function perView() {
    var w = window.innerWidth;
    return Math.min(n, w >= 980 ? P[0] : w >= 640 ? P[1] : P[2]);
  }
  c.draw = function () {
    per = perView();
    pages = Math.max(1, Math.ceil(n / per));
    if (page >= pages) page = 0;
    root.style.setProperty('--pv', per);
    var offset = Math.min(page * per, n - per);
    track.style.transform = 'translateX(' + -offset * (100 / per) + '%)';
    dwrap.innerHTML = '';
    if (pages > 8) {
      var cnt = document.createElement('span');
      cnt.className = 'carcount';
      cnt.textContent = page + 1 + ' / ' + pages;
      dwrap.appendChild(cnt);
    }
    for (var k = 0; pages <= 8 && k < pages; k++) {
      var d = document.createElement('button');
      d.className = 'cardot' + (k === page ? ' on' : '');
      d.dataset.i = k;
      d.setAttribute('aria-label', 'Go to page ' + (k + 1));
      dwrap.appendChild(d);
    }
    ctl.style.visibility = pages <= 1 ? 'hidden' : 'visible';
  };
  function goTo(i) {
    page = i >= pages ? 0 : i < 0 ? pages - 1 : i;
    c.draw();
  }
  function run() {
    clearInterval(c.timer);
    if (!reduce && n > 1)
      c.timer = setInterval(function () {
        if (pages > 1) goTo(page + 1);
      }, delay);
  }
  ctl.addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (!b) return;
    if (b.dataset.car) goTo(page + (b.dataset.car === 'next' ? 1 : -1));
    else if (b.dataset.i) goTo(Number(b.dataset.i));
    run();
  });
  root.addEventListener('mouseenter', function () {
    clearInterval(c.timer);
  });
  root.addEventListener('mouseleave', run);
  var x0 = null;
  root.addEventListener(
    'touchstart',
    function (e) {
      x0 = e.touches[0].clientX;
      clearInterval(c.timer);
    },
    { passive: true }
  );
  root.addEventListener('touchend', function (e) {
    if (x0 !== null) {
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) goTo(page + (dx < 0 ? 1 : -1));
    }
    x0 = null;
    run();
  });
  c.draw();
  run();
  CARS.push(c);
}

function initCarousels() {
  CARS.forEach(function (c) {
    clearInterval(c.timer);
  });
  CARS = [];
  document.querySelectorAll('.car').forEach(setupCarousel);
  if (!carResizeBound) {
    carResizeBound = true;
    window.addEventListener('resize', function () {
      CARS.forEach(function (c) {
        if (document.body.contains(c.root)) c.draw();
      });
    });
  }
}
