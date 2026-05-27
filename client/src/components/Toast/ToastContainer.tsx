import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Toast.module.scss';
import ToastItem from './ToastItem';
import { useToastContext } from '~/contexts';

const cx = classNames.bind(styles);

interface ToastItemType {
    id: number;
    title: string;
    message: string;
    time: string;
    avatar: string;
}

const users = ['Trọng Vũ', 'Minh Anh', 'Quang Huy', 'Lan Chi'];
const actions = [
    { title: 'đã thích bài viết của bạn', message: '' },
    { title: 'đã bình luận', message: '“Hay quá!”' },
    { title: 'đã nhắc đến bạn', message: 'trong một bình luận.' },
];

const ToastContainer: React.FC = () => {
    const { toasts, removeToast } = useToastContext();
    return (
        <>
            <div className={cx('container')}>
                {toasts.map((toast) => (
                    <ToastItem key={toast._id} toast={toast} onClose={removeToast} />
                ))}
            </div>
        </>
    );
};

export default ToastContainer;
