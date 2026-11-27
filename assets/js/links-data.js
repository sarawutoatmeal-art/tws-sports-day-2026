// Techawit School Sports Day 2026 - Master Event Directives, Links & Quotas
// Clean UTF-8 Master Dataset

const OFFICIAL_LINKS = {
  // 1. สูจิบัตรและคู่มือกติกาหลัก (Official Master Handbooks)
  handbooks: {
    thai: {
      title: "สูจิบัตรและคู่มือกติกาการแข่งขัน (ฉบับภาษาไทย)",
      subtitle: "Official Sports Day Handbook & Event Master Guide (Thai Edition)",
      badge: "สูจิบัตร / HANDBOOK (TH)",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
      url: "https://docs.google.com/document/d/1YtgJjH1ALr8UXKCoVgftZMUUhPJmnTZOV7QX4cBDgGg/edit?tab=t.0",
      type: "Google Docs",
      icon: "file-text",
      description: "กำหนดการอย่างเป็นทางการ กติกาการแข่งขันแต่ละรายการ กฎความปลอดภัย ข้อปฏิบัติครูและผู้ปกครอง รายละเอียด 201 เหรียญรางวัล",
      primaryActionText: "เปิดอ่านสูจิบัตร (TH)",
      viewModeUrl: "https://docs.google.com/document/d/1YtgJjH1ALr8UXKCoVgftZMUUhPJmnTZOV7QX4cBDgGg/preview"
    },
    english: {
      title: "Official Sports Day Handbook & Program (English Edition)",
      subtitle: "Event Master Guide, Referee Directives, Safety Protocols & Code of Conduct",
      badge: "PROGRAM / HANDBOOK (EN)",
      badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
      url: "assets/docs/TWS_Sports_Day_2026_English_Program.pdf",
      type: "Official PDF Document",
      icon: "file-text",
      description: "Official English program itinerary, 41 event schedule times, sportsmanship values, scoring rubrics, medal stakes, and safety directives.",
      primaryActionText: "Open Program (PDF)",
      viewModeUrl: "assets/docs/TWS_Sports_Day_2026_English_Program.pdf"
    }
  },

  // 2. แผ่นชีตส่งรายชื่อนักกีฬาและตารางกลาง (Cloud Master Sheets)
  sheets: {
    sportsRegistration: {
      title: "ใบส่งรายชื่อนักกีฬาและควตาทั้ง 4 สี (Master Sports Entry)",
      subtitle: "Official Team Submission Sheets (Amethyst, Crimson, Golden, Jade)",
      badge: "REGISTRATION SHEET",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      url: "https://docs.google.com/spreadsheets/d/14oRVn1mb3iiclWVlBbaR_SYpimgUbaXF/edit?gid=181845680#gid=181845680",
      type: "Google Sheets",
      icon: "table",
      description: "แผ่นงานบันทึกและตรวจสอบควตานักกีฬา 4 สี, ตรวจสอบความถูกต้องรายชื่อ, สถิตินักกีฬาที่ส่งแข่ง และใบรายการแข่งขัน 1-8",
      primaryActionText: "เปิด Google Sheets (ใบส่งรายชื่อ)"
    },
    masterScheduleDuties: {
      title: "ตารางการแข่งขัน 41 รายการ & คำสั่งหน้าที่ครู (Schedule & Duties)",
      subtitle: "41 Master Events Timeline, 13 Teacher Duty Departments & Class Rosters",
      badge: "SCHEDULE & DUTIES",
      badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
      url: "https://docs.google.com/spreadsheets/d/1s1m8HwWhE6AO8pnEaz55VEN7gPWjN5FD4gRvFnVetPs/edit?gid=679114408#gid=679114408",
      type: "Google Sheets",
      icon: "calendar",
      description: "กำหนดเวลา 41 แมตช์พร้อม Call Time, ผังหน้าที่บุคลากร 13 ฝ่าย, บัญชีความสัมพันธ์พี่น้อง และบัญชีรายชื่อ ป.1 - ป.6",
      primaryActionText: "เปิด Google Sheets (ตาราง & หน้าที่)"
    },
    kindergartenAudit: {
      title: "ฐานข้อมูลสีอนุบาลอ้างอิงหลัก (Kindergarten Master Color Audit)",
      subtitle: "Official Sibling Reference Database (Nursery - K.3 All Rooms)",
      badge: "KINDERGARTEN REF",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
      url: "https://docs.google.com/spreadsheets/d/1t8AUXvjN3OWF03M5D1vfdKTPTmbprRx0B0a0qIRw_kg/edit?gid=994616917#gid=994616917",
      type: "Google Sheets",
      icon: "heart",
      description: "ไฟล์อ้างอิงหลักฝ่ายอนุบาลสำหรับตรวจสอบพี่น้องข้ามระดับชั้น อนุบาล - ประถม ให้ตรงสีเดียวกัน 100%",
      primaryActionText: "เปิด Google Sheets (ฐานข้อมูลอนุบาล)"
    }
  }
};

