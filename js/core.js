'use strict';
var KEY = 'kalvi-academy-v2';
function inr(n) {
  return '₹' + Number(n).toLocaleString('en-IN');
}
function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}
function rid(p) {
  return p + Date.now().toString(36) + Math.floor(Math.random() * 1000).toString(36);
}
function fmt(s) {
  s = Math.floor(s);
  return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
}
function today() {
  return new Date().toISOString().slice(0, 10);
}

/* ---------- seed data ---------- */
function mk(cid, arr) {
  return arr.map(function (a, i) {
    return { id: cid + 'l' + (i + 1), title: a[0], type: a[1], mins: a[2] };
  });
}
function seed() {
  var users = [
    {
      id: 'u1',
      name: 'Admin Kalvi',
      email: 'admin@kalviacademy.in',
      pw: 'admin123',
      role: 'admin',
    },
    {
      id: 'u2',
      name: 'Priya Raman',
      email: 'priya@kalviacademy.in',
      pw: 'teach123',
      role: 'instructor',
      bio: 'Full-stack developer and digital marketer with nine years in the industry.',
    },
    {
      id: 'u3',
      name: 'Karthik S',
      email: 'karthik@kalviacademy.in',
      pw: 'teach123',
      role: 'instructor',
      bio: 'Spoken English coach and data analyst who trains working professionals.',
    },
    {
      id: 'u4',
      name: 'Arun Kumar',
      email: 'arun@kalviacademy.in',
      pw: 'learn123',
      role: 'student',
    },
    {
      id: 'u5',
      name: 'Divya M',
      email: 'divya@kalviacademy.in',
      pw: 'learn123',
      role: 'student',
    },
    {
      id: 'u6',
      name: 'Ramesh Kumar',
      email: 'ramesh@kalviacademy.in',
      pw: 'teach123',
      role: 'instructor',
      bio: 'Mathematics and physics teacher with 15 years of classroom experience.',
    },
    {
      id: 'u7',
      name: 'Lakshmi Devi',
      email: 'lakshmi@kalviacademy.in',
      pw: 'teach123',
      role: 'instructor',
      bio: 'Science and Tamil teacher who loves making hard chapters simple.',
    },
    {
      id: 'u8',
      name: 'Meenakshi Sundaram',
      email: 'meenakshi@kalviacademy.in',
      pw: 'teach123',
      role: 'instructor',
      bio: 'NEET biology and chemistry mentor with 12 years of coaching experience.',
    },
    {
      id: 'u9',
      name: 'Suresh Babu',
      email: 'suresh.babu@kalviacademy.in',
      pw: 'teach123',
      role: 'instructor',
      bio: 'Competitive exam trainer for TNPSC, TET and SET, focused on previous-year patterns.',
    },
  ];
  var courses = [
    {
      id: 'c1',
      title: 'Python for Beginners',
      cat: 'Programming',
      level: 'Beginner',
      by: 'u2',
      free: true,
      price: 0,
      rating: 4.8,
      status: 'published',
      desc: 'Start from zero and write real Python programs. Variables, loops, functions and a small project you can show to employers.',
      lessons: mk('c1', [
        ['Welcome and setup', 'video', 8],
        ['Variables and data types', 'video', 14],
        ['Cheat sheet: Python basics', 'pdf', 6],
        ['Loops and conditions', 'video', 16],
        ['Functions in practice', 'video', 18],
        ['Practice workbook', 'pdf', 10],
      ]),
    },
    {
      id: 'c2',
      title: 'Full-Stack Web Development',
      cat: 'Web',
      level: 'Intermediate',
      by: 'u2',
      free: false,
      price: 1999,
      rating: 4.9,
      status: 'published',
      desc: 'Build and deploy complete web apps with HTML, CSS, JavaScript, APIs and a database. Includes three portfolio projects.',
      lessons: mk('c2', [
        ['How the web works', 'video', 10],
        ['HTML and CSS layout', 'video', 22],
        ['JavaScript essentials', 'video', 25],
        ['Project brief: portfolio site', 'pdf', 7],
        ['Building a REST API', 'video', 24],
        ['Deploying your app', 'video', 15],
      ]),
    },
    {
      id: 'c3',
      title: 'Spoken English Mastery',
      cat: 'Language',
      level: 'Beginner',
      by: 'u3',
      free: true,
      price: 0,
      rating: 4.7,
      status: 'published',
      desc: 'Speak with confidence in interviews, meetings and daily life. Short daily lessons with speaking drills.',
      lessons: mk('c3', [
        ['Greetings and introductions', 'video', 9],
        ['Everyday conversation', 'video', 12],
        ['Pronunciation guide', 'pdf', 8],
        ['Interview English', 'video', 17],
        ['Phrasebook for work', 'pdf', 6],
      ]),
    },
    {
      id: 'c4',
      title: 'Data Analysis with Excel',
      cat: 'Data',
      level: 'Beginner',
      by: 'u3',
      free: false,
      price: 999,
      rating: 4.6,
      status: 'published',
      desc: 'Clean, analyse and present data using formulas, pivot tables and charts. Practice files included.',
      lessons: mk('c4', [
        ['Excel interface tour', 'video', 7],
        ['Formulas that matter', 'video', 19],
        ['Pivot tables step by step', 'video', 21],
        ['Dashboard template', 'pdf', 5],
        ['Final assignment', 'pdf', 9],
      ]),
    },
    {
      id: 'c5',
      title: 'Digital Marketing Essentials',
      cat: 'Marketing',
      level: 'Beginner',
      by: 'u2',
      free: false,
      price: 1499,
      rating: 4.5,
      status: 'published',
      desc: 'SEO, social media, email and ads in one practical course. Plan and run your first campaign.',
      lessons: mk('c5', [
        ['Marketing funnel basics', 'video', 12],
        ['SEO fundamentals', 'video', 18],
        ['Social media playbook', 'pdf', 8],
        ['Running paid ads', 'video', 20],
        ['Campaign planner', 'pdf', 6],
      ]),
    },
    {
      id: 'c6',
      title: 'UI Design Fundamentals',
      cat: 'Design',
      level: 'Beginner',
      by: 'u3',
      free: true,
      price: 0,
      rating: 4.4,
      status: 'pending',
      desc: 'Layout, colour and typography for clean interfaces. Waiting for admin approval.',
      lessons: mk('c6', [
        ['What makes a good interface', 'video', 11],
        ['Colour and type', 'video', 16],
        ['Design checklist', 'pdf', 5],
      ]),
    },
    {
      id: 'c7',
      title: 'Class 10 Mathematics',
      cat: 'Maths',
      level: 'Class 10',
      by: 'u6',
      free: true,
      price: 0,
      rating: 4.8,
      status: 'published',
      desc: 'Every chapter of the Class 10 syllabus explained step by step, with worked examples and previous year questions.',
      lessons: mk('c7', [
        ['Real numbers', 'video', 14],
        ['Polynomials', 'video', 16],
        ['Quadratic equations', 'video', 18],
        ['Formula sheet', 'pdf', 5],
        ['Trigonometry basics', 'video', 20],
        ['Previous year questions', 'pdf', 8],
      ]),
    },
    {
      id: 'c8',
      title: 'Class 12 Calculus',
      cat: 'Maths',
      level: 'Class 12',
      by: 'u6',
      free: false,
      price: 799,
      rating: 4.7,
      status: 'published',
      desc: 'Limits, derivatives and integrals made clear, with exam-style problems after every topic.',
      lessons: mk('c8', [
        ['Limits and continuity', 'video', 17],
        ['Differentiation rules', 'video', 19],
        ['Applications of derivatives', 'video', 22],
        ['Integration techniques', 'video', 24],
        ['Revision notes', 'pdf', 9],
      ]),
    },
    {
      id: 'c9',
      title: 'Class 9 Science',
      cat: 'Science',
      level: 'Class 9',
      by: 'u7',
      free: true,
      price: 0,
      rating: 4.6,
      status: 'published',
      desc: 'A friendly start to science: matter, atoms, cells, motion and force with simple experiments you can try at home.',
      lessons: mk('c9', [
        ['Matter around us', 'video', 13],
        ['Atoms and molecules', 'video', 15],
        ['The cell', 'video', 14],
        ['Motion and force', 'video', 18],
        ['Chapter notes', 'pdf', 7],
      ]),
    },
    {
      id: 'c10',
      title: 'Physics for Class 11 and 12',
      cat: 'Physics',
      level: 'Class 11-12',
      by: 'u6',
      free: false,
      price: 999,
      rating: 4.8,
      status: 'published',
      desc: 'Build strong concepts in mechanics and electricity, then practise numericals the way exams ask them.',
      lessons: mk('c10', [
        ['Kinematics', 'video', 20],
        ["Newton's laws of motion", 'video', 22],
        ['Work, energy and power', 'video', 18],
        ['Electrostatics', 'video', 24],
        ['Formula handbook', 'pdf', 6],
        ['Numerical practice set', 'pdf', 10],
      ]),
    },
    {
      id: 'c11',
      title: 'Chemistry Made Simple',
      cat: 'Chemistry',
      level: 'Class 11-12',
      by: 'u7',
      free: false,
      price: 899,
      rating: 4.6,
      status: 'published',
      desc: 'Atomic structure, periodic trends, bonding and organic basics explained with clear diagrams.',
      lessons: mk('c11', [
        ['Atomic structure', 'video', 18],
        ['Periodic table trends', 'video', 16],
        ['Chemical bonding', 'video', 21],
        ['Organic chemistry basics', 'video', 23],
        ['Reaction cheat sheet', 'pdf', 6],
      ]),
    },
    {
      id: 'c12',
      title: 'Biology and NEET Foundation',
      cat: 'Biology',
      level: 'Class 11-12',
      by: 'u7',
      free: false,
      price: 1299,
      rating: 4.7,
      status: 'published',
      desc: 'Cell biology, plant and human physiology and genetics, with NEET-style questions and revision notes.',
      lessons: mk('c12', [
        ['The cell and cell division', 'video', 19],
        ['Plant physiology', 'video', 20],
        ['Human physiology', 'video', 24],
        ['Genetics and inheritance', 'video', 22],
        ['NEET revision notes', 'pdf', 12],
      ]),
    },
    {
      id: 'c13',
      title: 'Tamil Grammar and Literature',
      cat: 'Language',
      level: 'Class 10',
      by: 'u7',
      free: true,
      price: 0,
      rating: 4.5,
      status: 'published',
      desc: 'Grammar, poetry appreciation and essay writing for Class 10 Tamil, with model answers.',
      lessons: mk('c13', [
        ['Alphabet and word formation', 'video', 12],
        ['Sentence structure', 'video', 14],
        ['Poetry appreciation', 'video', 16],
        ['Essay writing', 'video', 15],
        ['Grammar notes', 'pdf', 8],
      ]),
    },
    {
      id: 'c14',
      title: 'Computer Science with Python',
      cat: 'Programming',
      level: 'Class 12',
      by: 'u2',
      free: false,
      price: 699,
      rating: 4.6,
      status: 'published',
      desc: 'Class 12 computer science: functions, files, data structures and SQL, taught through Python.',
      lessons: mk('c14', [
        ['Functions and modules', 'video', 17],
        ['File handling', 'video', 15],
        ['Stacks and queues', 'video', 18],
        ['SQL basics', 'video', 20],
        ['Board exam practice', 'pdf', 9],
      ]),
    },
    {
      id: 'c15',
      title: 'Class 8 Mathematics Foundation',
      cat: 'Maths',
      level: 'Class 8',
      by: 'u6',
      free: true,
      price: 0,
      rating: 4.5,
      status: 'published',
      desc: 'Strengthen the basics before high school: fractions, algebra, geometry and data handling.',
      lessons: mk('c15', [
        ['Rational numbers', 'video', 12],
        ['Algebraic expressions', 'video', 15],
        ['Understanding shapes', 'video', 14],
        ['Practice worksheet', 'pdf', 6],
      ]),
    },
    {
      id: 'c16',
      title: 'NEET Biology Crash Course',
      cat: 'Govt Exams',
      level: 'NEET',
      by: 'u8',
      free: false,
      price: 1499,
      rating: 4.8,
      status: 'published',
      desc: 'Revise the full NEET biology syllabus in short chapter-wise lessons with NCERT-based notes and hundreds of practice questions.',
      lessons: mk('c16', [
        ['Cell: the unit of life', 'video', 18],
        ['Plant physiology in one hour', 'video', 22],
        ['Human physiology quick revision', 'video', 24],
        ['NCERT diagrams cheat sheet', 'pdf', 8],
        ['Genetics and evolution', 'video', 20],
        ['Previous year question set', 'pdf', 12],
      ]),
    },
    {
      id: 'c17',
      title: 'NEET Physics and Chemistry Practice',
      cat: 'Govt Exams',
      level: 'NEET',
      by: 'u6',
      free: false,
      price: 1799,
      rating: 4.7,
      status: 'published',
      desc: 'Solve NEET-level numericals step by step and learn the shortcuts toppers use for physics and physical chemistry.',
      lessons: mk('c17', [
        ['Mechanics problem solving', 'video', 24],
        ['Electrostatics shortcuts', 'video', 20],
        ['Physical chemistry numericals', 'video', 22],
        ['Organic reactions map', 'pdf', 9],
        ['Full-length mock test', 'pdf', 15],
      ]),
    },
    {
      id: 'c18',
      title: 'JEE Main Maths Foundation',
      cat: 'Govt Exams',
      level: 'JEE',
      by: 'u6',
      free: false,
      price: 1699,
      rating: 4.6,
      status: 'published',
      desc: 'Build a strong base in algebra, calculus and coordinate geometry for JEE Main with exam-style practice.',
      lessons: mk('c18', [
        ['Sets, relations and functions', 'video', 20],
        ['Quadratics and sequences', 'video', 22],
        ['Limits and derivatives', 'video', 26],
        ['Formula sheet', 'pdf', 6],
        ['Practice paper', 'pdf', 14],
      ]),
    },
    {
      id: 'c19',
      title: 'TNPSC Group 4 Complete Preparation',
      cat: 'Govt Exams',
      level: 'TNPSC',
      by: 'u9',
      free: false,
      price: 999,
      rating: 4.7,
      status: 'published',
      desc: 'Cover General Tamil, General Studies and Aptitude for TNPSC Group 4 with notes, tips and model tests.',
      lessons: mk('c19', [
        ['Exam pattern and strategy', 'video', 12],
        ['General Tamil: grammar basics', 'video', 20],
        ['Indian polity essentials', 'video', 22],
        ['History of Tamil Nadu', 'video', 18],
        ['Aptitude and mental ability', 'video', 24],
        ['Model test paper', 'pdf', 12],
      ]),
    },
    {
      id: 'c20',
      title: 'TNPSC General Tamil and GK Starter',
      cat: 'Govt Exams',
      level: 'TNPSC',
      by: 'u9',
      free: true,
      price: 0,
      rating: 4.5,
      status: 'published',
      desc: 'A free starter pack: Tamil grammar essentials, Tamil Nadu GK and current affairs notes to begin your TNPSC journey.',
      lessons: mk('c20', [
        ['Tamil grammar essentials', 'video', 15],
        ['Tamil Nadu GK quick facts', 'video', 12],
        ['Current affairs notes', 'pdf', 8],
      ]),
    },
    {
      id: 'c21',
      title: 'TET Paper 1 and 2 Preparation',
      cat: 'Govt Exams',
      level: 'TET',
      by: 'u9',
      free: false,
      price: 899,
      rating: 4.6,
      status: 'published',
      desc: 'Prepare for the Teacher Eligibility Test with child development, pedagogy, language and subject lessons.',
      lessons: mk('c21', [
        ['Child development and pedagogy', 'video', 22],
        ['Language skills practice', 'video', 16],
        ['Environmental studies for Paper 1', 'video', 18],
        ['Maths pedagogy', 'video', 17],
        ['Model question paper', 'pdf', 10],
      ]),
    },
    {
      id: 'c22',
      title: 'SET Exam: Teaching and Research Aptitude',
      cat: 'Govt Exams',
      level: 'SET',
      by: 'u9',
      free: false,
      price: 1199,
      rating: 4.5,
      status: 'published',
      desc: 'Paper 1 preparation for the State Eligibility Test: teaching aptitude, research methods, reasoning and comprehension.',
      lessons: mk('c22', [
        ['Teaching aptitude basics', 'video', 20],
        ['Research aptitude', 'video', 19],
        ['Reasoning and comprehension', 'video', 23],
        ['Higher education in India', 'video', 16],
        ['Previous year paper', 'pdf', 12],
      ]),
    },
    {
      id: 'c23',
      title: 'SSC and Bank Exam Aptitude',
      cat: 'Govt Exams',
      level: 'SSC / Bank',
      by: 'u3',
      free: false,
      price: 1299,
      rating: 4.6,
      status: 'published',
      desc: 'Speed up your quantitative aptitude and reasoning for SSC and banking exams with shortcuts and timed practice.',
      lessons: mk('c23', [
        ['Number system shortcuts', 'video', 18],
        ['Percentage, profit and loss', 'video', 20],
        ['Data interpretation', 'video', 22],
        ['Reasoning puzzles', 'video', 19],
        ['Speed maths sheet', 'pdf', 6],
      ]),
    },
  ];
  var enrollments = [
    { uid: 'u4', cid: 'c1', done: ['c1l1', 'c1l2', 'c1l3'], last: 'c1l4', date: '2026-10-02' },
    { uid: 'u4', cid: 'c2', done: ['c2l1'], last: 'c2l2', date: '2026-10-06' },
    { uid: 'u4', cid: 'c7', done: ['c7l1', 'c7l2'], last: 'c7l3', date: '2026-10-10' },
    {
      uid: 'u5',
      cid: 'c1',
      done: ['c1l1', 'c1l2', 'c1l3', 'c1l4', 'c1l5', 'c1l6'],
      last: 'c1l6',
      date: '2026-09-28',
    },
    { uid: 'u5', cid: 'c3', done: ['c3l1'], last: 'c3l2', date: '2026-10-08' },
  ];
  var payments = [
    { id: 'p1', uid: 'u4', cid: 'c2', amount: 1999, date: '2026-10-06', method: 'UPI' },
  ];
  var messages = [
    {
      id: 'm1',
      name: 'Suresh B',
      email: 'suresh@example.com',
      text: 'Do you offer corporate batches for 30 employees?',
      date: '2026-10-11',
    },
    {
      id: 'm2',
      name: 'Meena K',
      email: 'meena@example.com',
      text: 'Is there a certificate after completing a paid course?',
      date: '2026-10-12',
    },
  ];
  var testimonials = [
    {
      id: 't1',
      name: 'Arun Kumar',
      role: 'Student, Python course',
      text: 'I could not code at all three weeks ago. The short lessons and the workbook made it easy to keep going every day.',
      show: true,
    },
    {
      id: 't2',
      name: 'Divya M',
      role: 'Student, Spoken English',
      text: 'The drills are practical. I used the interview lessons the week before my placement round and felt prepared.',
      show: true,
    },
    {
      id: 't3',
      name: 'Priya Raman',
      role: 'Instructor',
      text: "Uploading lessons and seeing each student's progress in one place saves me hours every week.",
      show: true,
    },
    {
      id: 't4',
      name: 'Sangeetha R',
      role: 'Parent of a Class 10 student',
      text: 'My son revises maths from the PDF notes and then watches the lesson again. His confidence before the board exam is much better.',
      show: true,
    },
    {
      id: 't5',
      name: 'Vignesh P',
      role: 'Student, Class 12 Physics',
      text: 'The numerical practice sets are exactly the type that come in exams. I finally understand electrostatics.',
      show: true,
    },
    {
      id: 't6',
      name: 'Nandhini K',
      role: 'Student, Class 9 Science',
      text: 'The lessons are short and clear. I can pause, go back and watch again whenever I want.',
      show: true,
    },
  ];
  return {
    users: users,
    courses: courses,
    enrollments: enrollments,
    payments: payments,
    messages: messages,
    testimonials: testimonials,
    session: null,
  };
}

