// routes/index.js
import authRouter from './auth/index.js';
import userRouter from './user/index.js';
import postRouter from './post/post.js';
import postInteraction from './post/postInteraction.js';
import friendshipRouter from './friendship/index.js';
import musicRouter from './music/index.js';
import chatRouter from './chat/index.js';

function route(app) {
    app.use('/auth', authRouter);
    app.use('/user', userRouter);
    app.use('/posts', postRouter);
    app.use('/post/interactions', postInteraction);
    app.use('/api/friends', friendshipRouter);
    app.use('/api/music', musicRouter);
    app.use('/api/chat', chatRouter);
}

export default route;
