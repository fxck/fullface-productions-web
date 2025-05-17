# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Full Face Productions website built with Angular 18 using the Analog.js meta-framework. It's a fullstack application featuring a video production portfolio with server-side rendering and API integration.

## Commands

### Installation
```bash
pnpm install
```

### Development
```bash
# Start development server (http://localhost:5173/)
pnpm run dev
# or
pnpm start
```

### Building
```bash
# Build the application
pnpm run build

# Client output: dist/analog/public
# Server output: dist/analog/server
```

### Production
```bash
# Run the production server
pnpm run prod
```

## Architecture

### Frontend
- **Framework**: Angular 18 with Analog.js
- **Component Structure**: Standalone components with signals for state management
- **Routing**: File-based routing with Analog.js
- **Rendering**: Server-side rendering with client hydration

### Backend
- **Server**: Node.js using Analog.js server capabilities
- **API Integration**: Instagram API with caching
- **Storage**: AWS S3 for caching media

### Deployment
Zerops is used for deployment with two main services:
1. **app**: Static deployment for the Angular frontend
2. **scraper**: Node.js server for API functionality

## Project Structure

- `/src/app`: Angular application code
  - `/components`: Reusable UI components
  - `/pages`: Page components (routes)
- `/src/models`: TypeScript interfaces
- `/src/server`: Server-side code including API routes
- `/public`: Static assets (images, videos)

## Key Patterns

1. **Standalone Components**: No NgModules, using Angular's standalone component pattern
2. **Reactive State**: Signal-based state management
3. **Server Routes**: API endpoints in `src/server/routes`
4. **SSR**: Server-side rendering with client-side hydration
5. **Environment Variables**: Used for API keys and service configuration

## CORS Configuration

The Instagram API endpoint (`/api/instagram`) has CORS headers configured to allow requests from:
- Origin: https://fullfaceproductions.com

If additional domains need access, update the CORS headers in `src/server/routes/instagram.ts`.