var db;
/* Adds newly shipped demo users/courses to data already saved in the browser,
   without bringing back anything an admin deleted earlier. */
var LEGACY_IDS = {
  users: ['u1', 'u2', 'u3', 'u4', 'u5', 'u6', 'u7'],
  courses: ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 'c11', 'c12', 'c13', 'c14', 'c15'],
};
function mergeSeed(d) {
  var sd = seed();
  d.seen = d.seen || { users: LEGACY_IDS.users.slice(), courses: LEGACY_IDS.courses.slice() };
  ['users', 'courses'].forEach(function (k) {
    sd[k].forEach(function (x) {
      if (d.seen[k].indexOf(x.id) < 0) {
        d.seen[k].push(x.id);
        if (
          !d[k].some(function (y) {
            return y.id === x.id;
          })
        )
          d[k].push(x);
      }
    });
  });
  return d;
}
function load() {
  try {
    var s = localStorage.getItem(KEY);
    if (s) return mergeSeed(JSON.parse(s));
  } catch (e) {}
  return mergeSeed(seed());
}
function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(db));
  } catch (e) {}
}
db = load();

/* ---------- helpers ---------- */
function me() {
  return (
    db.users.find(function (u) {
      return u.id === db.session;
    }) || null
  );
}
function user(id) {
  return (
    db.users.find(function (u) {
      return u.id === id;
    }) || null
  );
}
function course(id) {
  return (
    db.courses.find(function (c) {
      return c.id === id;
    }) || null
  );
}
function enr(u, c) {
  return (
    db.enrollments.find(function (e) {
      return e.uid === u && e.cid === c;
    }) || null
  );
}
function pct(e, c) {
  return c.lessons.length ? Math.round((e.done.length / c.lessons.length) * 100) : 0;
}
function hue(c) {
  return (
    {
      'Govt Exams': 42,
      Programming: 190,
      Web: 215,
      Language: 150,
      Data: 260,
      Marketing: 20,
      Design: 330,
      Maths: 230,
      Science: 165,
      Physics: 205,
      Chemistry: 290,
      Biology: 135,
    }[c.cat] || 170
  );
}
function initials(t) {
  return t
    .split(/\s+/)
    .slice(0, 2)
    .map(function (w) {
      return w[0];
    })
    .join('')
    .toUpperCase();
}
var ui = {
  q: '',
  filter: 'all',
  cat: 'all',
  menu: false,
  lid: null,
  t: 0,
  playing: false,
  page: 0,
  adminTab: 'overview',
  instTab: 'courses',
  manage: null,
  newCourse: false,
  pay: null,
  payTab: 'upi',
  next: null,
};
var timer = null;

