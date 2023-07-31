# vue_express_crud_backend

# Todo App Backend

![License](https://img.shields.io/badge/License-MIT-blue.svg)

## Description

The Todo App Backend provides the backend functionality for a simple Todo application. It is built using Express.js as the web framework, Firestore as the NoSQL database for storing tasks, and JWT (JSON Web Tokens) for handling user authentication and authorization.

## Features

- User Authentication: Users can sign up and log in to the application using JWT-based authentication.
- Task Management: Users can create, read, update, and delete tasks.
- Task Ownership: Tasks are associated with the user who created them to ensure privacy and data integrity.

## Getting Started

### Prerequisites

- Node.js and npm: Make sure you have Node.js and npm installed on your machine.

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/todo-app-backend.git
cd todo-app-backend
```

1. Install the dependencies:

```bash
npm install
```

The server will run on http://localhost:3000 by default.

## API Endpoints

### Authentication

- `POST /api/auth/signup`: User registration. Requires `email` and `password` in the request body.
- `POST /api/auth/login`: User login. Requires `email` and `password` in the request body.

### Tasks

- `GET /api/tasks`: Get all tasks for the authenticated user.
- `GET /api/tasks/:id`: Get a specific task by its ID.
- `POST /api/tasks`: Create a new task. Requires `title` and `description` in the request body.
- `PUT /api/tasks/:id`: Update an existing task by its ID. Requires `title` and `description` in the request body.
- `DELETE /api/tasks/:id`: Delete a task by its ID.

## Configuration

The application can be configured using environment variables. Create a `.env` file in the root directory and specify the required configuration variables.

## Contributing

Contributions are welcome! If you find a bug, have a feature request, or want to contribute in any other way, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Authors

- Ruzell


Happy coding!
