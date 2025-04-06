const express = require('express');
const { google } = require('googleapis');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Serve static files from React build
app.use(express.static(path.join(__dirname, '../client/build')));

// Initialize Google Sheets API
const auth = new google.auth.JWT(
  process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  null,
  process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  ['https://www.googleapis.com/auth/spreadsheets.readonly']
);

const sheets = google.sheets({ version: 'v4', auth });

// API endpoint to fetch memes
app.get('/api/memes', async (req, res) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: 'Sheet1!A2:F',
    });

    const rows = response.data.values || [];
    
    // Process the data
    const memes = rows.map((row, index) => ({
      id: `meme-${Date.now()}-${index}`,
      originalHeadline: row[0] || '',
      memeCaption: row[1] || '',
      sourceUrl: row[2] || '',
      sourceName: row[3] || '',
      timestamp: row[4] || new Date().toISOString(),
      imageUrl: row[5] || '',
      category: detectCategory(row[0]),
      formattedDate: formatDate(row[4])
    }));
    
    res.json(memes);
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
    res.status(500).json({ error: 'Failed to fetch memes' });
  }
});

// Helper function to detect category
function detectCategory(headline) {
  const lcHeadline = (headline || '').toLowerCase();
  
  if (lcHeadline.includes('politic') || lcHeadline.includes('president')) {
    return 'politics';
  } else if (lcHeadline.includes('tech') || lcHeadline.includes('ai')) {
    return 'technology';
  }
  // Add more categories as needed
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

// Catch-all handler
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});