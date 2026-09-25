# Expense Tracker

Expense Tracker is a React/Vite frontend with an Express API and MongoDB database.

## Requirements

- Node.js 20.19+ (or 22.12+) and npm, required by the Vite version in this project
- MongoDB running locally, or a MongoDB Atlas connection string

## Configure the backend

In a terminal opened at this project folder:

```powershell
cd backend
Copy-Item .env.example .env
```

Open `backend/.env` and set `MONGO_URI` to your MongoDB connection string and `JWT_SECRET` to a long random secret. The example uses a local database at `mongodb://127.0.0.1:27017/expense-tracker`.

Install and start the API:

```powershell
npm install
npm run dev
```

The API listens at `http://localhost:5000`. Keep this terminal running.

## Run the frontend

Open a second terminal at the project folder:

```powershell
cd frontend
npm install
npm run dev
```

Open the URL Vite prints, usually `http://localhost:5173`.

The frontend defaults to the API at `http://localhost:5000`. To point it elsewhere, create `frontend/.env` with `VITE_API_URL=http://your-api-host:5000` (the host only; the app adds `/api/v1`). Restart Vite after changing environment variables.

## Other commands

Run `npm run build` or `npm run lint` from `frontend` to build or lint the UI. Run `npm start` or `npm run lint` from `backend` to start the API in production mode or lint the API.

Register an account from the app's Register page. The database must be reachable before starting the backend.
