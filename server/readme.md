## Running the Application

### Development Mode

Run both in separate terminals from the **project root**:

1. Start the backend server:
```bash
npm start
```
The server runs on http://localhost:5000

2. In another terminal, start the React dev server:
```bash
npm run client
```
The React app runs on http://localhost:3000

### Production Mode

From the **project root**:

1. Build the React app:
```bash
cd client
npm run build
cd ..
```

2. Start the server in production:
```bash
NODE_ENV=production npm start
```

Or combine both steps:
```bash
npm run build && NODE_ENV=production npm start
```

The full application will be served from http://localhost:5000

**Important**: Always build the React app before running in production mode. The server serves the optimized static files from `client/build/` when `NODE_ENV=production`.