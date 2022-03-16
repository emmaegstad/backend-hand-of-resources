const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.get('/', (req, res) => {
  res.send('Hit root route');
});

app.use('/api/v1/cats', require('./controllers/cats'));
app.use('/api/v1/dogs', require('./controllers/dogs'));
app.use('/api/v1/bees', require('./controllers/bees'));
app.use('/api/v1/critters', require('./controllers/critters'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
