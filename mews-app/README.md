# Mews App

## Overview

The Mews App is a React-based application that integrates with Google Sheets to display a curated feed of memes. It allows users to filter content by categories and provides a fun and engaging user experience through the Mewsley mascot.

## Features

- **Meme Feed**: Displays a list of memes fetched from Google Sheets.
- **Category Filtering**: Users can filter memes based on selected categories.
- **Mewsley Character**: A mascot that changes moods based on the app's state.
- **Responsive Design**: The app is designed to work on various screen sizes.

## Prerequisites

- Node.js and npm installed
- Google Cloud Platform account for Google Sheets API access
- Existing Make.com workflow that populates Google Sheets

## Project Setup

1. Clone the repository:

   git clone <repository-url>

2. Navigate to the project directory:

   cd mews-app

3. Install dependencies:

   npm install

## Google Sheets API Setup

1. Create a project in the Google Cloud Console.
2. Enable the Google Sheets API.
3. Create a Service Account and download the JSON key file.
4. Share your Google Sheet with the service account email.

## Configuration

Update the `client/src/config.js` file with your Google Sheet ID:

```javascript
spreadsheetId: 'YOUR_SPREADSHEET_ID_HERE',
```

## Running the Application

1. Start the server:

   cd server
   node server.js

2. In a separate terminal, start the client:

   cd client
   npm start

## Deployment

To deploy the application, build the React app and deploy the server:

1. Build the React app:

   cd client
   npm run build

2. Deploy the server to your preferred hosting platform.

## Future Enhancements

- Implement social sharing features.
- Add user authentication for personalized experiences.
- Create an admin interface for content moderation.
- Expand Mewsley's character with animations and interactions.

## License

This project is licensed under the MIT License.