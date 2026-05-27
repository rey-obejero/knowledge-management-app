# Web Client

## Architecture

This application uses the Vertical Slice Architecture (VSA). The core features are defined in the features directory, while the shared functionalities live in top-level directories. The entry point of the application lives in the root of the source directory, which houses React's root `div` i. The application setup itself lives in the app directory, which serves as the composition layer.

## Technologies and Tools

- Bundler: Vite
- Frontend Framework/Library:React (TypeScript)
- Runtime: Node.js
- HTTP Request/Response Handler: Axios
- Client-side global state: Zustand
- Server-side state: TanStack Query
- Validation: Zod
