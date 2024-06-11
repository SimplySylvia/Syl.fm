# Sylfm

## Description

A radio station built with React, Vite, Express, and sockets.

## Features

### Notes about ENVs

- Express .env reference is the typical `process.env.VALUE`
- Client-side (build time by Vite) .env reference is `import.meta.env.VALUE`

## Installation

1. To get started, clone the repository and install the dependencies:

   ```bash
   git clone https://github.com/bfeist/vite-express-ts.git
   cd vite-express-ts
   npm install
   ```

2. Then create a `.env` file by copying `.env.sample` to `.env`
3. Run `/scripts/make-dev-ssl-cert.sh` (used for docker deploys only)

## Usage

### Development

To start both the frontend and backend in development mode, run:

```bash
npm run dev
```

This will start the Vite development server for the frontend and the Express server for the backend concurrently.

Available at `http://localhost:5100`

### Build

To build the application for production:

```bash
npm run build
```

This script builds both the frontend and backend parts of the application. The result is put in `.local/vite/dist`and `.local/express/dist` respectively.

### Start Production Server

After building, start the production server with:

```bash
npm run start
```

This runs a simple `node ./.local/express/dist/api.js` command to start the express server that serves the `/api/v1` endpoints.

### Deploy via Docker

- `npm run docker:preview:rebuild`
  - Builds two docker images:
    - `nginx`
      - vite is used to build the front-end (React) to static assets in `/.local/vite/dist`
      - these are copied into the nginx image at the default nginx path
      - `/api/v1/` routes are proxied to the `express` server
    - `express`
      - esbuild is used to build to a static file `/.local/express/dist/api.js`
      - this file is copied to a node container and run with `node /api.js`
- `npm run docker:preview` to start the containers
- Go to `https://localhost` to hit the nginx server

## Structure

- `src/`: Contains the source code for the React frontend.
- `src/server/`: Contains the source code for the Express backend.
- `.local/vite/dist`: Destination for the built frontend files.
- `.local/express/dist`: Destination for the built backend server files.
