// routes/index.js
import siteRouter from './site.js';
import authRouter from './auth.js';
import meRouter from './me.js';

function route(app) {
    app.use('/auth', authRouter);
    app.use('/me', meRouter);
    app.use('/', siteRouter);
}

export default route;
