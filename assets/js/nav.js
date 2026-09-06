(function () {
  'use strict';

  var sessionKey = 'hunter-net-session-name';

  function getSessionName() {
    try {
      return localStorage.getItem(sessionKey) || '';
    } catch (error) {
      return '';
    }
  }

  function setSessionName(name) {
    try {
      if (name) localStorage.setItem(sessionKey, name);
      else localStorage.removeItem(sessionKey);
    } catch (error) {
      // Local storage may be unavailable in privacy-restricted browsers.
    }
  }

  function renderSession(topnav) {
    var name = getSessionName();
    var status = topnav.querySelector('.session-user');
    var logout = topnav.querySelector('[data-action="logout"]');

    if (!status || !logout) return;

    status.textContent = name ? 'User: ' + name : 'No active session';
    logout.hidden = !name;
  }

  document.querySelectorAll('.topnav').forEach(renderSession);

  document.addEventListener('click', function (event) {
    var logout = event.target.closest('[data-action="logout"]');
    if (logout) {
      setSessionName('');
      renderSession(logout.closest('.topnav'));
    }
  });
})();
