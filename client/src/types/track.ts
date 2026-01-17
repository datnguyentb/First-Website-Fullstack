export interface AdminTrackResponse {
    _id: string;
    album: string;
    artists: Artists[];
    isReady: boolean;
    name: string;
    spotifyId: string;
}

export interface Track {
    _id: string;
    isLiked: boolean;
    album: Album;
    artists: Artists[];
}

//detail
interface Album {
    _id: string;
    spotifyId: string;
    name: string;
    images: Image[];
    release_date: string;
    release_date_precision: string;
    artists: Artists[];
    isLiked: false;
}

interface Artists {
    id: string;
    _id: string;
    name: string;
    href: string;
    role: string;
}

interface Image {
    _id: string;
    url: string;
    height: number;
    width: number;
}
