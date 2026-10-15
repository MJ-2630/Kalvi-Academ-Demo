'use strict';
function pageRegister() {
  return '<div class="card authbox"><h2>Create your account</h2><p class="muted">Register first, then log in to start learning.</p><form data-form="register"><label>Full name<input id="rn" required></label><label>Email<input id="re" type="email" required autocomplete="username"></label><label>Password<input id="rp" type="password" minlength="6" required autocomplete="new-password"></label><label>I want to join as<select id="rr"><option value="student">Student</option><option value="instructor">Instructor</option></select></label><div class="err" id="err"></div><button class="btn" type="submit">Register</button></form><p class="sm muted" style="margin-top:14px">Already registered? <a href="login.html">Log in</a></p></div>';
}