/* ---------- page routing (multi-page) ---------- */
var PAGE = document.body.dataset.page || 'home';
var ARG = new URLSearchParams(location.search).get('id') || '';
var ROUTES = {
  home: 'index.html',
  about: 'about.html',
  courses: 'courses.html',
  contact: 'contact.html',
  login: 'login.html',
  register: 'register.html',
  dashboard: 'dashboard.html',
};
var lastToast = { m: '', t: 0 },
  pendingToast = null;
function url(v) {
  var i = v.indexOf('-'),
    p = i < 0 ? v : v.slice(0, i),
    a = i < 0 ? '' : v.slice(i + 1);
  if (p === 'course' || p === 'learn') return p + '.html?id=' + encodeURIComponent(a);
  return ROUTES[p] || 'index.html';
}
function go(v) {
  try {
    sessionStorage.setItem(
      'kalvi-carry',
      JSON.stringify({
        next: ui.next,
        filter: ui.filter,
        cat: ui.cat,
        q: ui.q,
        lid: ui.lid,
        toast: Date.now() - lastToast.t < 3000 ? lastToast.m : null,
      })
    );
  } catch (e) {}
  location.href = url(v);
}
(function () {
  try {
    var s = sessionStorage.getItem('kalvi-carry');
    if (!s) return;
    sessionStorage.removeItem('kalvi-carry');
    var c = JSON.parse(s);
    ['next', 'filter', 'cat', 'q', 'lid'].forEach(function (k) {
      if (c[k] != null) ui[k] = c[k];
    });
    pendingToast = c.toast;
  } catch (e) {}
})();

