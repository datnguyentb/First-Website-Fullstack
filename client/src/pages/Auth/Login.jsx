// pages/Login.jsx
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import styles from './Auth.module.scss';
import { Img, Button, Alert } from '~/components';
import { logo_img } from '~/assets/imgs/logo';
import { svg_icon } from '~/assets/imgs/svg';
import { userAuthContext, useUserContext } from '~/contexts';
import useLogin from '~/hooks/auth/useLogin';

const cx = classNames.bind(styles);

function Login() {
    const { login } = userAuthContext();
    const { setUser } = useUserContext();
    const navigate = useNavigate();
    const { Login, loading, setLoading } = useLogin();

    useEffect(() => {
        document.title = 'Twirl | Login';
    }, []);

    // State
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [isRemember, setIsRemember] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alert, setAlert] = useState({ type: '', title: '', message: '' });

    // Helpers
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // Handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Toggle password visibility
    const handleTogglePassword = () => setShowPassword((prev) => !prev);

    // Toggle "Remember Me"
    const handleRememberMeClick = () => setIsRemember((prev) => !prev);

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await Login(formData);
        if (res.data) {
            //lưu token
            const { token, role } = res.data;
            login(token, role);

            //show aleart
            setAlert({
                type: 'success',
                title: 'Success!',
                message: res.message,
            });
            setShowAlert(true);
            setUser(res.data.user);
            await delay(2000);
            setLoading(false);
            navigate('/');
        } else {
            setAlert({ type: 'error', title: 'Error!', message: res.message });
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 4000);
            setLoading(false);
        }
    };

    return (
        <div className={cx('wrapper')}>
            {showAlert && <Alert type={alert.type} title={alert.title} message={alert.message} />}

            <div className={cx('d-flex', 'justify-content-center', 'logo-forward-home')}>
                <Button to="/">
                    <Img src={logo_img.main_logo} />
                </Button>
            </div>

            <h2 className={cx('title')}>Welcome back!</h2>
            <p className={cx('subtitle')}>Log in to continue your job hunt journey with us.</p>

            <form className={cx('form', 'mt-3')} onSubmit={handleSubmit}>
                {/* Email */}
                <div className={cx('form-group')}>
                    <label className={cx('label')}>Email Address</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className={cx('form-control')}
                        required
                        onChange={handleChange}
                    />
                </div>

                {/* Password */}
                <div className={cx('form-group')}>
                    <label className={cx('label')}>Password</label>
                    <div className={cx('password-input')}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Enter your password"
                            className={cx('form-control')}
                            autoComplete="new-password"
                            required
                            onChange={handleChange}
                        />
                        <span className={cx('toggle-password')} onClick={handleTogglePassword}>
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </span>
                    </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className={cx('form-options')}>
                    <label className={cx('remember-me')}>
                        <input
                            type="checkbox"
                            checked={isRemember}
                            onChange={handleRememberMeClick}
                            className={cx('me-2')}
                        />
                        Remember me
                    </label>
                    <a href="#" className={cx('forgot-password')}>
                        Forgot password?
                    </a>
                </div>

                {/* Submit Button */}
                <button type="submit" className={cx('btn-login-email', 'btn-login')}>
                    {loading ? <span className={cx('spinner')} /> : 'Login Account'}
                </button>

                {/* Divider */}
                <div className={cx('divider')}>Or</div>

                {/* Google Button */}
                <button type="button" className={cx('btn-google', 'btn-login')}>
                    <img src={svg_icon.google_svg} alt="Google" width="20" height="20" />
                    Continue with Google
                </button>

                {/* Sign Up */}
                <div className={cx('text-center', 'mt-3')}>
                    Don&apos;t have an account?{' '}
                    <Link to="/auth/register" className={cx('link-signup')}>
                        Sign up
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Login;
