import classNames from 'classnames/bind';
import styles from './Lobby.module.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useGetAllRoom from '~/hooks/coListeningRoom/useGetAllRoom';
import { RoomListItem } from '~/types/room.types';

const cx = classNames.bind(styles);

export default function Lobby() {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filterMode, setFilterMode] = useState<string>('all');

    const [rooms, setRooms] = useState<RoomListItem[]>([]);

    const { getAllRoom } = useGetAllRoom();

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                // Nếu hàm getAllRoom của cậu chưa định nghĩa kiểu, ta ép kiểu (Type Assertion) ở đây
                const data = (await getAllRoom()) as RoomListItem[];
                setRooms(data || []);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu phòng:', error);
            }
        };

        fetchRooms();
    }, []);

    // Logic tìm kiếm và bộ lọc đã có Type bảo vệ
    const filteredRooms = rooms.filter((room: RoomListItem) => {
        const query = searchQuery.toLowerCase();

        const hostFullName = room.host ? `${room.host.firstName || ''} ${room.host.lastName || ''}`.toLowerCase() : '';

        const matchesSearch =
            room.name?.toLowerCase().includes(query) ||
            false ||
            hostFullName.includes(query) ||
            room.currentTrack?.title?.toLowerCase().includes(query) ||
            false ||
            room.currentTrack?.artist?.toLowerCase().includes(query) ||
            false;

        const matchesMode = filterMode === 'all' || room.playbackMode === filterMode;

        return matchesSearch && matchesMode;
    });

    return (
        <div className={cx('wrapper')}>
            <div className={cx('browse-view')}>
                <div className={cx('container')}>
                    <div className={cx('header')}>
                        <div className={cx('back-action')}>
                            <button className={cx('back-btn')} onClick={() => window.history.back()}>
                                <i className="fa-solid fa-arrow-left"></i> Back
                            </button>
                        </div>
                        <div className={cx('icon')}>
                            <i className={cx('fa-solid', 'fa-compact-disc', 'animated-disc')}></i>
                        </div>
                        <h1>Public Rooms</h1>
                        <p className={cx('description')}>
                            Discover live audio spaces, share streams, and listen alongside community groups in
                            real-time.
                        </p>
                    </div>

                    {/* Toolbar */}
                    <div className={cx('toolbar')}>
                        <div className={cx('search-box')}>
                            <i className={cx('fa-solid', 'fa-magnifying-glass', 'search-icon')}></i>
                            <input
                                type="text"
                                placeholder="Search rooms, hosts, tracks..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className={cx('filter-box')}>
                            <select id="filterMode" value={filterMode} onChange={(e) => setFilterMode(e.target.value)}>
                                <option value="all">All Modes</option>
                                <option value="radio">Radio Mode</option>
                                <option value="party">Party Mode</option>
                            </select>
                        </div>
                    </div>

                    {/* Room Grid Display */}
                    <div className={cx('body')}>
                        {filteredRooms.length > 0 ? (
                            <div className={cx('room-grid')}>
                                {filteredRooms.map((room: RoomListItem) => (
                                    <div key={room._id} className={cx('room-card')}>
                                        <div className={cx('room-top')}>
                                            <div className={cx('room-title')} title={room.name}>
                                                {room.name}
                                            </div>
                                            <span className={cx('badge', room.playbackMode)}>
                                                {room.playbackMode === 'radio' ? 'Radio' : 'Party'}
                                            </span>
                                        </div>

                                        <div className={cx('room-info')}>
                                            <div>
                                                <i className="fa-solid fa-circle-user"></i>
                                                <span>
                                                    Host:{' '}
                                                    <b>
                                                        {room.host
                                                            ? `${room.host.firstName} ${room.host.lastName}`
                                                            : 'Unknown'}
                                                    </b>
                                                </span>
                                            </div>
                                            <div>
                                                <i className="fa-solid fa-music"></i>
                                                <span className={cx('track-name')}>
                                                    {room.currentTrack ? (
                                                        `${room.currentTrack.title} • ${room.currentTrack.artist}`
                                                    ) : (
                                                        <span
                                                            className={cx('no-track')}
                                                            style={{ color: '#888', fontStyle: 'italic' }}
                                                        >
                                                            No track playing
                                                        </span>
                                                    )}
                                                </span>
                                            </div>
                                        </div>

                                        <div className={cx('room-bottom')}>
                                            <div className={cx('member-count')}>
                                                <i className="fa-solid fa-headphones"></i> {room.membersCount || 0}{' '}
                                                listening
                                            </div>
                                            <Link
                                                to={`/co-listening/room/${room.slug}`}
                                                className={cx('join-action-btn')}
                                            >
                                                {room.roomMode == 'private' && '🔒'} Join Room
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className={cx('empty-state')}>
                                <i className="fa-solid fa-music-slash"></i>
                                <p>No listening rooms found matching your criteria.</p>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className={cx('footer')}>
                        <p className={cx('copy')}>&copy; 2026 Co-Listening. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
