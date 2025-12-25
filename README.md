# Fullstack Monorepo Demo

A modern, scalable fullstack application built with **NestJS**, **Next.js**, and **Turborepo**. This project demonstrates industry-standard architectural patterns designed for maintainability, testability, and scalability.

## 🧠 Technology Decisions

This section outlines the core technologies used in this project, **where** they are located in the codebase, and **why** they were chosen.

### 1. Monorepo & Tooling

| Technology | Where? | Why? |
| :--- | :--- | :--- |
| **[Turborepo](https://turbo.build/)** | Root (`turbo.json`) | Provides strict dependency management, high-performance build caching, and parallel task execution (lint, build, test) across the workspace. |
| **[Biome](https://biomejs.dev/)** | Root (`biome.json`) | An extremely fast, Rust-based unified linter and formatter. It replaces the complex setup of ESLint + Prettier, offering instant feedback and consistent code style. |
| **[Vitest](https://vitest.dev/)** | Apps (`vitest.config.ts`) | A next-generation test runner powered by Vite. It offers native TypeScript support, fast execution, and a Jest-compatible API. |

### 2. Backend (`apps/backend`)

| Technology | Where? | Why? |
| :--- | :--- | :--- |
| **[NestJS 11](https://nestjs.com/)** | Core Framework | A progressive Node.js framework that provides a rigid, modular structure primarily based on **Clean Architecture**. It uses Dependency Injection to decouple business logic from infrastructure. |
| **`class-validator`** | DTOs (`presentation/dtos`) | Enables declarative validation of incoming network requests using decorators (e.g., `@IsEmail()`). This ensures data integrity at the application boundary. |
| **`class-transformer`** | DTOs / Entities | Handles serialization and deserialization of objects, transforming plain JSON into class instances and vice versa. |
| **[RxJS](https://rxjs.dev/)** | Services / Interceptors | A powerful library for reactive programming. It is used to handle asynchronous data streams and event-based logic efficiently. |

### 3. Frontend (`apps/frontend`)

| Technology | Where? | Why? |
| :--- | :--- | :--- |
| **[Next.js 16](https://nextjs.org/)** | Core Framework | Uses the **App Router** for robust server-side rendering (SEO), simplified file-system based routing, and React Server Components for performance. |
| **[TailwindCSS v4](https://tailwindcss.com/)** | Styling | A utility-first CSS framework that reduces bundle size and enforces a consistent design system without leaving the HTML. |
| **[`@tanstack/react-query`](https://tanstack.com/query)** | Services (`features/*/services`) | Manages server state (fetching, caching, synchronizing, and updating server state) independently of UI state, eliminating "useEffect" spaghetti code. |
| **[`@tanstack/react-form`](https://tanstack.com/form)** | Components (`features/*/components`) | A headless, type-safe form management library that decouples form logic from UI components, providing better performance and flexibility. |
| **[CVA](https://cva.style/)** | UI (`components/ui`) | Class Variance Authority. Allows the creation of type-safe, multi-variant UI components (e.g., a button with `primary`, `secondary`, `ghost` variants) cleanly. |
| **`lucide-react`** | UI Components | A consistent, lightweight, and tree-shakeable icon library. |
| **[Motion](https://motion.dev/)** | UI Animations | A production-ready motion library for React that provides declarative, physics-based animations. |

## 🏗️ Architecture Overview

### Monorepo Structure

This project uses Turborepo to manage multiple applications and packages.

- `apps/backend`: NestJS API application.
- `apps/frontend`: Next.js web application.
- `packages/`: Shared libraries (if applicable).

### Backend (NestJS)

The backend follows **Clean Architecture** principles to separate concerns and make the business logic independent of frameworks and drivers.

#### Folder Structure (`apps/backend/src`)

The code is organized by **Modules** (vertical slicing), and within each module, by **Layers** (horizontal slicing).

```
src/
├── modules/
│   └── [module-name]/          # e.g., users
│       ├── domain/             # Enterprise business rules
│       │   ├── entities/       # Pure domain objects
│       │   └── repositories/   # Repository interfaces
│       ├── application/        # Application business rules
│       │   ├── use-cases/      # Specific user actions
│       │   └── dto/            # Data Transfer Objects
│       ├── infrastructure/     # Frameworks & Drivers
│       │   └── persistence/    # Database implementations
│       └── presentation/       # Interface Adapters
│           ├── controllers/    # HTTP Controllers
│           └── dtos/           # Input/Output DTOs
├── shared/                     # Shared kernel/utilities
└── main.ts                     # Entry point
```

### Frontend (Next.js)

The frontend uses a **Feature-Based Architecture**, keeping related components, hooks, and services together.

#### Folder Structure (`apps/frontend/src`)

```
src/
├── app/                        # Next.js App Router (pages & layouts)
├── components/
│   └── ui/                     # Shared UI components (Shadcn/UI style)
├── features/                   # Feature-specific code
│   └── [feature-name]/         # e.g., users
│       ├── components/         # Feature-specific components
│       ├── services/           # API calls for this feature
│       └── types/              # Feature-specific types
├── lib/                        # Shared utilities (e.g., api-client)
└── styles/                     # Global styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js (Latest LTS recommended, >=20)
- npm

### Installation

```bash
npm install
```

### Running Development Server

Start both frontend and backend in development mode:

```bash
npm run dev
```

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3002

### Testing

Run tests across the workspace:

```bash
npm run test
```

## 🐳 Docker Deployment

The project is fully dockerized for production-grade deployment.

```bash
docker-compose up --build
```

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3002

## 📏 Development Standards

### Linting & Formatting

We use **Biome** for fast and efficient linting and formatting.

```bash
npm run format
npm run lint
```

### Type Checking

Ensure type safety with TypeScript:

```bash
# Check backend
npx tsc -p apps/backend/tsconfig.json --noEmit

# Check frontend
npx tsc -p apps/frontend/tsconfig.json --noEmit
```

---

## 🤖 Guide for AI Models

**Role**: You are an expert software architect acting as a pair programmer.

**Objective**: When extending this codebase, YOU MUST adhere strictly to the established architectural patterns.

### Backend Rules
1.  **Clean Architecture**: Always update the `Domain` layer first (Entities/Interfaces), then `Application` (Use Cases), then `Infrastructure` (Persistence), and finally `Presentation` (Controllers).
2.  **Dependency Rule**: Source code dependencies can only point *inwards*. Inner layers (Domain) must NOT depend on outer layers (Infrastructure/Presentation).
3.  **Imports**: Use the `@/` alias for all internal imports. Avoid relative paths like `../../`.
4.  **Testing**: Create unit tests for Use Cases mocking the Repository interface.

### Frontend Rules
1.  **Feature Isolation**: Place new feature code in `src/features/[feature-name]`.
2.  **Shared Components**: Only highly reusable "dumb" components go in `src/components/ui`.
3.  **API Client**: Use the shared `api-client` in `src/features/[feature]/services` for all network requests.
