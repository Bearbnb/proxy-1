const express = require('express');
const morgan = require('morgan');
const path = require('path');
const proxy = require('express-http-proxy');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use('/:id', express.static(path.join(__dirname, 'public')));

const server1 = 'http://localhost:3001';
const server2 = 'http://localhost:3002';
const server3 = 'http://localhost:3003';
const server4 = 'http://localhost:3004';

app.get('/descriptions/:id', proxy(server1));
app.get('/photos/:id', proxy(server2));
app.get('/bookings/:id', proxy(server3));
app.get('/reviews/:id', proxy(server4));

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
