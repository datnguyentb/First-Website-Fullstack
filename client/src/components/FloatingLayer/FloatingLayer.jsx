import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './FloatingLayer.module.scss';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const cx = classNames.bind(styles);

function FloatingLayer({ children, onClose }) {
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose?.();
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    const layer = (
        <div className={cx('overlay')} onClick={onClose}>
            <div className={cx('content')} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );

    return createPortal(layer, document.body);
}

FloatingLayer.propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func,
};

export default FloatingLayer;
