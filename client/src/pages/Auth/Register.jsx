import { useState } from 'react';
import authApi from '~/api/authApi';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styles from './Auth.module.scss';
import { Button, Img, Alert } from '~/components';
import { svg_icon } from '../../assets/imgs/svg';
import { logo_img } from '~/assets/imgs/logo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showAlert, SetShowAlert] = useState(false);
    const [alert, setAlert] = useState({
        type: '',
        title: '',
        message: '',
    });

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const navigate = useNavigate();

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
            const res = await authApi.register({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
                confirmPassword: formData.confirmPassword,
            });

            setAlert({
                type: 'success',
                title: 'Success!',
                message: res.data.message,
            });
            SetShowAlert(true);
            await delay(2000);
            navigate('/auth/login');
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

    return (
        <div className={cx('wrapper')}>
            {showAlert && <Alert type={alert.type} title={alert.title} message={alert.message} />}
            <div className={cx('d-flex', 'justify-content-center', 'logo-forward-home')}>
                <Button to="/">
                    <Img src={logo_img.main_logo} />
                </Button>
            </div>
            <h2 className={cx('title')}>Hi, Welcome</h2>
            <p className={cx('subtitle')}>Join us now and start your job hunt journey with us.</p>

            <form className={cx('form', 'mt-3')} autoComplete="off" onSubmit={handleSubmit}>
                <div className={cx('d-flex', 'justify-content-between', 'align-items-center')}>
                    <div className={cx('form-group', 'me-3')}>
                        <label className={cx('label')}>First Name</label>
                        <input
                            name="firstName"
                            type="text"
                            placeholder="First Name"
                            className={cx('form-control')}
                            required
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={cx('form-group', 'mt-0', 'ms-3')}>
                        <label className={cx('label')}>Last Name</label>
                        <input
                            name="lastName"
                            type="text"
                            placeholder="Last Name"
                            className={cx('form-control')}
                            required
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className={cx('form-group', 'form-group-email')}>
                    <label className={cx('label')}>Email Address</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className={cx('form-control')}
                        autoComplete="email"
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
                            autoComplete="new-password"
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
                            name="confirmPassword"
                            placeholder="Enter your password"
                            className={cx('form-control')}
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        <span className={cx('toggle-password')} onClick={() => setShowConfirmPassword((prev) => !prev)}>
                            <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                        </span>
                    </div>
                </div>

                <button type="submit" className={cx('btn-register-email', 'btn-login')}>
                    {loading ? <span className={cx('spinner')} /> : 'Create Account'}
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
