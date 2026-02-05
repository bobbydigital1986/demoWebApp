# Bugsnag Integration Guide

This app is configured with Bugsnag for error and performance monitoring.

## Setup

1. **Get your Bugsnag API Key**
   - Sign up at https://app.bugsnag.com
   - Create a new project
   - Copy your API key from project settings

2. **Configure Environment Variables**
   ```bash
   # Copy the example env file
   cp .env.example .env.local
   
   # Edit .env.local and add your API key
   REACT_APP_BUGSNAG_API_KEY=your_actual_api_key
   REACT_APP_VERSION=1.0.0
   ```

3. **Add to .gitignore** (already configured)
   ```
   .env.local
   .env
   ```

## Features Enabled

### Error Monitoring
- Automatic error capture and reporting
- React Error Boundary integration
- Breadcrumb tracking (navigation, requests, user actions)
- Custom metadata on all errors
- Full stacktraces with source maps

### Performance Monitoring
- Automatic full page load tracking
- Route change instrumentation
- Network request monitoring
- Custom performance spans (if needed)

## Building for Production

### Development Build (no source map upload)
```bash
npm run build:no-upload
```

### Production Build (with source map upload)
```bash
# Navigate to client directory (if not already there)
cd client

# Set environment variables
export REACT_APP_BUGSNAG_API_KEY=your_api_key
export REACT_APP_VERSION=1.0.0

# Build and upload source maps automatically
npm run build
```

The build script will:
1. Create an optimized production build
2. Generate source maps
3. Upload source maps to Bugsnag using the CLI
4. Full stacktraces will appear in the Bugsnag dashboard

### Manual Source Map Upload

If you need to upload source maps separately:
```bash
# Directory-based upload (recommended)
npx bugsnag-cli upload js \
  --api-key=$REACT_APP_BUGSNAG_API_KEY \
  --version-name=$REACT_APP_VERSION \
  --base-url='*/static/js' \
  build/static/js

# Or single file upload
npx bugsnag-cli upload js \
  --api-key=$REACT_APP_BUGSNAG_API_KEY \
  --version-name=$REACT_APP_VERSION \
  --bundle=build/static/js/main.*.js \
  --source-map=build/static/js/main.*.js.map \
  --bundle-url='*/static/js/main.*.js'
```

## Testing Error Handling

Each page in the app has two test buttons:

1. **Generate Handled Exception** - Creates a caught error that will be reported to Bugsnag with full context
2. **Crash Application** - Creates an unhandled error that crashes the app and gets caught by the Error Boundary

## Bugsnag CLI Options

The build script uses these CLI options:
- `--api-key`: Your Bugsnag API key (from env)
- `--version-name`: Version identifier for this release
- `--base-url`: Base URL path where JS files are served (with wildcard support)
- Final argument: Path to directory containing source maps and minified files

## Additional Configuration

Edit `src/bugsnag.js` to customize:
- Release stages
- Error filtering
- Custom metadata
- Breadcrumb settings
- Performance monitoring options

## Viewing Errors in Bugsnag

1. Visit https://app.bugsnag.com
2. Select your project
3. View errors with full stacktraces (thanks to source maps)
4. Check the Performance tab for timing data

## Important Notes

- Source maps are uploaded after each production build
- Keep your API key secure (never commit .env.local)
- Source maps enable readable stacktraces in production
- Error Boundary catches React errors and prevents white screen
