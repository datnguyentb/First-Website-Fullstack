import { User } from './user';

export interface Song {
    _id: string;
    title: string;
    artist: string;
    duration: number;
    coverUrl?: string;
}

export interface QueueItem {
    _id: string;
    song: Song;
    addedBy: User;
    addedAt: string;
}

export interface CoListeningRoom {
    _id: string;
    name: string;
    slug: string;
    hostId: string | User;
    roomMode: 'public' | 'private';
    playbackMode: 'radio' | 'party';
    password?: string | null;
    currentTrack: Song | null;
    isPlaying: boolean;
    currentTime: number;
    queue: QueueItem[];
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}
