import classNames from 'classnames/bind';
import styles from './MessagesArea.module.scss';
import { ChatMessage } from './components';
import { useEffect, useRef } from 'react';
const cx = classNames.bind(styles);

let FAKELOADMOR = [
    {
        id: 'm_1001',
        senderId: 'u_anhTuan',
        content: 'Ê, tối nay đi ăn không? Anh mới tìm được quán lẩu mới khá ngon đó.',
        timestamp: '2025-10-08T18:22:00+07:00',
        attachments: [],
        reactions: { u_me: 'like' },
        readBy: ['u_me', 'u_anhTuan'],
        edited: false,
        replyTo: null,
    },
    {
        id: 'm_1002',
        senderId: 'u_me',
        content: 'OK, đi chỗ nào được nhỉ? Lẩu thì tuyệt vời rồi! 🍜',
        timestamp: '2025-10-08T18:23:10+07:00',
        attachments: [],
        reactions: { u_anhTuan: 'love' },
        readBy: ['u_anhTuan', 'u_me'],
        edited: false,
        replyTo: 'm_1001',
    },
    {
        id: 'm_1003',
        senderId: 'u_anhTuan',
        content: 'Nhà hàng Phố Biển ok không? có view biển nhân tạo cực chill luôn. Đã đặt chỗ trước rồi.',
        timestamp: '2025-10-08T18:25:05+07:00',
        attachments: [
            { type: 'image', url: '/uploads/pho_bien_1.jpg', name: 'pho_bien_view.jpg' },
            { type: 'image', url: '/uploads/pho_bien_2.jpg', name: 'pho_bien_food.jpg' },
        ],
        reactions: {},
        readBy: ['u_me'],
        edited: false,
        replyTo: null,
    },
    {
        id: 'm_1004',
        senderId: 'u_me',
        content: 'View biển nhân tạo á? Nghe hay đấy! Mấy giờ thì mình đi?',
        timestamp: '2025-10-08T18:25:35+07:00',
        attachments: [],
        reactions: { u_anhTuan: 'laugh' },
        readBy: ['u_anhTuan', 'u_me'],
        edited: false,
        replyTo: 'm_1003',
    },
    {
        id: 'm_1005',
        senderId: 'u_anhTuan',
        content: '6:30 PM nhé! Em nhớ mang theo thẻ giảm giá hôm trước anh đưa đấy!',
        timestamp: '2025-10-08T18:26:50+07:00',
        attachments: [],
        reactions: {},
        readBy: ['u_me'],
        edited: true,
        replyTo: null,
    },
    {
        id: 'm_1006',
        senderId: 'u_me',
        content: 'Để em kiểm tra lại thẻ đã.',
        timestamp: '2025-10-08T18:27:01+07:00',
        attachments: [],
        reactions: {},
        readBy: ['u_anhTuan', 'u_me'],
        edited: false,
        replyTo: 'm_1005',
    },
    {
        id: 'm_1007',
        senderId: 'u_me',
        content: 'Thẻ đây rồi, không lo nha. Lát nữa em qua đón anh luôn.',
        timestamp: '2025-10-08T18:28:15+07:00',
        attachments: [{ type: 'file', url: '/uploads/discount_card.pdf', name: 'The_Giam_Gia_Vip.pdf' }],
        reactions: { u_anhTuan: 'heart_eyes' },
        readBy: ['u_anhTuan', 'u_me'],
        edited: false,
        replyTo: null,
    },
    {
        id: 'm_1008',
        senderId: 'u_anhTuan',
        content: 'Tuyệt vời, anh sẽ đợi ở sảnh. Nhớ đi cẩn thận nha.',
        timestamp: '2025-10-08T18:29:00+07:00',
        attachments: [],
        reactions: {},
        readBy: ['u_me'],
        edited: false,
        replyTo: 'm_1007',
    },
    {
        id: 'm_1009',
        senderId: 'u_anhTuan',
        content: 'À quên, đừng quên mang theo áo khoác, tối nay gió lạnh đó.',
        timestamp: '2025-10-08T18:29:15+07:00',
        attachments: [],
        reactions: {},
        readBy: ['u_me'],
        edited: false,
        replyTo: null,
    },
    {
        id: 'm_1010',
        senderId: 'u_me',
        content: 'Đã rõ. Xuất phát sau 5 phút nữa.',
        timestamp: '2025-10-08T18:35:00+07:00',
        attachments: [],
        reactions: { u_anhTuan: 'thumbs_up' },
        readBy: ['u_anhTuan', 'u_me'],
        edited: false,
        replyTo: 'm_1009',
    },
    {
        id: 'm_1011',
        senderId: 'u_me',
        content: 'Ra liền!',
        timestamp: '2025-10-08T18:36:10+07:00',
        attachments: [],
        reactions: { u_anhTuan: 'heart_eyes' },
        readBy: ['u_anhTuan', 'u_me'],
        edited: false,
        replyTo: 'm_1010',
    },
];

function MessagesArea({ messages, setMessages }) {
    const chatContainerRef = useRef(null);

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    // Tải thêm tin nhắn khi scroll lên đầu
    useEffect(() => {
        const handleScroll = () => {
            if (chatContainerRef.current.scrollTop === 0) {
                console.log('🟢 Scroll tới top — đang tải thêm...');
                const currentScrollHeight = chatContainerRef.current.scrollHeight;

                if (FAKELOADMOR.length === 0) {
                    console.log('🔴 Không còn tin nhắn cũ để tải thêm.');
                    return;
                }
                // Giả lập tải dữ liệu
                setTimeout(() => {
                    setMessages((prev) => [
                        ...FAKELOADMOR, // thêm dữ liệu cũ hơn lên đầu
                        ...prev,
                    ]);
                    FAKELOADMOR = []; // Xoá dữ liệu giả lập sau khi đã thêm

                    // Sau khi thêm, giữ nguyên vị trí scroll
                    requestAnimationFrame(() => {
                        if (chatContainerRef.current) {
                            chatContainerRef.current.scrollTop =
                                chatContainerRef.current.scrollHeight - currentScrollHeight;
                        }
                    });
                }, 1000);
            }
        };

        const container = chatContainerRef.current;
        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, []);

    return (
        <div className={cx('wrapper', 'scrollbar')} ref={chatContainerRef}>
            {messages.map((message, index) => message && <ChatMessage key={index} data={message} />)}
        </div>
    );
}

export default MessagesArea;
