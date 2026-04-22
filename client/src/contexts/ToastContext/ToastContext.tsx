import { createContext, useContext, useState } from 'react';
import { ToastContextType } from './ToastContextTypes';
import ToastContainer from '~/components/Toast/ToastContainer';

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const showToast = (data) => {
        const id = Date.now();

        const newToast = {
            id,
            ...data,
        };

        setToasts((prev) => [...prev, newToast]);

        setTimeout(() => {
            removeToast(id);
        }, data.duration || 5000);
    };

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <ToastContext.Provider value={{ showToast, removeToast }}>
            {children}
            {/* global container */}
            <div className="toast-container">
                <ToastContainer />
            </div>
        </ToastContext.Provider>
    );
};
