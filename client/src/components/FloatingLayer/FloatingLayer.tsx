import classNames from 'classnames/bind';
import styles from './FloatingLayer.module.scss';
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FloatingLayerProps } from './FloatingLayerTypes';

const cx = classNames.bind(styles);

const FloatingLayer: React.FC<FloatingLayerProps> = ({ children, onClose }) => {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
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
};

export default FloatingLayer;
