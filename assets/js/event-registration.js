// Techawit School Sports Day 2026 - Event-First Quota Registration Module
// Focused Slot-Based Athlete Registration with Soft Validation (Red Warning Indicators) & Full Bilingual Support

const EVENT_REG_STATE = {
  selectedColor: 'Green', // Default to Green (Jade Dynasty)
  selectedCategory: 'football', // Start on Football or first sequential category ('sprint', 'relay', 'football', 'chairball', 'basketball', 'family', 'special', 'all')
  searchQuery: '',
  activeModalEventCode: null,
  activeModalSlotIndex: null,
  modalSearchQuery: '',
  modalFilterMode: 'all' // 'all', 'eligible_only', 'zero_events'
};

// 36 Comprehensive Competition Events with Complete Rules & Exact Locked Quotas
const EVENT_REGISTRATION_CONFIG = [
  // ==========================================
  // 1. 30-Meter Sprint Heats (E01 to E22)
  // ==========================================
  {
    code: "E01", category: "sprint", categoryLabel: "วิ่ง 30 ม. (เดี่ยว)", heat: 1,
    title: "วิ่ง 30 ม. ป.1 ชาย Heat 1", titleEn: "30m Sprint G1 Boys Heat 1",
    time: "09:00 – 09:45", callTime: "08:50", location: "ลู่วิ่งหลัก (Main Sprint Track)",
    minGrade: 1, maxGrade: 1, gender: "Boy", quota: 1,
    medals: "ชิงเหรียญทอง เงิน ทองแดง ประจำรอบทันที",
    rules: "เฉพาะ ป.1 ชาย • โควตาสีละ 1 คน • ห้ามฟาวล์ออกตัวเกิน 1 ครั้ง",
    recommendedClass: "G1 Giraffe (ห้อง 1)",
    standardEventName: "30m Sprint Heat 1 (วิ่ง 30 ม. Heat 1 - ห้อง 1)"
  },
  {
    code: "E02", category: "sprint", categoryLabel: "วิ่ง 30 ม. (เดี่ยว)", heat: 2,
    title: "วิ่ง 30 ม. ป.1 ชาย Heat 2", titleEn: "30m Sprint G1 Boys Heat 2",
    time: "09:00 – 09:45", callTime: "08:50", location: "ลู่วิ่งหลัก",
    minGrade: 1, maxGrade: 1, gender: "Boy", quota: 1,
    medals: "ชิงเหรียญทอง เงิน ทองแดง ประจำรอบทันที",
    rules: "เฉพาะ ป.1 ชาย • โควตาสีละ 1 คน",
    recommendedClass: "G1 Hippo (ห้อง 2)",
    standardEventName: "30m Sprint Heat 2 (วิ่ง 30 ม. Heat 2 - ห้อง 2)"
  },
  {
    code: "E03", category: "sprint", categoryLabel: "วิ่ง 30 ม. (เดี่ยว)", heat: 1,
    title: "วิ่ง 30 ม. ป.1 หญิง Heat 1", titleEn: "30m Sprint G1 Girls Heat 1",
    time: "09:00 – 09:45", callTime: "08:50", location: "ลู่วิ่งหลัก",
    minGrade: 1, maxGrade: 1, gender: "Girl", quota: 1,
    medals: "ชิงเหรียญทอง เงิน ทองแดง ประจำรอบทันที",
    rules: "เฉพาะ ป.1 หญิง • โควตาสีละ 1 คน",
    recommendedClass: "G1 Giraffe (ห้อง 1)",
    standardEventName: "30m Sprint Heat 1 (วิ่ง 30 ม. Heat 1 - ห้อง 1)"
  },
  {
    code: "E04", category: "sprint", categoryLabel: "วิ่ง 30 ม. (เดี่ยว)", heat: 2,
    title: "วิ่ง 30 ม. ป.1 หญิง Heat 2", titleEn: "30m Sprint G1 Girls Heat 2",
    time: "09:00 – 09:45", callTime: "08:50", location: "ลู่วิ่งหลัก",
    minGrade: 1, maxGrade: 1, gender: "Girl", quota: 1,
    medals: "ชิงเหรียญทอง เงิน ทองแดง ประจำรอบทันที",
    rules: "เฉพาะ ป.1 หญิง • โควตาสีละ 1 คน",
    recommendedClass: "G1 Hippo (ห้อง 2)",
    standardEventName: "30m Sprint Heat 2 (วิ่ง 30 ม. Heat 2 - ห้อง 2)"
  },

  // Grade 2 Heats
  {
    code: "E05", category: "sprint", categoryLabel: "วิ่ง 30 ม. (เดี่ยว)", heat: 1,
    title: "วิ่ง 30 ม. ป.2 ชาย Heat 1", titleEn: "30m Sprint G2 Boys Heat 1",
    time: "09:00 – 09:45", callTime: "08:50", location: "ลู่วิ่งหลัก",
    minGrade: 2, maxGrade: 2, gender: "Boy", quota: 1,
    medals: "ชิงเหรียญทอง เงิน ทองแดง ประจำรอบทันที",
    rules: "เฉพาะ ป.2 ชาย • โควตาสีละ 1 คน",
    recommendedClass: "G2 Zebra (ห้อง 1)",
    standardEventName: "30m Sprint Heat 1 (วิ่ง 30 ม. Heat 1 - ห้อง 1)"
  },
  {
    code: "E06", category: "sprint", categoryLabel: "วิ่ง 30 ม. (เดี่ยว)", heat: 2,
    title: "วิ่ง 30 ม. ป.2 ชาย Heat 2", titleEn: "30m Sprint G2 Boys Heat 2",
    time: "09:00 – 09:45", callTime: "08:50", location: "ลู่วิ่งหลัก",
    minGrade: 2, maxGrade: 2, gender: "Boy", quota: 1,
    medals: "ชิงเหรียญทอง เงิน ทองแดง ประจำรอบทันที",
    rules: "เฉพาะ ป.2 ชาย • โควตาสีละ 1 คน",
    recommendedClass: "G2 Rhino (ห้อง 2)",
    standardEventName: "30m Sprint Heat 2 (วิ่ง 30 ม. Heat 2 - ห้อง 2)"
  },
  {
    code: "E07", category: "sprint", categoryLabel: "วิ่ง 30 ม. (เดี่ยว)", heat: 1,
    title: "วิ่ง 30 ม. ป.2 หญิง Heat 1", titleEn: "30m Sprint G2 Girls Heat 1",
    time: "09:00 – 09:45", callTime: "08:50", location: "ลู่วิ่งหลัก",
    minGrade: 2, maxGrade: 2, gender: "Girl", quota: 1,
    medals: "ชิงเหรียญทอง เงิน ทองแดง ประจำรอบทันที",
    rules: "เฉพาะ ป.2 หญิง • โควตาสีละ 1 คน",
    recommendedClass: "G2 Zebra (ห้อง 1)",
    standardEventName: "30m Sprint Heat 1 (วิ่ง 30 ม. Heat 1 - ห้อง 1)"
  },
  {
    code: "E08", category: "sprint", categoryLabel: "วิ่ง 30 ม. (เดี่ยว)", heat: 2,
    title: "วิ่ง 30 ม. ป.2 หญิง Heat 2", titleEn: "30m Sprint G2 Girls Heat 2",
    time: "09:00 – 09:45", callTime: "08:50", location: "ลู่วิ่งหลัก",
    minGrade: 2, maxGrade: 2, gender: "Girl", quota: 1,
    medals: "ชิงเหรียญทอง เงิน ทองแดง ประจำรอบทันที",
    rules: "เฉพาะ ป.2 หญิง • โควตาสีละ 1 คน",
    recommendedClass: "G2 Rhino (ห้อง 2)",
    standardEventName: "30m Sprint Heat 2 (วิ่ง 30 ม. Heat 2 - ห้อง 2)"
  },

  // Grade 3 Heats
  {
    code: "E09", category: "sprint", categoryLabel: "วิ่ง 30 ม. (เดี่ยว)", heat: 1,
    title: "วิ่ง 30 ม. ป.3 ชาย Heat 1", titleEn: "30m Sprint G3 Boys Heat 1",
    time: "09:00 – 09:45", callTime: "08:50", location: "ลู่วิ่งหลัก",
    minGrade: 3, maxGrade: 3, gender: "Boy", quota: 1,
    medals: "ชิงเหรียญทอง เงิน ทองแดง ประจำรอบทันที",
    rules: "เฉพาะ ป.3 ชาย • โควตาสีละ 1 คน",
    recommendedClass: "G3 Eagle (ห้อง 1)",
    standardEventName: "30m Sprint Heat 1 (วิ่ง 30 ม. Heat 1 - ห้อง 1)"
  },
  {
    code: "E10", category: "sprint", categoryLabel: "วิ่ง 30 ม. (เดี่ยว)", heat: 2,
    title: "วิ่ง 30 ม. ป.3 ชาย Heat 2", titleEn: "30m Sprint G3 Boys Heat 2",
    time: "09:00 – 09:45", callTime: "08:50", location: "ลู่วิ่งหลัก",
    minGrade: 3, maxGrade: 3, gender: "Boy", quota: 1,
    medals: "ชิงเหรียญทอง เงิน ทองแดง ประจำรอบทันที",
    rules: "เฉพาะ ป.3 ชาย • โควตาสีละ 1 คน",
    recommendedClass: "G3 Falcon (ห้อง 2)",
    standardEventName: "30m Sprint Heat 2 (วิ่ง 30 ม. Heat 2 - ห้อง 2)"
  },
  {
    code: "E11", category: "sprint", categoryLabel: "วิ่ง 30 ม. (เดี่ยว)", heat: 1,
    title: "วิ่ง 30 ม. ป.3 หญิง Heat 1", titleEn: "30m Sprint G3 Girls Heat 1",
    time: "09:00 – 09:45", callTime: "08:50", location: "ลู่วิ่งหลัก",
    minGrade: 3, maxGrade: 3, gender: "Girl", quota: 1,
    medals: "ชิงเหรียญทอง เงิน ทองแดง ประจำรอบทันที",
    rules: "เฉพาะ ป.3 หญิง • โควตาสีละ 1 คน",
    recommendedClass: "G3 Eagle (ห้อง 1)",
    standardEventName: "30m Sprint Heat 1 (วิ่ง 30 ม. Heat 1 - ห้อง 1)"
  },
  {
    code: "E12", category: "sprint", categoryLabel: "วิ่ง 30 ม. (เดี่ยว)", heat: 2,
    title: "วิ่ง 30 ม. ป.3 หญิง Heat 2", titleEn: "30m Sprint G3 Girls Heat 2",
    time: "09:00 – 09:45", callTime: "08:50", location: "ลู่วิ่งหลัก",
    minGrade: 3, maxGrade: 3, gender: "Girl", quota: 1,
    medals: "ชิงเหรียญทอง เงิน ทองแดง ประจำรอบทันที",
    rules: "เฉพาะ ป.3 หญิง • โควตาสีละ 1 คน",
    recommendedClass: "G3 Falcon (ห้อง 2)",
    standardEventName: "30m Sprint Heat 2 (วิ่ง 30 ม. Heat 2 - ห้อง 2)"
  },

  // Grade 4 Heats
  {
    code: "E13", category: "sprint", categoryLabel: "วิ่ง 30 ม. (เดี่ยว)", heat: 1,
    title: "วิ่ง 30 ม. ป.4 ชาย Heat 1", titleEn: "30m Sprint G4 Boys Heat 1",
    time: "09:00 – 09:45", callTime: "08:50", location: "ลู่วิ่งหลัก",
    minGrade: 4, maxGrade: 4, gender: "Boy", quota: 1,
    medals: "ชิงเหรียญทอง เงิน ทองแดง ประจำรอบทันที",
    rules: "เฉพาะ ป.4 ชาย • โควตาสีละ 1 คน",
    recommendedClass: "G4 Leopard (ห้อง 1)",
    standardEventName: "30m Sprint Heat 1 (วิ่ง 30 ม. Heat 1 - ห้อง 1)"
  },
  {
    code: "E14", category: "sprint", categoryLabel: "วิ่ง 30 ม. (เดี่ยว)", heat: 2,
    title: "วิ่ง 30 ม. ป.4 ชาย Heat 2", titleEn: "30m Sprint G4 Boys Heat 2",
    time: "09:00 – 09:45", callTime: "08:50", location: "ลู่วิ่งหลัก",
    minGrade: 4, maxGrade: 4, gender: "Boy", quota: 1,
    medals: "ชิงเหรียญทอง เงิน ทองแดง ประจำรอบทันที",
    rules: "เฉพาะ ป.4 ชาย • โควตาสีละ 1 คน",
    recommendedClass: "G4 Panther (ห้อง 2)",
    standardEventName: "30m Sprint Heat 2 (วิ่ง 30 ม. Heat 2 - ห้อง 2)"
  },
  {
    code: "E15", category: "sprint", categoryLabel: "วิ่ง 30 ม. (เดี่ยว)", heat: 1,
    title: "วิ่ง 30 ม. ป.4 หญิง Heat 1", titleEn: "30m Sprint G4 Girls Heat 1",
    time: "09:00 – 09:45", callTime: "08:50", location: "ลู่วิ่งหลัก",
    minGrade: 4, maxGrade: 4, gender: "Girl", quota: 1,
    medals: "ชิงเหรียญทอง เงิน ทองแดง ประจำรอบทันที",
    rules: "เฉพาะ ป.4 หญิง • โควตาสีละ 1 คน",
    recommendedClass: "G4 Leopard (ห้อง 1)",
    standardEventName: "30m Sprint Heat 1 (วิ่ง 30 ม. Heat 1 - ห้อง 1)"
  },
  {
    code: "E16", category: "sprint", categoryLabel: "วิ่ง 30 ม. (เดี่ยว)", heat: 2,
    title: "วิ่ง 30 ม. ป.4 หญิง Heat 2", titleEn: "30m Sprint G4 Girls Heat 2",
    time: "09:00 – 09:45", callTime: "08:50", location: "ลู่วิ่งหลัก",
    minGrade: 4, maxGrade: 4, gender: "Girl", quota: 1,
    medals: "ชิงเหรียญทอง เงิน ทองแดง ประจำรอบทันที",
    rules: "เฉพาะ ป.4 หญิง • โควตาสีละ 1 คน",
    recommendedClass: "G4 Panther (ห้อง 2)",
    standardEventName: "30m Sprint Heat 2 (วิ่ง 30 ม. Heat 2 - ห้อง 2)"
  },

  // Grade 5 Heats
  {
    code: "E17", category: "sprint", categoryLabel: "วิ่ง 30 ม. (เดี่ยว)", heat: 1,
    title: "วิ่ง 30 ม. ป.5 ชาย Heat 1", titleEn: "30m Sprint G5 Boys Heat 1",
    time: "09:00 – 09:45", callTime: "08:50", location: "ลู่วิ่งหลัก",
    minGrade: 5, maxGrade: 5, gender: "Boy", quota: 1,
    medals: "ชิงเหรียญทอง เงิน ทองแดง ประจำรอบทันที",
    rules: "เฉพาะ ป.5 ชาย • โควตาสีละ 1 คน",
    recommendedClass: "G5 Liger (ห้อง 1)",
    standardEventName: "30m Sprint Heat 1 (วิ่ง 30 ม. Heat 1 - ห้อง 1)"
  },
  {
    code: "E18", category: "sprint", categoryLabel: "วิ่ง 30 ม. (เดี่ยว)", heat: 2,
    title: "วิ่ง 30 ม. ป.5 ชาย Heat 2", titleEn: "30m Sprint G5 Boys Heat 2",
    time: "09:00 – 09:45", callTime: "08:50", location: "ลู่วิ่งหลัก",
    minGrade: 5, maxGrade: 5, gender: "Boy", quota: 1,
    medals: "ชิงเหรียญทอง เงิน ทองแดง ประจำรอบทันที",
    rules: "เฉพาะ ป.5 ชาย • โควตาสีละ 1 คน",
    recommendedClass: "G5 Jaguar (ห้อง 2)",
    standardEventName: "30m Sprint Heat 2 (วิ่ง 30 ม. Heat 2 - ห้อง 2)"
  },
  {
    code: "E19", category: "sprint", categoryLabel: "วิ่ง 30 ม. (เดี่ยว)", heat: 1,
    title: "วิ่ง 30 ม. ป.5 หญิง Heat 1", titleEn: "30m Sprint G5 Girls Heat 1",
    time: "09:00 – 09:45", callTime: "08:50", location: "ลู่วิ่งหลัก",
    minGrade: 5, maxGrade: 5, gender: "Girl", quota: 1,
    medals: "ชิงเหรียญทอง เงิน ทองแดง ประจำรอบทันที",
    rules: "เฉพาะ ป.5 หญิง • โควตาสีละ 1 คน",
    recommendedClass: "G5 Liger (ห้อง 1)",
    standardEventName: "30m Sprint Heat 1 (วิ่ง 30 ม. Heat 1 - ห้อง 1)"
  },
  {
    code: "E20", category: "sprint", categoryLabel: "วิ่ง 30 ม. (เดี่ยว)", heat: 2,
    title: "วิ่ง 30 ม. ป.5 หญิง Heat 2", titleEn: "30m Sprint G5 Girls Heat 2",
    time: "09:00 – 09:45", callTime: "08:50", location: "ลู่วิ่งหลัก",
    minGrade: 5, maxGrade: 5, gender: "Girl", quota: 1,
    medals: "ชิงเหรียญทอง เงิน ทองแดง ประจำรอบทันที",
    rules: "เฉพาะ ป.5 หญิง • โควตาสีละ 1 คน",
    recommendedClass: "G5 Jaguar (ห้อง 2)",
    standardEventName: "30m Sprint Heat 2 (วิ่ง 30 ม. Heat 2 - ห้อง 2)"
  },

  // Grade 6 Heats
  {
    code: "E21", category: "sprint", categoryLabel: "วิ่ง 30 ม. (เดี่ยว)", heat: 1,
    title: "วิ่ง 30 ม. ป.6 ชาย Heat 1", titleEn: "30m Sprint G6 Boys Heat 1",
    time: "09:00 – 09:45", callTime: "08:50", location: "ลู่วิ่งหลัก",
    minGrade: 6, maxGrade: 6, gender: "Boy", quota: 1,
    medals: "ชิงเหรียญทอง เงิน ทองแดง ประจำรอบทันที",
    rules: "เฉพาะ ป.6 ชาย • โควตาสีละ 1 คน",
    recommendedClass: "G6 Phoenix",
    standardEventName: "30m Sprint Heat 1 (วิ่ง 30 ม. Heat 1)"
  },
  {
    code: "E22", category: "sprint", categoryLabel: "วิ่ง 30 ม. (เดี่ยว)", heat: 1,
    title: "วิ่ง 30 ม. ป.6 หญิง Heat 1", titleEn: "30m Sprint G6 Girls Heat 1",
    time: "09:00 – 09:45", callTime: "08:50", location: "ลู่วิ่งหลัก",
    minGrade: 6, maxGrade: 6, gender: "Girl", quota: 1,
    medals: "ชิงเหรียญทอง เงิน ทองแดง ประจำรอบทันที",
    rules: "เฉพาะ ป.6 หญิง • โควตาสีละ 1 คน",
    recommendedClass: "G6 Phoenix",
    standardEventName: "30m Sprint Heat 1 (วิ่ง 30 ม. Heat 1)"
  },

  // ==========================================
  // 2. 6x30m Shuttle Relays (E23 to E26)
  // ==========================================
  {
    code: "E23", category: "relay", categoryLabel: "วิ่งผลัด (Relay)",
    title: "วิ่งผลัด 6×30 ม. รุ่นเล็ก ชาย (ป.1–ป.3)", titleEn: "6x30m Relay G1–G3 Boys",
    time: "09:45 – 10:00", callTime: "09:35", location: "ลู่วิ่งหลัก",
    minGrade: 1, maxGrade: 3, gender: "Boy", quota: 6,
    slotsConfig: [
      { id: 1, label: "ไม้ 1: ป.1 ชาย", labelEn: "Leg 1: G1 Boy", targetGrades: [1], targetGender: "Boy" },
      { id: 2, label: "ไม้ 2: ป.1 ชาย", labelEn: "Leg 2: G1 Boy", targetGrades: [1], targetGender: "Boy" },
      { id: 3, label: "ไม้ 3: ป.2 ชาย", labelEn: "Leg 3: G2 Boy", targetGrades: [2], targetGender: "Boy" },
      { id: 4, label: "ไม้ 4: ป.2 ชาย", labelEn: "Leg 4: G2 Boy", targetGrades: [2], targetGender: "Boy" },
      { id: 5, label: "ไม้ 5: ป.3 ชาย", labelEn: "Leg 5: G3 Boy", targetGrades: [3], targetGender: "Boy" },
      { id: 6, label: "ไม้ 6: ป.3 ชาย", labelEn: "Leg 6: G3 Boy", targetGrades: [3], targetGender: "Boy" }
    ],
    medals: "ทีมอันดับ 1–3 รับเหรียญครบทั้ง 6 คน (รวม 18 เหรียญ)",
    rules: "ชาย 6 คน (ป.1=2, ป.2=2, ป.3=2) • ส่งคทาในเขตรับส่ง • คทาตกผู้ทำตกต้องเก็บเอง",
    standardEventName: "6x30m Relay (วิ่งผลัด 6x30 ม.)"
  },
  {
    code: "E24", category: "relay", categoryLabel: "วิ่งผลัด (Relay)",
    title: "วิ่งผลัด 6×30 ม. รุ่นเล็ก หญิง (ป.1–ป.3)", titleEn: "6x30m Relay G1–G3 Girls",
    time: "09:45 – 10:00", callTime: "09:35", location: "ลู่วิ่งหลัก",
    minGrade: 1, maxGrade: 3, gender: "Girl", quota: 6,
    slotsConfig: [
      { id: 1, label: "ไม้ 1: ป.1 หญิง", labelEn: "Leg 1: G1 Girl", targetGrades: [1], targetGender: "Girl" },
      { id: 2, label: "ไม้ 2: ป.1 หญิง", labelEn: "Leg 2: G1 Girl", targetGrades: [1], targetGender: "Girl" },
      { id: 3, label: "ไม้ 3: ป.2 หญิง", labelEn: "Leg 3: G2 Girl", targetGrades: [2], targetGender: "Girl" },
      { id: 4, label: "ไม้ 4: ป.2 หญิง", labelEn: "Leg 4: G2 Girl", targetGrades: [2], targetGender: "Girl" },
      { id: 5, label: "ไม้ 5: ป.3 หญิง", labelEn: "Leg 5: G3 Girl", targetGrades: [3], targetGender: "Girl" },
      { id: 6, label: "ไม้ 6: ป.3 หญิง", labelEn: "Leg 6: G3 Girl", targetGrades: [3], targetGender: "Girl" }
    ],
    medals: "ทีมอันดับ 1–3 รับเหรียญครบทั้ง 6 คน (รวม 18 เหรียญ)",
    rules: "หญิง 6 คน (ป.1=2, ป.2=2, ป.3=2) • ส่งคทาในเขตรับส่ง",
    standardEventName: "6x30m Relay (วิ่งผลัด 6x30 ม.)"
  },
  {
    code: "E25", category: "relay", categoryLabel: "วิ่งผลัด (Relay)",
    title: "วิ่งผลัด 6×30 ม. รุ่นโต ชาย (ป.4–ป.6)", titleEn: "6x30m Relay G4–G6 Boys",
    time: "09:45 – 10:00", callTime: "09:35", location: "ลู่วิ่งหลัก",
    minGrade: 4, maxGrade: 6, gender: "Boy", quota: 6,
    slotsConfig: [
      { id: 1, label: "ไม้ 1: ป.4 ชาย", labelEn: "Leg 1: G4 Boy", targetGrades: [4], targetGender: "Boy" },
      { id: 2, label: "ไม้ 2: ป.4 ชาย", labelEn: "Leg 2: G4 Boy", targetGrades: [4], targetGender: "Boy" },
      { id: 3, label: "ไม้ 3: ป.5 ชาย", labelEn: "Leg 3: G5 Boy", targetGrades: [5], targetGender: "Boy" },
      { id: 4, label: "ไม้ 4: ป.5 ชาย", labelEn: "Leg 4: G5 Boy", targetGrades: [5], targetGender: "Boy" },
      { id: 5, label: "ไม้ 5: ป.6 ชาย", labelEn: "Leg 5: G6 Boy", targetGrades: [6], targetGender: "Boy" },
      { id: 6, label: "ไม้ 6: ป.6 ชาย", labelEn: "Leg 6: G6 Boy", targetGrades: [6], targetGender: "Boy" }
    ],
    medals: "ทีมอันดับ 1–3 รับเหรียญครบทั้ง 6 คน (รวม 18 เหรียญ)",
    rules: "ชาย 6 คน (ป.4=2, ป.5=2, ป.6=2) • ส่งคทาในเขตรับส่ง",
    standardEventName: "6x30m Relay (วิ่งผลัด 6x30 ม.)"
  },
  {
    code: "E26", category: "relay", categoryLabel: "วิ่งผลัด (Relay)",
    title: "วิ่งผลัด 6×30 ม. รุ่นโต หญิง (ป.4–ป.6)", titleEn: "6x30m Relay G4–G6 Girls",
    time: "09:45 – 10:00", callTime: "09:35", location: "ลู่วิ่งหลัก",
    minGrade: 4, maxGrade: 6, gender: "Girl", quota: 6,
    slotsConfig: [
      { id: 1, label: "ไม้ 1: ป.4 หญิง", labelEn: "Leg 1: G4 Girl", targetGrades: [4], targetGender: "Girl" },
      { id: 2, label: "ไม้ 2: ป.4 หญิง", labelEn: "Leg 2: G4 Girl", targetGrades: [4], targetGender: "Girl" },
      { id: 3, label: "ไม้ 3: ป.5 หญิง", labelEn: "Leg 3: G5 Girl", targetGrades: [5], targetGender: "Girl" },
      { id: 4, label: "ไม้ 4: ป.5 หญิง", labelEn: "Leg 4: G5 Girl", targetGrades: [5], targetGender: "Girl" },
      { id: 5, label: "ไม้ 5: ป.6 หญิง", labelEn: "Leg 5: G6 Girl", targetGrades: [6], targetGender: "Girl" },
      { id: 6, label: "ไม้ 6: ป.6 หญิง", labelEn: "Leg 6: G6 Girl", targetGrades: [6], targetGender: "Girl" }
    ],
    medals: "ทีมอันดับ 1–3 รับเหรียญครบทั้ง 6 คน (รวม 18 เหรียญ)",
    rules: "หญิง 6 คน (ป.4=2, ป.5=2, ป.6=2) • ส่งคทาในเขตรับส่ง",
    standardEventName: "6x30m Relay (วิ่งผลัด 6x30 ม.)"
  },

  // ==========================================
  // 3. Football Split-Squad (E27) - 9 PLAYERS
  // ==========================================
  {
    code: "E27",
    category: "football",
    categoryLabel: "ฟุตบอลแบ่งเซต (Football)",
    title: "ฟุตบอลแบ่งเซต Championship (G3–G6)",
    titleEn: "Football Split-Squad Championship (G3–G6)",
    time: "10:00 – 10:15",
    callTime: "09:50",
    location: "สนามโรงยิม (Gymnasium Field Court)",
    minGrade: 3, maxGrade: 6, gender: "Any",
    quota: 9,
    slotsConfig: [
      { id: 1, label: "ชุดแรก (G3–G4) ตัวจริง 1", labelEn: "Set 1 (G3-G4) Player 1", targetGrades: [3, 4], targetGender: "Any", role: "Set 1 Outfield (4 นาทีแรก)" },
      { id: 2, label: "ชุดแรก (G3–G4) ตัวจริง 2", labelEn: "Set 1 (G3-G4) Player 2", targetGrades: [3, 4], targetGender: "Any", role: "Set 1 Outfield (4 นาทีแรก)" },
      { id: 3, label: "ชุดแรก (G3–G4) ตัวจริง 3", labelEn: "Set 1 (G3-G4) Player 3", targetGrades: [3, 4], targetGender: "Any", role: "Set 1 Outfield (4 นาทีแรก)" },
      { id: 4, label: "ชุดแรก (G3–G4) ตัวจริง 4", labelEn: "Set 1 (G3-G4) Player 4", targetGrades: [3, 4], targetGender: "Any", role: "Set 1 Outfield (4 นาทีแรก)" },
      { id: 5, label: "ชุดสอง (G5–G6) ตัวจริง 1", labelEn: "Set 2 (G5-G6) Player 1", targetGrades: [5, 6], targetGender: "Any", role: "Set 2 Outfield (4 นาทีหลัง)" },
      { id: 6, label: "ชุดสอง (G5–G6) ตัวจริง 2", labelEn: "Set 2 (G5-G6) Player 2", targetGrades: [5, 6], targetGender: "Any", role: "Set 2 Outfield (4 นาทีหลัง)" },
      { id: 7, label: "ชุดสอง (G5–G6) ตัวจริง 3", labelEn: "Set 2 (G5-G6) Player 3", targetGrades: [5, 6], targetGender: "Any", role: "Set 2 Outfield (4 นาทีหลัง)" },
      { id: 8, label: "ชุดสอง (G5–G6) ตัวจริง 4", labelEn: "Set 2 (G5-G6) Player 4", targetGrades: [5, 6], targetGender: "Any", role: "Set 2 Outfield (4 นาทีหลัง)" },
      { id: 9, label: "ผู้รักษาประตู (GK) รุ่นโต (G5–G6)", labelEn: "Goalkeeper (GK) Senior (G5-G6)", targetGrades: [5, 6], targetGender: "Any", role: "Goalkeeper (ยืนยาวเต็มเกม 8 นาที)" }
    ],
    medals: "ทีมอันดับ 1–3 รับเหรียญครบทั้ง 9 คน (รวม 27 เหรียญ)",
    medalsEn: "Top 3 teams receive medals for all 9 squad players (27 Medals total)",
    rules: "แบ่งเหมือนบาสเกตบอล รวม 9 คนต่อสี: เซตแรก 4 นาทีแรกใช้ G3–G4 4 คน • เซตหลัง 4 นาทีหลังใช้ G5–G6 4 คน • ผู้รักษาประตูใช้ Higher Grade (G5–G6) 1 คน ยืนยาวตลอด 8 นาทีไม่เปลี่ยนตัว • หากเสมอในเวลายิงจุดโทษทันที",
    rulesEn: "Split squad like basketball, 9 players per house: Set 1 (first 4 mins) uses 4 G3-G4 players • Set 2 (last 4 mins) uses 4 G5-G6 players • 1 Goalkeeper from Higher Grade (G5-G6) plays full 8 mins without substituting • If tied at full-time, immediate penalty shootout.",
    standardEventName: "Football 5v5 (ฟุตบอล)"
  },

  // ==========================================
  // 4. Primary Chairball G1–G2 (E28) - 6 PLAYERS
  // ==========================================
  {
    code: "E28",
    category: "chairball",
    categoryLabel: "แชร์บอล (Chairball)",
    title: "แชร์บอล G1–G2 ชิงอันดับ 1 และ 3 พร้อมกัน",
    titleEn: "Primary Chairball G1–G2 (Dual Courts)",
    time: "10:15 – 10:25",
    callTime: "10:05",
    location: "สนาม A & B (พร้อมกัน 2 สนาม)",
    minGrade: 1, maxGrade: 2, gender: "Any",
    quota: 6,
    slotsConfig: [
      { id: 1, label: "ผู้เล่นในสนาม 1 (G1–G2)", labelEn: "Court Player 1 (G1-G2)", targetGrades: [1, 2], targetGender: "Any" },
      { id: 2, label: "ผู้เล่นในสนาม 2 (G1–G2)", labelEn: "Court Player 2 (G1-G2)", targetGrades: [1, 2], targetGender: "Any" },
      { id: 3, label: "ผู้เล่นในสนาม 3 (G1–G2)", labelEn: "Court Player 3 (G1-G2)", targetGrades: [1, 2], targetGender: "Any" },
      { id: 4, label: "ผู้เล่นในสนาม 4 (G1–G2)", labelEn: "Court Player 4 (G1-G2)", targetGrades: [1, 2], targetGender: "Any" },
      { id: 5, label: "ผู้เล่นในสนาม 5 (G1–G2)", labelEn: "Court Player 5 (G1-G2)", targetGrades: [1, 2], targetGender: "Any" },
      { id: 6, label: "ผู้ถือตะกร้า (Basket Catcher G1–G2)", labelEn: "Basket Holder (G1-G2)", targetGrades: [1, 2], targetGender: "Any" }
    ],
    medals: "ทีมอันดับ 1–3 รับเหรียญครบทั้ง 6 คน (รวม 18 เหรียญ)",
    rules: "นักเรียน ป.1–ป.2 ไม่จำกัดเพศ รวม 6 คน (ในสนาม 5 + ผู้ถือตะกร้า 1 คน) • ผู้ถือตะกร้ายืนบนพื้นอย่างปลอดภัย • บอลนิ่ม • แข่ง 6 นาทีไม่มีพักครึ่ง",
    standardEventName: "Primary Chairball (แชร์บอล)"
  },

  // ==========================================
  // 5. Basketball 3x3 (E29 & E30) - 6 PLAYERS
  // ==========================================
  {
    code: "E29",
    category: "basketball",
    categoryLabel: "บาสเกตบอล 3x3 (Junior)",
    title: "บาสเกตบอล 3×3 ชุดเล็ก (G3–G4)",
    titleEn: "Basketball 3x3 Junior Squad (G3–G4)",
    time: "10:25 – 10:35",
    callTime: "10:15",
    location: "สนาม A & B",
    minGrade: 3, maxGrade: 4, gender: "Any",
    quota: 3,
    slotsConfig: [
      { id: 1, label: "ตัวจริง 1 (G3–G4)", labelEn: "Player 1 (G3-G4)", targetGrades: [3, 4], targetGender: "Any" },
      { id: 2, label: "ตัวจริง 2 (G3–G4)", labelEn: "Player 2 (G3-G4)", targetGrades: [3, 4], targetGender: "Any" },
      { id: 3, label: "ตัวจริง 3 (G3–G4)", labelEn: "Player 3 (G3-G4)", targetGrades: [3, 4], targetGender: "Any" }
    ],
    medals: "รับเหรียญรวมกับชุดโตทั้ง 6 คน (ทีมอันดับ 1–3 รวม 18 เหรียญ)",
    rules: "นักเรียน ป.3–ป.4 ไม่จำกัดเพศ 3 คน • ลงเล่น 3 นาทีแรก • คะแนนนับสะสมต่อเนื่องไปยังชุดโต",
    standardEventName: "Basketball 3x3 (บาสเกตบอล)"
  },
  {
    code: "E30",
    category: "basketball",
    categoryLabel: "บาสเกตบอล 3x3 (Senior)",
    title: "บาสเกตบอล 3×3 ชุดโต (G5–G6)",
    titleEn: "Basketball 3x3 Senior Squad (G5–G6)",
    time: "10:25 – 10:35",
    callTime: "10:15",
    location: "สนาม A & B",
    minGrade: 5, maxGrade: 6, gender: "Any",
    quota: 3,
    slotsConfig: [
      { id: 1, label: "ตัวจริง 1 (G5–G6)", labelEn: "Player 1 (G5-G6)", targetGrades: [5, 6], targetGender: "Any" },
      { id: 2, label: "ตัวจริง 2 (G5–G6)", labelEn: "Player 2 (G5-G6)", targetGrades: [5, 6], targetGender: "Any" },
      { id: 3, label: "ตัวจริง 3 (G5–G6)", labelEn: "Player 3 (G5-G6)", targetGrades: [5, 6], targetGender: "Any" }
    ],
    medals: "รับเหรียญรวมกับชุดเล็กทั้ง 6 คน (ทีมอันดับ 1–3 รวม 18 เหรียญ)",
    rules: "นักเรียน ป.5–ป.6 ไม่จำกัดเพศ 3 คน • ลงเล่น 3 นาทีหลังต่อจากชุดเล็กทันที • แนะนำแยกผู้เล่นจากฟุตบอล",
    standardEventName: "Basketball 3x3 (บาสเกตบอล)"
  },

  // ==========================================
  // 6. Family Games (E31 to E34)
  // ==========================================
  {
    code: "E31",
    category: "family",
    categoryLabel: "เกมครอบครัว (Family)",
    title: "Fastball Throwing (เด็ก 12 + ผปค. 1)",
    titleEn: "Family Game: Fastball Throwing",
    time: "10:35 – 10:45",
    callTime: "10:25",
    location: "สนามกลาง (Central Arena)",
    minGrade: 1, maxGrade: 6, gender: "Any",
    quota: 12,
    medals: "ชุดขนมรางวัลและคะแนนทีมเชียร์",
    rules: "นักเรียน 12 คน (ชาย 1 หญิง 1 ทุกระดับชั้น ป.1–ป.6) + ผู้ปกครอง 1 คนถือตะกร้ายักษ์ • โยนบอลนิ่มเข้าตะกร้าในเวลา 1 นาที 30 วินาที",
    standardEventName: "Fastball Throwing (Family Game)"
  },
  {
    code: "E32",
    category: "family",
    categoryLabel: "เกมครอบครัว (Family)",
    title: "Hula Hoop Relay (เด็ก 6 + ผปค. 6)",
    titleEn: "Family Game: Hula Hoop Relay",
    time: "10:45 – 10:55",
    callTime: "10:35",
    location: "สนามกลาง (Central Arena)",
    minGrade: 1, maxGrade: 6, gender: "Any",
    quota: 6,
    medals: "ชุดขนมรางวัลและคะแนนทีมเชียร์",
    rules: "นักเรียน 6 คน (ป.1–ป.6 ระดับชั้นละ 1 คน) สลับจับมือกับผู้ปกครอง 6 คน (รวมสีละ 12 คน) • ลอดห่วงฮูลาฮูปโดยไม่ปล่อยมือ",
    standardEventName: "Hula Hoop Relay (Family Game)"
  },
  {
    code: "E33",
    category: "family",
    categoryLabel: "เกมครอบครัว (Family)",
    title: "เดิน 3 ขา รุ่นเล็ก (ป.1–ป.3 คู่ ผปค.)",
    titleEn: "3-Legged Family Relay (G1–G3 Junior)",
    time: "10:55 – 11:05",
    callTime: "10:40",
    location: "ลู่วิ่งหลัก",
    minGrade: 1, maxGrade: 3, gender: "Any",
    quota: 3,
    medals: "เหรียญรางวัล Junior Family Champ และขนมรางวัล",
    rules: "นักเรียน ป.1–ป.3 จำนวน 3 คน จับคู่กับผู้ปกครองตนเองคนละ 1 คู่ (รวม 3 คู่/สี) • เดิน 3 ขาผลัดด้วยสายรัดตีนตุ๊กแกนิ่ม",
    standardEventName: "3-Legged Race (Family Relay)"
  },
  {
    code: "E34",
    category: "family",
    categoryLabel: "เกมครอบครัว (Family)",
    title: "เดิน 3 ขา รุ่นโต (ป.4–ป.6 คู่ ผปค.)",
    titleEn: "3-Legged Family Relay (G4–G6 Senior)",
    time: "11:05 – 11:15",
    callTime: "10:40",
    location: "ลู่วิ่งหลัก",
    minGrade: 4, maxGrade: 6, gender: "Any",
    quota: 3,
    medals: "เหรียญรางวัล Senior Family Champ และขนมรางวัล",
    rules: "นักเรียน ป.4–ป.6 จำนวน 3 คน จับคู่กับผู้ปกครองตนเองคนละ 1 คู่ (รวม 3 คู่/สี) • เดินเร็วเท่านั้นเพื่อความปลอดภัย",
    standardEventName: "3-Legged Race (Family Relay)"
  },

  // ==========================================
  // 7. Special Exhibition Matches (E35 & E36)
  // ==========================================
  {
    code: "E35",
    category: "special",
    categoryLabel: "แมตช์พิเศษ (Special)",
    title: "แชร์บอล คุณแม่ vs ทีมลูก (All-Stars)",
    titleEn: "Moms vs Kids Chairball (Exhibition)",
    time: "11:15 – 11:25",
    callTime: "11:05",
    location: "สนาม A",
    minGrade: 1, maxGrade: 6, gender: "Any",
    quota: 2,
    medals: "เกียรติบัตรและเสียงเชียร์",
    rules: "นักเรียนตัวแทน All-Stars สีละ 2 คน (รวมทั้งงาน 7–8 คน) พบ ทีมคุณแม่ 6 คน • บอลนิ่ม ตะกร้าวางพื้นอย่างปลอดภัย",
    standardEventName: "Moms vs Kids Chairball (Exhibition)"
  },
  {
    code: "E36",
    category: "special",
    categoryLabel: "แมตช์พิเศษ (Special)",
    title: "ฟุตบอลยักษ์ คุณพ่อ vs ทีมลูก (All-Stars)",
    titleEn: "Dads vs Kids Giant Football (Exhibition)",
    time: "11:25 – 11:35",
    callTime: "11:15",
    location: "สนามโรงยิม",
    minGrade: 1, maxGrade: 6, gender: "Any",
    quota: 2,
    medals: "ถ้วยรางวัล Dad of the Day และขนมรางวัล",
    rules: "นักเรียนตัวแทน All-Stars สีละ 2 คน (รวมทั้งงาน 7–8 คน) พบ ทีมคุณพ่อ 5 คน • ลูกบอลยักษ์นิ่ม เดินเร็วเท่านั้น ไม่มีผู้รักษาประตู",
    standardEventName: "Dads vs Kids Giant Soccer (Exhibition)"
  }
];

