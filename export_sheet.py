import gspread
import pandas as pd # Still useful if you need advanced manipulation
import json
import os
import base64
from google.oauth2.service_account import Credentials

# Define the scope for Google Sheets and Drive API
SCOPES = [
    'https://www.googleapis.com/auth/spreadsheets.readonly',
    'https://www.googleapis.com/auth/drive.readonly'
]

# --- Configuration ---
creds_json_b64 = os.environ.get('GDRIVE_CREDENTIALS_JSON_B64')
if not creds_json_b64:
    raise ValueError("GDRIVE_CREDENTIALS_JSON_B64 environment variable not set.")

creds_json_str = base64.b64decode(creds_json_b64).decode('utf-8')
creds_info = json.loads(creds_json_str)

creds = Credentials.from_service_account_info(creds_info, scopes=SCOPES)
gc = gspread.authorize(creds)

SHEET_ID = os.environ.get('GOOGLE_SHEET_ID')
if not SHEET_ID:
    raise ValueError("GOOGLE_SHEET_ID environment variable not set.")

WORKSHEET_NAME = os.environ.get('GOOGLE_WORKSHEET_NAME', 'Sheet1')
OUTPUT_JSON_PATH = os.environ.get('OUTPUT_JSON_PATH', 'news_data.json')
# --- End Configuration ---


print(f"Connecting to Google Sheet ID: {SHEET_ID}, Worksheet: {WORKSHEET_NAME}")
try:
    spreadsheet = gc.open_by_key(SHEET_ID)
    worksheet = spreadsheet.worksheet(WORKSHEET_NAME)

    print("Fetching data using headers...")
    # get_all_records() uses the first row as headers automatically
    # Ensure your sheet's first row exactly matches:
    # Headline, Meme Caption, URL, Source, Timestamp, ImageURL
    data = worksheet.get_all_records()
    print(f"Data fetched: {len(data)} records")

    # Optional: Standardize Timestamp format if needed
    # for item in data:
    #     if 'Timestamp' in item and item['Timestamp']:
    #         try:
    #             # Example: Convert to ISO format if needed. Adjust based on your actual timestamp format
    #             # Assumes pandas is used: item['Timestamp'] = pd.to_datetime(item['Timestamp']).isoformat()
    #             pass # If format is already good, do nothing
    #         except Exception as e:
    #             print(f"Warning: Could not process timestamp '{item['Timestamp']}': {e}")

    print(f"Saving data to {OUTPUT_JSON_PATH}...")
    with open(OUTPUT_JSON_PATH, 'w', encoding='utf-8') as f:
        # Use ensure_ascii=False to handle potential special characters correctly
        json.dump(data, f, ensure_ascii=False, indent=4)

    print("Successfully exported data to JSON.")

except gspread.exceptions.SpreadsheetNotFound:
    print(f"Error: Spreadsheet not found. Check SHEET_ID: {SHEET_ID}")
    exit(1)
except gspread.exceptions.WorksheetNotFound:
     print(f"Error: Worksheet '{WORKSHEET_NAME}' not found in the spreadsheet.")
     exit(1)
except Exception as e:
    print(f"An error occurred: {e}")
    exit(1)
