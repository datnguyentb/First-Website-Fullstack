// utils/dateUtils.js

// Chuyển Date ISO sang yyyy-MM-dd (phù hợp input type="date")
export function formatDate(input) {
    if (!input) return '';
    const d = new Date(input);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

// Format giờ HH:mm:ss
export function formatTime(input) {
    if (!input) return '';
    const d = new Date(input);
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
    const diff = target - now; // mili giây
    return Math.ceil(diff / (1000 * 60 * 60 * 24)); // đổi sang ngày
}