// Soft validation checker: checks grade, gender, slot-specific constraints, and dual-sport conflicts
function getStudentSlotWarnings(student, event, slotIndex) {
  const warnings = [];
  if (!student || !event) return warnings;

  const isEn = typeof getLang === 'function' && getLang() === 'en';

  // 1. Grade Checks
  if (event.category === 'football') {
    if (student.grade < 3) {
      warnings.push(isEn ? `Grade Mismatch: Football is for G3–G6 (Student is G${student.grade})` : `ระดับชั้นไม่ตรง: ฟุตบอลเฉพาะ ป.3–ป.6 (น้อง ป.${student.grade})`);
    } else if (slotIndex !== null && slotIndex !== undefined) {
      if (slotIndex >= 0 && slotIndex <= 3 && student.grade > 4) {
        warnings.push(isEn ? `Set 1 Warning: Slots 1–4 are for G3–G4 (Student is G${student.grade})` : `เตือนชุดแรก: ช่อง 1–4 ควรเป็น ป.3–ป.4 (น้อง ป.${student.grade})`);
      } else if (slotIndex >= 4 && slotIndex <= 7 && student.grade < 5) {
        warnings.push(isEn ? `Set 2 Warning: Slots 5–8 are for G5–G6 (Student is G${student.grade})` : `เตือนชุดสอง: ช่อง 5–8 ควรเป็น ป.5–ป.6 (น้อง ป.${student.grade})`);
      } else if (slotIndex === 8 && student.grade < 5) {
        warnings.push(isEn ? `GK Warning: Goalkeeper MUST be Senior G5–G6 (Student is G${student.grade})` : `เตือนผู้รักษาประตู: โกล์ต้องเป็นรุ่นโต ป.5–ป.6 เท่านั้น (น้อง ป.${student.grade})`);
      }
    }
  } else if (event.category === 'chairball') {
    if (student.grade > 2) {
      warnings.push(isEn ? `Grade Mismatch: Chairball is for G1–G2 (Student is G${student.grade})` : `ระดับชั้นไม่ตรง: แชร์บอลเฉพาะ ป.1–ป.2 (น้อง ป.${student.grade})`);
    }
  } else if (event.category === 'basketball') {
    if (event.code === 'E29' && (student.grade < 3 || student.grade > 4)) {
      warnings.push(isEn ? `Grade Mismatch: Junior Squad is for G3–G4 (Student is G${student.grade})` : `ระดับชั้นไม่ตรง: บาสเกตบอลชุดเล็กเฉพาะ ป.3–ป.4 (น้อง ป.${student.grade})`);
    } else if (event.code === 'E30' && (student.grade < 5 || student.grade > 6)) {
      warnings.push(isEn ? `Grade Mismatch: Senior Squad is for G5–G6 (Student is G${student.grade})` : `ระดับชั้นไม่ตรง: บาสเกตบอลชุดโตเฉพาะ ป.5–ป.6 (น้อง ป.${student.grade})`);
    }
  } else if (event.category === 'sprint') {
    if (student.grade !== event.minGrade) {
      warnings.push(isEn ? `Grade Mismatch: This heat is for G${event.minGrade} (Student is G${student.grade})` : `ระดับชั้นไม่ตรง: รอบนี้เฉพาะ ป.${event.minGrade} (น้อง ป.${student.grade})`);
    }
  } else if (event.category === 'relay') {
    if (student.grade < event.minGrade || student.grade > event.maxGrade) {
      warnings.push(isEn ? `Grade Mismatch: Relay is for G${event.minGrade}–G${event.maxGrade} (Student is G${student.grade})` : `ระดับชั้นไม่ตรง: วิ่งผลัดรุ่นนี้สำหรับ ป.${event.minGrade}–ป.${event.maxGrade} (น้อง ป.${student.grade})`);
    }
  }

  // 2. Gender Checks
  if (event.gender && event.gender !== 'Any') {
    if (student.gender !== event.gender) {
      const expectedText = event.gender === 'Boy' ? (isEn ? 'Boy' : 'ชาย') : (isEn ? 'Girl' : 'หญิง');
      const actualText = student.gender === 'Boy' ? (isEn ? 'Boy' : 'ชาย') : (isEn ? 'Girl' : 'หญิง');
      warnings.push(isEn ? `Gender Mismatch: Expected ${expectedText} (Student is ${actualText})` : `เพศไม่ตรงเกณฑ์: รอบนี้เฉพาะ ${expectedText} (น้องเป็น ${actualText})`);
    }
  }

  // 3. Dual-Sport Conflicts
  if (student.events && student.events.length > 0) {
    const hasFootball = student.events.some(e => e.includes('Football') || e.includes('ฟุตบอล'));
    const hasBasketball = student.events.some(e => e.includes('Basketball') || e.includes('บาส'));
    if (event.category === 'football' && hasBasketball) {
      warnings.push(isEn ? `Multi-Sport: Already registered in Basketball 3x3` : `ลงกีฬาหลักซ้ำ: มีชื่อในบาสเกตบอล 3x3 แล้ว`);
    }
    if (event.category === 'basketball' && hasFootball) {
      warnings.push(isEn ? `Multi-Sport: Already registered in Football` : `ลงกีฬาหลักซ้ำ: มีชื่อในฟุตบอลแล้ว`);
    }

    if (event.category === 'sprint') {
      const sprintCount = student.events.filter(e => e.includes('30m Sprint') || e.includes('วิ่ง 30 ม.')).length;
      if (sprintCount > 1 || (sprintCount === 1 && !isStudentAssignedToEvent(student, event))) {
        warnings.push(isEn ? `Duplicate Sprint: Already in another 30m heat` : `ลงวิ่ง 30ม. ซ้ำ: มีชื่อในรอบอื่นอยู่แล้ว`);
      }
    }
  }

  return warnings;
}

