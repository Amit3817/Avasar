# Avasar Investment Platform

A full-stack web application for the Avasar investment platform, featuring user authentication, MLM structure, and admin management.

## Features

### Website
- **Home Page**: Hero section, features, income streams, and call-to-action
- **About Page**: Company information, rank & rewards system, matching bonus details
- **Contact Page**: Contact form with backend integration
- **Authentication**: Login and registration with JWT tokens

### User Panel
- **Dashboard**: Overview of user's account, income, and team
- **Profile Management**: Update personal information
- **Team Structure**: View downline and team hierarchy
- **Income Tracking**: Monitor all income streams
- **Rank Progress**: Track rank advancement and requirements

### Admin Panel
- **Dashboard**: System statistics and overview
- **User Management**: View, edit, and manage all users
- **Contact Management**: Handle contact form submissions
- **Analytics**: Track platform performance

## Tech Stack

### Frontend
- **React 18** with Vite
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API calls
- **Context API** for state management

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** for cross-origin requests

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

## Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd avasar-website
```

### 2. Install frontend dependencies
```bash
npm install
```

### 3. Install backend dependencies
```bash
cd backend
npm install
cd ..
```

### 4. Environment Setup

Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/avasar
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

### 5. Start MongoDB
Make sure MongoDB is running on your system or use a cloud MongoDB instance.

## Running the Application

### Development Mode

1. **Start the backend server:**
```bash
cd backend
npm run dev
```

2. **Start the frontend development server:**
```bash
npm run dev
```

3. **Access the application:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

### Production Mode

1. **Build the frontend:**
```bash
npm run build
```

2. **Start the backend:**
```bash
cd backend
npm start
```

## Project Structure

```
avasar-website/
├── src/
│   ├── components/
│   │   ├── website/          # Website components
│   │   ├── user/            # User panel components
│   │   └── admin/           # Admin panel components
│   ├── pages/
│   │   ├── website/         # Website pages
│   │   ├── user/           # User panel pages
│   │   └── admin/          # Admin panel pages
│   ├── context/            # React context
│   └── App.jsx            # Main app component
├── backend/
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Express middleware
│   └── server.js         # Main server file
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/team` - Get user's team
- `GET /api/users/income` - Get user's income
- `GET /api/users/rank` - Get user's rank details

### Admin
- `GET /api/admin/dashboard` - Admin dashboard stats
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/contacts` - Get all contacts

### Contacts
- `POST /api/contacts` - Submit contact form

## Database Models

### User Model
- Basic info (name, email, phone)
- Authentication (username, password)
- MLM structure (sponsor, upline, downline)
- Income tracking (referral, matching, generation, trading, reward)
- Rank and status

### Contact Model
- Contact form submissions
- Status tracking (pending, read, replied)

## Features in Detail

### MLM Structure
- Multi-level marketing hierarchy
- Sponsor and downline relationships
- Rank-based rewards system
- Matching bonus calculations

### Income Streams
- **Referral Income**: Direct referrals
- **Matching Income**: Team matching bonuses
- **Generation Income**: Multi-level commissions
- **Trading Income**: Investment returns
- **Reward Income**: Rank-based rewards

### Rank System
- 13 different ranks from Supervisor to Universal King
- Pair-based advancement system
- Substantial rewards at higher ranks

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary software for Avasar.

## Support

For support, email info@avasardeveloper.in or visit www.avasardeveloper.in
