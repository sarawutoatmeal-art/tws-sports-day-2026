// Techawit School Sports Day 2026 - Internationalization (i18n) Engine
// Bilingual support: Thai (th) & English (en)

const TWS_I18N = {
  th: {
    // Top Bar & Header
    "top_online": "กำลังเข้าชม",
    "top_views": "ยอดชม",
    "top_times": "ครั้ง",
    "top_synced": "ฐานข้อมูลซิงค์แล้ว",
    "school_badge": "TECHAWIT SCHOOL PRIMARY",
    "hero_tag": "TWS SPORTS DAY 2026",
    "hero_title": "Kingdom Games 2026",
    "hero_sub": "ระบบบริหารจัดการและลงทะเบียนการแข่งขัน กีฬาสีระดับประถมศึกษา 2569",
    "hero_desc": "Techawit School Primary Sports Day: Portal ลงทะเบียนนักกีฬา บันทึกผลคะแนนสด ตรวจสอบพี่น้อง และสูจิบัตร 201 เหรียญรางวัล",

    // Navigation Tabs
    "nav_event_reg": "ลงทะเบียนตามรายการ",
    "nav_roster": "ทำเนียบนักเรียน",
    "nav_scoreboard": "กระดานคะแนนสด",
    "nav_callroom": "ห้องรายงานตัว",
    "nav_schedule": "ตารางแข่งขัน",
    "nav_handbook": "201 เหรียญ & สูจิบัตร",
    "nav_documents": "ศูนย์เอกสาร",
    "nav_siblings": "ตรวจสอบพี่น้อง",
    "nav_print": "พิมพ์เอกสาร",
    "nav_duties": "หน้าที่ครู",
    "nav_kingdoms": "4 อาณาจักร",

    // Event Registration View
    "reg_title": "ระบบลงทะเบียนตามรายการแข่งขันและโควตาทีม",
    "reg_sub": "เลือกสีและรายการแข่งขันเพื่อลงชื่อนักเรียนตามโควตาที่กำหนด พร้อมระบบตรวจจับเพศและระดับชั้น",
    "reg_switch_color": "เลือกสีอาณาจักรของท่าน:",
    "reg_cat_all": "ทั้งหมด",
    "reg_cat_sprint": "วิ่ง 30 ม. (22 Heats)",
    "reg_cat_relay": "วิ่งผลัด 6x30ม. (4 รายการ)",
    "reg_cat_football": "ฟุตบอลแบ่งเซต (9 คน)",
    "reg_cat_chairball": "แชร์บอล ป.1–ป.2 (6 คน)",
    "reg_cat_basketball": "บาส 3x3 (6 คน)",
    "reg_cat_family": "เกมครอบครัว (4 รายการ)",
    "reg_cat_special": "เกมพิเศษ (2 รายการ)",
    "reg_search_placeholder": "ค้นหารายการ, รุ่น, เวลา...",
    "reg_filter_all_events": "รายการทั้งหมด",
    "reg_quota_filled": "ลงแล้ว",
    "reg_quota_open": "ว่าง",
    "reg_slot_empty": "ว่าง (คลิกเพื่อลงชื่อ)",
    "reg_btn_select": "+ เลือกนักเรียน",
    "reg_btn_remove": "ปลดชื่อ",
    "reg_btn_change": "เปลี่ยนตัว",
    "reg_rules_title": "กติกาการแข่งขัน:",
    "reg_medals_title": "เหรียญรางวัล:",
    "reg_time_title": "เวลาแข่ง:",
    "reg_call_title": "Call Time:",
    "reg_loc_title": "สถานที่:",
    "reg_quota_title": "โควตาต่อสี:",
    "reg_eligible_group": "นักเรียนที่ตรงตามเกณฑ์ (แนะนำ)",
    "reg_other_group": "นักเรียนระดับชั้น/เพศอื่น (อนุญาตให้ลงได้ แต่จะแสดงเตือนสีแดง)",
    "reg_warn_grade": "⚠️ ระดับชั้นไม่ตรงเกณฑ์",
    "reg_warn_gender": "⚠️ เพศไม่ตรงเกณฑ์",
    "reg_warn_gk": "⚠️ โกล์ต้องเป็นรุ่นโต (G5–G6)",
    "reg_warn_set1": "⚠️ ชุดแรกควรเป็น ป.3–ป.4",
    "reg_warn_set2": "⚠️ ชุดสองควรเป็น ป.5–ป.6",
    "reg_warn_conflict": "⚠️ มีลงกีฬาหลักอื่นแล้ว (ฟุตบอล/บาส)",
    "reg_warn_dup_sprint": "⚠️ มีลงวิ่ง 30ม. รอบอื่นแล้ว",
    "reg_zero_events": "ยังไม่มีรายการแข่ง (0 Events)",
    "reg_modal_title": "เลือกนักเรียนลงช่องรายการ",
    "reg_modal_search": "พิมพ์ชื่อ, ชื่อเล่น, หรือเลขที่เพื่อค้นหา...",
    "reg_modal_close": "ปิดหน้าต่าง",
    "reg_confirm_remove": "คุณต้องการปลดรายชื่อนักเรียนคนนี้ออกจากรายการนี้ใช่หรือไม่?",

    // Scoreboard View
    "sc_title": "Live Scoreboard & 201 Medals Tally",
    "sc_sub": "เกณฑ์คะแนน: เหรียญทอง = 5 คะแนน | เหรียญเงิน = 3 คะแนน | เหรียญทองแดง = 1 คะแนน",
    "sc_points": "คะแนนรวม",
    "sc_gold": "ทอง",
    "sc_silver": "เงิน",
    "sc_bronze": "ทองแดง",
    "sc_referee_mode": "Referee Mode (ครูกรรมการตัดสิน)",
    "sc_view_only": "View Only (ผู้ชมทั่วไป)",
    "sc_btn_unlock": "ปลดล็อกโหมดผู้ตัดสิน",
    "sc_btn_lock": "ล็อกสิทธิ์แก้ไข",
    "sc_btn_record": "บันทึกผลผู้ชนะ",
    "sc_total_medals": "เหรียญรางวัลทั้งหมด",
    "sc_tbl_no": "#",
    "sc_tbl_sport": "รายการกีฬา (Sport Event)",
    "sc_tbl_div": "ระดับชั้น / เพศ",
    "sc_tbl_gold": "เหรียญทอง (5)",
    "sc_tbl_silver": "เหรียญเงิน (3)",
    "sc_tbl_bronze": "ทองแดง (1)",
    "sc_tbl_action": "จัดการ",

    // Call Room
    "cr_title": "Call Room & Athlete Marshaling Queue",
    "cr_sub": "จุดรวมพลและเช็กชื่อนักกีฬาก่อนลงสนาม 41 แมตช์ตามลำดับเวลา",
    "cr_filter_all": "ทุกสี (All)",
    "cr_call_list": "รายชื่อนักกีฬาที่ต้องรายงานตัว (Call List):",
    "cr_empty": "ยังไม่มีรายชื่อนักกีฬาที่ลงทะเบียนในรายการนี้",

    // Schedule & Handbook
    "sch_title": "Official Schedule (กำหนดการแข่งขันทางการ)",
    "sch_sub": "กำหนดการ 41 รายการแข่งขันอย่างเป็นทางการ พร้อมเวลา Call Time และกติกา",
    "hb_title": "Official Handbook, Rules & 201 Medals Overview",
    "hb_sub": "TECHAWIT PRIMARY SPORTS DAY 2026 • สูจิบัตรและคู่มือกติกาอย่างเป็นทางการ พร้อมสรุปโควตา 201 เหรียญรางวัล",
    "hb_btn_th": "สูจิบัตรไทย (TH) ↗",
    "hb_btn_en_web": "Program (EN Web) ↗",
    "hb_btn_en_pdf": "PDF (EN) ↗",

    // General & Status
    "status_registered": "ลงทะเบียนแล้ว",
    "status_unregistered": "ยังไม่ได้ลงรายการแข่งขัน",
    "events_count": "รายการ",
    "persons": "คน",
    "cancel": "ยกเลิก",
    "save": "บันทึก",
    "close": "ปิด",
    "reset": "รีเซ็ต"
  },

  en: {
    // Top Bar & Header
    "top_online": "Online Now",
    "top_views": "Page Views",
    "top_times": "times",
    "top_synced": "DATABASE SYNCED",
    "school_badge": "TECHAWIT SCHOOL PRIMARY",
    "hero_tag": "TWS SPORTS DAY 2026",
    "hero_title": "Kingdom Games 2026",
    "hero_sub": "Official Athletic Management & Registration Portal 2026",
    "hero_desc": "Techawit School Primary Sports Day: Athlete Roster, Real-time Scoreboard, Sibling Audit, and 201 Medals Official Handbook",

    // Navigation Tabs
    "nav_event_reg": "Event Entry (Slots)",
    "nav_roster": "Student Roster",
    "nav_scoreboard": "Live Scoreboard",
    "nav_callroom": "Call Room Queue",
    "nav_schedule": "Match Schedule",
    "nav_handbook": "201 Medals & Rules",
    "nav_documents": "Document Hub",
    "nav_siblings": "Sibling Audit",
    "nav_print": "Print Center",
    "nav_duties": "Teacher Duties",
    "nav_kingdoms": "4 Kingdoms",

    // Event Registration View
    "reg_title": "Event-First Quota Registration System",
    "reg_sub": "Select kingdom house and event discipline to assign athletes into locked quota slots with soft validation",
    "reg_switch_color": "Select Your Kingdom House:",
    "reg_cat_all": "All Events",
    "reg_cat_sprint": "30m Sprint (22 Heats)",
    "reg_cat_relay": "6x30m Relay (4 Events)",
    "reg_cat_football": "Split Football (9 Slots)",
    "reg_cat_chairball": "Chairball G1–G2 (6 Slots)",
    "reg_cat_basketball": "Basketball 3x3 (6 Slots)",
    "reg_cat_family": "Family Games (4 Events)",
    "reg_cat_special": "Special Games (2 Events)",
    "reg_search_placeholder": "Search event, division, time...",
    "reg_filter_all_events": "All Competitions",
    "reg_quota_filled": "filled",
    "reg_quota_open": "open",
    "reg_slot_empty": "Open Slot (Click to Assign)",
    "reg_btn_select": "+ Select Athlete",
    "reg_btn_remove": "Remove",
    "reg_btn_change": "Change",
    "reg_rules_title": "Competition Directives:",
    "reg_medals_title": "Medal Stakes:",
    "reg_time_title": "Event Time:",
    "reg_call_title": "Call Time:",
    "reg_loc_title": "Location:",
    "reg_quota_title": "House Quota:",
    "reg_eligible_group": "Eligible Athletes (Recommended)",
    "reg_other_group": "Other Athletes (Allowed with Red Warning Indicator)",
    "reg_warn_grade": "⚠️ Grade Level Mismatch",
    "reg_warn_gender": "⚠️ Gender Mismatch",
    "reg_warn_gk": "⚠️ Goalkeeper must be Senior (G5–G6)",
    "reg_warn_set1": "⚠️ Set 1 should be G3–G4",
    "reg_warn_set2": "⚠️ Set 2 should be G5–G6",
    "reg_warn_conflict": "⚠️ Multi-sport conflict (Football/Basketball)",
    "reg_warn_dup_sprint": "⚠️ Already registered in another 30m heat",
    "reg_zero_events": "No events assigned yet (0 Events)",
    "reg_modal_title": "Assign Athlete to Event Slot",
    "reg_modal_search": "Type name, nickname, or number to search...",
    "reg_modal_close": "Close Window",
    "reg_confirm_remove": "Are you sure you want to remove this athlete from this event slot?",

    // Scoreboard View
    "sc_title": "Live Scoreboard & 201 Medals Tally",
    "sc_sub": "Scoring Rubric: Gold = 5 pts | Silver = 3 pts | Bronze = 1 pt (Live updates shared across all staff)",
    "sc_points": "Total Points",
    "sc_gold": "Gold",
    "sc_silver": "Silver",
    "sc_bronze": "Bronze",
    "sc_referee_mode": "Referee Mode (Authorized Staff)",
    "sc_view_only": "View Only (General Audience)",
    "sc_btn_unlock": "Unlock Referee Mode",
    "sc_btn_lock": "Lock Editing",
    "sc_btn_record": "Record Winners",
    "sc_total_medals": "Total Medals",
    "sc_tbl_no": "#",
    "sc_tbl_sport": "Sport Event",
    "sc_tbl_div": "Division / Gender",
    "sc_tbl_gold": "Gold (5 pts)",
    "sc_tbl_silver": "Silver (3 pts)",
    "sc_tbl_bronze": "Bronze (1 pt)",
    "sc_tbl_action": "Action",

    // Call Room
    "cr_title": "Call Room & Athlete Marshaling Queue",
    "cr_sub": "Official athlete check-in queue before taking the court for all 41 scheduled matches",
    "cr_filter_all": "All Kingdoms",
    "cr_call_list": "Athlete Marshaling Roster (Call List):",
    "cr_empty": "No athletes assigned to this event yet",

    // Schedule & Handbook
    "sch_title": "Official Event Schedule (41 Master Matches)",
    "sch_sub": "Official 41-event timeline, marshal call times, and discipline directives",
    "hb_title": "Official Handbook, Rules & 201 Medals Overview",
    "hb_sub": "TECHAWIT PRIMARY SPORTS DAY 2026 • Official Master Handbook & 201 Medals Allocation",
    "hb_btn_th": "Thai Handbook (TH) ↗",
    "hb_btn_en_web": "Program (EN Web) ↗",
    "hb_btn_en_pdf": "PDF (EN) ↗",

    // General & Status
    "status_registered": "Registered",
    "status_unregistered": "Not registered yet",
    "events_count": "Events",
    "persons": "athletes",
    "cancel": "Cancel",
    "save": "Save",
    "close": "Close",
    "reset": "Reset"
  }
};

