import classNames from 'classnames/bind';
import Slider from '../../components/Slider';
import styles from './Auth.module.scss';
import { authBackground } from '../../assets/imgs/background';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Navigate } from 'react-router-dom';
import useCheckToken from '~/hooks/checKToken/useCheckToken';

const ArrImg = [authBackground.mobile_login_1, authBackground.mobile_login_2, authBackground.mobile_login_3];

const cx = classNames.bind(styles);

function AuthLayout({ children }) {
    const { isValid } = useCheckToken();

    if (isValid) {
        return <Navigate to="/" replace />;
    }
    return (
        <div className={cx('wrapper', 'd-flex', 'justify-content-center', 'align-items-center', 'vh-100')}>
            <div className={cx('cotainer', 'd-flex', 'flex-row', 'justify-content-center', 'align-items-center')}>
                <div className={cx('more', 'size-custom', 'd-sm-none', 'd-lg-block')}>
                    <div className={cx('more-content', 'position-relative h-100')}>
                        <Slider ArrImg={ArrImg} autoSlide={3000} />
                        <div className={cx('paragrap-box', ' position-absolute')}>
                            <div className={cx('main-text')}>
                                <h3>
                                    “A great platform for your service listing and professional service seeking, Just
                                    give a try today”
                                </h3>
                            </div>
                            <div
                                className={cx(
                                    'more-info-article',
                                    'd-flex',
                                    'flex-row',
                                    'align-items-center',
                                    'justify-content-between',
                                )}
                            >
                                <div className={cx('article')}>
                                    <p>Alisa</p>
                                    <p>Web Design Agency</p>
                                </div>
                                <div className={cx('director')}>
                                    <FontAwesomeIcon icon={faCircleArrowLeft} />
                                    <FontAwesomeIcon icon={faCircleArrowRight} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={cx(
                        'content-auth',
                        'size-custom',
                        'd-flex',
                        'flex-column',
                        'justify-content-center',
                        'align-items-center',
                    )}
                >
                    <div className={cx('content-auth-inner')}>{children}</div>
                </div>
            </div>
        </div>
    );
}

export default AuthLayout;
