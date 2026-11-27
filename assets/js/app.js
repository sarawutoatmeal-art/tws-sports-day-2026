// TWS Sports Day 2026 - Kingdom Games Application Controller (Clean Light/White Theme)

// State Management & Real-time Cloud Sync
const STORAGE_KEY = 'tws_sports_day_2026_roster_clean_v2';
const SCOREBOARD_STORAGE_KEY = 'tws_sports_day_2026_scores_v1';
const REFEREE_SESSION_KEY = 'tws_sports_day_2026_referee_auth';
// Secure One-Way SHA-256 Hash of Referee Master PIN (prevents code inspection / plaintext leaks)
const REFEREE_PIN_HASH = '2d6c50388f532bd1bbe52e5a25fad2a7fd3955bb2855b0b72cd28765e78b62e9';
const CLOUD_API_URL = 'https://script.google.com/macros/s/AKfycbxQj8luQpodPnAddsIXC4eWAKVkzktkZgx4QTOuceZN8M_e8dLPozUW6s0HaMUy3H6_/exec';

const APP_STATE = {
  activeTab: 'kingdoms',
  selectedColor: 'all', // 'all', 'Purple', 'Red', 'Yellow', 'Green'
  selectedClass: 'all',
  selectedGender: 'all',
  selectedStatus: 'all', // 'all', 'zero', 'one', 'two', 'three_plus'
  searchQuery: '',
  dutySearchQuery: '',
  scheduleFilter: 'all',
  siblingSearchQuery: '',
  siblingLevelFilter: 'all',
  siblingColorFilter: 'all',
  callroomColorFilter: 'all',
  isRefereeAuthorized: false,
  students: [],
  selectedStudentForEdit: null,
  isSyncing: false,
  eventScores: {} // eventId -> { gold: 'Purple', silver: 'Red', bronze: 'Green' }
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  initStudentsData();
  initScoreboardData();
  initCountdownTimer();
  setupNavigation();
  setupRosterFilters();
  setupDutyFilters();
  setupScheduleFilters();
  setupPrintCenter();
  setupSiblingFilters();
  setupCallRoomFilters();
  setupScoreboardHandlers();
  renderAllViews();
  setupModalHandlers();
  startRealtimePolling();
  initVisitorAnalytics();
});

// Load Student Data (strictly anchored to master INITIAL_STUDENTS) + Sync from Cloud
function initStudentsData() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const storedList = JSON.parse(stored);
      const storedMap = new Map();
      if (Array.isArray(storedList)) {
        storedList.forEach(s => {
          if (s && s.id !== undefined) storedMap.set(s.id, s);
        });
      }

      // Build APP_STATE.students strictly from master INITIAL_STUDENTS (purging resigned students like #175, #176)
      APP_STATE.students = INITIAL_STUDENTS.map(initRec => {
        const student = JSON.parse(JSON.stringify(initRec));
        const saved = storedMap.get(initRec.id);
        if (saved && Array.isArray(saved.events)) {
          student.events = saved.events;
        }
        return student;
      });

      // Synchronize back to localStorage so purged students are removed from user cache immediately
      localStorage.setItem(STORAGE_KEY, JSON.stringify(APP_STATE.students));
    } catch (e) {
      APP_STATE.students = JSON.parse(JSON.stringify(INITIAL_STUDENTS));
    }
  } else {
    // If upgrading from v1 or first visit, try to preserve any event registrations
    const oldStored = localStorage.getItem('tws_sports_day_2026_roster_clean_v1');
    APP_STATE.students = JSON.parse(JSON.stringify(INITIAL_STUDENTS));
    if (oldStored) {
      try {
        const oldData = JSON.parse(oldStored);
        if (Array.isArray(oldData)) {
          oldData.forEach(oldStudent => {
            const target = APP_STATE.students.find(s => s.id === oldStudent.id);
            if (target && Array.isArray(oldStudent.events) && oldStudent.events.length > 0) {
              target.events = oldStudent.events;
            }
          });
        }
      } catch (err) {
        console.warn('Could not migrate old registrations:', err);
      }
    }
  }
  
  // Pull latest registrations from Cloud
  fetchCloudRegistrations();
}

// Real-time Cloud Sync with Jitter, Exponential Backoff & Concurrency Protection
let syncBackoffMs = 25000;
let syncPollingTimer = null;
let lastCloudDataHash = '';

// Fetch real-time registrations from Google Apps Script Cloud API
async function fetchCloudRegistrations() {
  if (!CLOUD_API_URL) return;
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7000); // 7s timeout safeguard

    const res = await fetch(CLOUD_API_URL, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) {
      // Backoff if server is rate-limiting or returning errors
      syncBackoffMs = Math.min(syncBackoffMs * 1.5, 90000);
      scheduleNextPoll();
      return;
    }

    const json = await res.json();
    if (json.status === 'success' && json.data) {
      // Reset backoff upon healthy response
      syncBackoffMs = 25000;

      const dataStr = JSON.stringify(json.data);
      if (dataStr === lastCloudDataHash) {
        // No server change; skip unnecessary DOM updates
        scheduleNextPoll();
        return;
      }
      lastCloudDataHash = dataStr;

      let changed = false;
      APP_STATE.students.forEach(s => {
        if (json.data[s.id] !== undefined) {
          const cloudEvents = json.data[s.id] || [];
          if (JSON.stringify(s.events) !== JSON.stringify(cloudEvents)) {
            s.events = cloudEvents;
            changed = true;
          }
        }
      });

      if (changed) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(APP_STATE.students));
        renderRosterView();
        updateRosterStats();
        if (typeof renderEventRegistrationView === 'function') renderEventRegistrationView();
        showAutoSaveIndicator('Cloud Synced');
      }
    }
  } catch (err) {
    // Network jitter or timeout backoff
    syncBackoffMs = Math.min(syncBackoffMs * 1.5, 90000);
  } finally {
    scheduleNextPoll();
  }
}

// Jittered Polling Scheduler (Distributes concurrent queries smoothly across clients)
function scheduleNextPoll() {
  if (syncPollingTimer) clearTimeout(syncPollingTimer);
  // Add random jitter of +/- 5000ms
  const jitter = (Math.random() - 0.5) * 10000;
  const nextDelay = Math.max(15000, syncBackoffMs + jitter);

  syncPollingTimer = setTimeout(() => {
    const activeEl = document.activeElement;
    const isTyping = activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'SELECT' || activeEl.tagName === 'TEXTAREA');
    if (!APP_STATE.selectedStudentForEdit && !isTyping) {
      fetchCloudRegistrations();
    } else {
      scheduleNextPoll();
    }
  }, nextDelay);
}

// Auto poll cloud with anti-collision jitter (non-intrusive)
function startRealtimePolling() {
  scheduleNextPoll();
}

// Push student update to Cloud (Non-blocking background sync with 6s timeout)
function pushStudentUpdateToCloud(studentId, events) {
  if (!CLOUD_API_URL) return;
  showAutoSaveIndicator('Syncing...');
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  fetch(CLOUD_API_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'update',
      studentId: studentId,
      events: events
    }),
    signal: controller.signal
  })
  .then(() => {
    clearTimeout(timeoutId);
    showAutoSaveIndicator('Synced');
  })
  .catch(err => {
    clearTimeout(timeoutId);
    console.warn('Background sync status:', err.name === 'AbortError' ? 'timeout' : err);
    showAutoSaveIndicator('Saved Locally');
  });
}

function saveStudentsToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(APP_STATE.students));
  showAutoSaveIndicator('Local Saved');
}

function showAutoSaveIndicator(text = 'DATABASE SYNCED') {
  const el = document.getElementById('autosave-indicator');
  if (el) {
    el.textContent = text;
    el.classList.remove('opacity-0');
    el.classList.add('opacity-100');
    setTimeout(() => {
      el.classList.remove('opacity-100');
      el.classList.add('opacity-0');
    }, 2500);
  }
}

// Countdown Timer to January 8, 2027 08:00 AM (ICT = UTC+7)
function initCountdownTimer() {
  const targetDate = new Date('2027-01-08T08:00:00+07:00').getTime();

  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      const wrapper = document.getElementById('countdown-wrapper');
      if (wrapper) {
        wrapper.innerHTML = `
          <div class="px-6 py-2 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 font-bold tracking-wider animate-pulse flex items-center justify-center gap-2">
            <svg class="w-4 h-4 text-emerald-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg>
            <span>THE KINGDOM GAMES HAVE BEGUN</span>
          </div>
        `;
      }
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const daysEl = document.getElementById('count-days');
    const hoursEl = document.getElementById('count-hours');
    const minsEl = document.getElementById('count-mins');
    const secsEl = document.getElementById('count-secs');

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minsEl) minsEl.textContent = String(minutes).padStart(2, '0');
    if (secsEl) secsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

// Navigation Tabs
function setupNavigation() {
  const navButtons = document.querySelectorAll('[data-tab-target]');
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab-target');
      switchTab(target);
    });
  });

  if (window.location.hash) {
    const hash = window.location.hash.replace('#', '');
    if (['event-registration', 'roster', 'scoreboard', 'callroom', 'siblings', 'print', 'duties', 'schedule', 'handbook', 'registration', 'kingdoms'].includes(hash)) {
      switchTab(hash);
    }
  }
}

function switchTab(tabId) {
  APP_STATE.activeTab = tabId;
  window.location.hash = tabId;

  // Toggle active tab buttons in School Navy & White Theme (Clean Pill)
  document.querySelectorAll('[data-tab-target]').forEach(btn => {
    const target = btn.getAttribute('data-tab-target');
    if (target === tabId) {
      btn.className = 'inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-full text-xs font-semibold border transition whitespace-nowrap bg-[#0B1E36] text-white border-[#0B1E36] shadow-xs min-h-[38px]';
    } else {
      btn.className = 'inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-full text-xs font-semibold border border-transparent text-slate-700 hover:text-[#0B1E36] hover:bg-slate-100 transition whitespace-nowrap min-h-[38px]';
    }
  });

  // Toggle tab sections
  document.querySelectorAll('.tab-content-section').forEach(sec => {
    if (sec.id === `section-${tabId}`) {
      sec.classList.remove('hidden');
    } else {
      sec.classList.add('hidden');
    }
  });

  // Re-render specific view to ensure fresh state and content visibility
  if (tabId === 'event-registration') {
    if (typeof renderEventRegistrationView === 'function') renderEventRegistrationView();
  } else if (tabId === 'schedule') {
    renderScheduleView();
  } else if (tabId === 'handbook') {
    renderHandbookView();
  } else if (tabId === 'registration') {
    renderRegistrationHub();
  } else if (tabId === 'kingdoms') {
    renderKingdomShowcase();
  } else if (tabId === 'callroom') {
    renderCallRoomView();
  } else if (tabId === 'scoreboard') {
    renderScoreboardView();
  } else if (tabId === 'duties') {
    renderDutiesView();
  } else if (tabId === 'siblings') {
    renderSiblingsView();
  } else if (tabId === 'roster') {
    renderRosterView();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Setup Roster Filters
function setupRosterFilters() {
  // Kingdom color pills
  document.querySelectorAll('[data-color-filter]').forEach(pill => {
    pill.addEventListener('click', () => {
      const color = pill.getAttribute('data-color-filter');
      APP_STATE.selectedColor = color;
      
      document.querySelectorAll('[data-color-filter]').forEach(p => {
        p.classList.remove('ring-2', 'ring-amber-500', 'shadow-md');
      });
      pill.classList.add('ring-2', 'ring-amber-500', 'shadow-md');

      renderRosterView();
    });
  });

  // Class select dropdown
  const classSelect = document.getElementById('filter-class');
  if (classSelect) {
    classSelect.addEventListener('change', (e) => {
      APP_STATE.selectedClass = e.target.value;
      renderRosterView();
    });
  }

  // Gender select dropdown
  const genderSelect = document.getElementById('filter-gender');
  if (genderSelect) {
    genderSelect.addEventListener('change', (e) => {
      APP_STATE.selectedGender = e.target.value;
      renderRosterView();
    });
  }

  // Status select dropdown
  const statusSelect = document.getElementById('filter-status');
  if (statusSelect) {
    statusSelect.addEventListener('change', (e) => {
      APP_STATE.selectedStatus = e.target.value;
      renderRosterView();
    });
  }

  // Search input with debounce to prevent typing lag
  const searchInput = document.getElementById('search-student');
  if (searchInput) {
    let searchDebounceTimer;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchDebounceTimer);
      searchDebounceTimer = setTimeout(() => {
        APP_STATE.searchQuery = e.target.value.trim().toLowerCase();
        renderRosterView();
      }, 150);
    });
  }

  // Reset Button (Secured with Referee Master PIN Authorization)
  const resetBtn = document.getElementById('btn-reset-roster');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (!APP_STATE.isRefereeAuthorized) {
        alert('🔒 การรีเซตรายชื่อต้องใช้สิทธิ์ครูกรรมการตัดสินเท่านั้น! กรุณาปลดล็อกโหมดผู้ตัดสินด้วยรหัส PIN ก่อนดำเนินการ');
        const pinModal = document.getElementById('referee-pin-modal');
        if (pinModal) pinModal.classList.remove('hidden');
        return;
      }
      if (confirm('⚠️ คำเตือนสำคัญ: คุณต้องการรีเซตรายการแข่งขันของนักเรียนทุกคนกลับเป็น 0 รายการ (ล้างข้อมูลที่ลงทะเบียนทั้งหมด) ใช่หรือไม่?')) {
        const doubleCheck = prompt('กรุณาพิมพ์คำว่า "RESET" ตัวพิมพ์ใหญ่ เพื่อยืนยันการล้างข้อมูลรายการแข่งขันทั้งหมด:');
        if (doubleCheck === 'RESET') {
          localStorage.removeItem(STORAGE_KEY);
          APP_STATE.students = JSON.parse(JSON.stringify(INITIAL_STUDENTS));
          saveStudentsToStorage();
          renderRosterView();
          alert('รีเซตข้อมูลรายการแข่งขันทั้งหมดเป็น 0 รายการเรียบร้อยแล้ว');
        } else {
          alert('ยกเลิกการรีเซต ข้อมูลรายการแข่งขันทั้งหมดยังคงปลอดภัย');
        }
      }
    });
  }

  // Export CSV Button
  const exportBtn = document.getElementById('btn-export-csv');
  if (exportBtn) {
    exportBtn.addEventListener('click', exportRosterToCSV);
  }

  // Backup JSON Button
  const backupBtn = document.getElementById('btn-backup-json');
  if (backupBtn) {
    backupBtn.addEventListener('click', exportBackupJSON);
  }

  // Restore JSON Input
  const restoreInput = document.getElementById('input-restore-json');
  if (restoreInput) {
    restoreInput.addEventListener('change', importBackupJSON);
  }
}

