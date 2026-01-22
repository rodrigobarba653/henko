# Henko

A Next.js project with GSAP animations and Tailwind CSS, configured for static export to Bluehost.

## Features

- ⚡ Next.js 14 with App Router
- 🎨 Tailwind CSS for styling
- ✨ GSAP for animations
- 📦 Static export (no Node.js required on server)
- 🔧 TypeScript support

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Build for Production (Static Export)

Build the static site:

```bash
npm run build
```

This will create an `out` directory with all the static files ready to upload to Bluehost.

### Deploy to Bluehost

1. Run `npm run build` to generate the static files
2. Upload the contents of the `out` directory to your Bluehost hosting
3. Make sure your domain points to the uploaded files

## Project Structure

```
henko/
├── app/
│   ├── globals.css      # Global styles with Tailwind
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page with GSAP example
├── public/              # Static assets
├── next.config.js       # Next.js config (static export)
├── tailwind.config.ts   # Tailwind configuration
└── package.json         # Dependencies
```

## Technologies

- **Next.js**: React framework with static export capability
- **GSAP**: Professional animation library
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: Type-safe JavaScript

## Notes

- This project is configured for static export (`output: 'export'` in `next.config.js`)
- Images are unoptimized to work with static hosting
- No server-side features are used (no API routes, server components that require Node.js)
