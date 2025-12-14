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

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(morgan('dev')); // middleware log

// ⬇️ middleware to handle "Payload Too Large" (413) errors
app.use((err, req, res, next) => {
    if (err.type === 'entity.too.large') {
        return res.status(413).json({ message: 'Request body too large' });
    }
    next(err);
});

// Route root để trả về 200
app.get('/', (req, res) => {
    res.status(200).json({ message: 'API is running' });
});

routes(app);
adminRoutes(app);

export default app;
