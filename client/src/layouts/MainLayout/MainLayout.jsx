import classNames from 'classnames/bind';
import styles from './MainLayout.module.scss';
import { Header, Footer, NavigationSidebar, RightSlidebarDefault } from '../../components/Layouts';
import ProtectedRoute from '~/components/ProtectedRoute';

const cx = classNames.bind(styles);

function MainLayout({ children }) {
    return (
        <ProtectedRoute>
            <div className={cx('wrapper', 'd-flex')}>
                <NavigationSidebar />
                <div className={cx('main-content')}>
                    <Header />
                    <div className={cx('content-container', 'd-flex')}>
                        <div className={cx('content', 'flex-grow-1')}>
                            <div className={cx('primary-content')}>
                                {children}
                                <Footer />
                            </div>
                        </div>
                        <RightSlidebarDefault />
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}

export default MainLayout;
