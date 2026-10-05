(function () {
  'use strict';

  var sessionKey = 'hunter-net-session-name';
  var form = document.getElementById('access-form');
  var nameField = document.getElementById('name');

  if (!form || !nameField) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var name = nameField.value.trim();

    if (!name) return;

    localStorage.setItem(sessionKey, name);
    window.location.href = './main.html';
  });
})();