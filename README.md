# A Basic GraphQL App

A simple and modular GraphQL server setup built using TypeScript. This project is intended to serve as a starter template or reference for building GraphQL APIs with best practices like linting, formatting, and dev/prod scripts.

## 📦 Project Structure

```
├── src/                         # Main source directory containing all app-related code and logic.
│   │── config/                  # Centralized configuration for environment variables, server settings, etc.
│   │── constant/                # Stores shared constant values used across the app.
│   │── controller/              # Handles incoming HTTP requests and sends appropriate responses.
│	│
│	│── graphql/
│   │   │── resolvers/  		 # Contains resolver functions that define how GraphQL queries and mutations are handled.
│   │   │    └── resolver.ts 	 # A resolver file implementing the logic for GraphQL operations.
│   │   │── schema/				 # GraphQL schema definitions, including types, queries, and mutations.
│   │   │    └── schema.ts 	 	 # Defines GraphQL schema structure such as types, queries, and mutations using SDL or code-first approach.
│   │   └── graphql.ts       	 # GraphQL server setup including schema, resolvers, and integration with Express/Apollo.
│	│
│   │── middleware/              # Custom Middleware functions for request handling (e.g., authentication, logging).
│   │── model/                   # Contains database models/schema definitions (e.g., using Mongoose, Prisma, etc.).
│   │── router/                  # Defines application routes and maps them to controller methods.
│   │── service/                 # All the Databases, Rate-Limiting, and External Services configurations reside inside this folder.
│	│
│   │── types/
│   │── util/                    # Shared utility/helper functions used throughout the application.
│   │── view/                    # Static HTML Pages or Server-Side Rendered Views (if any).
│   │── app.ts                   # Initializes express app, middleware, and routing.
│   └── server.ts                # Starts the HTTP server and listens on a port.
│
├── test/                        # Contains Unit and Integration Tests for different parts of the application.
├── .env.example                 # Example file showing the required environment variables for the project.
├── .prettierrc                  # Prettier configuration
├── commitlint.config.js         # Commit lint rules
├── eslint.config.mjs            # ESLint configuration
├── nodemon.json                 # Nodemon config
├── package-lock.json
├── package.json
└── tsconfig.json                # TypeScript configuration file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- TypeScript globally (`npm install -g typescript`)

### Installation

```bash
git clone https://github.com/Sambit99/A-Basic-GraphQL-App.git
cd A-Basic-GraphQL-App
npm install
```

### Development

```bash
# Watch TypeScript compilation
npm run start:watch

# Run the compiled server in development mode (with nodemon)
npm run start:dev
```

### Production

```bash
npm run build
npm run start:prod
```

## ✨ Scripts

| Script         | Description                          |
| -------------- | ------------------------------------ |
| `build`        | Compile TypeScript to JavaScript     |
| `start:watch`  | Watch files and recompile on changes |
| `start:dev`    | Start dev server using compiled code |
| `start:prod`   | Start production server              |
| `lint`         | Run ESLint                           |
| `lint:fix`     | Auto-fix lint issues                 |
| `format:check` | Check formatting using Prettier      |
| `format:fix`   | Auto-format code using Prettier      |
