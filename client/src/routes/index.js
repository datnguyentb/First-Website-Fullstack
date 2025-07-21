import { Home, Todo, MusicPlayer, AdminDashboard, AdminUser } from '../pages';
import { Login, Register, AdminLogin } from '../pages/Auth';
import { MainLayout, AuthLayout, NoRightSlidebar, AdminLayout } from '../layouts';
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
        layout: NoRightSlidebar,
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
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
