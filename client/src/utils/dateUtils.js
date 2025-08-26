// utils/date.js
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime); // ✨ Chỉ cần gọi 1 lần duy nhất

// Chuyển Date ISO sang yyyy-MM-dd (phù hợp input type="date")
export function formatDate(input) {
    if (!input) return '';
    const d = new Date(input);
    if (isNaN(d)) return '';
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

// Format giờ HH:mm:ss
export function formatTime(input) {
    if (!input) return '';
    const d = new Date(input);
    if (isNaN(d)) return '';
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    const ss = String(d.getSeconds()).padStart(2, '0');
    return `${hh}:${mm}:${ss}`;
}

// Tính số ngày đến một mốc thời gian
export function daysUntil(date) {
    if (!date) return null;
    const now = new Date();
    const target = new Date(date);
    if (isNaN(target)) return null;
    const diff = target - now;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

// Full ngày giờ theo kiểu Anh
export const formatDateTimeFullEN = (isoString) => {
    const date = new Date(isoString);
    if (isNaN(date)) return '';
    return format(date, "EEEE, MMMM d, yyyy 'at' HH:mm", { locale: enUS });
};

// Ví dụ: 5 minutes ago
export const timeAgo = (date) => {
    if (!date) return '';
    return dayjs(date).fromNow();
};

//chuyển đổi thời lươgng bài hát từ giây sang phút:giây
export function formatSongTime(seconds) {
    if (!seconds || isNaN(seconds)) return '0:00';
    const m = Math.floor(seconds / 60); // phút
    const s = Math.floor(seconds % 60); // giây
    return `${m}:${s.toString().padStart(2, '0')}`;
}