// Helper: Determine if a student is assigned to a specific event code
function isStudentAssignedToEvent(student, event) {
  if (!student.events || student.events.length === 0) return false;
  const events = student.events;

  switch (event.category) {
    case 'sprint': {
      if (student.grade !== event.minGrade) return false;
      if (student.gender !== event.gender) return false;

      if (student.grade === 6) {
        return events.some(e => e.includes('30m Sprint') || e.includes('วิ่ง 30 ม.'));
      }
      if (events.some(e => e.includes(`Heat ${event.heat}`))) {
        return true;
      }
      if (events.includes('30m Sprint (วิ่ง 30 ม.)')) {
        const room1Classes = ['G1 Giraffe', 'G2 Zebra', 'G3 Eagle', 'G4 Leopard', 'G5 Liger', 'G6 Phoenix'];
        const defaultHeat = room1Classes.includes(student.class) ? 1 : 2;
        return defaultHeat === event.heat;
      }
      return false;
    }

    case 'relay': {
      if (student.grade < event.minGrade || student.grade > event.maxGrade) return false;
      if (student.gender !== event.gender) return false;
      return events.some(e => e.includes('6x30m') || e.includes('วิ่งผลัด'));
    }

    case 'football': {
      return events.some(e => e.includes('Football') || e.includes('ฟุตบอล'));
    }

    case 'chairball': {
      return events.some(e => (e.includes('Chairball') || e.includes('แชร์บอล')) && !e.includes('Moms vs Kids') && !e.includes('แม่ vs ลูก'));
    }

    case 'basketball': {
      if (student.grade < event.minGrade || student.grade > event.maxGrade) return false;
      return events.some(e => e.includes('Basketball') || e.includes('บาส'));
    }

    case 'family': {
      if (event.code === 'E31') return events.some(e => e.includes('Fastball'));
      if (event.code === 'E32') return events.some(e => e.includes('Hula Hoop') || e.includes('ฮูลา'));
      if (event.code === 'E33') return student.grade <= 3 && events.some(e => e.includes('3-Legged') || e.includes('3 ขา'));
      if (event.code === 'E34') return student.grade >= 4 && events.some(e => e.includes('3-Legged') || e.includes('3 ขา'));
      return false;
    }

    case 'special': {
      if (event.code === 'E35') return events.some(e => e.includes('Moms vs Kids') || e.includes('แม่ vs ลูก'));
      if (event.code === 'E36') return events.some(e => e.includes('Dads vs Kids') || e.includes('พ่อ vs ลูก'));
      return false;
    }

    default:
      return false;
  }
}

