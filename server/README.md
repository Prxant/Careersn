# CareerSn Backend API

A comprehensive backend API for the CareerSn job portal application built with Express.js, MongoDB, and Node.js.

## Features

- 🔐 **Authentication & Authorization** - JWT-based auth with role-based access control
- 👥 **User Management** - Registration, login, profile management
- 💼 **Job Management** - CRUD operations for job postings
- 🔍 **Advanced Search** - Full-text search with filters
- 📊 **Analytics** - Job statistics and insights
- 🛡️ **Security** - Rate limiting, helmet, CORS protection
- 📱 **API Documentation** - RESTful API design

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Helmet, CORS, Rate Limiting
- **Password Hashing**: bcryptjs

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- MongoDB Compass (optional, for GUI)

### Installation

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   MONGODB_URI=mongodb://localhost:27017/careersn
   JWT_SECRET=your-super-secret-jwt-key
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

4. **Start MongoDB:**
   - **Local MongoDB**: Make sure MongoDB service is running
   - **MongoDB Atlas**: Use your Atlas connection string in MONGODB_URI

5. **Seed the database (optional):**
   ```bash
   npm run seed
   ```

6. **Start the server:**
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

## MongoDB Setup

### Option 1: Local MongoDB

1. **Install MongoDB Community Edition:**
   - Download from: https://www.mongodb.com/try/download/community
   - Follow installation instructions for your OS

2. **Start MongoDB service:**
   ```bash
   # macOS (with Homebrew)
   brew services start mongodb-community
   
   # Windows
   net start MongoDB
   
   # Linux (systemd)
   sudo systemctl start mongod
   ```

3. **Install MongoDB Compass (GUI):**
   - Download from: https://www.mongodb.com/try/download/compass
   - Connect to: `mongodb://localhost:27017`

### Option 2: MongoDB Atlas (Cloud)

1. **Create account at:** https://www.mongodb.com/atlas
2. **Create a new cluster**
3. **Get connection string** and update MONGODB_URI in .env
4. **Whitelist your IP address**

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

### Careers/Jobs
- `GET /api/careers` - Get all careers (with filters)
- `GET /api/careers/:id` - Get single career
- `POST /api/careers` - Create career (Admin/Recruiter)
- `PUT /api/careers/:id` - Update career (Admin/Recruiter)
- `DELETE /api/careers/:id` - Delete career (Admin/Recruiter)
- `POST /api/careers/:id/apply` - Apply to job

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/save-job/:jobId` - Save/unsave job
- `GET /api/users/saved-jobs` - Get saved jobs
- `GET /api/users/applied-jobs` - Get applied jobs

### Admin
- `GET /api/users` - Get all users (Admin)
- `PUT /api/users/:userId/role` - Update user role (Admin)
- `GET /api/careers/admin/stats` - Get statistics (Admin)

## Database Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: ['user', 'admin', 'recruiter'],
  profile: {
    bio, skills, experience, education, location, etc.
  },
  savedJobs: [ObjectId],
  appliedJobs: [{ job: ObjectId, appliedAt: Date, status: String }]
}
```

### Career Model
```javascript
{
  title: String,
  company: String,
  location: String,
  type: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'],
  level: ['Entry', 'Mid', 'Senior', 'Lead', 'Executive'],
  category: String,
  salary: { min: Number, max: Number, currency: String },
  description: String,
  requirements: [String],
  responsibilities: [String],
  skills: [String],
  benefits: [String],
  applicationDeadline: Date,
  postedBy: ObjectId,
  applications: [{ user: ObjectId, appliedAt: Date, status: String }]
}
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### User Roles

- **user**: Can browse jobs, apply, save jobs
- **recruiter**: Can create, edit, delete own job postings
- **admin**: Full access to all features

## Sample API Requests

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "user"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@careersn.com",
    "password": "admin123"
  }'
```

### Get Jobs with Filters
```bash
curl "http://localhost:5000/api/careers?category=Technology&type=Full-time&page=1&limit=10"
```

### Create Job (Admin/Recruiter)
```bash
curl -X POST http://localhost:5000/api/careers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-token>" \
  -d '{
    "title": "Software Engineer",
    "company": "Tech Corp",
    "location": "San Francisco, CA",
    "type": "Full-time",
    "level": "Mid",
    "category": "Technology",
    "salary": { "min": 100000, "max": 130000 },
    "description": "Join our team...",
    "requirements": ["3+ years experience", "JavaScript", "React"],
    "responsibilities": ["Develop features", "Code reviews"],
    "skills": ["JavaScript", "React", "Node.js"],
    "applicationDeadline": "2024-12-31"
  }'
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/careersn` |
| `JWT_SECRET` | Secret key for JWT tokens | Required |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment mode | `development` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:5173` |

## Development

### Project Structure
```
server/
├── models/          # Database models
├── routes/          # API routes
├── middleware/      # Custom middleware
├── scripts/         # Utility scripts
├── .env            # Environment variables
├── server.js       # Main server file
└── package.json    # Dependencies
```

### Scripts
- `npm run dev` - Start with nodemon (auto-restart)
- `npm start` - Start production server
- `npm run seed` - Seed database with sample data

### Testing with MongoDB Compass

1. **Connect to database:**
   - Connection string: `mongodb://localhost:27017`
   - Database name: `careersn`

2. **View collections:**
   - `users` - User accounts
   - `careers` - Job postings

3. **Sample queries:**
   ```javascript
   // Find all active jobs
   { status: "active" }
   
   // Find jobs by category
   { category: "Technology" }
   
   // Find jobs with salary range
   { "salary.min": { $gte: 100000 } }
   ```

## Deployment

### Backend Deployment (Render/Railway)

1. **Create account** on Render.com or Railway.app
2. **Connect GitHub repository**
3. **Set environment variables**
4. **Deploy**

### Environment Variables for Production
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/careersn
JWT_SECRET=your-production-secret-key
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
```

## Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **JWT**: Secure authentication
- **Password Hashing**: bcrypt with salt rounds
- **Input Validation**: Mongoose schema validation

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error (development only)"
}
```

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## License

MIT License - see LICENSE file for details