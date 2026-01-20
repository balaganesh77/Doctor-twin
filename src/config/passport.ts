import prisma from '../client';
import { Strategy as JwtStrategy, ExtractJwt, VerifyCallback } from 'passport-jwt';
import config from './config';

const jwtOptions = {
    secretOrKey: config.jwt.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

const jwtVerify: VerifyCallback = async (payload, done) => {
    try {
        if (payload.type !== 'ACCESS') {
            throw new Error('Invalid token type');
        }
    } catch (error) {
        done(error, false);
    }
};

export const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);
