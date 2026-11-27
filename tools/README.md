# TWS Sports Day 2026 - Developer & Maintenance Tools

เครื่องมือสำหรับผู้ดูแลระบบและนักพัฒนาเพื่อตรวจสอบความสมบูรณ์และจัดการข้อมูลหลังบ้าน

---

## เครื่องมือหลัก (Primary Tools)

### 1. `validate_data_integrity.ps1`
ตรวจสอบความถูกต้องของข้อมูลทั้งหมดในระบบแบบอัตโนมัติ (Automated Data Sanity Check)
```powershell
powershell -ExecutionPolicy Bypass -File tools/validate_data_integrity.ps1
```
**การตรวจสอบครอบคลุม:**
* รายชื่อนักเรียนครบ 230 คน (ไม่มีชื่อซ้ำ, รหัส 1–230)
* การสังกัดสีทั้ง 4 อาณาจักรถูกต้อง (Purple 58, Red 58, Yellow 58, Green 56)
* ยอดสรุปเหรียญรางวัลครบ 201 เหรียญ (ทอง 67, เงิน 67, ทองแดง 67)
* กติกาฟุตบอลแบ่งเซต 9 คน (G3-G4 4 คน, G5-G6 4 คน, ผู้รักษาประตู 1 คน) และ 27 เหรียญ
* ตารางแข่งขันครบ 5 ช่วงเวลา (Phase 1–5) พร้อม Call Times
* กฎ Soft Validation ตรวจจับเพศและระดับชั้น
* ระบบพจนานุกรม 2 ภาษา (ไทย และ อังกฤษ)
* ความพร้อมของ API เชื่อมต่อ Google Apps Script

---

### 2. `export_roster.ps1`
ส่งออกข้อมูลนักเรียน 230 คนจากไฟล์หลัก `assets/js/students-data.js` เป็นไฟล์ Excel/CSV และ JSON
```powershell
powershell -ExecutionPolicy Bypass -File tools/export_roster.ps1
```
**ไฟล์ที่ได้ (บันทึกลงในโฟลเดอร์ `data/`):**
* `data/students_roster.csv`: เปิดด้วย Microsoft Excel หรือ Google Sheets ได้ทันที (รองรับภาษาไทย)
* `data/students_roster.json`: โครงสร้าง JSON มาตรฐานสำหรับระบบหรือ API อื่นๆ

---

### 3. `serve.ps1`
เปิดเว็บเซิร์ฟเวอร์จำลองในเครื่อง (Local Development Server) ที่พอร์ต 8085
```powershell
powershell -ExecutionPolicy Bypass -File serve.ps1
```
เข้าใช้งานได้ที่: `http://localhost:8085/`

---

## โฟลเดอร์ `scripts/`
โฟลเดอร์รวบรวมสคริปต์สำหรับการประมวลผลข้อมูลและดึงข้อมูล Excel เดิม (Archive of parsing utilities)
