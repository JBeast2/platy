(function () {
  'use strict';

  var monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var dayNames = ['Mo','Tu','We','Th','Fr','Sa','Su'];

  window.renderCalendar = function (containerId, baseYear, baseMonth) {
    var now = new Date();
    var year = baseYear || now.getFullYear();
    var month = baseMonth !== undefined ? baseMonth : now.getMonth();

    var events = Store.get('events') || [];

    var firstDay = new Date(year, month, 1);
    var lastDay = new Date(year, month + 1, 0);
    var startOffset = (firstDay.getDay() + 6) % 7;
    var daysInMonth = lastDay.getDate();

    var eventDays = {};
    for (var i = 0; i < events.length; i++) {
      var e = events[i];
      if (e.startDate) {
        var d = new Date(e.startDate);
        if (d.getFullYear() === year && d.getMonth() === month) {
          var day = d.getDate();
          if (!eventDays[day]) eventDays[day] = [];
          eventDays[day].push(e);
        }
      }
    }

    var html = '<div class="calendar-widget card p-md">';
    html += '<div class="flex items-center justify-between mb-md">';
    html += '<button class="icon-btn" onclick="window.renderCalendar(\'' + containerId + '\',' + year + ',' + (month - 1) + ')"><span class="material-symbols-outlined">chevron_left</span></button>';
    html += '<h3 class="font-bold text-lg">' + monthNames[month] + ' ' + year + '</h3>';
    html += '<button class="icon-btn" onclick="window.renderCalendar(\'' + containerId + '\',' + year + ',' + (month + 1) + ')"><span class="material-symbols-outlined">chevron_right</span></button>';
    html += '</div>';
    html += '<div class="grid grid-7 gap-0 text-center mb-sm">';
    for (var d = 0; d < 7; d++) {
      html += '<div class="text-xs text-muted font-bold py-1">' + dayNames[d] + '</div>';
    }
    html += '</div>';
    html += '<div class="grid grid-7 gap-0 text-center">';
    for (var p = 0; p < startOffset; p++) {
      html += '<div></div>';
    }
    for (var day = 1; day <= daysInMonth; day++) {
      var today = now.getFullYear() === year && now.getMonth() === month && now.getDate() === day;
      var hasEvents = eventDays[day] && eventDays[day].length > 0;
      var cls = 'py-1 rounded-lg text-sm';
      if (today) cls += ' bg-primary text-white font-bold';
      else if (hasEvents) cls += ' bg-primary-bg text-primary font-bold';
      else cls += ' text-muted';
      html += '<div class="' + cls + '">' + day;
      if (hasEvents) {
        html += '<div class="flex justify-center gap-0.5 mt-0.5">';
        for (var ei = 0; ei < Math.min(eventDays[day].length, 3); ei++) {
          var color = eventDays[day][ei].color === 'success' ? 'var(--success)' : eventDays[day][ei].color === 'warning' ? 'var(--warning)' : 'var(--primary)';
          html += '<div style="width:4px;height:4px;border-radius:50%;background:' + color + ';"></div>';
        }
        html += '</div>';
      }
      html += '</div>';
    }
    html += '</div>';
    if (Object.keys(eventDays).length > 0) {
      html += '<div class="mt-md pt-md" style="border-top:1px solid var(--outline-light);">';
      html += '<p class="text-xs font-bold text-muted mb-sm">Upcoming Events</p>';
      for (var ed in eventDays) {
        for (var ei2 = 0; ei2 < eventDays[ed].length; ei2++) {
          var ev = eventDays[ed][ei2];
          html += '<div class="flex items-center gap-2 text-xs mb-1"><div style="width:6px;height:6px;border-radius:50%;background:var(--' + (ev.color || 'primary') + ');"></div><span>' + ev.title + '</span><span class="text-muted">' + monthNames[month] + ' ' + ed + '</span></div>';
        }
      }
      html += '</div>';
    }
    html += '</div>';
    html += '<style>.grid-7{display:grid;grid-template-columns:repeat(7,1fr);}</style>';

    document.getElementById(containerId).innerHTML = html;
  };
})();
