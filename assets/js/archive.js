(function () {
  'use strict';

  var client = window.hunterNetSupabase;
  var panel = document.getElementById('archive-panel');
  var form = document.getElementById('archive-entry-form');
  var addButton = document.getElementById('archive-add-button');
  var cancelButton = document.getElementById('archive-entry-cancel');
  var status = document.getElementById('archive-status');
  var typeInput = document.getElementById('archive-entry-type');
  var recordTypeInput = document.getElementById('archive-entry-record-type');
  var recordTypeLabel = recordTypeInput.closest('label');
  var parentInput = document.getElementById('archive-entry-parent');
  var rows = [];
  var currentUser = null;
  var busy = false;

  function setStatus(text, isError) {
    status.textContent = text;
    status.classList.toggle('is-error', Boolean(isError));
  }

  function createCell(className, text) {
    var cell = document.createElement('span');
    cell.className = className;
    cell.textContent = text;
    return cell;
  }

  function addAction(summary, node, action, label, symbol) {
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'archive-inline-action archive-' + action + '-action';
    button.dataset.nodeId = node.id;
    button.setAttribute('aria-label', label);
    button.textContent = symbol;
    button.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      if (action === 'edit') openEditor(node);
      else deleteNode(node);
    });
    summary.appendChild(button);
  }

  function renderNode(node) {
    if (node.entry_kind === 'folder') {
      var folder = document.createElement('details');
      folder.className = 'archive-dir archive-db-folder';
      folder.dataset.nodeId = node.id;

      var folderSummary = document.createElement('summary');
      folderSummary.appendChild(createCell('archive-name', node.name + '/'));
      folderSummary.appendChild(createCell('archive-modified', '-'));
      var countCell = createCell('archive-size archive-entry-actions-inline', String(node.children.length));
      if (!node.is_system && currentUser) {
        addAction(countCell, node, 'edit', 'Edit folder', '✎');
        addAction(countCell, node, 'delete', 'Delete folder and its contents', '🗑');
      }
      folderSummary.appendChild(countCell);

      var subtree = document.createElement('div');
      subtree.className = 'archive-subtree';
      node.children.forEach(function (child) {
        subtree.appendChild(renderNode(child));
      });
      folder.append(folderSummary, subtree);
      return folder;
    }

    var record = document.createElement('details');
    record.className = 'archive-file archive-record';
    record.dataset.nodeId = node.id;

    var summary = document.createElement('summary');
    summary.className = 'archive-record-summary';
    summary.appendChild(createCell('archive-name', node.name));
    summary.appendChild(createCell('archive-modified', node.record_type || 'Misc'));
    var count = createCell('archive-entry-actions-inline', '');
    if (!node.is_system && currentUser) {
      addAction(count, node, 'edit', 'Edit entry', '✎');
      addAction(count, node, 'delete', 'Delete entry', '🗑');
    } else {
      count.textContent = '-';
    }
    summary.appendChild(count);

    var content = document.createElement('div');
    content.className = 'archive-record-content';
    if (node.category) content.appendChild(createCell('archive-record-meta', node.category));
    if (node.description) content.appendChild(createCell('archive-description', node.description));
    if (node.key_notes) {
      var notes = document.createElement('p');
      notes.className = 'archive-record-meta';
      var notesLabel = document.createElement('strong');
      notesLabel.textContent = 'Key Notes: ';
      notes.append(notesLabel, document.createTextNode(node.key_notes));
      content.appendChild(notes);
    }
    record.append(summary, content);
    return record;
  }

  function buildTree(data) {
    var nodes = new Map();
    data.forEach(function (row) {
      nodes.set(row.id, Object.assign({}, row, { children: [] }));
    });

    var roots = [];
    nodes.forEach(function (node) {
      var parent = node.parent_id && nodes.get(node.parent_id);
      if (parent) parent.children.push(node);
      else roots.push(node);
    });

    nodes.forEach(function (node) {
      node.children.sort(function (a, b) { return a.name.localeCompare(b.name); });
    });

    var systemRoots = roots.filter(function (node) { return node.is_system; });
    var misc = {
      id: 'virtual-misc-folder',
      entry_kind: 'folder',
      name: 'Misc',
      is_system: true,
      children: roots.filter(function (node) { return !node.is_system; })
    };
    systemRoots.sort(function (a, b) { return a.name.localeCompare(b.name); });
    systemRoots.push(misc);
    return { roots: systemRoots, nodes: nodes };
  }

  function refreshParentOptions(tree) {
    var current = parentInput.value;
    parentInput.replaceChildren(new Option('Misc', ''));

    function appendFolders(nodes, depth) {
      nodes.forEach(function (node) {
        if (node.entry_kind !== 'folder' || node.id === 'virtual-misc-folder') return;
        var option = new Option('\u00a0\u00a0'.repeat(depth) + node.name, node.id);
        parentInput.add(option);
        appendFolders(node.children, depth + 1);
      });
    }

    appendFolders(tree.roots, 0);
    if ([...parentInput.options].some(function (option) { return option.value === current; })) {
      parentInput.value = current;
    }
  }

  function renderArchive() {
    var openIds = new Set([...panel.querySelectorAll('details[data-node-id][open]')].map(function (item) {
      return item.dataset.nodeId;
    }));
    var tree = buildTree(rows);
    var content = document.createDocumentFragment();

    tree.roots.forEach(function (node) {
      content.appendChild(renderNode(node));
    });

    panel.replaceChildren(
      Object.assign(document.createElement('div'), {
        className: 'archive-header',
        innerHTML: '<span>Name</span><span>Record Type</span><span>Entries</span>'
      }),
      content
    );

    panel.querySelectorAll('details[data-node-id]').forEach(function (item) {
      item.open = openIds.has(item.dataset.nodeId);
    });
    refreshParentOptions(tree);
  }

  async function loadArchive() {
    var result = await client.from('archive_entries').select('*').order('created_at', { ascending: true });
    if (result.error) {
      console.error('Archive load failed:', result.error);
      setStatus('Archive database unavailable. Apply the Hunter-Net Supabase schema to enable shared records.', true);
      return;
    }
    rows = result.data || [];
    renderArchive();
    if (!rows.length) {
      setStatus('No archive folders found. Run the Supabase seed SQL to populate the archive.', true);
    } else if (!currentUser) {
      setStatus('Read-only archive. Sign in to add, edit, or delete records.');
    } else {
      setStatus('Archive synchronized.');
    }
  }

  function updateRecordTypeVisibility() {
    var isEntry = typeInput.value === 'entry';
    recordTypeLabel.hidden = !isEntry;
    recordTypeInput.required = isEntry;
  }

  function setFormOpen(open) {
    form.hidden = !open;
    addButton.setAttribute('aria-expanded', String(open));
    if (open) {
      updateRecordTypeVisibility();
      document.getElementById('archive-entry-name').focus();
    } else {
      form.reset();
      typeInput.disabled = false;
      typeInput.value = 'entry';
      recordTypeInput.value = 'Misc';
      delete form.dataset.editNodeId;
      updateRecordTypeVisibility();
    }
  }

  function openEditor(node) {
    form.dataset.editNodeId = node.id;
    document.getElementById('archive-entry-name').value = node.name;
    document.getElementById('archive-entry-category').value = node.category || '';
    document.getElementById('archive-entry-description').value = node.description || '';
    document.getElementById('archive-entry-key-notes').value = node.key_notes || '';
    typeInput.value = node.entry_kind;
    typeInput.disabled = true;
    recordTypeInput.value = node.record_type || 'Misc';
    setFormOpen(true);
    parentInput.value = node.parent_id || '';
  }

  function hasCycle(nodeId, parentId, tree) {
    var current = tree.nodes.get(parentId);
    while (current) {
      if (current.id === nodeId) return true;
      current = current.parent_id ? tree.nodes.get(current.parent_id) : null;
    }
    return false;
  }

  async function deleteNode(node) {
    if (!window.confirm('Delete "' + node.name + '"' + (node.entry_kind === 'folder' ? ' and all its contents' : '') + '?')) return;
    var result = await client.from('archive_entries').delete().eq('id', node.id);
    if (result.error) {
      setStatus('Delete failed. Sign in and check the archive permissions.', true);
      return;
    }
    await loadArchive();
  }

  addButton.addEventListener('click', function () {
    if (!currentUser) return;
    if (!form.hidden) {
      setFormOpen(false);
      return;
    }
    form.reset();
    typeInput.disabled = false;
    typeInput.value = 'entry';
    recordTypeInput.value = 'Misc';
    form.dataset.parentId = '';
    setFormOpen(true);
  });

  cancelButton.addEventListener('click', function () { setFormOpen(false); });
  typeInput.addEventListener('change', updateRecordTypeVisibility);

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    if (!currentUser || busy || !form.reportValidity()) return;
    busy = true;

    var nodeId = form.dataset.editNodeId;
    var nodeType = typeInput.value;
    var parentId = parentInput.value || null;
    var tree = buildTree(rows);
    if (nodeId && nodeType === 'folder' && parentId && hasCycle(nodeId, parentId, tree)) {
      setStatus('A folder cannot be moved inside itself.', true);
      busy = false;
      return;
    }

    var values = {
      parent_id: parentId,
      entry_kind: nodeType,
      name: document.getElementById('archive-entry-name').value.trim(),
      category: document.getElementById('archive-entry-category').value.trim() || null,
      description: document.getElementById('archive-entry-description').value.trim(),
      key_notes: document.getElementById('archive-entry-key-notes').value.trim(),
      record_type: nodeType === 'entry' ? recordTypeInput.value : null
    };
    var result;

    if (nodeId) {
      delete values.entry_kind;
      delete values.record_type;
      result = await client.from('archive_entries').update(values).eq('id', nodeId);
    } else {
      values.created_by = currentUser.id;
      values.is_system = false;
      result = await client.from('archive_entries').insert(values);
    }

    busy = false;
    if (result.error) {
      console.error('Archive save failed:', result.error);
      setStatus('Save failed. Check sign-in and the Supabase archive policies.', true);
      return;
    }

    setFormOpen(false);
    await loadArchive();
  });

  typeInput.disabled = false;
  form.hidden = true;
  addButton.disabled = true;
  setStatus('Connecting to the shared archive...');

  client.auth.getSession().then(function (result) {
    currentUser = result.data.session && result.data.session.user;
    addButton.disabled = !currentUser;
    if (!currentUser) setStatus('Read-only archive. Sign in to add, edit, or delete records.');
  });

  client.auth.onAuthStateChange(function (_event, session) {
    currentUser = session && session.user;
    addButton.disabled = !currentUser;
    renderArchive();
    if (!currentUser && !form.hidden) setFormOpen(false);
  });

  loadArchive();
  client.channel('archive-live-updates')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'archive_entries' }, loadArchive)
    .subscribe(function (channelStatus) {
      if (channelStatus === 'SUBSCRIBED' && rows.length) {
        setStatus(currentUser ? 'Archive synchronized. Live updates connected.' : 'Read-only archive. Live updates connected.');
      } else if (channelStatus === 'CHANNEL_ERROR' || channelStatus === 'TIMED_OUT') {
        setStatus('Live archive updates unavailable. Check Supabase Realtime settings.', true);
      }
    });
})();
