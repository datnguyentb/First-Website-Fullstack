import classNames from 'classnames/bind';
import styles from './NavigationOnly.module.scss';
import NavigationSidebar from '~/shared/layouts/NavigationSidebar';
import { ProtectedUserRoute } from '~/components/ProtectedRoute';
import MiniMusicControl from '~/shared/layouts/MiniMusicControl';

const cx = classNames.bind(styles);

function NavigationOnly({ children }) {
    return (
        <ProtectedUserRoute>
            <div className={cx('wrapper', 'd-flex')}>
                <NavigationSidebar collapsed />
                <div className={cx('main-content')}>{children}</div>
                <MiniMusicControl />
            </div>
        </ProtectedUserRoute>
    );
}

export default NavigationOnly;
