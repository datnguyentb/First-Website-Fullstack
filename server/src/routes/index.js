// routes/index.js
import siteRouter from './site.js';
import authRouter from './auth.js';
import userRouter from './user.js';

function route(app) {
    app.use('/auth', authRouter);
    app.use('/user', userRouter);
    app.use('/', siteRouter);
}

export default route;
