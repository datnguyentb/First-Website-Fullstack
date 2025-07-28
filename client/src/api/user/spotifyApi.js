const clientId = '8a0f8485bdc1411688c2eea98efd776e';
const clientSecret = 'f999fee927b54fec85b6d1dc6462e56e';

export async function getAccessToken() {
    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Basic ' + btoa(`${clientId}:${clientSecret}`),
            },
            body: 'grant_type=client_credentials',
        });

        if (!response.ok) throw new Error('Không lấy được token');

        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.error('Lỗi lấy token:', error);
        return null;
    }
}

// Lấy thông tin 1 bài hát
export async function getTrackInfo(trackId) {
    try {
        const token = await getAccessToken();
        if (!token) return null;

        const res = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) throw new Error('Không lấy được thông tin bài hát');

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Lỗi lấy bài hát:', error);
        return null;
    }
}

// Tìm kiếm bài hát
export async function searchTracks(query) {
    try {
        const token = await getAccessToken();
        if (!token) return [];

        const res = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=5`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) throw new Error('Không tìm được bài hát');

        const data = await res.json();
        return data.tracks.items;
    } catch (error) {
        console.error('Lỗi tìm kiếm:', error);
        return [];
    }
}
