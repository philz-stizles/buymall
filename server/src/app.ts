import path from 'path';
import express from 'express';
import expressRateLimit from 'express-rate-limit';
import helmet from 'helmet';
// import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import {
  globalErrorHandler,
  notFoundHandler,
  xssHandler,
} from '@src/middlewares';
import routes from '@src/routes';
import config from '@src/config';

// initialize express application.
const app = express();

app.set('trust proxy', 1);

// Security - set security HTTP headers
app.use(helmet({ contentSecurityPolicy: false }));

// parse json request body
app.use(express.json({ limit: '10kb' })); // This would limit the body size to 10kb
app.use(express.urlencoded({ extended: true, limit: '10kb' })); // This would limit the body size to 10kb
app.use(cookieParser()); // Parses data from cookies

// Security - sanitize request data (Data sanitization) against >> XSS - cross site scripting
app.use(xssHandler()); // This would clean any user input from malicious html code

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// SERVING STATIC FILES
app.use(express.static(path.join(__dirname, 'static')))
app.use(express.static(path.join(__dirname, 'public'))); // This says, anytime there is a request from the
// server, look in the public folder e.g for http://localhost:5000/overview.html, overview should be placed
// in the root of the public folder
// app.use(express.static(path.join(__dirname, 'uploads')));

// SECURITY - Anti Brute Force Attacks - Set rate limiting
// app.use(
//   '/api',
//   expressRateLimit({
//     // By specifying api, this would then affect all the routes since they all have /api
//     max: 100, // no of requests per IP
//     windowMs: 60 * 60 * 1000, // per period(1 hr)
//     message: {
//       status: 429,
//       message: 'Too many requests from this IP, please try again in an hour',
//     },
//   })
// );

// STRIPE CHECKOUT WEBHOOK
// When we needs this body in a raw form
// app.post('/webhook-checkout', express.raw({ type: 'application/json' }), webhookCheckout);

// SECURITY - Data sanitization against NoSQL query injection
// app.use(mongoSanitize()); // It will look at the req.body, req.query and req.params, and basically
// filter out all of the dollar($) signs and dots(.) in the values

// SECURITY - Prevent parameter pollution
// app.use(
//   hpp({
//     whitelist: ['duration', 'price'], // specify parameters that can be duplicated in the query
//   })
// );

// api routes
app.use(config.api.baseEndpoint, routes);

// Handle unhandled routes - routes that are not graphql and are not caught by any routers.
app.all('/^(?!graphql$)/', notFoundHandler);

// Global error handling.
app.use(globalErrorHandler);

export default app;
