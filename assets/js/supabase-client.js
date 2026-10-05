(function () {
  'use strict';

  var projectUrl = 'https://idgvknfqxawysiqmsvwt.supabase.co';
  var publishableKey = 'sb_publishable_MbAyij0893teuD2woStOgQ_zdQ2o6DX';

  if (!window.supabase || typeof window.supabase.createClient !== 'function') {
    console.error('Supabase client library did not load.');
    return;
  }

  window.hunterNetSupabase = window.supabase.createClient(projectUrl, publishableKey);

  window.hunterNetUsernameAuth = function (value) {
    var username = String(value || '').trim().toLowerCase();
    if (!/^[a-z0-9_]{3,24}$/.test(username)) return null;
    return {
      username: username,
      email: username + '@example.com'
    };
  };
})();
