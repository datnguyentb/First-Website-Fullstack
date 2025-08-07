// ModalContext.js
import { createContext, useRef, useState } from 'react';
import { ActionDialog } from '~/components';

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const reasonRef = useRef();
    const timeLockedRef = useRef();
    const notifyRef = useRef();
    const [isOpen, setIsOpen] = useState(false);
    const [modalProps, setModalProps] = useState({});

    const showModal = (props) => {
        setModalProps(props);
        setIsOpen(true);
    };

    const resetRefs = () => {
        if (reasonRef.current) reasonRef.current.value = '';
        if (timeLockedRef.current) timeLockedRef.current.value = '';
        if (notifyRef.current) notifyRef.current.checked = true;
    };

    const handleConfirm = async () => {
        const reason = reasonRef.current?.value || '';
        const timeLocked = timeLockedRef.current?.value || '';
        const notifyUser = notifyRef.current?.checked || false;
        if (modalProps.onConfirm) {
            await modalProps.onConfirm({ reason, timeLocked, notifyUser });
        }
        resetRefs();
        hideModal();
    };

    const hideModal = () => {
        resetRefs();
        setIsOpen(false);
    };

    return (
        <ModalContext.Provider value={{ isOpen, setIsOpen, showModal }}>
            {children}

            {isOpen && (
                <ActionDialog
                    {...modalProps}
                    reasonRef={reasonRef}
                    timeLockedRef={timeLockedRef}
                    notifyRef={notifyRef}
                    onCancel={hideModal}
                    onConfirm={handleConfirm}
                />
            )}
        </ModalContext.Provider>
    );
};
