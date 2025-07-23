import AdminAuthRouter from './adminAuth.js';
import AdminUserRouter from './adminUser.js';
import AdminPostRouter from './adminPost.js';

function route(app) {
    app.use('/admin/auth', AdminAuthRouter);
    app.use('/admin/user', AdminUserRouter);
    app.use('/admin/post', AdminPostRouter);
}

export default route;
