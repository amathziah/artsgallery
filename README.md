# Arts Gallery Management System

This is a full-stack application for managing arts gallery programs and grants with an admin panel for content management.

## Tech Stack

- **Frontend**: React.js with Vite, TailwindCSS
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)

## Features

- Admin authentication and authorization
- Manage programs and grants
- File upload capabilities
- Responsive UI design

## Deployment Guide

This guide will help you deploy your full-stack application to various hosting platforms.

### Option 1: Deploy to Render.com (Recommended)

#### Backend Deployment
1. Create an account at [render.com](https://render.com)
2. Create a new "Web Service" 
3. Connect to your GitHub repository
4. Configure as follows:
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Branch: main
5. Add environment variables:
   - NODE_ENV: production
   - MONGODB_URI: your MongoDB connection string
   - JWT_SECRET: your secret key
   - BACKEND_URL: your backend URL
6. Click "Create Web Service"

#### Frontend Deployment (Separate service)
1. Create a new "Static Site" on Render
2. Connect to your GitHub repository
3. Configure as follows:
   - Build Command: `cd frontend && npm install && npm run build`
   - Publish Directory: `frontend/dist`
   - Branch: main
4. Add environment variables:
   - VITE_API_URL: your backend URL
5. Click "Create Static Site"

### Option 2: Deploy to Railway.app

1. Create an account at [railway.app](https://railway.app)
2. Create a new project and connect to your GitHub repo
3. For the backend:
   - Set environment variables in Settings > Variables
   - Ensure your start command is `npm start`
4. Railway will automatically detect your Node.js app and deploy it

### Option 3: Deploy to Heroku

#### Backend
1. Create an account at [heroku.com](https://heroku.com)
2. Install Heroku CLI
3. Create a new app
4. Link your GitHub repository
5. Enable automatic deploys
6. Set config vars:
   - MONGODB_URI
   - JWT_SECRET
   - NODE_ENV: production
7. Deploy your branch

#### Frontend
Deploy separately to Netlify or Vercel (see below).

### Option 4: Deploy Frontend to Netlify/Vercel

1. Create an account at [netlify.com](https://netlify.com) or [vercel.com](https://vercel.com)
2. Connect to your GitHub repository
3. Configure build settings:
   - Build command: `cd frontend && npm install && npm run build`
   - Publish directory: `frontend/dist`
4. Set environment variables:
   - VITE_API_URL: your backend URL

## Environment Variables Needed

### Backend (.env file in backend directory)
```env
NODE_ENV=production
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
BACKEND_URL=https://your-app-name.onrender.com
```

### Frontend (.env file in frontend directory)
```env
VITE_API_URL=your_backend_url/api
```

## Pre-deployment Checklist

- [ ] Test your application locally in production mode
- [ ] Ensure your MongoDB connection works in production
- [ ] Check that all API endpoints are properly prefixed with `/api`
- [ ] Verify CORS settings for your production domain
- [ ] Ensure file uploads work properly in production

## Running Locally

1. Clone the repository
2. Install dependencies for both frontend and backend:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```
3. Set up environment variables in both directories
4. Start the backend server:
   ```bash
   cd backend && npm run dev
   ```
5. In a new terminal, start the frontend:
   ```bash
   cd frontend && npm run dev
   ```