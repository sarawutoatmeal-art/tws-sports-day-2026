// Techawit School Sports Day 2026 - Master Schedule, Rules & Medal Breakdown
const EVENT_SCHEDULE = [
  {
    time: "08:00 – 08:20",
    callTime: "–",
    title: "Registration & Welcome",
    thaiTitle: "ลงทะเบียนผู้ปกครองและนักเรียน",
    category: "ceremony",
    location: "Main Gymnasium Entrance",
    description: "Parent and student check-in, kingdom sticker and wristband distribution, welcome drink stations.",
    highlight: false
  },
  {
    time: "08:20 – 08:30",
    callTime: "08:15",
    title: "Kingdom Assembly",
    thaiTitle: "นักเรียนและครูรวมตามสี ณ โรงยิม",
    category: "ceremony",
    location: "Main Gymnasium Arena",
    description: "Students and teachers assemble by kingdom colors (Amethyst, Crimson, Golden, Jade) in full uniform.",
    highlight: false
  },
  {
    time: "08:30 – 08:50",
    callTime: "08:25",
    title: "Grand Opening Ceremony",
    thaiTitle: "พิธีเปิด ประธานกล่าวเปิด ถ่ายภาพทีม และอบอุ่นร่างกาย",
    category: "ceremony",
    location: "Center Stage & Court",
    description: "Arrival of flags, royal kingdom fanfare, Chairman's opening speech, official team photographs, and school-wide warm-up.",
    highlight: true
  },
  {
    time: "09:00 – 09:45",
    callTime: "08:50",
    eventCode: "Events #1–22",
    title: "30-Meter Sprint (G1–G6)",
    thaiTitle: "วิ่ง 30 เมตร G1–G6 รวม 22 รอบ",
    category: "track",
    location: "Main Sprint Track (Lanes 1–4)",
    description: "Individual sprint heats for Grades 1–6 (Boys & Girls). Every heat is a medal race: 1st Gold, 2nd Silver, 3rd Bronze. Total 22 heats, 88 runner slots.",
    rules: "1 runner per color per heat. False start warning on 1st offense, disqualified on 2nd. Runners must remain in assigned lane.",
    medals: "22 Gold, 22 Silver, 22 Bronze (66 Medals)",
    highlight: true
  },
  {
    time: "09:45 – 10:00",
    callTime: "09:35",
    eventCode: "Events #25–28",
    title: "6 × 30m Shuttle Relay",
    thaiTitle: "วิ่งผลัด 6 × 30 เมตร รวม 4 รายการ",
    category: "track",
    location: "Main Sprint Track",
    description: "4 divisions: G1-G3 Boys, G1-G3 Girls, G4-G6 Boys, G4-G6 Girls. 6 runners per team (2 per grade level). Each athlete sprints 30m with baton exchange (Total 180m).",
    rules: "Baton must be passed cleanly within exchange zone. Dropped batons must be retrieved by the runner who dropped it.",
    medals: "24 Gold, 24 Silver, 24 Bronze (72 Medals)",
    highlight: true
  },
  {
    time: "10:00 – 10:15",
    callTime: "09:50",
    eventCode: "Events #29–30",
    title: "Football 5v5 Championship (G3–G6)",
    thaiTitle: "ฟุตบอล G3–G6 ชิงอันดับ 3 และ 1",
    category: "court",
    location: "Gymnasium Field Court",
    description: "5 players per team (including 1 goalkeeper). 3rd place match followed immediately by the Championship final. 6 minutes continuous play per match (no half-time).",
    rules: "No offside. Throw-ins replaced with kick-ins. Substitutions on the fly with referee acknowledgment.",
    medals: "5 Gold, 5 Silver, 5 Bronze (15 Medals)",
    highlight: false
  },
  {
    time: "10:15 – 10:25",
    callTime: "10:05",
    eventCode: "Events #31–32",
    title: "Chairball (G1–G2 Dual Courts)",
    thaiTitle: "แชร์บอล G1–G2 ชิงอันดับ 1 และ 3 พร้อมกัน",
    category: "court",
    location: "Courts A & B",
    description: "6 players per team (5 on court + 1 basket holder). Both 3rd place and Championship matches played simultaneously across two courts. 6 minutes continuous play.",
    rules: "No dribbling or walking with the ball. Defenders must stay at least 1 meter away from chair holder. Safe soft-touch ball used.",
    medals: "6 Gold, 6 Silver, 6 Bronze (18 Medals)",
    highlight: false
  },
  {
    time: "10:25 – 10:35",
    callTime: "10:15",
    eventCode: "Events #33–34",
    title: "Basketball 3×3 (Dual Courts)",
    thaiTitle: "บาส 3 × 3 ชิงอันดับ 1 และ 3 พร้อมกัน",
    category: "court",
    location: "Courts A & B",
    description: "Junior squad (G3–G4, 3 players) plays first 3 minutes; Senior squad (G5–G6, 3 players) plays final 3 minutes. Total 6 minutes continuous running score.",
    rules: "Continuous score tally between squads. Top 3 teams receive medals for all 6 squad members.",
    medals: "6 Gold, 6 Silver, 6 Bronze (18 Medals)",
    highlight: false
  },
  {
    time: "10:35 – 10:45",
    callTime: "10:25",
    eventCode: "Event #35",
    title: "Family Game: Fastball Throwing",
    thaiTitle: "Fastball Throwing ทั้ง 4 สี",
    category: "family",
    location: "Central Arena",
    description: "All 4 kingdoms compete simultaneously. Per color: 12 students (2 from each grade G1–G6) + 1 parent holding giant basket. 1 minute 30 seconds time limit.",
    rules: "Soft balls only. Students throw sequentially from age-adjusted markings. Parent catches in basket without stepping outside catcher ring.",
    rewards: "Sweet snack treat hamper & Kingdom Spirit points",
    highlight: false
  },
  {
    time: "10:45 – 10:55",
    callTime: "10:35",
    eventCode: "Event #36",
    title: "Family Game: Hula Hoop Relay",
    thaiTitle: "Hula Hoop Relay ทั้ง 4 สี",
    category: "family",
    location: "Central Arena",
    description: "Per color: 6 students (1 from each grade G1–G6) alternating in line with 6 parents (Total 12 members per color). Passing hoop without letting go of hands. 1 min 30 sec.",
    rules: "Hands must stay linked. Hoop passes over head and under feet. If grip breaks, hoop returns to previous participant.",
    rewards: "Kingdom Spirit ribbons & snack hamper",
    highlight: false
  },
  {
    time: "10:55 – 11:05",
    callTime: "10:45",
    eventCode: "Event #37",
    title: "Family Relay: 3-Legged Race (Junior)",
    thaiTitle: "Family Relay เดิน 3 ขา รุ่นเล็ก (G1–G3)",
    category: "family",
    location: "Sprint Track",
    description: "Junior Division (G1–G3): 3 student-parent pairs per kingdom (Total 12 pairs across 4 colors). Shuttle relay style with soft velcro bands.",
    rules: "Walking pace only (no sprint leaping). Next pair departs only after previous pair crosses finish boundary.",
    rewards: "Junior Family Champ Medals & snack hamper",
    highlight: false
  },
  {
    time: "11:05 – 11:15",
    callTime: "10:55",
    eventCode: "Event #38",
    title: "Family Relay: 3-Legged Race (Senior)",
    thaiTitle: "Family Relay เดิน 3 ขา รุ่นโต (G4–G6)",
    category: "family",
    location: "Sprint Track",
    description: "Senior Division (G4–G6): 3 student-parent pairs per kingdom (Total 12 pairs across 4 colors). Shuttle relay style.",
    rules: "Soft velcro ankle wraps. Fast walking only; if a pair loses balance, stop and re-adjust before continuing.",
    rewards: "Senior Family Champ Medals & snack hamper",
    highlight: false
  },
  {
    time: "11:15 – 11:25",
    callTime: "11:05",
    eventCode: "Special #38B",
    title: "Special Match: Moms vs Kids Chairball",
    thaiTitle: "แชร์บอล คุณแม่ vs ทีมลูก",
    category: "special",
    location: "Court A",
    description: "Mother All-Stars (6 Moms) vs Student All-Stars (8 Students). 6 minutes match with giant floor basket and ultra-soft ball.",
    rules: "Non-contact exhibition match. No ball stripping from hands. Basket holder stands safely on ground (no chair standing).",
    rewards: "Commemorative certificates & huge cheers",
    highlight: true
  },
  {
    time: "11:25 – 11:35",
    callTime: "11:15",
    eventCode: "Special #39",
    title: "Special Match: Dads vs Kids Giant Soccer",
    thaiTitle: "ฟุตบอลยักษ์ คุณพ่อ vs ทีมลูก",
    category: "special",
    location: "Field Court",
    description: "Father All-Stars (5 Dads) vs Student All-Stars (7 Students). 6 minutes friendly match played with a massive oversized soft soccer ball.",
    rules: "Speed-walking only for dads; no hard kicking or slide tackles. Fun-first, comedy-filled match!",
    rewards: "Dad of the Day trophies & sweet treats",
    highlight: true
  },
  {
    time: "11:35 – 11:50",
    callTime: "11:25",
    eventCode: "Special #40–41",
    title: "Exhibition: Giant Volleyball Clashes",
    thaiTitle: "วอลเลย์บอลยักษ์ แม่ vs ครูหญิง แล้วพ่อ vs ครูชาย",
    category: "special",
    location: "Volleyball Court",
    description: "Two 5-minute showdowns: Match 1 (#40): Moms vs Female Teachers (6 vs 6); Match 2 (#41): Dads vs Male Teachers (6 vs 6). Giant lightweight beach ball.",
    rules: "Catch and toss allowed. Must pass to at least 1 teammate before sending ball over net. 3-second hold limit. No jumping spikes.",
    rewards: "Teacher-Parent Fellowship trophy",
    highlight: true
  },
  {
    time: "11:55 – 12:15",
    callTime: "11:55",
    title: "Grand Closing Ceremony & Trophies",
    thaiTitle: "พิธีปิด และพิธีมอบถ้วยรางวัลเกียรติยศ",
    category: "ceremony",
    location: "Center Stage",
    description: "Parade of champions, awarding of the Kingdom Games Overall Champions Cup, Cheering Spirit Award, Thank-you address by School Administration.",
    rules: "All students and teachers return to their Kingdom seating zones for final photo and award celebrations.",
    highlight: true
  }
];

