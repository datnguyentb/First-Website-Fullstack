import { createContext, useContext, useState } from 'react';
import { Toast, ToastContextType } from './ToastContextTypes';
import ToastContainer from '~/components/Toast/ToastContainer';

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = (data: Toast) => {
        setToasts((prev) => [...prev, data]);
    };

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
            {children}
            {/* global container */}
            <div className="toast-container">
                <ToastContainer />
            </div>
        </ToastContext.Provider>
    );
};
