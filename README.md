# Express TypeScript Boilerplate with Bun

A production-ready Express.js boilerplate built with TypeScript and optimized for Bun runtime.

## Features

- 🚀 **Bun Runtime** - Ultra-fast JavaScript runtime
- 📘 **TypeScript** - Full type safety
- 🔐 **Authentication** - JWT-based auth with access & refresh tokens
- 🍪 **Cookie Management** - Secure HTTP-only cookies
- 🛡️ **Security** - CORS, rate limiting, bcrypt password hashing
- 📊 **Database** - MongoDB with Mongoose ODM
- 📝 **Logging** - Winston & Morgan for application and HTTP logging
- ⚡ **Hot Reload** - Fast development with Bun's native hot reload
- 🎨 **Error Handling** - Centralized error handling middleware
- 🏗️ **Clean Architecture** - Organized folder structure

## Prerequisites

- [Bun](https://bun.sh/) v1.0 or higher
- MongoDB instance running

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Create `.env` file from example:
   ```bash
   cp .env.example .env
   ```

4. Configure your environment variables in `.env`

## Scripts

```bash
# Development with hot reload
bun run dev

# Production
bun run start

# Build for production
bun run build
```

## Project Structure

```
.
├── config/              # Configuration files
│   ├── index.ts        # Main config aggregator
│   ├── cors.ts         # CORS configuration
│   └── cookie.ts       # Cookie options
├── db/                 # Database connection
│   └── connectDb.ts
├── src/
│   ├── app.ts          # Express app setup
│   ├── controllers/    # Route controllers
│   ├── middlewares/    # Custom middlewares
│   ├── models/         # Mongoose models
│   ├── routes/         # API routes
│   └── utils/          # Utility functions
├── server.ts           # Application entry point
└── tsconfig.json       # TypeScript configuration
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/signup` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/refresh-token` - Refresh access token
- `POST /api/v1/auth/logout` - Logout user

### Health Check
- `GET /health` - Server health status

## Environment Variables

See `.env.example` for all available configuration options.

## Features in Detail

### Authentication
- JWT-based authentication with access and refresh tokens
- Secure password hashing with bcrypt
- HTTP-only cookies for token storage
- Automatic token refresh mechanism

### Security
- CORS protection with configurable origins
- Rate limiting (global and per-IP)
- Environment-based security settings
- Secure cookie configuration

### Logging
- HTTP request logging with Morgan
- Application error logging with Winston
- Custom formatted logs with timestamps
- Separate log files for different log levels

### Error Handling
- Centralized error handling middleware
- Custom error classes (AppError, NotFoundError, etc.)
- Detailed error messages in development
- User-friendly errors in production

## Development with Bun

Bun provides several advantages:
- **Fast startup** - Significantly faster than Node.js
- **Hot reload** - Built-in watch mode with `--hot` flag
- **Native TypeScript** - No need for ts-node or compilation step
- **Better performance** - Optimized runtime for TypeScript/JavaScript

## License

ISC
