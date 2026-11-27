# TWS Sports Day 2026: The Kingdom Games
**Techawit School (โรงเรียนเตชะวิทย์) • Primary Sports Day Portal**

An interactive, all-in-one information hub and athlete database for Techawit School teachers, designed for **TWS Sports Day 2026: Kingdom Games** held on **January 8, 2027 (2570)**.

---

## 🏰 The 4 Royal Kingdoms
1. 🦁 **Crimson Empire (Red)** — *Courage • Honor • Unity* (Lion Crest)
2. ☀️ **Golden Realm (Yellow)** — *Hope • Energy • Unity* (Sun Crest)
3. 🐉 **Jade Dynasty (Green)** — *Wisdom • Harmony • Unity* (Dragon Crest)
4. 💎 **Amethyst Kingdom (Purple)** — *Imagination • Wisdom • Unity* (Crystal Crest)

---

## 🚀 Key Features for Teachers

### 1. ⚔️ Complete 230-Student Athlete Database
- All 230 primary students across 11 classes (Grades 1 to 6) cleanly categorized by Kingdom color (57–58 students per house).
- Filter by **Kingdom Color**, **Grade / Class**, **Gender**, and **Participation Status**.
- Real-time search by student nickname or full name.
- **Interactive Event Assignment & Quota Locking**: Quota-based athlete registration per sport with locked capacity slots and soft validation (shows red warning badge on grade/gender mismatch while allowing teacher flexibility).
- **Split Squad Football (9 players per house)**: Divided into 1st half G3-4 (4 players), 2nd half G5-6 (4 players), and 1 continuous Higher Grade Goalkeeper.
- **Target Tracking**: Real-time badges for:
  - `⚠️ 0 Events` (Needs attention)
  - `1 Event` (Good)
  - `✓ 2 Events` (Optimal Target)
  - `⚡ 3+ Events` (Sub / Reserve)
- **Data Persistence**: Automatically saves edits to browser `localStorage` and synchronizes with Google Sheets.
- **Export & Print**: One-click **Export to CSV** or **Print A4 Roster**.

### 2. 📋 Teacher Duties & Staff Search
- Comprehensive duty matrix covering all 11 departments:
  - MC & Stage Hosts (T.Oil, T.Mary, T.Cream, T.Lauly)
  - Medals & Awards (T.June, T.Fon, T.Donut, T.Bell, T.Sai, T.EJ)
  - Registration Desk (T.Iris, T.Marky, T.Hannah, T.Cristian, T.Dada, T.Shake, T.Nuch, T.Bonnie, T.Beam)
  - House Masters (ครูประจำสี - Purple, Yellow, Green, Red)
  - Referees & Umpires (T.OAT, T.CRISTIAN, T.CREAM, T.BELL, T.Noth, T.Natalia)
  - First Aid & Medical (T.Kaew)
  - Venue & Hospitality (T.Bee, T.Ester, T.Shake, T.Dada)
  - Audio & Music (T.Noth, T.Mike)
  - Media & Photography (T.Mark, T.Sho, T.Chompu)
  - Traffic & Logistics (P.Sak, P.Nui, support staff)
  - Administration & Ceremony (School Admin, T.June, T.Fon)
- Teachers can type their name into the search bar to immediately see all their assigned stations and roles.

### 3. ⏱️ Event Day Schedule & Timeline (08:00 – 12:15)
- Prominent Schedule board organized into 5 intuitive chronological phases:
  - Phase 1: Registration & Opening Ceremony (08:00 – 08:45)
  - Phase 2: Morning Sprint & Track Preliminaries (08:45 – 09:45)
  - Phase 3: Court Finals & Team Ball Games (09:45 – 10:45)
  - Phase 4: Championship Relays & Family Fun (10:45 – 11:30)
  - Phase 5: Exhibition Matches & Grand Closing (11:30 – 12:15)
- Highlights athlete **Call Times** (เวลาเรียกรวม) in red/rose badges so teachers can marshal athletes on time.
- Filter by Category: Sprint/Relays, Court Sports, Family Games, Special Exhibition Matches, and Ceremonies.

### 4. 🏅 Sports Handbook & Medal Stakes (201 Medals)
- Official breakdown of 67 Gold, 67 Silver, and 67 Bronze medals across primary sports and games.
- Official guidelines, quotas, and rules for Family Games (Fastball, Hula Hoop, 3-Legged Race) and Special Parent/Teacher Matches.

### 5. 🌐 Full Thai / English Bilingual Switcher
- Instant one-click toggle between Thai and English across the entire interface (navigation, headings, tables, statuses, buttons).

---

## 📁 Clean Backend Architecture & Directory Structure

```text
tws-sports-day-2026/
├── index.html                 # Main web portal application
├── handbook-en.html           # Standalone English handbook
├── netlify.toml               # Netlify deployment configuration
├── ADMIN_DATA_GUIDE.md        # Comprehensive backend administration & data guide
├── README.md                  # Project overview & documentation
├── serve.ps1                  # Resilient local HTTP server (port 8085)
├── google-apps-script-sync.js # Google Sheets cloud sync script
├── assets/                    # Production frontend runtime
│   ├── css/styles.css         # Responsive styling
│   └── js/
│       ├── app.js             # Main controller & navigation router
│       ├── event-registration.js # Slot quotas & soft validation
│       ├── students-data.js   # 230 Primary students master dataset
│       ├── schedule-data.js   # 41 Timeline events & 201 medals master
│       ├── duties-data.js     # Staff duty assignments
│       ├── links-data.js      # Sports quota rules & external doc links
│       ├── kindergarten-data.js # Kindergarten cross-reference data
│       ├── i18n.js            # Thai/English bilingual dictionary
│       └── icons.js           # SVG icon components
├── data/                      # Structured data & exported rosters
│   ├── students_roster.csv    # UTF-8 CSV roster for Microsoft Excel
│   ├── students_roster.json   # JSON formatted roster
│   └── source_sheets/         # Original Excel master sheets archive
└── tools/                     # Backend maintenance & validation tools
    ├── README.md              # Tools documentation
    ├── validate_data_integrity.ps1 # 13-point data sanity tester
    ├── export_roster.ps1      # Student roster CSV/JSON exporter
    └── scripts/               # Archive of one-off inspection scripts
```

---

## 🛠️ Backend Maintenance & Sanity Testing

To ensure data integrity after making edits to student or schedule files:

```powershell
# Run the 13-point automated data integrity test
.\tools\validate_data_integrity.ps1

# Export fresh CSV and JSON rosters from students-data.js
.\tools\export_roster.ps1
```

For complete instructions on editing students, updating schedule/call times, modifying sport quotas, and syncing with Google Sheets, see [ADMIN_DATA_GUIDE.md](ADMIN_DATA_GUIDE.md).

---

## 💻 How to Run Locally

### Resilient Local Server (Recommended)
Run in PowerShell:
```powershell
.\serve.ps1
```
This serves the application at `http://localhost:8085` with automatic port fallback and opens your browser.

---

## 🌐 How to Publish Online (Free Hosting)

1. **GitHub Pages**:
   - Push this folder to a GitHub repository.
   - Go to **Settings > Pages** and select `main` branch root.
   - Your site is live at `https://<username>.github.io/<repo>/`!

2. **Vercel / Netlify**:
   - Drag and drop the `tws-sports-day-2026` folder into [Netlify Drop](https://app.netlify.com/drop) or import to Vercel.
   - Instant public link in 10 seconds!
