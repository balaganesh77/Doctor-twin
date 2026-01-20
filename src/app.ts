import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import passport from 'passport';
import httpStatus from 'http-status';
import config from './config/config';
import morgan from './config/morgan';
import xss from './middlewares/xss';
import { errorConverter, errorHandler } from './middlewares/error';
import ApiError from './utils/ApiError';
import route from './routes'

const app = express();

if (config.env !== 'test') {
    app.use(morgan.successHandler);
    app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());
const router = express.Router();

// parse json request body
app.use(express.json({ limit: '50mb' }));

// parse urlencoded request body
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options(/.*/, cors());

// jwt authentication
app.use(passport.initialize() as express.RequestHandler);

// v1 api routes
app.use('/v1', route);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found - URL: ' + fullUrl));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);




export default app;
