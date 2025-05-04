# Family Chore Manager Backend

This is the backend implementation for the Family Chore Manager application. It provides RESTful APIs for managing family chores and points.

## Project Structure

```
src/
├── abl/                    # Application Business Logic
├── api/                    # API Layer
│   ├── controllers/        # Request handlers
│   └── validation_schemas/ # Request validation schemas
├── dao/                    # Data Access Objects
├── helpers/               # Helper functions
├── routes/                # Route definitions
└── app.js                 # Main application file

docs/                      # Documentation
├── dao-methods.md         # DAO Methods documentation
├── error-list.md         # Error handling documentation
└── sequence.md           # Sequence diagrams
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Documentation

The API documentation is available via Swagger UI when the server is running:
http://localhost:3000/api-docs

## Documentation

- [DAO Methods](docs/dao-methods.md)
- [Error Handling](docs/error-list.md)
- [Sequence Diagrams](docs/sequence.md) 