var I = {
  play: '<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
  pause:
    '<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>',
  lock: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
  check:
    '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4"><path d="M5 12l5 5 9-10"/></svg>',
  book: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5"/></svg>',
  video:
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10l5-3v10l-5-3z"/></svg>',
  shield:
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/></svg>',
};

var CATS = [
  'Govt Exams',
  'Programming',
  'Web',
  'Data',
  'Design',
  'Marketing',
  'Language',
  'Maths',
  'Science',
  'Physics',
  'Chemistry',
  'Biology',
];
var GLYPH = {
  'Govt Exams': '🏛️',
  Programming: '</>',
  Web: '{ }',
  Data: '%',
  Design: 'Aa',
  Marketing: '↗',
  Language: 'அ',
  Maths: 'π',
  Science: 'H₂O',
  Physics: 'F=ma',
  Chemistry: 'Na',
  Biology: 'DNA',
};
var BLURB = {
  'Govt Exams': 'NEET, JEE, TNPSC, TET, SET and more',
  Programming: 'Python, logic and coding for every level',
  Web: 'Build websites and web apps',
  Data: 'Excel, analysis and reporting',
  Design: 'Interfaces, colour and typography',
  Marketing: 'SEO, social media and ads',
  Language: 'English and Tamil, spoken and written',
  Maths: 'Mathematics for Class 8 to 12',
  Science: 'Foundation science for school students',
  Physics: 'Concepts and numericals, Class 11-12',
  Chemistry: 'Reactions made simple, Class 11-12',
  Biology: 'Class 11-12 and NEET foundation',
};
I.users =
  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"/><circle cx="17.5" cy="9" r="2.5"/><path d="M17 14c2.7 0 4.5 1.8 4.5 4.5"/></svg>';
