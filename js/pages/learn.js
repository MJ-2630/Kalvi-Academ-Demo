'use strict';
function curLesson(c) {
  return (
    c.lessons.find(function (l) {
      return l.id === ui.lid;
    }) || c.lessons[0]
  );
}
function pageLearn(id) {
  var c = course(id),
    u = me();
  if (!c || !u) return '';
  var en = enr(u.id, c.id);
  var l = curLesson(c),
    idx = c.lessons.indexOf(l);
  var done = en && en.done.indexOf(l.id) > -1;
  var total = l.mins * 60;
  var body;
  if (l.type === 'video') {
    body =
      '<div class="player" style="--h:' +
      hue(c) +
      '"><span class="tag">' +
      esc(c.cat.toUpperCase()) +
      '</span><div><button class="bigplay" id="pl-btn" data-act="play" aria-label="Play or pause">' +
      (ui.playing ? I.pause : I.play) +
      '</button><h3>' +
      esc(l.title) +
      '</h3></div></div><div class="ctrl"><div class="seek" id="pl-seek" data-act="seek"><span id="pl-bar" style="width:' +
      Math.min(100, (ui.t / total) * 100) +
      '%"></span></div><span class="mono sm" id="pl-time">' +
      fmt(ui.t) +
      ' / ' +
      fmt(total) +
      '</span></div>';
  } else {
    var pages = [
      [
        'Overview',
        ['What this lesson covers', 'Why it matters in real work', 'How to use these notes'],
      ],
      [
        'Key points',
        [
          'Read each section once, then try the example',
          'Write your own version without looking',
          'Note any step that feels unclear',
        ],
      ],
      [
        'Practice',
        [
          'Complete the exercise at the end of the notes',
          'Compare your result with the sample answer',
          'Mark the lesson complete when you are done',
        ],
      ],
    ];
    var pg = pages[ui.page] || pages[0];
    body =
      '<div class="pdfbg"><div class="paper"><p class="mono sm" style="color:#5a6b66">' +
      esc(c.title) +
      ' · page ' +
      (ui.page + 1) +
      ' of 3</p><h4 style="margin-top:8px">' +
      esc(l.title) +
      ': ' +
      pg[0] +
      '</h4><ul>' +
      pg[1]
        .map(function (x) {
          return '<li>' + x + '</li>';
        })
        .join('') +
      '</ul><p style="color:#5a6b66;font-size:.9rem">Read through the notes, then mark the lesson complete.</p></div></div><div class="row between" style="margin-top:10px"><button class="btn ghost sm" data-act="pdfpage" data-v="-1" ' +
      (ui.page === 0 ? 'disabled' : '') +
      '>Previous page</button><span class="sm muted">Page ' +
      (ui.page + 1) +
      ' / 3</span><button class="btn ghost sm" data-act="pdfpage" data-v="1" ' +
      (ui.page === 2 ? 'disabled' : '') +
      '>Next page</button></div>';
  }
  var rail = c.lessons
    .map(function (x, i) {
      var d = en && en.done.indexOf(x.id) > -1;
      return (
        '<div class="lli ' +
        (x.id === l.id ? 'cur' : '') +
        '" data-act="pick" data-v="' +
        x.id +
        '"><span class="tick ' +
        (d ? 'done' : '') +
        '">' +
        (d ? I.check : '') +
        '</span><div style="flex:1"><div>' +
        (i + 1) +
        '. ' +
        esc(x.title) +
        '</div><div class="sm muted">' +
        x.mins +
        ' min</div></div><span class="type">' +
        x.type.toUpperCase() +
        '</span></div>'
      );
    })
    .join('');
  var p = en ? pct(en, c) : 0;
  return (
    '<div class="wrap"><div class="learn"><div><div class="row between" style="margin-bottom:12px"><button class="btn ghost sm" data-act="nav" data-v="course-' +
    c.id +
    '">Back to course</button><span class="pill ' +
    (l.type === 'video' ? 'free' : 'paid') +
    '">' +
    l.type.toUpperCase() +
    ' LESSON</span></div><h2 style="margin-bottom:14px;font-size:1.5rem">' +
    esc(l.title) +
    '</h2>' +
    body +
    '<div class="row between lnav" style="margin-top:18px"><button class="btn ghost" data-act="prev" ' +
    (idx === 0 ? 'disabled' : '') +
    '>Previous</button>' +
    (done
      ? '<span class="pill ok">Completed</span>'
      : en
        ? '<button class="btn" data-act="complete">Mark as complete</button>'
        : '<span class="sm muted">Preview</span>') +
    '<button class="btn ghost" data-act="nextl" ' +
    (idx === c.lessons.length - 1 ? 'disabled' : '') +
    '>Next</button></div></div><aside class="card rail"><div class="pad" style="border-bottom:1px solid var(--line)"><h3>' +
    esc(c.title) +
    '</h3><div class="bar" style="margin:10px 0 4px"><span style="width:' +
    p +
    '%"></span></div><p class="sm muted">' +
    p +
    '% complete' +
    (p === 100 ? ' · Course finished' : '') +
    '</p></div>' +
    rail +
    '</aside></div></div>'
  );
}

