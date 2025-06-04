import { Home, Todo } from '../pages';
import { Login, Register } from '../pages/Auth';
import { MainLayout, AuthLayout } from '../layouts';
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
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
