import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import { ToastContainer } from 'react-toastify';
import { UserProvider } from './contexts/UserContext';
import EventTheme from './layouts/EventTheme';
import { ModalProvider } from './contexts/ModalContext';

function App() {
    // document.addEventListener('contextmenu', function (e) {
    //     e.preventDefault();
    // });

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
                                    element={isAdminRoute ? element : <UserProvider>{element}</UserProvider>}
                                />
                            );
                        })}
                    </Routes>
                </Router>
            </ModalProvider>
            <EventTheme />
            <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} closeOnClick pauseOnHover />
        </div>
    );
}

export default App;
