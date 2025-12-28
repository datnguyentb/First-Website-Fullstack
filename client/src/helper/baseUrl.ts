export default function baseUrl(path: string) {
    const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
    return path ? `${BASE_URL}${path}` : BASE_URL;
}
