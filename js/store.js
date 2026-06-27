(function () {
  'use strict';

  const STORAGE_KEY = 'platy-data';

  const defaults = {
    user: {
      name: 'John Doe',
      initials: 'JD',
      title: 'GT3 Lead Mechanic',
      email: 'john.doe@platypro.com',
      phone: '+32 4 76 12 34 56',
      location: 'Spa, Belgium',
      languages: 'English, French, Dutch',
      bio: 'Experienced GT3 Lead Mechanic with 8+ years in endurance racing. FIA certified.',
      skills: ['GT3 Mechanic', 'FIA License Level 2', 'Engine Rebuild', 'Data Analysis', 'Team Leadership'],
      rating: 4.8,
      jobsDone: 12,
      activeGigs: 3,
      experience: [
        { role: 'Lead Mechanic', company: 'Scuderia Italia Racing', period: '2022 - Present', desc: 'GT World Challenge, Spa 24H, Le Mans' },
        { role: 'Race Mechanic', company: 'AF Corse', period: '2019 - 2022', desc: 'FIA WEC, Ferrari GT3 program' }
      ]
    },
    jobs: [
      { id: 1, title: 'GT3 Lead Mechanic', event: 'Spa 24 Hours', dates: 'Jun 26-29', location: 'Spa, Belgium', rate: '€350-400/day', category: 'Mechanic', tags: ['Mechanic', 'GT3', 'Endurance', 'FIA License'], openings: 2, duration: '4 days', employer: 'Scuderia Italia Racing', employerInitials: 'KM', status: 'New', urgent: false, featured: false, description: 'Experienced GT3 Lead Mechanic for Spa 24 Hours. 5+ years GT racing, FIA cert.', requirements: ['5+ years GT3', 'FIA License Level 2+', 'Ferrari 296 GT3 exp.', 'Full event availability'], posted: '2026-06-01' },
      { id: 2, title: 'Data Engineer - WEC', event: 'Monaco GP', dates: 'Jul 3-7', location: 'Monte Carlo', rate: '€400-500/day', category: 'Engineering', tags: ['Engineering', 'Data', 'WEC', 'Hybrid'], openings: 1, duration: '5 days', employer: 'AF Corse', employerInitials: 'AM', status: 'Urgent', urgent: true, featured: false, description: 'Data engineer for WEC program at Monaco GP.', requirements: ['3+ years motorsport data', 'WEC experience', 'Hybrid systems knowledge'] },
      { id: 3, title: 'Race Photographer', event: 'Nürburgring 24H', dates: 'Jul 15-18', location: 'Nürburg, Germany', rate: '€250-300/day', category: 'Media', tags: ['Media', 'Photography', 'Video'], openings: 1, duration: '4 days', employer: 'GT Media Group', employerInitials: 'GT', status: 'Open', urgent: false, featured: false },
      { id: 4, title: 'Logistics Coordinator', event: 'Spa 24H + Monaco GP', dates: 'Multi-event', location: 'Multiple locations', rate: '€300-380/day', category: 'Logistics', tags: ['Logistics', 'Coordination', 'Travel', 'Multi-event'], openings: 1, duration: '2 weeks', employer: 'Scuderia Italia Racing', employerInitials: 'SI', status: 'Featured', urgent: false, featured: true }
    ],
    activeGigs: [
      { id: 101, title: 'GT3 Lead Mechanic', employer: 'Scuderia Italia Racing', event: 'Spa 24H', dates: 'Jun 26-29', location: 'Spa, BE', rate: '€350/day', status: 'Active', progress: 65, currentDay: 3, totalDays: 4, tags: ['Mechanic', 'GT3', 'Spa'] },
      { id: 102, title: 'Data Engineer', employer: 'AF Corse', event: 'Monaco GP', dates: 'Jul 3-7', location: 'Monte Carlo', rate: '€400/day', status: 'Upcoming', contractPending: true, tags: ['Engineering', 'Data', 'WEC'] },
      { id: 103, title: 'Race Photographer', employer: 'GT Media Group', event: 'Nürburgring 24H', dates: 'Jul 15-18', location: 'Nürburg, DE', rate: '€1,120', status: 'Completed', paymentPending: true, tags: ['Media', 'Photography'] }
    ],
    events: [
      { id: 201, title: 'Spa 24 Hours', circuit: 'Circuit de Spa-Francorchamps', location: 'Spa, Belgium', startDate: '2026-06-26', endDate: '2026-06-29', type: 'Endurance 24H', series: 'GT World Challenge', budget: 45000, status: 'Actif', recruited: 12, totalNeeded: 15, color: 'primary' },
      { id: 202, title: 'Monaco Grand Prix', circuit: 'Circuit de Monaco', location: 'Monte Carlo', startDate: '2026-07-03', endDate: '2026-07-07', type: 'Sprint', series: 'Formula 1', budget: 32000, status: 'Planification', recruited: 5, totalNeeded: 8, color: 'warning' },
      { id: 203, title: 'Nürburgring 24H', circuit: 'Nürburgring', location: 'Nürburg, Germany', startDate: '2026-07-15', endDate: '2026-07-18', type: 'Endurance 24H', series: '24H Series', budget: 28000, status: 'Brouillon', recruited: 0, totalNeeded: 10, color: 'muted' }
    ],
    expenses: {
      reports: [
        { id: 301, title: 'Spa 24H - Travel', amount: 680, status: 'Pending', date: 'Jun 22', items: ['Flight', 'Hotel'] },
        { id: 302, title: 'Spa 24H - Tools & Parts', amount: 240, status: 'Approved', date: 'Jun 20', items: ['Specialized tools'] },
        { id: 303, title: 'Monaco GP - Travel Advance', amount: 320, status: 'Draft', date: 'Draft', items: ['Train', 'Accommodation'] }
      ],
      totals: { month: 1240, pending: 320, reimbursed: 920, openReports: 3 }
    },
    travel: [
      { id: 801, event: 'Spa 24H', status: 'Confirmed', statusColor: 'success', items: [
        { icon: 'flight', label: 'Brussels Airport (BRU) • Jun 26', detail: '' },
        { icon: 'hotel', label: 'Hotel de la Source • 4 nights', detail: 'Rue de la Source, Spa' },
        { icon: 'directions_car', label: 'Rental Car • BMW X3', detail: 'Pickup at BRU' }
      ]},
      { id: 802, event: 'Monaco GP', status: 'Planning', statusColor: '', items: [
        { icon: 'flight', label: 'Not yet booked', detail: '' },
        { icon: 'hotel', label: 'Not yet booked', detail: '' }
      ]}
    ],
    notifications: [
      { id: 401, text: 'New application for GT3 Lead Mechanic', time: '5m ago', type: 'application', read: false },
      { id: 402, text: 'Sarah Mitchell accepted your offer', time: '1h ago', type: 'accept', read: false },
      { id: 403, text: 'Spa 24H event starts in 3 days', time: '2h ago', type: 'reminder', read: false }
    ],
    messages: [
      { id: 501, from: 'Thomas Müller', initials: 'TM', text: 'Perfect, see you at the paddock at 7!', time: '2m ago', unread: true },
      { id: 502, from: 'Spa 24H Team Chat', initials: 'SP', text: 'Sarah: New tire allocation confirmed', time: '1h ago', unread: false },
      { id: 503, from: 'James Wilson', initials: 'JW', text: 'Great work today! Let\'s discuss the next race...', time: '3h ago', unread: false }
    ],
    team: [
      { id: 601, name: 'Alex Krause', initials: 'AK', role: 'Lead Mechanic', status: 'Available', events: ['Spa 24H', 'Monaco GP'], rate: '€350/day', type: 'fulltime' },
      { id: 602, name: 'Sarah Mitchell', initials: 'SM', role: 'Data Engineer', status: 'On Assignment', events: ['Spa 24H'], rate: '€400/day', type: 'freelance' },
      { id: 603, name: 'Marco Bellini', initials: 'MB', role: 'Race Engineer', status: 'Available', events: [], rate: '€450/day', type: 'fulltime' },
      { id: 604, name: 'Lena Wagner', initials: 'LW', role: 'Logistics Coordinator', status: 'Available', events: ['Spa 24H', 'Nürburgring 24H'], rate: '€300/day', type: 'freelance', initialsBg: 'rgba(34,197,94,0.1)', initialsColor: '#22c55e' },
      { id: 605, name: 'James Donovan', initials: 'JD', role: 'Team Manager', status: 'Active', events: ['Spa 24H', 'Monaco GP', 'Nürburgring 24H'], rate: '€600/day', type: 'fulltime' },
      { id: 606, name: 'Paul Tan', initials: 'PT', role: 'Media Specialist', status: 'Available', events: ['Monaco GP'], rate: '€320/day', type: 'freelance', initialsBg: 'rgba(99,102,241,0.1)', initialsColor: '#6366f1' }
    ],
    invoices: [
      { id: 701, date: 'Jun 20', job: 'Spa 24H - Practice', amount: 2800, status: 'Paid' },
      { id: 702, date: 'Jun 15', job: 'Spa 24H - Qualifying', amount: 2100, status: 'Pending' }
    ],
    finance: { earnings: 8400, pending: 12200, ytd: 45000 },
    enterprise: {
      stats: { events: 3, teamMembers: 24, fulltimeEmployees: 14, freelancers: 10, pendingApps: 8, totalBudget: 89000 },
      recentApplicants: [
        { name: 'Alex Krause', initials: 'AK', role: 'GT3 Lead Mechanic', event: 'Spa 24H', status: 'Approuver', statusColor: 'success' },
        { name: 'Sarah Mitchell', initials: 'SM', role: 'Data Engineer', event: 'Monaco GP', status: 'En attente', statusColor: 'warning' }
      ]
    },
    eventDraft: {
      step: 1,
      data: {
        name: '', startDate: '', endDate: '', location: '', type: 'Endurance 24H', budget: '', description: '',
        jobs: [], travel: {}
      }
    },
    theme: 'light'
  };

  let state = {};
  let subscribers = [];

  function load() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        state = deepMerge(clone(defaults), parsed);
        return;
      }
    } catch (e) {}
    state = clone(defaults);
    save();
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {}
  }

  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function deepMerge(target, source) {
    const result = clone(target);
    for (const key in source) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = deepMerge(result[key] || {}, source[key]);
      } else {
        result[key] = source[key];
      }
    }
    return result;
  }

  function get(path) {
    const keys = path.split('.');
    let val = state;
    for (const k of keys) {
      if (val == null) return undefined;
      val = val[k];
    }
    return val;
  }

  function set(path, value) {
    const keys = path.split('.');
    let target = state;
    for (let i = 0; i < keys.length - 1; i++) {
      if (target[keys[i]] == null) target[keys[i]] = {};
      target = target[keys[i]];
    }
    target[keys[keys.length - 1]] = value;
    save();
    notify(path, value);
  }

  function update(path, fn) {
    const current = get(path);
    set(path, fn(current));
  }

  function subscribe(fn) {
    subscribers.push(fn);
    return function () {
      subscribers = subscribers.filter(s => s !== fn);
    };
  }

  function notify(path, value) {
    for (const fn of subscribers) {
      try { fn(path, value); } catch (e) {}
    }
  }

  function reset() {
    state = clone(defaults);
    save();
  }

  load();

  window.Store = { get, set, update, subscribe, reset, defaults: clone(defaults) };
})();
