(function () {
  'use strict';

  var client = window.hunterNetSupabase;
  var renderVersion = 0;
  var topnavs = Array.from(document.querySelectorAll('.topnav'));

  if (!client) return;

  function renderSession(session) {
    var version = ++renderVersion;
    var user = session && session.user;

    topnavs.forEach(function (topnav) {
      var status = topnav.querySelector('.session-user');
      var logout = topnav.querySelector('[data-action="logout"]');
      if (!status || !logout) return;

      if (!user) {
        status.textContent = 'No active session';
        logout.hidden = true;
        return;
      }

      var fallbackName = user.user_metadata?.display_name || user.email || 'Hunter';
      status.textContent = 'User: ' + fallbackName;
      logout.hidden = false;
    });

    if (!user) return;

    client.from('profiles').select('display_name').eq('id', user.id).maybeSingle().then(function (result) {
      if (version !== renderVersion || result.error || !result.data) return;
      topnavs.forEach(function (topnav) {
        var status = topnav.querySelector('.session-user');
        if (status) status.textContent = 'User: ' + result.data.display_name;
      });
    });
  }

  client.auth.onAuthStateChange(function (_event, session) {
    renderSession(session);
  });

  client.auth.getSession().then(function (result) {
    renderSession(result.data.session);
  });

  document.addEventListener('click', function (event) {
    var logout = event.target.closest('[data-action="logout"]');
    if (!logout) return;

    logout.disabled = true;
    client.auth.signOut().then(function (result) {
      logout.disabled = false;
      if (result.error) logout.closest('.topnav').querySelector('.session-user').textContent = 'Sign-out failed';
    });
  });
})();
