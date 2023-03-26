import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { json, urlencoded } from 'body-parser';
import session from 'express-session';
import 'dotenv/config'

import config from './config';
import errorHandler from './middleware/errorHandler';
import { successResponse } from './utils/response';
import { connect } from './utils/db';
import itemRouter from './routes/item.router';
import folderRouter from './routes/folder.router';
import userRouter from './routes/user.router';
import requireAuth from './middleware/auth';

export const app = express();

// Middleware
app.disable('x-powered-by')
app.use(cors(
    {
        origin: config.clientUrl,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],
        credentials: true
    }
))
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(session({
    name: 'uid',
    secret: config.secrets.session,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: config.env === 'production' ? 'none' : 'lax',
        secure: config.env === 'production',
    }
}))

// Routes
app.get('/', (_req, res) => {
    res.json(successResponse({ "message": "Server is running" }));
})

app.use('/api/auth', userRouter)

app.use(requireAuth)
app.use('/api/folder', folderRouter)
app.use('/api/item', itemRouter)



// handle errors
app.use(errorHandler)

export const start = async () => {
    try {
        await connect();
        app.listen(config.port, () => {
            console.log(`App listening on PORT: ${config.port}`)
        })
    } catch (e) {
        console.error(e)
    }
}