const path = require('path');
const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const userRouter = require('./routes/userRoutes');
const jobCardRouter = require('./routes/jobCardRoutes');
const app = express();

app.enable('trust proxy');

// 1) GLOBAL MIDDLEWARES
// Implement CORS. cors() can also be added to a specific route as middle ware
// Allow everything
app.use(cors());

// Allow a specific subdomain only
// app.use(cors({
//   origin: 'https://www.natours.com'
// }))

// All routes
app.options('*', cors());

// specific route
// app.options('/api/v1/tours/:id', cors());

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Set security HTTP headers
app.use(helmet());


// Limit requests from same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 100,
  message:
    'Too many request are coming from this IP. Please try again in 1 hour',
});

app.use('/api', limiter);


// Body parser, reading data from the body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitisation against NoSQL query injection
app.use(mongoSanitize());

// Data sanitisation against XSS (cross site scripting) attacks
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

app.use(compression());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use('/api/v1/jobCards', jobCardRouter);
app.use('/api/v1/users', userRouter);

// Middleware to handle incorrect routes. Middleware runs in order
// so if it reaches this point then it means the routes didn't succeed
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server :(`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
