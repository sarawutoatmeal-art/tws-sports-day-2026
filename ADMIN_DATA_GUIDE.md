# คู่มือการจัดการระบบหลังบ้านและการแก้ไขข้อมูล (Backend & Admin Data Guide)
### โรงเรียนเตชะวิทย์ — Techawit School Primary Sports Day 2026: Kingdom Games

คู่มือฉบับนี้จัดทำขึ้นเพื่อให้คุณครูและผู้ดูแลระบบสามารถตรวจสอบ แก้ไขข้อมูล จัดการโควตา และสำรองฐานข้อมูลหลังบ้านได้อย่างเป็นระเบียบ ถูกต้อง และปลอดภัย

---

## 1. แผนผังโครงสร้างโฟลเดอร์หลังบ้าน (Clean Project Structure)

```
tws-sports-day-2026/
├── index.html                 # หน้าเว็บหลักของพอร์ทัล (ระบบตาราง, ลงทะเบียน, สรุปผล, รายชื่อ)
├── handbook-en.html           # หน้าคู่มือและโปรแกรมการแข่งขันภาษาอังกฤษ
├── netlify.toml               # การตั้งค่าสำหรับโฮสติ้ง Netlify
├── google-apps-script-sync.js # สคริปต์หลังบ้านสำหรับติดตั้งบน Google Sheets (Cloud API)
├── README.md                  # ภาพรวมระบบ
├── ADMIN_DATA_GUIDE.md        # [เอกสารนี้] คู่มือการจัดการระบบหลังบ้านและฐานข้อมูล
├── .gitignore                 # กำหนดไฟล์ที่ไม่ต้องส่งขึ้น Git (ไฟล์ชั่วคราว, Log, Dump)
│
├── assets/                    # ทรัพยากรระบบของหน้าเว็บ
│   ├── css/
│   │   └── styles.css         # สไตล์การแสดงผลเฉพาะทางและแอนิเมชัน
│   ├── js/
│   │   ├── app.js             # ตัวควบคุมหลัก (State Management, Routing, Event Listeners)
│   │   ├── event-registration.js # ระบบลงทะเบียนตามรายการแข่งขันและช่อง Slot โควตา
│   │   ├── students-data.js   # ฐานข้อมูลนักเรียน 230 คน (ชื่อ, ชั้น, สี, พี่น้อง)
│   │   ├── schedule-data.js   # ตารางแข่งขัน 41 รายการ, 5 ช่วงเวลา และสรุป 201 เหรียญรางวัล
│   │   ├── duties-data.js     # รายชื่อครูประจำสีและหน้าที่เวรฝ่ายต่างๆ
│   │   ├── links-data.js      # รหัสรายการกีฬา (E1–E41), โควตาสี และลิงก์เอกสารทางการ
│   │   ├── kindergarten-data.js # ข้อมูลตรวจสอบพี่น้องฝั่งอนุบาล (Sibling Cross-check)
│   │   ├── i18n.js            # ระบบสลับ 2 ภาษา (ไทย ↔ English)
│   │   └── icons.js           # คลังไอคอน SVG แบบคมชัด
│   ├── images/                # โลโก้โรงเรียนและภาพแบนเนอร์ 4 อาณาจักร
│   └── docs/                  # ไฟล์เอกสาร PDF ทางการ
│
├── data/                      # แหล่งจัดเก็บข้อมูลสำรองและไฟล์ดิบ
│   ├── students_roster.csv    # รายชื่อนักเรียน 230 คน ในรูปแบบ Excel/CSV (พร้อมเปิดใช้งาน)
│   ├── students_roster.json   # ฐานข้อมูลนักเรียนในรูปแบบ JSON มาตรฐาน
│   └── source_sheets/         # โฟลเดอร์เก็บไฟล์ Excel ต้นฉบับจากโรงเรียน
│
└── tools/                     # เครื่องมืออำนวยความสะดวกในการดูแลระบบ
    ├── README.md              # คำอธิบายการใช้เครื่องมือแต่ละตัว
    ├── validate_data_integrity.ps1 # สคริปต์ตรวจสอบความถูกต้องของข้อมูลทั้งหมดอัตโนมัติ
    ├── export_roster.ps1      # สคริปต์ส่งออกข้อมูลนักเรียนเป็น CSV/JSON
    ├── serve.ps1              # สคริปต์เปิดเว็บเซิร์ฟเวอร์ทดสอบในเครื่อง (พอร์ต 8085)
    └── scripts/               # คลังสคริปต์วิเคราะห์และประมวลผลข้อมูล
```

