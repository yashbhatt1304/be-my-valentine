# Be My Valentine

A playful Valentine’s page with a moving Yes button and a celebration screen.

## Project Setup

1.  **Clone the repository** (if you haven't already).
2.  **Install dependencies**:
    ```bash
    npm install
    ```

## Development

To run the project in development mode:

```bash
npm run dev
```

The server will start on port **8000**.
Open [http://localhost:8000](http://localhost:8000) in your browser.

## Production

To build and run the project for production:

1.  **Build the project**:
    ```bash
    npm run build
    ```
    This command compiles the client and server code into the `dist` directory.

2.  **Start the production server**:
    ```bash
    npm run start
    ```
    The production server will also run on port **8000** (or the port specified by the `PORT` environment variable).

## Database

This project is configured to use a database (PostgreSQL) via Drizzle ORM.
Ensure you have a `DATABASE_URL` environment variable set if you plan to use database features.
However, for the basic "Be My Valentine" page features, it may run with in-memory storage fallback depending on configuration.

## License

MIT
