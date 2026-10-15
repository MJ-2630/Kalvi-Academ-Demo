'use strict';
function pageDashboard() {
  var u = me();
  if (u.role === 'student') return dashStudent(u);
  if (u.role === 'instructor') return dashInstructor(u);
  return dashAdmin(u);
}
function dashStudent(u) {
  var mine = db.enrollments.filter(function (e) {
    return e.uid === u.id && course(e.cid);
  });
  var comp = 0,
    lessons = 0;
  mine.forEach(function (e) {
    var c = course(e.cid);
    lessons += e.done.length;
    if (pct(e, c) === 100) comp++;
  });
  var pays = db.payments.filter(function (p) {
    return p.uid === u.id;
  });
  var more = published()
    .filter(function (c) {
      return !enr(u.id, c.id);
    })
    .slice(0, 3);
  return (
    '<div class="wrap dash"><p class="eyebrow">Student dashboard</p><h1 style="font-size:2rem;margin-top:6px">Hi ' +
    esc(u.name.split(' ')[0]) +
    ', keep going</h1>' +
    tiles([
      [mine.length, 'Courses enrolled'],
      [mine.length - comp, 'In progress'],
      [comp, 'Completed'],
      [lessons, 'Lessons finished'],
    ]) +
    '<h3 style="margin-bottom:12px">My courses</h3><div class="stack">' +
    (mine.length
      ? mine
          .map(function (e) {
            var c = course(e.cid),
              p = pct(e, c);
            return (
              '<div class="card mine">' +
              thumb(c) +
              '<div class="info"><div class="row"><h3>' +
              esc(c.title) +
              '</h3>' +
              (p === 100
                ? '<span class="pill ok">COMPLETED</span>'
                : '<span class="pill">' + p + '%</span>') +
              '</div><div class="bar"><span style="width:' +
              p +
              '%"></span></div><p class="sm muted">' +
              e.done.length +
              ' of ' +
              c.lessons.length +
              ' lessons finished</p></div><button class="btn" data-act="start" data-v="' +
              c.id +
              '">' +
              (p === 100 ? 'Review' : 'Continue') +
              '</button></div>'
            );
          })
          .join('')
      : '<div class="card pad"><p class="muted">You have not enrolled in any course yet.</p></div>') +
    '</div>' +
    (pays.length
      ? '<h3 style="margin:28px 0 12px">Payment history</h3><div class="card tbl"><table><tr><th>Course</th><th>Date</th><th>Method</th><th>Amount</th></tr>' +
        pays
          .map(function (p) {
            var c = course(p.cid);
            return (
              '<tr><td>' +
              esc(c ? c.title : '') +
              '</td><td>' +
              p.date +
              '</td><td>' +
              p.method +
              '</td><td>' +
              inr(p.amount) +
              '</td></tr>'
            );
          })
          .join('') +
        '</table></div>'
      : '') +
    (more.length
      ? '<h3 style="margin:28px 0 12px">Recommended for you</h3><div class="grid">' +
        more.map(card).join('') +
        '</div>'
      : '') +
    '</div>'
  );
}
function dashInstructor(u) {
  var mine = db.courses.filter(function (c) {
    return c.by === u.id;
  });
  var ids = mine.map(function (c) {
    return c.id;
  });
  var studs = db.enrollments.filter(function (e) {
    return ids.indexOf(e.cid) > -1;
  });
  var earn = db.payments
    .filter(function (p) {
      return ids.indexOf(p.cid) > -1;
    })
    .reduce(function (s, p) {
      return s + p.amount;
    }, 0);
  var tabs =
    '<div class="tabs">' +
    [
      ['courses', 'My courses'],
      ['students', 'Students'],
    ]
      .map(function (t) {
        return (
          '<button class="' +
          (ui.instTab === t[0] ? 'on' : '') +
          '" data-act="itab" data-v="' +
          t[0] +
          '">' +
          t[1] +
          '</button>'
        );
      })
      .join('') +
    '</div>';
  var body = '';
  if (ui.instTab === 'courses') {
    body =
      '<div class="row between" style="margin-bottom:14px"><h3>My courses</h3><button class="btn" data-act="newcourse">' +
      (ui.newCourse ? 'Close form' : 'Create new course') +
      '</button></div>';
    if (ui.newCourse)
      body +=
        '<div class="card pad" style="margin-bottom:18px"><form data-form="newcourse" class="two-form"><label class="full">Course title<input id="nt" required></label><label>Category<select id="nc">' +
        CATS.map(function (k) {
          return '<option>' + k + '</option>';
        }).join('') +
        '</select></label><label>Level<select id="nl"><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></label><label>Type<select id="nf"><option value="free">Free</option><option value="paid">Paid</option></select></label><label>Price in INR (paid only)<input id="np" type="number" min="0" value="999"></label><label class="full">Description<textarea id="nd" required></textarea></label><div class="full"><button class="btn" type="submit">Submit for approval</button></div></form></div>';
    body +=
      '<div class="stack">' +
      mine
        .map(function (c) {
          var n = db.enrollments.filter(function (e) {
            return e.cid === c.id;
          }).length;
          var s =
            '<div class="card"><div class="mine"><div class="info"><div class="row"><h3>' +
            esc(c.title) +
            '</h3><span class="pill ' +
            (c.status === 'published' ? 'ok' : 'wait') +
            '">' +
            c.status.toUpperCase() +
            '</span><span class="pill ' +
            (c.free ? 'free' : 'paid') +
            '">' +
            (c.free ? 'FREE' : inr(c.price)) +
            '</span></div><p class="sm muted">' +
            c.lessons.length +
            ' lessons · ' +
            n +
            ' students</p></div><button class="btn ghost sm" data-act="manage" data-v="' +
            c.id +
            '">' +
            (ui.manage === c.id ? 'Close' : 'Manage lessons') +
            '</button></div>';
          if (ui.manage === c.id) {
            s +=
              '<div style="border-top:1px solid var(--line)">' +
              c.lessons
                .map(function (l, i) {
                  return (
                    '<div class="lli"><span class="mono sm muted">' +
                    (i + 1) +
                    '</span><div style="flex:1">' +
                    esc(l.title) +
                    '<div class="sm muted">' +
                    l.mins +
                    ' min' +
                    (l.file ? ' · ' + esc(l.file) : '') +
                    '</div></div><span class="type">' +
                    l.type.toUpperCase() +
                    '</span><button class="btn danger sm" data-act="rmlesson" data-v="' +
                    c.id +
                    '" data-v2="' +
                    l.id +
                    '">Remove</button></div>'
                  );
                })
                .join('') +
              '<div class="pad"><form data-form="addlesson" data-cid="' +
              c.id +
              '" class="two-form"><label class="full">Lesson title<input id="lt" required></label><label>Type<select id="ly"><option value="video">Video</option><option value="pdf">PDF</option></select></label><label>Duration (minutes)<input id="lm" type="number" min="1" value="10"></label><label class="full">Attach file (optional)<input id="lf" type="file"></label><div class="full"><button class="btn" type="submit">Add lesson</button></div></form></div></div>';
          }
          return s + '</div>';
        })
        .join('') +
      '</div>';
  } else {
    body =
      '<h3 style="margin-bottom:12px">Student progress</h3><div class="card tbl"><table><tr><th>Student</th><th>Course</th><th>Progress</th><th>Joined</th></tr>' +
      (studs.length
        ? studs
            .map(function (e) {
              var s = user(e.uid),
                c = course(e.cid);
              return (
                '<tr><td>' +
                esc(s ? s.name : '') +
                '</td><td>' +
                esc(c.title) +
                '</td><td style="min-width:150px"><div class="bar"><span style="width:' +
                pct(e, c) +
                '%"></span></div><span class="sm muted">' +
                e.done.length +
                '/' +
                c.lessons.length +
                ' lessons</span></td><td>' +
                e.date +
                '</td></tr>'
              );
            })
            .join('')
        : '<tr><td colspan="4" class="muted">No students yet.</td></tr>') +
      '</table></div>';
  }
  return (
    '<div class="wrap dash"><p class="eyebrow">Instructor dashboard</p><h1 style="font-size:2rem;margin-top:6px">Welcome, ' +
    esc(u.name.split(' ')[0]) +
    '</h1>' +
    tiles([
      [mine.length, 'Courses'],
      [studs.length, 'Total enrollments'],
      [inr(earn), 'Earnings'],
    ]) +
    tabs +
    body +
    '</div>'
  );
}
function dashAdmin(u) {
  var rev = db.payments.reduce(function (s, p) {
    return s + p.amount;
  }, 0);
  var pend = db.courses.filter(function (c) {
    return c.status === 'pending';
  });
  var T = [
    ['overview', 'Overview'],
    ['users', 'Users'],
    ['courses', 'Courses'],
    ['payments', 'Payments'],
    ['inbox', 'Inbox & testimonials'],
  ];
  var tabs =
    '<div class="tabs">' +
    T.map(function (t) {
      return (
        '<button class="' +
        (ui.adminTab === t[0] ? 'on' : '') +
        '" data-act="atab" data-v="' +
        t[0] +
        '">' +
        t[1] +
        (t[0] === 'overview' && pend.length ? ' (' + pend.length + ')' : '') +
        '</button>'
      );
    }).join('') +
    '</div>';
  var body = '';
  if (ui.adminTab === 'overview') {
    body =
      '<h3 style="margin-bottom:12px">Waiting for approval</h3>' +
      (pend.length
        ? '<div class="stack">' +
          pend
            .map(function (c) {
              var i = user(c.by);
              return (
                '<div class="card mine"><div class="info"><h3>' +
                esc(c.title) +
                '</h3><p class="sm muted">By ' +
                esc(i ? i.name : '') +
                ' · ' +
                c.lessons.length +
                ' lessons · ' +
                (c.free ? 'Free' : inr(c.price)) +
                '</p></div><button class="btn" data-act="approve" data-v="' +
                c.id +
                '">Approve</button><button class="btn danger" data-act="rmcourse" data-v="' +
                c.id +
                '">Reject</button></div>'
              );
            })
            .join('') +
          '</div>'
        : '<div class="card pad"><p class="muted">No courses are waiting for approval.</p></div>') +
      '<h3 style="margin:26px 0 12px">Recent enrollments</h3><div class="card tbl"><table><tr><th>Student</th><th>Course</th><th>Progress</th><th>Date</th></tr>' +
      db.enrollments
        .slice(-6)
        .reverse()
        .map(function (e) {
          var s = user(e.uid),
            c = course(e.cid);
          return c
            ? '<tr><td>' +
                esc(s ? s.name : '') +
                '</td><td>' +
                esc(c.title) +
                '</td><td>' +
                pct(e, c) +
                '%</td><td>' +
                e.date +
                '</td></tr>'
            : '';
        })
        .join('') +
      '</table></div>';
  } else if (ui.adminTab === 'users') {
    body =
      '<div class="card tbl"><table><tr><th>Name</th><th>Email</th><th>Role</th><th></th></tr>' +
      db.users
        .map(function (x) {
          return (
            '<tr><td>' +
            esc(x.name) +
            '</td><td class="mono sm">' +
            esc(x.email) +
            '</td><td>' +
            (x.id === u.id
              ? '<span class="pill">ADMIN</span>'
              : '<select data-chg="role" data-v="' +
                x.id +
                '" aria-label="Role for ' +
                esc(x.name) +
                '">' +
                ['student', 'instructor', 'admin']
                  .map(function (r) {
                    return '<option ' + (x.role === r ? 'selected' : '') + '>' + r + '</option>';
                  })
                  .join('') +
                '</select>') +
            '</td><td>' +
            (x.id === u.id
              ? ''
              : '<button class="btn danger sm" data-act="rmuser" data-v="' +
                x.id +
                '">Remove</button>') +
            '</td></tr>'
          );
        })
        .join('') +
      '</table></div>';
  } else if (ui.adminTab === 'courses') {
    body =
      '<div class="card tbl"><table><tr><th>Course</th><th>Instructor</th><th>Price</th><th>Students</th><th>Status</th><th></th></tr>' +
      db.courses
        .map(function (c) {
          var i = user(c.by);
          return (
            '<tr><td>' +
            esc(c.title) +
            '</td><td>' +
            esc(i ? i.name : '') +
            '</td><td>' +
            (c.free ? 'Free' : inr(c.price)) +
            '</td><td>' +
            db.enrollments.filter(function (e) {
              return e.cid === c.id;
            }).length +
            '</td><td><span class="pill ' +
            (c.status === 'published' ? 'ok' : c.status === 'pending' ? 'wait' : 'off') +
            '">' +
            c.status.toUpperCase() +
            '</span></td><td class="row"><button class="btn ghost sm" data-act="togglecourse" data-v="' +
            c.id +
            '">' +
            (c.status === 'published' ? 'Unpublish' : 'Publish') +
            '</button><button class="btn danger sm" data-act="rmcourse" data-v="' +
            c.id +
            '">Delete</button></td></tr>'
          );
        })
        .join('') +
      '</table></div>';
  } else if (ui.adminTab === 'payments') {
    body =
      '<div class="card tbl"><table><tr><th>ID</th><th>Student</th><th>Course</th><th>Method</th><th>Date</th><th>Amount</th></tr>' +
      (db.payments.length
        ? db.payments
            .map(function (p) {
              var s = user(p.uid),
                c = course(p.cid);
              return (
                '<tr><td class="mono sm">' +
                p.id +
                '</td><td>' +
                esc(s ? s.name : '') +
                '</td><td>' +
                esc(c ? c.title : '') +
                '</td><td>' +
                p.method +
                '</td><td>' +
                p.date +
                '</td><td>' +
                inr(p.amount) +
                '</td></tr>'
              );
            })
            .join('')
        : '<tr><td colspan="6" class="muted">No payments yet.</td></tr>') +
      '</table></div>';
  } else {
    body =
      '<h3 style="margin-bottom:12px">Contact messages</h3><div class="stack">' +
      (db.messages.length
        ? db.messages
            .map(function (m) {
              return (
                '<div class="card pad"><div class="row between"><b>' +
                esc(m.name) +
                '</b><span class="sm muted">' +
                m.date +
                '</span></div><div class="mono sm muted">' +
                esc(m.email) +
                '</div><p style="margin-top:8px">' +
                esc(m.text) +
                '</p></div>'
              );
            })
            .join('')
        : '<div class="card pad"><p class="muted">No messages yet.</p></div>') +
      '</div><h3 style="margin:26px 0 12px">Testimonials on the home page</h3><div class="stack">' +
      db.testimonials
        .map(function (t) {
          return (
            '<div class="card mine"><div class="info"><b>' +
            esc(t.name) +
            ' <span class="muted sm">· ' +
            esc(t.role) +
            '</span></b><p class="sm">' +
            esc(t.text) +
            '</p></div><button class="btn ghost sm" data-act="toggletest" data-v="' +
            t.id +
            '">' +
            (t.show ? 'Hide' : 'Show') +
            '</button></div>'
          );
        })
        .join('') +
      '</div>';
  }
  return (
    '<div class="wrap dash"><p class="eyebrow">Admin dashboard</p><h1 style="font-size:2rem;margin-top:6px">Platform overview</h1>' +
    tiles([
      [db.users.length, 'Users'],
      [published().length, 'Published courses'],
      [db.enrollments.length, 'Enrollments'],
      [inr(rev), 'Revenue'],
    ]) +
    tabs +
    body +
    '</div>'
  );
}

