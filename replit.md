# Khaista Afghan Boutique E-commerce Platform

## Overview

This is a full-stack e-commerce web application for Khaista Boutique, specializing in authentic Afghan handcrafted items including jewelry, traditional dresses, and bags. The platform showcases products from Afghan women artisans, preserving cultural heritage while providing a modern shopping experience.

The application features a React-based frontend with a Node.js/Express backend, using PostgreSQL for data persistence. It includes product browsing, detailed product views, shopping cart functionality, and newsletter subscription capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.
Social media: Only Instagram (https://www.instagram.com/khaista.boutique/) and Facebook (https://www.facebook.com/profile.php?id=61551995945364&mibextid=LQQJ4d) - no other social media platforms.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development patterns
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: Zustand for cart state with persistence to localStorage
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent design
- **Styling**: Tailwind CSS with custom color palette reflecting Afghan cultural themes (turquoise, emerald, amber, copper)
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for full-stack type safety
- **API Design**: RESTful endpoints for products and newsletter subscriptions
- **Data Validation**: Zod schemas for request/response validation
- **Storage Layer**: Abstracted storage interface with in-memory implementation (MemStorage) for development

### Data Layer
- **Database**: PostgreSQL configured via Drizzle ORM
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Type Safety**: Full end-to-end type safety from database to frontend using shared schema definitions

### Key Features
- **Product Catalog**: Browsing by categories (jewelry, dresses, bags), featured products, and individual product details
- **Shopping Cart**: Persistent cart state with add/remove/update quantity functionality
- **Wishlist System**: Heart icon functionality to save favorite items with persistent storage
- **Scroll-based Header**: Dynamic header that transforms when scrolling (full header → minimal "Khaista Boutique" with hamburger menu)
- **Newsletter Subscription**: Email collection for marketing communications
- **Responsive Design**: Mobile-first approach with Tailwind responsive utilities
- **Cultural Theming**: Custom color palette and typography reflecting Afghan aesthetic

### Development Workflow
- **Hot Reload**: Vite development server with HMR for rapid iteration
- **Type Checking**: TypeScript compilation for catching errors early
- **Path Aliases**: Organized imports using @ prefixes for cleaner code organization
- **Asset Management**: Static assets served from attached_assets directory

## External Dependencies

### Core Technologies
- **React Ecosystem**: React 18, React DOM, Wouter for routing, TanStack Query for server state management
- **UI Framework**: Radix UI component primitives, shadcn/ui design system, Tailwind CSS for styling
- **Backend**: Express.js web framework, TypeScript for server-side development
- **Database**: Drizzle ORM, PostgreSQL via Neon Database serverless platform

### Development Tools
- **Build System**: Vite bundler with React plugin and TypeScript support
- **Type Safety**: Zod for runtime validation, TypeScript for compile-time checking
- **State Management**: Zustand for client-side state with persistence middleware
- **Form Handling**: React Hook Form with Radix UI resolvers for form validation

### Third-Party Services
- **Database Hosting**: Neon Database for serverless PostgreSQL
- **Font Integration**: Google Fonts (Playfair Display, Inter) for typography
- **Asset Delivery**: Local asset serving with potential for CDN integration
- **Session Management**: Connect-pg-simple for PostgreSQL-backed sessions

### UI Components & Utilities
- **Icons**: Lucide React for consistent iconography
- **Date Handling**: Date-fns for date manipulation and formatting
- **Styling Utilities**: Class-variance-authority for component variants, clsx for conditional classes
- **Carousel**: Embla Carousel for product image galleries
- **Command Interface**: cmdk for search and command palette functionality