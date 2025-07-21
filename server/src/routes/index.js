// routes/index.js
import siteRouter from './site.js';
import authRouter from './auth.js';
import userRouter from './user.js';
import postRouter from './post.js';

function route(app) {
    app.use('/auth', authRouter);
    app.use('/user', userRouter);
    app.use('/posts', postRouter);
    app.use('/', siteRouter);
}

export default route;