let CURRENT_LANGUAGE = localStorage.getItem('tws_lang') || 'th';

function getLang() {
  return CURRENT_LANGUAGE;
}

function t(key, fallback) {
  const dict = TWS_I18N[CURRENT_LANGUAGE] || TWS_I18N['th'];
  return dict[key] || fallback || key;
}

function setLanguage(lang) {
  if (lang !== 'th' && lang !== 'en') lang = 'th';
  CURRENT_LANGUAGE = lang;
  localStorage.setItem('tws_lang', lang);

  // Update HTML lang attribute
  document.documentElement.lang = lang;

  // Update all data-i18n DOM elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key && TWS_I18N[lang] && TWS_I18N[lang][key]) {
      el.textContent = TWS_I18N[lang][key];
    }
  });

  // Update all data-i18n-placeholder DOM elements
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (key && TWS_I18N[lang] && TWS_I18N[lang][key]) {
      el.placeholder = TWS_I18N[lang][key];
    }
  });

  // Update Language Switcher Button UI
  updateLangToggleUI();

  // Re-render dynamic views
  if (typeof renderAllViews === 'function') renderAllViews();
  if (typeof renderEventRegistrationView === 'function') renderEventRegistrationView();
}

function toggleLanguage() {
  const nextLang = CURRENT_LANGUAGE === 'th' ? 'en' : 'th';
  setLanguage(nextLang);
}

function updateLangToggleUI() {
  const btn = document.getElementById('btn-lang-toggle');
  if (!btn) return;
  const isEn = CURRENT_LANGUAGE === 'en';
  btn.innerHTML = `
    <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition shadow-xs ${
      isEn ? 'bg-indigo-900 text-white border-indigo-700' : 'bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200'
    }">
      <span class="text-sm">${isEn ? '🇬🇧' : '🇹🇭'}</span>
      <span>${isEn ? 'EN (English)' : 'TH (ภาษาไทย)'}</span>
      <svg class="w-3.5 h-3.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
    </span>
  `;
}

// Auto-initialize on DOM load
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    setLanguage(CURRENT_LANGUAGE);
  });
}

// Global exposure
if (typeof window !== 'undefined') {
  window.TWS_I18N = TWS_I18N;
  window.getLang = getLang;
  window.t = t;
  window.setLanguage = setLanguage;
  window.toggleLanguage = toggleLanguage;
}
