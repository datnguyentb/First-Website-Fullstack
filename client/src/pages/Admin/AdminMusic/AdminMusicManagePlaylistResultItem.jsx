import classNames from 'classnames/bind';
import styles from './AdminMusicManage.module.scss';
import { Img } from '~/components';

const cx = classNames.bind(styles);

function AdminMusicManagePlaylistResultItem({ data }) {
    return (
        <div key={data.id} className={cx('playlist-header')}>
            <div className={cx('playlist-infor')}>
                <div className={cx('playlist-avatar')}>
                    <Img src={data.images?.[0]?.url || ''} />
                </div>
                <span className={cx('playlist-name')}>{data.name}</span>
            </div>
            <button className={cx('add-btn')}>Add Playlist</button>
        </div>
    );
}

export default AdminMusicManagePlaylistResultItem;
