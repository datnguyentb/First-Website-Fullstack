// routes/index.js
import siteRouter from './site.js';
import authRouter from './auth.js';

function route(app) {
    app.use('/auth', authRouter);
    app.use('/', siteRouter);
}

export default route;
