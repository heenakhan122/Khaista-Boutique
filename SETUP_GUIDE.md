# Khaista Boutique - Setup Guide

## Project Overview
This is a full-stack e-commerce web application for Khaista Boutique, specializing in authentic Afghan handcrafted items. The platform showcases products from Afghan women artisans, preserving cultural heritage while providing a modern shopping experience.

## Tech Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **UI**: Tailwind CSS + shadcn/ui + Radix UI
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod validation

## Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL database (local or cloud)

## Installation & Setup

### 1. Clone and Install Dependencies
```bash
git clone <your-repo-url>
cd khaista-boutique
npm install
```

### 2. Environment Variables
Create a `.env` file in the root directory:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/khaista_boutique"

# Session Secret (generate a random string)
SESSION_SECRET="your-super-secret-session-key-here"

# Optional: Stripe Integration
STRIPE_SECRET_KEY="sk_test_..."
VITE_STRIPE_PUBLIC_KEY="pk_test_..."
```

### 3. Database Setup
```bash
# Generate and run migrations
npm run db:generate
npm run db:migrate

# Optional: Seed with sample data
npm run db:seed
```

### 4. Development
```bash
# Start development server (both frontend and backend)
npm run dev

# Frontend only (port 5173)
npm run dev:client

# Backend only (port 5000)
npm run dev:server
```

### 5. Production Build
```bash
# Build for production
npm run build

# Start production server
npm start
```

## Project Structure
```
khaista-boutique/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utilities and stores
│   │   └── App.tsx        # Main app component
├── server/                # Express backend
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Database interface
│   └── index.ts           # Server entry point
├── shared/                # Shared types and schemas
│   └── schema.ts          # Database schema and types
├── attached_assets/       # Product images and media
└── package.json           # Dependencies and scripts
```

## Key Features
- Product catalog with categories (jewelry, dresses, bags)
- Shopping cart with persistent state
- Wishlist functionality
- Responsive design with scroll-based header
- Newsletter subscription
- Product search and filtering
- Individual product detail pages

## API Endpoints
- `GET /api/products` - Get all products
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:id` - Get product by ID
- `POST /api/newsletter` - Subscribe to newsletter

## Deployment Options

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy

### Railway/Render
1. Connect GitHub repo
2. Set build command: `npm run build`
3. Set start command: `npm start`
4. Add environment variables

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License
MIT License - see LICENSE file for details

## Support
For issues or questions, please create a GitHub issue or contact support@khaistaboutique.com