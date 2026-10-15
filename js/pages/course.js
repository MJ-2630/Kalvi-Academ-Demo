'use strict';
function pageCourse(id) {
  var c = course(id);
  if (!c) return '<div class="wrap" style="padding-block:60px"><h2>Course not found</h2></div>';
  var u = me(),
    en = u && enr(u.id, c.id),
    ins = user(c.by);
  var access = en || (u && u.role !== 'student');
  var vids = c.lessons.filter(function (l) {
    return l.type === 'video';
  }).length;
  var pdfs = c.lessons.length - vids;
  var mins = c.lessons.reduce(function (s, l) {
    return s + l.mins;
  }, 0);
  var buy;
  if (en) {
    buy =
      '<div class="bar"><span style="width:' +
      pct(en, c) +
      '%"></span></div><p class="sm muted">' +
      pct(en, c) +
      '% complete</p><button class="btn" data-act="start" data-v="' +
      c.id +
      '">' +
      (en.done.length ? 'Continue learning' : 'Start learning') +
      '</button>';
  } else if (u && u.role !== 'student') {
    buy =
      '<p class="sm muted">You are logged in as ' +
      u.role +
      '. Open the preview to see what students see.</p><button class="btn" data-act="start" data-v="' +
      c.id +
      '">Preview course</button>';
  } else {
    buy = c.free
      ? '<button class="btn" data-act="enroll" data-v="' + c.id + '">Enroll for free</button>'
      : '<button class="btn hi" data-act="enroll" data-v="' +
        c.id +
        '">Buy now for ' +
        inr(c.price) +
        '</button>';
    if (!u) buy += '<p class="sm muted">You need to log in first.</p>';
  }
  var facts = [
    [c.lessons.length, 'Lessons'],
    [vids, 'Videos'],
    [pdfs, 'PDF notes'],
    [mins + ' min', 'Total time'],
  ];
  var learn = c.lessons.slice(0, 4);
  var rows = c.lessons
    .map(function (l, i) {
      var open = access || (c.free && u);
      var done = en && en.done.indexOf(l.id) > -1;
      return (
        '<div class="lli"><span class="tick ' +
        (done ? 'done' : '') +
        '">' +
        (done ? I.check : '') +
        '</span><div style="flex:1"><div>' +
        (i + 1) +
        '. ' +
        esc(l.title) +
        '</div><div class="sm muted">' +
        l.mins +
        ' min</div></div><span class="type">' +
        l.type.toUpperCase() +
        '</span>' +
        (open ? '' : '<span class="muted">' + I.lock + '</span>') +
        '</div>'
      );
    })
    .join('');
  return (
    '<div class="wrap"><div class="detail"><div class="stack" style="gap:20px"><div><div class="row"><span class="pill ' +
    (c.free ? 'free' : 'paid') +
    '">' +
    (c.free ? 'FREE' : 'PAID') +
    '</span><span class="pill">' +
    esc(c.cat.toUpperCase()) +
    '</span></div><h1 style="margin-top:12px;font-size:clamp(1.8rem,4vw,2.6rem)">' +
    esc(c.title) +
    '</h1><p class="muted" style="margin-top:12px;max-width:62ch">' +
    esc(c.desc) +
    '</p><p class="sm muted" style="margin-top:12px">By ' +
    esc(ins ? ins.name : '') +
    ' · ' +
    esc(c.level) +
    ' · ★ ' +
    c.rating +
    '</p></div>' +
    '<div class="facts">' +
    facts
      .map(function (f) {
        return (
          '<div class="fact"><b>' + f[0] + '</b><span class="muted sm">' + f[1] + '</span></div>'
        );
      })
      .join('') +
    '</div>' +
    (learn.length
      ? '<div class="card pad"><h3>What you will learn</h3><ul class="checks">' +
        learn
          .map(function (l) {
            return '<li>' + esc(l.title) + '</li>';
          })
          .join('') +
        '</ul></div>'
      : '') +
    '<div class="card"><div class="pad" style="padding-bottom:8px"><h3>Course content</h3><p class="sm muted">' +
    c.lessons.length +
    ' lessons</p></div>' +
    (rows || '<div class="pad"><p class="muted">Lessons are being added.</p></div>') +
    '</div>' +
    (ins
      ? '<div class="card pad"><h3 style="margin-bottom:12px">Your instructor</h3><div class="row"><span class="avatar">' +
        esc(initials(ins.name)) +
        '</span><div><b>' +
        esc(ins.name) +
        '</b><div class="muted sm">' +
        esc(ins.bio || 'Instructor at Kalvi Academy.') +
        '</div></div></div></div>'
      : '') +
    '</div><aside class="card buybox">' +
    thumb(c) +
    '<div class="price">' +
    (c.free ? 'Free' : inr(c.price)) +
    '</div>' +
    buy +
    '<p class="sm muted">Lifetime access · Learn on any device</p></aside></div></div>'
  );
}

/* learn page */
