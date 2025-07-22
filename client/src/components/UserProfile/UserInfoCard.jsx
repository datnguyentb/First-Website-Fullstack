import classNames from 'classnames/bind';
import styles from './UserProfile.module.scss';
import baseUrl from '~/helper/baseUrl';
import Img from '../Img';

const cx = classNames.bind(styles);
function UserInfoCard({ userDisplay }) {
    return (
        <div>
            <div className={cx('avatar')}>
                <Img src={baseUrl(userDisplay.avatarUrl)} alt="avatar" />
            </div>
            <h2 className={cx('name')}>{`${userDisplay.firstName} ${userDisplay.lastName}`}</h2>
            <div className={cx('joined', 'd-flex', 'justify-content-center', 'align-items-center')}>
                <span className={cx('member')}>Member</span>
                <div className={cx('line')}></div>
                <span className={cx('date')}>Joined {new Date(userDisplay.createdAt).toLocaleDateString()}</span>
            </div>
        </div>
    );
}

export default UserInfoCard;
