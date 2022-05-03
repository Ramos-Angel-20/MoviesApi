import express from 'express';
import { config } from 'dotenv';
import passport from 'passport';

import { dbConnect } from './db/connection.js';
import authRouter from './routes/auth.routes.js';
import './middlewares/passport-google.js';

/**
 * PORT=4000

CLIENT_ID=419599270575-2rskkahat7gmg7sv46ns7dpr6a1dgdld.apps.googleusercontent.com
CLIENT_SECRET=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

JWT_SECRET=MIMAMAMEMIMA
 */

const app = express();


// Middlewares
app.use(express.json());
config();
app.use(passport.initialize());


// Rutas
app.use('/api/v1/auth', authRouter);


dbConnect().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`server on port ${process.env.PORT}`);
    });
}).catch(err => console.log(err));