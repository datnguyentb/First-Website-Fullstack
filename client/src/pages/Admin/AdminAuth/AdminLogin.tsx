import React, { useEffect, useState, useCallback } from 'react';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import styles from './AdminLogin.module.scss';
import { useAdminAuthContext } from '~/contexts';
import { useAdminLoginSubmit } from './hooks/useAdminLoginSubmit';
import useAdminCheckToken from '~/hooks/admin/checKToken/useAdminCheckToken';
import { delay } from '~/helper/delay';
import { loginForm } from '~/types/loginFormData';
import { loginDataResponse } from '~/types/loginDataResponse';
import { useLoginForm } from './hooks/useLoginForm';

const cx = classNames.bind(styles);

const AdminLogin = () => {
    const navigate = useNavigate();
    const { login } = useAdminAuthContext();
    const { isValid } = useAdminCheckToken();
    const { formData, handleChange } = useLoginForm({ email: '', password: '' });

    // Hàm xử lý đăng nhập thành công
    const handleSuccess = useCallback(
        async (data: loginDataResponse) => {
            const { token, role } = data;
            login(token, role);
            toast.success('Login successful', { autoClose: 1000 });

            await delay(1000);
            navigate('/admin/dashboard');
        },
        [login, navigate],
    );

    // Khởi tạo Hook xử lý Submit
    const { handleSubmit, loading } = useAdminLoginSubmit(formData, handleSuccess);
    useEffect(() => {
        if (isValid) {
            navigate('/admin/dashboard', { replace: true });
        }
    }, [isValid, navigate]);

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
                        placeholder="Enter your email"
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
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className={cx('btn btn-dark', 'w-100', 'btn-custom')} disabled={loading}>
                    {loading ? (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    ) : (
                        'Login'
                    )}
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;
