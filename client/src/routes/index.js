import { Home, Todo, MusicPlayer } from '../pages';
import { Login, Register, AdminLogin } from '../pages/Auth';
import { MainLayout, AuthLayout, NoRightSlidebar } from '../layouts';
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
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
