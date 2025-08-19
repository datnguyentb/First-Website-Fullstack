import classNames from 'classnames/bind';
import styles from './AdminMusicManage.module.scss';
import { Img } from '~/components';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function AdminMusicManagePlaylistResultItem({ data, onAddPlaylist }) {
    const [isAdded, setIsAdded] = useState(data.isAdded);
    return (
        <div key={data.id} className={cx('playlist-header')}>
            <div className={cx('playlist-infor')}>
                <div className={cx('playlist-avatar')}>
                    <Img src={data.images?.[0]?.url || ''} />
                </div>
                <span className={cx('playlist-name')}>{data.name}</span>
            </div>
            <button
                className={cx('add-btn', isAdded ? 'added' : '')}
                disabled={isAdded}
                onClick={() => {
                    {
                        if (!isAdded) {
                            onAddPlaylist(data.id, data.name, data.tracks.total);
                            setIsAdded(true);
                        }
                    }
                }}
            >
                <FontAwesomeIcon icon={faPlus} />
            </button>
        </div>
    );
}

export default AdminMusicManagePlaylistResultItem;
