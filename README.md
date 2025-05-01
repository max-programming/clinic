# Clinic Management System

A Go-based clinic management system that helps manage patients, users, and clinical operations.

## 📋 Overview

This application provides a backend service for clinic management, including:
- User authentication and management
- Patient registration and information management
- Database migrations for schema evolution

## 🛠️ Technology Stack

- **Backend**: Go (v1.24.1)
- **Database**: PostgreSQL
- **Authentication**: JWT
- **API Framework**: Gin
- **Database Migration**: Go-migrate
- **Frontend**: React with TypeScript
- **UI Framework**: TailwindCSS with Shadcn UI
- **State Management**: TanStack React Query
- **Routing**: TanStack Router

## 🌐 API Endpoints

### Authentication
- `GET /api/me` - Get the authenticated user's information
- `POST /api/register` - Register a new user (doctor or receptionist)
- `POST /api/login` - Authenticate user and receive JWT token

### Patient Management
All patient endpoints require authentication.

#### For All Authenticated Users
- `GET /api/patients` - Retrieve list of all patients
- `GET /api/patients/:id` - Get details of a specific patient by ID

#### For Receptionists Only
- `POST /api/patients` - Add a new patient to the system
- `PUT /api/patients/:id` - Update patient information
- `DELETE /api/patients/:id` - Remove a patient from the system

#### For Doctors Only
- `PATCH /api/patients/:id/notes` - Update medical notes for a patient

## ⚙️ Prerequisites

- Go 1.24 or higher
- PostgreSQL
- [golang-migrate](https://github.com/golang-migrate/migrate) for migrations

## 🚀 Getting Started

### CLI Setup
Install the CLI tools required for the project:

Golang Migrate: https://github.com/golang-migrate/migrate/tree/master/cmd/migrate#readme
Golang Swagger: https://github.com/swaggo/swag?tab=readme-ov-file#getting-started
Bun: https://bun.sh/docs/installation

### Environment Setup

Create a `.env` file in the root directory with the following variables:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=clinic
DATABASE_URL="postgresql://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME"
JWT_SECRET=your_jwt_secret
LOCAL_ALLOWED_ORIGIN=http://localhost:5173
REMOTE_ALLOWED_ORIGIN=http://your_remote_origin.com
```

### Running the Application

1. **Build the application**:
   ```bash
   make build
   ```

2. **Run database migrations**:
   ```bash
   make migrate-up
   ```

3. **Start the server**:
   ```bash
   make run
   ```
   or for development with auto-rebuild:
   ```bash
   make dev
   ```

4. The server will start on port 8080.

### Frontend Setup

1. **Navigate to the web directory**:
   ```bash
   cd web
   ```

2. **Environment Variables**
Create a `.env` file in the `web` directory with the following variables:

```
VITE_API_BASE_URL=http://localhost:8080/api
VITE_SWAGGER_JSON_URL=http://localhost:8080/swagger/doc.json
```

This will point the frontend to the backend API.

3. **Install dependencies**:
   ```bash
   bun install
   ```

4. **Start the development server**:
   ```bash
   bun dev
   ```

5. The frontend will be available at `http://localhost:5173`

6. **Build for production**:
   ```bash
   bun build
   ```

7. **Preview production build**:
   ```bash
   bun preview
   ```

### API Documentation

The API documentation is available through Swagger UI at:
```
http://localhost:8080/swagger/index.html
```

You can also access the raw Swagger JSON at:
```
http://localhost:8080/swagger/doc.json
```

## 🔄 Database Migrations

Create a new migration:
```bash
make migration migration_name
```

Apply migrations:
```bash
make migrate-up
```

Rollback migrations:
```bash
make migrate-down
```

## 🧹 Cleaning Up

Remove build artifacts:
```bash
make clean
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the [MIT License](LICENSE).
