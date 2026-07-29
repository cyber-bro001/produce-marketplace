# Produce Marketplace

A full-stack marketplace app where sellers can list produce and buyers can browse and order it.

## Stack

- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS (`/client`)
- **Backend**: Node.js + Express 5 + Mongoose (`/server`)
- **Database**: MongoDB (via `MONGO_URI` secret)
- **Image uploads**: Cloudinary (`CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`)
- **Auth**: JWT (`JWT_SECRET`)

## How to run

Two workflows are configured:

| Workflow | Command | Port |
|---|---|---|
| Start application | `cd client && npm run dev` | 5000 (webview) |
| Backend API | `cd server && npm start` | 3000 (console) |

The Vite dev server proxies `/api/*` requests to the backend at `localhost:3000`.

## Required secrets

Set these in Replit Secrets before the app will work end-to-end:

- `MONGO_URI` — MongoDB connection string (e.g. from MongoDB Atlas)
- `JWT_SECRET` — any long random string for signing JWTs
- `CLOUDINARY_CLOUD_NAME` — from your Cloudinary dashboard
- `CLOUDINARY_API_KEY` — from your Cloudinary dashboard
- `CLOUDINARY_API_SECRET` — from your Cloudinary dashboard

## User preferences

_(none recorded yet)_
