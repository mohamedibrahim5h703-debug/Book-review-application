const express = require('express');
const router = express.Router();
const books = require('../data/books');

// الحصول على جميع الكتب
router.get('/books', (req, res) => {
  res.json(books);
});

// البحث عن كتاب بواسطة ISBN
router.get('/books/:isbn', (req, res) => {
  const book = books[req.params.isbn];
  res.json(book || { message: 'Book not found' });
});

// البحث عن جميع الكتب بواسطة المؤلف
router.get('/books/author/:author', (req, res) => {
  const authorBooks = Object.values(books).filter(b => b.author === req.params.author);
  res.json(authorBooks);
});

// البحث عن جميع الكتب بواسطة العنوان
router.get('/books/title/:title', (req, res) => {
  const titleBooks = Object.values(books).filter(b => b.title === req.params.title);
  res.json(titleBooks);
});

// الحصول على مراجعات كتاب
router.get('/books/:isbn/review', (req, res) => {
  const book = books[req.params.isbn];
  res.json(book?.reviews || {});
});

module.exports = router;