const MEDAL_STATS = [
  { sport: "30-Meter Sprint", gold: 22, silver: 22, bronze: 22, total: 66, note: "G1–G5 (4 heats/grade) + G6 (2 heats) = 22 heats" },
  { sport: "6 × 30m Shuttle Relay", gold: 24, silver: 24, bronze: 24, total: 72, note: "4 divisions × 6 runners per team" },
  { sport: "Football 5v5 (G3–G6)", gold: 5, silver: 5, bronze: 5, total: 15, note: "Top 3 teams (5 players each)" },
  { sport: "Chairball (G1–G2)", gold: 6, silver: 6, bronze: 6, total: 18, note: "Top 3 teams (6 squad members each including basket holder)" },
  { sport: "Basketball 3×3 (G3–G6)", gold: 6, silver: 6, bronze: 6, total: 18, note: "Top 3 teams (6 squad members each)" }
];

const TOTAL_MEDALS = {
  gold: 63,
  silver: 63,
  bronze: 63,
  overall: 189
};

if (typeof window !== 'undefined') {
  window.EVENT_SCHEDULE = EVENT_SCHEDULE;
  window.MEDAL_STATS = MEDAL_STATS;
  window.TOTAL_MEDALS = TOTAL_MEDALS;
}

if (typeof module !== 'undefined') {
  module.exports = { EVENT_SCHEDULE, MEDAL_STATS, TOTAL_MEDALS };
}
