import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Toast.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { timeAgo } from '~/utils/dateUtils.js';
import baseUrl from '~/helper/baseUrl';

const cx = classNames.bind(styles);

export interface ToastProps {
    id: number;
    title: string;
    message: string;
    time: string;
    avatar: string;
    duration?: number;
    onClose: (id: number) => void;
}

const ToastItem: React.FC<ToastProps> = ({ toast, duration = 5000, onClose }) => {
    const [isHiding, setIsHiding] = useState(false);
    console.log('toast item', toast);

    useEffect(() => {
        const timer = setTimeout(handleClose, duration);
        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsHiding(true);
        setTimeout(() => onClose(toast._id), 400);
    };

    return (
        <div className={cx('toast', { hide: isHiding })}>
            <img className={cx('avatar')} src={baseUrl(toast.actors[0].avatar)} />

            <div className={cx('content')}>
                <b>{toast.actors[0].firstName}</b>
                <p>{toast.content}</p>
                <span className={cx('time')}>{timeAgo(toast.createdAt)}</span>
            </div>

            <button className={cx('btn')}>Xem</button>

            <span className={cx('close')} onClick={handleClose}>
                <FontAwesomeIcon icon={faClose} />
            </span>
        </div>
    );
};

export default ToastItem;
