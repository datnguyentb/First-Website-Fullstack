import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './AdminLogin.module.scss';
import useAdminLogin from '~/hooks/admin/auth/useAdminLogin';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import authAdminApi from '~/api/admin/authAdminApi';

const cx = classNames.bind(styles);

const AdminLogin = () => {
    const [isValid, setIsValid] = useState(null);
    const token = localStorage.getItem('adminToken');
    const { Login, loading, setLoading } = useAdminLogin();
    const [formData, setFormData] = useState({ email: '', password: '' });

    useEffect(() => {
        document.title = 'Twirl | Admin Login';
    }, []);

    //Check Login
    useEffect(() => {
        const verifyToken = async () => {
            if (!token) {
                setIsValid(false); // Không có token
                return;
            }

            try {
                await authAdminApi.checkToken();
                setIsValid(true);
            } catch {
                setIsValid(false);
            }
        };

        verifyToken();
    }, [token]);

    if (isValid) {
        return <Navigate to="/admin/dashboard" replace />;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Helpers
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await Login(formData);
        if (res) {
            toast.success('Login successful!', { autoClose: 1000 });
            await delay(1000);
            setLoading(false);
            return <Navigate to="/admin/dashboard" replace />;
        } else {
            toast.error('Login failed. Please try again.', { autoClose: 1000 });
            setLoading(false);
        }
    };

    return (
        <div className={cx('admin-login-wrapper', 'd-flex', 'justify-content-center', 'mt-5')}>
            <form
                onSubmit={handleSubmit}
                className={cx('p-4', 'shadow', 'bg-white', 'rounded', 'w-100')}
                style={{ maxWidth: '400px' }}
            >
                <h4 className="text-center mb-4">Admin Login</h4>

                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input
                        type="email"
                        name="email"
                        className={cx('form-control', 'input-custom')}
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        name="password"
                        className={cx('form-control', 'input-custom')}
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className={cx('btn btn-dark', 'w-100', 'btn-custom')}>
                    {loading ? <span className={cx('spinner')} /> : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;
