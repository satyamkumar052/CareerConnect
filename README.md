# 📋 Job Listing Portal

A full-stack web application for posting, browsing, and managing job listings. Built with Node.js, Express, and MongoDB, this portal allows users to create accounts, post job opportunities, and manage their listings with a clean and intuitive interface.

---

## ✨ Features

- **User Authentication**: Secure user registration and login using Passport.js with local strategy
- **Job Listing Management**: Full CRUD (Create, Read, Update, Delete) operations for job postings
- **Job Details**: Each job includes title, company, location, salary, and detailed description
- **User-Based Authorization**: Only job creators can edit or delete their own listings
- **Form Validation**: Server-side and client-side validation using Joi schemas
- **Flash Messages**: Real-time feedback for user actions (success, error, warnings)
- **Responsive Design**: Bootstrap-powered UI with EJS templating for dynamic content
- **Session Management**: Secure session handling with MongoDB session store
- **RESTful API**: Standard HTTP methods for resource operations

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Backend** | [Node.js](https://nodejs.org), [Express.js](https://expressjs.com) |
| **Database** | [MongoDB](https://www.mongodb.com), [Mongoose](https://mongoosejs.com) |
| **Authentication** | [Passport.js](http://www.passportjs.org), [Passport-Local](https://github.com/jaredhanson/passport-local) |
| **Frontend** | [EJS](https://ejs.co), [Bootstrap](https://getbootstrap.com) |
| **Middlewares** | express-session, connect-mongo, connect-flash, method-override |
| **Validation** | [Joi](https://joi.dev) |
| **Development** | [Nodemon](https://nodemon.io) |

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js**
- **npm**
- **MongoDB**

---

## ⚙️ Installation

1. **Clone the repository** (or extract the project files)
   ```bash
   cd Job
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Ensure MongoDB is running**
   - On Windows: Launch MongoDB manually or use MongoDB Compass
   - Default connection: `mongodb://127.0.0.1:27017/listingjob`

4. **(Optional) Initialize sample data**
   ```bash
   node init/index.js
   ```
   This populates the database with sample job listings and user accounts.

5. **Start the development server**
   ```bash
   npm start
   ```

6. **Access the application**
   - Open your browser and navigate to: `http://localhost:8080`

---

## 🚀 Usage

### User Registration & Login
1. Click **Sign Up** to create a new account
2. Provide username and password
3. Log in with your credentials

### Creating a Job Listing
1. Log in to your account
2. Click **Post a Job** button
3. Fill in the job details:
   - **Title**: Job position name
   - **Company**: Employer name
   - **Location**: Job location
   - **Salary**: Annual salary (numeric value)
   - **Description**: Detailed job description
4. Click **Submit** to publish

### Managing Listings
- **View All**: Browse all job listings on the home page
- **View Details**: Click on a job card to see full information
- **Edit**: Update job details (only available for your own listings)
- **Delete**: Remove a job listing permanently

---


## 🗄️ Database Schema

### Job Model
```javascript
{
  title: String (required),
  company: String (required),
  location: String (required),
  salary: Number (required),
  description: String (required),
  createdBy: ObjectId (references User)
}
```

### User Model
```javascript
{
  username: String (unique, managed by Passport),
  password: String (hashed, managed by Passport),
  email: String (required)
}
```

---

## 🛣️ API Routes

### Authentication Routes (`/user`)
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/user/signup` | Render signup form |
| POST | `/user/signup` | Register new user |
| GET | `/user/login` | Render login form |
| POST | `/user/login` | Authenticate user |
| GET | `/user/logout` | Logout user |

### Job Routes (`/jobs`)
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/jobs` | List all jobs |
| GET | `/jobs/new` | Render job creation form |
| POST | `/jobs` | Create new job |
| GET | `/jobs/:id` | View job details |
| GET | `/jobs/:id/edit` | Render job edit form |
| PUT | `/jobs/:id` | Update job |
| DELETE | `/jobs/:id` | Delete job |

---

## 🔒 Security Features

- **Password Hashing**: Passwords are hashed using Passport-Local-Mongoose
- **Session Management**: Secure sessions stored in MongoDB
- **Authorization**: Users can only modify their own listings
- **Input Validation**: All inputs validated with Joi schemas
- **Error Handling**: Centralized error handling with custom middleware
- **HTTP Method Override**: Supports DELETE and PUT operations via POST

---

## 📝 Validation Rules

Job listings are validated against the following schema:

| Field | Validation |
|-------|-----------|
| Title | String, Required |
| Company | String, Required |
| Location | String, Required |
| Salary | Number, Min 0, Required |
| Description | String, Required |

---

## 🚨 Error Handling

The application includes custom error handling:
- **ExpressError**: Custom error class for application errors
- **wrapAsync**: Wrapper function for handling async route errors
- **Flash Messages**: User-friendly error notifications
- **Centralized Error Handler**: Routes errors through middleware for consistent handling

---

## 🤝 Contributing

Contributions are welcome! To contribute:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---
