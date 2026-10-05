(function () {
  'use strict';

  var client = window.hunterNetSupabase;
  var form = document.getElementById('chat-form');
  var messageInput = document.getElementById('chat-message');
  var messageList = document.getElementById('chat-messages');
  var status = document.getElementById('chat-status');
  var authNote = document.getElementById('chat-auth-note');
  var sendButton = document.getElementById('chat-send-button');
  var currentUser = null;
  var channel = null;
  var channelConnected = false;

  if (!client || !form) return;

  function setStatus(text, isError) {
    status.textContent = text;
    status.classList.toggle('is-error', Boolean(isError));
  }

  function renderMessages(messages, profiles) {
    messageList.replaceChildren();
    messages.forEach(function (message) {
      var item = document.createElement('li');
      var heading = document.createElement('div');
      heading.className = 'chat-message-heading';
      heading.textContent = (profiles[message.user_id] || 'Hunter') + ' - ' + new Date(message.created_at).toLocaleString();

      var text = document.createElement('p');
      text.textContent = message.content;
      item.append(heading, text);
      messageList.appendChild(item);
    });
    messageList.scrollTop = messageList.scrollHeight;
  }

  async function loadMessages() {
    if (!currentUser) return;
    var result = await client.from('chat_messages')
      .select('id,user_id,content,created_at')
      .order('created_at', { ascending: false })
      .limit(100);

    if (result.error) {
      setStatus('Unable to load chat. Check the Supabase chat policies.', true);
      return;
    }

    var messages = (result.data || []).reverse();
    var userIds = [...new Set(messages.map(function (message) { return message.user_id; }).filter(Boolean))];
    var profiles = {};
    if (userIds.length) {
      var profileResult = await client.from('profiles').select('id,display_name').in('id', userIds);
      if (!profileResult.error) {
        profileResult.data.forEach(function (profile) { profiles[profile.id] = profile.display_name; });
      }
    }

    renderMessages(messages, profiles);
    setStatus(channelConnected ? 'Live channel connected.' : 'Connecting to live updates...');
  }

  function updateSession(session) {
    currentUser = session && session.user;
    form.hidden = !currentUser;
    authNote.hidden = Boolean(currentUser);

    if (currentUser) {
      loadMessages();
      if (!channel) {
        channel = client.channel('field-chat-live')
          .on('postgres_changes', { event: '*', schema: 'public', table: 'chat_messages' }, loadMessages)
          .subscribe(function (state) {
            channelConnected = state === 'SUBSCRIBED';
            if (channelConnected) loadMessages();
            else if (state === 'CHANNEL_ERROR' || state === 'TIMED_OUT') {
              setStatus('Live updates unavailable. Check Supabase Realtime settings.', true);
            }
          });
      }
      return;
    }

    messageList.replaceChildren();
    setStatus('Sign in required to access Field Chat.');
    if (channel) {
      client.removeChannel(channel);
      channel = null;
      channelConnected = false;
    }
  }

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    var content = messageInput.value.trim();
    if (!currentUser || !content || content.length > 2000) return;

    sendButton.disabled = true;
    var result = await client.from('chat_messages').insert({ user_id: currentUser.id, content: content });
    sendButton.disabled = false;

    if (result.error) {
      setStatus('Message not sent. Check your sign-in and chat permissions.', true);
      return;
    }

    messageInput.value = '';
    await loadMessages();
    messageInput.focus();
  });

  client.auth.onAuthStateChange(function (_event, session) { updateSession(session); });
  client.auth.getSession().then(function (result) { updateSession(result.data.session); });
})();