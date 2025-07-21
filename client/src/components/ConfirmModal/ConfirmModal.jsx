import React from 'react';
import classNames from 'classnames/bind';
import styles from './ConfirmModal.module.scss'; // Nếu dùng SCSS module

const cx = classNames.bind(styles);

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className={cx('modal-overlay')}>
            <div className={cx('modal')}>
                <h3>{title || 'Xác nhận'}</h3>
                <p>{message || 'Bạn có chắc chắn muốn thực hiện hành động này không?'}</p>
                <div className={cx('buttons')}>
                    <button className={cx('cancel')} onClick={onCancel}>
                        Huỷ
                    </button>
                    <button className={cx('confirm')} onClick={onConfirm}>
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