// Get all assigned students for an event in a specific color
function getAssignedStudentsForEvent(event, color) {
  if (!APP_STATE || !APP_STATE.students) return [];
  return APP_STATE.students.filter(s => s.color === color && isStudentAssignedToEvent(s, event));
}

// RENDER THE REDESIGNED EVENT-FIRST VIEW
function renderEventRegistrationView() {
  const container = document.getElementById('event-registration-content');
  if (!container) return;

  const isEn = typeof getLang === 'function' && getLang() === 'en';
  const color = EVENT_REG_STATE.selectedColor;
  const activeCategory = EVENT_REG_STATE.selectedCategory;
  const searchQuery = (EVENT_REG_STATE.searchQuery || '').trim().toLowerCase();

  // 1. Calculate House Overview Stats
  const houseStudents = APP_STATE.students.filter(s => s.color === color);
  const totalAthletes = houseStudents.length;
  const participatingAthletes = houseStudents.filter(s => s.events && s.events.length > 0).length;
  const participationRate = totalAthletes > 0 ? Math.round((participatingAthletes / totalAthletes) * 100) : 0;

  // Category counts
  let sprintFilled = 0;
  let relayFilled = 0;
  let footballFilled = 0;
  let chairballFilled = 0;
  let basketballFilled = 0;
  let familyFilled = 0;

  EVENT_REGISTRATION_CONFIG.forEach(ev => {
    const count = getAssignedStudentsForEvent(ev, color).length;
    if (ev.category === 'sprint') sprintFilled += Math.min(count, ev.quota);
    if (ev.category === 'relay') relayFilled += Math.min(count, ev.quota);
    if (ev.category === 'football') footballFilled += Math.min(count, ev.quota);
    if (ev.category === 'chairball') chairballFilled += Math.min(count, ev.quota);
    if (ev.category === 'basketball') basketballFilled += Math.min(count, ev.quota);
    if (ev.category === 'family' || ev.category === 'special') familyFilled += Math.min(count, ev.quota);
  });

  const kingdomThemes = {
    Purple: { name: 'Amethyst Kingdom', thai: 'สีม่วง (Amethyst)', badge: 'bg-purple-600 text-white', border: 'border-purple-300', bg: 'bg-purple-50/50', activeBorder: 'border-purple-600 ring-2 ring-purple-200' },
    Red: { name: 'Crimson Empire', thai: 'สีแดง (Crimson)', badge: 'bg-rose-600 text-white', border: 'border-rose-300', bg: 'bg-rose-50/50', activeBorder: 'border-rose-600 ring-2 ring-rose-200' },
    Yellow: { name: 'Golden Realm', thai: 'สีเหลือง (Golden)', badge: 'bg-amber-500 text-white', border: 'border-amber-300', bg: 'bg-amber-50/50', activeBorder: 'border-amber-500 ring-2 ring-amber-200' },
    Green: { name: 'Jade Dynasty', thai: 'สีเขียว (Jade)', badge: 'bg-emerald-600 text-white', border: 'border-emerald-300', bg: 'bg-emerald-50/50', activeBorder: 'border-emerald-600 ring-2 ring-emerald-200' }
  };

  const theme = kingdomThemes[color] || kingdomThemes.Green;

  // Build sequential category list
  const categoryPills = [
    { id: 'football', icon: '⚽', label: isEn ? 'Football (9 Slots)' : 'ฟุตบอลแบ่งเซต (9 คน)', quota: `${footballFilled}/9`, filled: footballFilled, total: 9 },
    { id: 'sprint', icon: '🏃', label: isEn ? '30m Sprint (22 Heats)' : 'วิ่ง 30 ม. (22 Heats)', quota: `${sprintFilled}/22`, filled: sprintFilled, total: 22 },
    { id: 'relay', icon: '🤝', label: isEn ? '6x30m Relay (4 Events)' : 'วิ่งผลัด 6x30ม. (4 รายการ)', quota: `${relayFilled}/24`, filled: relayFilled, total: 24 },
    { id: 'chairball', icon: '🎯', label: isEn ? 'Chairball (6 Slots)' : 'แชร์บอล ป.1–ป.2 (6 คน)', quota: `${chairballFilled}/6`, filled: chairballFilled, total: 6 },
    { id: 'basketball', icon: '🏀', label: isEn ? 'Basketball 3x3 (6 Slots)' : 'บาส 3x3 (6 คน)', quota: `${basketballFilled}/6`, filled: basketballFilled, total: 6 },
    { id: 'family', icon: '👨‍👩‍👧‍👦', label: isEn ? 'Family & Special' : 'เกมครอบครัว & พิเศษ', quota: `${familyFilled}/31`, filled: familyFilled, total: 31 },
    { id: 'all', icon: '📋', label: isEn ? 'All 36 Events' : 'รายการทั้งหมด (36)', quota: isEn ? '36 Events' : '36 รายการ' }
  ];

  let html = `
    <!-- Top Kingdom Selector & Overview Banner -->
    <div class="rounded-3xl border ${theme.border} ${theme.bg} p-5 sm:p-6 shadow-sm space-y-5">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span class="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${theme.badge} shadow-xs mb-1.5">
            ${isEn ? theme.name : theme.thai} • ${totalAthletes} ${isEn ? 'Athletes' : 'คน'}
          </span>
          <h2 class="text-xl sm:text-2xl font-black font-royal text-[#0B1E36]">
            ${isEn ? 'Event-First Team Registration & Locked Slots' : 'ระบบลงทะเบียนตามรายการแข่งขันและโควตาทีม'}
          </h2>
          <p class="text-xs sm:text-sm text-slate-600 mt-0.5">
            ${isEn ? 'Select a sport discipline below to manage squad roster slots with automatic soft validation.' : 'เลือกชนิดกีฬาด้านล่างเพื่อใส่รายชื่อนักเรียนลงในช่อง Slot ล็อกจำนวนคน พร้อมระบบตรวจจับเพศและชั้นเรียนเตือนสีแดง'}
          </p>
        </div>

        <!-- 4 House Switcher Buttons -->
        <div class="flex items-center gap-2 flex-wrap">
          ${['Purple', 'Red', 'Yellow', 'Green'].map(col => {
            const hStudents = APP_STATE.students.filter(s => s.color === col);
            const partCount = hStudents.filter(s => s.events && s.events.length > 0).length;
            const pct = hStudents.length > 0 ? Math.round((partCount / hStudents.length) * 100) : 0;
            const isActive = col === color;
            const tInfo = kingdomThemes[col];

            return `
              <button 
                onclick="setEventRegColor('${col}')"
                class="px-3.5 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 border ${
                  isActive ? tInfo.activeBorder + ' ' + tInfo.badge : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                } shadow-xs"
              >
                <span>${isEn ? tInfo.name.split(' ')[0] : tInfo.thai.split(' ')[0]}</span>
                <span class="px-1.5 py-0.5 rounded-md text-[10px] font-mono ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'}">
                  ${pct}% (${partCount}/${hStudents.length})
                </span>
              </button>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Sequential Activity Cards / Navigation Bar (แก้ตาลาย: เรียงลำดับกีฬาชัดเจน) -->
      <div class="pt-3 border-t border-slate-200/70">
        <div class="text-xs font-bold text-slate-600 mb-2 flex items-center justify-between">
          <span class="flex items-center gap-1.5">
            <svg class="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
            <span>${isEn ? 'Step 1: Choose Sport Discipline (In Order)' : 'ขั้นตอนที่ 1: เลือกชนิดกีฬาตามลำดับ (คลิกเพื่อเปิดตารางช่องลงชื่อ)'}:</span>
          </span>
          <span class="text-[11px] text-slate-400 font-mono">${categoryPills.length} Disciplines</span>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2">
          ${categoryPills.map(cat => {
            const isCatActive = activeCategory === cat.id;
            return `
              <button 
                onclick="setEventRegCategory('${cat.id}')"
                class="p-2.5 rounded-xl border text-left transition flex flex-col justify-between ${
                  isCatActive 
                    ? 'bg-[#0B1E36] text-white border-[#0B1E36] shadow-sm ring-2 ring-amber-400/40' 
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }"
              >
                <div class="flex items-center justify-between gap-1 mb-1">
                  <span class="text-base">${cat.icon}</span>
                  <span class="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    isCatActive ? 'bg-white/20 text-[#F4E7BD]' : 'bg-slate-100 text-slate-600'
                  }">
                    ${cat.quota}
                  </span>
                </div>
                <div class="text-[11px] font-bold truncate leading-tight">${cat.label}</div>
              </button>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;

  // 2. Filter Events based on selected category & search
  let displayEvents = EVENT_REGISTRATION_CONFIG;
  if (activeCategory !== 'all') {
    if (activeCategory === 'family') {
      displayEvents = displayEvents.filter(ev => ev.category === 'family' || ev.category === 'special');
    } else {
      displayEvents = displayEvents.filter(ev => ev.category === activeCategory);
    }
  }

  if (searchQuery) {
    displayEvents = displayEvents.filter(ev => 
      ev.title.toLowerCase().includes(searchQuery) ||
      ev.titleEn.toLowerCase().includes(searchQuery) ||
      ev.code.toLowerCase().includes(searchQuery) ||
      ev.location.toLowerCase().includes(searchQuery) ||
      ev.rules.toLowerCase().includes(searchQuery)
    );
  }

  // 3. Search Bar & Status Header
  html += `
    <div class="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
      <div class="flex items-center gap-2">
        <h3 class="text-base font-bold text-[#0B1E36]">
          ${isEn ? 'Roster Slots & Quotas' : 'ตารางช่องใส่รายชื่อนักกีฬาตามโควตา'}
        </h3>
        <span class="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200">
          ${displayEvents.length} ${isEn ? 'Events' : 'รายการ'}
        </span>
      </div>

      <div class="relative w-full sm:w-72">
        <input 
          type="text" 
          value="${EVENT_REG_STATE.searchQuery}"
          oninput="setEventRegSearch(this.value)"
          placeholder="${isEn ? 'Search heat, division, rules...' : 'ค้นหารายการ, รุ่น, กติกา...'}"
          class="w-full pl-9 pr-4 py-2 rounded-xl text-xs border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0B1E36] transition"
        />
        <svg class="w-4 h-4 text-slate-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
      </div>
    </div>
  `;

  // 4. Render Event Cards with Locked Slots
  if (displayEvents.length === 0) {
    html += `
      <div class="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-400 text-xs">
        ${isEn ? 'No competition events found matching your search.' : 'ไม่พบรายการแข่งขันที่ตรงกับเงื่อนไขการค้นหา'}
      </div>
    `;
  } else {
    html += `<div class="space-y-6">`;

    displayEvents.forEach(ev => {
      const assigned = getAssignedStudentsForEvent(ev, color);
      const isFull = assigned.length >= ev.quota;
      const isOver = assigned.length > ev.quota;
      const emptySlotsCount = Math.max(0, ev.quota - assigned.length);

      // Status pill styling
      let statusPill = '';
      if (isOver) {
        statusPill = `<span class="px-2.5 py-0.5 rounded-full text-xs font-mono font-black bg-rose-100 text-rose-800 border border-rose-300">⚠️ ${isEn ? 'Exceeded' : 'เกินโควตา'}: ${assigned.length}/${ev.quota}</span>`;
      } else if (isFull) {
        statusPill = `<span class="px-2.5 py-0.5 rounded-full text-xs font-mono font-black bg-emerald-100 text-emerald-800 border border-emerald-300">✓ ${isEn ? 'Full Quota' : 'ลงครบแล้ว'}: ${assigned.length}/${ev.quota}</span>`;
      } else {
        statusPill = `<span class="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-100 text-amber-800 border border-amber-300">${isEn ? 'Open' : 'ว่าง'}: ${assigned.length}/${ev.quota}</span>`;
      }

      // Check if this is Football (E27) or Relay/Basket with explicit slotsConfig
      const hasCustomSlots = ev.slotsConfig && Array.isArray(ev.slotsConfig);

      html += `
        <div class="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden transition hover:shadow-md">
          <!-- Card Header -->
          <div class="p-4 sm:p-5 bg-slate-50/80 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div class="space-y-1">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-[#0B1E36] text-white">${ev.code}</span>
                <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">${ev.categoryLabel}</span>
                <span class="text-slate-300">•</span>
                <span class="text-xs font-semibold text-slate-600 flex items-center gap-1">
                  <svg class="w-3.5 h-3.5 text-slate-400 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  ${ev.time} (${isEn ? 'Call' : 'รายงานตัว'}: ${ev.callTime})
                </span>
                <span class="text-slate-300">•</span>
                <span class="text-xs text-slate-500">${ev.location}</span>
              </div>
              <h4 class="text-lg font-black text-[#0B1E36] font-royal">
                ${isEn ? ev.titleEn : ev.title}
              </h4>
            </div>

            <div class="flex items-center gap-3 shrink-0">
              ${statusPill}
            </div>
          </div>

          <!-- Rules & Medals Directives Banner -->
          <div class="px-4 py-3 bg-amber-50/30 border-b border-slate-100 text-xs text-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div class="space-y-0.5">
              <div><strong class="text-amber-800">${isEn ? 'Rules:' : 'กติกา:'}</strong> ${isEn && ev.rulesEn ? ev.rulesEn : ev.rules}</div>
              <div><strong class="text-amber-800">${isEn ? 'Medals:' : 'เหรียญรางวัล:'}</strong> ${isEn && ev.medalsEn ? ev.medalsEn : ev.medals}</div>
            </div>
            <div class="text-[11px] text-slate-500 shrink-0 font-medium">
              ${isEn ? 'Locked Quota:' : 'ล็อกโควตา:'} <strong class="text-slate-800 font-mono">${ev.quota} ${isEn ? 'Athletes' : 'คนต่อสี'}</strong>
            </div>
          </div>

          <!-- Slots Roster Grid -->
          <div class="p-4 sm:p-5">
            <div class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center justify-between">
              <span>${isEn ? 'Athlete Squad Slots (Exact Locked Count)' : 'ช่องใส่รายชื่อนักกีฬา (ตามจำนวนโควตาที่กำหนด)'}:</span>
              <span class="text-[11px] font-mono text-slate-400">${assigned.length} / ${ev.quota} filled</span>
            </div>

            <!-- Grid of Slots -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      `;

      // Render Slots: We create locked slots from 0 to ev.quota - 1
      for (let slotIdx = 0; slotIdx < ev.quota; slotIdx++) {
        const student = assigned[slotIdx];
        const slotConfig = hasCustomSlots ? ev.slotsConfig[slotIdx] : null;
        const slotLabel = slotConfig ? (isEn ? slotConfig.labelEn : slotConfig.label) : `${isEn ? 'Slot' : 'ช่องที่'} #${slotIdx + 1}`;

        if (student) {
          // Slot is FILLED -> Run Soft Validation
          const warnings = getStudentSlotWarnings(student, ev, slotIdx);
          const hasWarning = warnings.length > 0;

          html += `
            <div class="rounded-xl p-3 border transition flex flex-col justify-between space-y-2 ${
              hasWarning 
                ? 'border-rose-400 bg-rose-50/60 shadow-2xs' 
                : 'border-emerald-200 bg-emerald-50/30 shadow-2xs'
            }">
              <div class="space-y-1">
                <div class="flex items-center justify-between gap-1">
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded font-mono ${
                    hasWarning ? 'bg-rose-200 text-rose-900' : 'bg-emerald-100 text-emerald-800'
                  }">
                    ${slotLabel}
                  </span>
                  <span class="text-[10px] font-mono font-bold text-slate-400">#${student.id}</span>
                </div>

                <div class="flex items-center gap-1.5 pt-1">
                  <div class="font-bold text-xs text-[#0B1E36] truncate" title="${student.fullName}">
                    ${student.fullName}
                  </div>
                </div>

                <div class="text-[11px] text-slate-600 font-semibold flex items-center gap-2">
                  <span>ชื่อเล่น: <strong class="text-amber-800">${student.nickname}</strong></span>
                  <span class="text-slate-300">•</span>
                  <span>${student.class} #${student.no}</span>
                  <span class="text-slate-300">•</span>
                  <span>${student.gender === 'Boy' ? (isEn ? 'Boy' : 'ชาย') : (isEn ? 'Girl' : 'หญิง')}</span>
                </div>

                <!-- Soft Validation Warning Badges (ขึ้นสีแดงชัดเจนเมื่อไม่ตรงเกณฑ์ แต่ลงได้) -->
                ${hasWarning ? `
                  <div class="pt-1.5 space-y-1">
                    ${warnings.map(w => `
                      <div class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-300">
                        <span>${w}</span>
                      </div>
                    `).join('')}
                  </div>
                ` : `
                  <div class="text-[10px] font-bold text-emerald-700 flex items-center gap-1 pt-0.5">
                    <svg class="w-3 h-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                    <span>${isEn ? 'Eligible & Valid' : 'ตรงตามเกณฑ์และกติกา'}</span>
                  </div>
                `}
              </div>

              <!-- Action button: Remove -->
              <div class="pt-2 border-t border-slate-200/60 flex items-center justify-end gap-1.5">
                <button 
                  onclick="removeStudentFromEventPrompt(${student.id}, '${ev.code}')"
                  class="px-2.5 py-1 rounded-lg text-[11px] font-semibold text-rose-600 hover:bg-rose-100 transition flex items-center gap-1"
                  title="${isEn ? 'Remove student from this slot' : 'ปลดนักเรียนออกจากช่องนี้'}"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                  <span>${isEn ? 'Remove' : 'ปลดชื่อ'}</span>
                </button>
              </div>
            </div>
          `;
        } else {
          // Slot is EMPTY -> Render Open Slot with + Select Student button
          html += `
            <div class="rounded-xl p-3 border-2 border-dashed border-slate-200 hover:border-amber-400 bg-slate-50/40 hover:bg-amber-50/20 transition flex flex-col justify-between space-y-3">
              <div class="space-y-1">
                <div class="flex items-center justify-between">
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded font-mono bg-slate-200 text-slate-700">
                    ${slotLabel}
                  </span>
                  <span class="text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                    ${isEn ? 'Empty' : 'ว่าง'}
                  </span>
                </div>
                <div class="text-xs text-slate-400 pt-1 italic">
                  ${slotConfig && slotConfig.role ? slotConfig.role : (isEn ? 'Click below to assign an athlete' : 'คลิกปุ่มด้านล่างเพื่อเลือกนักเรียนลงช่องนี้')}
                </div>
              </div>

              <div>
                <button 
                  onclick="openAddStudentToEventModal('${ev.code}', ${slotIdx})"
                  class="w-full py-2 px-3 rounded-xl text-xs font-bold bg-[#0B1E36] hover:bg-[#162F52] text-white transition shadow-xs flex items-center justify-center gap-1.5"
                >
                  <svg class="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                  <span>${isEn ? '+ Select Athlete' : '+ เลือกนักเรียนลงช่องนี้'}</span>
                </button>
              </div>
            </div>
          `;
        }
      }

      // If there are more students than quota (Over-quota from legacy registrations), render them as extra warning boxes
      if (assigned.length > ev.quota) {
        for (let extraIdx = ev.quota; extraIdx < assigned.length; extraIdx++) {
          const stExtra = assigned[extraIdx];
          html += `
            <div class="rounded-xl p-3 border-2 border-rose-300 bg-rose-50/80 shadow-2xs flex flex-col justify-between space-y-2 col-span-full">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-rose-800">⚠️ รายชื่อเกินโควตา (คนที่ ${extraIdx + 1} จากโควตา ${ev.quota} คน)</span>
                <span class="text-xs font-bold text-slate-800">${stExtra.fullName} (${stExtra.nickname} - ${stExtra.class})</span>
                <button 
                  onclick="removeStudentFromEventPrompt(${stExtra.id}, '${ev.code}')"
                  class="px-2.5 py-1 rounded text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white transition"
                >
                  ปลดชื่อที่เกินออก
                </button>
              </div>
            </div>
          `;
        }
      }

      html += `
            </div>
          </div>
        </div>
      `;
    });

    html += `</div>`;
  }

  container.innerHTML = html;
}

