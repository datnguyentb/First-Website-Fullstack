import classNames from 'classnames/bind';
import styles from './CoListening.module.scss';
import HomeView from './components/HomeView/HomeView';
import CreateRoom from './components/CreateRoom/CreateRoom';
import { FloatingLayer } from '~/components';
import { useState } from 'react';
import RoomView from './components/RoomView/RoomView';

const cx = classNames.bind(styles);

function CoListening() {
    const [isCreateRoomOpen, setCreateRoomOpen] = useState(false);
    return (
        <div className={cx('wrapper')}>
            <HomeView setCreateRoomOpen={setCreateRoomOpen} />
            {isCreateRoomOpen && (
                <FloatingLayer onClose={() => setCreateRoomOpen(false)}>
                    <CreateRoom setCreateRoomOpen={setCreateRoomOpen} />
                </FloatingLayer>
            )}
            {/* <RoomView /> */}
        </div>
    );
}

export default CoListening;
