// Techawit School Sports Day 2026 - Event-First Quota Registration Module
// Allows House Masters to register athletes directly by sport event and strict team quotas

const EVENT_REG_STATE = {
  selectedColor: 'Green', // Default to Green (Jade Dynasty)
  selectedCategory: 'all', // 'all', 'sprint', 'relay', 'football', 'chairball', 'basketball', 'family', 'special'
  searchQuery: '',
  activeModalEventCode: null,
  modalSearchQuery: '',
  modalFilterMode: 'all' // 'all', 'zero_events'
};

// 36 Comprehensive Competition Events with Complete Rules & Quotas
const EVENT_REGISTRATION_CONFIG = [
  // ==========================================
  // 1. 30-Meter Sprint Heats (E01 to E22)
  // ==========================================
  // Grade 1 Heats
  {
    code: "E01",
    category: "sprint",
    categoryLabel: "วิ่ง 30 ม. (เดี่ยว)",
    heat: 1,
    title: "วิ่ง 30 ม. ป.1 ชาย Heat 1",
    titleEn: "30m Sprint G1 Boys Heat 1",
    time: "09:00 – 09:45",
    callTime: "08:50",
    location: "ลู่วิ่งหลัก (Main Sprint Track)",
    minGrade: 1, maxGrade: 1, gender: "Boy",
    quota: 1,
    medals: "ชิงเหรียญทอง เงิน ทองแดง ประจำรอบทันที",
    rules: "เฉพาะ ป.1 ชาย • โควตาสีละ 1 คน • ห้ามฟาวล์ออกตัวเกิน 1 ครั้ง",
    recommendedClass: "G1 Giraffe (ห้อง 1)",
    standardEventName: "30m Sprint Heat 1 (วิ่ง 30 ม. Heat 1 - ห้อง 1)"
  },
  {
    code: "E02",
    category: "sprint",
    categoryLabel: "วิ่ง 30 ม. (เดี่ยว)",
    heat: 2,
    title: "วิ่ง 30 ม. ป.1 ชาย Heat 2",
    titleEn: "30m Sprint G1 Boys Heat 2",
    time: "09:00 – 09:45",
    callTime: "08:50",
    location: "ลู่วิ่งหลัก",
    minGrade: 1, maxGrade: 1, gender: "Boy",
    quota: 1,
    medals: "ชิงเหรียญทอง เงิน ทองแดง ประจำรอบทันที",
    rules: "เฉพาะ ป.1 ชาย • โควตาสีละ 1 คน",
    recommendedClass: "G1 Hippo (ห้อง 2)",
    standardEventName: "30m Sprint Heat 2 (วิ่ง 30 ม. Heat 2 - ห้อง 2)"
  },
  {
    code: "E03",
    category: "sprint",
    categoryLabel: "วิ่ง 30 ม. (เดี่ยว)",
    heat: 1,
    title: "วิ่ง 30 ม. ป.1 หญิง Heat 1",
    titleEn: "30m Sprint G1 Girls Heat 1",
    time: "09:00 – 09:45",
    callTime: "08:50",
    location: "ลู่วิ่งหลัก",
    minGrade: 1, maxGrade: 1, gender: "Girl",
    quota: 1,
    medals: "ชิงเหรียญทอง เงิน ทองแดง ประจำรอบทันที",
    rules: "เฉพาะ ป.1 หญิง • โควตาสีละ 1 คน",
    recommendedClass: "G1 Giraffe (ห้อง 1)",
    standardEventName: "30m Sprint Heat 1 (วิ่ง 30 ม. Heat 1 - ห้อง 1)"
  },
  {
    code: "E04",
    category: "sprint",
    categoryLabel: "วิ่ง 30 ม. (เดี่ยว)",
    heat: 2,
    title: "วิ่ง 30 ม. ป.1 หญิง Heat 2",
    titleEn: "30m Sprint G1 Girls Heat 2",
    time: "09:00 – 09:45",
    callTime: "08:50",
    location: "ลู่วิ่งหลัก",
    minGrade: 1, maxGrade: 1, gender: "Girl",
    quota: 1,
    medals: "ชิงเหรียญทอง เงิน ทองแดง ประจำรอบทันที",
    rules: "เฉพาะ ป.1 หญิง • โควตาสีละ 1 คน",
    recommendedClass: "G1 Hippo (ห้อง 2)",
    standardEventName: "30m Sprint Heat 2 (วิ่ง 30 ม. Heat 2 - ห้อง 2)"
  },

  // Grade 2 Heats
  {
    code: "E05",
    category: "sprint",
    categoryLabel: "วิ่ง 30 ม. (เดี่ยว)",
    heat: 1,
    title: "วิ่ง 30 ม. ป.2 ชาย Heat 1",
    titleEn: "30m Sprint G2 Boys Heat 1",
    time: "09:00 – 09:45",
    callTime: "08:50",
    location: "ลู่วิ่งหลัก",
    minGrade: 2, maxGrade: 2, gender: "Boy",
    quota: 1,
    medals: "ชิงเหรียญทอง เงิน ทองแดง ประจำรอบทันที",
    rules: "เฉพาะ ป.2 ชาย • โควตาสีละ 1 คน",
    recommendedClass: "G2 Zebra (ห้อง 1)",
    standardEventName: "30m Sprint Heat 1 (วิ่ง 30 ม. Heat 1 - ห้อง 1)"
  },
  {
    code: "E06",
    category: "sprint",
    categoryLabel: "วิ่ง 30 ม. (เดี่ยว)",
    heat: 2,
    title: "วิ่ง 30 ม. ป.2 ชาย Heat 2",
    titleEn: "30m Sprint G2 Boys Heat 2",
    time: "09:00 – 09:45",
    callTime: "08:50",
    location: "ลู่วิ่งหลัก",
    minGrade: 2, maxGrade: 2, gender: "Boy",
    quota: 1,
    medals: "ชิงเหรียญทอง เงิน ทองแดง ประจำรอบทันที",
    rules: "เฉพาะ ป.2 ชาย • โควตาสีละ 1 คน",
    recommendedClass: "G2 Rhino (ห้อง 2)",
    standardEventName: "30m Sprint Heat 2 (วิ่ง 30 ม. Heat 2 - ห้อง 2)"
  },
  {
    code: "E07",
    category: "sprint",
    categoryLabel: "วิ่ง 30 ม. (เดี่ยว)",
    heat: 1,
    title: "วิ่ง 30 ม. ป.2 หญิง Heat 1",
    titleEn: "30m Sprint G2 Girls Heat 1",
    time: "09:00 – 09:45",
    callTime: "08:50",
    location: "ลู่วิ่งหลัก",
    minGrade: 2, maxGrade: 2, gender: "Girl",
    quota: 1,
    medals: "ชิงเหรียญทอง เงิน ทองแดง ประจำรอบทันที",
    rules: "เฉพาะ ป.2 หญิง • โควตาสีละ 1 คน",
    recommendedClass: "G2 Zebra (ห้อง 1)",
    standardEventName: "30m Sprint Heat 1 (วิ่ง 30 ม. Heat 1 - ห้อง 1)"
  },
  {
    code: "E08",
    category: "sprint",
    categoryLabel: "วิ่ง 30 ม. (เดี่ยว)",
    heat: 2,
    title: "วิ่ง 30 ม. ป.2 หญิง Heat 2",
    titleEn: "30m Sprint G2 Girls Heat 2",
    time: "09:00 – 09:45",
    callTime: "08:50",
    location: "ลู่วิ่งหลัก",
    minGrade: 2, maxGrade: 2, gender: "Girl",
    quota: 1,
    medals: "ชิงเหรียญทอง เงิน ทองแดง ประจำรอบทันที",
    rules: "เฉพาะ ป.2 หญิง • โควตาสีละ 1 คน",
    recommendedClass: "G2 Rhino (ห้อง 2)",
    standardEventName: "30m Sprint Heat 2 (วิ่ง 30 ม. Heat 2 - ห้อง 2)"
  },

  // Grade 3 Heats
  {
    code: "E09",
    category: "sprint",
    categoryLabel: "วิ่ง 30 ม. (เดี่ยว)",
    heat: 1,
    title: "วิ่ง 30 ม. ป.3 ชาย Heat 1",
    titleEn: "30m Sprint G3 Boys Heat 1",
    time: "09:00 – 09:45",
    callTime: "08:50",
    location: "ลู่วิ่งหลัก",
    minGrade: 3, maxGrade: 3, gender: "Boy",
    quota: 1,
    medals: "ชิงเหรียญทอง เงิน ทองแดง ประจำรอบทันที",
    rules: "เฉพาะ ป.3 ชาย • โควตาสีละ 1 คน",
    recommendedClass: "G3 Eagle (ห้อง 1)",
    standardEventName: "30m Sprint Heat 1 (วิ่ง 30 ม. Heat 1 - ห้อง 1)"
  },
  {
    code: "E10",
    category: "sprint",
    categoryLabel: "วิ่ง 30 ม. (เดี่ยว)",
    heat: 2,
    title: "วิ่ง 30 ม. ป.3 ชาย Heat 2",
    titleEn: "30m Sprint G3 Boys Heat 2",
    time: "09:00 – 09:45",
    callTime: "08:50",
    location: "ลู่วิ่งหลัก",
    minGrade: 3, maxGrade: 3, gender: "Boy",
    quota: 1,
    medals: "ชิงเหรียญทอง เงิน ทองแดง ประจำรอบทันที",
    rules: "เฉพาะ ป.3 ชาย • โควตาสีละ 1 คน",
    recommendedClass: "G3 Falcon (ห้อง 2)",
    standardEventName: "30m Sprint Heat 2 (วิ่ง 30 ม. Heat 2 - ห้อง 2)"
  },
  {
    code: "E11",
    category: "sprint",
    categoryLabel: "วิ่ง 30 ม. (เดี่ยว)",
    heat: 1,
    title: "วิ่ง 30 ม. ป.3 หญิง Heat 1",
    titleEn: "30m Sprint G3 Girls Heat 1",
    time: "09:00 – 09:45",
    callTime: "08:50",
    location: "ลู่วิ่งหลัก",
    minGrade: 3, maxGrade: 3, gender: "Girl",
    quota: 1,
    medals: "ชิงเหรียญทอง เงิน ทองแดง ประจำรอบทันที",
    rules: "เฉพาะ ป.3 หญิง • โควตาสีละ 1 คน",
    recommendedClass: "G3 Eagle (ห้อง 1)",
    standardEventName: "30m Sprint Heat 1 (วิ่ง 30 ม. Heat 1 - ห้อง 1)"
  },
  {
    code: "E12",
    category: "sprint",
    categoryLabel: "วิ่ง 30 ม. (เดี่ยว)",
    heat: 2,
    title: "วิ่ง 30 ม. ป.3 หญิง Heat 2",
    titleEn: "30m Sprint G3 Girls Heat 2",
    time: "09:00 – 09:45",
    callTime: "08:50",
    location: "ลู่วิ่งหลัก",
    minGrade: 3, maxGrade: 3, gender: "Girl",
    quota: 1,
    medals: "ชิงเหรียญทอง เงิน ทองแดง ประจำรอบทันที",
    rules: "เฉพาะ ป.3 หญิง • โควตาสีละ 1 คน",
    recommendedClass: "G3 Falcon (ห้อง 2)",
    standardEventName: "30m Sprint Heat 2 (วิ่ง 30 ม. Heat 2 - ห้อง 2)"
  },

  // Grade 4 Heats
  {
    code: "E13",
    category: "sprint",
    categoryLabel: "วิ่ง 30 ม. (เดี่ยว)",
    heat: 1,
    title: "วิ่ง 30 ม. ป.4 ชาย Heat 1",
    titleEn: "30m Sprint G4 Boys Heat 1",
    time: "09:00 – 09:45",
    callTime: "08:50",
    location: "ลู่วิ่งหลัก",
    minGrade: 4, maxGrade: 4, gender: "Boy",
    quota: 1,
    medals: "ชิงเหรียญทอง เงิน ทองแดง ประจำรอบทันที",
    rules: "เฉพาะ ป.4 ชาย • โควตาสีละ 1 คน",
    recommendedClass: "G4 Leopard (ห้อง 1)",
    standardEventName: "30m Sprint Heat 1 (วิ่ง 30 ม. Heat 1 - ห้อง 1)"
  },
  {
    code: "E14",
    category: "sprint",
    categoryLabel: "วิ่ง 30 ม. (เดี่ยว)",
    heat: 2,
    title: "วิ่ง 30 ม. ป.4 ชาย Heat 2",
    titleEn: "30m Sprint G4 Boys Heat 2",
    time: "09:00 – 09:45",
    callTime: "08:50",
    location: "ลู่วิ่งหลัก",
    minGrade: 4, maxGrade: 4, gender: "Boy",
    quota: 1,
    medals: "ชิงเหรียญทอง เงิน ทองแดง ประจำรอบทันที",
    rules: "เฉพาะ ป.4 ชาย • โควตาสีละ 1 คน",
    recommendedClass: "G4 Panther (ห้อง 2)",
    standardEventName: "30m Sprint Heat 2 (วิ่ง 30 ม. Heat 2 - ห้อง 2)"
  },
  {
    code: "E15",
    category: "sprint",
    categoryLabel: "วิ่ง 30 ม. (เดี่ยว)",
    heat: 1,
    title: "วิ่ง 30 ม. ป.4 หญิง Heat 1",
    titleEn: "30m Sprint G4 Girls Heat 1",
    time: "09:00 – 09:45",
    callTime: "08:50",
    location: "ลู่วิ่งหลัก",
    minGrade: 4, maxGrade: 4, gender: "Girl",
    quota: 1,
    medals: "ชิงเหรียญทอง เงิน ทองแดง ประจำรอบทันที",
    rules: "เฉพาะ ป.4 หญิง • โควตาสีละ 1 คน",
    recommendedClass: "G4 Leopard (ห้อง 1)",
    standardEventName: "30m Sprint Heat 1 (วิ่ง 30 ม. Heat 1 - ห้อง 1)"
  },
  {
    code: "E16",
    category: "sprint",
    categoryLabel: "วิ่ง 30 ม. (เดี่ยว)",
    heat: 2,
    title: "วิ่ง 30 ม. ป.4 หญิง Heat 2",
    titleEn: "30m Sprint G4 Girls Heat 2",
    time: "09:00 – 09:45",
    callTime: "08:50",
    location: "ลู่วิ่งหลัก",
    minGrade: 4, maxGrade: 4, gender: "Girl",
    quota: 1,
    medals: "ชิงเหรียญทอง เงิน ทองแดง ประจำรอบทันที",
    rules: "เฉพาะ ป.4 หญิง • โควตาสีละ 1 คน",
    recommendedClass: "G4 Panther (ห้อง 2)",
    standardEventName: "30m Sprint Heat 2 (วิ่ง 30 ม. Heat 2 - ห้อง 2)"
  },

  // Grade 5 Heats
  {
    code: "E17",
    category: "sprint",
    categoryLabel: "วิ่ง 30 ม. (เดี่ยว)",
    heat: 1,
    title: "วิ่ง 30 ม. ป.5 ชาย Heat 1",
    titleEn: "30m Sprint G5 Boys Heat 1",
    time: "09:00 – 09:45",
    callTime: "08:50",
    location: "ลู่วิ่งหลัก",
    minGrade: 5, maxGrade: 5, gender: "Boy",
    quota: 1,
    medals: "ชิงเหรียญทอง เงิน ทองแดง ประจำรอบทันที",
    rules: "เฉพาะ ป.5 ชาย • โควตาสีละ 1 คน",
    recommendedClass: "G5 Liger (ห้อง 1)",
    standardEventName: "30m Sprint Heat 1 (วิ่ง 30 ม. Heat 1 - ห้อง 1)"
  },
  {
    code: "E18",
    category: "sprint",
    categoryLabel: "วิ่ง 30 ม. (เดี่ยว)",
    heat: 2,
    title: "วิ่ง 30 ม. ป.5 ชาย Heat 2",
    titleEn: "30m Sprint G5 Boys Heat 2",
    time: "09:00 – 09:45",
    callTime: "08:50",
    location: "ลู่วิ่งหลัก",
    minGrade: 5, maxGrade: 5, gender: "Boy",
    quota: 1,
    medals: "ชิงเหรียญทอง เงิน ทองแดง ประจำรอบทันที",
    rules: "เฉพาะ ป.5 ชาย • โควตาสีละ 1 คน",
    recommendedClass: "G5 Jaguar (ห้อง 2)",
    standardEventName: "30m Sprint Heat 2 (วิ่ง 30 ม. Heat 2 - ห้อง 2)"
  },
  {
    code: "E19",
    category: "sprint",
    categoryLabel: "วิ่ง 30 ม. (เดี่ยว)",
    heat: 1,
    title: "วิ่ง 30 ม. ป.5 หญิง Heat 1",
    titleEn: "30m Sprint G5 Girls Heat 1",
    time: "09:00 – 09:45",
    callTime: "08:50",
    location: "ลู่วิ่งหลัก",
    minGrade: 5, maxGrade: 5, gender: "Girl",
    quota: 1,
    medals: "ชิงเหรียญทอง เงิน ทองแดง ประจำรอบทันที",
    rules: "เฉพาะ ป.5 หญิง • โควตาสีละ 1 คน",
    recommendedClass: "G5 Liger (ห้อง 1)",
    standardEventName: "30m Sprint Heat 1 (วิ่ง 30 ม. Heat 1 - ห้อง 1)"
  },
  {
    code: "E20",
    category: "sprint",
    categoryLabel: "วิ่ง 30 ม. (เดี่ยว)",
    heat: 2,
    title: "วิ่ง 30 ม. ป.5 หญิง Heat 2",
    titleEn: "30m Sprint G5 Girls Heat 2",
    time: "09:00 – 09:45",
    callTime: "08:50",
    location: "ลู่วิ่งหลัก",
    minGrade: 5, maxGrade: 5, gender: "Girl",
    quota: 1,
    medals: "ชิงเหรียญทอง เงิน ทองแดง ประจำรอบทันที",
    rules: "เฉพาะ ป.5 หญิง • โควตาสีละ 1 คน",
    recommendedClass: "G5 Jaguar (ห้อง 2)",
    standardEventName: "30m Sprint Heat 2 (วิ่ง 30 ม. Heat 2 - ห้อง 2)"
  },

  // Grade 6 Heats (Single Heat for Boy & Girl)
  {
    code: "E21",
    category: "sprint",
    categoryLabel: "วิ่ง 30 ม. (เดี่ยว)",
    heat: 1,
    title: "วิ่ง 30 ม. ป.6 ชาย Heat 1",
    titleEn: "30m Sprint G6 Boys Heat 1",
    time: "09:00 – 09:45",
    callTime: "08:50",
    location: "ลู่วิ่งหลัก",
    minGrade: 6, maxGrade: 6, gender: "Boy",
    quota: 1,
    medals: "ชิงเหรียญทอง เงิน ทองแดง ประจำรอบทันที",
    rules: "เฉพาะ ป.6 ชาย • โควตาสีละ 1 คน (มี Heat เดียว)",
    recommendedClass: "G6 Phoenix",
    standardEventName: "30m Sprint Heat 1 (วิ่ง 30 ม. Heat 1)"
  },
  {
    code: "E22",
    category: "sprint",
    categoryLabel: "วิ่ง 30 ม. (เดี่ยว)",
    heat: 1,
    title: "วิ่ง 30 ม. ป.6 หญิง Heat 1",
    titleEn: "30m Sprint G6 Girls Heat 1",
    time: "09:00 – 09:45",
    callTime: "08:50",
    location: "ลู่วิ่งหลัก",
    minGrade: 6, maxGrade: 6, gender: "Girl",
    quota: 1,
    medals: "ชิงเหรียญทอง เงิน ทองแดง ประจำรอบทันที",
    rules: "เฉพาะ ป.6 หญิง • โควตาสีละ 1 คน (มี Heat เดียว)",
    recommendedClass: "G6 Phoenix",
    standardEventName: "30m Sprint Heat 1 (วิ่ง 30 ม. Heat 1)"
  },

  // ==========================================
  // 2. 6x30m Shuttle Relay (E23 to E26)
  // ==========================================
  {
    code: "E23",
    category: "relay",
    categoryLabel: "วิ่งผลัด 6x30 ม.",
    title: "วิ่งผลัด 6×30 ม. ประถมเล็ก ชาย (G1–G3)",
    titleEn: "6x30m Shuttle Relay Junior Boys (G1–G3)",
    time: "09:45 – 10:00",
    callTime: "09:35",
    location: "ลู่วิ่งหลัก (Main Track)",
    minGrade: 1, maxGrade: 3, gender: "Boy",
    quota: 6,
    medals: "ทีมอันดับ 1–3 รับเหรียญครบทั้ง 6 คน (รวม 18 เหรียญ)",
    rules: "นักเรียนชาย ป.1–ป.3 รวม 6 คน (ชั้นละ 2 คน: G1=2, G2=2, G3=2) • วิ่งคนละ 30 ม. รวม 180 ม. • ส่งไม้ในเขตรับส่งไม้",
    standardEventName: "6x30m Relay (วิ่งผลัด 6x30 ม.)"
  },
  {
    code: "E24",
    category: "relay",
    categoryLabel: "วิ่งผลัด 6x30 ม.",
    title: "วิ่งผลัด 6×30 ม. ประถมเล็ก หญิง (G1–G3)",
    titleEn: "6x30m Shuttle Relay Junior Girls (G1–G3)",
    time: "09:45 – 10:00",
    callTime: "09:35",
    location: "ลู่วิ่งหลัก",
    minGrade: 1, maxGrade: 3, gender: "Girl",
    quota: 6,
    medals: "ทีมอันดับ 1–3 รับเหรียญครบทั้ง 6 คน (รวม 18 เหรียญ)",
    rules: "นักเรียนหญิง ป.1–ป.3 รวม 6 คน (ชั้นละ 2 คน: G1=2, G2=2, G3=2) • วิ่งคนละ 30 ม.",
    standardEventName: "6x30m Relay (วิ่งผลัด 6x30 ม.)"
  },
  {
    code: "E25",
    category: "relay",
    categoryLabel: "วิ่งผลัด 6x30 ม.",
    title: "วิ่งผลัด 6×30 ม. ประถมโต ชาย (G4–G6)",
    titleEn: "6x30m Shuttle Relay Senior Boys (G4–G6)",
    time: "09:45 – 10:00",
    callTime: "09:35",
    location: "ลู่วิ่งหลัก",
    minGrade: 4, maxGrade: 6, gender: "Boy",
    quota: 6,
    medals: "ทีมอันดับ 1–3 รับเหรียญครบทั้ง 6 คน (รวม 18 เหรียญ)",
    rules: "นักเรียนชาย ป.4–ป.6 รวม 6 คน (ชั้นละ 2 คน: G4=2, G5=2, G6=2) • วิ่งคนละ 30 ม.",
    standardEventName: "6x30m Relay (วิ่งผลัด 6x30 ม.)"
  },
  {
    code: "E26",
    category: "relay",
    categoryLabel: "วิ่งผลัด 6x30 ม.",
    title: "วิ่งผลัด 6×30 ม. ประถมโต หญิง (G4–G6)",
    titleEn: "6x30m Shuttle Relay Senior Girls (G4–G6)",
    time: "09:45 – 10:00",
    callTime: "09:35",
    location: "ลู่วิ่งหลัก",
    minGrade: 4, maxGrade: 6, gender: "Girl",
    quota: 6,
    medals: "ทีมอันดับ 1–3 รับเหรียญครบทั้ง 6 คน (รวม 18 เหรียญ)",
    rules: "นักเรียนหญิง ป.4–ป.6 รวม 6 คน (ชั้นละ 2 คน: G4=2, G5=2, G6=2) • วิ่งคนละ 30 ม.",
    standardEventName: "6x30m Relay (วิ่งผลัด 6x30 ม.)"
  },

  // ==========================================
  // 3. Football 5v5 (E27)
  // ==========================================
  {
    code: "E27",
    category: "football",
    categoryLabel: "ฟุตบอล (Football)",
    title: "ฟุตบอล 5v5 Championship (G3–G6)",
    titleEn: "Football 5v5 Championship (G3–G6)",
    time: "10:00 – 10:15",
    callTime: "09:50",
    location: "สนามโรงยิม (Gymnasium Field Court)",
    minGrade: 3, maxGrade: 6, gender: "Any",
    quota: 5,
    medals: "ทีมอันดับ 1–3 รับเหรียญครบทั้ง 5 คน (รวม 15 เหรียญ)",
    rules: "นักเรียน ป.3–ป.6 ไม่จำกัดเพศ รวม 5 คน (ในสนาม 4 + ผู้รักษาประตู 1) • แข่ง 6 นาทีไม่มีพักครึ่ง • รอบแรกแข่ง 4 ม.ค. วันจริงชิงอันดับ 1 และ 3 • แนะนำแยกผู้เล่นจากบาสเกตบอล",
    standardEventName: "Football 5v5 (ฟุตบอล)"
  },

  // ==========================================
  // 4. Primary Chairball G1–G2 (E28)
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
    medals: "ทีมอันดับ 1–3 รับเหรียญครบทั้ง 6 คน (รวม 18 เหรียญ)",
    rules: "นักเรียน ป.1–ป.2 ไม่จำกัดเพศ รวม 6 คน (ในสนาม 5 + ผู้ถือตะกร้า 1 คน) • ผู้ถือตะกร้ายืนบนพื้นอย่างปลอดภัย • บอลนิ่ม • แข่ง 6 นาทีไม่มีพักครึ่ง",
    standardEventName: "Primary Chairball (แชร์บอล)"
  },

  // ==========================================
  // 5. Basketball 3x3 (E29 & E30)
  // ==========================================
  {
    code: "E29",
    category: "basketball",
    categoryLabel: "บาสเกตบอล 3x3",
    title: "บาสเกตบอล 3×3 ชุดเล็ก (G3–G4)",
    titleEn: "Basketball 3x3 Junior Squad (G3–G4)",
    time: "10:25 – 10:35",
    callTime: "10:15",
    location: "สนาม A & B",
    minGrade: 3, maxGrade: 4, gender: "Any",
    quota: 3,
    medals: "รับเหรียญรวมกับชุดโตทั้ง 6 คน (ทีมอันดับ 1–3 รวม 18 เหรียญ)",
    rules: "นักเรียน ป.3–ป.4 ไม่จำกัดเพศ 3 คน • ลงเล่น 3 นาทีแรก • คะแนนนับสะสมต่อเนื่องไปยังชุดโต",
    standardEventName: "Basketball 3x3 (บาสเกตบอล)"
  },
  {
    code: "E30",
    category: "basketball",
    categoryLabel: "บาสเกตบอล 3x3",
    title: "บาสเกตบอล 3×3 ชุดโต (G5–G6)",
    titleEn: "Basketball 3x3 Senior Squad (G5–G6)",
    time: "10:25 – 10:35",
    callTime: "10:15",
    location: "สนาม A & B",
    minGrade: 5, maxGrade: 6, gender: "Any",
    quota: 3,
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
    location: "สนามกลาง",
    minGrade: 1, maxGrade: 6, gender: "Any",
    quota: 6,
    medals: "ชุดขนมรางวัลและริบบิ้นเกียรติยศ",
    rules: "นักเรียน 6 คน (ป.1–ป.6 ชั้นละ 1 คน) ยืนสลับจับมือกับผู้ปกครอง 6 คน (แถวยาว 12 คน) • ส่งห่วงฮูลาฮูปผ่านตัวโดยห้ามปล่อยมือ (เวลา 1 นาที 30 วินาที)",
    standardEventName: "Hula Hoop Relay (Family Game)"
  },
  {
    code: "E33",
    category: "family",
    categoryLabel: "เกมครอบครัว (Family)",
    title: "เดิน 3 ขา รุ่นเล็ก G1–G3 (คู่เด็ก+ผปค. 3 คู่)",
    titleEn: "3-Legged Family Relay Junior (G1–G3)",
    time: "10:55 – 11:05",
    callTime: "10:45",
    location: "ลู่วิ่งหลัก",
    minGrade: 1, maxGrade: 3, gender: "Any",
    quota: 3,
    medals: "เหรียญ Family Champ & ขนมรางวัล",
    rules: "นักเรียน ป.1–ป.3 จับคู่กับผู้ปกครองรวม 3 คู่ • วิ่งผลัดทีละคู่ • กติกาเดินเร็วเท่านั้น ห้ามวิ่งกระโดด",
    standardEventName: "3-Legged Race (Family Relay)"
  },
  {
    code: "E34",
    category: "family",
    categoryLabel: "เกมครอบครัว (Family)",
    title: "เดิน 3 ขา รุ่นโต G4–G6 (คู่เด็ก+ผปค. 3 คู่)",
    titleEn: "3-Legged Family Relay Senior (G4–G6)",
    time: "11:05 – 11:15",
    callTime: "10:55",
    location: "ลู่วิ่งหลัก",
    minGrade: 4, maxGrade: 6, gender: "Any",
    quota: 3,
    medals: "เหรียญ Family Champ & ขนมรางวัล",
    rules: "นักเรียน ป.4–ป.6 จับคู่กับผู้ปกครองรวม 3 คู่ • วิ่งผลัดทีละคู่ • กติกาเดินเร็วเท่านั้น ห้ามวิ่งกระโดด",
    standardEventName: "3-Legged Race (Family Relay)"
  },

  // ==========================================
  // 7. Special Games (E35 & E36)
  // ==========================================
  {
    code: "E35",
    category: "special",
    categoryLabel: "เกมพิเศษ (Special)",
    title: "แชร์บอล คุณแม่ vs ทีมลูก (All-Stars)",
    titleEn: "Moms vs Kids Chairball",
    time: "11:15 – 11:25",
    callTime: "11:05",
    location: "สนาม A",
    minGrade: 1, maxGrade: 6, gender: "Any",
    quota: 2,
    medals: "เกียรติบัตรและเสียงปรบมือความสนุกสนาน",
    rules: "นักเรียนตัวแทน All-Stars สีละ 2 คน (รวมทั้งงาน 8 คน) พบ ทีมคุณแม่ 6 คน • แข่ง 6 นาที บอลนิ่ม ตะกร้ายักษ์บนพื้น งดปะทะ",
    standardEventName: "Moms vs Kids Chairball (Exhibition)"
  },
  {
    code: "E36",
    category: "special",
    categoryLabel: "เกมพิเศษ (Special)",
    title: "ฟุตบอลยักษ์ คุณพ่อ vs ทีมลูก (All-Stars)",
    titleEn: "Dads vs Kids Giant Soccer",
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

// Helper: Determine if a student is assigned to a specific event code
function isStudentAssignedToEvent(student, event) {
  if (!student.events || student.events.length === 0) return false;

  const events = student.events;

  switch (event.category) {
    case 'sprint': {
      if (student.grade !== event.minGrade) return false;
      if (student.gender !== event.gender) return false;

      // Grade 6 has only 1 heat
      if (student.grade === 6) {
        return events.some(e => e.includes('30m Sprint') || e.includes('วิ่ง 30 ม.'));
      }

      // Check explicit Heat matching
      if (events.some(e => e.includes(`Heat ${event.heat}`))) {
        return true;
      }

      // Legacy fallback: if generic "30m Sprint (วิ่ง 30 ม.)" exists without Heat
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
      if (student.grade < event.minGrade || student.grade > event.maxGrade) return false;
      return events.some(e => e.includes('Football') || e.includes('ฟุตบอล'));
    }

    case 'chairball': {
      if (student.grade < event.minGrade || student.grade > event.maxGrade) return false;
      return events.some(e => e.includes('Chairball') || e.includes('แชร์บอล') && !e.includes('Moms vs Kids') && !e.includes('แม่ vs ลูก'));
    }

    case 'basketball': {
      if (student.grade < event.minGrade || student.grade > event.maxGrade) return false;
      return events.some(e => e.includes('Basketball') || e.includes('บาส'));
    }

    case 'family': {
      if (event.code === 'E31') {
        return events.some(e => e.includes('Fastball'));
      } else if (event.code === 'E32') {
        return events.some(e => e.includes('Hula Hoop') || e.includes('ฮูลา'));
      } else if (event.code === 'E33') {
        return student.grade <= 3 && events.some(e => e.includes('3-Legged') || e.includes('3 ขา'));
      } else if (event.code === 'E34') {
        return student.grade >= 4 && events.some(e => e.includes('3-Legged') || e.includes('3 ขา'));
      }
      return false;
    }

    case 'special': {
      if (event.code === 'E35') {
        return events.some(e => e.includes('Moms vs Kids') || e.includes('แม่ vs ลูก'));
      } else if (event.code === 'E36') {
        return events.some(e => e.includes('Dads vs Kids') || e.includes('พ่อ vs ลูก'));
      }
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

// Render the entire Event-First Registration View
function renderEventRegistrationView() {
  const container = document.getElementById('event-registration-content');
  if (!container) return;

  const color = EVENT_REG_STATE.selectedColor;
  const categoryFilter = EVENT_REG_STATE.selectedCategory;
  const searchQuery = (EVENT_REG_STATE.searchQuery || '').trim().toLowerCase();

  // 1. Calculate Quick Color Stats
  const houseStudents = APP_STATE.students.filter(s => s.color === color);
  const totalAthletes = houseStudents.length;
  const participatingAthletes = houseStudents.filter(s => s.events && s.events.length > 0).length;
  const participationRate = totalAthletes > 0 ? Math.round((participatingAthletes / totalAthletes) * 100) : 0;

  // Calculate quota fulfillment per category
  let sprintFilled = 0;
  let relayFilled = 0;
  let footballFilled = 0;
  let chairballFilled = 0;
  let basketballFilled = 0;

  EVENT_REGISTRATION_CONFIG.forEach(ev => {
    const count = getAssignedStudentsForEvent(ev, color).length;
    if (ev.category === 'sprint') sprintFilled += Math.min(count, ev.quota);
    if (ev.category === 'relay') relayFilled += Math.min(count, ev.quota);
    if (ev.category === 'football') footballFilled += Math.min(count, ev.quota);
    if (ev.category === 'chairball') chairballFilled += Math.min(count, ev.quota);
    if (ev.category === 'basketball') basketballFilled += Math.min(count, ev.quota);
  });

  // 2. Filter Events by Category & Search
  let filteredEvents = EVENT_REGISTRATION_CONFIG;
  if (categoryFilter !== 'all') {
    filteredEvents = filteredEvents.filter(ev => ev.category === categoryFilter);
  }
  if (searchQuery) {
    filteredEvents = filteredEvents.filter(ev => 
      ev.title.toLowerCase().includes(searchQuery) ||
      ev.titleEn.toLowerCase().includes(searchQuery) ||
      ev.code.toLowerCase().includes(searchQuery) ||
      ev.location.toLowerCase().includes(searchQuery) ||
      ev.rules.toLowerCase().includes(searchQuery)
    );
  }

  // Kingdom Theme Metadata
  const kingdomThemes = {
    Purple: {
      name: 'Amethyst Kingdom',
      thaiName: 'สีม่วง (Amethyst)',
      bgLight: 'bg-purple-50',
      border: 'border-purple-200',
      text: 'text-purple-900',
      badge: 'bg-purple-100 text-purple-800 border-purple-300',
      primaryBtn: 'bg-purple-700 hover:bg-purple-800 text-white',
      ring: 'ring-purple-600'
    },
    Red: {
      name: 'Crimson Empire',
      thaiName: 'สีแดง (Crimson)',
      bgLight: 'bg-rose-50',
      border: 'border-rose-200',
      text: 'text-rose-900',
      badge: 'bg-rose-100 text-rose-800 border-rose-300',
      primaryBtn: 'bg-rose-700 hover:bg-rose-800 text-white',
      ring: 'ring-rose-600'
    },
    Yellow: {
      name: 'Golden Realm',
      thaiName: 'สีเหลือง (Golden)',
      bgLight: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-950',
      badge: 'bg-amber-100 text-amber-800 border-amber-300',
      primaryBtn: 'bg-amber-600 hover:bg-amber-700 text-white',
      ring: 'ring-amber-500'
    },
    Green: {
      name: 'Jade Dynasty',
      thaiName: 'สีเขียว (Jade)',
      bgLight: 'bg-emerald-50',
      border: 'border-emerald-200',
      text: 'text-emerald-950',
      badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      primaryBtn: 'bg-emerald-700 hover:bg-emerald-800 text-white',
      ring: 'ring-emerald-600'
    }
  };

  const currentTheme = kingdomThemes[color] || kingdomThemes.Green;

  // 3. Render Header Controls (Kingdoms + Quota Tracker + Filter Pills)
  let html = `
    <!-- Top Kingdom Selector & Realtime Stats Banner -->
    <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
      
      <!-- Kingdom Switcher Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <span class="text-[11px] font-bold uppercase font-mono tracking-wider text-amber-700">HOUSE ROSTER SELECTION</span>
          <h3 class="text-xl font-bold font-royal text-[#0B1E36]">เลือกอาณาจักรประจำสีที่คุณดูแล</h3>
          <p class="text-xs text-slate-500 mt-0.5">เลือกสีของตนเองเพื่อจัดการนักเรียนลงรายการแข่งขันตามโควตาที่กำหนด</p>
        </div>

        <!-- 4 Kingdom Toggle Pills -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
          ${['Purple', 'Red', 'Yellow', 'Green'].map(col => {
            const isSelected = col === color;
            const t = kingdomThemes[col];
            const colStudents = APP_STATE.students.filter(s => s.color === col);
            const assigned = colStudents.filter(s => s.events && s.events.length > 0).length;
            const pct = Math.round((assigned / colStudents.length) * 100);

            return `
              <button 
                onclick="setEventRegColor('${col}')"
                class="px-3 py-2.5 rounded-xl border text-left transition relative flex flex-col justify-between min-h-[56px] ${
                  isSelected 
                    ? `${t.bgLight} ${t.border} ring-2 ${t.ring} shadow-xs font-bold` 
                    : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                }"
              >
                <div class="flex items-center justify-between gap-1">
                  <span class="text-xs font-bold ${isSelected ? t.text : 'text-slate-800'}">${t.thaiName}</span>
                  <span class="text-[10px] font-mono px-1.5 py-0.5 rounded ${isSelected ? t.badge : 'bg-slate-100 text-slate-600'}">${pct}%</span>
                </div>
                <span class="text-[10px] text-slate-500 font-normal mt-1">${assigned}/${colStudents.length} คน</span>
              </button>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Selected House Quota Fulfillment Summary -->
      <div class="p-4 rounded-xl ${currentTheme.bgLight} border ${currentTheme.border} flex flex-wrap items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-sm font-bold ${currentTheme.text}">${currentTheme.name}</span>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${currentTheme.badge}">
              ลงทะเบียนแล้ว ${participatingAthletes}/${totalAthletes} คน (${participationRate}%)
            </span>
          </div>
          <p class="text-xs text-slate-600 mt-1">
            เป้าหมาย: นักเรียนทุกคนได้ลงแข่งอย่างน้อย 1–2 รายการ (กระจายสิทธิ์ทั่วถึง ไม่ส่งเด็กซ้ำเกินโควตา)
          </p>
        </div>

        <!-- Quota Quick Indicators -->
        <div class="flex flex-wrap items-center gap-2 text-xs font-mono">
          <div class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">
            <span class="text-slate-500">วิ่ง 30ม.:</span> <strong class="${sprintFilled >= 22 ? 'text-emerald-700' : 'text-amber-700'}">${sprintFilled}/22</strong>
          </div>
          <div class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">
            <span class="text-slate-500">วิ่งผลัด:</span> <strong class="${relayFilled >= 24 ? 'text-emerald-700' : 'text-amber-700'}">${relayFilled}/24</strong>
          </div>
          <div class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">
            <span class="text-slate-500">ฟุตบอล:</span> <strong class="${footballFilled >= 5 ? 'text-emerald-700' : 'text-amber-700'}">${footballFilled}/5</strong>
          </div>
          <div class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">
            <span class="text-slate-500">แชร์บอล:</span> <strong class="${chairballFilled >= 6 ? 'text-emerald-700' : 'text-amber-700'}">${chairballFilled}/6</strong>
          </div>
          <div class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">
            <span class="text-slate-500">บาส 3x3:</span> <strong class="${basketballFilled >= 6 ? 'text-emerald-700' : 'text-amber-700'}">${basketballFilled}/6</strong>
          </div>
        </div>
      </div>

      <!-- Filters & Search Toolbar -->
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
        
        <!-- Category Filter Pills -->
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          ${[
            { id: 'all', label: 'ทั้งหมด (36 รายการ)' },
            { id: 'sprint', label: 'วิ่ง 30 ม. (22 Heats)' },
            { id: 'relay', label: 'วิ่งผลัด (4 Teams)' },
            { id: 'football', label: 'ฟุตบอล (5 คน)' },
            { id: 'chairball', label: 'แชร์บอล (6 คน)' },
            { id: 'basketball', label: 'บาส 3x3 (6 คน)' },
            { id: 'family', label: 'เกมครอบครัว' },
            { id: 'special', label: 'เกมพิเศษ' }
          ].map(cat => {
            const isActive = categoryFilter === cat.id;
            return `
              <button 
                onclick="setEventRegCategory('${cat.id}')"
                class="px-3 py-1.5 rounded-full font-semibold whitespace-nowrap transition min-h-[32px] ${
                  isActive 
                    ? 'bg-[#0B1E36] text-white shadow-xs' 
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }"
              >
                ${cat.label}
              </button>
            `;
          }).join('')}
        </div>

        <!-- Search Input -->
        <div class="relative w-full sm:w-64">
          <input 
            type="text" 
            placeholder="ค้นหารายการ, รุ่น, เวลา..." 
            value="${EVENT_REG_STATE.searchQuery || ''}"
            oninput="setEventRegSearch(this.value)"
            class="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50"
          />
          <svg class="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        </div>
      </div>
    </div>

    <!-- Event Cards Grid -->
    <div class="space-y-4">
  `;

  if (filteredEvents.length === 0) {
    html += `
      <div class="p-12 text-center rounded-2xl bg-white border border-slate-200">
        <p class="text-slate-500 text-sm font-semibold">ไม่พบรายการแข่งขันที่ตรงกับคำค้นหา</p>
        <button onclick="setEventRegCategory('all'); setEventRegSearch('');" class="mt-2 text-xs font-bold text-amber-700 hover:underline">
          ล้างตัวกรองและดูรายการทั้งหมด
        </button>
      </div>
    `;
  } else {
    filteredEvents.forEach((ev, idx) => {
      const assigned = getAssignedStudentsForEvent(ev, color);
      const isFull = assigned.length >= ev.quota;
      const emptySlotsCount = Math.max(0, ev.quota - assigned.length);

      // Category badge colors
      const catColors = {
        sprint: 'bg-amber-50 text-amber-800 border-amber-200',
        relay: 'bg-blue-50 text-blue-800 border-blue-200',
        football: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        chairball: 'bg-rose-50 text-rose-800 border-rose-200',
        basketball: 'bg-orange-50 text-orange-800 border-orange-200',
        family: 'bg-teal-50 text-teal-800 border-teal-200',
        special: 'bg-indigo-50 text-indigo-800 border-indigo-200'
      };
      const catBadge = catColors[ev.category] || 'bg-slate-100 text-slate-800 border-slate-200';

      html += `
        <div class="p-5 rounded-2xl bg-white border ${isFull ? 'border-emerald-200' : 'border-slate-200'} shadow-xs hover:border-slate-300 transition space-y-4">
          
          <!-- Event Header Bar -->
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div class="space-y-1">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="text-[10px] font-bold font-mono px-2 py-0.5 rounded border uppercase ${catBadge}">
                  ${ev.categoryLabel}
                </span>
                <span class="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                  ${ev.code}
                </span>
                <span class="text-xs text-slate-500 font-medium">
                  เวลา ${ev.time} (เรียกตัว ${ev.callTime}) • ${ev.location}
                </span>
              </div>
              <h4 class="text-base font-bold text-[#0B1E36]">${ev.title}</h4>
            </div>

            <!-- Quota Status Pill -->
            <div class="flex items-center gap-2 shrink-0">
              <span class="text-xs font-bold px-3 py-1.5 rounded-full border ${
                isFull 
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                  : 'bg-amber-50 text-amber-900 border-amber-300'
              }">
                ${isFull ? '✓ โควตาเต็มแล้ว' : '⚠️ ยังไม่ครบโควตา'}: ${assigned.length}/${ev.quota} คน
              </span>
            </div>
          </div>

          <!-- Rules & Criteria Box -->
          <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
            <div class="flex items-center gap-2 font-bold text-slate-800">
              <span>เกณฑ์ผู้สมัคร:</span>
              <span class="text-blue-700">
                ${ev.minGrade === ev.maxGrade ? `เฉพาะ ป.${ev.minGrade}` : `ป.${ev.minGrade} – ป.${ev.maxGrade}`}
              </span>
              <span>• เพศ:</span>
              <span class="text-blue-700">${ev.gender === 'Boy' ? 'ชาย' : ev.gender === 'Girl' ? 'หญิง' : 'ไม่จำกัดเพศ (ชายหรือหญิงก็ได้)'}</span>
              <span>• ชิงรางวัล:</span>
              <span class="text-amber-800 font-normal">${ev.medals}</span>
            </div>
            <p class="leading-relaxed text-[11px] text-slate-500">${ev.rules}</p>
          </div>

          <!-- Assigned Athletes Slots -->
          <div class="space-y-2 pt-1">
            <div class="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              รายชื่อนักกีฬาที่ลงรายการนี้ (${assigned.length}/${ev.quota} คน):
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              <!-- Render Assigned Students -->
              ${assigned.map((st, sIdx) => {
                const otherEvents = (st.events || []).filter(e => !isEventMatch(e, ev));
                const otherEventsText = otherEvents.length > 0 
                  ? `(มีรายการอื่นอีก ${otherEvents.length} รายการ)` 
                  : `(รายการเดียว)`;

                return `
                  <div class="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs hover:border-slate-300 transition">
                    <div class="flex items-center gap-2 min-w-0 pr-2">
                      <span class="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-mono font-bold text-[11px] flex items-center justify-center shrink-0">
                        ${sIdx + 1}
                      </span>
                      <div class="min-w-0">
                        <div class="text-xs font-bold text-slate-900 truncate" title="${st.fullName}">
                          ${st.fullName}
                        </div>
                        <div class="text-[11px] text-slate-500 flex items-center gap-1.5">
                          <span class="font-bold text-amber-700">(${st.nickname})</span>
                          <span>•</span>
                          <span>${st.class} #${st.no}</span>
                        </div>
                      </div>
                    </div>
                    <button 
                      onclick="removeStudentFromEventPrompt(${st.id}, '${ev.code}')"
                      class="text-slate-400 hover:text-rose-600 hover:bg-rose-50 p-1.5 rounded-lg transition shrink-0"
                      title="ปลดชื่อออกจากรายการนี้"
                    >
                      <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                  </div>
                `;
              }).join('')}

              <!-- Render Empty Slots with Add Button -->
              ${Array.from({ length: emptySlotsCount }).map((_, slotIdx) => {
                const currentSlotNumber = assigned.length + slotIdx + 1;
                return `
                  <div class="flex items-center justify-between p-2.5 rounded-xl border border-dashed border-amber-300 bg-amber-50/30 hover:bg-amber-50/60 transition">
                    <div class="flex items-center gap-2 text-xs text-amber-900 font-medium">
                      <span class="w-5 h-5 rounded-full bg-amber-200 text-amber-800 font-mono font-bold text-[11px] flex items-center justify-center shrink-0">
                        ${currentSlotNumber}
                      </span>
                      <span>ว่าง (ยังไม่มีนักกีฬา)</span>
                    </div>
                    <button 
                      onclick="openAddStudentToEventModal('${ev.code}')"
                      class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-[#0B1E36] hover:bg-[#162F52] text-white transition shadow-2xs"
                    >
                      <span>+ เลือกนักเรียน</span>
                    </button>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      `;
    });
  }

  html += `</div>`;
  container.innerHTML = html;
}

// Helper to check event string equality against event config
function isEventMatch(eventStr, eventConfig) {
  if (eventConfig.standardEventName && eventStr === eventConfig.standardEventName) return true;
  if (eventStr.includes(eventConfig.title) || eventStr.includes(eventConfig.titleEn)) return true;
  return false;
}

// Controller actions for Filtering & Searching
function setEventRegColor(color) {
  EVENT_REG_STATE.selectedColor = color;
  renderEventRegistrationView();
}

function setEventRegCategory(category) {
  EVENT_REG_STATE.selectedCategory = category;
  renderEventRegistrationView();
}

function setEventRegSearch(query) {
  EVENT_REG_STATE.searchQuery = query;
  renderEventRegistrationView();
}

// ==========================================
// MODAL: Pick & Assign Student into an Event
// ==========================================
function openAddStudentToEventModal(eventCode) {
  EVENT_REG_STATE.activeModalEventCode = eventCode;
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

  const eventCode = EVENT_REG_STATE.activeModalEventCode;
  const ev = EVENT_REGISTRATION_CONFIG.find(e => e.code === eventCode);
  if (!ev) return;

  const color = EVENT_REG_STATE.selectedColor;
  if (titleEl) titleEl.textContent = `เลือกนักเรียนลง: ${ev.title}`;
  if (subtitleEl) subtitleEl.textContent = `อาณาจักร ${color} • เกณฑ์: ${ev.minGrade === ev.maxGrade ? 'ป.' + ev.minGrade : 'ป.' + ev.minGrade + '–ป.' + ev.maxGrade} • ${ev.gender === 'Boy' ? 'ชาย' : ev.gender === 'Girl' ? 'หญิง' : 'ไม่จำกัดเพศ'}`;

  // 1. Get all students of this color meeting the grade and gender rules
  let candidates = APP_STATE.students.filter(s => {
    if (s.color !== color) return false;
    if (s.grade < ev.minGrade || s.grade > ev.maxGrade) return false;
    if (ev.gender !== 'Any' && s.gender !== ev.gender) return false;
    return true;
  });

  // 2. Filter out students already in THIS event
  candidates = candidates.filter(s => !isStudentAssignedToEvent(s, ev));

  // 3. Search query filter
  const q = (EVENT_REG_STATE.modalSearchQuery || '').trim().toLowerCase();
  if (q) {
    candidates = candidates.filter(s => 
      s.fullName.toLowerCase().includes(q) ||
      s.nickname.toLowerCase().includes(q) ||
      s.class.toLowerCase().includes(q) ||
      String(s.no).includes(q)
    );
  }

  // 4. Zero-events filter toggle
  if (EVENT_REG_STATE.modalFilterMode === 'zero_events') {
    candidates = candidates.filter(s => !s.events || s.events.length === 0);
  }

  // 5. Sort: Students with 0 events first, then 1 event, then 2+ events
  candidates.sort((a, b) => {
    const aCount = a.events ? a.events.length : 0;
    const bCount = b.events ? b.events.length : 0;
    if (aCount !== bCount) return aCount - bCount;
    if (a.grade !== b.grade) return a.grade - b.grade;
    return a.no - b.no;
  });

  if (candidates.length === 0) {
    listContainer.innerHTML = `
      <div class="p-8 text-center text-slate-500 text-xs">
        ไม่พบนักเรียนสีนี้ที่ตรงตามเกณฑ์และคำค้นหา
      </div>
    `;
    return;
  }

  listContainer.innerHTML = candidates.map(st => {
    const eventCount = st.events ? st.events.length : 0;
    
    // Warning flags
    const hasConflict = (ev.category === 'football' && st.events.some(e => e.includes('Basketball'))) ||
                        (ev.category === 'basketball' && st.events.some(e => e.includes('Football')));

    let badgeHtml = '';
    if (eventCount === 0) {
      badgeHtml = `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">0 รายการ (ยังไม่มีแข่ง - แนะนำ)</span>`;
    } else if (eventCount === 1) {
      badgeHtml = `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">ลงแล้ว 1 รายการ</span>`;
    } else {
      badgeHtml = `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">ลงแล้ว ${eventCount} รายการ</span>`;
    }

    return `
      <div class="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/50 transition">
        <div class="space-y-1 min-w-0 pr-3">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="text-xs font-bold text-slate-900">${st.fullName}</span>
            <span class="text-xs font-bold text-amber-700 font-sans">(${st.nickname})</span>
            ${badgeHtml}
          </div>
          <div class="text-[11px] text-slate-500">
            ${st.class} #${st.no} • เพศ: ${st.gender === 'Boy' ? 'ชาย' : 'หญิง'}
            ${hasConflict ? `<span class="text-amber-700 font-semibold ml-2">⚠️ มีแข่งฟุตบอล/บาสเกตบอลแล้ว</span>` : ''}
          </div>
          ${eventCount > 0 ? `
            <div class="text-[10px] text-slate-400">
              รายการที่ลงแล้ว: ${st.events.join(', ')}
            </div>
          ` : ''}
        </div>

        <button 
          onclick="executeAssignStudent(${st.id}, '${ev.code}')"
          class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#0B1E36] hover:bg-[#162F52] text-white transition shadow-2xs shrink-0"
        >
          <span>+ เลือกคนนี้</span>
        </button>
      </div>
    `;
  }).join('');
}

// Execute student assignment to an event
function executeAssignStudent(studentId, eventCode) {
  const ev = EVENT_REGISTRATION_CONFIG.find(e => e.code === eventCode);
  if (!ev) return;

  const student = APP_STATE.students.find(s => s.id === studentId);
  if (!student) return;

  if (!student.events) student.events = [];

  // Add standard event name
  if (!student.events.includes(ev.standardEventName)) {
    student.events.push(ev.standardEventName);
  }

  saveStudentsToStorage();
  if (typeof pushStudentUpdateToCloud === 'function') {
    pushStudentUpdateToCloud(student.id, student.events);
  }

  // Update UI
  renderEventRegistrationView();
  if (typeof renderRosterView === 'function') renderRosterView();
  if (typeof updateRosterStats === 'function') updateRosterStats();

  closeEventStudentPickerModal();
  showAutoSaveIndicator(`ลงทะเบียน ${student.nickname} เรียบร้อยแล้ว`);
}

// Remove student from an event
function removeStudentFromEventPrompt(studentId, eventCode) {
  const ev = EVENT_REGISTRATION_CONFIG.find(e => e.code === eventCode);
  if (!ev) return;

  const student = APP_STATE.students.find(s => s.id === studentId);
  if (!student) return;

  if (confirm(`คุณต้องการปลด "${student.fullName} (${student.nickname})" ออกจากรายการ "${ev.title}" ใช่หรือไม่?`)) {
    if (!student.events) return;

    // Filter out events matching this event
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
