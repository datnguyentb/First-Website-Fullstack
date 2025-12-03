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

// ví dụ 10:30 AM hoặc 10:30 PM, tomorrow at 10:30 AM 30/12/2023
export const formatTimeWithDay = (date) => {
    if (!date) return '';
    const d = new Date(date);
    if (isNaN(d)) return '';
    const now = new Date();
    const isToday = d.toDateString() === now.toDateString();
    const isTomorrow = d.toDateString() === new Date(now.getTime() + 86400000).toDateString(); // 86400000 ms = 1 ngày
    const timeString = format(d, 'hh:mm a', { locale: enUS });
    if (isToday) return timeString;
    if (isTomorrow) return `Tomorrow at ${timeString}`;
    return format(d, "hh:mm a 'at' dd/MM/yyyy", { locale: enUS });
};

//chuyển đổi thời lươgng bài hát từ giây sang phút:giây
export function formatSongTime(seconds) {
    // 1. Xử lý trường hợp đầu vào không hợp lệ hoặc bằng 0
    if (typeof seconds !== 'number' || isNaN(seconds) || seconds < 0) {
        return '0:00';
    }

    const totalSeconds = Math.floor(seconds);

    // 2. Tính toán Giờ, Phút, Giây
    const h = Math.floor(totalSeconds / 3600); // Giờ
    const remainingSecondsAfterHours = totalSeconds % 3600;

    const m = Math.floor(remainingSecondsAfterHours / 60); // Phút
    const s = Math.floor(remainingSecondsAfterHours % 60); // Giây

    // 3. Định dạng chuỗi

    // Đảm bảo giây luôn có 2 chữ số (ví dụ: 5 -> '05')
    const formattedS = s.toString().padStart(2, '0');

    // Nếu thời lượng lớn hơn hoặc bằng 1 giờ (h >= 1)
    if (h >= 1) {
        // Đảm bảo phút cũng có 2 chữ số khi có giờ (ví dụ: 1:05:00)
        const formattedM = m.toString().padStart(2, '0');
        return `${h}:${formattedM}:${formattedS}`; // Định dạng h:mm:ss
    } else {
        // Nếu nhỏ hơn 1 giờ, chỉ trả về m:ss
        return `${m}:${formattedS}`; // Định dạng m:ss
    }
}
