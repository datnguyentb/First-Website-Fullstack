import { Home, Todo, MusicPlayer, AdminDashboard, MusicPlaylist, Messenger, CoListening } from '../pages';
import RoomView from '~/pages/CoListening/components/RoomView';
import { Login, Register } from '../pages/Auth';
import { AdminLogin, AdminUser, AdminPosts, AdminMusic, AdminBannerManagement } from '~/pages/Admin';
import { MainLayout, AuthLayout, PlayerLayout, AdminLayout, NavigationOnly } from '~/layouts';
import config from '../config';
import { AppRoute } from '@/types/route';
import Post from '~/pages/Post';
import Lobby from '~/pages/CoListening/components/Lobby';

const publicRoutes: AppRoute[] = [
    {
        path: config.routes.home,
        component: Home,
        layout: MainLayout,
    },
    {
        path: config.routes.todo,
        component: Todo,
        layout: NavigationOnly,
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
        path: config.routes.adminBanerMangement,
        component: AdminBannerManagement,
        layout: AdminLayout,
    },
    {
        path: config.routes.coListening,
        component: CoListening,
        layout: null,
        children: [
            { index: true, component: CoListening },
            { path: 'room/:id', component: RoomView },
            { path: 'public-rooms', component: Lobby },
        ],
    },
    {
        path: config.routes.post,
        component: Post,
        layout: null,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
