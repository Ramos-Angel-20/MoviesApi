import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { config } from 'dotenv';

config();

passport.use(
    'auth-google-login',
    new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: 'http://localhost:4000/api/v1/auth/login/google'
    }, (accessToken, refreshToken, profile, done) => {

        const user = profile;
        done(null, user);
    })
);

passport.use(
    'auth-google-register',
    new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: 'http://localhost:4000/api/v1/auth/register/google'
    }, (accessToken, refreshToken, profile, done) => {
        
        const user = profile;
        done(null, user);
    })
);