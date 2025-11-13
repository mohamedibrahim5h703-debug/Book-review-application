const express = require('express');
const bodyParser = require('body-parser');
const generalRoutes = require('./routes/general');
const authRoutes = require('./routes/auth_users');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use('/', generalRoutes);
app.use('/', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
