'use strict';
function pageHome() {
  var pubs = published(),
    pop = pubs.slice(0, 6);
  var c0 = db.courses[0] || { title: 'Python for Beginners' };
  var nIns = db.users.filter(function (u) {
    return u.role === 'instructor';
  }).length;
  var feats = [
    [
      I.video,
      'Video and PDF lessons',
      'Watch lessons at your own pace and keep the PDF notes beside you for revision.',
    ],
    [
      I.book,
      'Free and paid courses',
      'Begin with a free course today. Unlock paid courses with a single payment.',
    ],
    [
      I.shield,
      'Progress you can see',
      'Every finished lesson is saved, so you always know where to continue.',
    ],
    [
      I.users,
      'Teachers who know the subject',
      'Courses come from working professionals and experienced school teachers.',
    ],
  ];
  var subj = CATS.map(function (k) {
    var n = pubs.filter(function (c) {
      return c.cat === k;
    }).length;
    return (
      '<button class="subj" data-act="gocat" data-v="' +
      k +
      '">' +
      (k === 'Govt Exams' ? '<span class="newtag">NEW</span>' : '') +
      '<span class="glyph">' +
      esc(GLYPH[k]) +
      '</span><b>' +
      (k === 'Language' ? 'Languages' : k) +
      '</b><span class="muted sm">' +
      BLURB[k] +
      '</span><span class="n">' +
      n +
      ' ' +
      (n === 1 ? 'course' : 'courses') +
      '</span></button>'
    );
  });
  var steps = [
    ['Register', 'Create a free student account in under a minute.'],
    ['Choose a course', 'Pick a free course to start now, or buy a paid one.'],
    ['Learn and track', 'Watch videos, read PDF notes and watch your progress grow.'],
  ];
  var faq = [
    [
      'What is the difference between free and paid courses?',
      'Free courses open to every registered student straight away. Paid courses unlock after a one-time payment and stay in your dashboard.',
    ],
    [
      'How do I pay for a course?',
      'Open the course, click Buy now and pay with UPI or card. The lessons unlock as soon as the payment succeeds.',
    ],
    [
      'Can I study on my phone?',
      'Yes. Kalvi Academy works on phones, tablets and computers, and your progress is saved to your account.',
    ],
    [
      'How is my progress saved?',
      'Every lesson you finish is saved to your dashboard, so you can continue from exactly where you left.',
    ],
    [
      'Can I teach on Kalvi Academy?',
      'Yes. Register as an instructor, create your course and add video and PDF lessons. Our team reviews each course before it goes live.',
    ],
  ];
  var ts = db.testimonials.filter(function (t) {
    return t.show;
  });
  var top = pubs.slice().sort(function (a, b) {
    return b.rating - a.rating;
  });
  function secHead(eye, title, sub) {
    return (
      '<div class="head"><p class="eyebrow">' +
      eye +
      '</p><h2>' +
      title +
      '</h2>' +
      (sub ? '<p class="muted">' + sub + '</p>' : '') +
      '</div>'
    );
  }
  return (
    '<section class="hero"><span class="blob b1"></span><span class="blob b2"></span><span class="blob b3"></span><div class="wrap"><div><p class="eyebrow">🚀 Join 12,400+ learners</p><h1 style="margin-top:12px">Learn a skill. Finish the course. <span class="hl">Move ahead.</span></h1><p class="lead">From coding and design to school subjects and NEET, JEE, TNPSC exam preparation, Kalvi Academy brings video lessons, PDF notes and progress tracking together in one place. Start free today!</p><div class="ctas"><button class="btn hi pulse" data-act="scrollreg">Register Now · Free</button><button class="btn ghost" data-act="nav" data-v="courses">Explore Courses</button></div><div class="statrow"><div><b data-count="12400" data-suffix="+">12,400+</b><span class="muted sm">Learners</span></div><div><b data-count="' +
    pubs.length +
    '">' +
    pubs.length +
    '</b><span class="muted sm">Courses</span></div><div><b data-count="' +
    nIns +
    '">' +
    nIns +
    '</b><span class="muted sm">Instructors</span></div></div></div>' +
    '<div class="heroimg">' +
    heroSlider() +
    '<div class="badge card"><b>4.8</b><span>★ average rating</span></div><div class="card live"><div class="row between"><span class="pill free">FREE</span><span class="muted sm mono">3 of 6 lessons</span></div><h3 style="margin-top:8px;font-size:1rem">' +
    esc(c0.title) +
    '</h3><div class="bar" style="margin:10px 0 4px"><span style="width:50%"></span></div><p class="muted sm">50% complete</p></div></div></div></section>' +
    regSection(ts) +
    '<section class="band"><div class="wrap">' +
    secHead('Explore and discover', 'Pick your path: skills, school subjects and exam prep', 'Choose a subject to see every course in it.') +
    carousel(subj, '4,3,2', 3200) +
    '</div></section>' +
    '<section class="band" style="padding-top:0"><div class="wrap">' +
    secHead('Why learners love Kalvi Academy', 'Everything you need to learn and finish') +
    '<div class="grid">' +
    feats
      .map(function (f) {
        return (
          '<div class="card feat"><div class="ic">' +
          f[0] +
          '</div><h3>' +
          f[1] +
          '</h3><p class="muted">' +
          f[2] +
          '</p></div>'
        );
      })
      .join('') +
    '</div></div></section>' +
    '<section class="band" style="padding-top:0"><div class="wrap"><div class="row between" style="margin-bottom:6px"><div class="head" style="margin:0"><p class="eyebrow">🔥 Popular right now</p><h2>Start with our top-rated courses</h2></div><button class="btn ghost" data-act="gocat" data-v="all">See all courses</button></div>' +
    carousel(top.map(card), '3,2,1', 4200) +
    '</div></section>' +
    '<section class="band" style="padding-top:0"><div class="wrap">' +
    secHead('How it works', 'Start learning in three easy steps') +
    '<div class="steps">' +
    steps
      .map(function (s, i) {
        return (
          '<div class="card step"><span class="no">' +
          (i + 1) +
          '</span><h3>' +
          s[0] +
          '</h3><p class="muted">' +
          s[1] +
          '</p></div>'
        );
      })
      .join('') +
    '</div></div></section>' +
    '<section class="band" style="padding-top:0"><div class="wrap">' +
    secHead('⭐ Success stories', 'Loved by learners like you', 'Real students, real progress. You could be next!') +
    carousel(ts.map(testiCard), '3,2,1', 3500) +
    '</div></section>' +
    '<section class="band" style="padding-top:0"><div class="wrap">' +
    ctaBand(
      'Teach on Kalvi Academy',
      "Share what you know. Create a course, add video and PDF lessons, and follow every student's progress from your own dashboard.",
      '<button class="btn light" data-act="nav" data-v="register">Register as instructor</button>',
    ) +
    '</div></section>' +
    '<section class="band" style="padding-top:0"><div class="wrap">' +
    secHead('Questions', 'Frequently asked') +
    faqHTML(faq) +
    '</div></section>' +
    '<section class="band" style="padding-top:0"><div class="wrap">' +
    ctaBand(
      'Your future starts today. Register Now!',
      'Create your free account and open your first lesson in minutes.',
      '<button class="btn light pulse" data-act="scrollreg">Register Now</button><button class="btn ghost light" data-act="nav" data-v="courses">Explore Courses</button>',
    ) +
    '</div></section>'
  );
}

