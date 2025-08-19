import classNames from 'classnames/bind';
import styles from './AdminMusicManage.module.scss';
import { Img } from '~/components';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function AdminMusicManageTrackResultItem({ data, onAddTrack }) {
    const artistsName = data.artists.map((art) => art.name).join(', ');
    const [isAdded, setIsAdded] = useState(data.isAdded);
    return (
        <div className={cx('search-result-item')}>
            <div className={cx('song-avatar')}>
                <Img src={data.album.images[1].url} />
            </div>
            <div className={cx('song-infor')}>
                <span className={cx('song-name')} title={data.name}>
                    {data.name}
                </span>
                <div className={cx('song-artists', 'd-flex')}>{artistsName}</div>
            </div>
            <button
                className={cx('add-btn', isAdded ? 'added' : '')}
                disabled={isAdded}
                onClick={() => {
                    if (!isAdded) {
                        onAddTrack(data.id, data.name, artistsName);
                        setIsAdded(true);
                    }
                }}
            >
                <FontAwesomeIcon icon={faPlus} />
            </button>
        </div>
    );
}
export default AdminMusicManageTrackResultItem;