// 34 Master Event Directives (E01 to E34) from official School Entry Sheet
const MASTER_EVENT_CODES = [
  { code: "E01", sport: "30m Sprint", division: "G1 Boys Heat 1", heat: 1, quota: 1, callTime: "08:50", startTime: "09:00", endTime: "09:45", minGrade: 1, maxGrade: 1, gender: "Boy", parents: 0 },
  { code: "E02", sport: "30m Sprint", division: "G1 Boys Heat 2", heat: 2, quota: 1, callTime: "08:50", startTime: "09:00", endTime: "09:45", minGrade: 1, maxGrade: 1, gender: "Boy", parents: 0 },
  { code: "E03", sport: "30m Sprint", division: "G1 Girls Heat 1", heat: 1, quota: 1, callTime: "08:50", startTime: "09:00", endTime: "09:45", minGrade: 1, maxGrade: 1, gender: "Girl", parents: 0 },
  { code: "E04", sport: "30m Sprint", division: "G1 Girls Heat 2", heat: 2, quota: 1, callTime: "08:50", startTime: "09:00", endTime: "09:45", minGrade: 1, maxGrade: 1, gender: "Girl", parents: 0 },
  { code: "E05", sport: "30m Sprint", division: "G2 Boys Heat 1", heat: 1, quota: 1, callTime: "08:50", startTime: "09:00", endTime: "09:45", minGrade: 2, maxGrade: 2, gender: "Boy", parents: 0 },
  { code: "E06", sport: "30m Sprint", division: "G2 Boys Heat 2", heat: 2, quota: 1, callTime: "08:50", startTime: "09:00", endTime: "09:45", minGrade: 2, maxGrade: 2, gender: "Boy", parents: 0 },
  { code: "E07", sport: "30m Sprint", division: "G2 Girls Heat 1", heat: 1, quota: 1, callTime: "08:50", startTime: "09:00", endTime: "09:45", minGrade: 2, maxGrade: 2, gender: "Girl", parents: 0 },
  { code: "E08", sport: "30m Sprint", division: "G2 Girls Heat 2", heat: 2, quota: 1, callTime: "08:50", startTime: "09:00", endTime: "09:45", minGrade: 2, maxGrade: 2, gender: "Girl", parents: 0 },
  { code: "E09", sport: "30m Sprint", division: "G3 Boys Heat 1", heat: 1, quota: 1, callTime: "08:50", startTime: "09:00", endTime: "09:45", minGrade: 3, maxGrade: 3, gender: "Boy", parents: 0 },
  { code: "E10", sport: "30m Sprint", division: "G3 Boys Heat 2", heat: 2, quota: 1, callTime: "08:50", startTime: "09:00", endTime: "09:45", minGrade: 3, maxGrade: 3, gender: "Boy", parents: 0 },
  { code: "E11", sport: "30m Sprint", division: "G3 Girls Heat 1", heat: 1, quota: 1, callTime: "08:50", startTime: "09:00", endTime: "09:45", minGrade: 3, maxGrade: 3, gender: "Girl", parents: 0 },
  { code: "E12", sport: "30m Sprint", division: "G3 Girls Heat 2", heat: 2, quota: 1, callTime: "08:50", startTime: "09:00", endTime: "09:45", minGrade: 3, maxGrade: 3, gender: "Girl", parents: 0 },
  { code: "E13", sport: "30m Sprint", division: "G4 Boys Heat 1", heat: 1, quota: 1, callTime: "08:50", startTime: "09:00", endTime: "09:45", minGrade: 4, maxGrade: 4, gender: "Boy", parents: 0 },
  { code: "E14", sport: "30m Sprint", division: "G4 Boys Heat 2", heat: 2, quota: 1, callTime: "08:50", startTime: "09:00", endTime: "09:45", minGrade: 4, maxGrade: 4, gender: "Boy", parents: 0 },
  { code: "E15", sport: "30m Sprint", division: "G4 Girls Heat 1", heat: 1, quota: 1, callTime: "08:50", startTime: "09:00", endTime: "09:45", minGrade: 4, maxGrade: 4, gender: "Girl", parents: 0 },
  { code: "E16", sport: "30m Sprint", division: "G4 Girls Heat 2", heat: 2, quota: 1, callTime: "08:50", startTime: "09:00", endTime: "09:45", minGrade: 4, maxGrade: 4, gender: "Girl", parents: 0 },
  { code: "E17", sport: "30m Sprint", division: "G5 Boys Heat 1", heat: 1, quota: 1, callTime: "08:50", startTime: "09:00", endTime: "09:45", minGrade: 5, maxGrade: 5, gender: "Boy", parents: 0 },
  { code: "E18", sport: "30m Sprint", division: "G5 Boys Heat 2", heat: 2, quota: 1, callTime: "08:50", startTime: "09:00", endTime: "09:45", minGrade: 5, maxGrade: 5, gender: "Boy", parents: 0 },
  { code: "E19", sport: "30m Sprint", division: "G5 Girls Heat 1", heat: 1, quota: 1, callTime: "08:50", startTime: "09:00", endTime: "09:45", minGrade: 5, maxGrade: 5, gender: "Girl", parents: 0 },
  { code: "E20", sport: "30m Sprint", division: "G5 Girls Heat 2", heat: 2, quota: 1, callTime: "08:50", startTime: "09:00", endTime: "09:45", minGrade: 5, maxGrade: 5, gender: "Girl", parents: 0 },
  { code: "E21", sport: "30m Sprint", division: "G6 Boys Heat 1", heat: 1, quota: 1, callTime: "08:50", startTime: "09:00", endTime: "09:45", minGrade: 6, maxGrade: 6, gender: "Boy", parents: 0 },
  { code: "E22", sport: "30m Sprint", division: "G6 Girls Heat 1", heat: 1, quota: 1, callTime: "08:50", startTime: "09:00", endTime: "09:45", minGrade: 6, maxGrade: 6, gender: "Girl", parents: 0 },
  { code: "E23", sport: "6x30m Shuttle Relay", division: "G1-G3 Boys (2/grade)", quota: 6, callTime: "09:35", startTime: "09:45", endTime: "10:00", minGrade: 1, maxGrade: 3, gender: "Boy", parents: 0 },
  { code: "E24", sport: "6x30m Shuttle Relay", division: "G1-G3 Girls (2/grade)", quota: 6, callTime: "09:35", startTime: "09:45", endTime: "10:00", minGrade: 1, maxGrade: 3, gender: "Girl", parents: 0 },
  { code: "E25", sport: "6x30m Shuttle Relay", division: "G4-G6 Boys (2/grade)", quota: 6, callTime: "09:35", startTime: "09:45", endTime: "10:00", minGrade: 4, maxGrade: 6, gender: "Boy", parents: 0 },
  { code: "E26", sport: "6x30m Shuttle Relay", division: "G4-G6 Girls (2/grade)", quota: 6, callTime: "09:35", startTime: "09:45", endTime: "10:00", minGrade: 4, maxGrade: 6, gender: "Girl", parents: 0 },
  { code: "E27", sport: "Football Split-Squad", division: "G3-G6 (4 Jr + 4 Sr + 1 GK)", quota: 9, callTime: "09:50", startTime: "10:00", endTime: "10:15", minGrade: 3, maxGrade: 6, gender: "Any", parents: 0 },
  { code: "E28", sport: "Primary Chairball", division: "G1-G2 Squad", quota: 6, callTime: "10:05", startTime: "10:15", endTime: "10:25", minGrade: 1, maxGrade: 2, gender: "Any", parents: 0 },
  { code: "E29", sport: "Basketball 3x3", division: "G3-G4 Junior Squad", quota: 3, callTime: "10:15", startTime: "10:25", endTime: "10:35", minGrade: 3, maxGrade: 4, gender: "Any", parents: 0 },
  { code: "E30", sport: "Basketball 3x3", division: "G5-G6 Senior Squad", quota: 3, callTime: "10:15", startTime: "10:25", endTime: "10:35", minGrade: 5, maxGrade: 6, gender: "Any", parents: 0 },
  { code: "E31", sport: "Fastball Throwing", division: "G1-G6 (2 per grade)", quota: 12, callTime: "10:25", startTime: "10:35", endTime: "10:45", minGrade: 1, maxGrade: 6, gender: "Any", parents: 1 },
  { code: "E32", sport: "Hula Hoop Relay", division: "G1-G6 (1 per grade)", quota: 6, callTime: "10:35", startTime: "10:45", endTime: "10:55", minGrade: 1, maxGrade: 6, gender: "Any", parents: 6 },
  { code: "E33", sport: "3-Legged Family Relay", division: "G1-G3 Junior Pairs", quota: 3, callTime: "10:40", startTime: "10:55", endTime: "11:05", minGrade: 1, maxGrade: 3, gender: "Any", parents: 3 },
  { code: "E34", sport: "3-Legged Family Relay", division: "G4-G6 Senior Pairs", quota: 3, callTime: "10:40", startTime: "11:05", endTime: "11:15", minGrade: 4, maxGrade: 6, gender: "Any", parents: 3 }
];

