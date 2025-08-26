import classNames from 'classnames/bind';
import styles from './OnlyHeader.module.scss';
import { Header } from '../../components/Layouts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { ProtectedUserRoute } from '~/components/ProtectedRoute';

const cx = classNames.bind(styles);

function OnlyHeader({ children }) {
    return (
        <ProtectedUserRoute>
            <div className={cx('wrapper', 'd-flex')}>
                <div className={cx('main-content')}>
                    <div className={cx('header')}>
                        <Header style_2 />
                        <Link to={'/'} title="Go Home" className={cx('go-home')}>
                            <FontAwesomeIcon icon={faHome} />
                        </Link>
                    </div>
                    <div className={cx('content-container', 'd-flex')}>
                        <div className={cx('content', 'flex-grow-1')}>
                            <div className={cx('primary-content')}>{children}</div>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedUserRoute>
    );
}

export default OnlyHeader;
