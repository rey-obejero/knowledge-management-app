# Knowledge Management App: Web Client

## Architecture

This application uses the Vertical Slice Architecture (VSA) to enforce domain boundaries. The core features are defined in the features directory, while the shared functionalities live in top-level directories. The entry point of the application lives in the root of the source directory, which houses React's root `div` i. The application setup itself lives in the app directory, which serves as the composition layer.
