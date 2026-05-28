const routes = {
    home: '/',
    todo: '/todo',
    messenger: '/messenger',
    login: '/auth/login',
    register: '/auth/register',
    musicPlayer: '/music',
    adminLogin: '/admin/login',
    adminDashboard: '/admin/dashboard',
    adminUsers: '/admin/users',
    adminPosts: '/admin/posts',
    adminMusic: '/admin/music',
    coListening: '/co-listening',
    post: '/post/:id',
} as const;

export default routes;
