import AdminAuthRouter from './adminAuth.js';
import AdminUserRouter from './adminUser.js';
import AdminPostRouter from './adminPost.js';
import AdminMusicRouter from './adminMusic.js';
import AdminBannerRouter from './adminBanner.js';

function route(app) {
    app.use('/admin/auth', AdminAuthRouter);
    app.use('/admin/user', AdminUserRouter);
    app.use('/admin/post', AdminPostRouter);
    app.use('/admin/music', AdminMusicRouter);
    app.use('/admin/banner', AdminBannerRouter);
}

export default route;
