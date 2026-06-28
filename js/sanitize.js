// HTML sanitization utility to prevent XSS
window.Sanitize = (function() {
  'use strict';

  var entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '`': '&#96;'
  };

  function escape(str) {
    if (str == null) return '';
    return String(str).replace(/[&<>"'`]/g, function(c) {
      return entityMap[c];
    });
  }

  function escapeAttr(str) {
    if (str == null) return '';
    return String(str).replace(/[&<>"'`]/g, function(c) {
      return entityMap[c];
    });
  }

  // Create DOM elements from a template string with data substitution
  function div(str) {
    var d = document.createElement('div');
    d.innerHTML = str;
    return d;
  }

  return {
    esc: escape,
    escapeAttr: escapeAttr,
    html: div
  };
})();
