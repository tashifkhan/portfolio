# Portfolio Authentication & Database System

This portfolio now includes a comprehensive authentication and database management system built with:

## Tech Stack
- **Authentication**: Environment-based credentials (.env file) 
- **JWT**: JOSE library for JWT handling on the edge (no bcrypt encryption as requested)
- **Runtime**: Bun instead of Node.js
- **Database**: MongoDB with comprehensive CRUD operations

## Authentication System

### Login Credentials
The system uses credentials stored in `.env`:
- Email: `NEXT_PUBLIC_ADMIN_EMAIL`
- Password: `NEXT_PUBLIC_ADMIN_PASSWORD`

### How to Login
1. Click the "Admin" button in the header
2. Enter your credentials from the .env file
3. Upon successful login, you'll get access to the update system

### JWT Implementation
- Uses JOSE library for edge-compatible JWT operations
- Tokens are stored in HTTP-only cookies
- 30-day expiration time
- Middleware protects `/update` routes

## Database Operations

### Available APIs

#### Projects (`/api/projects`)
- `GET` - Fetch all projects
- `POST` - Create new project (authenticated)
- `PUT` - Update project (authenticated) 
- `DELETE` - Delete project (authenticated)

#### Notable Projects (`/api/notable-projects`)
- `GET` - Fetch all notable projects
- `POST` - Create new notable project (authenticated)
- `PUT` - Update notable project (authenticated)
- `DELETE` - Delete notable project (authenticated)

#### Education (`/api/edu`)
- `GET` - Fetch education data
- `POST` - Create education entry (authenticated)
- `PUT` - Update education entry (authenticated)
- `DELETE` - Delete education entry (authenticated)

#### Skills (`/api/skills`)
- `GET` - Fetch skills (supports `?type=` filter)
- `POST` - Create skill (authenticated)
- `PUT` - Update skill (authenticated)
- `DELETE` - Delete skill (authenticated)

#### Responsibilities (`/api/responsibilities`)
- `GET` - Fetch responsibilities
- `POST` - Create responsibility (authenticated)
- `PUT` - Update responsibility (authenticated)
- `DELETE` - Delete responsibility (authenticated)

### Database Service
The `DatabaseService` class in `/utils/database.ts` provides:
- Type-safe operations for all content types
- Automatic timestamp management
- Proper MongoDB ObjectId handling
- Bulk operations for reordering

## Update Interface

### Available Actions
1. **Add/Edit/Delete Projects**
2. **Add/Edit/Delete Notable Projects** 
3. **Update Education**
4. **Edit Responsibilities**
5. **Add/Edit/Delete Skills**
6. **Reorder Projects**

### Features
- Real-time data fetching
- Success/error messaging
- Type-safe form handling
- Responsive design with glassmorphism UI

## Security Features

### Authentication
- Environment-based credentials (no hardcoded passwords)
- JWT tokens with secure HTTP-only cookies
- Middleware protection for admin routes
- Automatic logout on token expiration

### Authorization
- All write operations require authentication
- Read operations are public
- Middleware redirects unauthorized users

## Development

### Running the Application
```bash
bun run dev      # Start development server
bun run build    # Build for production
bun run start    # Start production server
```

### Database Structure
Collections used:
- `projects` - Main project data
- `notableProjects` - Featured projects
- `education` - Educational background
- `responsibilities` - Leadership roles
- `skills` - Technical and soft skills

### Environment Variables Required
```env
NEXT_PUBLIC_ADMIN_EMAIL=your-email@domain.com
NEXT_PUBLIC_ADMIN_PASSWORD=your-secure-password
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret-key
NODE_ENV=development
```

## Usage

1. **Public Access**: All portfolio content is publicly viewable
2. **Admin Login**: Click "Admin" in header, use .env credentials
3. **Content Management**: After login, click "Update" to access management interface
4. **Logout**: Click "Logout" in header when authenticated

The system provides a seamless way to manage portfolio content with a secure, environment-based authentication system using modern web technologies.
