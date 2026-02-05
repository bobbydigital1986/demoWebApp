# 🦋 Insect Capture App

# Production build with source map upload
cd client
npm run build

# Build without uploading (for testing)
npm run build:no-upload

# Manual source map upload only
npm run upload-sourcemaps


#### Development Mode

1. Start the backend server (in one terminal):
```bash
npm start
```
The server will run on http://localhost:5000

2. Start the React development server (in another terminal):
```bash
npm run client
```
The React app will run on http://localhost:3000

#### Production Mode

1. Build the React app:
From 
```bash
npm run build
```

2. Set environment variable and start the server:
```bash
NODE_ENV=production npm start
```

The full application will be served from http://localhost:5000




A full-stack monolith web application for documenting and managing your insect collection. Built with React, React Router, Node.js, and Express.

## Features

- **Home Page**: Dashboard with collection statistics
- **My Collection**: View all captured and uncaptured insects
- **Capture Zone**: Add new insects to your collection
- **Insect Guide**: Learn about different insect species and capture techniques

### Error Testing Features

Each page includes two special buttons for testing error handling:
- **Generate Handled Exception**: Triggers a caught error that displays an error message
- **Crash Application**: Triggers an unhandled error that will crash the app

## Tech Stack

**Frontend:**
- React 19.2.4
- React Router DOM 7.13.0
- Bugsnag (Error & Performance Monitoring)
- Modern CSS with gradient backgrounds

**Backend:**
- Node.js
- Express.js
- CORS enabled
- In-memory data storage

**Monitoring:**
- Bugsnag Error Monitoring
- Bugsnag Performance Monitoring
- Automatic source map upload for full stacktraces

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Install root dependencies:
```bash
npm install
```

2. Install client dependencies:
```bash
cd client
npm install
cd ..
```

3. Configure Bugsnag (optional but recommended):
```bash
cd client
cp .env.example .env.local
# Edit .env.local and add your Bugsnag API key
```

See [client/BUGSNAG.md](client/BUGSNAG.md) for detailed Bugsnag setup instructions.

### Running the Application



## API Endpoints

- `GET /api/insects` - Get all insects
- `GET /api/insects/:id` - Get a specific insect
- `POST /api/insects` - Add a new insect
- `PUT /api/insects/:id` - Update an insect
- `DELETE /api/insects/:id` - Delete an insect

## Project Structure

```
demoWebApp/
├── server/
│   └── index.js          # Express server
├── client/
│   ├── public/           # Static files
│   └── src/
│       ├── pages/        # React pages
│       │   ├── Home.js
│       │   ├── Collection.js
│       │   ├── CaptureZone.js
│       │   └── InsectGuide.js
│       ├── App.js        # Main app component
│       └── App.css       # Styles
├── package.json          # Root package.json
└── README.md
```

## Testing Error Handling

All errors are automatically reported to Bugsnag (if configured). To test the error handling features:

1. **Handled Exceptions**: Click the "Generate Handled Exception" button on any page to see a caught error displayed in a yellow alert box that auto-dismisses after 5 seconds. These errors are logged to Bugsnag with full context.

2. **Application Crashes**: Click the "Crash Application" button to trigger an unhandled error. The Bugsnag Error Boundary will catch it and prevent a white screen. Check your Bugsnag dashboard to see the error with full stacktrace.

## Bugsnag Integration

This app includes full Bugsnag integration for error and performance monitoring:

- **Error Monitoring**: Automatic capture of all errors with React Error Boundary
- **Performance Monitoring**: Track page loads, route changes, and network requests
- **Source Maps**: Full stacktraces in production (uploaded during build)

For detailed setup instructions, see [client/BUGSNAG.md](client/BUGSNAG.md).

### Quick Start with Bugsnag

1. Sign up at https://app.bugsnag.com
2. Create a new project and get your API key
3. Copy `client/.env.example` to `client/.env.local`
4. Add your API key to `.env.local`
5. Build with source maps: `cd client && npm run build`

## License

MIT

## Author

Built for insect enthusiasts and nature lovers! 🐛🦗🐝
