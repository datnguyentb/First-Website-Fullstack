import { useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styles from './Auth.module.scss';
import { Button, Img } from '~/components';
import { svg_icon } from '../../assets/imgs/svg';
import { logo_img } from '~/assets/imgs/logo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirm_password) {
            alert('Passwords do not match!');
            return;
        }

        console.log('Form data:', formData);

        try {
            const res = await axios.post(`http://localhost:5000/auth/register`, {
                first_name: formData.first_name,
                last_name: formData.last_name,
                email: formData.email,
                password: formData.password,
                confirm_password: formData.confirm_password,
            });

            console.log('Đăng ký thành công:', res.data);
            alert('Đăng ký thành công!');
            // Reset form:
            setFormData({ first_name: '', last_name: '', email: '', password: '', confirm_password: '' });
            navigate('/auth/login');
        } catch (error) {
            console.error('Đăng ký thất bại:', error);
            alert('Đăng ký thất bại!');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('d-flex', 'justify-content-center', 'logo-forward-home')}>
                <Button to="/">
                    <Img src={logo_img.main_logo} />
                </Button>
            </div>
            <h2 className={cx('title')}>Hi, Welcome</h2>
            <p className={cx('subtitle')}>Join us now and start your job hunt journey with us.</p>

            <form className={cx('form', 'mt-3')} onSubmit={handleSubmit}>
                <div className={cx('d-flex', 'justify-content-between', 'align-items-center')}>
                    <div className={cx('form-group', 'me-3')}>
                        <label className={cx('label')}>First Name</label>
                        <input
                            name="first_name"
                            type="text"
                            placeholder="First Name"
                            className={cx('form-control')}
                            required
                            value={formData.first_name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={cx('form-group', 'mt-0', 'ms-3')}>
                        <label className={cx('label')}>Last Name</label>
                        <input
                            name="last_name"
                            type="text"
                            placeholder="Last Name"
                            className={cx('form-control')}
                            required
                            value={formData.last_name}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className={cx('form-group')}>
                    <label className={cx('label')}>Email Address</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className={cx('form-control')}
                        required
                        value={formData.email}
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
                            value={formData.password}
                            onChange={handleChange}
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
                            name="confirm_password"
                            placeholder="Enter your password"
                            className={cx('form-control')}
                            required
                            value={formData.confirm_password}
                            onChange={handleChange}
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

                <div className={cx('text-center', 'mt-3')}>
                    Already have an account?{' '}
                    <Link to="/auth/login" className={cx('link-login')}>
                        Login
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Register;
