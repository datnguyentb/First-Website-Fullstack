import classNames from 'classnames/bind';
import styles from './AdminMusicManage.module.scss';
import { Img } from '~/components';

const cx = classNames.bind(styles);

function AdminMusicManageTrackResultItem({ data }) {
    return (
        <div className={cx('search-result-item')}>
            <div className={cx('song-avatar')}>
                <Img src={data.album.images[1].url} />
            </div>
            <div className={cx('song-infor')}>
                <span className={cx('song-name')} title={data.name}>
                    {data.name}
                </span>
                <div className={cx('song-artists', 'd-flex')}>
                    {data.artists.map((art, index) => (
                        <div key={art.id}>
                            {index > 0 && ', '}
                            {art.name}
                        </div>
                    ))}
                </div>
            </div>
            <button className={cx('add-btn')}>Add Track</button>
        </div>
    );
}

export default AdminMusicManageTrackResultItem;
