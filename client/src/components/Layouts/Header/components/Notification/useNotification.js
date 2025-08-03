import { useEffect, useState } from 'react';
import { getArrayItems } from '~/utils/getArrayItems';

const NOTI = [
    {
        id: 5,
        avatarText: 'TV',
        avatarColor: '#D35400',
        user: 'Trọng Vũ',
        message: 'đã nhắc đến bạn trong một bình luận.',
        timeAgo: '4 giờ trước',
        isRead: false,
    },
    {
        id: 6,
        avatarText: 'MH',
        avatarColor: '#1ABC9C',
        user: 'Minh Hoàng',
        message: 'đã chia sẻ bài viết của bạn.',
        timeAgo: '1 ngày trước',
        isRead: false,
    },
    {
        id: 7,
        avatarText: 'QT',
        avatarColor: '#9B59B6',
        user: 'Quang Trung',
        message: 'đã gửi cho bạn một tin nhắn mới.',
        timeAgo: '2 ngày trước',
        isRead: true,
    },
    {
        id: 8,
        avatarText: 'PN',
        avatarColor: '#E74C3C',
        user: 'Phương Nam',
        message: 'đã bình luận vào ảnh của bạn.',
        timeAgo: '6 ngày trước',
        isRead: false,
    },
    {
        id: 1,
        avatarText: 'LM',
        avatarColor: '#8E44AD',
        user: 'Lâm Minh và 3 người khác',
        message: 'đã bày tỏ cảm xúc về bài viết của bạn.',
        timeAgo: '5 ngày trước',
        isRead: false,
    },
    {
        id: 9,
        avatarText: 'DT',
        avatarColor: '#34495E',
        user: 'Diễm Trang',
        message: 'đã thêm bạn vào nhóm "ReactJS Developers".',
        timeAgo: '1 tuần trước',
        isRead: true,
    },
    {
        id: 2,
        avatarText: 'CS',
        avatarColor: '#E67E22',
        user: "Bài viết 'Chia sẻ kiến thức lập trình'",
        message: 'mới được thêm vào nhóm của bạn.',
        timeAgo: '2 tuần trước',
        isRead: false,
    },
    {
        id: 10,
        avatarText: 'KD',
        avatarColor: '#2C3E50',
        user: 'Kim Dung',
        message: 'đã thích bình luận của bạn.',
        timeAgo: '2 tuần trước',
        isRead: true,
    },
    {
        id: 3,
        avatarText: 'PT',
        avatarColor: '#3498DB',
        user: 'Phương Trang',
        message: 'đã phản hồi bình luận của bạn.',
        timeAgo: '1 tháng trước',
        isRead: true,
    },
    {
        id: 4,
        avatarText: 'HN',
        avatarColor: '#2ECC71',
        user: 'Hà Ngọc',
        message: 'đã gửi cho bạn một lời mời kết bạn.',
        timeAgo: '3 tháng trước',
        isRead: true,
    },
];

export function useNotification() {
    const [isLess, setIsLess] = useState(true);
    const [notifications, setNotifications] = useState(getArrayItems(NOTI, 4));

    return { isLess, setIsLess, notifications, setNotifications, NOTI };
}
