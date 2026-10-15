'use strict';
/* ---------- payment modal ---------- */
function payModal() {
  var m = document.getElementById('modal');
  if (!ui.pay) {
    m.hidden = true;
    m.innerHTML = '';
    return;
  }
  var c = course(ui.pay);
  m.hidden = false;
  m.className = 'modal';
  m.innerHTML =
    '<div class="card" role="dialog" aria-label="Payment"><div class="row between"><h3>Complete your purchase</h3><button class="btn ghost sm" data-act="closepay">Close</button></div><p class="muted sm" style="margin:6px 0 14px">' +
    esc(c.title) +
    '</p><div class="row between" style="margin-bottom:14px"><span>Total</span><b class="price" style="font-size:1.5rem">' +
    inr(c.price) +
    '</b></div><div class="seg" style="margin-bottom:14px"><button class="' +
    (ui.payTab === 'upi' ? 'on' : '') +
    '" data-act="paytab" data-v="upi" style="flex:1">UPI</button><button class="' +
    (ui.payTab === 'card' ? 'on' : '') +
    '" data-act="paytab" data-v="card" style="flex:1">Card</button></div><form data-form="pay" class="stack">' +
    (ui.payTab === 'upi'
      ? '<label>UPI ID<input id="pu" placeholder="yourname@bank" autocomplete="off"></label>'
      : '<label>Card number<input id="pc" placeholder="1234 5678 9012 3456" inputmode="numeric" autocomplete="off"></label><div class="two-form"><label>Expiry<input placeholder="MM/YY" autocomplete="off"></label><label>CVV<input placeholder="123" inputmode="numeric" autocomplete="off"></label></div>') +
    '<button class="btn hi" type="submit" id="paybtn">Pay ' +
    inr(c.price) +
    '</button><p class="sm muted">Secure checkout. You get instant access after payment.</p></form></div>';
}

