import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

let cachedToken = null;
let tokenExpiry = 0;

export async function getAccessToken() {
    const now = Date.now();
    if (cachedToken && now < tokenExpiry) {
        return cachedToken;
    }

    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    const authString = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    const res = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${authString}`,
        },
        body: 'grant_type=client_credentials',
    });

    if (!res.ok) throw new Error('Không lấy được token từ Spotify');

    const data = await res.json();
    cachedToken = data.access_token;
    tokenExpiry = now + data.expires_in * 1000; // expires_in = giây

    return cachedToken;
}
