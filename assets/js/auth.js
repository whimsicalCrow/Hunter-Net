(function () {
  'use strict';

  var form = document.getElementById('access-form');
  var usernameField = document.getElementById('username');
  var passwordField = document.getElementById('password');
  var message = document.getElementById('access-message');

  if (!form || !usernameField || !passwordField || !message) return;

  var client = window.hunterNetSupabase;
  if (!client) {
    message.textContent = 'Sign-in service unavailable. Reload the page and try again.';
    return;
  }

  client.auth.getSession().then(function (result) {
    if (result.data.session) window.location.href = './main.html';
  });

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    if (!form.reportValidity()) return;

    var account = window.hunterNetUsernameAuth(usernameField.value);
    if (!account) return;

    var button = form.querySelector('[type="submit"]');
    button.disabled = true;
    message.textContent = 'Verifying credentials...';

    var result = await client.auth.signInWithPassword({
      email: account.email,
      password: passwordField.value
    });

    if (result.error) {
      message.textContent = 'Sign-in failed. Check your email and password.';
      button.disabled = false;
      return;
    }

    window.location.href = './main.html';
  });
})();