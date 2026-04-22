import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Toast.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

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

const ToastItem: React.FC<ToastProps> = ({ id, title, message, time, avatar, duration = 5000, onClose }) => {
    const [isHiding, setIsHiding] = useState(false);

    useEffect(() => {
        const timer = setTimeout(handleClose, duration);
        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsHiding(true);
        setTimeout(() => onClose(id), 400);
    };

    return (
        <div className={cx('toast', { hide: isHiding })}>
            <img className={cx('avatar')} src={avatar} />

            <div className={cx('content')}>
                <b>{title}</b>
                <p>{message}</p>
                <span className={cx('time')}>{time}</span>
            </div>

            <button className={cx('btn')}>Xem</button>

            <span className={cx('close')} onClick={handleClose}>
                <FontAwesomeIcon icon={faClose} />
            </span>
        </div>
    );
};

export default ToastItem;