// Backup & Restore Database
function exportBackupJSON() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(APP_STATE.students, null, 2));
  const link = document.createElement('a');
  link.setAttribute('href', dataStr);
  link.setAttribute('download', `TWS_Kingdom_Games_Database_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function importBackupJSON(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(evt) {
    try {
      const imported = JSON.parse(evt.target.result);
      if (Array.isArray(imported) && imported.length > 0 && imported[0].fullName) {
        if (confirm(`พบข้อมูลนักเรียน ${imported.length} คนในไฟล์สำรอง ต้องการกู้คืนและเขียนทับข้อมูลปัจจุบันหรือไม่?`)) {
          APP_STATE.students = imported;
          saveStudentsToStorage();
          renderRosterView();
          alert('กู้คืนฐานข้อมูลนักเรียนสำเร็จ!');
        }
      } else {
        alert('ไฟล์สำรองไม่ถูกต้อง กรุณาเลือกไฟล์ JSON ที่ถูกต้อง');
      }
    } catch (err) {
      alert('เกิดข้อผิดพลาดในการอ่านไฟล์: ' + err.message);
    }
  };
  reader.readAsText(file);
}

// Setup Duty Filters
function setupDutyFilters() {
  const searchInput = document.getElementById('search-teacher');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      APP_STATE.dutySearchQuery = e.target.value.trim().toLowerCase();
      renderDutiesView();
    });
  }

  document.querySelectorAll('[data-duty-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      const dept = btn.getAttribute('data-duty-filter');
      document.querySelectorAll('[data-duty-filter]').forEach(b => {
        b.className = 'px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition';
      });
      btn.className = 'px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-white shadow-sm';

      renderDutiesView(dept);
    });
  });
}

// Setup Schedule Filters
function setupScheduleFilters() {
  document.querySelectorAll('[data-schedule-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-schedule-filter');
      APP_STATE.scheduleFilter = cat;

      document.querySelectorAll('[data-schedule-filter]').forEach(b => {
        b.className = 'px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition';
      });
      btn.className = 'px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-white shadow-sm';

      renderScheduleView();
    });
  });
}

// Render All Views
function renderAllViews() {
  renderRosterView();
  renderScoreboardView();
  renderCallRoomView();
  renderSiblingsView();
  renderDutiesView();
  renderScheduleView();
  renderHandbookView();
  renderRegistrationHub();
  renderKingdomShowcase();
  if (typeof renderEventRegistrationView === 'function') renderEventRegistrationView();
}

// Render Roster View
function renderRosterView() {
  const tbody = document.getElementById('students-table-body');
  const mobileList = document.getElementById('students-mobile-list');
  const countDisplay = document.getElementById('roster-match-count');
  if (!tbody) return;

  // Filter students
  let filtered = APP_STATE.students.filter(student => {
    if (APP_STATE.selectedColor !== 'all' && student.color !== APP_STATE.selectedColor) return false;
    if (APP_STATE.selectedClass !== 'all' && student.class !== APP_STATE.selectedClass) return false;
    if (APP_STATE.selectedGender !== 'all' && student.gender !== APP_STATE.selectedGender) return false;

    const eventCount = student.events ? student.events.length : 0;
    if (APP_STATE.selectedStatus === 'zero' && eventCount !== 0) return false;
    if (APP_STATE.selectedStatus === 'one' && eventCount !== 1) return false;
    if (APP_STATE.selectedStatus === 'two' && eventCount !== 2) return false;
    if (APP_STATE.selectedStatus === 'three_plus' && eventCount < 3) return false;

    if (APP_STATE.searchQuery) {
      const q = APP_STATE.searchQuery;
      const matchName = student.fullName.toLowerCase().includes(q);
      const matchNick = student.nickname.toLowerCase().includes(q);
      const matchClass = student.class.toLowerCase().includes(q);
      if (!matchName && !matchNick && !matchClass) return false;
    }
    return true;
  });

  updateRosterStats();

  if (countDisplay) {
    countDisplay.textContent = `Showing ${filtered.length} of ${APP_STATE.students.length} students`;
  }

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="py-12 text-center text-slate-500 bg-white">
          <p class="text-base font-semibold text-slate-700">No athletes match the current filters.</p>
          <p class="text-xs text-slate-400 mt-1">Try clearing your search keyword or selecting "All Colors".</p>
        </td>
      </tr>
    `;
    if (mobileList) {
      mobileList.innerHTML = `
        <div class="py-10 text-center text-slate-500 bg-white rounded-xl border border-slate-200 p-4">
          <p class="text-sm font-semibold text-slate-700">No athletes match the current filters.</p>
          <p class="text-xs text-slate-400 mt-1">Try clearing your search keyword or selecting "All Colors".</p>
        </div>
      `;
    }
    return;
  }

  // Desktop Table Rows
  tbody.innerHTML = filtered.map(s => {
    const eventCount = s.events ? s.events.length : 0;
    
    // Status badge (Light Theme)
    let statusBadge = '';
    if (eventCount === 0) {
      statusBadge = `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200"><svg class="w-3 h-3 text-rose-600 inline-block shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg> 0 Events</span>`;
    } else if (eventCount === 1) {
      statusBadge = `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">1 Event</span>`;
    } else if (eventCount === 2) {
      statusBadge = `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200"><svg class="w-3 h-3 text-emerald-600 inline-block shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg> 2 Events (Optimal)</span>`;
    } else {
      statusBadge = `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200"><svg class="w-3 h-3 text-amber-600 inline-block shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> ${eventCount} Events (Sub)</span>`;
    }

    // Color theme badge (Light Theme)
    let colorBadge = '';
    let kingdomIcon = '';
    if (s.color === 'Purple') {
      colorBadge = 'bg-purple-50 text-purple-700 border-purple-200';
      kingdomIcon = '<span class="w-2 h-2 rounded-full bg-purple-600 inline-block mr-1"></span> Amethyst';
    } else if (s.color === 'Red') {
      colorBadge = 'bg-red-50 text-red-700 border-red-200';
      kingdomIcon = '<span class="w-2 h-2 rounded-full bg-rose-600 inline-block mr-1"></span> Crimson';
    } else if (s.color === 'Yellow') {
      colorBadge = 'bg-amber-50 text-amber-800 border-amber-200';
      kingdomIcon = '<span class="w-2 h-2 rounded-full bg-amber-500 inline-block mr-1"></span> Golden';
    } else {
      colorBadge = 'bg-emerald-50 text-emerald-700 border-emerald-200';
      kingdomIcon = '<span class="w-2 h-2 rounded-full bg-emerald-600 inline-block mr-1"></span> Jade';
    }

    // Events tags list
    const eventsList = (s.events && s.events.length > 0) 
      ? s.events.map(ev => `<span class="inline-block px-2 py-0.5 text-[11px] rounded bg-slate-100 text-slate-800 border border-slate-200 font-semibold mr-1 mb-1">${ev}</span>`).join('')
      : `<span class="text-xs text-slate-400 italic font-medium">ยังไม่ได้ลงรายการแข่งขัน</span>`;

    return `
      <tr class="hover:bg-slate-50 transition-colors border-b border-slate-200 bg-white">
        <td class="py-3 px-3 text-xs text-slate-500 text-center font-mono font-bold">${s.id}</td>
        <td class="py-3 px-3">
          <span class="inline-block px-2.5 py-1 rounded-md text-xs font-bold border ${colorBadge}">
            ${kingdomIcon}
          </span>
        </td>
        <td class="py-3 px-3 text-xs text-slate-700 font-medium">
          <span class="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-mono text-xs mr-1 font-bold">${s.class}</span>
          <span class="text-slate-500 font-bold">#${s.no}</span>
        </td>
        <td class="py-3 px-3">
          <div class="font-bold text-slate-900 text-sm">${s.fullName}</div>
          <div class="text-xs text-slate-500 flex flex-wrap items-center gap-x-2 gap-y-1 mt-0.5">
            <span>Gender: <strong class="text-slate-700 font-semibold">${s.gender}</strong></span>
            ${s.sibling ? `<span class="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200"><svg class="w-3 h-3 inline-block shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> Sibling: ${s.sibling}</span>` : ''}
          </div>
        </td>
        <td class="py-3 px-3">
          <span class="inline-block px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-slate-900 font-bold text-xs tracking-wide">
            ${s.nickname}
          </span>
        </td>
        <td class="py-3 px-3 max-w-xs">
          <div class="flex flex-wrap items-center">
            ${eventsList}
          </div>
        </td>
        <td class="py-3 px-3 text-center whitespace-nowrap">
          <div class="mb-1.5">${statusBadge}</div>
          <button onclick="openEditModal(${s.id})" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#0B1E36] hover:bg-[#162F52] text-white transition shadow-sm">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
            <span>Assign Sport</span>
          </button>
        </td>
      </tr>
    `;
  }).join('');

  // Mobile Athlete Cards (Apple-grade Squircle & Anti-Overflow)
  if (mobileList) {
    mobileList.innerHTML = filtered.map(s => {
      const eventCount = s.events ? s.events.length : 0;

      let statusBadge = '';
      if (eventCount === 0) {
        statusBadge = `<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200"><svg class="w-3 h-3 text-rose-600 inline-block shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg> 0 รายการ</span>`;
      } else if (eventCount === 1) {
        statusBadge = `<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">1 รายการ</span>`;
      } else if (eventCount === 2) {
        statusBadge = `<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200"><svg class="w-3 h-3 text-emerald-600 inline-block shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg> ครบ 2 รายการ</span>`;
      } else {
        statusBadge = `<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200"><svg class="w-3 h-3 text-amber-600 inline-block shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> ${eventCount} รายการ</span>`;
      }

      let colorBadge = '';
      let borderTheme = 'border-[rgba(0,0,0,0.08)]';
      if (s.color === 'Purple') {
        colorBadge = 'bg-purple-100 text-purple-800 border-purple-200';
        borderTheme = 'border-purple-200/80';
      } else if (s.color === 'Red') {
        colorBadge = 'bg-red-100 text-red-800 border-red-200';
        borderTheme = 'border-rose-200/80';
      } else if (s.color === 'Yellow') {
        colorBadge = 'bg-amber-100 text-amber-800 border-amber-200';
        borderTheme = 'border-amber-200/80';
      } else {
        colorBadge = 'bg-emerald-100 text-emerald-800 border-emerald-200';
        borderTheme = 'border-emerald-200/80';
      }

      const eventsList = (s.events && s.events.length > 0) 
        ? s.events.map(ev => `<span class="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg bg-slate-100 text-slate-800 border border-slate-200 font-semibold mr-1.5 mb-1.5"><svg class="w-3 h-3 text-amber-600 inline-block shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg> ${ev}</span>`).join('')
        : `<span class="text-xs text-slate-400 italic">ยังไม่ได้ลงรายการแข่งขัน</span>`;

      return `
        <div class="p-4 rounded-2xl border ${borderTheme} bg-white shadow-xs space-y-3 anti-overflow-card">
          <!-- Card Header -->
          <div class="flex items-center justify-between gap-2 flex-wrap">
            <div class="flex items-center gap-1.5 flex-wrap">
              <span class="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200 font-mono">
                ${s.class} #${s.no}
              </span>
              <span class="px-2.5 py-1 rounded-full text-xs font-bold border ${colorBadge}">
                ${s.color}
              </span>
            </div>
            <div>
              ${statusBadge}
            </div>
          </div>

          <!-- Student Name & Nickname -->
          <div class="min-w-0">
            <div class="font-bold text-base text-[#0B1E36] leading-snug">
              ${s.fullName}
            </div>
            <div class="text-xs text-slate-600 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>ชื่อเล่น: <strong class="text-amber-800 font-bold text-sm bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">${s.nickname}</strong></span>
              <span>เพศ: <strong class="text-slate-700">${s.gender}</strong></span>
            </div>
            ${s.sibling ? `<div class="mt-1.5 text-xs text-amber-900 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 inline-flex items-center gap-1 font-semibold"><svg class="w-3 h-3 inline-block shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> พี่น้อง: ${s.sibling}</div>` : ''}
          </div>

          <!-- Events List -->
          <div class="pt-2.5 border-t border-slate-100">
            <div class="text-[11px] uppercase font-bold text-slate-400 mb-1.5 tracking-wider">กีฬาที่ลงทะเบียน:</div>
            <div class="flex flex-wrap items-center">
              ${eventsList}
            </div>
          </div>

          <!-- Action Button for Mobile -->
          <button 
            onclick="openEditModal(${s.id})" 
            class="w-full py-3 rounded-full text-xs font-bold bg-[#0B1E36] hover:bg-[#162F52] active:scale-[0.98] text-white transition shadow-xs flex items-center justify-center gap-2 min-h-[44px]"
          >
            <svg class="w-3.5 h-3.5 inline-block shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
            <span>จัดการรายการกีฬา (ลงทะเบียน)</span>
          </button>
        </div>
      `;
    }).join('');
  }
}

// Update Roster Header Summary Stats
function updateRosterStats() {
  const total = APP_STATE.students.length;
  const zeroCount = APP_STATE.students.filter(s => !s.events || s.events.length === 0).length;
  const assignedCount = total - zeroCount;
  const participationRate = Math.round((assignedCount / total) * 100);

  const purpleTotal = APP_STATE.students.filter(s => s.color === 'Purple').length;
  const redTotal = APP_STATE.students.filter(s => s.color === 'Red').length;
  const yellowTotal = APP_STATE.students.filter(s => s.color === 'Yellow').length;
  const greenTotal = APP_STATE.students.filter(s => s.color === 'Green').length;

  const purpleAssigned = APP_STATE.students.filter(s => s.color === 'Purple' && s.events && s.events.length > 0).length;
  const redAssigned = APP_STATE.students.filter(s => s.color === 'Red' && s.events && s.events.length > 0).length;
  const yellowAssigned = APP_STATE.students.filter(s => s.color === 'Yellow' && s.events && s.events.length > 0).length;
  const greenAssigned = APP_STATE.students.filter(s => s.color === 'Green' && s.events && s.events.length > 0).length;

  const statTotalEl = document.getElementById('stat-total-students');
  const statAssignedEl = document.getElementById('stat-assigned-students');
  const statZeroEl = document.getElementById('stat-zero-students');
  const statRateEl = document.getElementById('stat-participation-rate');

  if (statTotalEl) statTotalEl.textContent = total;
  if (statAssignedEl) statAssignedEl.textContent = `${assignedCount} / ${total}`;
  if (statZeroEl) statZeroEl.textContent = zeroCount;
  if (statRateEl) statRateEl.textContent = `${participationRate}%`;

  const badgePurple = document.getElementById('badge-count-purple');
  const badgeRed = document.getElementById('badge-count-red');
  const badgeYellow = document.getElementById('badge-count-yellow');
  const badgeGreen = document.getElementById('badge-count-green');

  if (badgePurple) badgePurple.textContent = `${purpleAssigned}/${purpleTotal}`;
  if (badgeRed) badgeRed.textContent = `${redAssigned}/${redTotal}`;
  if (badgeYellow) badgeYellow.textContent = `${yellowAssigned}/${yellowTotal}`;
  if (badgeGreen) badgeGreen.textContent = `${greenAssigned}/${greenTotal}`;
}

// Modal for Editing Student Event Assignments
function openEditModal(studentId) {
  const student = APP_STATE.students.find(s => s.id === studentId);
  if (!student) return;

  APP_STATE.selectedStudentForEdit = student;

  const modal = document.getElementById('edit-student-modal');
  const nameEl = document.getElementById('modal-student-name');
  const infoEl = document.getElementById('modal-student-info');
  const checklistEl = document.getElementById('modal-sports-checklist');
  const gsheetBtn = document.getElementById('modal-gsheet-btn');

  if (!modal || !nameEl || !checklistEl) return;

  if (gsheetBtn) {
    const colorLabel = student.color || 'สีม่วง';
    gsheetBtn.href = `https://docs.google.com/spreadsheets/d/14oRVn1mb3iiclWVlBbaR_SYpimgUbaXF/edit#gid=181845680`;
    gsheetBtn.title = `คลิกเพื่อเปิดกรอกในแท็บ ${colorLabel} ของ Google Sheet โดยตรง`;
    gsheetBtn.innerHTML = `
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
      เปิดกรอกใน Google Sheet (${colorLabel})
    `;
  }

  nameEl.textContent = student.fullName;
  infoEl.innerHTML = `
    Nickname: <strong class="text-amber-700 font-bold">${student.nickname}</strong> | 
    Class: <strong class="text-slate-900">${student.class}</strong> | 
    Kingdom: <strong class="text-slate-900">${student.kingdom} (${student.color})</strong>
    ${student.sibling ? `<div class="mt-1 text-xs text-amber-800 font-semibold bg-amber-50 p-1.5 rounded border border-amber-200 flex items-center gap-1.5">` + (window.TWS_ICONS ? TWS_ICONS.users('w-3.5 h-3.5 text-amber-700') : '') + `<span>ข้อมูลพี่น้อง: ${student.sibling}</span></div>` : ''}
  `;

  const grade = student.grade;
  const currentEvents = student.events || [];

  // Determine default heat for this student's class
  // /1 (first room) => Heat 1, /2 (second room) => Heat 2
  const room1Classes = ['G1 Giraffe', 'G2 Zebra', 'G3 Eagle', 'G4 Leopard', 'G5 Liger', 'G6 Phoenix'];
  const defaultHeat = room1Classes.includes(student.class) ? 1 : 2;
  const isG6 = grade === 6;

  const allPossibleEvents = [
    { 
      name: isG6 
        ? '30m Sprint Heat 1 (วิ่ง 30 ม. Heat 1)' 
        : (defaultHeat === 1 ? '30m Sprint Heat 1 (วิ่ง 30 ม. Heat 1 - ห้อง 1)' : '30m Sprint Heat 2 (วิ่ง 30 ม. Heat 2 - ห้อง 2)'), 
      desc: isG6 
        ? `วิ่ง 30 ม. รุ่นเดี่ยว Grade 6 Heat 1` 
        : `วิ่ง 30 ม. รุ่นเดี่ยว (แนะนำตามห้อง ${student.class}: Heat ${defaultHeat})`, 
      eligible: true,
      highlight: true
    },
    ...(!isG6 ? [{
      name: defaultHeat === 1 ? '30m Sprint Heat 2 (วิ่ง 30 ม. Heat 2 - ข้ามลง Heat 2)' : '30m Sprint Heat 1 (วิ่ง 30 ม. Heat 1 - ข้ามลง Heat 1)',
      desc: `วิ่ง 30 ม. สลับไปลง Heat ${defaultHeat === 1 ? 2 : 1} (กรณีปรับสลับคิววิ่ง)`,
      eligible: true,
      isAlternateHeat: true
    }] : []),
    { name: '6x30m Relay (วิ่งผลัด 6x30 ม.)', desc: 'Junior G1–G3 or Senior G4–G6 (6 runners per team, Boys/Girls)', eligible: true },
    { name: 'Football 5v5 (ฟุตบอล)', desc: 'Grade 3–6 gymnasium court (5 players on pitch incl. Goalkeeper)', eligible: grade >= 3 },
    { name: 'Primary Chairball (แชร์บอล)', desc: 'Grade 1–2 Courts A & B (6 players per team incl. 1 basket catcher)', eligible: grade <= 2 },
    { name: 'Basketball 3x3 (บาสเกตบอล)', desc: 'Grade 3–6 (Junior squad G3–4 & Senior squad G5–6)', eligible: grade >= 3 },
    { name: 'Fastball Throwing (Family Game)', desc: 'Grade 1–6 (Boy 1, Girl 1 per grade = 12 students + 1 parent giant basket holder)', eligible: true },
    { name: 'Hula Hoop Relay (Family Game)', desc: 'Grade 1–6 (1 student per grade alternating with 6 parents = 12 total, hand-in-hand)', eligible: true },
    { name: '3-Legged Race (Family Relay)', desc: 'Parent + student pair (Junior G1–3: 3 pairs or Senior G4–6: 3 pairs, walking only)', eligible: true },
    { name: 'Moms vs Kids Chairball (Exhibition)', desc: 'Student All-Stars vs Techawit Mothers', eligible: true },
    { name: 'Dads vs Kids Giant Soccer (Exhibition)', desc: 'Student All-Stars vs Techawit Fathers (giant soft soccer ball)', eligible: true }
  ];

  checklistEl.innerHTML = allPossibleEvents.map((item, idx) => {
    // Check if matching current events (support legacy "30m Sprint" string or specific Heat string)
    let isChecked = false;
    if (currentEvents.includes(item.name)) {
      isChecked = true;
    } else if (currentEvents.some(e => e.startsWith('30m Sprint')) && item.name.startsWith('30m Sprint')) {
      if (currentEvents.some(e => e.includes(`Heat ${defaultHeat}`)) && item.name.includes(`Heat ${defaultHeat}`)) {
        isChecked = true;
      } else if (currentEvents.includes('30m Sprint (วิ่ง 30 ม.)') && !item.isAlternateHeat) {
        isChecked = true;
      }
    }

    const isDisabled = !item.eligible;
    
    return `
      <label class="flex items-start gap-3 p-3 rounded-2xl border transition ${
        isDisabled 
          ? 'opacity-40 bg-slate-100 border-slate-200 cursor-not-allowed' 
          : isChecked
            ? 'bg-amber-50/80 border-amber-400 cursor-pointer shadow-xs'
            : item.highlight
              ? 'bg-blue-50/50 border-blue-200 hover:border-blue-400 cursor-pointer'
              : 'bg-white border-slate-200 hover:border-slate-300 cursor-pointer'
      }">
        <input 
          type="checkbox" 
          name="student_event" 
          value="${item.name}" 
          ${isChecked ? 'checked' : ''} 
          ${isDisabled ? 'disabled' : ''}
          class="mt-1 w-4 h-4 rounded text-amber-600 focus:ring-amber-500 bg-white border-slate-300"
          onchange="updateModalCount()"
        />
        <div class="flex-1 min-w-0">
          <div class="text-sm font-bold text-slate-900 flex items-center justify-between flex-wrap gap-1">
            <span>${item.name}</span>
            ${item.highlight ? `<span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">แนะนำตามห้อง /${defaultHeat}</span>` : ''}
            ${isDisabled ? `<span class="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-200 text-slate-600">เฉพาะชั้น G${grade >= 3 ? '1–2' : '3–6'}</span>` : ''}
          </div>
          <p class="text-xs text-slate-500 mt-0.5">${item.desc}</p>
        </div>
      </label>
    `;
  }).join('');

  updateModalCount();
  modal.classList.remove('hidden');
}

function updateModalCount() {
  const checked = document.querySelectorAll('input[name="student_event"]:checked');
  const countBadgeEl = document.getElementById('modal-event-count');
  if (countBadgeEl) {
    const count = checked.length;
    if (count === 0) {
      countBadgeEl.className = 'px-2.5 py-1 text-xs font-bold rounded-lg bg-slate-100 text-slate-600 border border-slate-200';
      countBadgeEl.textContent = 'ยังไม่ได้เลือก (เป้าหมาย: 1–2 รายการ)';
    } else if (count === 1) {
      countBadgeEl.className = 'px-2.5 py-1 text-xs font-bold rounded-lg bg-blue-50 text-blue-700 border border-blue-200';
      countBadgeEl.textContent = 'เลือก 1 รายการ (ผ่านเกณฑ์ขั้นต่ำ)';
    } else if (count === 2) {
      countBadgeEl.className = 'px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200';
      countBadgeEl.textContent = 'เลือก 2 รายการ (ตรงตามเป้าหมาย)';
    } else {
      countBadgeEl.className = 'px-2.5 py-1 text-xs font-bold rounded-lg bg-amber-50 text-amber-800 border border-amber-200';
      countBadgeEl.textContent = `เลือก ${count} รายการ (ตัวสำรอง/รายการเสริม)`;
    }
  }
}

function closeStudentEditModal() {
  const modal = document.getElementById('edit-student-modal');
  if (modal) modal.classList.add('hidden');
  APP_STATE.selectedStudentForEdit = null;
}

function saveStudentEditModal() {
  if (!APP_STATE.selectedStudentForEdit) {
    closeStudentEditModal();
    return;
  }

  const checkedInputs = document.querySelectorAll('input[name="student_event"]:checked');
  const newEvents = Array.from(checkedInputs).map(inp => inp.value);
  const studentId = APP_STATE.selectedStudentForEdit.id;

  // 1. Immediately update local state & close modal for zero delay
  APP_STATE.selectedStudentForEdit.events = newEvents;
  closeStudentEditModal();

  // 2. Persist to localStorage instantly
  saveStudentsToStorage();

  // 3. Re-render UI views smoothly
  renderRosterView();

  // 4. Background push to Cloud API
  pushStudentUpdateToCloud(studentId, newEvents);
}

function setupModalHandlers() {
  const closeBtn = document.getElementById('btn-close-modal');
  const cancelBtn = document.getElementById('btn-cancel-modal');
  const saveBtn = document.getElementById('btn-save-modal');
  const modal = document.getElementById('edit-student-modal');

  if (closeBtn) closeBtn.addEventListener('click', closeStudentEditModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeStudentEditModal);
  if (saveBtn) saveBtn.addEventListener('click', saveStudentEditModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeStudentEditModal();
    });
  }

  // Keyboard Escape key to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeStudentEditModal();
      closeRecordResultModal();
      const pinModal = document.getElementById('referee-pin-modal');
      if (pinModal) pinModal.classList.add('hidden');
    }
  });
}

// Export Roster to CSV
function exportRosterToCSV() {
  const headers = ['ID', 'Kingdom', 'Class', 'Class_No', 'Full_Name', 'Nickname', 'Gender', 'Sibling_Link', 'Events_Count', 'Assigned_Events'];
  const rows = APP_STATE.students.map(s => {
    const eventsStr = (s.events && s.events.length > 0) ? s.events.join('; ') : 'None';
    return [
      s.id,
      `"${s.kingdom}"`,
      `"${s.class}"`,
      s.no,
      `"${s.fullName}"`,
      `"${s.nickname}"`,
      s.gender,
      `"${s.sibling || ''}"`,
      s.events ? s.events.length : 0,
      `"${eventsStr}"`
    ].join(',');
  });

  const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `TWS_Sports_Day_2026_Athletes_Roster_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ==========================================
// PRINT CENTER GENERATORS (House Masters & Event Marshals)
// ==========================================
function setupPrintCenter() {
  const printHouseBtn = document.getElementById('btn-print-house-sheet');
  const printEventBtn = document.getElementById('btn-print-event-sheet');

  if (printHouseBtn) {
    printHouseBtn.addEventListener('click', () => {
      const color = document.getElementById('print-house-select').value;
      generateAndPrintHouseRoster(color);
    });
  }

  if (printEventBtn) {
    printEventBtn.addEventListener('click', () => {
      const sport = document.getElementById('print-event-select').value;
      generateAndPrintEventCheckin(sport);
    });
  }
}

// Generator 1: Printable Sheet for ครูประจำสี (House Master)
function generateAndPrintHouseRoster(color) {
  let kingdomName = 'All Kingdoms';
  let bannerColor = '#475569';
  let students = APP_STATE.students;

  if (color !== 'all') {
    students = APP_STATE.students.filter(s => s.color === color);
    if (color === 'Purple') { kingdomName = 'Amethyst Kingdom (สีม่วง)'; bannerColor = '#7c3aed'; }
    if (color === 'Red') { kingdomName = 'Crimson Empire (สีแดง)'; bannerColor = '#dc2626'; }
    if (color === 'Yellow') { kingdomName = 'Golden Realm (สีเหลือง)'; bannerColor = '#d97706'; }
    if (color === 'Green') { kingdomName = 'Jade Dynasty (สีเขียว)'; bannerColor = '#059669'; }
  }

  const printArea = document.getElementById('printable-render-area');
  if (!printArea) return;

  const total = students.length;
  const assigned = students.filter(s => s.events && s.events.length > 0).length;

  printArea.innerHTML = `
    <div class="p-6 bg-white text-black font-sans leading-tight">
      <!-- School Header -->
      <div class="text-center border-b-2 border-slate-900 pb-3 mb-4">
        <h1 class="text-xl font-bold uppercase tracking-wider">TECHAWIT SCHOOL (โรงเรียนเตชะวิทย์)</h1>
        <h2 class="text-base font-semibold text-slate-800">TWS SPORTS DAY 2026: THE KINGDOM GAMES</h2>
        <h3 class="text-sm font-bold text-slate-700 mt-1">ใบรายชื่อนักกีฬาสำหรับครูประจำสี • ${kingdomName}</h3>
        <p class="text-xs text-slate-500 mt-0.5">วันศุกร์ที่ 8 มกราคม 2570 • นักเรียนทั้งหมด ${total} คน (ลงทะเบียนแล้ว ${assigned} คน)</p>
      </div>

      <!-- Athletes Table -->
      <table class="w-full text-left border-collapse text-xs">
        <thead>
          <tr class="bg-slate-100 border border-slate-800 text-slate-900 font-bold">
            <th class="p-1.5 text-center w-8 border border-slate-800">#</th>
            <th class="p-1.5 border border-slate-800 w-24">ชั้น / ห้อง</th>
            <th class="p-1.5 border border-slate-800">ชื่อ–นามสกุล</th>
            <th class="p-1.5 border border-slate-800 w-20">ชื่อเล่น</th>
            <th class="p-1.5 border border-slate-800 w-12 text-center">เพศ</th>
            <th class="p-1.5 border border-slate-800 w-24">ข้อมูลพี่น้อง</th>
            <th class="p-1.5 border border-slate-800">รายการแข่งขันที่ลง</th>
            <th class="p-1.5 border border-slate-800 w-12 text-center">จำนวน</th>
            <th class="p-1.5 border border-slate-800 w-16 text-center">เช็คชื่อ</th>
          </tr>
        </thead>
        <tbody>
          ${students.map((s, idx) => `
            <tr class="border border-slate-300">
              <td class="p-1 text-center font-mono font-bold border border-slate-300">${idx + 1}</td>
              <td class="p-1 font-semibold border border-slate-300">${s.class} #${s.no}</td>
              <td class="p-1 font-bold border border-slate-300">${s.fullName}</td>
              <td class="p-1 font-semibold border border-slate-300">${s.nickname}</td>
              <td class="p-1 text-center border border-slate-300">${s.gender}</td>
              <td class="p-1 text-[10px] text-slate-600 border border-slate-300">${s.sibling || '–'}</td>
              <td class="p-1 border border-slate-300 font-semibold">${(s.events && s.events.length > 0) ? s.events.join(', ') : '<span class="italic text-slate-400">ยังไม่ระบุ</span>'}</td>
              <td class="p-1 text-center font-bold border border-slate-300">${s.events ? s.events.length : 0}</td>
              <td class="p-1 text-center border border-slate-300">[ &nbsp; ]</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <!-- Footer Signatures -->
      <div class="mt-8 pt-4 border-t border-slate-400 flex justify-between items-center text-xs">
        <div>
          <p>ครูประจำสีผู้ตรวจสอบ: __________________________________</p>
          <p class="mt-1 text-slate-500">วันที่ส่งใบรายชื่อ: ____ / ____ / ________</p>
        </div>
        <div class="text-right">
          <p>ฝ่ายทะเบียนกลาง: __________________________________</p>
          <p class="mt-1 text-slate-500">Techawit School Primary Sports Day 2026</p>
        </div>
      </div>
    </div>
  `;

  // Trigger print
  window.print();
}

// Generator 2: Printable Sheet for Event Registration & Call Desk (Event Check-In Sheets)
function generateAndPrintEventCheckin(sportFilter) {
  const printArea = document.getElementById('printable-render-area');
  if (!printArea) return;

  let events = MASTER_EVENT_CODES;
  if (sportFilter !== 'all') {
    events = MASTER_EVENT_CODES.filter(ev => ev.sport.toLowerCase().includes(sportFilter.toLowerCase()));
  }

  // Colors list
  const colors = [
    { name: 'Purple', title: 'Amethyst', dotClass: 'bg-purple-600' },
    { name: 'Red', title: 'Crimson', dotClass: 'bg-rose-600' },
    { name: 'Yellow', title: 'Golden', dotClass: 'bg-amber-500' },
    { name: 'Green', title: 'Jade', dotClass: 'bg-emerald-600' }
  ];

  printArea.innerHTML = `
    <div class="p-4 bg-white text-black font-sans leading-tight">
      <div class="text-center border-b border-slate-900 pb-2 mb-3">
        <h1 class="text-lg font-bold uppercase tracking-wider">TECHAWIT SCHOOL (โรงเรียนเตชะวิทย์)</h1>
        <h2 class="text-sm font-semibold text-slate-800">ใบเช็คชื่อนักกีฬาและเรียกรวมตัวเข้าแข่งขัน (Official Athlete Call Sheet)</h2>
        <p class="text-[11px] text-slate-500 mt-0.5">TWS Sports Day 2026: The Kingdom Games • วันศุกร์ที่ 8 มกราคม 2570</p>
      </div>

      <div class="space-y-3">
        ${events.map((ev, evIdx) => {
          return `
            <div class="border border-slate-700 rounded-lg p-2.5 bg-white mb-2 print-card-compact">
              <!-- Event Header -->
              <div class="flex justify-between items-center bg-slate-100 p-1.5 border border-slate-300 rounded mb-1.5 text-xs">
                <div>
                  <span class="font-mono font-bold text-xs bg-slate-900 text-white px-2 py-0.5 rounded">Event #${evIdx + 1}</span>
                  <span class="text-xs font-bold text-slate-900 ml-1.5">${ev.sport}</span>
                  <span class="text-[11px] text-slate-600 font-semibold">(${ev.division})</span>
                </div>
                <div class="text-right text-[11px] font-mono font-bold flex items-center justify-end gap-1.5">
                  <span class="text-rose-700 bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded flex items-center gap-1 font-semibold">
                    <svg class="w-3 h-3 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 11 18-5v12L3 13v-2z"/></svg>
                    เรียกรวม: ${ev.callTime} น.
                  </span>
                  <span class="ml-1.5">แข่ง: ${ev.startTime}–${ev.endTime} น.</span>
                </div>
              </div>

              <!-- 4 Kingdom Athletes Table for this Heat -->
              <table class="w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr class="bg-slate-200 border border-slate-500 font-bold">
                    <th class="p-1 w-8 text-center border border-slate-500">ลู่</th>
                    <th class="p-1 w-28 border border-slate-500">อาณาจักร (Team)</th>
                    <th class="p-1 border border-slate-500">รายชื่อนักกีฬาที่ลงทะเบียน</th>
                    <th class="p-1 w-16 border border-slate-500">ชื่อเล่น</th>
                    <th class="p-1 w-20 border border-slate-500">ระดับชั้น</th>
                    <th class="p-1 w-14 text-center border border-slate-500">เช็คชื่อ [✓]</th>
                    <th class="p-1 w-14 text-center border border-slate-500">ผลแข่ง</th>
                  </tr>
                </thead>
                <tbody>
                  ${colors.map((c, laneIdx) => {
                    // Find athletes registered for this event with exact Heat mapping
                    const matches = APP_STATE.students.filter(s => {
                      if (s.color !== c.name || !s.events || s.events.length === 0) return false;
                      if (ev.sport.includes('30m Sprint')) {
                        if (s.grade !== ev.minGrade) return false;
                        if (ev.gender !== 'Open' && s.gender !== ev.gender) return false;
                        return s.events.some(eventName => {
                          if (!eventName.includes('30m Sprint')) return false;
                          if (eventName.includes('Heat 1') && ev.heat === 1) return true;
                          if (eventName.includes('Heat 2') && ev.heat === 2) return true;
                          if (!eventName.includes('Heat')) {
                            const room1Classes = ['G1 Giraffe', 'G2 Zebra', 'G3 Eagle', 'G4 Leopard', 'G5 Liger', 'G6 Phoenix'];
                            const studentHeat = room1Classes.includes(s.class) ? 1 : 2;
                            return studentHeat === ev.heat;
                          }
                          return false;
                        });
                      }
                      return s.events.some(eventName => {
                        const evNorm = eventName.toLowerCase();
                        const sportNorm = ev.sport.toLowerCase();
                        return evNorm.includes(sportNorm) || ev.division.toLowerCase().includes(evNorm);
                      });
                    });
                    const athleteNames = matches.map(m => m.fullName).join(', ');
                    const nicknames = matches.map(m => m.nickname).join(', ');
                    const classes = matches.map(m => `${m.class} #${m.no}`).join(', ');

                    return `
                      <tr class="border border-slate-400">
                        <td class="p-1 text-center font-bold font-mono border border-slate-400">${laneIdx + 1}</td>
                        <td class="p-1 font-bold border border-slate-400">
                          <span class="inline-block w-2 h-2 rounded-full ${c.dotClass} mr-1"></span>
                          ${c.title}
                        </td>
                        <td class="p-1 border border-slate-400 font-semibold">${athleteNames || '<span class="text-slate-400 italic">____________________________</span>'}</td>
                        <td class="p-1 border border-slate-400 font-bold">${nicknames || '–'}</td>
                        <td class="p-1 border border-slate-400">${classes || '–'}</td>
                        <td class="p-1 text-center border border-slate-400 font-bold text-sm">[ &nbsp; ]</td>
                        <td class="p-1 text-center border border-slate-400">_____</td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>

              <div class="mt-1 text-[9px] text-slate-500 flex justify-between">
                <span>กรรมการประจำสนาม: ____________________</span>
                <span>ผู้บันทึกผล: ____________________</span>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  window.print();
}

// Render Teacher Duties View
function renderDutiesView(filterDept = 'all') {
  const container = document.getElementById('duties-grid-container');
  if (!container) return;

  const query = APP_STATE.dutySearchQuery;

  let filtered = TEACHER_DUTIES.filter(dept => {
    if (filterDept !== 'all' && !dept.category.toLowerCase().includes(filterDept.toLowerCase())) return false;
    if (query) {
      const matchCat = dept.category.toLowerCase().includes(query);
      const matchTeacher = dept.teachers.some(t => 
        t.name.toLowerCase().includes(query) || 
        t.role.toLowerCase().includes(query) ||
        (t.kingdom && t.kingdom.toLowerCase().includes(query))
      );
      return matchCat || matchTeacher;
    }
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-12 text-center text-slate-500 bg-white rounded-xl border border-slate-200">
        <p class="text-base font-semibold text-slate-700">No staff duties match your search query: "${query}".</p>
        <p class="text-xs text-slate-400 mt-1">Try searching for teacher names like "T.June", "T.Oil", "T.Iris", etc.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(dept => {
    let teachersContent = '';

    if (dept.colorGroups && dept.colorGroups.length > 0) {
      teachersContent = `
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
          ${dept.colorGroups.map(cg => `
            <div class="p-3 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between">
              <div class="flex items-center justify-between pb-2 mb-2 border-b border-slate-200">
                <span class="text-xs font-bold font-royal ${cg.color === 'Purple' ? 'text-purple-700' : cg.color === 'Red' ? 'text-rose-700' : cg.color === 'Yellow' ? 'text-amber-800' : 'text-emerald-700'}">
                  ${cg.kingdom}
                </span>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${cg.badgeClass}">
                  ${cg.colorTh} (${cg.teachers.length})
                </span>
              </div>
              <div class="space-y-1.5">
                ${cg.teachers.map(t => {
                  const isMatch = query && (t.name.toLowerCase().includes(query) || t.role.toLowerCase().includes(query));
                  const highlightClass = isMatch ? 'bg-amber-100 text-amber-950 border-amber-300 font-bold' : 'bg-white text-slate-800 border-slate-200';
                  return `
                    <div class="p-2 rounded-lg border ${highlightClass} flex items-center justify-between text-xs transition">
                      <span class="font-bold text-slate-900">${t.name}</span>
                      <span class="text-[11px] text-slate-500 font-medium">${t.role}</span>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      `;
    } else if (dept.teachers && dept.teachers.length > 0) {
      teachersContent = `
        <div class="space-y-1.5">
          ${dept.teachers.map(t => {
            const isMatch = query && (t.name.toLowerCase().includes(query) || t.role.toLowerCase().includes(query));
            const highlightClass = isMatch ? 'bg-amber-100 text-amber-950 border-amber-300 font-bold' : 'bg-slate-50 text-slate-800 border-slate-200';
            
            return `
              <div class="p-2.5 rounded-lg border ${highlightClass} flex items-center justify-between transition">
                <div class="flex items-center gap-2">
                  <span class="font-bold text-sm text-slate-900">${t.name}</span>
                </div>
                <span class="text-xs text-slate-600 font-medium text-right">${t.role}</span>
              </div>
            `;
          }).join('')}
        </div>
      `;
    }

    const totalStaffCount = dept.colorGroups 
      ? dept.colorGroups.reduce((acc, g) => acc + g.teachers.length, 0)
      : (dept.teachers ? dept.teachers.length : 0);

    const isFullWidth = dept.colorGroups ? 'lg:col-span-3' : '';

    const getDeptIcon = (cat) => {
      if (!window.TWS_ICONS) return '';
      if (cat.includes('MC')) return TWS_ICONS.megaphone('w-5 h-5 text-white');
      if (cat.includes('Award')) return TWS_ICONS.medal('w-5 h-5 text-white');
      if (cat.includes('Registration')) return TWS_ICONS.clipboard('w-5 h-5 text-white');
      if (cat.includes('Color')) return TWS_ICONS.shield('w-5 h-5 text-white');
      if (cat.includes('Referee')) return TWS_ICONS.zap('w-5 h-5 text-white');
      if (cat.includes('First Aid')) return TWS_ICONS.firstAid('w-5 h-5 text-white');
      if (cat.includes('Refreshment')) return TWS_ICONS.coffee('w-5 h-5 text-white');
      if (cat.includes('Sound')) return TWS_ICONS.volume('w-5 h-5 text-white');
      if (cat.includes('Photo')) return TWS_ICONS.camera('w-5 h-5 text-white');
      if (cat.includes('Traffic')) return TWS_ICONS.car('w-5 h-5 text-white');
      return TWS_ICONS.crown('w-5 h-5 text-white');
    };

    return `
      <div class="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:border-slate-300 transition ${isFullWidth}">
        <div class="p-4 border-b border-slate-100 bg-slate-50/90 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-[#0B1E36] text-white flex items-center justify-center font-bold text-lg shadow-sm">
              ${getDeptIcon(dept.category)}
            </div>
            <div>
              <h3 class="font-black text-slate-900 text-base leading-snug">${dept.category}</h3>
              <p class="text-xs font-semibold text-slate-500">${dept.categoryTh} • <span class="font-normal text-slate-400">${dept.description}</span></p>
            </div>
          </div>
          <span class="text-xs px-3 py-1 rounded-full bg-[#0B1E36] text-white font-mono font-bold shadow-sm whitespace-nowrap ml-2">
            ${totalStaffCount} Staff
          </span>
        </div>
        <div class="p-4 flex-1 flex flex-col justify-between space-y-3">
          ${teachersContent}
          ${dept.notes ? `
            <div class="mt-2 pt-2 border-t border-slate-100 text-[11px] text-[#0B1E36] flex items-center gap-1.5 font-semibold bg-slate-50 p-2 rounded-lg">
              ${window.TWS_ICONS ? TWS_ICONS.alertCircle('w-3.5 h-3.5 text-amber-600') : ''}
              <span>${dept.notes}</span>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');
}

// ==========================================
// SIBLING DIRECTORY (PRIMARY G.1 - G.6)
// ==========================================

// Setup Sibling View Listeners
function setupSiblingFilters() {
  const searchInput = document.getElementById('sibling-search-input');
  const colorFilter = document.getElementById('sibling-color-filter');
  const resetBtn = document.getElementById('btn-reset-sibling-search');
  const quickTags = document.querySelectorAll('.sibling-quick-tag');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      APP_STATE.siblingSearchQuery = e.target.value.trim().toLowerCase();
      renderSiblingsView();
    });
  }

  if (colorFilter) {
    colorFilter.addEventListener('change', (e) => {
      APP_STATE.siblingColorFilter = e.target.value;
      renderSiblingsView();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      APP_STATE.siblingSearchQuery = '';
      APP_STATE.siblingColorFilter = 'all';
      if (searchInput) searchInput.value = '';
      if (colorFilter) colorFilter.value = 'all';
      renderSiblingsView();
    });
  }

  quickTags.forEach(tag => {
    tag.addEventListener('click', () => {
      const q = tag.getAttribute('data-tag');
      APP_STATE.siblingSearchQuery = q.toLowerCase();
      if (searchInput) searchInput.value = q;
      renderSiblingsView();
    });
  });
}

// Build Family Groups from Primary Students Roster (G.1–G.6)
let CACHED_SIBLING_GROUPS = null;

function buildSiblingGroups() {
  if (CACHED_SIBLING_GROUPS) return CACHED_SIBLING_GROUPS;

  const primaryStudents = (typeof APP_STATE !== 'undefined' && APP_STATE.students && APP_STATE.students.length > 0)
    ? APP_STATE.students
    : (typeof INITIAL_STUDENTS !== 'undefined' ? INITIAL_STUDENTS : []);

  // Normalize student objects for Primary matching
  const allStudents = primaryStudents.map(s => {
    const parts = s.fullName.trim().split(/\s+/);
    const surname = parts.length >= 2 ? parts[parts.length - 1].trim() : '';

    return {
      uid: 'PRI-' + s.id,
      id: s.id,
      class: s.class,
      grade: s.grade,
      no: s.no,
      fullName: s.fullName,
      surname: surname,
      nickname: s.nickname || '',
      gender: s.gender || '',
      color: s.color,
      kingdom: s.kingdom || '',
      note: s.sibling || '',
      eventsCount: s.events ? s.events.length : 0
    };
  });

  // Disjoint Set / Union-Find to group siblings together
  const parent = {};
  function find(x) {
    if (!parent[x]) parent[x] = x;
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }
  function union(x, y) {
    const rx = find(x);
    const ry = find(y);
    if (rx !== ry) parent[rx] = ry;
  }

  allStudents.forEach(s => { parent[s.uid] = s.uid; });

  // 1. Strict Explicit Sibling Cross-References Matching (ไม่อิงนามสกุล ไม่สุ่มเดาจากชื่อเล่นที่เหมือนกัน)
  // แมตช์เฉพาะกรณีที่หมายเหตุของเด็กระบุชื่อเล่นและระดับชั้นของอีกคนไว้อย่างเจาะจง
  allStudents.forEach(s1 => {
    const note1 = (s1.note || '').toLowerCase().trim();
    if (!note1 || note1 === '-' || note1 === 'x') return;

    allStudents.forEach(s2 => {
      if (s1.uid === s2.uid) return;
      const nick2 = (s2.nickname || '').toLowerCase().trim();
      if (!nick2 || nick2.length < 2) return;

      // Check if note mentions student's nickname
      const regexNick = new RegExp('\\b' + nick2 + '\\b', 'i');
      if (regexNick.test(note1)) {
        // If note specifies a grade e.g. "G4", "G.1", "G6", "G5/1", verify that s2 is indeed in that grade
        const gradeMatches = note1.match(/g\.?\s*([1-6])/i);
        if (gradeMatches) {
          const mentionedGrade = parseInt(gradeMatches[1], 10);
          if (s2.grade === mentionedGrade) {
            union(s1.uid, s2.uid);
          }
        } else {
          // Explicit names without grade mention in note (e.g. "Captain, Machine" in KANKLANGDON)
          // Verify with shared surname to avoid accidental coincidences
          if (s1.surname && s2.surname && s1.surname.toLowerCase() === s2.surname.toLowerCase()) {
            union(s1.uid, s2.uid);
          }
        }
      }
    });
  });

  // 2. Verified Explicit Master Primary Families (26 ครอบครัวที่โรงเรียนยืนยันในบันทึกทะเบียน)
  const EXPLICIT_TWS_PRIMARY_PAIRS = [
    { nickA: 'Brabus', gradeA: 1, nickB: 'BRING', gradeB: 4 },
    { nickA: 'Brabus', gradeA: 1, nickB: 'BRIGHT', gradeB: 4 },
    { nickA: 'Jasmine', gradeA: 1, nickB: 'Machine', gradeB: 2 },
    { nickA: 'Machine', gradeA: 2, nickB: 'Captain', gradeB: 5 },
    { nickA: 'FREEN', gradeA: 1, nickB: 'FORTH', gradeB: 4 },
    { nickA: 'Marty', gradeA: 1, nickB: 'Mata', gradeB: 4 },
    { nickA: 'Yuki', gradeA: 1, nickB: 'Ikkyu', gradeB: 4 },
    { nickA: 'Kira', gradeA: 1, nickB: 'August', gradeB: 3 },
    { nickA: 'Peach', gradeA: 1, nickB: 'Phat', gradeB: 4 },
    { nickA: 'Whanwhan', gradeA: 1, nickB: 'Wawa', gradeB: 3 },
    { nickA: 'Pakin', gradeA: 2, nickB: 'Nitcha', gradeB: 5 },
    { nickA: 'Munich', gradeA: 2, nickB: 'Nana', gradeB: 5 },
    { nickA: 'Pope', gradeA: 2, nickB: 'PROM', gradeB: 4 },
    { nickA: 'Rainny', gradeA: 2, nickB: 'Summer', gradeB: 5 },
    { nickA: 'Putter', gradeA: 2, nickB: 'Pream', gradeB: 4 },
    { nickA: 'Mimi', gradeA: 2, nickB: 'Kyokyo', gradeB: 3 },
    { nickA: 'JEEDA', gradeA: 3, nickB: 'JJ', gradeB: 6 },
    { nickA: 'Yoshi', gradeA: 3, nickB: 'Mari', gradeB: 6 },
    { nickA: 'Richa', gradeA: 3, nickB: 'Nara', gradeB: 6 },
    { nickA: 'KHUN', gradeA: 3, nickB: 'Prem', gradeB: 5 },
    { nickA: 'Thee', gradeA: 3, nickB: 'THAM', gradeB: 5 },
    { nickA: 'Tin', gradeA: 4, nickB: 'KAOTANG', gradeB: 6 },
    { nickA: 'NARM', gradeA: 4, nickB: 'Nymph', gradeB: 6 },
    { nickA: 'Nicha', gradeA: 4, nickB: 'Preeya', gradeB: 6 },
    { nickA: 'TEYA', gradeA: 4, nickB: 'TEIN', gradeB: 6 },
    { nickA: 'Ririn', gradeA: 4, nickB: 'Hammer', gradeB: 6 },
    { nickA: 'Tonkaew', gradeA: 5, nickB: 'TONMAI', gradeB: 6 },
    { nickA: 'Endoo', gradeA: 5, nickB: 'KONPROD', gradeB: 6 }
  ];

  EXPLICIT_TWS_PRIMARY_PAIRS.forEach(pair => {
    const sA = allStudents.find(s => s.nickname.toLowerCase() === pair.nickA.toLowerCase() && s.grade === pair.gradeA);
    const sB = allStudents.find(s => s.nickname.toLowerCase() === pair.nickB.toLowerCase() && s.grade === pair.gradeB);
    if (sA && sB) {
      union(sA.uid, sB.uid);
    }
  });

  // Group into families
  const groups = {};
  allStudents.forEach(s => {
    const root = find(s.uid);
    if (!groups[root]) groups[root] = [];
    groups[root].push(s);
  });

  // Filter only groups with 2 or more members
  const families = [];
  let familyId = 1;
  Object.values(groups).forEach(members => {
    if (members.length >= 2) {
      // Check colors alignment
      const colors = new Set(members.map(m => m.color));
      const isSameColor = colors.size === 1;
      const dominantColor = members[0].color;

      const mainSurname = members[0].surname || 'Techawit Family';

      families.push({
        id: familyId++,
        mainSurname: mainSurname,
        color: dominantColor,
        isSameColor: isSameColor,
        members: members.sort((a, b) => b.grade - a.grade || a.no - b.no)
      });
    }
  });

  // Sort families by member count descending, then surname
  families.sort((a, b) => {
    if (b.members.length !== a.members.length) return b.members.length - a.members.length;
    return a.mainSurname.localeCompare(b.mainSurname);
  });

  CACHED_SIBLING_GROUPS = families;
  return families;
}

// Render Primary Sibling Directory View
function renderSiblingsView() {
  const container = document.getElementById('sibling-cards-container');
  const emptyState = document.getElementById('sibling-empty-state');
  const familyCountEl = document.getElementById('sibling-family-count');
  const linkedCountEl = document.getElementById('sibling-linked-count');
  const matchStatusEl = document.getElementById('sibling-match-status');

  if (!container) return;

  const allFamilies = buildSiblingGroups();

  // Apply filters
  const q = APP_STATE.siblingSearchQuery;
  const colorFilter = APP_STATE.siblingColorFilter;

  const filtered = allFamilies.filter(fam => {
    // Color filter
    if (colorFilter !== 'all' && fam.color !== colorFilter) {
      return false;
    }

    // Search query filter
    if (q) {
      const matchInMembers = fam.members.some(m => {
        const text = `${m.fullName} ${m.nickname} ${m.class} ${m.note} ${m.surname}`.toLowerCase();
        return text.includes(q);
      });
      const matchInSurname = fam.mainSurname.toLowerCase().includes(q);
      if (!matchInMembers && !matchInSurname) return false;
    }

    return true;
  });

  // Update Stats
  const totalLinkedStudents = filtered.reduce((acc, f) => acc + f.members.length, 0);
  const allMatched = filtered.every(f => f.isSameColor);

  if (familyCountEl) familyCountEl.textContent = `${filtered.length} Families`;
  if (linkedCountEl) linkedCountEl.textContent = `${totalLinkedStudents} Athletes`;
  if (matchStatusEl) {
    if (allMatched) {
      matchStatusEl.innerHTML = `<span class="inline-flex items-center gap-1 text-emerald-700">${window.TWS_ICONS ? TWS_ICONS.check('w-3.5 h-3.5 text-emerald-600') : ''}<span>100% Verified</span></span>`;
    } else {
      matchStatusEl.innerHTML = `<span class="inline-flex items-center gap-1 text-rose-600 font-bold">${window.TWS_ICONS ? TWS_ICONS.alertCircle('w-3.5 h-3.5 text-rose-600') : ''}<span>Review Needed</span></span>`;
    }
  }

  if (filtered.length === 0) {
    container.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');

  const colorThemes = {
    Purple: {
      border: 'border-purple-200',
      headerBg: 'bg-purple-50',
      badgeBg: 'bg-purple-100 text-purple-800 border-purple-300',
      accentDot: 'bg-purple-600',
      name: 'Ametrine Empire (สีม่วง)'
    },
    Red: {
      border: 'border-rose-200',
      headerBg: 'bg-rose-50',
      badgeBg: 'bg-rose-100 text-rose-800 border-rose-300',
      accentDot: 'bg-rose-600',
      name: 'Crimson Dragon (สีแดง)'
    },
    Yellow: {
      border: 'border-amber-200',
      headerBg: 'bg-amber-50',
      badgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
      accentDot: 'bg-amber-600',
      name: 'Golden Realm (สีเหลือง)'
    },
    Green: {
      border: 'border-emerald-200',
      headerBg: 'bg-emerald-50',
      badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      accentDot: 'bg-emerald-600',
      name: 'Jade Dynasty (สีเขียว)'
    }
  };

  container.innerHTML = filtered.map(fam => {
    const theme = colorThemes[fam.color] || colorThemes.Purple;

    const membersHtml = fam.members.map(m => {
      return `
        <div class="p-4 rounded-xl border border-[rgba(0,0,0,0.08)] bg-white hover:border-slate-300 transition shadow-xs flex flex-col justify-between anti-overflow-card">
          <div class="min-w-0">
            <div class="flex items-center justify-between gap-2 mb-2 flex-wrap">
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#0B1E36] text-white">
                Grade ${m.grade} (${m.class})
              </span>
              <span class="inline-flex items-center gap-1 text-[11px] font-bold ${theme.badgeBg} px-2.5 py-0.5 rounded-full border">
                <span class="w-1.5 h-1.5 rounded-full ${theme.accentDot}"></span>
                ${m.color}
              </span>
            </div>

            <div class="font-bold text-sm text-[#0B1E36] leading-snug">
              ${m.fullName}
            </div>
            
            <div class="text-xs font-semibold text-amber-800 mt-1 flex flex-wrap items-center gap-1">
              <span>Nickname:</span>
              <span class="text-slate-900 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">${m.nickname || '-'}</span>
              <span class="text-slate-500 font-normal ml-1">(${m.gender})</span>
            </div>
          </div>

          <div class="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 flex-wrap gap-1">
            <span class="font-medium">#${m.id} • ${m.eventsCount} Events</span>
            ${m.note ? `<span class="text-[11px] text-slate-400 italic truncate-1 max-w-[140px]" title="${m.note}">Ref: ${m.note}</span>` : ''}
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="rounded-2xl border ${theme.border} bg-white shadow-xs overflow-hidden transition hover:shadow-whisper anti-overflow-card">
        <!-- Family Card Header -->
        <div class="${theme.headerBg} px-4 sm:px-5 py-3 border-b ${theme.border} flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div class="flex items-center gap-2.5 flex-wrap min-w-0">
            <span class="w-2.5 h-2.5 rounded-full ${theme.accentDot}"></span>
            <h3 class="font-bold text-sm sm:text-base text-[#0B1E36] truncate-1">
              Family #${fam.id}: ${fam.mainSurname}
            </h3>
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/90 border border-slate-200 text-slate-700">
              ${fam.members.length} Primary Siblings
            </span>
          </div>

          <div class="flex items-center gap-2">
            <div class="inline-flex items-center gap-1.5 text-xs font-bold ${fam.isSameColor ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : 'text-rose-700 bg-rose-50 border-rose-200'} px-2.5 py-1 rounded-lg border">
              ${fam.isSameColor 
                ? (window.TWS_ICONS ? TWS_ICONS.check('w-3.5 h-3.5 text-emerald-600') : '') + '<span>Same Color Verified</span>'
                : (window.TWS_ICONS ? TWS_ICONS.alertCircle('w-3.5 h-3.5 text-rose-600') : '') + '<span>Color Mismatch</span>'
              }
              <span class="text-[11px] font-medium text-slate-600">(${theme.name})</span>
            </div>
          </div>
        </div>

        <!-- Family Members Grid -->
        <div class="p-4 bg-slate-50/50">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            ${membersHtml}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ==========================================
// 1. LIVE SCOREBOARD & MEDAL TALLY CONTROLLER
// ==========================================

function initScoreboardData() {
  const stored = localStorage.getItem(SCOREBOARD_STORAGE_KEY);
  if (stored) {
    try {
      APP_STATE.eventScores = JSON.parse(stored);
    } catch (e) {
      APP_STATE.eventScores = {};
    }
  } else {
    APP_STATE.eventScores = {};
  }

  // Check if session referee auth exists
  const authSession = sessionStorage.getItem(REFEREE_SESSION_KEY);
  if (authSession === 'authorized') {
    APP_STATE.isRefereeAuthorized = true;
  }
}

function saveScoreboardData() {
  localStorage.setItem(SCOREBOARD_STORAGE_KEY, JSON.stringify(APP_STATE.eventScores));
  renderScoreboardView();
  showAutoSaveIndicator('Scores Saved');
}

function setupScoreboardHandlers() {
  const resetBtn = document.getElementById('btn-reset-scores');
  const quickFillBtn = document.getElementById('btn-quick-fill-modal');
  const closeResultModal = document.getElementById('btn-close-result-modal');
  const cancelResultModal = document.getElementById('btn-cancel-result-modal');
  const saveResultModal = document.getElementById('btn-save-result-modal');

  // Referee Mode & PIN elements
  const toggleRefBtn = document.getElementById('btn-toggle-referee-mode');
  const pinModal = document.getElementById('referee-pin-modal');
  const pinInput = document.getElementById('referee-pin-input');
  const pinError = document.getElementById('referee-pin-error');
  const cancelPinBtn = document.getElementById('btn-cancel-pin-modal');
  const submitPinBtn = document.getElementById('btn-submit-pin');

  if (toggleRefBtn) {
    toggleRefBtn.addEventListener('click', () => {
      if (APP_STATE.isRefereeAuthorized) {
        // Log out referee mode
        APP_STATE.isRefereeAuthorized = false;
        sessionStorage.removeItem(REFEREE_SESSION_KEY);
        updateRefereeModeUI();
      } else {
        // Open PIN modal
        if (pinInput) pinInput.value = '';
        if (pinError) pinError.classList.add('hidden');
        if (pinModal) pinModal.classList.remove('hidden');
        setTimeout(() => { if (pinInput) pinInput.focus(); }, 150);
      }
    });
  }

  if (cancelPinBtn && pinModal) {
    cancelPinBtn.addEventListener('click', () => {
      pinModal.classList.add('hidden');
    });
  }

  if (submitPinBtn && pinInput) {
    submitPinBtn.addEventListener('click', () => {
      verifyRefereePin();
    });
    pinInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') verifyRefereePin();
    });
  }

  // Rate Limiting & Brute Force Defense
  let pinAttempts = parseInt(sessionStorage.getItem('referee_pin_attempts') || '0', 10);
  let lockoutUntil = parseInt(sessionStorage.getItem('referee_lockout_until') || '0', 10);

  async function sha256(str) {
    const buffer = new TextEncoder().encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  async function verifyRefereePin() {
    const now = Date.now();
    if (lockoutUntil && now < lockoutUntil) {
      const waitSecs = Math.ceil((lockoutUntil - now) / 1000);
      alert(`ใส่รหัสผ่านผิดเกินกำหนด ระบบล็อกชั่วคราว กรุณารออีก ${waitSecs} วินาที`);
      return;
    }

    const val = pinInput.value.trim();
    if (!val) return;

    const inputHash = await sha256(val);

    if (inputHash === REFEREE_PIN_HASH) {
      // Success
      pinAttempts = 0;
      sessionStorage.removeItem('referee_pin_attempts');
      sessionStorage.removeItem('referee_lockout_until');

      APP_STATE.isRefereeAuthorized = true;
      sessionStorage.setItem(REFEREE_SESSION_KEY, 'authorized');
      if (pinModal) pinModal.classList.add('hidden');
      updateRefereeModeUI();
      showAutoSaveIndicator('Referee Mode Activated');
    } else {
      // Failure - Increment Attempt Counter
      pinAttempts += 1;
      sessionStorage.setItem('referee_pin_attempts', pinAttempts.toString());

      if (pinAttempts >= 4) {
        lockoutUntil = Date.now() + 60000; // Lockout for 60 seconds
        sessionStorage.setItem('referee_lockout_until', lockoutUntil.toString());
        alert('ใส่รหัสผ่านผิดเกิน 4 ครั้ง! ระบบล็อกการเข้าถึง 60 วินาที เพื่อป้องกันการสุ่มรหัส');
      }

      if (pinError) {
        pinError.classList.remove('hidden');
        pinError.textContent = pinAttempts >= 4 
          ? 'ระบบล็อกชั่วคราว 60 วินาที (กรุณาลองใหม่ภายหลัง)' 
          : `รหัสผ่าน PIN ไม่ถูกต้อง (เหลือโอกาสลองอีก ${4 - pinAttempts} ครั้ง)`;
      }
      pinInput.value = '';
      pinInput.focus();
    }
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (!APP_STATE.isRefereeAuthorized) {
        alert('สิทธิ์เฉพาะครูกรรมการตัดสินเท่านั้น กรุณาปลดล็อกรหัส PIN');
        return;
      }
      if (confirm('คุณต้องการรีเซ็ตผลคะแนนกีฬาทั้งหมดกลับเป็น 0 ใช่หรือไม่?')) {
        APP_STATE.eventScores = {};
        saveScoreboardData();
      }
    });
  }

  if (quickFillBtn) {
    quickFillBtn.addEventListener('click', () => {
      if (!APP_STATE.isRefereeAuthorized) {
        alert('สิทธิ์เฉพาะครูกรรมการตัดสินเท่านั้น กรุณาปลดล็อกรหัส PIN');
        return;
      }
      openRecordResultModal(0);
    });
  }

  if (closeResultModal) {
    closeResultModal.addEventListener('click', closeRecordResultModal);
  }
  if (cancelResultModal) {
    cancelResultModal.addEventListener('click', closeRecordResultModal);
  }
  if (saveResultModal) {
    saveResultModal.addEventListener('click', () => {
      if (!APP_STATE.isRefereeAuthorized) {
        alert('สิทธิ์เฉพาะครูกรรมการตัดสินเท่านั้น กรุณาปลดล็อกรหัส PIN');
        return;
      }
      const evId = parseInt(document.getElementById('modal-result-event-id').value, 10);
      const gold = document.getElementById('select-winner-gold').value;
      const silver = document.getElementById('select-winner-silver').value;
      const bronze = document.getElementById('select-winner-bronze').value;

      if (!APP_STATE.eventScores) APP_STATE.eventScores = {};
      APP_STATE.eventScores[evId] = { gold, silver, bronze };
      saveScoreboardData();
      closeRecordResultModal();
    });
  }
}

function updateRefereeModeUI() {
  const badge = document.getElementById('referee-lock-badge');
  const toggleBtn = document.getElementById('btn-toggle-referee-mode');
  const actions = document.querySelectorAll('.referee-action');

  if (APP_STATE.isRefereeAuthorized) {
    if (badge) {
      badge.className = 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300';
      badge.innerHTML = `${window.TWS_ICONS ? TWS_ICONS.unlock('w-3.5 h-3.5 text-emerald-700') : ''}<span>Referee Mode (ครูกรรมการตัดสิน)</span>`;
    }
    if (toggleBtn) {
      toggleBtn.className = 'px-3.5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-xs font-bold text-slate-700 shadow-sm transition flex items-center gap-1.5';
      toggleBtn.innerHTML = `${window.TWS_ICONS ? TWS_ICONS.lock('w-3.5 h-3.5 text-slate-600') : ''}<span>ล็อกสิทธิ์แก้ไข</span>`;
    }
    actions.forEach(a => a.classList.remove('hidden'));
  } else {
    if (badge) {
      badge.className = 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200';
      badge.innerHTML = `${window.TWS_ICONS ? TWS_ICONS.lock('w-3.5 h-3.5 text-slate-500') : ''}<span>View Only (ผู้ชมทั่วไป)</span>`;
    }
    if (toggleBtn) {
      toggleBtn.className = 'px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-xs font-bold text-white shadow-sm transition flex items-center gap-1.5';
      toggleBtn.innerHTML = `${window.TWS_ICONS ? TWS_ICONS.key('w-3.5 h-3.5 text-white') : ''}<span>ปลดล็อกโหมดผู้ตัดสิน</span>`;
    }
    actions.forEach(a => a.classList.add('hidden'));
  }

  renderScoreboardView();
  renderCallRoomView();
}

function openRecordResultModal(eventIndex) {
  if (!APP_STATE.isRefereeAuthorized) {
    // Open PIN unlock modal first if not authorized
    const pinModal = document.getElementById('referee-pin-modal');
    const pinInput = document.getElementById('referee-pin-input');
    const pinError = document.getElementById('referee-pin-error');
    if (pinInput) pinInput.value = '';
    if (pinError) pinError.classList.add('hidden');
    if (pinModal) pinModal.classList.remove('hidden');
    setTimeout(() => { if (pinInput) pinInput.focus(); }, 150);
    return;
  }

  const modal = document.getElementById('record-result-modal');
  const evTitle = document.getElementById('modal-result-event-name');
  const evIdInput = document.getElementById('modal-result-event-id');
  const goldSelect = document.getElementById('select-winner-gold');
  const silverSelect = document.getElementById('select-winner-silver');
  const bronzeSelect = document.getElementById('select-winner-bronze');

  if (!modal || typeof MASTER_EVENT_CODES === 'undefined') return;

  const ev = MASTER_EVENT_CODES[eventIndex] || MASTER_EVENT_CODES[0];
  evTitle.textContent = `${ev.sport} - ${ev.division} (Call: ${ev.callTime})`;
  evIdInput.value = eventIndex;

  const currentResult = (APP_STATE.eventScores && APP_STATE.eventScores[eventIndex]) || { gold: '', silver: '', bronze: '' };
  goldSelect.value = currentResult.gold || '';
  silverSelect.value = currentResult.silver || '';
  bronzeSelect.value = currentResult.bronze || '';

  modal.classList.remove('hidden');
}

function closeRecordResultModal() {
  const modal = document.getElementById('record-result-modal');
  if (modal) modal.classList.add('hidden');
}

function renderScoreboardView() {
  const grid = document.getElementById('scoreboard-leaderboard-grid');
  const tbody = document.getElementById('scoreboard-table-body');
  if (!grid || typeof MASTER_EVENT_CODES === 'undefined') return;

  // Calculate medals and points for each color
  // Gold = 5 pts, Silver = 3 pts, Bronze = 1 pt
  const standings = {
    Purple: { name: 'Amethyst Empire', color: 'Purple', thai: 'สีม่วง', gold: 0, silver: 0, bronze: 0, points: 0, bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-900', badge: 'bg-purple-100 text-purple-800' },
    Red: { name: 'Crimson Dragon', color: 'Red', thai: 'สีแดง', gold: 0, silver: 0, bronze: 0, points: 0, bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-900', badge: 'bg-rose-100 text-rose-800' },
    Yellow: { name: 'Golden Realm', color: 'Yellow', thai: 'สีเหลือง', gold: 0, silver: 0, bronze: 0, points: 0, bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-900', badge: 'bg-amber-100 text-amber-800' },
    Green: { name: 'Jade Dynasty', color: 'Green', thai: 'สีเขียว', gold: 0, silver: 0, bronze: 0, points: 0, bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-900', badge: 'bg-emerald-100 text-emerald-800' }
  };

  const scores = APP_STATE.eventScores || {};
  Object.values(scores).forEach(res => {
    if (res.gold && standings[res.gold]) {
      standings[res.gold].gold += 1;
      standings[res.gold].points += 5;
    }
    if (res.silver && standings[res.silver]) {
      standings[res.silver].silver += 1;
      standings[res.silver].points += 3;
    }
    if (res.bronze && standings[res.bronze]) {
      standings[res.bronze].bronze += 1;
      standings[res.bronze].points += 1;
    }
  });

  // Sort standings by Total Points descending, then Gold, then Silver
  const sortedStandings = Object.values(standings).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.gold !== a.gold) return b.gold - a.gold;
    return b.silver - a.silver;
  });

  const rankBadges = [
    `<span class="inline-flex items-center gap-1">${window.TWS_ICONS ? TWS_ICONS.crown('w-3.5 h-3.5 text-amber-500') : ''} 1st Rank</span>`,
    `<span class="inline-flex items-center gap-1">${window.TWS_ICONS ? TWS_ICONS.medalSilver('w-3.5 h-3.5') : ''} 2nd Rank</span>`,
    `<span class="inline-flex items-center gap-1">${window.TWS_ICONS ? TWS_ICONS.medalBronze('w-3.5 h-3.5') : ''} 3rd Rank</span>`,
    `<span>4th Place</span>`
  ];

  grid.innerHTML = sortedStandings.map((team, idx) => {
    return `
      <div class="rounded-2xl border ${team.border} ${team.bg} p-5 shadow-sm space-y-3 relative overflow-hidden transition hover:shadow-md">
        <div class="flex items-center justify-between">
          <span class="px-2.5 py-0.5 rounded-full text-xs font-black ${team.badge} border">
            ${rankBadges[idx]}
          </span>
          <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">${team.color}</span>
        </div>

        <div>
          <h4 class="text-lg font-black font-royal ${team.text}">${team.name}</h4>
          <div class="text-xs font-bold text-slate-600">${team.thai}</div>
        </div>

        <div class="py-2 border-y border-slate-200/60 flex items-baseline justify-between">
          <span class="text-xs uppercase font-bold text-slate-500">คะแนนรวม (Points)</span>
          <span class="text-3xl font-black font-mono ${team.text}">${team.points} <span class="text-xs font-sans font-bold text-slate-500">pts</span></span>
        </div>

        <!-- Medals Breakdown -->
        <div class="grid grid-cols-3 gap-1.5 text-center text-xs">
          <div class="p-2 rounded-xl bg-white/80 border border-slate-200/80 shadow-2xs">
            <div class="text-base font-black text-amber-600 font-mono">${team.gold}</div>
            <div class="text-[10px] font-bold text-slate-500 flex items-center justify-center gap-0.5 mt-0.5">
              ${window.TWS_ICONS ? TWS_ICONS.medalGold('w-3 h-3') : ''}
              <span>ทอง</span>
            </div>
          </div>
          <div class="p-2 rounded-xl bg-white/80 border border-slate-200/80 shadow-2xs">
            <div class="text-base font-black text-slate-600 font-mono">${team.silver}</div>
            <div class="text-[10px] font-bold text-slate-500 flex items-center justify-center gap-0.5 mt-0.5">
              ${window.TWS_ICONS ? TWS_ICONS.medalSilver('w-3 h-3') : ''}
              <span>เงิน</span>
            </div>
          </div>
          <div class="p-2 rounded-xl bg-white/80 border border-slate-200/80 shadow-2xs">
            <div class="text-base font-black text-amber-800 font-mono">${team.bronze}</div>
            <div class="text-[10px] font-bold text-slate-500 flex items-center justify-center gap-0.5 mt-0.5">
              ${window.TWS_ICONS ? TWS_ICONS.medalBronze('w-3 h-3') : ''}
              <span>ทองแดง</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Populate Table Body
  if (tbody) {
    tbody.innerHTML = MASTER_EVENT_CODES.map((ev, idx) => {
      const res = scores[idx] || {};
      const goldBadge = res.gold ? `<span class="px-2.5 py-1 rounded-md text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">${res.gold}</span>` : `<span class="text-slate-400 text-xs italic">-</span>`;
      const silverBadge = res.silver ? `<span class="px-2.5 py-1 rounded-md text-xs font-bold bg-slate-200 text-slate-800 border border-slate-300">${res.silver}</span>` : `<span class="text-slate-400 text-xs italic">-</span>`;
      const bronzeBadge = res.bronze ? `<span class="px-2.5 py-1 rounded-md text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">${res.bronze}</span>` : `<span class="text-slate-400 text-xs italic">-</span>`;

      const actionBtn = APP_STATE.isRefereeAuthorized
        ? `<button onclick="openRecordResultModal(${idx})" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#0B1E36] hover:bg-[#162F52] text-white transition shadow-2xs">
            ${window.TWS_ICONS ? TWS_ICONS.edit('w-3.5 h-3.5 text-white') : ''}
            <span>แก้ไขผล</span>
          </button>`
        : `<button onclick="openRecordResultModal(${idx})" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-500 transition border border-slate-200">
            ${window.TWS_ICONS ? TWS_ICONS.lock('w-3 h-3 text-slate-400') : ''}
            <span>ผู้ตัดสิน</span>
          </button>`;

      return `
        <tr class="hover:bg-slate-50 transition border-b border-slate-200 bg-white">
          <td class="py-2.5 px-3 text-center font-bold text-slate-400 font-mono text-xs">${idx + 1}</td>
          <td class="py-2.5 px-3 font-bold text-[#0B1E36]">
            ${ev.sport}
            <div class="text-[11px] text-slate-400 font-medium">แข่งเวลา: ${ev.startTime} – ${ev.endTime} น.</div>
          </td>
          <td class="py-2.5 px-3 text-xs font-semibold text-slate-600">
            ${ev.division}
          </td>
          <td class="py-2.5 px-3 text-center">${goldBadge}</td>
          <td class="py-2.5 px-3 text-center">${silverBadge}</td>
          <td class="py-2.5 px-3 text-center">${bronzeBadge}</td>
          <td class="py-2.5 px-3 text-center">
            ${actionBtn}
          </td>
        </tr>
      `;
    }).join('');
  }
}

// ==========================================
// 2. CALL ROOM & ATHLETE MARSHALING QUEUE
// ==========================================

function setupCallRoomFilters() {
  document.querySelectorAll('[data-callroom-color]').forEach(btn => {
    btn.addEventListener('click', () => {
      const color = btn.getAttribute('data-callroom-color');
      APP_STATE.callroomColorFilter = color;

      document.querySelectorAll('[data-callroom-color]').forEach(b => {
        if (b.getAttribute('data-callroom-color') === color) {
          b.className = 'callroom-color-pill px-3 py-1.5 rounded-xl text-xs font-bold bg-[#0B1E36] text-white transition shadow-xs';
        } else {
          b.className = 'callroom-color-pill px-3 py-1.5 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 transition shadow-xs';
        }
      });

      renderCallRoomView();
    });
  });
}

function renderCallRoomView() {
  const container = document.getElementById('callroom-schedule-cards');
  if (!container || typeof MASTER_EVENT_CODES === 'undefined') return;

  const targetColor = APP_STATE.callroomColorFilter || 'all';

  container.innerHTML = MASTER_EVENT_CODES.map((ev, idx) => {
    // Find registered athletes for this event across students with exact Grade/Gender/Heat matching
    const athletes = APP_STATE.students.filter(s => {
      if (!s.events || s.events.length === 0) return false;
      if (targetColor !== 'all' && s.color !== targetColor) return false;
      
      // If it's a 30m Sprint event, check grade, gender, and heat
      if (ev.sport.includes('30m Sprint')) {
        if (s.grade !== ev.minGrade) return false;
        if (ev.gender !== 'Open' && s.gender !== ev.gender) return false;
        
        return s.events.some(eventName => {
          if (!eventName.includes('30m Sprint')) return false;
          // If student explicitly registered for Heat 1 or Heat 2
          if (eventName.includes('Heat 1') && ev.heat === 1) return true;
          if (eventName.includes('Heat 2') && ev.heat === 2) return true;
          // Legacy generic registration: map based on student's classroom
          if (!eventName.includes('Heat')) {
            const room1Classes = ['G1 Giraffe', 'G2 Zebra', 'G3 Eagle', 'G4 Leopard', 'G5 Liger', 'G6 Phoenix'];
            const studentHeat = room1Classes.includes(s.class) ? 1 : 2;
            return studentHeat === ev.heat;
          }
          return false;
        });
      }

      // Other sports: match by sport name or division
      return s.events.some(eventName => {
        const evNorm = eventName.toLowerCase();
        const sportNorm = ev.sport.toLowerCase();
        return evNorm.includes(sportNorm) || ev.division.toLowerCase().includes(evNorm);
      });
    });

    const colorPills = {
      Purple: 'bg-purple-100 text-purple-800 border-purple-200',
      Red: 'bg-rose-100 text-rose-800 border-rose-200',
      Yellow: 'bg-amber-100 text-amber-800 border-amber-200',
      Green: 'bg-emerald-100 text-emerald-800 border-emerald-200'
    };

    const athletesHtml = (athletes.length > 0)
      ? athletes.map(a => `
          <div class="p-2.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-2 shadow-2xs">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded text-[10px] font-bold border ${colorPills[a.color] || 'bg-slate-100'}">${a.color}</span>
              <div>
                <div class="font-bold text-xs text-[#0B1E36]">${a.fullName}</div>
                <div class="text-[11px] text-amber-800 font-semibold">ชื่อเล่น: <strong class="text-slate-900">${a.nickname}</strong> (${a.class} #${a.no})</div>
              </div>
            </div>
            <span class="text-[10px] font-mono font-bold text-slate-400">Athlete #${a.id}</span>
          </div>
        `).join('')
      : `<div class="p-3 text-xs text-slate-400 italic bg-white rounded-xl border border-slate-200 text-center">ยังไม่มีรายชื่อนักกีฬาที่ลงทะเบียนในรายการนี้</div>`;

    return `
      <div class="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden transition hover:shadow-md">
        <!-- Call Card Header -->
        <div class="bg-slate-50 px-4 py-3 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <div class="px-3 py-1.5 rounded-xl bg-[#0B1E36] text-white text-center min-w-[70px]">
              <div class="text-[9px] uppercase font-bold text-slate-300">Call Time</div>
              <div class="text-sm font-black font-mono">${ev.callTime}</div>
            </div>
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <span class="text-xs font-black uppercase text-amber-800">Event #${idx + 1}</span>
                <span class="text-slate-300">•</span>
                <span class="text-xs font-bold text-slate-600">Start: ${ev.startTime} – ${ev.endTime} น.</span>
              </div>
              <h3 class="font-bold text-base text-[#0B1E36] font-royal mt-0.5">${ev.sport} - ${ev.division}</h3>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <span class="text-xs font-bold px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
              โควตา: ${ev.quota} คน/สี
            </span>
            ${APP_STATE.isRefereeAuthorized 
              ? `<button onclick="openRecordResultModal(${idx})" class="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition">
                  ${window.TWS_ICONS ? TWS_ICONS.medal('w-3.5 h-3.5 text-amber-600') : ''}
                  <span>บันทึกผล</span>
                </button>`
              : ''
            }
          </div>
        </div>

        <!-- Athletes Check-in List -->
        <div class="p-4 bg-slate-50/40">
          <div class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>รายชื่อนักกีฬาที่ต้องรายงานตัว (Call List):</span>
            <span class="text-slate-400 font-mono">${athletes.length} Athletes</span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            ${athletesHtml}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ==========================================
// RENDER OFFICIAL SCHEDULE VIEW
// ==========================================
function renderScheduleView() {
  const container = document.getElementById('schedule-timeline-container');
  if (!container) return;

  if (typeof EVENT_SCHEDULE === 'undefined' || !Array.isArray(EVENT_SCHEDULE)) {
    container.innerHTML = `<div class="p-6 text-center text-slate-500">ไม่พบข้อมูลตารางการแข่งขัน</div>`;
    return;
  }

  let filtered = EVENT_SCHEDULE.filter(item => {
    if (APP_STATE.scheduleFilter === 'all') return true;
    return item.category === APP_STATE.scheduleFilter;
  });

  container.innerHTML = filtered.map((item, idx) => {
    let catBadgeColor = 'bg-slate-100 text-slate-700 border-slate-200';
    let catIcon = window.TWS_ICONS ? TWS_ICONS.clipboard('w-3.5 h-3.5') : '';

    if (item.category === 'ceremony') {
      catBadgeColor = 'bg-amber-50 text-amber-800 border-amber-200';
      catIcon = window.TWS_ICONS ? TWS_ICONS.crown('w-3.5 h-3.5') : '';
    } else if (item.category === 'track') {
      catBadgeColor = 'bg-blue-50 text-blue-700 border-blue-200';
      catIcon = window.TWS_ICONS ? TWS_ICONS.runnerTrack('w-3.5 h-3.5') : '';
    } else if (item.category === 'court') {
      catBadgeColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
      catIcon = window.TWS_ICONS ? TWS_ICONS.ball('w-3.5 h-3.5') : '';
    } else if (item.category === 'family') {
      catBadgeColor = 'bg-purple-50 text-purple-700 border-purple-200';
      catIcon = window.TWS_ICONS ? TWS_ICONS.users('w-3.5 h-3.5') : '';
    } else if (item.category === 'special') {
      catBadgeColor = 'bg-rose-50 text-rose-700 border-rose-200';
      catIcon = window.TWS_ICONS ? TWS_ICONS.sparkles('w-3.5 h-3.5') : '';
    }

    return `
      <div class="relative pl-6 sm:pl-8 pb-7 border-l-2 border-slate-200 last:border-l-0 group">
        <!-- Timeline Marker Dot -->
        <div class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 ${
          item.highlight ? 'border-amber-500 ring-4 ring-amber-100' : 'border-slate-400'
        } transition-transform group-hover:scale-125"></div>

        <!-- Schedule Card -->
        <div class="rounded-2xl bg-white border ${
          item.highlight ? 'border-amber-300 shadow-sm' : 'border-slate-200 shadow-2xs'
        } p-4 sm:p-5 hover:border-slate-400 transition">
          <div class="flex flex-wrap items-center justify-between gap-2.5 mb-2">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-base font-bold text-amber-700 font-mono">${item.time} น.</span>
              ${item.callTime && item.callTime !== '–' ? `
                <span class="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 font-semibold font-mono">
                  ${window.TWS_ICONS ? TWS_ICONS.megaphone('w-3 h-3 text-rose-600') : ''}
                  <span>Call Time: ${item.callTime} น.</span>
                </span>
              ` : ''}
              ${item.eventCode ? `
                <span class="inline-flex items-center text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-mono font-bold">
                  ${item.eventCode}
                </span>
              ` : ''}
            </div>
            <div class="flex items-center gap-2 flex-wrap">
              <span class="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-0.5 rounded-full border ${catBadgeColor} font-semibold">
                ${catIcon}
                <span>${item.category.toUpperCase()}</span>
              </span>
              <span class="text-xs text-slate-500 font-mono flex items-center gap-1">
                ${window.TWS_ICONS ? TWS_ICONS.mapPin('w-3 h-3 text-slate-400') : ''}
                <span>${item.location}</span>
              </span>
            </div>
          </div>

          <h3 class="text-base sm:text-lg font-bold text-[#0B1E36] flex items-center gap-2 flex-wrap">
            <span>${item.title}</span>
            <span class="text-xs sm:text-sm text-slate-500 font-normal">(${item.thaiTitle})</span>
          </h3>

          <p class="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">${item.description}</p>

          ${item.rules ? `
            <div class="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start gap-2">
              <span class="text-amber-700 font-bold shrink-0">กติกา/Directives:</span>
              <span>${item.rules}</span>
            </div>
          ` : ''}

          ${item.medals ? `
            <div class="mt-2.5 flex items-center gap-1.5 text-xs font-semibold text-amber-800">
              ${window.TWS_ICONS ? TWS_ICONS.medal('w-3.5 h-3.5 text-amber-600') : ''}
              <span>เหรียญรางวัล:</span>
              <span class="text-slate-700 font-normal">${item.medals}</span>
            </div>
          ` : ''}

          ${item.rewards ? `
            <div class="mt-2 flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
              ${window.TWS_ICONS ? TWS_ICONS.gift('w-3.5 h-3.5 text-emerald-600') : ''}
              <span>รางวัลเกียรติยศ:</span>
              <span class="text-slate-700 font-normal">${item.rewards}</span>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');
}

// ==========================================
// RENDER SPORTS HANDBOOK & MEDALS VIEW
// ==========================================
function renderHandbookView() {
  const tableBody = document.getElementById('handbook-medal-table');
  if (!tableBody) return;

  if (typeof MEDAL_STATS === 'undefined' || !Array.isArray(MEDAL_STATS)) return;

  tableBody.innerHTML = MEDAL_STATS.map(s => `
    <tr class="border-b border-slate-100 hover:bg-slate-50 transition">
      <td class="py-3 px-4 font-semibold text-[#0B1E36] text-sm">${s.sport}</td>
      <td class="py-3 px-4 text-center font-bold text-amber-600 font-mono">${s.gold}</td>
      <td class="py-3 px-4 text-center font-bold text-slate-600 font-mono">${s.silver}</td>
      <td class="py-3 px-4 text-center font-bold text-amber-800 font-mono">${s.bronze}</td>
      <td class="py-3 px-4 text-center font-black text-[#0B1E36] font-mono bg-slate-50">${s.total}</td>
      <td class="py-3 px-4 text-xs text-slate-500">${s.note}</td>
    </tr>
  `).join('');
}

// ==========================================
// RENDER REGISTRATION & DOCUMENT HUB
// ==========================================
function renderRegistrationHub() {
  // Populate Quota Table
  const tbody = document.getElementById('event-codes-table-body');
  if (tbody && typeof MASTER_EVENT_CODES !== 'undefined' && Array.isArray(MASTER_EVENT_CODES)) {
    tbody.innerHTML = MASTER_EVENT_CODES.map((ev, idx) => `
      <tr class="hover:bg-slate-50 transition border-b border-slate-100 text-slate-700">
        <td class="py-2.5 px-3 text-center font-bold text-[#0B1E36]">${idx + 1}</td>
        <td class="py-2.5 px-3 font-semibold text-[#0B1E36]">${ev.sport} - ${ev.division}</td>
        <td class="py-2.5 px-3 text-center">G.${ev.minGrade}${ev.maxGrade !== ev.minGrade ? '–' + ev.maxGrade : ''}</td>
        <td class="py-2.5 px-3 text-center">${ev.gender}</td>
        <td class="py-2.5 px-3 text-center font-bold text-blue-700">${ev.quota} คน/สี</td>
        <td class="py-2.5 px-3 text-center text-slate-500">${ev.parents > 0 ? ev.parents + ' คน' : '–'}</td>
        <td class="py-2.5 px-3 text-center font-bold text-rose-600">${ev.callTime} น.</td>
        <td class="py-2.5 px-3 text-center">${ev.startTime}–${ev.endTime} น.</td>
      </tr>
    `).join('');
  }
}

// ==========================================
// RENDER 4 KINGDOM THEMES & SHOWCASE
// ==========================================
function renderKingdomShowcase() {
  const kingdoms = [
    {
      id: 'amethyst',
      color: 'Purple',
      name: 'Amethyst Kingdom',
      thaiName: 'สีม่วง (Amethyst)',
      motto: 'IMAGINATION • WISDOM • UNITY',
      emblem: 'Mystic Crystal Prism & Floating Citadel',
      themeColor: 'Amethyst Violet & Celestial Starlight',
      bgImg: 'assets/images/amethyst-kingdom.jpg',
      borderClass: 'border-purple-200 hover:border-purple-400',
      headerBadge: 'bg-purple-100 text-purple-900 border-purple-300',
      teachers: [
        { name: 'T.Iris', role: 'Head (หัวหน้าทีม)' },
        { name: 'T.Lorie', role: 'Asst (ผู้ช่วย)' },
        { name: 'T.Donut', role: 'ครูประจำสี' },
        { name: 'T.Joey', role: 'ครูประจำสี' },
        { name: 'T.Sai', role: 'ครูประจำสี' }
      ],
      dutyAssignments: [
        { post: 'อัฒจันทร์เชียร์ (Stand Cheer)', staff: 'ดูแลนักเรียน นำเชียร์ และดูแลความปลอดภัยบนสแตนด์' },
        { post: 'ตามนักกีฬา & ส่งตัว Call Room', staff: 'เช็กเวลาและพานักกีฬาไปส่งที่จุดลงทะเบียน' },
        { post: 'จุดเส้นชัย & พาไปรับรางวัล', staff: 'ประจำเส้นชัย รับเด็กแข่งเสร็จและพาไปจุดรับเหรียญ' }
      ],
      classes: '58 Amethyst Athletes (G.1 - G.6)'
    },
    {
      id: 'crimson',
      color: 'Red',
      name: 'Crimson Empire',
      thaiName: 'สีแดง (Crimson)',
      motto: 'COURAGE • HONOR • UNITY',
      emblem: 'Golden Lion Rampant & Sunlit Fortress',
      themeColor: 'Crimson & Royal Gold',
      bgImg: 'assets/images/crimson-empire.jpg',
      borderClass: 'border-rose-200 hover:border-rose-400',
      headerBadge: 'bg-rose-100 text-rose-900 border-rose-300',
      teachers: [
        { name: 'T.Beam', role: 'Head (หัวหน้าทีม)' },
        { name: 'T.EJ', role: 'Asst (ผู้ช่วย)' },
        { name: 'T.Oil', role: 'ครูประจำสี' },
        { name: 'T.Mary', role: 'ครูประจำสี' },
        { name: 'T.Natalia', role: 'ครูประจำสี' }
      ],
      dutyAssignments: [
        { post: 'อัฒจันทร์เชียร์ (Stand Cheer)', staff: 'ดูแลนักเรียน นำเชียร์ และดูแลความปลอดภัยบนสแตนด์' },
        { post: 'ตามนักกีฬา & ส่งตัว Call Room', staff: 'เช็กเวลาและพานักกีฬาไปส่งที่จุดลงทะเบียน' },
        { post: 'จุดเส้นชัย & พาไปรับรางวัล', staff: 'ประจำเส้นชัย รับเด็กแข่งเสร็จและพาไปจุดรับเหรียญ' }
      ],
      classes: '58 Crimson Athletes (G.1 - G.6)'
    },
    {
      id: 'golden',
      color: 'Yellow',
      name: 'Golden Realm',
      thaiName: 'สีเหลือง (Golden)',
      motto: 'HOPE • ENERGY • UNITY',
      emblem: 'Radiant Sun of Hope & Celestial Palace',
      themeColor: 'Radiant Sun Gold & Ivory',
      bgImg: 'assets/images/golden-realm.jpg',
      borderClass: 'border-amber-200 hover:border-amber-400',
      headerBadge: 'bg-amber-100 text-amber-900 border-amber-300',
      teachers: [
        { name: 'T.Jib', role: 'Head (หัวหน้าทีม)' },
        { name: 'T.Marky', role: 'Asst (ผู้ช่วย)' },
        { name: 'T.Tai', role: 'ครูประจำสี' },
        { name: 'T.Erik', role: 'ครูประจำสี' },
        { name: 'T.Kaew', role: 'ครูประจำสี' }
      ],
      dutyAssignments: [
        { post: 'อัฒจันทร์เชียร์ (Stand Cheer)', staff: 'ดูแลนักเรียน นำเชียร์ และดูแลความปลอดภัยบนสแตนด์' },
        { post: 'ตามนักกีฬา & ส่งตัว Call Room', staff: 'เช็กเวลาและพานักกีฬาไปส่งที่จุดลงทะเบียน' },
        { post: 'จุดเส้นชัย & พาไปรับรางวัล', staff: 'ประจำเส้นชัย รับเด็กแข่งเสร็จและพาไปจุดรับเหรียญ' }
      ],
      classes: '58 Golden Athletes (G.1 - G.6)'
    },
    {
      id: 'jade',
      color: 'Green',
      name: 'Jade Dynasty',
      thaiName: 'สีเขียว (Jade)',
      motto: 'WISDOM • HARMONY • UNITY',
      emblem: 'Imperial Emerald Dragon & Misty Pagoda',
      themeColor: 'Deep Jade & Emerald Waterfall',
      bgImg: 'assets/images/jade-dynasty.jpg',
      borderClass: 'border-emerald-200 hover:border-emerald-400',
      headerBadge: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      teachers: [
        { name: 'T.Tuk', role: 'Head (หัวหน้าทีม)' },
        { name: 'T.Mike', role: 'Asst (ผู้ช่วย)' },
        { name: 'T.Gilbert', role: 'ครูประจำสี' },
        { name: 'T.Bonnie', role: 'ครูประจำสี' },
        { name: 'T.BELL', role: 'ครูประจำสี' }
      ],
      dutyAssignments: [
        { post: 'อัฒจันทร์เชียร์ (Stand Cheer)', staff: 'ดูแลนักเรียน นำเชียร์ และดูแลความปลอดภัยบนสแตนด์' },
        { post: 'ตามนักกีฬา & ส่งตัว Call Room', staff: 'เช็กเวลาและพานักกีฬาไปส่งที่จุดลงทะเบียน' },
        { post: 'จุดเส้นชัย & พาไปรับรางวัล', staff: 'ประจำเส้นชัย รับเด็กแข่งเสร็จและพาไปจุดรับเหรียญ' }
      ],
      classes: '56 Jade Athletes (G.1 - G.6)'
    }
  ];

  // Render Section Kingdoms Grid (if exists)
  const container = document.getElementById('kingdoms-cards-grid');
  const homeContainer = document.getElementById('home-kingdoms-cards-grid');
  
  const cardsHtml = kingdoms.map(k => `
    <div class="rounded-2xl bg-white border ${k.borderClass} overflow-hidden shadow-xs hover:shadow-lg flex flex-col group transition-all duration-300">
      <!-- Image Poster Container -->
      <div class="relative h-72 sm:h-80 overflow-hidden bg-slate-100 cursor-pointer" onclick="filterByKingdomAndSwitch('${k.color}')">
        <img 
          src="${k.bgImg}" 
          alt="${k.name}" 
          class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onerror="this.onerror=null; this.src='assets/images/tws-official-logo.jpg';"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent"></div>
        <div class="absolute bottom-3 left-3.5 right-3.5">
          <span class="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${k.headerBadge} backdrop-blur-md mb-1">
            ${k.color} Team • ${k.classes}
          </span>
          <h3 class="text-xl sm:text-2xl font-black font-royal text-white tracking-wide drop-shadow-md truncate-1">
            ${k.name}
          </h3>
          <p class="text-[11px] text-amber-300 font-bold tracking-wider uppercase mt-0.5">
            ${k.motto}
          </p>
        </div>
      </div>

      <!-- Card Details & Staff Section -->
      <div class="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <!-- Faculty House Masters (5 Teachers) -->
        <div class="space-y-2">
          <div class="flex items-center justify-between pb-1.5 border-b border-slate-100">
            <span class="text-xs font-bold text-[#0B1E36] flex items-center gap-1.5">
              ${window.TWS_ICONS ? TWS_ICONS.teacher('w-4 h-4 text-[#0B1E36]') : ''}
              <span>ครูประจำสี</span>
            </span>
            <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${k.headerBadge}">5 ท่าน</span>
          </div>

          <!-- Teachers list pills -->
          <div class="flex flex-wrap gap-1.5">
            ${k.teachers.map(t => `
              <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-50 text-slate-800 border border-slate-200">
                <strong class="text-[#0B1E36]">${t.name}</strong>
                <span class="text-slate-500 text-[10px]">(${t.role})</span>
              </span>
            `).join('')}
          </div>
        </div>

        <!-- Role & Post Allocation (หน้าที่ประจำสี 3 จุด) -->
        <div class="rounded-xl p-3 bg-slate-50/80 border border-slate-200/80 space-y-2 text-xs">
          <div class="text-[11px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            ${window.TWS_ICONS ? TWS_ICONS.clipboard('w-3.5 h-3.5 text-slate-600') : ''}
            <span>หน้าที่ของครูประจำสี</span>
          </div>
          
          <div class="space-y-1.5 text-[11px]">
            <div class="p-1.5 rounded-lg bg-white border border-slate-200 flex items-start gap-1.5">
              ${window.TWS_ICONS ? TWS_ICONS.standCheer('w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5') : ''}
              <span class="text-slate-700 leading-snug">ประจำดูเด็กที่ Stand cheer & ความปลอดภัย</span>
            </div>
            <div class="p-1.5 rounded-lg bg-white border border-slate-200 flex items-start gap-1.5">
              ${window.TWS_ICONS ? TWS_ICONS.runnerTrack('w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5') : ''}
              <span class="text-slate-700 leading-snug">ตามนักกีฬาแต่ละรายการ ไปส่งตัวที่จุดลงทะเบียน</span>
            </div>
            <div class="p-1.5 rounded-lg bg-white border border-slate-200 flex items-start gap-1.5">
              ${window.TWS_ICONS ? TWS_ICONS.finishPost('w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5') : ''}
              <span class="text-slate-700 leading-snug">ประจำจุดเส้นชัย รับเด็กแข่งเสร็จ พาไปจุดรับรางวัล</span>
            </div>
          </div>
        </div>

        <!-- Quick Details & CTA -->
        <div class="space-y-2 pt-1 border-t border-slate-100">
          <div class="flex items-center justify-between text-xs py-0.5">
            <span class="text-slate-500">สัญลักษณ์/Emblem:</span>
            <span class="font-semibold text-slate-800 text-[11px] text-right truncate max-w-[170px]" title="${k.emblem}">${k.emblem}</span>
          </div>

          <button 
            onclick="filterByKingdomAndSwitch('${k.color}')" 
            class="w-full py-2.5 px-2 rounded-full font-bold text-xs bg-[#0B1E36] hover:bg-[#162F52] text-white transition shadow-xs flex items-center justify-center gap-1.5 min-h-[44px] whitespace-normal text-center leading-snug"
          >
            ${window.TWS_ICONS ? TWS_ICONS.users('w-3.5 h-3.5 text-white') : ''}
            <span>ดูรายชื่อนักกีฬา ${k.thaiName}</span>
          </button>
        </div>

      </div>
    </div>
  `).join('');

  if (container) {
    container.innerHTML = cardsHtml;
  }
  if (homeContainer) {
    homeContainer.innerHTML = cardsHtml;
  }
}

// Filter roster by color and switch to Roster tab
function filterByKingdomAndSwitch(color) {
  APP_STATE.selectedColor = color;
  
  // Update Roster tab filter pills
  document.querySelectorAll('[data-color-filter]').forEach(p => {
    if (p.getAttribute('data-color-filter') === color) {
      p.classList.add('ring-2', 'ring-[#0B1E36]', 'shadow-sm');
    } else {
      p.classList.remove('ring-2', 'ring-[#0B1E36]', 'shadow-sm');
    }
  });

  switchTab('roster');
  renderRosterView();
}

// ==========================================
// VISITOR ANALYTICS & LIVE PRESENCE TRACKER
// ==========================================
const VISITOR_VIEWS_STORAGE_KEY = 'tws_sports_day_2026_total_views_cache';
const VISITOR_SESSION_TRACKED_KEY = 'tws_sports_day_2026_session_counted';

async function initVisitorAnalytics() {
  const elOnlineNow = document.getElementById('tracker-online-now');
  const elTotalViews = document.getElementById('tracker-total-views');
  const elCardOnline = document.getElementById('card-tracker-online');
  const elCardViews = document.getElementById('card-tracker-views');
  const elFooterOnline = document.getElementById('footer-tracker-online');
  const elFooterViews = document.getElementById('footer-tracker-views');

  // 1. Initial Local Cache Fallback (Zero baseline)
  let cachedViews = parseInt(localStorage.getItem(VISITOR_VIEWS_STORAGE_KEY) || '1', 10);
  
  // Count session visit once per browser session
  const hasVisitedThisSession = sessionStorage.getItem(VISITOR_SESSION_TRACKED_KEY);
  if (!hasVisitedThisSession) {
    cachedViews += 1;
    localStorage.setItem(VISITOR_VIEWS_STORAGE_KEY, cachedViews.toString());
    sessionStorage.setItem(VISITOR_SESSION_TRACKED_KEY, 'true');
  }

  // Update UI with real baseline numbers
  updateVisitorUI(cachedViews, 1);

  // 2. Fetch or Increment Real-Time Global Counter from Cloud API
  try {
    const NAMESPACE = 'tws-sports-day-2026-prod-audit';
    const KEY = 'verified_page_views';
    
    // We increment on new session, otherwise just get current value
    const action = hasVisitedThisSession ? 'get' : 'hit';
    const apiUrl = `https://api.counterapi.dev/v1/${NAMESPACE}/${KEY}/${action}`;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(apiUrl, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.ok) {
      const json = await res.json();
      if (json && typeof json.count === 'number') {
        const liveCount = json.count; // 100% Real API counter without synthetic offset
        localStorage.setItem(VISITOR_VIEWS_STORAGE_KEY, liveCount.toString());
        updateVisitorUI(liveCount, 1);
      }
    }
  } catch (err) {
    // Offline or network safeguard
  }

  function updateVisitorUI(views, online) {
    const formattedViews = Number(views).toLocaleString('th-TH');
    const formattedOnline = Number(online).toLocaleString('th-TH');

    if (elTotalViews) elTotalViews.textContent = formattedViews;
    if (elOnlineNow) elOnlineNow.textContent = formattedOnline;

    if (elCardViews) elCardViews.textContent = `${formattedViews} ครั้ง`;
    if (elCardOnline) elCardOnline.textContent = `${formattedOnline} คน`;

    if (elFooterViews) elFooterViews.textContent = formattedViews;
    if (elFooterOnline) elFooterOnline.textContent = formattedOnline;
  }
}



