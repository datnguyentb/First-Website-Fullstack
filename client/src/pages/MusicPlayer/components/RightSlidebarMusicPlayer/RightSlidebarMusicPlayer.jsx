import { useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './RightSlidebarMusicPlayer.module.scss';
import { faClock, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { Song } from '../../components';
import { Section } from '~/components';

const cx = classNames.bind(styles);

function RightSlidebarMusicPlayer({ currentPlaylist, currentPlay, onClick, history }) {
    const [indexOption, setIndexOption] = useState(0);

    return (
        <div className={cx('wrapper', 'd-flex')}>
            <div className={cx('option-bar', 'd-flex')}>
                <div className={cx('tab-group', 'd-flex')}>
                    <button
                        onClick={() => {
                            setIndexOption(0);
                        }}
                        className={cx('tab', indexOption === 0 && 'tab-active')}
                    >
                        Danh sách phát
                    </button>
                    <button onClick={() => setIndexOption(1)} className={cx('tab', indexOption === 1 && 'tab-active')}>
                        Nghe gần đây
                    </button>
                </div>

                <button className={cx('icon-btn')}>
                    <FontAwesomeIcon icon={faClock} />
                </button>

                <button className={cx('icon-btn')}>
                    <FontAwesomeIcon icon={faEllipsis} />
                </button>
            </div>
            <div className={cx('current_play', 'mt-4')}>
                <Song active data={currentPlay} />
            </div>
            <hr className={cx('line')} />
            <div className={cx('playlist_wrapper')}>
                <Section title={indexOption === 0 ? 'Tiếp theo' : 'Bài hát đã nghe'}>
                    {indexOption === 0
                        ? currentPlaylist.map((song) => (
                              <Song onClick={() => onClick(song.id)} key={song.id} data={song} />
                          ))
                        : history.map((song) => <Song onClick={(id) => onClick(id)} key={song.id} data={song} />)}
                </Section>
            </div>
        </div>
    );
}

export default RightSlidebarMusicPlayer;