/* dashboards */
function paintPlayer() {
  var b = document.getElementById('pl-btn');
  if (b) b.innerHTML = ui.playing ? I.pause : I.play;
  var c = course(ARG);
  if (!c) return;
  var l = curLesson(c),
    total = l.mins * 60;
  var bar = document.getElementById('pl-bar'),
    tm = document.getElementById('pl-time');
  if (bar) bar.style.width = Math.min(100, (ui.t / total) * 100) + '%';
  if (tm) tm.textContent = fmt(ui.t) + ' / ' + fmt(total);
}
function tick() {
  var c = course(ARG);
  if (!c) {
    stopPlayer();
    return;
  }
  var l = curLesson(c),
    total = l.mins * 60;
  ui.t += total / 40;
  if (ui.t >= total) {
    ui.t = total;
    stopPlayer();
    paintPlayer();
    finish(c, l, true);
    return;
  }
  paintPlayer();
}
function finish(c, l, auto) {
  var u = me(),
    en = enr(u.id, c.id);
  if (en && en.done.indexOf(l.id) < 0) {
    en.done.push(l.id);
    en.last = l.id;
    save();
    toast(auto ? 'Lesson finished and saved to your progress' : 'Lesson marked as complete');
  }
  render(true);
}

/* ---------- actions ---------- */
act.pick = function (v) {
    ui.lid = v;
    ui.t = 0;
    ui.page = 0;
    render(true);
};
act.play = function () {
    if (ui.playing) {
      stopPlayer();
      paintPlayer();
      return;
    }
    var c = course(ARG),
      l = curLesson(c);
    if (ui.t >= l.mins * 60) ui.t = 0;
    ui.playing = true;
    timer = setInterval(tick, 500);
    paintPlayer();
};
act.seek = function (v, v2, t, e) {
    var c = course(ARG),
      l = curLesson(c),
      r = t.getBoundingClientRect();
    ui.t = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)) * l.mins * 60;
    paintPlayer();
};
act.pdfpage = function (v) {
    ui.page = Math.max(0, Math.min(2, ui.page + Number(v)));
    render(true);
};
act.complete = function () {
    var c = course(ARG);
    finish(c, curLesson(c), false);
};
act.prev = function () {
    var c = course(ARG),
      i = c.lessons.indexOf(curLesson(c));
    if (i > 0) {
      ui.lid = c.lessons[i - 1].id;
      ui.t = 0;
      ui.page = 0;
      render(true);
    }
};
act.nextl = function () {
    var c = course(ARG),
      i = c.lessons.indexOf(curLesson(c));
    if (i < c.lessons.length - 1) {
      ui.lid = c.lessons[i + 1].id;
      ui.t = 0;
      ui.page = 0;
      render(true);
    }
};
