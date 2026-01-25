# Complete Admin System Setup

## Backend Setup

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

### 2. Create .env File
```bash
cp .env.example .env
```

Edit `backend/.env` and update:
```
PORT=5000
MONGODB_URI=mongodb+srv://akoshipa_db_user:YOUR_ACTUAL_PASSWORD@cluster0.eukajny.mongodb.net/saatsaath
JWT_SECRET=some_long_random_secret_key_here
NODE_ENV=development
```

### 3. Start Backend Server
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### 4. Create First Admin Account
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@saatsaath.org","password":"Admin@123"}'
```

Save the returned token - you can now login with these credentials.

## Frontend Setup

### 1. Install Frontend Dependencies
```bash
cd ..  # Back to project root
npm install
```

### 2. Start Frontend
```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

## Usage

### Public Website
- Visit: `http://localhost:5173`
- Users can view all content
- Programs and Grants are fetched from backend API

### Admin Panel
1. **Login**: `http://localhost:5173/admin/login`
   - Email: `admin@saatsaath.org`
   - Password: `Admin@123` (or whatever you set)

2. **Dashboard**: View statistics

3. **Manage Programs**: `/admin/programs`
   - Add, edit, delete programs
   - Only title and description fields

4. **Manage Grants**: `/admin/grants`
   - Add, edit, delete grants
   - Fields: title, description, structure, eligibility, awardee, jury

5. **Logout**: Click logout button in navbar

## API Endpoints

### Public (No Auth)
- `GET /api/programs` - List all programs
- `GET /api/grants` - List all grants

### Admin Only (Requires JWT Token)
- `POST /api/programs` - Create program
- `PUT /api/programs/:id` - Update program
- `DELETE /api/programs/:id` - Delete program
- `POST /api/grants` - Create grant
- `PUT /api/grants/:id` - Update grant
- `DELETE /api/grants/:id` - Delete grant

### Auth
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register new admin (use once, then disable in production)

## Security Notes

1. **Disable Registration in Production**: After creating your admin account, comment out or remove the register route in `backend/src/routes/authRoutes.js`

2. **Change Default Credentials**: Use strong passwords

3. **Update JWT Secret**: Use a long, random string for `JWT_SECRET`

4. **MongoDB Password**: Never commit your actual MongoDB password

5. **CORS**: Update CORS settings for production deployment

## Troubleshooting

**Backend won't start:**
- Check MongoDB connection string
- Ensure MongoDB Atlas allows connections from your IP
- Verify all environment variables are set

**Frontend can't fetch data:**
- Ensure backend is running on port 5000
- Check browser console for CORS errors
- Verify `.env` file exists with `VITE_API_URL`

**Login fails:**
- Verify admin account was created successfully
- Check MongoDB Atlas for the admin user
- Ensure JWT_SECRET matches in backend .env

**401 Unauthorized:**
- JWT token may have expired (30 days default)
- Login again to get new token
- Check token is being sent in Authorization header

## Production Deployment

1. **Backend:**
   - Set `NODE_ENV=production`
   - Use proper MongoDB connection with restrictions
   - Configure CORS for your frontend domain
   - Use PM2 or similar for process management
   - Set up SSL/HTTPS

2. **Frontend:**
   - Update `VITE_API_URL` to production backend URL
   - Build: `npm run build`
   - Deploy `dist` folder to hosting service
   - Configure proper routing for SPA

## File Structure

```
sharonsweb/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── models/
│   │   │   ├── Admin.js
│   │   │   ├── Program.js
│   │   │   └── Grant.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── programController.js
│   │   │   └── grantController.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── programRoutes.js
│   │   │   └── grantRoutes.js
│   │   └── server.js
│   ├── package.json
│   ├── .env
│   └── .env.example
├── src/
│   ├── admin/
│   │   ├── components/
│   │   │   ├── AdminLayout.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Programs.jsx
│   │   │   └── Grants.jsx
│   │   └── utils/
│   │       └── api.js
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Grants.jsx (updated to fetch from API)
│   │   ├── Programs.jsx (updated to fetch from API)
│   │   ├── Footer.jsx
│   │   └── AIModal.jsx
│   └── App.jsx (updated with routing)
└── .env
```