/* ---------- count-up ---------- */
function countUp() {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll('[data-count]').forEach(function (el) {
    var end = Number(el.dataset.count),
      suf = el.dataset.suffix || '',
      t0 = null;
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min(1, (ts - t0) / 1100),
        v = Math.round(end * (1 - Math.pow(1 - p, 3)));
      el.textContent = v.toLocaleString('en-IN') + suf;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
}

/* ---------- router ---------- */
function render(keep) {
  stopPlayer();
  ui.menu = false;
  var u = me(),
    html;
  if ((PAGE === 'dashboard' || PAGE === 'learn') && !u) {
    ui.next = PAGE === 'learn' ? 'learn-' + ARG : 'dashboard';
    toast('Please log in first');
    go('login');
    return;
  }
  if (PAGE === 'learn') {
    var c = course(ARG);
    if (!c || (u.role === 'student' && !enr(u.id, c.id))) {
      go(c ? 'course-' + ARG : 'courses');
      return;
    }
  }
  if ((PAGE === 'login' || PAGE === 'register') && u) {
    go('dashboard');
    return;
  }
  switch (PAGE) {
    case 'about':
      html = pageAbout();
      break;
    case 'courses':
      html = pageCourses();
      break;
    case 'contact':
      html = pageContact();
      break;
    case 'login':
      html = pageLogin();
      break;
    case 'register':
      html = pageRegister();
      break;
    case 'course':
      html = pageCourse(ARG);
      break;
    case 'learn':
      html = pageLearn(ARG);
      break;
    case 'dashboard':
      html = pageDashboard();
      break;
    default:
      html = pageHome();
  }
  document.getElementById('nav').innerHTML = navHTML();
  var ft = document.querySelector('.foot');
  if (ft) ft.hidden = PAGE === 'login' || PAGE === 'register';
  var app = document.getElementById('app');
  app.classList.toggle('noanim', !!keep);
  app.innerHTML = html;
  payModal();
  if (typeof pageInit === 'function') pageInit();
  initReveal(!!keep);
  if (!keep) {
    window.scrollTo(0, 0);
    countUp();
  }
}

/* ---------- scroll reveal animation ---------- */
var revealIO = null;
function initReveal(instant) {
  var sel =
    '.band .head, .grid > *, .subjgrid > *, .steps > *, .faq details, .ctaband, .regtxt, .regform, .car, .carctl, .icard, .chips, .statrow, .tiles > *';
  var els = document.querySelectorAll('#app ' + sel);
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (revealIO) revealIO.disconnect();
  if (instant || reduce || !('IntersectionObserver' in window)) return;
  revealIO = new IntersectionObserver(
    function (list) {
      list.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          revealIO.unobserve(en.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  els.forEach(function (el, i) {
    el.classList.add('reveal');
    el.style.setProperty('--d', (i % 4) * 70 + 'ms');
    revealIO.observe(el);
  });
}

document.addEventListener('click', function (e) {
  if (ui.menu && !e.target.closest('#nav')) {
    ui.menu = false;
    document.getElementById('nav').innerHTML = navHTML();
  }
  var t = e.target.closest('[data-act]');
  if (!t) return;
  var f = act[t.dataset.act];
  if (f) f(t.dataset.v, t.dataset.v2, t, e);
});
document.addEventListener('input', function (e) {
  if (e.target.id === 'q') {
    ui.q = e.target.value;
    var g = document.getElementById('grid');
    if (g) g.innerHTML = gridHTML();
  }
});
document.addEventListener('change', function (e) {
  var t = e.target;
  if (t.dataset && t.dataset.chg === 'role') {
    user(t.dataset.v).role = t.value;
    save();
    toast('Role updated');
  }
});
document.addEventListener('submit', function (e) {
  var f = e.target.dataset.form;
  if (!f) return;
  e.preventDefault();
  function val(id) {
    return document.getElementById(id).value.trim();
  }
  function err(m) {
    var x = document.getElementById('err');
    if (x) x.textContent = m;
  }
  if (f === 'login') {
    var em = val('le').toLowerCase(),
      pw = document.getElementById('lp').value;
    var u = db.users.find(function (x) {
      return x.email.toLowerCase() === em && x.pw === pw;
    });
    if (!u) {
      err('Email or password is incorrect. Please try again or create an account.');
      return;
    }
    db.session = u.id;
    save();
    toast('Welcome, ' + u.name.split(' ')[0]);
    var n = ui.next;
    ui.next = null;
    go(n || 'dashboard');
  } else if (f === 'homereg') {
    var em3 = val('hre').toLowerCase();
    if (
      db.users.some(function (x) {
        return x.email.toLowerCase() === em3;
      })
    ) {
      err('This email is already registered. Please log in.');
      return;
    }
    var nu2 = {
      id: rid('u'),
      name: val('hrn'),
      email: em3,
      phone: val('hrp'),
      pw: document.getElementById('hrw').value,
      role: val('hrr'),
    };
    db.users.push(nu2);
    db.session = nu2.id;
    save();
    toast('Welcome aboard, ' + nu2.name.split(' ')[0] + '! 🎉');
    go('dashboard');
  } else if (f === 'register') {
    var em2 = val('re').toLowerCase();
    if (
      db.users.some(function (x) {
        return x.email.toLowerCase() === em2;
      })
    ) {
      err('This email is already registered. Please log in.');
      return;
    }
    var nu = {
      id: rid('u'),
      name: val('rn'),
      email: em2,
      pw: document.getElementById('rp').value,
      role: val('rr'),
    };
    db.users.push(nu);
    db.session = null;
    save();
    toast('Registered successfully. Please log in.');
    try {
      sessionStorage.setItem('kalvi-prefill', em2);
    } catch (x) {}
    go('login');
  } else if (f === 'subscribe') {
    e.target.reset();
    toast('Thanks for subscribing. We will keep you posted.');
  } else if (f === 'contact') {
    db.messages.unshift({
      id: rid('m'),
      name: val('cn'),
      email: val('ce'),
      text: val('cs') + ' - ' + val('cm'),
      date: today(),
    });
    save();
    e.target.reset();
    toast('Message sent. We will reply soon.');
  } else if (f === 'newcourse') {
    var free = val('nf') === 'free';
    db.courses.push({
      id: rid('c'),
      title: val('nt'),
      cat: val('nc'),
      level: val('nl'),
      by: me().id,
      free: free,
      price: free ? 0 : Math.max(0, Number(val('np')) || 0),
      rating: 0,
      status: 'pending',
      desc: val('nd'),
      lessons: [],
    });
    save();
    ui.newCourse = false;
    render(true);
    toast('Course submitted. Waiting for admin approval.');
  } else if (f === 'addlesson') {
    var c = course(e.target.dataset.cid),
      fi = document.getElementById('lf').files[0];
    c.lessons.push({
      id: rid('l'),
      title: val('lt'),
      type: val('ly'),
      mins: Math.max(1, Number(val('lm')) || 10),
      file: fi ? fi.name : '',
    });
    save();
    render(true);
    toast('Lesson added');
  } else if (f === 'pay') {
    var btn = document.getElementById('paybtn');
    btn.disabled = true;
    btn.textContent = 'Processing...';
    var c2 = course(ui.pay);
    setTimeout(function () {
      var uu = me();
      db.payments.push({
        id: rid('p'),
        uid: uu.id,
        cid: c2.id,
        amount: c2.price,
        date: today(),
        method: ui.payTab === 'upi' ? 'UPI' : 'Card',
      });
      doEnroll(c2);
      ui.pay = null;
      payModal();
      toast('Payment successful. Course unlocked.');
      go('learn-' + c2.id);
    }, 900);
  }
});

document.addEventListener('keydown', function (e) {
  if (e.key !== 'Escape') return;
  if (ui.menu) {
    ui.menu = false;
    document.getElementById('nav').innerHTML = navHTML();
  }
  if (ui.pay) {
    ui.pay = null;
    payModal();
  }
});
if (pendingToast) toast(pendingToast);
render();
try {
  var pf = sessionStorage.getItem('kalvi-prefill'),
    le = document.getElementById('le');
  if (pf && le) {
    le.value = pf;
    sessionStorage.removeItem('kalvi-prefill');
  }
} catch (x) {}
