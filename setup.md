# Avasar Website Setup Guide

## Quick Start

### 1. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 2. Set up MongoDB

Make sure MongoDB is running on your system. You can use:
- Local MongoDB installation
- MongoDB Atlas (cloud)
- Docker: `docker run -d -p 27017:27017 --name mongodb mongo:latest`

### 3. Environment Configuration

Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/avasar
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

### 4. Start the Application

#### Option 1: Run both frontend and backend together
```bash
npm start
```

#### Option 2: Run separately
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
npm run dev
```

### 5. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

## Features Available

### Website (Public)
- ✅ Home page with hero section and features
- ✅ About page with company info and rank system
- ✅ Contact page with form submission
- ✅ Login/Register pages
- ✅ Responsive design with Tailwind CSS

### User Panel (After Login)
- ✅ Dashboard with basic stats
- ✅ Profile page (placeholder)
- ✅ Team page (placeholder)
- ✅ Income page (placeholder)
- ✅ Rank page (placeholder)

### Admin Panel (Admin users only)
- ✅ Admin dashboard (placeholder)
- ✅ User management (placeholder)
- ✅ Contact management (placeholder)

### Backend API
- ✅ User authentication (register, login, JWT)
- ✅ User management endpoints
- ✅ Admin endpoints
- ✅ Contact form handling
- ✅ MongoDB integration

## Next Steps

1. **Complete User Panel Features**:
   - Profile management
   - Team structure visualization
   - Income tracking details
   - Rank progression system

2. **Complete Admin Panel Features**:
   - User management interface
   - Contact form management
   - System analytics dashboard

3. **Add Advanced Features**:
   - Real-time notifications
   - File uploads
   - Email notifications
   - Payment integration

4. **Production Deployment**:
   - Environment variables
   - Database optimization
   - Security hardening
   - Performance optimization

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**:
   - Ensure MongoDB is running
   - Check connection string in config.env
   - Verify network access

2. **Port Already in Use**:
   - Change PORT in config.env
   - Kill existing processes on the port

3. **CORS Issues**:
   - Backend CORS is configured for localhost:5173
   - Update if using different frontend URL

4. **JWT Token Issues**:
   - Check JWT_SECRET in config.env
   - Clear browser localStorage if needed

## Support

For technical support or questions:
- Email: info@avasardeveloper.in
- Website: www.avasardeveloper.in 