import classNames from 'classnames/bind';
import styles from './Playlist.module.scss';
import { Img, Loading } from '~/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPlay } from '@fortawesome/free-solid-svg-icons';
import useGetPlaylistById from '~/hooks/music/playlist/useGetPlaylistById';
import { useParams } from 'react-router-dom';
import { Track } from './components';
import { usePlayerContext } from '~/contexts';
import baseUrl from '~/helper/baseUrl';

const cx = classNames.bind(styles);

function Playlist() {
    const { id } = useParams();
    const { playlistList, loading } = useGetPlaylistById(id);
    const { setCurrentIndex, setPlaylist, playSong } = usePlayerContext();
    let img_url;
    if (playlistList.type === 'favorite') {
        img_url = 'https://media.zim.vn/6784861bee7559208456151c/what-is-your-favorite.jpg';
    } else if (playlistList?.images?.length > 0) {
        img_url = baseUrl(playlistList.images);
    } else {
        img_url = 'no-image';
    }

    console.log(playlistList);

    const handleClickPlay = (index, song) => {
        const tracksArray = playlistList.tracks.map((item) => ({
            ...item.track,
        }));
        setPlaylist((prev) => {
            const isSame = prev.length === tracksArray.length && prev.every((t, i) => t._id === tracksArray[i]._id);
            return isSame ? prev : tracksArray;
        });

        setCurrentIndex(index);
        playSong(song);
    };

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
                            handleClickPlay(0, playlistList.tracks[0].track);
                        }}
                    >
                        <FontAwesomeIcon icon={faPlay} />
                    </div>
                    <div className={cx('add-btn')}>
                        <FontAwesomeIcon icon={faHeart} />
                    </div>
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
