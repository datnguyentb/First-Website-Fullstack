import { createPortal } from 'react-dom';
import classNames from 'classnames/bind';
import styles from './Gfi.module.scss';

const cx = classNames.bind(styles);

function Gfi({ children }) {
    return createPortal(
        <div className={cx('gfi-wrapper')}>
            <div className={cx('gfi-overlay')} />
            <div className={cx('gfi-content')}>{children}</div>
        </div>,
        document.body,
    );
}

export default Gfi;
