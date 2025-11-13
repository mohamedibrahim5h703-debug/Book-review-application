const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const books = require('../data/books');

const SECRET_KEY = 'access';
let users = [];

// تسجيل مستخدم جديد
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).send('Username and password required');

  if (users.find(u => u.username === username)) {
    return res.status(400).send('User already exists');
  }
  users.push({ username, password });
  res.send('User registered successfully');
});

// تسجيل الدخول
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).send('Invalid credentials');

  const accessToken = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ accessToken });
});

// Middleware للتحقق من JWT
function authenticateJWT(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.sendStatus(403);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// إضافة أو تعديل مراجعة كتاب
router.post('/books/:isbn/review', authenticateJWT, (req, res) => {
  const { review } = req.body;
  const isbn = req.params.isbn;
  books[isbn].reviews[req.user.username] = review;
  res.send('Review added/updated successfully');
});

// حذف مراجعة الكتاب الخاصة بالمستخدم
router.delete('/books/:isbn/review', authenticateJWT, (req, res) => {
  const isbn = req.params.isbn;
  delete books[isbn].reviews[req.user.username];
  res.send('Review deleted successfully');
});

module.exports = router;
