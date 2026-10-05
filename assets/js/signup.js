(function () {
  'use strict';

  var form = document.getElementById('signup-form');
  var message = document.getElementById('signup-message');

  if (!form || !message) return;

  var client = window.hunterNetSupabase;
  if (!client) {
    message.textContent = 'Sign-up service unavailable. Reload the page and try again.';
    return;
  }

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    if (!form.reportValidity()) return;

    var account = window.hunterNetUsernameAuth(form.elements.username.value);
    if (!account) return;

    var button = form.querySelector('[type="submit"]');
    button.disabled = true;
    message.textContent = 'Creating your account...';

    var result = await client.auth.signUp({
      email: account.email,
      password: form.elements.password.value,
      options: {
        data: {
          username: account.username,
          display_name: account.username
        }
      }
    });

    if (result.error) {
      if (result.error.message.toLowerCase().includes('email signups are disabled')) {
        message.textContent = 'Supabase has new-user sign-ups disabled. Enable sign-ups and the Email provider in Supabase Auth, then keep email confirmation off. You still only need a username and password here.';
      } else {
        message.textContent = result.error.message;
      }
      button.disabled = false;
      return;
    }

    if (result.data.session) {
      window.location.href = 'pages/main.html';
      return;
    }

    message.textContent = 'Account created, but no session was returned. Disable email confirmation in Supabase Auth; username aliases cannot receive confirmation emails.';
    button.disabled = false;
  });
})();