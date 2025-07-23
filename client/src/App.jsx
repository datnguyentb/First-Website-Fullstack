import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import { ToastContainer } from 'react-toastify';
import { UserProvider } from './contexts/UserContext';

function App() {
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault(); // Ngăn hiện menu mặc định
    });

    return (
        <div className="App">
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
            <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} closeOnClick pauseOnHover />
        </div>
    );
}

export default App;
