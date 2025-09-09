// routes/index.js
import authRouter from './auth/index.js';
import userRouter from './user/index.js';
import postRouter from './post/index.js';
import friendshipRouter from './friendship/index.js';
import musicRouter from './music/index.js';

function route(app) {
    app.use('/auth', authRouter);
    app.use('/user', userRouter);
    app.use('/posts', postRouter);
    app.use('/api/friends', friendshipRouter);
    app.use('/api/music', musicRouter);
}

export default route;
