import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './MusicPlayer.module.scss';
import { TopBar, SuggestedList, AlbumList } from '../components';
import { Section } from '~/components';

import { songsdb } from '../../../databseFake/songsdb';

const cx = classNames.bind(styles);

const fakeCurrentPlaylist = songsdb.slice(0, 20);

function MusicPlayer() {
    const [currentPlaylist, setCurrentPlaylist] = useState(fakeCurrentPlaylist);

    useEffect(() => {
        document.title = 'Twirl | Music';
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content-wrapper')}>
                <div className={cx('content')}>
                    <TopBar />

                    <div className={cx('mt-5')}>
                        <Section title_2="Gợi ý cho bạn">
                            <SuggestedList />
                        </Section>
                    </div>
                    <div className={cx('mt-5')}>
                        <Section title_2="Giai điệu đón hè">
                            <AlbumList data={currentPlaylist} number={6} col={6} />
                        </Section>
                    </div>
                    <div className={cx('mt-5')}>
                        <Section title_2="Nhạc hot thịnh hành">
                            <AlbumList data={currentPlaylist} number={6} col={6} />
                        </Section>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MusicPlayer;
