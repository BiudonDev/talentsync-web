# TalentSync Web

Marketing website for TalentSync - a recruitment company connecting top tech talent with innovative companies.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Static Export)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: React Icons (Heroicons)
- **Deployment**: Docker (nginx) on Railway

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npx serve out
```

## Docker

```bash
# Build and run with Docker Compose
docker-compose up --build

# Or build manually
docker build -t talentsync-web .
docker run -p 3000:3000 talentsync-web
```

## Project Structure

```
src/
├── app/              # Next.js App Router
├── components/
│   ├── ui/           # Reusable UI components
│   ├── layout/       # Navbar, Footer
│   └── sections/     # Page sections
├── context/          # Theme context
├── data/             # Content data
└── lib/              # Utilities
```

## Deployment

Configured for Railway deployment via Docker. Push to `main` branch to trigger automatic deployment.
