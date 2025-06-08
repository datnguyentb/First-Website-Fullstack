import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Auth.module.scss';
import Button from '~/components/Button';
import { svg_icon } from '../../assets/imgs/svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>Welcome back!</h2>
            <p className={cx('subtitle')}>Log in to continue your job hunt journey with us.</p>

            <form className={cx('form')}>
                <div className={cx('form-group')}>
                    <label className={cx('label')}>Email Address</label>
                    <input type="email" placeholder="Enter your email" className={cx('form-control')} required />
                </div>

                <div className={cx('form-group')}>
                    <label className={cx('label')}>Password</label>
                    <div className={cx('password-input')}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            className={cx('form-control')}
                            required
                        />
                        <span className={cx('toggle-password')} onClick={handleTogglePassword}>
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </span>
                    </div>
                </div>

                <div className={cx('form-options')}>
                    <label className={cx('remember-me')}>
                        <input type="radio" defaultChecked />
                        Remember me
                    </label>
                    <a href="#" className={cx('forgot-password')}>
                        Forgot Password?
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
                <div className={cx('btn-home', 'd-flex', 'justify-content-center')}>
                    <Button className={cx('icon-home')} to="/">
                        <FontAwesomeIcon icon={faHouse} />
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default Login;
