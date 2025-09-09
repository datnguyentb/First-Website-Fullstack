import classNames from 'classnames/bind';
import styles from './MusicNavigationSlidebar.module.scss';
import { logo_img } from '~/assets/imgs/logo';
import { FloatingLayer, Img } from '~/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockRotateLeft, faHeart, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button } from '~/components';
import { CreatePlaylist, PlaylistItem, Menu, PlaylistItems } from './components';
import useMusicNavigationSlidebar from './useMusicNavigationSlidebar';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function MusicNavigationSlidebar() {
    const { showCreatePlaylist, handleCreatePlaylist, handleCloseCreatePlaylist, setShowCreatePlaylist } =
        useMusicNavigationSlidebar();

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Link to="/music" className={cx('logo-wrapper')}>
                    <div className={cx('logo')}>
                        <Img src={logo_img.main_logo} />
                    </div>
                    <div className={cx('title')}>Twirl</div>
                </Link>
                <div className={cx('slogan')}>Spin Your Vibe</div>
            </div>

            <Menu />

            <hr className={cx('line')} />
            <div className={cx('playlist')}>
                <PlaylistItems />

                <Button
                    onClick={handleCreatePlaylist}
                    outline
                    className={cx('add-btn')}
                    leftIcon={<FontAwesomeIcon icon={faPlus} />}
                    style_3
                >
                    Add Playlist
                </Button>

                {showCreatePlaylist && (
                    <FloatingLayer onClose={handleCloseCreatePlaylist}>
                        <CreatePlaylist
                            onClose={handleCloseCreatePlaylist}
                            setShowCreatePlaylist={setShowCreatePlaylist}
                        />
                    </FloatingLayer>
                )}
            </div>
        </div>
    );
}

export default MusicNavigationSlidebar;
