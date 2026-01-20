# GitHub Copilot Instructions for Asha Project

## Overview
This project is a Next.js application structured to facilitate a modular and scalable architecture. The primary components are organized into directories that represent different features and functionalities of the application.

## Project Structure
- **app/**: Contains the main application pages, including the homepage, guidance, community, and shop sections.
- **components/**: Reusable UI components that can be utilized across different pages.
- **lib/**: Contains utility functions and configurations, including the Sanity client and queries.
- **sanity/**: Holds the schema definitions for the Sanity CMS, which manages the content for the application.

## Key Components
- **Homepage**: Located in `app/page.tsx`, serves as the entry point of the application.
- **Guidance Section**: Found in `app/guidance/page.tsx`, lists articles and provides dynamic routing for individual articles in `app/guidance/[slug]/page.tsx`.
- **Sanity Client**: Configured in `lib/sanity.client.ts`, this file initializes the connection to the Sanity CMS.

## Developer Workflows
- **Building the Project**: Use `npm run build` to compile the application for production.
- **Running the Development Server**: Start the development server with `npm run dev` to see changes in real-time.
- **Testing**: Ensure to run tests using `npm test` to validate functionality before pushing changes.

## Integration Points
- **Sanity CMS**: The application integrates with Sanity for content management. Ensure to familiarize yourself with the schemas defined in `sanity/schemas/`.
- **Component Communication**: Components communicate through props and context, ensuring a clear data flow throughout the application.

## Project-Specific Conventions
- **File Naming**: Use camelCase for component files and kebab-case for directories.
- **Styling**: CSS modules are used for styling components, ensuring scoped styles.

## Conclusion
This document serves as a guide for AI coding agents to understand the structure and workflows of the Asha project. For further details, refer to the specific files mentioned above.