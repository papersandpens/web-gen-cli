# Next.js Template CLI

A CLI tool to bootstrap Next.js projects with our company's standard setup, including Next.js 14, TailwindCSS, Sanity CMS, and more.

## Features

- 🚀 Next.js 14 with App Router
- 🎨 TailwindCSS + Shadcn UI
- 📝 Sanity CMS Integration
- 🌐 Internationalization with next-intl
- ✅ TypeScript
- 🧪 Vitest + React Testing Library
- 📁 Standardized project structure

## Quick Start

You can create a new project using this template with npx:

```bash
npx @papersandpens/web-gen-cli
```

Follow the prompts to:

1. Enter your project name
2. Wait for installation to complete
3. Follow the setup instructions

## What's Included

The template sets up:

- Next.js 14 with App Router configuration
- TailwindCSS and Shadcn UI components
- Sanity CMS integration
- TypeScript configuration with path aliases
- Testing setup with Vitest
- Internationalization (i18n) setup
- Standard folder structure
- Git initialization
- Basic README and documentation

## Project Structure

```
your-project/
├── app/
│   ├── (routes)/           # App router pages
│   ├── components/         # Shared components
│   ├── lib/               # Shared utilities
│   ├── sanity/            # Sanity configuration
│   └── types/             # Shared TypeScript definitions
├── public/
└── ... (configuration files)
```

## Post-Setup Steps

After creating your project:

1. Navigate to your project:

```bash
cd your-project-name
```

2. Create your environment variables:

```bash
cp .env.example .env.local
```

3. Update the environment variables in `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
```

4. Start the development server:

```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Run linting

## Contributing

To update this template:

1. Make changes in the template directory
2. Test locally using `npm link`
3. Create a PR with your changes
4. After approval and merge, a new version will be published

## Troubleshooting

### Common Issues

1. **Git initialization fails**

   - Ensure git is installed on your machine
   - Configure git user name and email

2. **Dependency installation fails**

   - Check your npm version (`npm -v`)
   - Try clearing npm cache (`npm cache clean --force`)

3. **Path aliases not working**
   - Restart your IDE
   - Run `npm run dev` to rebuild TypeScript paths

### Getting Help

If you encounter any issues:

1. Check the error logs
2. Contact the development team
3. Create an issue in the repository

## License

Internal use only - PNP
