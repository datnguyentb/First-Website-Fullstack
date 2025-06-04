import classNames from 'classnames/bind';
import styles from './MainLayout.module.scss';

import Header from '../../components/Layouts/Header';
import Footer from '../../components/Layouts/Footer';
import { NavigationSidebar, RightSlidebarDefault } from '../../components/Layouts';

const cx = classNames.bind(styles);

function MainLayout({ children }) {
    return (
        <div className={cx('wrapper', 'd-flex')}>
            <NavigationSidebar />
            <div className={cx('main-content')}>
                <Header />
                <div className={cx('content-container', 'd-flex')}>
                    <div className={cx('content', 'flex-grow-1')}>
                        {children}
                        <Footer />
                    </div>
                    <RightSlidebarDefault />
                </div>
            </div>
        </div>
    );
}

export default MainLayout;