I.mail =
  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>';
I.phone =
  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>';
I.pin =
  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>';

/* ---------- toast / modal ---------- */
var toastT = null;
function toast(m) {
  var t = document.getElementById('toast');
  lastToast = { m: m, t: Date.now() };
  t.textContent = m;
  t.hidden = false;
  clearTimeout(toastT);
  toastT = setTimeout(function () {
    t.hidden = true;
  }, 2600);
}

/* ---------- views ---------- */
function navHTML() {
  var u = me(),
    h = PAGE;
  function b(k, l) {
    return (
      '<button class="' +
      (h === k ? 'on' : '') +
      '" data-act="nav" data-v="' +
      k +
      '">' +
      l +
      '</button>'
    );
  }
  var right = u
    ? '<button class="btn ghost sm" data-act="nav" data-v="dashboard">' +
      esc(u.name.split(' ')[0]) +
      ' · ' +
      u.role +
      '</button><button class="btn sm" data-act="logout">Log out</button>'
    : '<button class="btn ghost sm" data-act="nav" data-v="login">Log in</button><button class="btn sm" data-act="nav" data-v="register">Register</button>';
  return (
    '<button class="brand" data-act="nav" data-v="home"><img class="logo" src="assets/logo.png" alt="Kalvi Academy logo" width="36" height="36"><span>Kalvi Academy</span></button>' +
    '<button class="burger' +
    (ui.menu ? ' open' : '') +
    '" data-act="menu" aria-label="' +
    (ui.menu ? 'Close menu' : 'Open menu') +
    '" aria-expanded="' +
    (ui.menu ? 'true' : 'false') +
    '" aria-controls="menu"><span></span><span></span><span></span></button>' +
    '<div class="navpanel' +
    (ui.menu ? ' open' : '') +
    '" id="menu"><nav class="links" aria-label="Main menu">' +
    b('home', 'Home') +
    b('about', 'About') +
    b('courses', 'Courses') +
    b('contact', 'Contact') +
    (u ? b('dashboard', 'Dashboard') : '') +
    '</nav><div class="auth">' +
    right +
    '</div></div>'
  );
}
function thumb(c) {
  return (
    '<div class="thumb" style="--h:' +
    hue(c) +
    '"><span>' +
    esc(c.cat) +
    '</span><b>' +
    esc(initials(c.title)) +
    '</b></div>'
  );
}
function card(c) {
  var ins = user(c.by),
    u = me(),
    en = u && enr(u.id, c.id);
  return (
    '<article class="card course">' +
    thumb(c) +
    '<div class="cbody"><div class="row between"><span class="pill ' +
    (c.free ? 'free' : 'paid') +
    '">' +
    (c.free ? 'FREE' : inr(c.price)) +
    '</span><span class="muted sm">' +
    esc(c.level) +
    '</span></div><h3>' +
    esc(c.title) +
    '</h3><p class="muted sm">' +
    esc(ins ? ins.name : '') +
    ' · ' +
    c.lessons.length +
    ' lessons</p><div class="row between"><span class="sm">★ ' +
    c.rating +
    '</span><button class="btn sm" data-act="nav" data-v="course-' +
    c.id +
    '">' +
    (en ? 'Continue' : 'View course') +
    '</button></div></div></article>'
  );
}
function published() {
  return db.courses.filter(function (c) {
    return c.status === 'published';
  });
}

