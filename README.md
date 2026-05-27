# Knoweledge Management App

## Project Overview

Knowledge Management App is a web-based personal knowledge management (PKM) application, intended to serve as a "second brain." The application provides a structured way to classify and organize information, taking inspiration from well-known methodologies such as Project, Areas, Resources, and Archives (PARA) and the Gettings Things Done (GTD).

## Prerequisites

This application was built with React, TypeScript, ASP.NET Core, C#, and Docker. To run or develop, the following tooling are required:

- Docker and Docker Compose
- Node.js
- .NET 10.0 SDK
- Make

## Getting Started

Before proceeding, ensure the necessary tooling are installed.

To run the project, use the Makefile at the root of the directory:

1. To view the valid Make targets, use

```console
make
```

1. Start the web client with

```console
make web

```

1. Start the API server with

````console
make api

## Project Structure

```text

.
├── apps                                                # Contains the deployable units of the project
│   ├── api
│   │   └── src
│   │       ├── Application
│   │       │   ├── DTOs
│   │       │   │   ├── Requests
│   │       │   │   └── Results
│   │       │   ├── Extensions                          # Application layer extensions
│   │       │   │   └── ApplicationServiceExtensions.cs # ServiceCollection extensions
│   │       │   ├── Features                            # Application layer feature slices
│   │       │   │   └── Authentication
│   │       │   │       ├── Commands                    # Defines inputs for write operations
│   │       │   │       ├── Interfaces                  # Adapters for external services
│   │       │   │       ├── Queries                     # Defines inputs for read operations
│   │       │   │       ├── AuthenticationResultDto.cs
│   │       │   │       ├── AuthenticationService.cs
│   │       │   │       ├── IAuthenticationService.cs
│   │       │   │       └── UserDto.cs
│   │       │   ├── Interfaces                          # Shared interfaces
│   │       │   ├── Mappers                             # Shared mappers
│   │       │   ├── Services
│   │       │   └── Result.cs                           # Defines the Result class for the Result Pattern
│   │       ├── Domain
│   │       │   ├── Entities
│   │       │   │   ├── BaseEntity.cs
│   │       │   │   ├── Entry.cs
│   │       │   │   ├── User.cs
│   │       │   │   └── Workspace.cs
│   │       │   ├── Errors
│   │       │   │   ├── AuthErrors.cs
│   │       │   │   ├── EntryErrors.cs
│   │       │   │   ├── Error.cs
│   │       │   │   ├── SharedErrors.cs
│   │       │   │   └── WorkspaceErrors.cs
│   │       │   └── Interfaces
│   │       │       ├── IBaseRepository.cs
│   │       │       ├── IEntryRepository.cs
│   │       │       ├── IUserRepository.cs
│   │       │       └── IWorkspaceRepository.cs
│   │       ├── Infrastructure
│   │       │   ├── Authentication
│   │       │   │   ├── ApplicationUser.cs
│   │       │   │   ├── IdentityService.cs
│   │       │   │   ├── JwtOptions.cs
│   │       │   │   └── JwtTokenService.cs
│   │       │   ├── Extensions
│   │       │   │   └── InfrastructureServiceExtensions.cs
│   │       │   ├── Persistence
│   │       │   │   ├── knowledge-management-app.db
│   │       │   │   ├── KnowledgeManagementAppDbContext.cs
│   │       │   │   └── UnitOfWork.cs
│   │       │   └── Repositories
│   │       │       ├── BaseRepository.cs
│   │       │       ├── EntryRepository.cs
│   │       │       ├── UserRepository.cs
│   │       │       └── WorkspaceRepository.cs
│   │       ├── Properties
│   │       │   └── launchSettings.json
│   │       ├── Web
│   │       │   ├── Controllers
│   │       │   │   ├── EntryController.cs
│   │       │   │   └── WorkspaceController.cs
│   │       │   ├── Extensions
│   │       │   │   ├── ResultExtensions.cs
│   │       │   │   └── WebServiceExtensions.cs
│   │       │   ├── Features
│   │       │   │   └── Authentication
│   │       │   │       ├── AuthenticationController.cs
│   │       │   │       ├── SignInRequest.cs
│   │       │   │       └── SignUpRequest.cs
│   │       │   └── Validators
│   │       ├── appsettings.Development.json
│   │       ├── appsettings.json
│   │       ├── KnowledgeManagementApp.Api.csproj
│   │       ├── KnowledgeManagementApp.Api.http
│   │       └── Program.cs
│   └── web
│       ├── dist
│       │   ├── assets
│       │   │   ├── hero-CLDdwZDr.png
│       │   │   ├── index-Bq9bv_Nr.js
│       │   │   ├── index-D64VDMd1.css
│       │   │   ├── react-CHdo91hT.svg
│       │   │   └── vite-BF8QNONU.svg
│       │   ├── favicon.svg
│       │   ├── icons.svg
│       │   └── index.html
│       ├── public
│       │   ├── favicon.svg
│       │   └── icons.svg
│       ├── src
│       │   ├── app
│       │   │   ├── routes
│       │   │   │   ├── app
│       │   │   │   │   ├── entries
│       │   │   │   │   │   ├── entries.tsx
│       │   │   │   │   │   └── entry.tsx
│       │   │   │   │   ├── workspaces
│       │   │   │   │   │   └── workspaces.tsx
│       │   │   │   │   ├── home.tsx
│       │   │   │   │   └── root.tsx
│       │   │   │   └── authentication
│       │   │   │       ├── root.tsx
│       │   │   │       ├── sign-in.tsx
│       │   │   │       └── signup.tsx
│       │   │   ├── index.tsx
│       │   │   ├── provider.tsx
│       │   │   └── router.tsx
│       │   ├── assets
│       │   │   ├── hero.png
│       │   │   ├── react.svg
│       │   │   └── vite.svg
│       │   ├── components
│       │   │   ├── layouts
│       │   │   │   ├── index.ts
│       │   │   │   └── root-layout.tsx
│       │   │   ├── sidebar
│       │   │   │   ├── index.ts
│       │   │   │   └── sidebar.tsx
│       │   │   └── ui
│       │   │       ├── button.tsx
│       │   │       ├── card.tsx
│       │   │       ├── collapsible.tsx
│       │   │       ├── dropdown-menu.tsx
│       │   │       ├── input.tsx
│       │   │       ├── label.tsx
│       │   │       ├── scroll-area.tsx
│       │   │       ├── skeleton.tsx
│       │   │       ├── toggle.tsx
│       │   │       └── tooltip.tsx
│       │   ├── config
│       │   │   └── paths.ts
│       │   ├── features
│       │   │   ├── authentication
│       │   │   │   ├── api
│       │   │   │   │   └── authentication-api.ts
│       │   │   │   ├── components
│       │   │   │   │   ├── authentication-layout.tsx
│       │   │   │   │   └── sign-in-form.tsx
│       │   │   │   ├── hooks
│       │   │   │   │   └── use-authentication.ts
│       │   │   │   ├── stores
│       │   │   │   │   └── authentication-store.ts
│       │   │   │   ├── types
│       │   │   │   │   └── authentication.types.ts
│       │   │   │   └── index.ts
│       │   │   ├── entries
│       │   │   │   ├── api
│       │   │   │   │   └── entries-api.ts
│       │   │   │   ├── components
│       │   │   │   │   ├── entry-editor.tsx
│       │   │   │   │   └── entry.tsx
│       │   │   │   ├── hooks
│       │   │   │   │   ├── use-create-entry.ts
│       │   │   │   │   ├── use-entry.ts
│       │   │   │   │   └── use-update-entry.ts
│       │   │   │   ├── types
│       │   │   │   │   └── entries.types.ts
│       │   │   │   └── index.ts
│       │   │   └── workspaces
│       │   │       ├── api
│       │   │       │   └── workspace-api.ts
│       │   │       ├── components
│       │   │       ├── hooks
│       │   │       │   ├── use-workspaces.ts
│       │   │       │   └── use-workspace.ts
│       │   │       ├── stores
│       │   │       │   └── workspace-store.ts
│       │   │       └── index.ts
│       │   ├── lib
│       │   │   ├── api-client.ts
│       │   │   ├── react-query.ts
│       │   │   └── utils.ts
│       │   ├── types
│       │   │   └── api.ts
│       │   ├── index.css
│       │   └── main.tsx
│       ├── components.json
│       ├── eslint.config.js
│       ├── index.html
│       ├── package.json
│       ├── package-lock.json
│       ├── README.md
│       ├── tsconfig.app.json
│       ├── tsconfig.json
│       ├── tsconfig.node.json
│       └── vite.config.ts
├── docker-compose.yml
├── Makefile
└── README.md

69 directories, 143 files
````
