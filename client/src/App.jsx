import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { publicRoutes } from './routes';
import { ToastContainer } from 'react-toastify';
import { UserProvider } from './contexts/UserContext';
import EventTheme from './layouts/EventTheme';
import { ModalProvider } from './contexts/ModalContext';
import { PlayerProvider } from './contexts/PlayerContext';
import { UserAuthProvider } from './contexts/UserAuthContext';
import { AdminAuthProvider } from './contexts/AdminAuthContext';
import { SocketProvider } from './contexts/SocketContext';

function App() {
    const renderRoute = (route, index) => {
        const Layout = route.layout ? route.layout : Fragment;
        const element = <Layout>{route.children ? <Outlet /> : <route.component />}</Layout>;

        const isAdminRoute = route.path.startsWith('/admin');
        const isAuthRoute = route.path.startsWith('/auth');

        let wrappedElement;
        if (isAdminRoute) {
            wrappedElement = <AdminAuthProvider>{element}</AdminAuthProvider>;
        } else if (isAuthRoute) {
            wrappedElement = (
                <UserAuthProvider>
                    <UserProvider>{element}</UserProvider>
                </UserAuthProvider>
            );
        } else {
            wrappedElement = (
                <UserAuthProvider>
                    <UserProvider>
                        <SocketProvider>
                            <PlayerProvider>{element}</PlayerProvider>
                        </SocketProvider>
                    </UserProvider>
                </UserAuthProvider>
            );
        }

        return (
            <Route key={index} path={route.path} element={wrappedElement}>
                {route.children &&
                    route.children.map((child, childIndex) =>
                        child.index ? (
                            <Route key={childIndex} index element={<child.component />} />
                        ) : (
                            <Route key={childIndex} path={child.path} element={<child.component />} />
                        ),
                    )}
            </Route>
        );
    };

    return (
        <div className="App">
            <ModalProvider>
                <Router>
                    <Routes>
                        {publicRoutes.map((route, index) => renderRoute(route, index))}

                        {/* Redirects */}
                        <Route path="/admin/*" element={<Navigate to="/admin/dashboard" replace />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </Router>
            </ModalProvider>

            <EventTheme />
            <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} closeOnClick pauseOnHover />
        </div>
    );
}

export default App;
