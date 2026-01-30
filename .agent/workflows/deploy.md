---
description: Steps to deploy Gipjazes Connect to production
---

# Deploy Stage Workflow 🚀

Follow these steps to prepare and deploy your application to a production environment.

## 1. Environment Preparation
Ensure you have the following environment variables set in your production environment (e.g., Vercel, Heroku, or a VPS):

- `NODE_ENV=production`
- `PORT=5000` (or your preferred port)
- `MONGODB_URI` (Your MongoDB Atlas connection string)
- `JWT_SECRET` (A long, random string)
- `AWS_ACCESS_KEY_ID` (If using S3)
- `AWS_SECRET_ACCESS_KEY` (If using S3)
- `AWS_REGION`
- `S3_BUCKET_NAME`

## 2. Install Dependencies
Run this in the project root to install all required packages:
// turbo
```powershell
npm run install-all
```

## 3. Build & Start (Production Mode)
This command will build the frontend and start the backend server, which will serve the frontend.
// turbo
```powershell
npm start
```

## 4. Platform Specifics

### Deploying to Heroku
1. Install the Heroku CLI.
2. `heroku create gipjazes-connect`
3. `git push heroku main`

### Deploying to Vercel (Frontend + Serverless Functions)
Vercel is great for the frontend. For the full Express app, you might need a `vercel.json` configuration.

---
**Note:** Always ensure your MongoDB is accessible from your production server's IP.
