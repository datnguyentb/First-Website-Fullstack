import express from 'express';
import routes from './routes/index.js';
import adminRoutes from './routes/admin/index.js';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import db_connect from './config/database/index.js';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

//connect to DB
db_connect();

app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    }),
);

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    }),
);

//truy cập vào thư mục upload
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); // middleware log
routes(app);
adminRoutes(app);

export default app;
