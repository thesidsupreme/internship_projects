const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory storage for books
let books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925,
    genre: "Fiction"
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    year: 1960,
    genre: "Fiction"
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    year: 1949,
    genre: "Dystopian Fiction"
  }
];

// Helper function to generate next ID
const getNextId = () => {
  return books.length > 0 ? Math.max(...books.map(book => book.id)) + 1 : 1;
};

// Helper function to find book by ID
const findBookById = (id) => {
  return books.find(book => book.id === parseInt(id));
};

// GET /api/books - Get all books
app.get('/api/books', (req, res) => {
  res.json({
    success: true,
    count: books.length,
    data: books
  });
});

// GET /api/books/:id - Get a specific book by ID
app.get('/api/books/:id', (req, res) => {
  const book = findBookById(req.params.id);
  
  if (!book) {
    return res.status(404).json({
      success: false,
      message: 'Book not found'
    });
  }
  
  res.json({
    success: true,
    data: book
  });
});

// POST /api/books - Create a new book
app.post('/api/books', (req, res) => {
  const { title, author, year, genre } = req.body;
  
  // Validation
  if (!title || !author) {
    return res.status(400).json({
      success: false,
      message: 'Title and author are required'
    });
  }
  
  const newBook = {
    id: getNextId(),
    title,
    author,
    year: year || null,
    genre: genre || null
  };
  
  books.push(newBook);
  
  res.status(201).json({
    success: true,
    message: 'Book created successfully',
    data: newBook
  });
});

// PUT /api/books/:id - Update a book
app.put('/api/books/:id', (req, res) => {
  const bookIndex = books.findIndex(book => book.id === parseInt(req.params.id));
  
  if (bookIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Book not found'
    });
  }
  
  const { title, author, year, genre } = req.body;
  
  // Validation
  if (!title || !author) {
    return res.status(400).json({
      success: false,
      message: 'Title and author are required'
    });
  }
  
  // Update the book
  books[bookIndex] = {
    ...books[bookIndex],
    title,
    author,
    year: year || books[bookIndex].year,
    genre: genre || books[bookIndex].genre
  };
  
  res.json({
    success: true,
    message: 'Book updated successfully',
    data: books[bookIndex]
  });
});

// DELETE /api/books/:id - Delete a book
app.delete('/api/books/:id', (req, res) => {
  const bookIndex = books.findIndex(book => book.id === parseInt(req.params.id));
  
  if (bookIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Book not found'
    });
  }
  
  const deletedBook = books.splice(bookIndex, 1)[0];
  
  res.json({
    success: true,
    message: 'Book deleted successfully',
    data: deletedBook
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Books REST API',
    version: '1.0.0',
    endpoints: {
      'GET /api/books': 'Get all books',
      'GET /api/books/:id': 'Get book by ID',
      'POST /api/books': 'Create new book',
      'PUT /api/books/:id': 'Update book by ID',
      'DELETE /api/books/:id': 'Delete book by ID'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// Handle 404 for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📚 Books API is ready!`);
  console.log(`📖 API Documentation available at http://localhost:${PORT}`);
});

module.exports = app;