const SPORT_REGISTRATION_CATEGORIES = [
  {
    id: "sprint_30m",
    name: "30-Meter Sprint (วิ่ง 30 เมตร)",
    grades: "G1 - G6",
    gender: "Boys & Girls (Heats E01-E22)",
    quotaPerColor: "1 runner per heat (22 heats total = 22 slots)",
    icon: "zap",
    type: "Individual Track",
    description: "Straight line 30m track sprint. Every heat awards 1st Gold, 2nd Silver, 3rd Bronze.",
    rules: "1 runner per color per heat. False start warning on 1st offense, disqualified on 2nd."
  },
  {
    id: "relay_shuttle",
    name: "6 x 30m Shuttle Relay (วิ่งผลัด)",
    grades: "G1-G3 (Junior) & G4-G6 (Senior)",
    gender: "Boys Team & Girls Team (E23-E26)",
    quotaPerColor: "6 runners per team (2 per grade = 24 slots total)",
    icon: "repeat",
    type: "Team Relay",
    description: "Baton exchange shuttle sprint over 30m distances (total team distance: 180m).",
    rules: "Each kingdom enters 4 relay teams: G1-G3 Boys, G1-G3 Girls, G4-G6 Boys, G4-G6 Girls."
  },
  {
    id: "football_split",
    name: "Football Split-Squad (ฟุตบอลแบ่งเซต)",
    grades: "G3 - G6",
    gender: "Open / Co-ed (E27)",
    quotaPerColor: "9 players (4 G3–G4 + 4 G5–G6 + 1 Higher Grade GK)",
    icon: "activity",
    type: "Team Sport",
    description: "4 mins G3-G4 squad + 4 mins G5-G6 squad. 1 GK from Higher Grade plays full match without sub. If tied, immediate penalty shootout.",
    rules: "Separate football and basketball players where possible to avoid player fatigue. Goalkeeper must be G5–G6."
  },
  {
    id: "chairball",
    name: "Primary Chairball (แชร์บอล)",
    grades: "G1 - G2",
    gender: "Open / Co-ed (E28)",
    quotaPerColor: "6 players per color (5 on court + 1 basket holder)",
    icon: "target",
    type: "Team Sport",
    description: "Dual courts simultaneous play for 3rd place and Championship titles. 6 minutes continuous.",
    rules: "Safe soft-touch ball. Basket holder stands on designated base without chairs for young athletes' safety."
  },
  {
    id: "basketball_3x3",
    name: "Basketball 3x3 (บาสเกตบอล)",
    grades: "G3 - G6 (Split Squad)",
    gender: "Open / Co-ed (E29 & E30)",
    quotaPerColor: "6 players (3 Junior G3-G4 + 3 Senior G5-G6)",
    icon: "circle",
    type: "Team Sport",
    description: "Continuous running score: Junior squad plays first 3 mins, Senior squad plays remaining 3 mins.",
    rules: "All 6 squad members receive medals if team places in top 3."
  },
  {
    id: "family_fastball",
    name: "Fastball Throwing (Family)",
    grades: "G1 - G6",
    gender: "Any + 1 Parent (E31)",
    quotaPerColor: "12 students (2 per grade) + 1 Parent catcher",
    icon: "layers",
    type: "Family Game",
    description: "90 seconds rapid target throwing. Students throw soft balls into giant basket held by parent.",
    rules: "Throws scored from grade-marked distance lines."
  },
  {
    id: "family_hula_hoop",
    name: "Hula Hoop Relay (Family)",
    grades: "G1 - G6",
    gender: "Any + 6 Parents (E32)",
    quotaPerColor: "6 students (1 per grade) + 6 Parents",
    icon: "compass",
    type: "Family Game",
    description: "Hand-in-hand human chain passing hoop from start to end without breaking grip in 90 seconds.",
    rules: "Hands must stay clasped at all times."
  },
  {
    id: "family_3legged",
    name: "3-Legged Family Relay (เดิน 3 ขา)",
    grades: "Junior (G1-G3) & Senior (G4-G6)",
    gender: "Parent + Student Pairs (E33 & E34)",
    quotaPerColor: "6 pairs (3 Junior pairs + 3 Senior pairs)",
    icon: "users",
    type: "Family Game",
    description: "Baton shuttle relay with soft velcro ankle fasteners. Fast walking only for safety.",
    rules: "Pair must come to a stop if balance is disrupted before resetting."
  },
  {
    id: "special_exhibitions",
    name: "Special Exhibition Clashes",
    grades: "Student All-Stars & Parents / Teachers",
    gender: "Kids vs Parents & Parents vs Teachers",
    quotaPerColor: "Kids: 7-8 students; Parents: 5-6 parents; Teachers: 12 teachers",
    icon: "sparkles",
    type: "Exhibition",
    description: "Moms vs Kids Chairball, Dads vs Kids Giant Football, Giant Volleyball (Parents vs Teachers).",
    rules: "Focus strictly on joy, sportsmanship, and safe fun!"
  }
];

// Global window exposure to guarantee availability across all scripts
if (typeof window !== 'undefined') {
  window.OFFICIAL_LINKS = OFFICIAL_LINKS;
  window.MASTER_EVENT_CODES = MASTER_EVENT_CODES;
  window.SPORT_REGISTRATION_CATEGORIES = SPORT_REGISTRATION_CATEGORIES;
}

if (typeof module !== 'undefined') {
  module.exports = { OFFICIAL_LINKS, MASTER_EVENT_CODES, SPORT_REGISTRATION_CATEGORIES };
}
