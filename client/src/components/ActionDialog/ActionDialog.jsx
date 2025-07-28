import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ActionDialog.module.scss';

const cx = classNames.bind(styles);

export default function ActionDialog({
    title = 'Xác nhận hành động',
    children,
    confirmText = 'Xác nhận',
    onConfirm,
    onCancel,
    reasonTitle,
    timeTitle,
    senToUser,
    reasonRef,
    timeLokedRef,
}) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('dialog-container')}>
                <h2 className="h2 fw-bold mb-3">{title}</h2>
                <div className={cx('wrapper-2')}>
                    {reasonTitle && (
                        <div className={cx('form-group')}>
                            <label className={cx('form-label')}>{reasonTitle}</label>
                            <textarea
                                className={cx('form-control')}
                                rows="3"
                                placeholder="Nhập lý do khóa..."
                                ref={reasonRef}
                            />
                        </div>
                    )}

                    {timeTitle && (
                        <div className={cx('form-group')}>
                            <label className={cx('form-label')}>{timeTitle}</label>
                            <input
                                type="number"
                                className={cx('form-control')}
                                placeholder="VD: 7"
                                ref={timeLokedRef}
                                min={1}
                            />
                        </div>
                    )}

                    {senToUser && (
                        <div className={cx('form-check')}>
                            <input
                                type="checkbox"
                                className={cx('form-check-input')}
                                id="notifyUserCheckbox"
                                defaultChecked
                            />
                            <label className={cx('form-check-label')} htmlFor="notifyUserCheckbox">
                                Gửi thông báo cho người dùng
                            </label>
                        </div>
                    )}
                </div>
                <div className="mb-4">{children}</div>

                <div className="d-flex justify-content-end gap-2">
                    <button onClick={onCancel} className={cx('btn', 'btn-secondary', 'btn-custom')}>
                        Cancel
                    </button>
                    <button onClick={onConfirm} className={cx('btn', 'btn-primary', 'btn-custom')}>
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}

ActionDialog.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
    confirmText: PropTypes.string,
    cancelText: PropTypes.string,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    reasonTitle: PropTypes.string,
    timeTitle: PropTypes.string,
    senToUser: PropTypes.bool,
};
