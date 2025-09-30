import classNames from 'classnames/bind';
import styles from './Track.module.scss';
import React from 'react';
import { faHeart, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Img } from '~/components';
import { formatDate } from '~/utils/dateUtils';
import { useFavoriteContext, usePlayerContext } from '~/contexts';

const cx = classNames.bind(styles);

function Track({ data, owner, index, handleCLickPlay }) {
    const { likeSong, unlikeSong, isLiked } = useFavoriteContext();
    const { currentSong } = usePlayerContext();
    const track = data.track;
    const artist = track.artists.map((artists, index) => (
        <React.Fragment key={index}>
            {`${index !== 0 ? ', ' : ''}`}
            <span title={artists.name} className={cx('artist')} onClick={(e) => handleOnClickArtists(e, artists.id)}>
                {artists.name}
            </span>
        </React.Fragment>
    ));

    const handleOnClickArtists = (e, artistId) => {
        e.preventDefault();
        console.log('Click artist id: ', artistId);
    };

    return (
        <div key={track.id} className={cx('row')}>
            <div className={cx('title')}>
                <div
                    className={cx('img')}
                    onClick={() => {
                        handleCLickPlay(index, data.track);
                    }}
                >
                    <Img src={track.album.images[1].url} alt={track.name} />
                    <div className={cx('play-btn')}>
                        <FontAwesomeIcon icon={faPlay} />
                    </div>
                </div>
                <div className={cx('title-text')}>
                    <span className={cx('song-name')}>{track.name}</span>
                    <span className={cx('artists')}>{artist}</span>
                </div>
            </div>
            <div className={cx('album')}>{track.album.name}</div>
            <div className={cx('added-by')}>{`${owner.firstName} ${owner.lastName}`}</div>
            <div className={cx('date')}>{formatDate(data.addedAt)}</div>
            {isLiked(data.track._id) ? (
                <div
                    className={cx('like', 'active')}
                    onClick={() => {
                        unlikeSong(data.track._id);
                    }}
                >
                    <FontAwesomeIcon icon={faHeart} />
                </div>
            ) : (
                <div
                    className={cx('like')}
                    onClick={() => {
                        likeSong(data.track._id);
                    }}
                >
                    <FontAwesomeIcon icon={faHeart} />
                </div>
            )}
        </div>
    );
}

export default Track;
