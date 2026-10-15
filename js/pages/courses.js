'use strict';
function pageCourses() {
  var pubs = published();
  var chips = ['all']
    .concat(CATS)
    .map(function (k) {
      return (
        '<button class="' +
        (ui.cat === k ? 'on' : '') +
        '" data-act="cat" data-v="' +
        k +
        '">' +
        (k === 'all' ? 'All subjects' : k === 'Language' ? 'Languages' : k) +
        '</button>'
      );
    })
    .join('');
  return (
    '<section class="band"><div class="wrap"><div class="head"><p class="eyebrow">Course catalog</p><h1>Find your next course</h1><p class="muted">' +
    pubs.length +
    ' courses across coding, design, languages and school subjects. Start free or pick a paid course.</p></div><div class="chips">' +
    chips +
    '</div><div class="toolbar"><input id="q" placeholder="Search courses" value="' +
    esc(ui.q) +
    '" aria-label="Search courses"><div class="seg">' +
    [
      ['all', 'All'],
      ['free', 'Free'],
      ['paid', 'Paid'],
    ]
      .map(function (f) {
        return (
          '<button class="' +
          (ui.filter === f[0] ? 'on' : '') +
          '" data-act="filter" data-v="' +
          f[0] +
          '">' +
          f[1] +
          '</button>'
        );
      })
      .join('') +
    '</div></div><div class="grid" id="grid">' +
    gridHTML() +
    '</div></div></section>' +
    '<section class="band" style="padding-top:0"><div class="wrap">' +
    ctaBand(
      'Cannot find your subject?',
      'Tell us what you want to learn and we will try to add it. School batches and group enrolments are welcome.',
      '<button class="btn light" data-act="nav" data-v="contact">Contact us</button>',
    ) +
    '</div></section>'
  );
}
function gridHTML() {
  var q = ui.q.toLowerCase();
  var list = published().filter(function (c) {
    return (
      (ui.filter === 'all' || (ui.filter === 'free') === c.free) &&
      (ui.cat === 'all' || c.cat === ui.cat) &&
      (!q || (c.title + ' ' + c.cat + ' ' + c.level).toLowerCase().indexOf(q) > -1)
    );
  });
  return list.length
    ? list.map(card).join('')
    : '<p class="muted">No courses match your search.</p>';
}

act.filter = function (v) {
    ui.filter = v;
    render(true);
};
act.cat = function (v) {
    ui.cat = v;
    render(true);
};
