# Personal Knowledge Management System

## Project Overview

Knowledge Management App is a web-based personal knowledge management (PKM) application, intended to serve as a "second brain." The application provides a structured way to classify and organize information, taking inspiration from well-known methodologies such as Project, Areas, Resources, and Archives (PARA) and the Gettings Things Done (GTD).

## Prerequisites

This application was built with React, TypeScript, ASP.NET Core, C#, and Docker. To run or develop, the following tools are required:

- Docker and Docker Compose
- Node.js
- .NET 10.0 SDK
- Make

## Getting Started

Before proceeding, ensure the necessary tools are installed.

To run the project, use the Makefile at the root of the directory:

1. To view the valid Make targets, use

   ```console
   make
   ```

2. Start the web client with

   ```console
   make web
   ```

3. Start the API server and the local database with

   ```console
   make api
   ```

## Project Structure

See the [API documentation](/apps/api/README.md) for more detailed information on the API.

See the [web client documentation](/apps/web/README.md) for more detailed information on the web client.

```text

.
├── apps # Deployable units
│   ├── api # API Server
│   └── web # Web Client
├── docs
│   ├── architecture
│   ├── features
│   └── architecture-diagrams.md
├── AGENTS.md # For agentic workflows
├── docker-compose.yml
├── Makefile
├── README.md
└── skills-lock.json

```
