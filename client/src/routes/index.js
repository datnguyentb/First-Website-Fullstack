import { Home, Todo, MusicPlayer, AdminDashboard, MusicPlaylist, Messages } from '../pages';
import { Login, Register } from '../pages/Auth';
import { AdminLogin, AdminUser, AdminPosts, AdminMusic } from '~/pages/Admin';
import { MainLayout, AuthLayout, PlayerLayout, AdminLayout, NavigationOnly } from '../layouts';
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
        path: config.routes.messages,
        component: Messages,
        layout: NavigationOnly,
    },
    {
        path: config.routes.register,
        component: Register,
        layout: AuthLayout,
    },
    {
        path: config.routes.musicPlayer,
        component: MusicPlayer,
        layout: PlayerLayout,
        children: [
            { index: true, component: MusicPlayer },
            { path: 'playlist/:id', component: MusicPlaylist },
        ],
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
