import express from 'express';
import routes from './routes/index.js';
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

// Middleware to handle CORS
// Allow requests from the frontend (React app) and enable credentials
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    }),
);

app.use(
    session({
        secret: 'your_secret_key',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }, // dùng secure: true nếu chạy HTTPS
    }),
);

//truy cập vào thư mục upload
app.use('/uploads', express.static(path.join(process.cwd(), 'src/uploads')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); // middleware log
routes(app);

export default app;
