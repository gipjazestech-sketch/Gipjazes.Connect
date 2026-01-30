# Gipjazes Connect 🌐

A vibrant, global social media platform designed for connection and cultural exchange.

## Features
- **Real-time Feed**: Share text, images, and videos with a global audience.
- **Gipjazes Marketplace**: Buy and sell unique items from different cultures.
- **Encrypted Messaging**: Secure end-to-end encrypted chats.
- **Cultural Hub**: Discover events and trending topics from around the world.
- **Micro-Tipping**: Support your favorite creators (Coming Soon).

## Tech Stack
- **Frontend**: React.js (Web), React Native (Mobile)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Security**: JWT, Bcrypt, E2E Encryption

## Getting Started

### Backend
1. `cd backend`
2. `npm install`
3. `npm start` (Make sure MongoDB is running)

### Web Frontend
1. `cd web`
2. `npm install`
3. `npm run dev`

### Mobile
1. `cd mobile`
2. `npm install`
3. `npx expo start`

## Multi-User Testing
Use the **Antigravity Browser Extension** to test multiple user sessions simultaneously.

## Deployment 🚀

### 1. Push to GitHub
1. Create a new repository on [GitHub](https://github.com/new).
2. Run the following in your terminal:
   ```powershell
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

### 2. Deploy to Vercel
1. Go to [Vercel](https://vercel.com/new).
2. Import your GitHub repository.
3. Vercel will auto-detect the monorepo settings.
4. Add your **Environment Variables** (from `.env.example`) in the Vercel dashboard.
5. Click **Deploy**.
