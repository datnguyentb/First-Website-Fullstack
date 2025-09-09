import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames/bind';
import { createPortal } from 'react-dom';
import styles from './ConfirmModal.module.scss';

const cx = classNames.bind(styles);

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    const modalContent = (
        <div className={cx('modal-overlay')} onClick={onCancel} style={{ zIndex: 1100 }}>
            <div className={cx('modal')} onClick={(e) => e.stopPropagation()}>
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

    return createPortal(modalContent, document.body);
};

ConfirmModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    title: PropTypes.string,
    message: PropTypes.string,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default ConfirmModal;
