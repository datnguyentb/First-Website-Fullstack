import classNames from 'classnames/bind';
import styles from './EditProfile.module.scss';
import baseUrl from '~/helper/baseUrl';
import Img from '~/components/Img';

const cx = classNames.bind(styles);

function EditAvatar({ preview, handleFileChange, user }) {
    return (
        <div className={cx('form-group', 'd-flex', 'align-items-center')}>
            <div className={cx('avatar')}>
                <Img src={preview || baseUrl(user.avatarUrl)} className={cx('avatar-custom')} />
            </div>
            <label htmlFor="avatarUpload" className={cx('upload-label')}>
                📸 Choose File
            </label>
            <input
                id="avatarUpload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className={cx('input-hidden')}
            />
        </div>
    );
}

export default EditAvatar;
