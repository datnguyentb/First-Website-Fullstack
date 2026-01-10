import { Home, Todo, MusicPlayer, AdminDashboard, MusicPlaylist, Messenger, CoListening } from '../pages';
import { Login, Register } from '../pages/Auth';
import { AdminLogin, AdminUser, AdminPosts, AdminMusic } from '~/pages/Admin';
import { MainLayout, AuthLayout, PlayerLayout, AdminLayout, NavigationOnly } from '../layouts';
import config from '../config';
import { AppRoute } from '@/types/route';

const publicRoutes: AppRoute[] = [
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
        path: config.routes.messenger,
        component: Messenger,
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
    {
        path: config.routes.coListening,
        component: CoListening,
        layout: null,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
