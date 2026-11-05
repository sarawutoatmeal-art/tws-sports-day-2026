// Techawit School Sports Day 2026 - Official Teacher Duties & Responsibilities
// Updated directly from Master Duty Sheet: https://docs.google.com/spreadsheets/d/1s1m8HwWhE6AO8pnEaz55VEN7gPWjN5FD4gRvFnVetPs/edit?gid=679114408#gid=679114408

const TEACHER_DUTIES = [
  {
    category: "1. Master of Ceremonies (MC)",
    categoryTh: "ฝ่ายพิธีกรดำเนินกิจกรรม",
    icon: "mic",
    color: "amber",
    description: "Hosting the opening and closing ceremonies, game announcements, live commentary, and timekeeping coordination.",
    teachers: [
      { name: "External Professional MC (พิธีกรภายนอก)", role: "Lead Master of Ceremonies" }
    ],
    notes: "Coordinates directly with the School Administration and Event Coordinators throughout the day."
  },
  {
    category: "2. Award Announcement & Award Management",
    categoryTh: "ฝ่ายประกาศ และจัดเตรียมรับมอบรางวัล และเชิญรางวัล",
    icon: "award",
    color: "yellow",
    description: "Preparing medal trays, organizing trophy presentations, managing award announcements, and VIP escorts.",
    teachers: [
      { name: "T.June", role: "Head of Award Management" },
      { name: "T.Fon", role: "Award Management Team & Award Announcement" },
      { name: "Kindergarten Team", role: "Award Management Team" }
    ],
    notes: "Medals (186 medals total) must be staged accurately before each division final to ensure prompt podium ceremonies."
  },
  {
    category: "3. Registration Team",
    categoryTh: "ฝ่ายลงทะเบียนนักเรียน ผู้ปกครอง และลงทะเบียนนักกีฬา",
    icon: "clipboard-check",
    color: "blue",
    description: "Student, parent, and athlete registration, wristband distribution, and team check-in verification.",
    teachers: [
      { name: "T.Dada", role: "Parent Registration Desk (08:00 - 08:20)" },
      { name: "T.Shake", role: "Parent Registration Desk (08:00 - 08:20)" },
      { name: "T.Hannah", role: "Athlete Registration Desk (08:40 - 11:40)" },
      { name: "T.Nuch", role: "Athlete Registration Desk (08:40 - 11:40)" }
    ],
    notes: "Parent Registration: 08:00-08:20 at Entrance. Athlete Registration: 08:40-11:40 at Gym Field Desk."
  },
  {
    category: "4. Color Teams - House Masters",
    categoryTh: "คณะคุณครูประจำสี (5 ท่านต่อสี รวม 20 ท่าน)",
    icon: "shield",
    color: "indigo",
    description: "Student lineup, athlete marshalling at call times, cheering squad leadership, and student welfare.",
    colorGroups: [
      {
        kingdom: "Amethyst Kingdom",
        color: "Purple",
        colorTh: "สีม่วง",
        badgeClass: "bg-purple-100 text-purple-900 border-purple-300",
        teachers: [
          { name: "T.Iris", role: "Head of House (ครูประจำสี - หัวหน้าทีม)" },
          { name: "T.Lorie", role: "Assistant Head (ผู้ช่วย)" },
          { name: "T.Donut", role: "House Team Teacher" },
          { name: "T.Joey", role: "House Team Teacher" },
          { name: "T.Sai", role: "House Team Teacher" }
        ]
      },
      {
        kingdom: "Golden Realm",
        color: "Yellow",
        colorTh: "สีเหลือง",
        badgeClass: "bg-amber-100 text-amber-900 border-amber-300",
        teachers: [
          { name: "T.Jib", role: "Head of House (ครูประจำสี - หัวหน้าทีม)" },
          { name: "T.Marky", role: "Assistant Head (ผู้ช่วย)" },
          { name: "T.Tai", role: "House Team Teacher" },
          { name: "T.Erik", role: "House Team Teacher" },
          { name: "T.Kaew", role: "House Team Teacher" }
        ]
      },
      {
        kingdom: "Jade Dynasty",
        color: "Green",
        colorTh: "สีเขียว",
        badgeClass: "bg-emerald-100 text-emerald-900 border-emerald-300",
        teachers: [
          { name: "T.Tuk", role: "Head of House (ครูประจำสี - หัวหน้าทีม)" },
          { name: "T.Mike", role: "Assistant Head (ผู้ช่วย)" },
          { name: "T.Gilbert", role: "House Team Teacher" },
          { name: "T.Bonnie", role: "House Team Teacher" },
          { name: "T.BELL", role: "House Team Teacher" }
        ]
      },
      {
        kingdom: "Crimson Empire",
        color: "Red",
        colorTh: "สีแดง",
        badgeClass: "bg-rose-100 text-rose-900 border-rose-300",
        teachers: [
          { name: "T.Beam", role: "Head of House (ครูประจำสี - หัวหน้าทีม)" },
          { name: "T.EJ", role: "Assistant Head (ผู้ช่วย)" },
          { name: "T.Oil", role: "House Team Teacher" },
          { name: "T.Mary", role: "House Team Teacher" },
          { name: "T.Natalia", role: "House Team Teacher" }
        ]
      }
    ],
    notes: "House teachers ensure athletes are assembled and ready at the marshalling station 10 minutes prior to call time."
  },
  {
    category: "5. Sports Referee & Team Sports Coordinator",
    categoryTh: "ฝ่ายตัดสินกีฬา และทีมประสานงาน",
    icon: "whistle",
    color: "emerald",
    description: "Official match officiating, race timing, rules compliance, and field coordination.",
    teachers: [
      { name: "T.OAT", role: "Head of Sports Referee" },
      { name: "T.CRISTIAN", role: "Assistant Head Referee" },
      { name: "T.CREAM", role: "Referee & Field Coordinator" },
      { name: "T.Nott", role: "Referee & Match Coordinator" }
    ],
    notes: "Safety-first protocol. All game rules adhere to Primary Physical Education safety standards."
  },
  {
    category: "6. First Aid Team",
    categoryTh: "ฝ่ายปฐมพยาบาล",
    icon: "heart-pulse",
    color: "rose",
    description: "Emergency medical triage, ice packs, bandaging, electrolyte hydration, and rapid response.",
    teachers: [
      { name: "T.Kaew", role: "First Aid & Medical Station Lead" }
    ],
    notes: "First Aid Station located by the main gym entrance near Court B."
  },
  {
    category: "7. Venue & Refreshment Team",
    categoryTh: "ฝ่ายปฏิคม และสถานที่/อาหารว่าง",
    icon: "coffee",
    color: "amber",
    description: "Hospitality, guest refreshments, parent reception, water stations, and venue hospitality.",
    teachers: [
      { name: "T.Bee", role: "Venue & Hospitality Coordinator" },
      { name: "T.Dada", role: "Refreshments & Water Station Support" },
      { name: "T.Ester", role: "Hospitality & Guest Liaison" },
      { name: "T.Shake", role: "Refreshments & Logistics Support" }
    ],
    notes: "Ensure water and electrolyte refill stations are stocked for all 4 kingdoms throughout the day."
  },
  {
    category: "8. Sound System & Music Team",
    categoryTh: "ฝ่ายเครื่องเสียง และดนตรี",
    icon: "volume-2",
    color: "purple",
    description: "Audio management, microphone testing, entrance fanfares, ceremony anthems, and background music.",
    teachers: [
      { name: "T.Noth", role: "Chief Sound Engineer & Audio Controller" }
    ],
    notes: "Continuous operation across gym and court areas; coordinate with MC for audio cues."
  },
  {
    category: "9. Photography, Video & Graphics Team",
    categoryTh: "ฝ่ายภาพถ่าย วิดีโอ และสื่อกราฟิก",
    icon: "camera",
    color: "sky",
    description: "Photojournalism, live video recording, social media updates, and podium portrait photography.",
    teachers: [
      { name: "T.SHO", role: "Lead Event Photographer" },
      { name: "T.MARK", role: "Video Recording & Action Shots" },
      { name: "T.CHOMPU", role: "Social Media & Media Archives" }
    ],
    notes: "Capture key moments: Opening march, Kingdom cheering squads, family games, and medal ceremonies."
  },
  {
    category: "10. Traffic & General Assistance Team",
    categoryTh: "ฝ่ายช่วยเหลือด้านการจราจร และทั่วไป",
    icon: "truck",
    color: "slate",
    description: "School gate traffic coordination, parking guidance, equipment transport, and campus safety.",
    teachers: [
      { name: "P.Sak", role: "Traffic Marshall & Parking Control" },
      { name: "P.Nui", role: "Campus Security & General Assistance" },
      { name: "Louis", role: "Equipment Transport & Field Support" }
    ],
    notes: "Peak parking flow: 07:30 - 08:30 and 11:30 - 12:30."
  },
  {
    category: "11. Award Presentation & Opening Ceremony Team",
    categoryTh: "ฝ่ายพิธีเปิด และมอบรางวัลเกียรติยศ",
    icon: "crown",
    color: "yellow",
    description: "Official opening declaration, welcome address to parents, and awarding trophies/medals to champion kingdoms.",
    teachers: [
      { name: "School Administration (คณะผู้บริหารโรงเรียน)", role: "Ceremony Presiding Officers & Dignitaries" }
    ],
    notes: "Opening Ceremony starts at 08:20 AM promptly."
  },
  {
    category: "12. Venue Decoration & Field Setup Team",
    categoryTh: "ฝ่ายตกแต่งสถานที่และสนามแข่งขัน",
    icon: "sparkles",
    color: "amber",
    description: "Field staging, track lines, court boundary setups, podium backdrops, and kingdom cheering booth setups.",
    teachers: [
      { name: "T.OAT", role: "Field Setup Lead & Track Layout (ทีมงานผู้ตัดสิน)" },
      { name: "T.CRISTIAN", role: "Gymnasium Courts A & B Setup (ทีมงานผู้ตัดสิน)" },
      { name: "T.CREAM", role: "Equipment & Arena Boundaries (ทีมงานผู้ตัดสิน)" },
      { name: "T.Nott", role: "Safety Barriers & Field Layout (ทีมงานผู้ตัดสิน)" },
      { name: "T.Bee", role: "Venue & Hospitality Staging (ฝ่ายสถานที่)" },
      { name: "T.Ester", role: "Podium & Stage Dressing (ฝ่ายสถานที่)" },
      { name: "House Masters & Teachers (ครูประจำสี)", role: "Kingdom Cheering Booths Decoration (บูธประจำสีทั้ง 4 สี)" }
    ],
    notes: "Court & track layout handled by Referees & Venue team (No traffic staff involved). House Masters lead the decor for their respective color cheering booths."
  },
  {
    category: "13. Public Relations & Media Communication Team",
    categoryTh: "ฝ่ายประชาสัมพันธ์และสื่อสารกิจกรรม",
    icon: "megaphone",
    color: "sky",
    description: "Live news coverage, parent community updates, photo/video highlights, ceremony hypes, and kingdom spirit promotions.",
    teachers: [
      { name: "T.SHO", role: "Visual Media Director (ฝ่ายบันทึกภาพ)" },
      { name: "T.MARK", role: "Live Video Coverage & Reels (ฝ่ายบันทึกภาพ)" },
      { name: "T.CHOMPU", role: "Social Media & Parent PR Updates (ฝ่ายสื่อและกราฟิก)" },
      { name: "T.June", role: "Ceremony & Award Highlights PR (ฝ่ายรางวัล)" },
      { name: "T.Fon", role: "Award Results & Live Podium Announcements (ฝ่ายรางวัล)" },
      { name: "House PR Champions (ตัวแทนครูประจำสี)", role: "Kingdom Cheering & Team Spirit Coverage (ประชาสัมพันธ์ภายในสี)" }
    ],
    notes: "Collaborative PR cell uniting Photography/Video team, Award team, and House Masters to broadcast real-time spirit and parent announcements."
  }
];
