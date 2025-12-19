import classNames from 'classnames/bind';
import styles from './MainLayout.module.scss';
import { Header, Footer, NavigationSidebar, RightSlidebarDefault, MiniMusicControl } from '../../components/Layouts';

const cx = classNames.bind(styles);

function MainLayout({ children }) {
    return (
        <div className={cx('wrapper', 'd-flex')}>
            <NavigationSidebar />
            <div className={cx('main-content')}>
                <div className={cx('header')}>
                    <Header />
                </div>
                <div className={cx('content-container', 'd-flex')}>
                    <div className={cx('content', 'flex-grow-1')}>
                        <div className={cx('primary-content')}>{children}</div>
                        <Footer />
                    </div>
                    <RightSlidebarDefault />
                </div>
            </div>
            <MiniMusicControl />
        </div>
    );
}

export default MainLayout;
