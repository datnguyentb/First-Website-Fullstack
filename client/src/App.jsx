import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes } from './routes';
import { ToastContainer } from 'react-toastify';
import { UserProvider } from './contexts/UserContext';
import EventTheme from './layouts/EventTheme';
import { ModalProvider } from './contexts/ModalContext';
import { PlayerProvider } from './contexts/PlayerContext';
import { UserAuthProvider } from './contexts/UserAuthContext';
import { AdminAuthProvider } from './contexts/AdminAuthContext';

function App() {
    return (
        <div className="App">
            <ModalProvider>
                <Router>
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;
                            const Layout = route.layout ? route.layout : Fragment;

                            const isAdminRoute = route.path.startsWith('/admin');

                            const element = (
                                <Layout>
                                    <Page />
                                </Layout>
                            );

                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        isAdminRoute ? (
                                            <AdminAuthProvider>{element}</AdminAuthProvider>
                                        ) : (
                                            <UserAuthProvider>
                                                <UserProvider>
                                                    <PlayerProvider>{element}</PlayerProvider>
                                                </UserProvider>
                                            </UserAuthProvider>
                                        )
                                    }
                                />
                            );
                        })}

                        {/* Catch all admin wrong paths -> redirect về dashboard */}
                        <Route path="/admin/*" element={<Navigate to="/admin/dashboard" replace />} />

                        {/* Catch all normal wrong paths -> redirect về home */}
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
