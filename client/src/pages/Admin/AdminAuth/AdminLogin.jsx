import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './AdminLogin.module.scss';
import useAdminLogin from '~/hooks/admin/auth/useAdminLogin';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAdminCheckToken from '~/hooks/admin/checKToken/useAdminCheckToken';
import { userAdminAuthContext } from '~/contexts';

const cx = classNames.bind(styles);

const AdminLogin = () => {
    const { Login, loading, setLoading } = useAdminLogin();
    const { login } = userAdminAuthContext();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Twirl | Admin Login';
    }, []);

    const { isValid } = useAdminCheckToken();

    // Nếu đã đăng nhập hợp lệ, tự động chuyển hướng vào dashboard
    useEffect(() => {
        if (isValid) {
            navigate('/admin/dashboard', { replace: true });
        }
    }, [isValid, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Helpers
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await Login(formData);
        if (res?.success) {
            const { token, role } = res.data;
            login(token, role);
            toast.success(res.message, { autoClose: 1000 });
            await delay(1000);
            setLoading(false);
            navigate('/admin/dashboard');
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

                <button type="submit" className={cx('btn btn-dark', 'w-100', 'btn-custom')} disabled={loading}>
                    {loading ? <span className={cx('spinner')} /> : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;
