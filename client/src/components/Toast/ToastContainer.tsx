import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Toast.module.scss';
import ToastItem from './ToastItem';

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

const getRandom = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

const ToastContainer: React.FC = () => {
    const [toasts, setToasts] = useState<ToastItemType[]>([]);

    const addToast = () => {
        const user = getRandom(users);
        const action = getRandom(actions);

        const newToast: ToastItemType = {
            id: Date.now(),
            title: `${user} ${action.title}`,
            message: action.message,
            time: 'Vừa xong',
            avatar: `https://i.pravatar.cc/100?u=${user}`,
        };

        setToasts((prev) => [newToast, ...prev]);
    };

    const removeToast = (id: number) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    // 🔥 Auto fake toast mỗi 3-6s
    useEffect(() => {
        const interval = setInterval(
            () => {
                addToast();
            },
            Math.random() * 3000 + 50000,
        ); // 10-13s

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className={cx('container')}>
                {toasts.map((toast) => (
                    <ToastItem key={toast.id} {...toast} onClose={removeToast} />
                ))}
            </div>
        </>
    );
};

export default ToastContainer;
