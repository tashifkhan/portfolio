# Portfolio Management System

This isn't just a mere portfolio website - it's a **portfolio management system** with full CRUD operations, authentication, and database integration. Built with modern web technologies including TypeScript, React, Next.js, Shadcn UI, Radix UI, and Tailwind CSS, this system allows you to dynamically manage all portfolio content without making manual code changes.

**Live Demo**: [<khan/ tashif> | Portfolio](https://portfolio.tashif.codes/)

## What Makes This Special?

- **Full Content Management**: Add, edit, delete, and reorder projects, skills, education, and responsibilities through a secure admin interface
- **No Manual Coding Required**: All content updates happen through the web interface - no need to touch code files
- **Real-time Updates**: Changes reflect immediately on the live site
- **Dynamic Stats Integration**: Real-time statistics from coding platforms (GitHub, LeetCode, CodeForces, GeeksforGeeks) using custom-built APIs
- **Secure Authentication**: JWT-based authentication with environment-based credentials
- **MongoDB Integration**: Robust database operations with proper data validation
- **Type-Safe Operations**: Full TypeScript support throughout the entire system

## Table of Contents

- [What Makes This Special?](#what-makes-this-special)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Authentication & Database System](#authentication--database-system)
- [Content Management](#content-management)
- [API Endpoints](#api-endpoints)
- [Dynamic Stats Integration](#dynamic-stats-integration)
- [Getting Started](#getting-started)
- [Environment Setup](#environment-setup)
- [Security Features](#security-features)
- [Contributing](#contributing)
- [License](#license)

## Features

### Portfolio Display

- Responsive design with Tailwind CSS & Framer Motion based Animations
- Project showcase with detailed descriptions
- **Dynamic Coding Stats**: Real-time statistics from GitHub, LeetCode, CodeForces, and GeeksforGeeks
- Dynamic loading for non-critical components
- Form validation using react-hook-form and Zod

### Content Management System

- **Complete CRUD Operations**: Create, Read, Update, Delete all portfolio content
- **Real-time Content Updates**: No need to redeploy or modify code files
- **Drag & Drop Reordering**: Intuitive project reordering with visual feedback
- **Secure Admin Interface**: Protected admin panel with JWT authentication
- **Type-safe Forms**: All forms are validated and type-safe

### Database Integration

- **MongoDB Backend**: Robust database operations with automatic timestamps
- **Bulk Operations**: Efficient reordering and batch updates
- **Data Validation**: Server-side validation for all inputs

## Technologies Used

### Frontend

- **TypeScript** - Type-safe development
- **React** - Component-based UI
- **Next.js** - Full-stack React framework
- **Shadcn UI** - Modern component library
- **Radix UI** - Accessible UI primitives
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **react-hook-form** - Form handling
- **Zod** - Schema validation

### Backend & Database

- **MongoDB** - NoSQL database for content storage
- **JWT (JOSE)** - Secure authentication tokens
- **Bun Runtime** - Fast JavaScript runtime
- **API Routes** - Next.js API for backend operations

### Authentication & Security

- **Environment-based Credentials** - Secure credential management
- **HTTP-only Cookies** - Secure token storage
- **Middleware Protection** - Route-level security
- **Type-safe Database Operations** - Validated CRUD operations

## Authentication & Database System

This portfolio management system includes a comprehensive authentication and database management system that allows you to manage all content without touching code files.

### Authentication System

**Login Credentials**: The system uses secure environment-based credentials:

- Email: `NEXT_PUBLIC_ADMIN_EMAIL` (from .env file)
- Password: `NEXT_PUBLIC_ADMIN_PASSWORD` (from .env file)

**How to Access Admin Panel**:

1. Click the "Admin" button in the header
2. Enter your credentials from the .env file
3. Upon successful login, access the full content management system

**Security Features**:

- JWT tokens with JOSE library for edge compatibility
- HTTP-only cookies for secure token storage
- 30-day token expiration
- Middleware protection for admin routes
- Automatic logout on token expiration

### Database Operations

The system provides full CRUD operations for all content types through a type-safe `DatabaseService` class:

- **Projects**: Add, edit, delete, and reorder projects
- **Notable Projects**: Manage featured projects
- **Education**: Update educational background
- **Skills**: Manage technical and soft skills
- **Responsibilities**: Edit leadership roles and responsibilities
- **Social Links**: Update social media profiles

## Content Management

### Available Management Actions

1. **Project Management**

   - Add new projects with technologies, links, and descriptions
   - Edit existing project details
   - Delete projects
   - Drag & drop reordering with visual feedback

2. **Notable Projects**

   - Manage featured/highlighted projects
   - Full CRUD operations
   - Custom positioning

3. **Education & Experience**

   - Update educational background
   - Manage responsibilities and leadership roles

4. **Skills Management**

   - Add technical skills
   - Organize by categories
   - Real-time updates

5. **Social Links**
   - Update GitHub, LinkedIn, LeetCode profiles
   - Manage resume links
   - Social media integration

### Admin Interface Features

- **Glassmorphism UI**: Modern, beautiful admin interface
- **Real-time Feedback**: Success/error messages for all operations
- **Type-safe Forms**: All inputs are validated and type-checked
- **Responsive Design**: Works on all devices
- **Intuitive UX**: Easy-to-use drag & drop and form interfaces

## Dynamic Stats Integration

This portfolio features **real-time statistics fetching** from various coding platforms using custom-built APIs that combine web scraping and official platform APIs. These stats are dynamically displayed on the portfolio without manual updates.

### Custom Stats APIs

The portfolio integrates with several custom-built stats APIs that provide real-time data:

#### GitHub Stats API

- **Repository**: [GitHub-Stats-API](https://github.com/tashifkhan/GitHub-Stats-API)
- **Live API**: [github-stats.tashif.codes](https://github-stats.tashif.codes/)
- **Features**: Repository stats, contribution graphs, language breakdown, commit statistics
- **Technology**: Web scraping + GitHub API integration

#### LeetCode Stats API

- **Repository**: [LeetCode-Stats-API](https://github.com/tashifkhan/LeetCode-Stats-API)
- **Live API**: [leetcode-stats.tashif.codes](https://leetcode-stats.tashif.codes/)
- **Features**: Problem solving statistics, difficulty breakdown, recent submissions, contest ratings
- **Technology**: Web scraping + LeetCode GraphQL API

#### CodeForces Stats API

- **Repository**: [CodeForces-API](https://github.com/tashifkhan/CodeForces-API)
- **Live API**: [codeforces-stats.tashif.codes](https://codeforces-stats.tashif.codes/)
- **Features**: Contest ratings, problem solving stats, submission history
- **Technology**: CodeForces official API + custom data processing

#### GeeksforGeeks Stats API

- **Repository**: [GFG-Stats-API](https://github.com/tashifkhan/GFG-Stats-API)
- **Live API**: [gfg-stats.tashif.codes](https://gfg-stats.tashif.codes/)
- **Features**: Problem solving statistics, coding score, profile data
- **Technology**: Web scraping + data aggregation

## API Endpoints

### Projects (`/api/projects`)

- `GET` - Fetch all projects (public)
- `POST` - Create new project (authenticated)
- `PUT` - Update project (authenticated)
- `DELETE` - Delete project (authenticated)

### Notable Projects (`/api/notable-projects`)

- `GET` - Fetch notable projects (public)
- `POST` - Create notable project (authenticated)
- `PUT` - Update notable project (authenticated)
- `DELETE` - Delete notable project (authenticated)

### Education (`/api/edu`)

- `GET` - Fetch education data (public)
- `POST` - Create education entry (authenticated)
- `PUT` - Update education entry (authenticated)
- `DELETE` - Delete education entry (authenticated)

### Skills (`/api/skills`)

- `GET` - Fetch skills with optional type filtering (public)
- `POST` - Create skill (authenticated)
- `PUT` - Update skill (authenticated)
- `DELETE` - Delete skill (authenticated)

### Responsibilities (`/api/responsibilities`)

- `GET` - Fetch responsibilities (public)
- `POST` - Create responsibility (authenticated)
- `PUT` - Update responsibility (authenticated)
- `DELETE` - Delete responsibility (authenticated)

### Socials (`/api/socials`)

- `GET` - Fetch social links (public)
- `PUT` - Update social links (authenticated)

### Stats (`/api/stats`)

- `GET` - Fetch coding platform statistics (public)

### Stats Features

- **Real-time Data**: Statistics update automatically without manual intervention
- **Multiple Platforms**: Comprehensive coverage of major coding platforms
- **Custom APIs**: Self-hosted APIs ensure reliability and customization
- **Performance Optimized**: Efficient caching and data fetching strategies
- **Visual Integration**: Beautiful charts and graphs using the fetched data
- **Error Handling**: Graceful fallbacks when APIs are unavailable

## Getting Started

**Live Site**: https://portfolio.tashif.codes/

### Prerequisites

- **Bun** (recommended) or Node.js (>=14.x)
- **MongoDB** database
- **Environment variables** (see below)

### Installation

1. **Clone the repository**:

   ```sh
   git clone https://github.com/tashifkhan/portfolio
   cd portfolio
   ```

2. **Install dependencies**:

   ```sh
   bun install
   # or
   npm install
   ```

3. **Set up environment variables** (see [Environment Setup](#environment-setup))

4. **Run the development server**:

   ```sh
   bun run dev
   # or
   npm run dev
   ```

5. **Open your browser**: Navigate to http://localhost:3000

### Development Commands

```bash
bun run dev      # Start development server
bun run build    # Build for production
bun run start    # Start production server
bun run lint     # Run ESLint
```

## Environment Setup

Create a `.env` file in the root directory with the following variables. You can copy from `.env.example` and update the values:

```bash
cp .env.example .env
```

### Required Environment Variables

```env
# Admin Credentials (for content management)
NEXT_PUBLIC_ADMIN_EMAIL=your-email@domain.com
NEXT_PUBLIC_ADMIN_PASSWORD=your-secure-password

# Database
MONGODB_URI=your-mongodb-connection-string

# Authentication
JWT_SECRET=your-jwt-secret-key

# GitHub API (Optional - for enhanced GitHub stats)
NEXT_PUBLIC_GITHUB_TOKEN=your-github-personal-access-token

# Environment
NODE_ENV=development

# Hero Section Customization (Optional)
PUBLIC_NAME=Your Name
DESCRIPTION_WORDS=Web Developer,UI/UX Designer,App Developer,Freelancer,Student
```

### Environment Variables Explained

#### Required Variables

- **`PUBLIC_NAME`**: Your name to display in the hero section (in the hero section)
- **`DESCRIPTION_WORDS`**: Comma-separated list of words/phrases for the typewriter effect (in the hero section)
- **`NEXT_PUBLIC_ADMIN_EMAIL`**: Email address for admin login to the content management system
- **`NEXT_PUBLIC_ADMIN_PASSWORD`**: Password for admin authentication (use a strong password)
- **`MONGODB_URI`**: MongoDB connection string for database operations
- **`JWT_SECRET`**: Secret key for JWT token generation and validation (use a strong, random string)
- **`NODE_ENV`**: Environment mode (`development`, `production`, or `test`)

#### Optional Variables

- **`NEXT_PUBLIC_GITHUB_TOKEN`**: GitHub Personal Access Token for enhanced API rate limits when fetching GitHub stats
  - **How to get**: Go to GitHub Settings → Developer settings → Personal access tokens → Generate new token
  - **Permissions needed**: `public_repo` (for public repository access)
  - **Note**: Without this token, GitHub stats will still work but with lower rate limits

### Setting Up MongoDB

1. **Create a MongoDB Atlas account** (free tier available)
2. **Create a new cluster**
3. **Get your connection string**:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with your preferred database name

### Security Notes

- **Never commit `.env.local` to version control**
- **Use strong passwords and secrets**
- **Regularly rotate your JWT secret in production**
- **Consider using environment-specific values for different deployments**

### Database Collections

The system automatically creates these MongoDB collections:

- `projects` - Main project data
- `notableProjects` - Featured projects
- `education` - Educational background
- `responsibilities` - Leadership roles
- `skills` - Technical and soft skills
- `socials` - Social media links

## How to Use the System

### For Visitors (Public Access)

1. Visit the portfolio at https://portfolio.tashif.codes/
2. Browse projects, skills, education, and contact information
3. All content is dynamically loaded from the database

### For Admin (Content Management)

1. **Login**: Click "Admin" in the header and use your .env credentials
2. **Access Management**: Click "Update" to access the content management system
3. **Manage Content**: Use the intuitive interface to:
   - Add/edit/delete projects
   - Reorder items with drag & drop
   - Update skills and education
   - Manage social links
4. **See Changes**: All updates reflect immediately on the live site
5. **Logout**: Click "Logout" when finished

### Key Benefits

- **No Code Changes**: Update portfolio content without touching code
- **Real-time Updates**: Changes appear instantly
- **Professional Interface**: Beautiful, intuitive admin panel
- **Secure**: Robust authentication and authorization
- **Type-safe**: Full TypeScript support prevents errors

## Licence

[GPL 3](./LICENSE)
