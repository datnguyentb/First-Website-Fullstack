import { useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Auth.module.scss';
import { Img, Button } from '~/components';
import { logo_img } from '~/assets/imgs/logo';
import { svg_icon } from '../../assets/imgs/svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [isRemember, setIsRemember] = useState(false);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:5000/auth/login`, {
                email: formData.email,
                password: formData.password,
            });
            alert('Đăng nhập thành công!');
            localStorage.setItem('token', res.data.data.token);
        } catch (error) {
            console.error('Đăng nhập thất bại:', error.response.data);
            alert('Đăng nhập thất bại!');
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
                    Login Account
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
