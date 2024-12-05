# NTI Website

A modern web application built with Next.js 14, featuring server-side rendering, CMS integration, and course management.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** TailwindCSS
- **CMS:** Sanity
- **Course Platform:** Thinkific API
- **Testing:** Vitest + React Testing Library
- **Language:** TypeScript

## Key Features

- **Server-First Approach**
  - Leverages Next.js 14 Server Components for optimal performance
  - Uses Server Actions for form handling and data mutations
  - Progressive enhancement with client components when needed

- **Content Management**
  - Sanity CMS integration for flexible content management
  - Real-time content updates
  - Structured content modeling

- **Course Integration**
  - Seamless integration with Thinkific's API
  - Fetch and display NTI course data
  - Course enrollment and progress tracking

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/papersandpens/nti-website.git
   cd nti-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Fill in the required environment variables:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=
   NEXT_PUBLIC_SANITY_DATASET=
   SANITY_API_TOKEN=
   THINKIFIC_API_KEY=
   THINKIFIC_SUBDOMAIN=
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`

5. **Run tests**
   ```bash
   npm test
   ```

## Development Guidelines

- Prefer Server Components by default
- Use Client Components only when necessary (interactivity, browser APIs)
- Implement Server Actions for data mutations
- Write tests for critical functionality
- Follow the established folder structure:
  ```
  app/
  ├── (routes)/           # App router pages
  │   ├── route-name/     # Specific route
  │   │   ├── _components/  # Route-specific components
  │   │   ├── __tests__/   # Route-specific tests
  │   │   ├── utils/       # Route-specific utilities
  │   │   ├── types/       # Route-specific types
  │   │   ├── page.tsx     # Page component
  │   │   └── layout.tsx   # Optional layout
  │   └── ...
  ├── components/         # Shared components
  ├── lib/               # Shared utility functions
  ├── sanity/            # Sanity configuration
  └── types/             # Shared TypeScript definitions
  ```

Each route follows a modular structure:
- `_components/`: Components scoped to the specific route
- `__tests__/`: Test files for the route's components and functionality
- `utils/`: Helper functions and utilities specific to the route
- `types/`: TypeScript interfaces and types used within the route

## Testing

We use Vitest and React Testing Library for unit testing. Tests are located next to their corresponding components:
