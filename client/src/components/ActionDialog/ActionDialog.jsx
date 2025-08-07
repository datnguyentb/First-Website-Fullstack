import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ActionDialog.module.scss';
import { Trash2, AlertTriangle, CheckCircle, Info } from 'lucide-react';

const cx = classNames.bind(styles);

const ICON_MAP = {
    delete: <Trash2 size={48} className={cx('icon', 'delete')} />,
    report: <AlertTriangle size={48} className={cx('icon', 'report')} />,
    confirm: <CheckCircle size={48} className={cx('icon', 'confirm')} />,
    warning: <AlertTriangle size={48} className={cx('icon', 'warning')} />,
    default: <Info size={48} className={cx('icon', 'default')} />,
};

const TYPE_CLASS_MAP = {
    default: 'btn-primary',
    confirm: 'btn-success',
    delete: 'btn-danger',
    report: 'btn-danger',
    warning: 'btn-warning',
};

export default function ActionDialog({
    title = 'Are you sure?',
    description = '',
    children,
    confirmText = 'Confirm',
    onConfirm,
    onCancel,
    reasonTitle,
    timeTitle,
    senToUser,
    notifyRef,
    reasonRef,
    timeLockedRef,
    type = 'default',
}) {
    const icon = ICON_MAP[type] || ICON_MAP.default;
    const typeClass = TYPE_CLASS_MAP[type] || 'btn-primary';

    return (
        <div className={cx('wrapper')}>
            <div className={cx('dialog-container')}>
                <div className={cx('icon-wrapper')}>{icon}</div>

                <h3 className={cx('dialog-title')}>{title}</h3>
                {description && <p className={cx('dialog-description')}>{description}</p>}

                <div className={cx('form-area')}>
                    {reasonTitle && (
                        <div className={cx('form-group')}>
                            <label className={cx('form-label')}>{reasonTitle}</label>
                            <textarea
                                className={cx('form-control')}
                                rows="3"
                                placeholder="Enter reason..."
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
                                placeholder="e.g. 7"
                                ref={timeLockedRef}
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
                                ref={notifyRef}
                            />
                            <label className={cx('form-check-label')} htmlFor="notifyUserCheckbox">
                                Notify user
                            </label>
                        </div>
                    )}
                </div>

                {children && <div className={cx('custom-content')}>{children}</div>}

                <div className={cx('actions')}>
                    <button onClick={onCancel} className={cx('btn', 'btn-secondary', 'btn-custom')}>
                        Cancel
                    </button>
                    <button onClick={onConfirm} className={cx('btn', typeClass, 'btn-custom')}>
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}

ActionDialog.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    children: PropTypes.node,
    confirmText: PropTypes.string,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    reasonTitle: PropTypes.string,
    timeTitle: PropTypes.string,
    senToUser: PropTypes.bool,
    notifyRef: PropTypes.object,
    reasonRef: PropTypes.object,
    timeLockedRef: PropTypes.object,
    type: PropTypes.string,
};
