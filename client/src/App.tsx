import { Fragment } from 'react';
import type { ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { publicRoutes } from './routes';
import { ToastContainer } from 'react-toastify';

import { UserProvider } from './contexts/UserContext/UserContext';
import { ModalProvider } from './contexts/ModalContext';
import { PlayerProvider } from './contexts/PlayerContext';
import { UserAuthProvider } from './contexts/UserAuthContext';
import { AdminAuthProvider } from './contexts/AdminAuthContext/AdminAuthContext';
import { SocketProvider } from './contexts/socket/SocketContext';
import { ChatWidgetProvider } from './contexts/ChatWidgetContext/ChatWidgetContext';
import { ConversationProvider } from './contexts/conversationContext/ConversationContext';
import { MessageCacheProvider } from './contexts/messageCache/MessageCacheContext';
import { ToastProvider } from './contexts/ToastContext/ToastContext';

import EventTheme from './layouts/EventTheme';
import { ProtectedUserRoute } from './components/ProtectedRoute';

import { AppRoute } from './types/route';
import { NotificationsProvider } from './contexts/NotificationsContext/NotificationsContext';

function App() {
    const renderRoute = (route: AppRoute, index: number) => {
        const Layout = route.layout ?? Fragment;

        const element = <Layout>{route.children ? <Outlet /> : <route.component />}</Layout>;

        const isAdminRoute = route.path?.startsWith('/admin');
        const isAuthRoute = route.path?.startsWith('/auth');
        const isChatWidgetRoute = route.path === '/' || route.path?.startsWith('/todo');

        let wrappedElement: ReactNode;

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
                <ProtectedUserRoute>
                    <UserAuthProvider>
                        <NotificationsProvider>
                            <UserProvider>
                                <PlayerProvider>
                                    <ToastProvider>
                                        <ConversationProvider>
                                            <MessageCacheProvider>
                                                <SocketProvider>
                                                    {isChatWidgetRoute ? (
                                                        <ChatWidgetProvider>{element}</ChatWidgetProvider>
                                                    ) : (
                                                        element
                                                    )}
                                                </SocketProvider>
                                            </MessageCacheProvider>
                                        </ConversationProvider>
                                    </ToastProvider>
                                </PlayerProvider>
                            </UserProvider>
                        </NotificationsProvider>
                    </UserAuthProvider>
                </ProtectedUserRoute>
            );
        }

        return (
            <Route key={index} path={route.path} element={wrappedElement}>
                {route.children?.map((child: AppRoute, childIndex: number) =>
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
                        {publicRoutes.map(renderRoute)}

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
