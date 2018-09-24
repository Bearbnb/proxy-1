const express = require('express');
const morgan = require('morgan');
const path = require('path');
const proxy = require('express-http-proxy');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use('/:id', express.static(path.join(__dirname, 'public')));

const descriptions = 'http://bearbnbdescription-env1.b4nkf45hnu.us-west-2.elasticbeanstalk.com';
const photos = 'http://eastphotos-env.fdvpa3pswm.us-east-1.elasticbeanstalk.com/';
const bookings = 'http://bearbnbbooking-env.bz7dpdnrpj.us-west-1.elasticbeanstalk.com';
const reviews = 'http://bearbnbreviews-env.rppvejjmcc.us-east-1.elasticbeanstalk.com';

app.get('/descriptions/:id', proxy(descriptions));
app.get('/photos/:id', proxy(photos));
app.get('/bookings/:id', proxy(bookings));
app.get('/reviews/:id', proxy(reviews));
app.get('/bookings/:id/check_in/:date', proxy(bookings));
app.post('/bookings/:id/check_in/:date/check_out/:date', proxy(bookings));

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
