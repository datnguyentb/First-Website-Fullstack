import classNames from 'classnames/bind';
import styles from './MainLayout.module.scss';
import Header from '~/shared/layouts/Header';
import Footer from '~/shared/layouts/Footer';
import MiniMusicControl from '~/shared/layouts/MiniMusicControl';
import NavigationSidebar from '~/shared/layouts/NavigationSidebar';
import RightSlidebarDefault from '~/shared/layouts/RightSlidebarDefault';

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