/* =====================================================================
   HOME PAGE SETTINGS: edit these to change slider images and captions.
   Put your own pictures in assets/hero/ (same file names, or change src).
   Student photos for testimonials: assets/students/t1.jpg ... t6.jpg
   ===================================================================== */
var HERO_SLIDES = [
  { src: 'assets/hero/slide1.jpg', title: 'Learn from experts', sub: 'Video lessons + PDF notes' },
  { src: 'assets/hero/slide2.jpg', title: 'Track every lesson', sub: 'See your progress grow' },
  { src: 'assets/hero/slide3.jpg', title: 'Study anywhere', sub: 'Phone, tablet or laptop' },
];
var HERO_DELAY = 4000;
var heroTimer = null;

function heroSlider() {
  return (
    '<div class="hslider" id="hslider" aria-roledescription="carousel" aria-label="Kalvi Academy highlights">' +
    '<div class="hs-stage">' +
    HERO_SLIDES.map(function (s, i) {
      return (
        '<figure class="hs' +
        (i === 0 ? ' on' : '') +
        '"><img src="' +
        esc(s.src) +
        '" alt="' +
        esc(s.title) +
        '"' +
        (i === 0 ? '' : ' loading="lazy"') +
        ' width="640" height="480"><figcaption><b>' +
        esc(s.title) +
        '</b><span>' +
        esc(s.sub) +
        '</span></figcaption></figure>'
      );
    }).join('') +
    '</div><button class="hs-nav prev" data-hs="prev" aria-label="Previous slide">‹</button><button class="hs-nav next" data-hs="next" aria-label="Next slide">›</button><div class="hs-dots">' +
    HERO_SLIDES.map(function (s, i) {
      return '<button class="hdot' + (i === 0 ? ' on' : '') + '" data-hs="' + i + '" aria-label="Go to slide ' + (i + 1) + '"></button>';
    }).join('') +
    '</div></div>'
  );
}

