import classNames from 'classnames/bind';
import styles from './CreateRoom.module.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCreateRoom from '~/hooks/coListeningRoom/useCreateRoom';
import useJoinConversation from '~/socket/hook/conversation/useJoinConversation';
const cx = classNames.bind(styles);

function CreateRoom({ setCreateRoomOpen }: { setCreateRoomOpen: (open: boolean) => void }) {
    const navigate = useNavigate();
    const [roomName, setRoomName] = useState('');
    const [password, setPassword] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [playbackMode, setPlaybackMode] = useState<'radio' | 'party'>('radio');
    const [loading, setLoading] = useState(false);
    const { createRoom, loading: createLoading, error: createError } = useCreateRoom();

    // Handle API request to create a room
    const handleCreateRoom = async () => {
        if (!roomName.trim()) {
            alert('Please enter a room name!');
            return;
        }

        // Gửi thẳng Object JSON sạch sẽ
        const roomPayload = {
            name: roomName.trim(),
            roomMode: isPrivate ? 'private' : 'public',
            playbackMode: playbackMode,
            password: isPrivate ? password : null,
        };

        // Truyền thẳng Object vào hook
        const newRoom = await createRoom(roomPayload as any);

        if (newRoom && newRoom.slug) {
            setCreateRoomOpen(false);
            navigate(`/co-listening/room/${newRoom.slug}`);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>Create New Room</h2>

            {/* Room Name Input */}
            <input
                className={cx('input', 'room-name')}
                type="text"
                placeholder="Room Name (Required)"
                value={roomName}
                autoComplete="off"
                onChange={(e) => setRoomName(e.target.value)}
            />

            {/* Playback Mode Selector */}
            <div className={cx('section')}>
                <label className={cx('label')}>Playback Mode</label>
                <div className={cx('mode-selector')}>
                    <button
                        type="button"
                        className={cx('mode-btn', { active: playbackMode === 'radio' })}
                        onClick={() => setPlaybackMode('radio')}
                    >
                        <span className={cx('mode-title')}>📻 Radio Mode</span>
                        <span className={cx('mode-desc')}>Only the Host can queue & switch tracks</span>
                    </button>
                    <button
                        type="button"
                        className={cx('mode-btn', { active: playbackMode === 'party' })}
                        onClick={() => setPlaybackMode('party')}
                    >
                        <span className={cx('mode-title')}>🎉 Party Mode</span>
                        <span className={cx('mode-desc')}>Anyone in the room can add music</span>
                    </button>
                </div>
            </div>

            {/* Private Room Password Toggle */}
            <div className={cx('password-toggle')}>
                <label className={cx('label')}>Set Password (Private Room)</label>
                <input
                    className={cx('checkbox')}
                    type="checkbox"
                    checked={isPrivate}
                    onChange={(e) => setIsPrivate(e.target.checked)}
                />
            </div>

            {isPrivate && (
                <input
                    className={cx('input')}
                    type="password"
                    autoComplete="new-password"
                    placeholder="Enter room password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            )}

            {/* Action Buttons */}
            <div className={cx('action-buttons')}>
                <button className={cx('btn', 'cancel')} onClick={() => setCreateRoomOpen(false)} disabled={loading}>
                    Cancel
                </button>
                <button className={cx('btn', 'create')} onClick={handleCreateRoom} disabled={loading}>
                    {loading ? 'Creating...' : 'Create Room'}
                </button>
            </div>
        </div>
    );
}

export default CreateRoom;
