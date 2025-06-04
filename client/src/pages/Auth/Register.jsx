import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Auth.module.scss';
import { svg_icon } from '../../assets/imgs/svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>Hi, Welcome</h2>
            <p className={cx('subtitle')}>Join us now and start your job hunt journey with us.</p>

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
                        <span className={cx('toggle-password')} onClick={() => setShowPassword((prev) => !prev)}>
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </span>
                    </div>
                </div>

                <div className={cx('form-group')}>
                    <label className={cx('label')}>Confirm Password</label>
                    <div className={cx('password-input')}>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            className={cx('form-control')}
                            required
                        />
                        <span className={cx('toggle-password')} onClick={() => setShowConfirmPassword((prev) => !prev)}>
                            <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                        </span>
                    </div>
                </div>

                <button type="submit" className={cx('btn-register-email', 'btn-login')}>
                    Create Account
                </button>

                <div className={cx('divider')}>Or</div>

                <button type="button" className={cx('btn-google', 'btn-login')}>
                    <img src={svg_icon.google_svg} alt="Google" width="20" height="20" />
                    Continue with Google
                </button>
            </form>
        </div>
    );
}

export default Register;
