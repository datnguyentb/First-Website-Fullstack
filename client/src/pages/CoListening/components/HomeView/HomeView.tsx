import classNames from 'classnames/bind';
import styles from './HomeView.module.scss';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompactDisc } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '~/contexts';

const cx = classNames.bind(styles);

function HomeView({ setCreateRoomOpen }: { setCreateRoomOpen: (open: boolean) => void }) {
    const navigate = useNavigate();
    const [isOutRoom, setIsOutRoom] = useState(false);
    const [roomIdInput, setRoomIdInput] = useState(''); // Added state to manage the Join ID input field
    const { user } = useUserContext() ?? {};

    // Handle Join Room by ID button click
    const handleJoinRoomById = () => {
        if (!roomIdInput.trim()) {
            alert('Please enter a valid Room ID or Slug!');
            return;
        }
        // Redirects directly to the specific room URL using its slug/ID
        navigate(`/co-listening/room/${roomIdInput.trim()}`);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('home-view')}>
                <div className={cx('container')}>
                    <div className={cx('header')}>
                        <div className={cx('icon')}>
                            <FontAwesomeIcon icon={faCompactDisc} />
                        </div>
                        <h1>Co-Listen</h1>
                        <p>Create a private session, join via Room ID, or browse available public rooms.</p>
                    </div>
                    <div className={cx('body')}>
                        <div className={cx('create-room')}>
                            {/* Username Input Display */}
                            <input
                                className={cx('user-name')}
                                type="text"
                                placeholder="Your Username"
                                value={user ? user.fullName : 'Guest'}
                                disabled={true}
                            />

                            {/* Create Room Button */}
                            <button className={cx('create-room-btn')} onClick={() => setCreateRoomOpen(true)}>
                                Create New Room
                            </button>

                            {/* Browse Public Rooms Navigation */}
                            <Link to={'/co-listening/public-rooms'} className={cx('browse-room-btn')}>
                                Browse Public Rooms
                            </Link>

                            {/* Join with ID Sub-Section */}
                            <div className={cx('join-with-id')}>
                                <input
                                    type="text"
                                    placeholder="OR: ENTER ROOM ID..."
                                    value={roomIdInput}
                                    onChange={(e) => setRoomIdInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleJoinRoomById()}
                                />
                                <button className={cx('join-room-btn')} onClick={handleJoinRoomById}>
                                    Join
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={cx('footer')}>
                        {isOutRoom && <p className={cx('sub')}>You have left the room.</p>}
                        <p className={cx('copy')}>&copy; 2026 Co-Listening. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeView;
