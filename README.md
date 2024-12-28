# Portfolio

This project is a portfolio website built using modern web technologies including TypeScript, React, Next.js, Shadcn UI, Radix UI, and Tailwind CSS. It showcases various projects and provides detailed information about each one.

[<khan/ tashif> | Portfolio](https://portfolio.tashif.codes/)

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- Responsive design with Tailwind CSS
- Project showcase with detailed descriptions
- Dynamic loading for non-critical components
- Form validation using react-hook-form and Zod
- Error handling and edge case management
- Accessibility (a11y) support

## Technologies Used

- **TypeScript**
- **React**
- **Next.js**
- **Shadcn UI**
- **Radix UI**
- **Tailwind CSS**
- **Framer Motion** for animations
- **react-hook-form** for form handling
- **Zod** for schema validation

## Getting Started

hosted at: https://portfolio.tashif.codes/

### Prerequisites

- Node.js (>=14.x)
- npm or yarn

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/tashifkhan/portfolio
   cd portfolio
   ```
2. Installing dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```
3. Run:
   ```sh
   npm run dev
   # or
   yarn dev
   ```
4. Open http://localhost:3000 with your browser to see the result.

## Project Strcuture.

```
├── .github/
├── .next/
├── app/
│   ├── collection/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
├── components/
│   ├── BgCircles.tsx
│   ├── ContactForm.tsx
│   ├── ContactSection.tsx
│   ├── EducationTimeline.tsx
│   ├── Featured.tsx
│   ├── ProjectCard.tsx
│   ├── ProjectsGrid.tsx
│   ├── Projection.tsx
│   └── ResponsibilityCard.tsx
├── hooks/
├── lib/
├── public/
├── utils/
├── README.md
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── ...
```