---

## 2. วิธีการจัดเก็บและซิงค์ข้อมูล (Data Flow Architecture)

ระบบถูกออกแบบให้ทำงานร่วมกัน 3 ชั้น เพื่อความเร็วและความปลอดภัย:

```
[ เบราว์เซอร์ของคุณครู ]
       ↕ บันทึกลงเครื่องทันที (LocalStorage) ภายใน 0.05 วินาที
[ LocalStorage: tws_sports_day_2026_roster_clean_v2 ]
       ↕ ส่งข้อมูลไปซิงค์บน Cloud อัตโนมัติ (Background Async POST)
[ Google Apps Script API: google-apps-script-sync.js ]
       ↕ บันทึกลงฐานข้อมูลกลาง
[ Google Cloud Properties / Google Sheets ]
```

* **เมื่อครูกดลงชื่อหรือเปลี่ยนตัวนักเรียน:** ข้อมูลจะเซฟลง LocalStorage ของเครื่องทันที ทำให้หน้าเว็บตอบสนองไว ไม่ค้าง
* **การซิงค์แบบเรียลไทม์:** ระบบจะส่งข้อมูลไปบันทึกที่ Google Apps Script เบื้องหลังภายใน 1–2 วินาที และทุกเครื่องจะดึงข้อมูลอัปเดตใหม่ทุก ~25 วินาที ทำให้คุณครูทุกคนเห็นข้อมูลตรงกันตลอดเวลา

---

## 3. คู่มือการแก้ไขข้อมูลที่พบบ่อย (How to Edit Master Data)

### กรณีที่ 1: แก้ไขข้อมูลนักเรียน (ชื่อ, ห้องเรียน, ชื่อเล่น, หรือสี)
* **ไฟล์ที่ต้องแก้ไข:** `assets/js/students-data.js`
* **โครงสร้างข้อมูล:**
  ```javascript
  {
      "id": 1,
      "class": "G1 Giraffe",
      "grade": 1,
      "no": 1,
      "fullName": "MISS INTHADCHAYA SOPONPIJITPAISAN",
      "nickname": "GLACIER",
      "gender": "Girl",        // "Boy" หรือ "Girl"
      "color": "Green",        // "Purple", "Red", "Yellow", หรือ "Green"
      "kingdom": "Jade Dynasty",
      "sibling": "Ganesh K.1 Starfish",
      "events": []             // รายการแข่งขันที่ลง
  }
  ```
* เมื่อแก้ไขเสร็จแล้ว ให้รันคำสั่งส่งออกข้อมูลใหม่:
  ```powershell
  powershell -ExecutionPolicy Bypass -File tools/export_roster.ps1
  ```

---

### กรณีที่ 2: ปรับเปลี่ยนเวลาแข่งขัน หรือ เวลารายงานตัว (Call Time)
* **ไฟล์ที่ต้องแก้ไข:** `assets/js/schedule-data.js`
* ในอาร์เรย์ `EVENT_SCHEDULE` สามารถแก้ไข:
  * `time`: เวลาการแข่งขันจริง เช่น `"10:00 – 10:15"`
  * `callTime`: เวลารายงานตัวที่ Call Room เช่น `"09:50"` (ล่วงหน้า 10 นาที)
  * `location`: สถานที่แข่งขัน เช่น `"สนามโรงยิม (Gymnasium Field Court)"`
  * `rules`: สรุปกติกาสั้น 1 บรรทัดสำหรับการ์ด

---

