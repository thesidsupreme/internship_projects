# Books REST API

A simple REST API for managing books built with Node.js and Express.js. This project demonstrates CRUD operations with in-memory storage.

## 🚀 Features

- **GET** `/api/books` - Retrieve all books
- **GET** `/api/books/:id` - Retrieve a specific book by ID
- **POST** `/api/books` - Create a new book
- **PUT** `/api/books/:id` - Update an existing book
- **DELETE** `/api/books/:id` - Delete a book

## 🛠️ Technologies Used

- Node.js
- Express.js
- JavaScript (ES6+)

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Postman (for testing)

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/books-rest-api.git
cd books-rest-api
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The server will start on `http://localhost:3000`

## 📖 API Endpoints

### Get All Books
```http
GET /api/books
```

**Response:**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 1,
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "year": 1925,
      "genre": "Fiction"
    }
  ]
}
```

### Get Book by ID
```http
GET /api/books/1
```

### Create New Book
```http
POST /api/books
Content-Type: application/json

{
  "title": "Book Title",
  "author": "Author Name",
  "year": 2023,
  "genre": "Fiction"
}
```

### Update Book
```http
PUT /api/books/1
Content-Type: application/json

{
  "title": "Updated Title",
  "author": "Updated Author",
  "year": 2024,
  "genre": "Non-Fiction"
}
```

### Delete Book
```http
DELETE /api/books/1
```

## 🧪 Testing with Postman

1. Open Postman
2. Import the collection or create requests manually
3. Set the base URL to `http://localhost:3000`
4. Test each endpoint with appropriate HTTP methods

### Sample Test Data
```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "year": 2008,
  "genre": "Programming"
}
```

## 📁 Project Structure

```
books-rest-api/
├── server.js          # Main application file
├── package.json       # Dependencies and scripts
├── README.md         # Project documentation
└── .gitignore        # Git ignore file
```

## 🚦 Error Handling

The API includes comprehensive error handling:

- **400 Bad Request** - Missing required fields
- **404 Not Found** - Book or route not found
- **500 Internal Server Error** - Server errors

## 🔄 Sample Workflow

1. **Start the server**: `npm start`
2. **Get all books**: `GET /api/books`
3. **Create a book**: `POST /api/books` with JSON body
4. **Update a book**: `PUT /api/books/1` with JSON body
5. **Delete a book**: `DELETE /api/books/1`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Your Name** - Internship Project

## 🎯 Learning Objectives

This project demonstrates:
- Building RESTful APIs with Express.js
- CRUD operations implementation
- Error handling in Node.js
- JSON data manipulation
- HTTP status codes usage
- API documentation

---

**Note**: This API uses in-memory storage. Data will be lost when the server restarts. In production, you would typically use a database like MongoDB, PostgreSQL, or MySQL.