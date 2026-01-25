import classNames from 'classnames/bind';
import styles from './BaseModal.module.scss';
import FloatingLayer from '~/components/FloatingLayer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faXmark } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function BaseModal({ title = '', children, onClose }) {
    return (
        <FloatingLayer onClose={onClose}>
            <div className={cx('base-modal')}>
                <div className={cx('header')}>
                    <h2 className={cx('header-title')}>Edit Profile</h2>
                    <div className={cx('close_icon')} title="Close" onClick={() => onClose()}>
                        <FontAwesomeIcon icon={faXmark} />
                    </div>
                </div>
                <div className={cx('modal-content')}>{children}</div>
            </div>
        </FloatingLayer>
    );
}

export default BaseModal;