// Actions
function setEventRegColor(col) {
  EVENT_REG_STATE.selectedColor = col;
  renderEventRegistrationView();
}

function setEventRegCategory(cat) {
  EVENT_REG_STATE.selectedCategory = cat;
  renderEventRegistrationView();
}

function setEventRegSearch(q) {
  EVENT_REG_STATE.searchQuery = q;
  renderEventRegistrationView();
}

// ==========================================
// MODAL: Pick & Assign Student with Soft Validation
// ==========================================
function openAddStudentToEventModal(eventCode, slotIndex = null) {
  EVENT_REG_STATE.activeModalEventCode = eventCode;
  EVENT_REG_STATE.activeModalSlotIndex = slotIndex;
  EVENT_REG_STATE.modalSearchQuery = '';
  EVENT_REG_STATE.modalFilterMode = 'all';

  const modal = document.getElementById('modal-event-student-picker');
  if (!modal) return;

  renderModalStudentList();
  modal.classList.remove('hidden');
}

function closeEventStudentPickerModal() {
  const modal = document.getElementById('modal-event-student-picker');
  if (modal) modal.classList.add('hidden');
  EVENT_REG_STATE.activeModalEventCode = null;
  EVENT_REG_STATE.activeModalSlotIndex = null;
}

function setModalSearch(val) {
  EVENT_REG_STATE.modalSearchQuery = val;
  renderModalStudentList();
}

