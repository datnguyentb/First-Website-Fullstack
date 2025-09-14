import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Song.module.scss';
import { Img, Button, PopupMenu } from '~/components';
import {
    faCircleCheck,
    faCirclePlus,
    faEllipsis,
    faFolderPlus,
    faHeart,
    faPlay,
    faSquareCaretRight,
} from '@fortawesome/free-solid-svg-icons';
import Loading from '../Loading';
import { useSong } from './useSong';
import React, { useMemo } from 'react';

const cx = classNames.bind(styles);

function Song({ data, active = false, shadow, second_style, third_style }) {
    //useSOng (Component sử lý funtions)
    const {
        playSong,
        currentSong,
        playlists,
        isPlaying,
        isLiked,
        likeSong,
        unlikeSong,
        visible,
        setVisible,
        handleAddToLibrary,
        handleRemoveFromLibrary,
        handleAddToPlaylist,
        handleRemoveTrackFromPlaylist,
        handleAddToQueue,
        handlePlayNext,
        handleOnClickName,
        handleOnClickArtists,
    } = useSong(data);

    //tạo mảng playlist cho vào items
    const myPlaylists = playlists.filter((item) => item.isOwner);

    const playlistChildren = useMemo(() => {
        if (myPlaylists.length === 0) {
            return [{ title: "You don't have any playlist!", no_click: true }];
        }

        return myPlaylists.map((item) => {
            const isInPlaylist = item.trackIds.includes(data._id);
            return {
                title: item.name,
                icon: (
                    <FontAwesomeIcon
                        className={cx(isInPlaylist && 'added')}
                        icon={isInPlaylist ? faCircleCheck : faFolderPlus}
                    />
                ),
                onClick: () =>
                    isInPlaylist
                        ? handleRemoveTrackFromPlaylist(item._id, data._id)
                        : handleAddToPlaylist(item._id, data._id),
            };
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [myPlaylists, data._id]);

    //items menu
    const items = [
        {
            title: isLiked(data._id) ? 'Remove from Library' : 'Add to Library',
            icon: <FontAwesomeIcon className={cx('liked')} icon={faHeart} />,
            onClick: isLiked(data._id) ? handleRemoveFromLibrary : handleAddToLibrary,
        },
        {
            title: 'Add to Queue',
            icon: <FontAwesomeIcon icon={faFolderPlus} />,
            onClick: handleAddToQueue,
        },
        {
            title: 'Play Next',
            icon: <FontAwesomeIcon icon={faSquareCaretRight} />,
            onClick: handlePlayNext,
        },
        {
            title: 'Add to Playlist',
            icon: <FontAwesomeIcon icon={faCirclePlus} />,
            children: playlistChildren,
        },
    ];

    const classes = cx('wrapper', {
        active,
        visible,
        second_style,
        third_style,
        shadow,
    });

    if (!data) {
        return <div>no data</div>;
    }

    return (
        <div className={classes}>
            <div className={cx('song-box')}>
                {/* Song image */}
                <div
                    className={cx('song-img')}
                    onClick={() => {
                        playSong(data);
                    }}
                >
                    <Img src={data?.album ? data.album.images[1].url : ''} />

                    {isPlaying && currentSong._id == data._id ? (
                        <div className={cx('playing')}>
                            <div className={cx('music-wave')}>
                                <Loading type="wave" />
                            </div>
                        </div>
                    ) : (
                        <div className={cx('hover-cover')}>
                            <FontAwesomeIcon icon={faPlay} />
                        </div>
                    )}
                </div>

                {/* Song info */}
                <div className={cx('song-info', 'ms-3')}>
                    {second_style && <div className={cx('status')}>Nghe gần đây</div>}
                    <div className={cx('song-name')}>
                        <span className={cx('name')} onClick={handleOnClickName} title={data.name}>
                            {data.name}
                        </span>
                    </div>
                    <ul className={cx('song-arti')}>
                        {data.artists.map((artists, index) => (
                            <React.Fragment key={index}>
                                {`${index !== 0 ? ', ' : ''}`}
                                <span
                                    title={artists.name}
                                    className={cx('artists')}
                                    onClick={(e) => handleOnClickArtists(e, artists.id)}
                                >
                                    {artists.name}
                                </span>
                            </React.Fragment>
                        ))}
                    </ul>
                </div>
            </div>
            {!second_style && !third_style && (
                <div className={cx('option', 'd-flex', 'ms-3')}>
                    {/* Like and unline */}
                    <div className={cx('option-icon', 'like')}>
                        {isLiked(data._id) ? (
                            <Button
                                style_2
                                leftIcon={<FontAwesomeIcon className={cx('liked')} icon={faHeart} />}
                                onClick={() => {
                                    unlikeSong(data._id);
                                }}
                            />
                        ) : (
                            <Button
                                style_2
                                leftIcon={
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className={cx('bi', 'bi-heart')}
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                                    </svg>
                                }
                                onClick={() => {
                                    likeSong(data._id);
                                }}
                            />
                        )}
                    </div>

                    {/* More Action */}
                    <HeadlessTippy
                        visible={visible}
                        offset={(0, 0)}
                        interactive={true}
                        placement="bottom-start"
                        onClickOutside={() => setVisible(false)}
                        render={(attrs) => (
                            <div tabIndex="-1" style={{ zIndex: 9999 }} {...attrs}>
                                <PopupMenu items={items} visible={visible} />
                            </div>
                        )}
                    >
                        <div
                            className={cx('option-icon', 'more')}
                            title="more"
                            onClick={(e) => {
                                e.preventDefault();
                                setVisible(!visible);
                            }}
                        >
                            <FontAwesomeIcon icon={faEllipsis} />
                        </div>
                    </HeadlessTippy>
                </div>
            )}
        </div>
    );
}

Song.propTypes = {
    data: PropTypes.object.isRequired,
    active: PropTypes.bool,
    shadow: PropTypes.bool,
    second_style: PropTypes.bool,
};

export default Song;
