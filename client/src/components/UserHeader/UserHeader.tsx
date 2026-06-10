import Tippy from '@tippyjs/react';
import { getPrivacyIcon } from '~/utils/postUtils';
import { formatDateTimeFullEN, timeAgo } from '~/utils/dateUtils';
import baseUrl from '~/helper/baseUrl';
import classNames from 'classnames/bind';
import styles from './UserHeader.module.scss';
import 'tippy.js/dist/tippy.css';
import Img from '../Img';
import { UserHeaderProps } from './UserHeaderTypes';

const cx = classNames.bind(styles);

function UserHeader({
    userInfor,
    createdAt,
    handleClickUserProfile,
    type = 'default',
    privacy = null,
}: UserHeaderProps) {
    return (
        <div className={cx('wrapper', 'd-flex', 'align-items-center')}>
            <div className={cx('avatar-img')}>
                <Img src={baseUrl(userInfor.avatar)} alt="Avatar" className={cx('avatar')} />
            </div>
            <div className={cx('ms-3')}>
                <h3 onClick={handleClickUserProfile} className={cx('name')}>
                    {userInfor?.fullName || `${userInfor.firstName} ${userInfor.lastName}`}
                </h3>
                <div className={cx('d-flex', 'align-items-center')}>
                    <span className={cx('time')} title={formatDateTimeFullEN(createdAt)}>
                        {timeAgo(createdAt)}
                    </span>
                    {type === 'post' && privacy && (
                        <Tippy content={privacy} theme="light">
                            <div style={{ display: 'inline-flex' }}>
                                <span className={cx('privacy', 'ms-2')}>{getPrivacyIcon(privacy)}</span>
                            </div>
                        </Tippy>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserHeader;
