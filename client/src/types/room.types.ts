// src/types/room.types.ts

export interface Host {
    firstName: string;
    lastName: string;
}

export interface Track {
    title: string;
    artist: string;
}

export interface QueueItem {
    songId: string;
    addedBy: string;
    addedAt: string;
}

// 1. Interface chứa ÍT TRƯỜNG (Dùng cho danh sách ở Lobby)
export interface RoomListItem {
    _id: string;
    name: string;
    slug: string;
    playbackMode: 'radio' | 'party';
    roomMode: 'public' | 'private';
    host: Host | null;
    currentTrack: Track | null;
    membersCount?: number;
}

export interface RoomDetail extends RoomListItem {
    isPlaying: boolean;
    currentTime: number;
    password?: string | null;
    queue: QueueItem[];
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}
