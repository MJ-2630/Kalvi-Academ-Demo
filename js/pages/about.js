'use strict';
/* Instructor photos live in assets/instructors/<user id>.jpg  (u2.jpg, u3.jpg ...)
   Newly registered instructors with no photo file show their initials. */
function instructorCard(u) {
  var mine = db.courses.filter(function (c) {
    return c.by === u.id && c.status === 'published';
  });
  var cats = [];
  mine.forEach(function (c) {
    if (cats.indexOf(c.cat) < 0) cats.push(c.cat);
  });
  return (
    '<article class="icard"><div class="iphoto">' +
    avatarImg('assets/instructors/' + u.id + '.jpg', u.name, 'iph', 480) +
    '<span class="itag">' +
    mine.length +
    (mine.length === 1 ? ' course' : ' courses') +
    '</span></div><div class="ibody"><h3>' +
    esc(u.name) +
    '</h3><div class="ichips">' +
    cats
      .slice(0, 3)
      .map(function (k) {
        return '<span>' + esc(k) + '</span>';
      })
      .join('') +
    '</div><p class="muted sm">' +
    esc(u.bio || 'Instructor at Kalvi Academy.') +
    '</p></div></article>'
  );
}

function pageAbout() {
  var ins = db.users.filter(function (u) {
    return u.role === 'instructor';
  });
  var pubs = published();
  var values = [
    [
      '🎯',
      'Our mission',
      'Make job-ready skills and school subjects affordable and easy to finish, with a free course for every first step.',
    ],
    [
      '🔭',
      'Our vision',
      'A learner in any town can study with a great teacher, at any hour, on any device.',
    ],
    [
      '💡',
      'What we believe',
      'Short lessons, clear notes and visible progress help people keep going until they finish.',
    ],
  ];
  var how = [
    [
      I.video,
      'Short video lessons',
      'Each lesson focuses on one idea, so you can learn in a lunch break or after school.',
    ],
    [
      I.book,
      'Notes you can keep',
      'PDF notes and worksheets go with every topic for quick revision before exams.',
    ],
    [
      I.shield,
      'Progress that counts',
      'Finish a lesson and it is saved. Complete every lesson and the course is marked done.',
    ],
    [
      I.users,
      'Real teachers',
      'Every course is created by an instructor and reviewed by our team before it goes live.',
    ],
  ];
  var story = [
    ['2019', 'Kalvi Academy begins in Chennai with a handful of Class 10 maths revision videos.'],
    [
      '2021',
      'PDF notes and the first free courses are added so every student can start without paying.',
    ],
    ['2023', 'Instructors can now publish their own courses and follow student progress.'],
    [
      '2026',
      'Courses now cover coding, design, languages, school subjects and government exams like NEET, JEE and TNPSC.',
    ],
  ];
  var exams = ['NEET', 'JEE', 'TNPSC', 'TET', 'SET', 'SSC', 'Bank exams'];
  return (
    '<section class="hero"><span class="blob b1"></span><span class="blob b2"></span><span class="blob b3"></span><div class="wrap"><div><p class="eyebrow">About us</p><h1 style="margin-top:12px;font-size:clamp(2rem,4.4vw,3.1rem)">Learning that <span class="hl">fits around</span> your life</h1><p class="lead">Kalvi means education in Tamil. We started Kalvi Academy to give students and working professionals practical courses taught by people who do the work every day.</p><div class="ctas"><button class="btn hi pulse" data-act="nav" data-v="register">Join Free Today</button><button class="btn ghost" data-act="nav" data-v="courses">Explore courses</button></div></div><div class="heroimg"><img class="aboutimg" src="assets/about.svg" alt="A teacher explaining a graph to students in an online class" width="640" height="440"><div class="badge card"><b>4.8</b><span>★ average rating</span></div><div class="card chip2"><b>' +
    pubs.length +
    '+</b><span>live courses</span></div></div></div></section>' +
    '<section class="band" style="padding-bottom:20px"><div class="wrap">' +
    tiles([
      ['2019', 'Founded'],
      [12400, 'Learners'],
      [pubs.length, 'Courses live'],
      [ins.length, 'Instructors'],
    ]) +
    '</div></section>' +
    '<section class="band" style="padding-top:20px"><div class="wrap"><div class="grid">' +
    values
      .map(function (v) {
        return (
          '<div class="card feat vcard"><span class="vic">' +
          v[0] +
          '</span><h3>' +
          v[1] +
          '</h3><p class="muted">' +
          v[2] +
          '</p></div>'
        );
      })
      .join('') +
    '</div></div></section>' +
    '<section class="band" style="padding-top:0"><div class="wrap"><div class="head"><p class="eyebrow">How we teach</p><h2>Built so you actually finish</h2></div><div class="grid">' +
    how
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
    '<section class="band" style="padding-top:0"><div class="wrap"><div class="examband"><div><p class="eyebrow">New: government exam prep</p><h2>Preparing for NEET, JEE, TNPSC, TET or SET?</h2><p>Structured video lessons, PDF notes and model papers from experienced exam trainers.</p><div class="chips">' +
    exams
      .map(function (e) {
        return '<button class="chip" data-act="gocat" data-v="Govt Exams">' + e + '</button>';
      })
      .join('') +
    '</div></div><button class="btn hi" data-act="gocat" data-v="Govt Exams">See exam courses →</button></div></div></section>' +
    '<section class="band" style="padding-top:0"><div class="wrap"><div class="head"><p class="eyebrow">Our story</p><h2>Seven years of simple, steady growth</h2></div><ol class="timeline">' +
    story
      .map(function (s) {
        return '<li><b>' + s[0] + '</b><p>' + s[1] + '</p></li>';
      })
      .join('') +
    '</ol></div></section>' +
    '<section class="band" style="padding-top:0"><div class="wrap"><div class="head"><p class="eyebrow">Our instructors</p><h2>Meet the people who teach</h2><p class="muted">Real teachers and working professionals, each reviewed by our team.</p></div>' +
    carousel(ins.map(instructorCard), '4,3,2', 3800) +
    '</div></section>' +
    '<section class="band" style="padding-top:0"><div class="wrap">' +
    ctaBand(
      'Join thousands of learners',
      'Create a free account and start with any free course today. Love teaching? Become an instructor.',
      '<button class="btn light pulse" data-act="nav" data-v="register">Register Now</button><button class="btn ghost light" data-act="nav" data-v="register">Become an instructor</button>',
    ) +
    '</div></section>'
  );
}

function pageInit() {
  photoFallback();
  initCarousels();
}
