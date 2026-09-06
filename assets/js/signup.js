(function () {
  'use strict';

  var form = document.getElementById('signup-form');
  var message = document.getElementById('signup-message');

  if (!form || !message) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (!form.reportValidity()) return;

    message.textContent = 'Sign up is currently unavailable. Please use the Contact page to request access.';
  });
})();