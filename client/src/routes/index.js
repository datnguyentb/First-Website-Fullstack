import { Home, Todo, MusicPlayer, AdminDashboard } from '../pages';
import { Login, Register } from '../pages/Auth';
import { AdminLogin, AdminUser, AdminPosts, AdminMusic } from '~/pages/Admin';
import { MainLayout, AuthLayout, OnlyHeader, AdminLayout } from '../layouts';
import config from '../config';

const publicRoutes = [
    {
        path: config.routes.home,
        component: Home,
        layout: MainLayout,
    },
    {
        path: config.routes.todo,
        component: Todo,
        layout: MainLayout,
    },
    {
        path: config.routes.login,
        component: Login,
        layout: AuthLayout,
    },
    {
        path: config.routes.register,
        component: Register,
        layout: AuthLayout,
    },
    {
        path: config.routes.musicPlayer,
        component: MusicPlayer,
        layout: OnlyHeader,
    },
    {
        path: config.routes.adminLogin,
        component: AdminLogin,
    },
    {
        path: config.routes.adminDashboard,
        component: AdminDashboard,
        layout: AdminLayout,
    },
    {
        path: config.routes.adminUsers,
        component: AdminUser,
        layout: AdminLayout,
    },
    {
        path: config.routes.adminPosts,
        component: AdminPosts,
        layout: AdminLayout,
    },
    {
        path: config.routes.adminMusic,
        component: AdminMusic,
        layout: AdminLayout,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
