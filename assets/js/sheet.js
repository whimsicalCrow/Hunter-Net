(function () {
  'use strict';

  var form = document.getElementById('character-sheet');
  if (!form) return;

  var storageKey = 'hunter-net-character-sheet';
  var status = document.getElementById('sheet-status');
  var skillColumns = document.querySelectorAll('[data-skills]');
  var ratedLists = document.querySelectorAll('.rated-list');
  var linedLists = document.querySelectorAll('.lined-list');
  var weaponLists = document.querySelectorAll('.weapon-list');

  function makeDots(name, count) {
    var wrapper = document.createElement('div');
    wrapper.className = 'dots';
    wrapper.dataset.name = name;
    for (var index = 1; index <= count; index += 1) {
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'dot';
      button.dataset.value = index;
      button.setAttribute('aria-label', name + ': ' + index + ' dots');
      wrapper.appendChild(button);
    }
    return wrapper;
  }

  function addSkillRows() {
    skillColumns.forEach(function (column) {
      column.dataset.skills.split(',').forEach(function (skill) {
        var row = document.createElement('div');
        row.className = 'skill-row';
        row.innerHTML = '<label>' + skill + '<input type="text" name="skill-' + skill.toLowerCase().replace(/ /g, '-') + '"></label>';
        row.appendChild(makeDots('skill-' + skill.toLowerCase().replace(/ /g, '-'), 5));
        column.appendChild(row);
      });
    });
  }

  function addLineRows(list, rows, prefix, rated) {
    for (var index = 1; index <= rows; index += 1) {
      var row = document.createElement('div');
      row.className = 'line-row';
      row.innerHTML = '<input type="text" name="' + prefix + '-' + index + '" aria-label="' + prefix + ' ' + index + '">';
      if (rated) row.appendChild(makeDots(prefix + '-' + index, 5));
      list.appendChild(row);
    }
  }

  addSkillRows();
  ratedLists.forEach(function (list) { addLineRows(list, Number(list.dataset.rows), list.dataset.prefix, true); });
  linedLists.forEach(function (list) { addLineRows(list, Number(list.dataset.rows), list.dataset.prefix, false); });
  weaponLists.forEach(function (list) { addLineRows(list, Number(list.dataset.rows), 'weapon', false); });

  document.querySelectorAll('.dots').forEach(function (wrapper) {
    if (wrapper.querySelector('button')) return;
    for (var index = 1; index <= 5; index += 1) {
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'dot';
      button.dataset.value = index;
      button.setAttribute('aria-label', wrapper.dataset.name + ': ' + index + ' dots');
      wrapper.appendChild(button);
    }
  });

  document.querySelectorAll('.boxes').forEach(function (wrapper) {
    var count = Number(wrapper.dataset.count);
    for (var index = 1; index <= count; index += 1) {
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'box';
      button.dataset.value = index;
      button.setAttribute('aria-label', wrapper.dataset.name + ': ' + index + ' boxes');
      wrapper.appendChild(button);
    }
  });

  function setTracker(wrapper, value) {
    var selected = Number(value) || 0;
    wrapper.querySelectorAll('button').forEach(function (button) {
      button.classList.toggle('is-filled', Number(button.dataset.value) <= selected);
    });
    wrapper.dataset.value = selected;
  }

  document.addEventListener('click', function (event) {
    var button = event.target.closest('.dot, .box');
    if (!button) return;
    setTracker(button.parentElement, button.dataset.value);
    save();
  });

  function collect() {
    var values = {};
    form.querySelectorAll('input, select, textarea').forEach(function (field) {
      if (field.type === 'checkbox') values[field.name] = field.checked;
      else values[field.name] = field.value;
    });
    document.querySelectorAll('.dots, .boxes').forEach(function (tracker) {
      if (tracker.dataset.name) values['tracker-' + tracker.dataset.name] = tracker.dataset.value || 0;
    });
    return values;
  }

  function save() {
    localStorage.setItem(storageKey, JSON.stringify(collect()));
    status.textContent = 'Saved just now in this browser.';
  }

  function restore() {
    var saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
    Object.keys(saved).forEach(function (name) {
      if (name.indexOf('tracker-') === 0) {
        var tracker = document.querySelector('[data-name="' + name.slice(8) + '"]');
        if (tracker) setTracker(tracker, saved[name]);
        return;
      }
      var field = form.elements[name];
      if (!field) return;
      if (field.type === 'checkbox') field.checked = saved[name];
      else field.value = saved[name];
    });
  }

  form.addEventListener('input', save);
  form.addEventListener('change', save);
  document.getElementById('reset-sheet').addEventListener('click', function () {
    if (!window.confirm('Clear this character sheet?')) return;
    form.reset();
    document.querySelectorAll('.dots, .boxes').forEach(function (tracker) { setTracker(tracker, 0); });
    localStorage.removeItem(storageKey);
    status.textContent = 'Blank sheet ready.';
  });
  document.getElementById('export-sheet').addEventListener('click', function () {
    save();
    window.print();
  });

  restore();
})();
