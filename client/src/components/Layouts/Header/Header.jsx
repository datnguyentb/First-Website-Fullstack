import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Button from '../../Button';

const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <Button
                    className={cx('nav-back')}
                    leftIcon={<FontAwesomeIcon icon={faCircleChevronLeft} className={cx('icon')} />}
                >
                    <span className={cx('ms-3')}>Back</span>
                </Button>
                <div className={cx('input-box')}>
                    <div className={cx('search-icon')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('icon')} />
                    </div>
                    <input
                        autoFocus="true"
                        type="text"
                        className={cx('search-input')}
                        placeholder="Search for courses, articles, videos..."
                    />
                </div>
                <div className={cx('auth-buttons')}>
                    <Button to="/auth/register">Sign up</Button>
                    <Button to="/auth/login" primary rounded>
                        Sign in
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Header;
