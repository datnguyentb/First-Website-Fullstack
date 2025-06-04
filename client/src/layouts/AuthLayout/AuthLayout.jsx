import classNames from 'classnames/bind';
import styles from './Auth.module.scss';
import Img from '../../components/Img/Img';
import { authBackground } from '../../assets/imgs/background';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function AuthLayout({ children }) {
    return (
        <div className={cx('wrapper', 'd-flex', 'justify-content-center', 'align-items-center', 'vh-100')}>
            <div className={cx('cotainer', 'd-flex', 'flex-row', 'justify-content-center', 'align-items-center')}>
                <div className={cx('more', 'size-custom', 'd-sm-none', 'd-lg-block')}>
                    <div className={cx('more-content', 'position-relative h-100')}>
                        <Img src={authBackground.mobile_login_3} />
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
