'use strict';
function pageLogin() {
  return '<div class="card authbox"><h2>Welcome back</h2><p class="muted">Log in to continue learning.</p><form data-form="login"><label>Email<input id="le" type="email" required autocomplete="username"></label><label>Password<input id="lp" type="password" required autocomplete="current-password"></label><div class="err" id="err"></div><button class="btn" type="submit">Log in</button></form><p class="sm muted" style="margin-top:14px">New here? <a href="register.html">Create an account</a></p></div>';
}
act.fill = function (v, v2) {
    document.getElementById('le').value = v;
    document.getElementById('lp').value = v2;
};
