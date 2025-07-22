import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import 'tippy.js/dist/tippy.css';
import styles from './Post.module.scss';
import baseUrl from '~/helper/baseUrl';
import { getPrivacyIcon } from '~/utils/postUtils';

import { formatDateTimeFullEN, timeAgo } from '~/utils/dateUtils';
import { Img } from '~/components';

const cx = classNames.bind(styles);

function PostHeader({ setShowUserProfile, userInfor, post }) {
    return (
        <div className={cx('post-header', 'd-flex', 'align-items-center', 'justify-content-between')}>
            <div className={cx('d-flex', 'align-items-center')}>
                <div className={cx('avatar-img')}>
                    <Img src={baseUrl(userInfor.avatarUrl)} alt="Avatar" className={cx('avatar')} />
                </div>
                <div className={cx('ms-3')}>
                    <h3 onClick={() => setShowUserProfile(true)} className={cx('name')}>
                        {`${userInfor.firstName} ${userInfor.lastName}`}
                    </h3>
                    <div className={cx('d-flex', 'align-items-center')}>
                        <span className={cx('time')} title={formatDateTimeFullEN(post.createdAt)}>
                            {timeAgo(post.createdAt)}
                        </span>
                        <Tippy content={post.privacy} theme="light">
                            <span className={cx('privacy', 'ms-2')}>{getPrivacyIcon()}</span>
                        </Tippy>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostHeader;
