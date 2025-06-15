import classNames from 'classnames/bind';
import styles from './NoRightSlidebar.module.scss';
import { Header, NavigationSidebar } from '../../components/Layouts';

const cx = classNames.bind(styles);

function NoRightSlidebar({ children }) {
    return (
        <div className={cx('wrapper', 'd-flex')}>
            <NavigationSidebar />
            <div className={cx('main-content')}>
                <Header />
                <div className={cx('content-container', 'd-flex')}>
                    <div className={cx('content', 'flex-grow-1')}>
                        <div className={cx('primary-content')}>{children}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NoRightSlidebar;
