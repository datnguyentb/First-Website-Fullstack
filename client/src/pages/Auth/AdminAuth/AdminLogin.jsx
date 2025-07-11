import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './AdminLogin.module.scss';

const cx = classNames.bind(styles);

const AdminLogin = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: gọi API login admin
        console.log('Admin login with:', formData);
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
                    Login
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;
