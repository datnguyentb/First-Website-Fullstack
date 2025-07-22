import classNames from 'classnames/bind';
import styles from './UserProfile.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faXmark } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function UserProfileHeader({ showEditProfile, setShowEditProfile, onClose }) {
    return (
        <div className={cx('header', 'd-flex', 'justify-content-between', 'align-items-center')}>
            {showEditProfile ? (
                <div className={cx('d-flex', 'align-items-center')}>
                    <div className={cx('dir-icon', 'me-5')} onClick={() => setShowEditProfile()}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </div>
                    <h2 className={cx('header-title')}>Edit Profile</h2>
                </div>
            ) : (
                <div>
                    <h2 className={cx('header-title')}>Profile</h2>
                </div>
            )}

            <div className={cx('close_icon')} title="Close" onClick={() => onClose()}>
                <FontAwesomeIcon icon={faXmark} />
            </div>
        </div>
    );
}

export default UserProfileHeader;
