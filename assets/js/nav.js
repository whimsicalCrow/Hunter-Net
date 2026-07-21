(function () {
  'use strict';

  window.redirectToSignup = function redirectToSignup(path) {
    window.open(path || '../signup.html', '_blank');
  };
})();
