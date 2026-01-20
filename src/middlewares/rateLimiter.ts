import rateLimit from 'express-rate-limit';
import httpStatus from 'http-status';

export const authLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 3,
    skipSuccessfulRequests: false,
    keyGenerator: (req) => {
        return req.body.email || req.ip; 
    },
    message: {
        code: httpStatus.TOO_MANY_REQUESTS,
        message: 'Reached sending otp limit please try after 10 minutes.'
    }
});

export const perSecondLimit = rateLimit({
    windowMs: 1000,
    max: 1,
    skipSuccessfulRequests: false,
    message: {
        code: httpStatus.TOO_MANY_REQUESTS,
        message: 'Too many requests from you ip please try again later.'
    }
});