### กรณีที่ 3: แก้ไขกติกาหรือโควตาช่อง Slot ของรายการแข่งขัน
* **ไฟล์ที่ต้องแก้ไข:** `assets/js/event-registration.js`
* **ตัวอย่างกติกาฟุตบอล 9 คน (Split-Squad E27):**
  * `quota`: กำหนดจำนวนคนต่อสี (เช่น `9`)
  * `slotsConfig`: ระบุเงื่อนไขของแต่ละช่อง:
    * ช่อง 1–4: ป.3–ป.4 (`targetGrades: [3, 4]`)
    * ช่อง 5–8: ป.5–ป.6 (`targetGrades: [5, 6]`)
    * ช่อง 9: ผู้รักษาประตู Higher Grade (`targetGrades: [5, 6]`, `role: "Goalkeeper"`)
* **ระบบ Soft Validation:** หากเลือกลงผิดชั้นหรือผิดเพศ ระบบจะขึ้นเตือน **กรอบสีแดง** ชัดเจน แต่ไม่บล็อกการบันทึก เพื่อให้คุณครูมีความยืดหยุ่นในการจัดตัวนักกีฬา

---

### กรณีที่ 4: เพิ่มหรือแก้ไขข้อความแปล 2 ภาษา (ไทย / อังกฤษ)
* **ไฟล์ที่ต้องแก้ไข:** `assets/js/i18n.js`
* เพิ่มคีย์ข้อความลงในทั้งสองหมวด:
  * หมวดภาษาไทย: `th: { "my_key": "ข้อความภาษาไทย" }`
  * หมวดภาษาอังกฤษ: `en: { "my_key": "English text" }`
* บนหน้าเว็บ HTML สามารถเรียกใช้โดยใส่แอตทริบิวต์: `data-i18n="my_key"`

---

## 4. เครื่องมือตรวจสอบความสมบูรณ์ของระบบ (Automated Diagnostic)

ทุกครั้งก่อนขึ้นเว็บจริงหรือหลังการแก้ไขโค้ด สามารถรันคำสั่งตรวจสอบอัตโนมัติได้ทันที:

```powershell
powershell -ExecutionPolicy Bypass -File tools/validate_data_integrity.ps1
```

**ผลลัพธ์ที่ถูกต้องสมบูรณ์ (13 Checks Passed):**
```
==========================================================
 TWS Sports Day 2026 - Data Integrity & Backend Diagnostic
==========================================================

1. Checking Student Master Database (students-data.js)...
  [PASS] File exists: students-data.js
  [PASS] Exact Student Count = 230
  [PASS] All students have valid Kingdom Colors

2. Checking Schedule & Medal Allocation (schedule-data.js)...
  [PASS] File exists: schedule-data.js
  [PASS] Total Medal Count is exactly 201
  [PASS] Football configured as 9-player Split Squad
  [PASS] 5-Phase Schedule Configuration present

3. Checking Event Registration Quota Engine...
  [PASS] File exists: event-registration.js
  [PASS] Soft Validation active
  [PASS] Football 9 locked slots configured (E27 quota: 9)

4. Checking Bilingual Engine (i18n.js)...
  [PASS] File exists: i18n.js
  [PASS] Bilingual Dictionary contains Thai (th) & English (en)

5. Checking Cloud Sync Backend (google-apps-script-sync.js)...
  [PASS] File exists: google-apps-script-sync.js

----------------------------------------------------------
 Diagnostic Summary: 13 PASSED, 0 FAILED
----------------------------------------------------------
ALL SYSTEMS GO: The backend and master datasets are 100% verified and healthy!
```

---

## 5. การสำรองและการกู้คืนข้อมูล (Backup & Restore)

* **สำรองข้อมูลรายชื่อ:** ไฟล์ `data/students_roster.csv` และ `data/students_roster.json` จะถูกอัปเดตอัตโนมัติทุกครั้งที่รัน `tools/export_roster.ps1`
* **สำรองข้อมูลการลงทะเบียนแข่งขัน (Event Assignments):**
  * ในหน้าพอร์ทัลของคุณครู มีปุ่มส่งออกข้อมูลรายชื่อเป็นไฟล์เอกสาร A4 ในแท็บ **Print Center**
  * ข้อมูลบน Cloud ถูกจัดเก็บไว้อย่างปลอดภัยบน Google Apps Script Properties
