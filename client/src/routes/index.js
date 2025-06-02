import Home from "../pages/Home"
import Todo from "../pages/Todo"
import MainLayout from "../layouts/MainLayout"

const publicRoutes = [
    {
        path:  "/",
        component: Home,
        layout: MainLayout
    },
    {
        path:  "/todo",
        component: Todo,
    }
]

const privateRoutes = [

]

export { publicRoutes, privateRoutes }