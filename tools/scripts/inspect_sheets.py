import openpyxl
import json

wb = openpyxl.load_workbook(r'C:\Users\LOQ\.gemini\antigravity\scratch\tws-sports-day-2026\sheet_duties_update.xlsx', data_only=True)
print("Sheet names:", wb.sheetnames)

for name in wb.sheetnames:
    sheet = wb[name]
    print(f"\n--- SHEET: {name} (Rows: {sheet.max_row}, Cols: {sheet.max_column}) ---")
    for r in range(1, min(sheet.max_row + 1, 35)):
        row_vals = [str(sheet.cell(r, c).value or '').strip() for c in range(1, min(sheet.max_column + 1, 10))]
        if any(row_vals):
            print(f"Row {r:2d}:", " | ".join(row_vals[:6]))