function faqHTML(items) {
  return (
    '<div class="faq">' +
    items
      .map(function (f) {
        return '<details><summary>' + f[0] + '</summary><p>' + f[1] + '</p></details>';
      })
      .join('') +
    '</div>'
  );
}
function ctaBand(title, text, btns) {
  return (
    '<div class="ctaband"><div><h2>' +
    title +
    '</h2><p>' +
    text +
    '</p></div><div class="row">' +
    btns +
    '</div></div>'
  );
}

function stopPlayer() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
  ui.playing = false;
}
function doEnroll(c) {
  var u = me();
  if (!enr(u.id, c.id))
    db.enrollments.push({
      uid: u.id,
      cid: c.id,
      done: [],
      last: c.lessons[0] ? c.lessons[0].id : null,
      date: today(),
    });
  save();
}
function tiles(arr) {
  return (
    '<div class="tiles">' +
    arr
      .map(function (t) {
        return (
          '<div class="card tile"><b' +
          (typeof t[0] === 'number' ? ' data-count="' + t[0] + '"' : '') +
          '>' +
          t[0] +
          '</b><span class="muted sm">' +
          t[1] +
          '</span></div>'
        );
      })
      .join('') +
    '</div>'
  );
}
var act = {};

act.nav = function (v) {
  ui.menu = false;
  if (url(v) === url(PAGE === 'course' || PAGE === 'learn' ? PAGE + '-' + ARG : PAGE)) render(true);
  else go(v);
};
act.start = function (v) {
  var u = me(),
    c = course(v),
    en = enr(u.id, v);
  ui.lid = en && en.last ? en.last : c.lessons[0] && c.lessons[0].id;
  ui.t = 0;
  ui.page = 0;
  if (PAGE === 'learn' && ARG === v) render();
  else go('learn-' + v);
};
act.logout = function () {
    db.session = null;
    save();
    toast('Logged out');
    go('home');
};
act.enroll = function (v) {
    var u = me(),
      c = course(v);
    if (!u) {
      ui.next = 'course-' + v;
      toast('Log in or register to continue');
      go('login');
      return;
    }
    if (c.free) {
      doEnroll(c);
      toast('Enrolled. Happy learning!');
      go('learn-' + v);
    } else {
      ui.pay = v;
      ui.payTab = 'upi';
      payModal();
    }
};
act.closepay = function () {
    ui.pay = null;
    payModal();
};
act.paytab = function (v) {
    ui.payTab = v;
    payModal();
};
act.gofilter = function (v) {
    ui.filter = v;
    ui.cat = 'all';
    ui.q = '';
    if (PAGE === 'courses') render();
    else go('courses');
};
act.gocat = function (v) {
    ui.cat = v;
    ui.filter = 'all';
    ui.q = '';
    if (PAGE === 'courses') render();
    else go('courses');
};
act.menu = function () {
    ui.menu = !ui.menu;
    document.getElementById('nav').innerHTML = navHTML();
    var bb = document.querySelector('.burger');
    if (bb) bb.focus();
};
