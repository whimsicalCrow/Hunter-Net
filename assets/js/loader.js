(function () {
  'use strict';

  function loadNow(opacity) {
    var loader = document.getElementById('loader');
    var content = document.getElementById('content');

    if (!loader || !content) {
      return;
    }

    if (opacity <= 0) {
      loader.style.display = 'none';
      content.style.display = 'block';
    } else {
      loader.style.opacity = opacity;
      window.setTimeout(function () {
        loadNow(opacity - 0.05);
      }, 50);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    loadNow(1);
  });
})();
