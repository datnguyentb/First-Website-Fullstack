import axiosMainApi from '../user/axiosMainApi';

const spotifyApi = {
    searchSpotify: (q: string, type: string, limit: string | number) =>
        axiosMainApi.get('/api/spotify/search', {
            params: { q, type, limit },
        }),
    getAlbumInfo: (id: string) => axiosMainApi.get(`/api/music/spotify/album/${id}`),
    getArtistInfo: (id: string) => axiosMainApi.get(`/api/music/spotify/artist/${id}`),
    getArtistTopTracks: (id: string) => axiosMainApi.get(`/api/music/spotify/artist/${id}/top-tracks`),
    getGenres: () => axiosMainApi.get('/api/music/spotify/genres'),
};

export default spotifyApi;
