# Fusion Starter – Technical Overview

Fusion Starter is a modern, open-source full-stack template designed for rapid development of React applications with an integrated Express backend. It leverages a robust set of open source technologies to provide a seamless developer experience.

## Technical Components

### Frontend

- **React 18**: Modern SPA framework for building interactive UIs.
- **React Router 6**: Declarative routing for single-page applications.
- **TypeScript**: Type-safe development across the stack.
- **Vite**: Lightning-fast build tool and dev server.
- **TailwindCSS 3**: Utility-first CSS framework for rapid UI development.
- **Radix UI**: Accessible, unstyled UI primitives.
- **Lucide React**: Open source icon library.

### Backend

- **Express**: Minimal and flexible Node.js web application framework.
- **Vite Dev Server Integration**: Unified development server for both frontend and backend.
- **API Routing**: RESTful endpoints under `/api/`.

### Shared

- **Shared Types**: TypeScript interfaces shared between client and server for type-safe API communication.

### Tooling

- **PNPM**: Fast, disk space-efficient package manager.
- **Vitest**: Blazing fast unit testing framework.
- **clsx + tailwind-merge**: Utility for conditional and merged Tailwind class names.

### Project Structure

```
client/    # React SPA frontend
server/    # Express API backend
shared/    # Shared TypeScript types/interfaces
```

### Development

- Hot reload for both client and server.
- Single-port development server.
- Type-safe, production-ready architecture.

---

All components are open source and can be customized to fit your project needs.