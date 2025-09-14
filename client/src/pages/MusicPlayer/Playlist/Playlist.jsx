import classNames from 'classnames/bind';
import styles from './Playlist.module.scss';
import HeadlessTippy from '@tippyjs/react/headless';
import { Img, Loading, PopupMenu } from '~/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleMinus, faEdit, faEllipsis, faHeart, faLock, faPlay, faShare } from '@fortawesome/free-solid-svg-icons';
import { Track } from './components';
import baseUrl from '~/helper/baseUrl';
import { usePlaylist } from './usePlaylist';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Playlist() {
    const { loading, playlistList, handleClickPlay } = usePlaylist();
    const [showActionPlaylist, setShowActionPlaylist] = useState(false);

    let img_url;
    if (playlistList.type === 'favorite') {
        img_url = 'https://media.zim.vn/6784861bee7559208456151c/what-is-your-favorite.jpg';
    } else if (playlistList?.images?.length > 0) {
        img_url = baseUrl(playlistList.images);
    } else {
        img_url = 'no-image';
    }

    const handleEditPlaylist = () => {
        console.log('Edit playlist click!');
    };

    const handleRemovePlaylist = () => {
        console.log('Delete playlist click!');
    };

    const handleMakePlaylistPrivate = () => {
        console.log('Make playlist private click!');
    };

    const handleSharePlaylist = () => {
        console.log('Share playlist click!');
    };

    const items = [
        {
            title: 'Edit details',
            icon: <FontAwesomeIcon className={cx('edit')} icon={faEdit} />,
            onClick: handleEditPlaylist,
        },
        {
            title: 'Delete',
            icon: <FontAwesomeIcon icon={faCircleMinus} />,
            onClick: handleRemovePlaylist,
        },
        {
            title: 'Make private',
            icon: <FontAwesomeIcon icon={faLock} />,
            onClick: handleMakePlaylistPrivate,
        },
        {
            title: 'Share',
            icon: <FontAwesomeIcon icon={faShare} />,
            onClick: handleSharePlaylist,
        },
    ];

    if (loading) {
        return <Loading />;
    } else {
        return (
            <div className={cx('wrapper')}>
                <div className={cx('playlist-header')}>
                    <div className={cx('playlist-avatar')}>
                        <Img src={img_url} />
                    </div>
                    <div className={cx('playlist-detail')}>
                        <span className={cx('type')}>Playlist</span>
                        <h1 className={cx('name')}>{playlistList.name}</h1>
                        <p className={cx('sub')}>{playlistList.description}</p>
                    </div>
                </div>
                <div className={cx('playlist-action')}>
                    <div
                        className={cx('play-btn')}
                        onClick={() => {
                            handleClickPlay(0, playlistList?.tracks[0]?.track);
                        }}
                    >
                        <FontAwesomeIcon icon={faPlay} />
                    </div>

                    {playlistList.type !== 'favorite' && (
                        <div className={cx('action')}>
                            <div className={cx('add-btn')}>
                                <FontAwesomeIcon icon={faHeart} />
                            </div>
                            <>
                                <HeadlessTippy
                                    visible={showActionPlaylist}
                                    offset={(0, 0)}
                                    interactive={true}
                                    placement="bottom-start"
                                    onClickOutside={() => setShowActionPlaylist(false)}
                                    render={(attrs) => (
                                        <div tabIndex="-1" style={{ zIndex: 9999 }} {...attrs}>
                                            <PopupMenu items={items} />
                                        </div>
                                    )}
                                >
                                    <div
                                        className={cx('more-action')}
                                        onClick={() => {
                                            setShowActionPlaylist(true);
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faEllipsis} />
                                    </div>
                                </HeadlessTippy>
                            </>
                        </div>
                    )}
                </div>
                <div className={cx('playlist-list')}>
                    <div className={cx('header')}>
                        <div>Title</div>
                        <div>Album</div>
                        <div>Added by</div>
                        <div>Date added</div>
                        <div></div>
                    </div>

                    {playlistList?.tracks &&
                        playlistList.tracks.map((track, index) => (
                            <Track
                                key={track._id}
                                data={track}
                                owner={playlistList.owner}
                                handleCLickPlay={handleClickPlay}
                                index={index}
                            />
                        ))}
                </div>
            </div>
        );
    }
}

export default Playlist;
