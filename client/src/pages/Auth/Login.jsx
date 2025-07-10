import { useState } from 'react';
import authApi from '~/api/authApi';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from './Auth.module.scss';
import { Img, Button, Alert } from '~/components';
import { logo_img } from '~/assets/imgs/logo';
import { svg_icon } from '../../assets/imgs/svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isRemember, setIsRemember] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showAlert, SetShowAlert] = useState(false);
    const [alert, setAlert] = useState({
        type: '',
        title: '',
        message: '',
    });

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await authApi.login({
                email: formData.email,
                password: formData.password,
            });
            localStorage.setItem('token', res.data.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.data.user));
            setAlert({
                type: 'success',
                title: 'Success!',
                message: res.data.message,
            });
            SetShowAlert(true);
            await delay(2000);
            navigate('/');
        } catch (error) {
            if (error.response) {
                setAlert({
                    type: 'error',
                    title: 'Error!',
                    message: error.response.data.message || 'An error occurred. Please try again.',
                });
                SetShowAlert(true);
                setTimeout(() => SetShowAlert(false), 4000);
            } else {
                console.error('Request error:', error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleRememberMeClick = () => {
        setIsRemember((prev) => !prev);
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

                <div className={cx('form-options')}>
                    <label className={cx('remember-me')}>
                        <input
                            checked={isRemember}
                            type="checkbox"
                            onChange={handleRememberMeClick}
                            className={cx('me-2')}
                        />
                        Remember me
                    </label>
                    <a href="#" className={cx('forgot-password')}>
                        Forgot password?
                    </a>
                </div>

                <button type="submit" className={cx('btn-login-email', 'btn-login')}>
                    {loading ? <span className={cx('spinner')} /> : 'Login Account'}
                </button>

                <div className={cx('divider')}>Or</div>

                <button type="button" className={cx('btn-google', 'btn-login')}>
                    <img src={svg_icon.google_svg} alt="Google" width="20" height="20" />
                    Continue with Google
                </button>

                <div className={cx('text-center', 'mt-3')}>
                    Don't have an account?{' '}
                    <Link to="/auth/register" className={cx('link-signup')}>
                        Sign up
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Login;
