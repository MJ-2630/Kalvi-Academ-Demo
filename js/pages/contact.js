'use strict';
var MAP_EMBED =
  'https://www.openstreetmap.org/export/embed.html?bbox=80.2396%2C13.0554%2C80.2596%2C13.0654&layer=mapnik&marker=13.0604%2C80.2496';
function pageContact() {
  var infos = [
    [I.mail, 'Email us', 'hello@kalviacademy.in', 'We reply within one working day.'],
    [I.phone, 'Call us', '+91 98765 43210', 'Monday to Saturday, 9 AM to 6 PM IST.'],
    [I.pin, 'Visit us', '12, Anna Salai, Chennai 600002', 'Please call before you visit.'],
  ];
  var faq = [
    [
      'How soon will you reply?',
      'We answer every message within one working day, usually much sooner.',
    ],
    [
      'I paid but the course is locked. What now?',
      'Log out and log in again. If it is still locked, write to us with your payment details and we will fix it quickly.',
    ],
    [
      'Do you run batches for schools or companies?',
      'Yes. Tell us the number of learners and the subject, and we will share a group plan.',
    ],
  ];
  var map = MAP_EMBED
    ? '<iframe title="Map showing the Kalvi Academy office" src="' +
      MAP_EMBED +
      '" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
    : '<img src="assets/map.svg" alt="Map showing the Kalvi Academy office on Anna Salai, Chennai" width="900" height="420">';
  return (
    '<section class="hero"><div class="wrap"><div><p class="eyebrow">Contact</p><h1 style="margin-top:12px;font-size:clamp(2rem,4.4vw,3.1rem)">We would love to hear from you</h1><p class="lead">Questions about courses, payments or school batches? Send us a message and a real person will reply.</p></div><div class="heroimg"><img src="assets/contact.svg" alt="A support agent with a headset answering student questions" width="560" height="420"></div></div></section>' +
    '<section class="band" style="padding-bottom:20px"><div class="wrap"><div class="grid">' +
    infos
      .map(function (i) {
        return (
          '<div class="card feat"><div class="ic">' +
          i[0] +
          '</div><h3>' +
          i[1] +
          '</h3><b class="mono sm" style="word-break:break-word">' +
          i[2] +
          '</b><p class="muted sm">' +
          i[3] +
          '</p></div>'
        );
      })
      .join('') +
    '</div></div></section>' +
    '<section class="band" style="padding-top:20px"><div class="wrap grid two" style="align-items:start"><div class="card pad"><h3 style="margin-bottom:14px">Send us a message</h3><form data-form="contact" class="stack"><label>Name<input id="cn" required autocomplete="name"></label><label>Email<input id="ce" type="email" required autocomplete="email"></label><label>Topic<select id="cs"><option>Course question</option><option>Payment help</option><option>School or company batch</option><option>Become an instructor</option><option>Something else</option></select></label><label>Message<textarea id="cm" required></textarea></label><button class="btn" type="submit">Send message</button></form></div><div><div class="head" style="margin-bottom:16px"><p class="eyebrow">Quick answers</p><h2 style="font-size:1.5rem">Before you write</h2></div>' +
    faqHTML(faq) +
    '</div></div></section>' +
    '<section class="band" style="padding-top:0"><div class="wrap"><div class="head"><p class="eyebrow">Find us</p><h2>Our office in Chennai</h2></div><div class="card mapcard">' +
    map +
    '<div class="maptext"><h3>Kalvi Academy</h3><p class="muted">12, Anna Salai<br>Chennai, Tamil Nadu 600002</p><p class="sm muted">Open Monday to Saturday<br>9 AM to 6 PM IST</p><a class="btn" href="https://www.google.com/maps/search/?api=1&query=Anna+Salai+Chennai" target="_blank" rel="noopener">Open in Google Maps</a></div></div></div></section>'
  );
}
