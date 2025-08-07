import classNames from 'classnames/bind';
import styles from './FloatingLayer.module.scss';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function FloatingLayer({ children, onClose }) {
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose?.();
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    return (
        <div className={cx('overlay')} onClick={onClose}>
            <div className={cx('content')} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

export default FloatingLayer;
