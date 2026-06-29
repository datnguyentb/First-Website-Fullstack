import classNames from 'classnames/bind';
import styles from './Lobby.module.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

// Mock room data translated to global English titles
const mockRooms = [
    {
        id: 'ROOM-A93B',
        name: 'Late Night Lofi Chill 🎧',
        hostName: 'Guest 123',
        playbackMode: 'radio',
        currentTrack: { title: 'Left Hand Pointing at the Moon', artist: 'Charlie Zhou' },
        membersCount: 42,
    },
    {
        id: 'ROOM-KF82',
        name: 'Rap Beats & High Energy 🔥',
        hostName: 'Alex Minh',
        playbackMode: 'party',
        currentTrack: { title: 'Behind the Glamour', artist: 'RHYDER' },
        membersCount: 128,
    },
    {
        id: 'ROOM-X721',
        name: 'Timeless 2000s US-UK Pop Hits',
        hostName: 'Jessica',
        playbackMode: 'radio',
        currentTrack: { title: 'Until I Found You', artist: 'Stephen Sanchez' },
        membersCount: 15,
    },
    {
        id: 'ROOM-M302',
        name: 'Coding & Coffee ☕ Open Queue - Add Tracks!',
        hostName: 'Dev_Sean',
        playbackMode: 'party',
        currentTrack: { title: 'Lover', artist: 'Taylor Swift' },
        membersCount: 8,
    },
    {
        id: 'ROOM-T988',
        name: 'Club Remix & Dance Anthems 💥',
        hostName: 'Guest 999',
        playbackMode: 'radio',
        currentTrack: { title: 'Love Sorrow', artist: 'Dam Vinh Hung' },
        membersCount: 256,
    },
];

export default function Lobby() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterMode, setFilterMode] = useState('all');

    // Filter logic handling live interactions
    const filteredRooms = mockRooms.filter((room) => {
        const matchesSearch =
            room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            room.hostName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            room.currentTrack.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            room.currentTrack.artist.toLowerCase().includes(searchQuery.toLowerCase());

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

                    {/* Toolbar: Search input & Filter drop-down list */}
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
                                {filteredRooms.map((room) => (
                                    <div key={room.id} className={cx('room-card')}>
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
                                                    Host: <b>{room.hostName}</b>
                                                </span>
                                            </div>
                                            <div>
                                                <i className="fa-solid fa-music"></i>
                                                <span className={cx('track-name')}>
                                                    {room.currentTrack.title} &bull; {room.currentTrack.artist}
                                                </span>
                                            </div>
                                        </div>

                                        <div className={cx('room-bottom')}>
                                            <div className={cx('member-count')}>
                                                <i className="fa-solid fa-headphones"></i> {room.membersCount} listening
                                            </div>
                                            <Link
                                                to={`/co-listening/room/${room.id}`}
                                                className={cx('join-action-btn')}
                                            >
                                                Join Room
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            /* Empty State Context Fallback */
                            <div className={cx('empty-state')}>
                                <i className="fa-solid fa-music-slash"></i>
                                <p>No listening rooms found matching your criteria.</p>
                            </div>
                        )}
                    </div>

                    {/* Footer Component */}
                    <div className={cx('footer')}>
                        <p className={cx('copy')}>&copy; 2026 Co-Listening. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