act.itab = function (v) {
    ui.instTab = v;
    render(true);
};
act.atab = function (v) {
    ui.adminTab = v;
    render(true);
};
act.newcourse = function () {
    ui.newCourse = !ui.newCourse;
    render(true);
};
act.manage = function (v) {
    ui.manage = ui.manage === v ? null : v;
    render(true);
};
act.rmlesson = function (v, v2) {
    var c = course(v);
    c.lessons = c.lessons.filter(function (l) {
      return l.id !== v2;
    });
    save();
    render(true);
    toast('Lesson removed');
};
act.approve = function (v) {
    course(v).status = 'published';
    save();
    render(true);
    toast('Course approved and published');
};
act.togglecourse = function (v) {
    var c = course(v);
    c.status = c.status === 'published' ? 'pending' : 'published';
    save();
    render(true);
};
act.rmcourse = function (v) {
    db.courses = db.courses.filter(function (c) {
      return c.id !== v;
    });
    db.enrollments = db.enrollments.filter(function (e) {
      return e.cid !== v;
    });
    save();
    render(true);
    toast('Course removed');
};
act.rmuser = function (v) {
    db.users = db.users.filter(function (x) {
      return x.id !== v;
    });
    db.enrollments = db.enrollments.filter(function (e) {
      return e.uid !== v;
    });
    save();
    render(true);
    toast('User removed');
};
act.toggletest = function (v) {
    var t = db.testimonials.find(function (x) {
      return x.id === v;
    });
    t.show = !t.show;
    save();
    render(true);
};
