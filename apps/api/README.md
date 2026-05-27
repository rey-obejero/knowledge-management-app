# API

## Architecture

The architecture is inspired by Clean Architecture, with Domain, Application, Infrastructure, and Web layers. However, unlike traditional Clean Architecture implementations that enforce strict separation with a multi-project solution setup, this API only defines a single project that lives in the root of the source directory.

### Composition Layer

The program entry point project-related configuration files live in the root of the source code directory, serving as the composition layer sitting at the very top of architecture. This layer pulls in the functionalities from the inner layers and is responsible for receiving HTTP requests and setting up the server.

### Web Layer

The Web layer is responsible for acting on the HTTP requests delegated to it by the Composition layer and handling the request-response pipeline. In other words, it is responsible for the API's HTTP-related concerns.

### Infrastructure Layer

The Infrastructure layer is responsible for interacting with external services, such as the database and third-party authentication systems.

### Application Layer

The Application layer is responsible for the business logic of the application, serving as the orchestration layer by defining the steps necessary to accomplish the application's use cases or features.

### Domain Layer

The Domain layer models the business data structures, data access contracts, and the domain-specific errors. Unlike traditional Clean Architecture implementations, this layer simply uses anemic domain models as opposed to rich domain models, delegating invariant validations instead to the Application layer.

## Technologies and Tools

- Runtime: .NET
- Framework: ASP.NET Core
- Mappings: Mapperly
- Logging: Serilog
- Object-Relational Mapping (ORM): Entity Framework Core
- Database: PostgreSQL
- OpenAPI documentation: NSwag

## Local Development
