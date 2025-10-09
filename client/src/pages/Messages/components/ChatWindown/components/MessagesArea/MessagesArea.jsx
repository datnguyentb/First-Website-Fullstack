import classNames from 'classnames/bind';
import styles from './MessagesArea.module.scss';
import { ChatMessage } from './components';
const cx = classNames.bind(styles);

const conversations = [
    {
        conversationId: 'conv_1001',
        type: 'one_to_one',
        participants: [
            { id: 'u_me', name: 'Bạn', avatar: '/avatars/me.jpg' },
            { id: 'u_anhTuan', name: 'Anh Tuấn', avatar: '/avatars/tuan.jpg' },
        ],
        messages: [
            {
                id: 'm_1001',
                senderId: 'u_anhTuan',
                text: 'Ê, tối nay đi ăn không? Anh mới tìm được quán lẩu mới khá ngon đó.',
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
                text: 'OK, đi chỗ nào được nhỉ? Lẩu thì tuyệt vời rồi! 🍜',
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
                text: 'Nhà hàng Phố Biển ok không? có view biển nhân tạo cực chill luôn. Đã đặt chỗ trước rồi.',
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
                text: 'View biển nhân tạo á? Nghe hay đấy! Mấy giờ thì mình đi?',
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
                text: '6:30 PM nhé! Em nhớ mang theo thẻ giảm giá hôm trước anh đưa đấy!',
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
                text: 'Để em kiểm tra lại thẻ đã.',
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
                text: 'Thẻ đây rồi, không lo nha. Lát nữa em qua đón anh luôn.',
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
                text: 'Tuyệt vời, anh sẽ đợi ở sảnh. Nhớ đi cẩn thận nha.',
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
                text: 'À quên, đừng quên mang theo áo khoác, tối nay gió lạnh đó.',
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
                text: 'Đã rõ. Xuất phát sau 5 phút nữa.',
                timestamp: '2025-10-08T18:35:00+07:00',
                attachments: [],
                reactions: { u_anhTuan: 'thumbs_up' },
                readBy: ['u_anhTuan', 'u_me'],
                edited: false,
                replyTo: 'm_1009',
            },
        ],
    },

    {
        conversationId: 'conv_2001',
        type: 'group',
        name: 'Team Frontend',
        participants: [
            { id: 'u_me', name: 'Bạn', avatar: '/avatars/me.jpg' },
            { id: 'u_hoa', name: 'Hoa', avatar: '/avatars/hoa.jpg' },
            { id: 'u_khoa', name: 'Khoa', avatar: '/avatars/khoa.jpg' },
            { id: 'u_anhTuan', name: 'Anh Tuấn', avatar: '/avatars/tuan.jpg' },
        ],
        messages: [
            {
                id: 'g_2001',
                senderId: 'u_hoa',
                text: 'Mọi người xem PR #42 giúp mình với nhé, có bug ở component Modal.',
                timestamp: new Date('2025-10-07T09:10:00+07:00'),
                attachments: [{ type: 'file', url: '/uploads/pr-42-screenshot.png', name: 'pr-42-screenshot.png' }],
                reactions: { u_khoa: 'eyes' },
                readBy: ['u_me', 'u_hoa', 'u_khoa'],
                edited: false,
                replyTo: null,
            },
            {
                id: 'g_2002',
                senderId: 'u_khoa',
                text: 'Mình fix được rồi. Vấn đề do z-index của backdrop.',
                timestamp: new Date('2025-10-07T09:15:22+07:00'),
                attachments: [],
                reactions: { u_hoa: 'like', u_me: 'thumbs_up' },
                readBy: ['u_me', 'u_hoa', 'u_khoa'],
                edited: true,
                replyTo: 'g_2001',
            },
        ],
    },
];

function MessagesArea() {
    return (
        <div className={cx('wrapper')}>
            {conversations[0].messages.map((message) => (
                <ChatMessage key={message.id} data={message} />
            ))}
        </div>
    );
}

export default MessagesArea;
