declare module '*.scss';
declare module '*.sass';
declare module '*.css';
declare module '*.png' {
    const value: string;
    export default value;
}

declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';

// Thêm phần này để hết báo đỏ .env
interface ImportMetaEnv {
    readonly VITE_BACKEND_URL: string;
    // Bạn có thể thêm các biến env khác ở đây
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
