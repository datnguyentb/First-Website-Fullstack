// routes/index.js
import authRouter from './auth/index.js';
import userRouter from './user/index.js';
import postRouter from './post/post.js';
import postInteraction from './post/postInteraction.js';
import friendshipRouter from './friendship/index.js';
import musicRouter from './music/index.js';
import chatRouter from './chat/index.js';
import NotificationsRouter from './notifications/index.js';
import PostCommentRouter from './comment/comment.js';
import BannerRouter from './banner/banner.js';
import ColisteningRouter from './coListening/coListening.js';

function route(app) {
    app.use('/auth', authRouter);
    app.use('/user', userRouter);
    app.use('/posts', postRouter);

    app.use('/notifications', NotificationsRouter);
    app.use('/post/interactions', postInteraction);
    app.use('/api/post/comments', PostCommentRouter);
    app.use('/api/friends', friendshipRouter);
    app.use('/api/music', musicRouter);
    app.use('/api/chat', chatRouter);
    app.use('/api/banners', BannerRouter);
    app.use('/api/co_listening', ColisteningRouter);
}

export default route;
