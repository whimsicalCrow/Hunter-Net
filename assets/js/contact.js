(function () {
  'use strict';

  var services = [
    { frame: 'map-frame', fallback: 'map-fallback', url: 'https://map.proxi.co/r/v1p_IUjiq0EdxdWZLRXn' },
    { frame: 'chat-frame', fallback: 'chat-fallback', url: 'https://www5.cbox.ws/box/' }
  ];

  services.forEach(function (service) {
    fetch(service.url, { method: 'HEAD', mode: 'no-cors' }).catch(function () {
      var frame = document.getElementById(service.frame);
      var fallback = document.getElementById(service.fallback);

      if (frame) frame.hidden = true;
      if (fallback) fallback.hidden = false;
    });
  });
})();