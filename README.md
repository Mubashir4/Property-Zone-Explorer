# Property Zone Explorer

A modern property search and mapping application with school catchments, risk overlays, and amenity information.

## Requirements

- Node.js 16 or higher
- npm or yarn

## Installation

First, install the dependencies:

```bash
npm install
```

## Development

### Option 1: Using Scripts (Recommended)

Run the development server with automatic setup:

```bash
# On macOS/Linux
./dev.sh

# On Windows
dev.bat
```

The app will open at `http://localhost:3000`

### Option 2: Manual Commands

If the scripts don't work, run these commands manually:

```bash
# Install dependencies (if not done already)
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## Production Build

### Option 1: Using Scripts (Recommended)

Build the production version:

```bash
# On macOS/Linux
./deploy.sh

# On Windows
deploy.bat
```

### Option 2: Manual Commands

Build manually:

```bash
# Install dependencies (if not done already)
npm install

# Build for production
npm run build
```

The built files will be in the `dist` folder.

## Testing the Production Build

After building, test it locally:

```bash
# Option 1: Using Vite preview (recommended)
npm run preview

# Option 2: Using serve script
./serve.sh

# Option 3: Manual serve with SPA support
npx serve -s dist
```

The preview will be available at `http://localhost:4173`

## Deployment to Production

### Deploy to Netlify/Vercel

1. Build the project: `npm run build`
2. Upload the `dist` folder to your hosting service
3. Both services automatically handle SPA routing

### Deploy to Apache/Nginx

1. Build the project: `npm run build`
2. Copy the `dist` folder contents to your web server
3. Configure fallback to `index.html` for SPA routing

### Deploy to Other Servers

Use a SPA-aware server like `serve`:

```bash
npm install -g serve
serve -s dist -l 80
```

## What the Scripts Do

- `dev.sh` / `dev.bat` - Creates environment config, installs dependencies, and starts development server
- `deploy.sh` / `deploy.bat` - Installs dependencies, builds for production, and shows deployment instructions
- `serve.sh` - Serves the production build locally with SPA support

## Environment Configuration

The scripts automatically create a `.env.local` file with default settings. You can customize it:

```env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_USE_MOCK_DATA=true
VITE_MAP_DEFAULT_LAT=-33.8688
VITE_MAP_DEFAULT_LNG=151.2093
VITE_MAP_DEFAULT_ZOOM=12
```

## Available Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run lint` - Check code quality
