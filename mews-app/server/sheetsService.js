const { google } = require('googleapis');
require('dotenv').config();

// Initialize Google Sheets API
const auth = new google.auth.JWT(
  process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  null,
  process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  ['https://www.googleapis.com/auth/spreadsheets.readonly']
);

const sheets = google.sheets({ version: 'v4', auth });

// Function to fetch memes from Google Sheets
async function fetchMemes(spreadsheetId, range) {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: range,
    });

    const rows = response.data.values || [];
    return rows.map((row, index) => ({
      id: `meme-${Date.now()}-${index}`,
      originalHeadline: row[0] || '',
      memeCaption: row[1] || '',
      sourceUrl: row[2] || '',
      sourceName: row[3] || '',
      timestamp: row[4] || new Date().toISOString(),
      imageUrl: row[5] || '',
      category: detectCategory(row[0]),
      formattedDate: formatDate(row[4]),
    }));
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
    throw new Error('Failed to fetch memes');
  }
}

// Helper function to detect category
function detectCategory(headline) {
  const lcHeadline = (headline || '').toLowerCase();
  
  if (lcHeadline.includes('politic') || lcHeadline.includes('president')) {
    return 'politics';
  } else if (lcHeadline.includes('tech') || lcHeadline.includes('ai')) {
    return 'technology';
  }
  return 'general';
}

// Helper function to format date
function formatDate(timestamp) {
  try {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch (e) {
    return new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }
}

module.exports = {
  fetchMemes,
};