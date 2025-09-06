// routes/index.js
import siteRouter from './site.js';
import authRouter from './auth.js';
import userRouter from './user.js';
import postRouter from './post.js';
import postInteractionRouter from './postInteraction.js';
import friends from './friends.js';
import spotify from './spotify.js';
import musicRouter from './music/index.js';

function route(app) {
    app.use('/auth', authRouter);
    app.use('/user', userRouter);
    app.use('/posts', postRouter);
    app.use('/posts/interact', postInteractionRouter);
    app.use('/api/friends', friends);
    app.use('/api/spotify', spotify);
    app.use('/api/music', musicRouter);
    app.use('/', siteRouter);
}

export default route;