function studentPhoto(t, cls) {
  return avatarImg('assets/students/' + t.id + '.jpg', t.name, cls);
}

function testiCard(t) {
  return (
    '<div class="card quote"><span class="qmark" aria-hidden="true">“</span><div class="stars" aria-label="5 out of 5 stars">★★★★★</div><p>' +
    esc(t.text) +
    '</p><div class="row who">' +
    studentPhoto(t) +
    '<div><b>' +
    esc(t.name) +
    '</b><div class="muted sm">' +
    esc(t.role) +
    '</div></div></div></div>'
  );
}

/* Register form + short "about us" text, shown right under the hero */
function regSection(ts) {
  var faces = ts
    .slice(0, 4)
    .map(function (t) {
      return studentPhoto(t, 'face');
    })
    .join('');
  return (
    '<section class="band regband" id="reg"><div class="wrap regwrap"><div class="regtxt"><p class="eyebrow">🎓 About Kalvi Academy</p><h2>Learn at your own pace. Register Now and <span class="hl">move ahead!</span></h2><p class="lead">Kalvi means education in Tamil. We bring job-ready skills, school subjects and government exam preparation together, taught by real teachers and available on any device.</p><ul class="perks"><li>Free courses from day one</li><li>Video lessons with PDF notes</li><li>Track every lesson you finish</li><li>Exam prep for NEET, JEE, TNPSC, TET and SET</li></ul><div class="proof"><span class="faces">' +
    faces +
    '</span><span><b>12,400+ learners</b> are already learning with us</span></div><button class="btn ghost light sm" data-act="nav" data-v="about" style="margin-top:18px">Know more about us →</button></div>' +
    '<div class="card regform"><h3>Create your free account</h3><p class="muted sm">Takes less than a minute. No credit card needed.</p><form data-form="homereg" class="stack"><label>Full name<input id="hrn" required autocomplete="name" placeholder="Your name"></label><label>Email<input id="hre" type="email" required autocomplete="email" placeholder="you@example.com"></label><label>Phone number<input id="hrp" type="tel" autocomplete="tel" placeholder="Optional"></label><label>Password<input id="hrw" type="password" minlength="6" required autocomplete="new-password" placeholder="At least 6 characters"></label><label>I want to join as<select id="hrr"><option value="student">Student</option><option value="instructor">Instructor</option></select></label><div class="err" id="err"></div><button class="btn hi pulse" type="submit">Register Now →</button><p class="sm muted">Already have an account? <a href="login.html">Log in</a></p></form></div></div></section>'
  );
}

act.scrollreg = function () {
  var r = document.getElementById('reg');
  if (r) {
    r.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(function () {
      var f = document.getElementById('hrn');
      if (f) f.focus({ preventScroll: true });
    }, 700);
  }
};

/* ---- runs after the home page is drawn: hero slider + carousels ---- */
function pageInit() {
  clearInterval(heroTimer);
  photoFallback();
  initCarousels();
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var box = document.getElementById('hslider');
  if (!box) return;
  var slides = box.querySelectorAll('.hs'),
    dots = box.querySelectorAll('.hdot'),
    cur = 0;
  function show(n) {
    cur = (n + slides.length) % slides.length;
    slides.forEach(function (s, k) {
      s.classList.toggle('on', k === cur);
    });
    dots.forEach(function (d, k) {
      d.classList.toggle('on', k === cur);
    });
  }
  function play() {
    clearInterval(heroTimer);
    if (!reduce)
      heroTimer = setInterval(function () {
        show(cur + 1);
      }, HERO_DELAY);
  }
  box.addEventListener('click', function (e) {
    var b = e.target.closest('[data-hs]');
    if (!b) return;
    var v = b.dataset.hs;
    show(v === 'next' ? cur + 1 : v === 'prev' ? cur - 1 : Number(v));
    play();
  });
  box.addEventListener('mouseenter', function () {
    clearInterval(heroTimer);
  });
  box.addEventListener('mouseleave', play);
  var x0 = null;
  box.addEventListener(
    'touchstart',
    function (e) {
      x0 = e.touches[0].clientX;
    },
    { passive: true }
  );
  box.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) {
      show(cur + (dx < 0 ? 1 : -1));
      play();
    }
    x0 = null;
  });
  play();
}
