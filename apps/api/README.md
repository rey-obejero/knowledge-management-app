# API

## Architecture

The architecture is inspired by Clean Architecture, with Domain, Application, Infrastructure, and Web layers. However, unlike traditional Clean Architecture implementations that enforces separation via a multi-project solution, this API only defines a single project. The program entry point project-related configuration files live in the root of the source code directory, serving as the composition layer sitting at the very top of architecture. This layer pulls in the functionalities from the inner layers and is responsible for receiving HTTP requests and setting up the server.
