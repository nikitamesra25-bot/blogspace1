# BlogSpace - Full Stack Blog Application

BlogSpace is a full-stack blogging platform where users can create, read, update, and delete their blogs. Users can register, log in, and manage their own blog posts through a personal dashboard.

## Features

- User Registration and Login
- JWT Authentication
- Create New Blogs
- View All Blogs
- Read Individual Blog Details
- Edit Existing Blogs
- Delete Blogs
- Personal User Dashboard
- Logout Functionality
- Responsive User Interface

## Tech Stack

### Frontend
- React.js
- JavaScript
- HTML5
- CSS3
- React Router DOM
- Vite

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

## Project Structure

```text
blogspace1/
├── client/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── App.jsx
│       ├── App.css
│       └── main.jsx
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   └── server.js
│
├── .gitignore
└── README.md
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd blogspace1
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file inside the server folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend:

```bash
npm run dev
```

### 3. Setup Frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Open the frontend in your browser:

http://localhost:5173/

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |

### Blogs

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/blogs | Get all blogs |
| GET | /api/blogs/:id | Get single blog |
| POST | /api/blogs | Create blog |
| PUT | /api/blogs/:id | Update blog |
| DELETE | /api/blogs/:id | Delete blog |

Protected blog routes require a valid JWT token.

## Database

MongoDB is used to store:
- User information
- Blog title and content
- Blog category and image URL
- Blog author information

## Author

Developed as a Full Stack Web Development project.

## License

This project is created for educational purposes.
