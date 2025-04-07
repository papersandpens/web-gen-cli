# Placeholder Project Name

A modern web application built with Next.js 15, featuring server-side rendering, CMS integration, and course management.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** TailwindCSS
- **CMS:** Sanity Studio (Integrated)
- **Testing:** Vitest + React Testing Library
- **Language:** TypeScript

## Key Features

- **Server-First Approach**

  - Leverages Next.js 15 Server Components for optimal performance
  - Uses Server Actions for form handling and data mutations
  - Progressive enhancement with client components when needed

- **Content Management**

  - Sanity CMS integration for flexible content management
  - Real-time content updates
  - Structured content modeling

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/papersandpens/project-name.git
   cd project-name
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
   # Sanity Configuration
   NEXT_PUBLIC_SANITY_PROJECT_ID=
   NEXT_PUBLIC_SANITY_DATASET=
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
  ├── sanity/            # Sanity configuration and schemas
  │   ├── schemas/       # Content type definitions
  │   ├── lib/           # Sanity utility functions
  │   └── studio/        # Sanity Studio configuration
  └── types/             # Shared TypeScript definitions
  ```

Each route follows a modular structure:

- `_components/`: Components scoped to the specific route
- `__tests__/`: Test files for the route's components and functionality
- `utils/`: Helper functions and utilities specific to the route
- `types/`: TypeScript interfaces and types used within the route

## Testing

We use Vitest and React Testing Library for unit testing. Tests are located next to their corresponding components:

```bash
# Component structure example
app/
├── (routes)/
│   └── about/
│       ├── _components/
│       │   └── TeamSection.tsx
│       └── __tests__/
│           └── TeamSection.test.tsx
```

### Testing Guidelines

- Write tests for critical user interactions and business logic
- Follow the Arrange-Act-Assert pattern
- Use meaningful test descriptions
- Mock external dependencies and API calls
- Test accessibility requirements
- Aim for high coverage of core functionality

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run tests for a specific file
npm test -- TeamSection.test.tsx
```

### Example Test Structure

```typescript
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TeamSection from "../_components/TeamSection";

describe("TeamSection", () => {
  it("renders team members correctly", () => {
    render(<TeamSection />);
    expect(screen.getByRole("heading")).toHaveTextContent("Our Team");
  });

  it("handles empty team data gracefully", () => {
    render(<TeamSection members={[]} />);
    expect(screen.getByText("No team members found")).toBeInTheDocument();
  });
});
```

## Sanity Studio

The project includes an integrated Sanity Studio for content management:

1. **Access Studio**

   - Development: Visit `http://localhost:3000/studio`

2. **Content Types**

   - Schemas are defined in `app/sanity/schemas/`
   - Customize the Studio configuration in `app/sanity/studio/`

3. **Development**
   - Studio changes hot-reload during development
   - Schema changes require a server restart