function setModalFilterMode(mode) {
  EVENT_REG_STATE.modalFilterMode = mode;
  renderModalStudentList();
}

function renderModalStudentList() {
  const listContainer = document.getElementById('modal-student-picker-list');
  const titleEl = document.getElementById('modal-student-picker-title');
  const subtitleEl = document.getElementById('modal-student-picker-subtitle');
  if (!listContainer) return;

  const isEn = typeof getLang === 'function' && getLang() === 'en';
  const eventCode = EVENT_REG_STATE.activeModalEventCode;
  const slotIdx = EVENT_REG_STATE.activeModalSlotIndex;
  const ev = EVENT_REGISTRATION_CONFIG.find(e => e.code === eventCode);
  if (!ev) return;

  const color = EVENT_REG_STATE.selectedColor;
  const slotConfig = ev.slotsConfig && slotIdx !== null && ev.slotsConfig[slotIdx] ? ev.slotsConfig[slotIdx] : null;

  if (titleEl) {
    titleEl.textContent = isEn 
      ? `Assign Athlete: ${ev.titleEn} ${slotConfig ? '(' + slotConfig.labelEn + ')' : ''}`
      : `เลือกนักเรียนลง: ${ev.title} ${slotConfig ? '(' + slotConfig.label + ')' : ''}`;
  }

  if (subtitleEl) {
    subtitleEl.textContent = isEn
      ? `House: ${color} • Target: G${ev.minGrade}–G${ev.maxGrade} • Gender: ${ev.gender} • Soft validation warning applies if mismatched.`
      : `อาณาจักร ${color} • เกณฑ์: ป.${ev.minGrade}–ป.${ev.maxGrade} • เพศ: ${ev.gender === 'Boy' ? 'ชาย' : ev.gender === 'Girl' ? 'หญิง' : 'ไม่จำกัด'} (สามารถเลือกลงได้ หากไม่ตรงเกณฑ์จะขึ้นเตือนสีแดง)`;
  }

  // 1. Get ALL students of this house color (do NOT hard block)
  let students = APP_STATE.students.filter(s => s.color === color);

  // 2. Filter out students already in THIS event
  students = students.filter(s => !isStudentAssignedToEvent(s, ev));

  // 3. Search query
  const q = (EVENT_REG_STATE.modalSearchQuery || '').trim().toLowerCase();
  if (q) {
    students = students.filter(s => 
      s.fullName.toLowerCase().includes(q) ||
      s.nickname.toLowerCase().includes(q) ||
      s.class.toLowerCase().includes(q) ||
      String(s.no).includes(q)
    );
  }

  // 4. Modal Filter Mode
  if (EVENT_REG_STATE.modalFilterMode === 'zero_events') {
    students = students.filter(s => !s.events || s.events.length === 0);
  } else if (EVENT_REG_STATE.modalFilterMode === 'eligible_only') {
    students = students.filter(s => {
      const warnings = getStudentSlotWarnings(s, ev, slotIdx);
      return warnings.length === 0;
    });
  }

  // 5. Partition into 2 Groups: Eligible (Recommended) vs Other (Allowed with Warnings)
  const eligibleGroup = [];
  const otherGroup = [];

  students.forEach(s => {
    const warnings = getStudentSlotWarnings(s, ev, slotIdx);
    if (warnings.length === 0) {
      eligibleGroup.push({ student: s, warnings: [] });
    } else {
      otherGroup.push({ student: s, warnings: warnings });
    }
  });

  // Sort each group: 0 events first, then grade, then class number
  const sortFn = (a, b) => {
    const aEv = a.student.events ? a.student.events.length : 0;
    const bEv = b.student.events ? b.student.events.length : 0;
    if (aEv !== bEv) return aEv - bEv;
    if (a.student.grade !== b.student.grade) return a.student.grade - b.student.grade;
    return a.student.no - b.student.no;
  };

  eligibleGroup.sort(sortFn);
  otherGroup.sort(sortFn);

  if (eligibleGroup.length === 0 && otherGroup.length === 0) {
    listContainer.innerHTML = `
      <div class="p-8 text-center text-slate-400 text-xs">
        ${isEn ? 'No students found matching your search.' : 'ไม่พบรายชื่อนักเรียนสีนี้ตามคำค้นหา'}
      </div>
    `;
    return;
  }

  const renderStudentItem = (item, isRecommended) => {
    const s = item.student;
    const warnings = item.warnings;
    const eventCount = s.events ? s.events.length : 0;

    let badge = '';
    if (eventCount === 0) {
      badge = `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">0 Events (${isEn ? 'Priority' : 'ยังไม่มีแข่ง - แนะนำ'})</span>`;
    } else {
      badge = `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">${eventCount} ${isEn ? 'Events' : 'รายการ'}</span>`;
    }

    return `
      <div class="p-3 rounded-xl border transition flex items-center justify-between gap-3 ${
        isRecommended 
          ? 'bg-white hover:bg-emerald-50/30 border-slate-200 hover:border-emerald-300' 
          : 'bg-rose-50/30 hover:bg-rose-50/60 border-rose-200 hover:border-rose-300'
      }">
        <div class="space-y-1 min-w-0 pr-2">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="text-xs font-bold text-slate-900">${s.fullName}</span>
            <span class="text-xs font-bold text-amber-800">(${s.nickname})</span>
            ${badge}
          </div>

          <div class="text-[11px] text-slate-500">
            ${s.class} #${s.no} • ${s.gender === 'Boy' ? (isEn ? 'Boy' : 'ชาย') : (isEn ? 'Girl' : 'หญิง')}
          </div>

          <!-- Red Warnings if any -->
          ${warnings.length > 0 ? `
            <div class="pt-1 flex flex-wrap gap-1">
              ${warnings.map(w => `
                <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-300">
                  ${w}
                </span>
              `).join('')}
            </div>
          ` : ''}

          ${eventCount > 0 ? `
            <div class="text-[10px] text-slate-400 truncate max-w-md">
              ${isEn ? 'Registered:' : 'รายการที่ลงแล้ว:'} ${s.events.join(', ')}
            </div>
          ` : ''}
        </div>

        <button 
          onclick="executeAssignStudent(${s.id}, '${ev.code}')"
          class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition shadow-2xs shrink-0 flex items-center gap-1 ${
            isRecommended
              ? 'bg-[#0B1E36] hover:bg-[#162F52] text-white'
              : 'bg-rose-700 hover:bg-rose-800 text-white'
          }"
        >
          <span>${isEn ? '+ Select' : '+ เลือกลงช่องนี้'}</span>
        </button>
      </div>
    `;
  };

  let listHtml = '';

  // Render Eligible Group
  if (eligibleGroup.length > 0) {
    listHtml += `
      <div class="mb-4">
        <div class="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <span>${isEn ? 'Eligible Athletes (Recommended)' : 'นักเรียนที่ตรงตามเกณฑ์และกติกา (แนะนำ)'} (${eligibleGroup.length})</span>
        </div>
        <div class="space-y-2">
          ${eligibleGroup.map(item => renderStudentItem(item, true)).join('')}
        </div>
      </div>
    `;
  }

  // Render Other Group (allowed with red indicators)
  if (otherGroup.length > 0) {
    listHtml += `
      <div class="mt-4 pt-3 border-t border-slate-200">
        <div class="text-xs font-bold text-rose-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <svg class="w-4 h-4 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <span>${isEn ? 'Other Athletes (Allowed with Red Warning Indicator)' : 'นักเรียนระดับชั้น/เพศอื่น (อนุญาตให้ลงได้ แต่จะแสดงเตือนสีแดง)'} (${otherGroup.length})</span>
        </div>
        <div class="space-y-2">
          ${otherGroup.map(item => renderStudentItem(item, false)).join('')}
        </div>
      </div>
    `;
  }

  listContainer.innerHTML = listHtml;
}

// Assign student
function executeAssignStudent(studentId, eventCode) {
  const ev = EVENT_REGISTRATION_CONFIG.find(e => e.code === eventCode);
  if (!ev) return;

  const student = APP_STATE.students.find(s => s.id === studentId);
  if (!student) return;

  if (!student.events) student.events = [];
  if (!student.events.includes(ev.standardEventName)) {
    student.events.push(ev.standardEventName);
  }

  saveStudentsToStorage();
  if (typeof pushStudentUpdateToCloud === 'function') {
    pushStudentUpdateToCloud(student.id, student.events);
  }

  renderEventRegistrationView();
  if (typeof renderRosterView === 'function') renderRosterView();
  if (typeof updateRosterStats === 'function') updateRosterStats();

  closeEventStudentPickerModal();
  showAutoSaveIndicator(`บันทึก ${student.nickname} ลง ${ev.code} เรียบร้อยแล้ว`);
}

// Remove student
function removeStudentFromEventPrompt(studentId, eventCode) {
  const ev = EVENT_REGISTRATION_CONFIG.find(e => e.code === eventCode);
  if (!ev) return;

  const student = APP_STATE.students.find(s => s.id === studentId);
  if (!student) return;

  const isEn = typeof getLang === 'function' && getLang() === 'en';
  const confirmMsg = isEn 
    ? `Are you sure you want to remove "${student.fullName} (${student.nickname})" from "${ev.titleEn}"?`
    : `คุณต้องการปลด "${student.fullName} (${student.nickname})" ออกจากรายการ "${ev.title}" ใช่หรือไม่?`;

  if (confirm(confirmMsg)) {
    if (!student.events) return;
    student.events = student.events.filter(e => !isStudentAssignedToEvent(student, ev));

    saveStudentsToStorage();
    if (typeof pushStudentUpdateToCloud === 'function') {
      pushStudentUpdateToCloud(student.id, student.events);
    }

    renderEventRegistrationView();
    if (typeof renderRosterView === 'function') renderRosterView();
    if (typeof updateRosterStats === 'function') updateRosterStats();

    showAutoSaveIndicator(`ปลดชื่อ ${student.nickname} เรียบร้อยแล้ว`);
  }
}

// Expose globally
if (typeof window !== 'undefined') {
  window.EVENT_REG_STATE = EVENT_REG_STATE;
  window.EVENT_REGISTRATION_CONFIG = EVENT_REGISTRATION_CONFIG;
  window.renderEventRegistrationView = renderEventRegistrationView;
  window.setEventRegColor = setEventRegColor;
  window.setEventRegCategory = setEventRegCategory;
  window.setEventRegSearch = setEventRegSearch;
  window.openAddStudentToEventModal = openAddStudentToEventModal;
  window.closeEventStudentPickerModal = closeEventStudentPickerModal;
  window.setModalSearch = setModalSearch;
  window.setModalFilterMode = setModalFilterMode;
  window.executeAssignStudent = executeAssignStudent;
  window.removeStudentFromEventPrompt = removeStudentFromEventPrompt;
  window.getStudentSlotWarnings = getStudentSlotWarnings;
  window.isStudentAssignedToEvent = isStudentAssignedToEvent;
  window.getAssignedStudentsForEvent = getAssignedStudentsForEvent;
}
