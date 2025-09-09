import classNames from 'classnames/bind';
import styles from './PlaylistItem.module.scss';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faEdit, faEllipsis, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { PopupMenu } from '~/components';
import { toast } from 'react-toastify';
import useDeletePlaylist from '~/hooks/music/playlist/useDeletePlaylist';
import { usePlaylistContext } from '~/contexts';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function PlaylistItem({ playlist }) {
    const [visible, setVisible] = useState(false);
    const { setPlaylists } = usePlaylistContext();
    const { deletePlaylist } = useDeletePlaylist();

    const handleDeletePlaylist = async () => {
        const res = await deletePlaylist(playlist._id);
        if (res.success) {
            setPlaylists((prev) => prev.filter((pl) => pl._id !== playlist._id));
            toast.success(res.message);
        } else {
            console.log(res);
            toast.error(res.message);
        }
    };

    const items = [
        {
            title: 'Delete',
            icon: <FontAwesomeIcon icon={faTrash} />,
            onClick: handleDeletePlaylist,
        },
        {
            title: 'Copy Link',
            icon: <FontAwesomeIcon icon={faCopy} />,
        },
        {
            title: 'Edit',
            icon: <FontAwesomeIcon icon={faEdit} />,
        },
    ];

    return (
        <Link to={`/music/playlist/${playlist._id}`} className={cx('playlist-item', visible && 'hover')}>
            <span>{playlist.name}</span>
            <div className={cx('more-setting')}>
                <HeadlessTippy
                    visible={visible}
                    interactive={true}
                    placement="bottom-start"
                    onClickOutside={() => setVisible(false)}
                    render={(attrs) => (
                        <div tabIndex="-1" style={{ zIndex: 9999 }} {...attrs}>
                            <PopupMenu items={items} />
                        </div>
                    )}
                >
                    <div className={cx('more-btn')} title="more" onClick={() => setVisible(!visible)}>
                        <div className={cx('icon')}>
                            <FontAwesomeIcon icon={faEllipsis} />
                        </div>
                    </div>
                </HeadlessTippy>
            </div>
        </Link>
    );
}

export default PlaylistItem;
