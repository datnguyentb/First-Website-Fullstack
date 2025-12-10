import classNames from 'classnames/bind';
import styles from './MessagerWidget.module.scss';
import { ChatItem, ChatTabs, Header } from './components';

// Gán biến cx để sử dụng CSS Module
const cx = classNames.bind(styles);

const CHAT_DATA = [
    {
        id: 1,
        name: 'Loan Tây',
        avatarText: 'L.T',
        avatarColor: 'F5A727', // Màu vàng cam
        lastMessage: 'Bạn: Thi mình chỉ nói z thui mà, sao bạn lại giận mình thế?', // Đã bổ sung
        time: '3 giờ',
        isUnread: true,
        reaction: null,
    },
    {
        id: 2,
        name: 'bụt hiện lên và nói',
        avatarText: 'B.H',
        avatarColor: 'DC3545', // Màu đỏ
        lastMessage: 'Đã bày tỏ cảm xúc 👍 về tin nhắn "Oke, mình đã gửi tài liệu qua mail rồi nhé!"', // Đã bổ sung
        time: '11 giờ',
        isUnread: false,
        reaction: '👍',
    },
    {
        id: 3,
        name: '10,3K HỌC TẬP',
        avatarText: '10K',
        avatarColor: '17A2B8', // Màu xanh da trời
        lastMessage: 'Bạn: Vẫn bảo vệ về đề tài Marketing Online, nhóm cần trao đổi thêm không?', // Đã bổ sung
        time: '3 giờ',
        isUnread: false,
        reaction: null,
    },
    {
        id: 4,
        name: 'Điện tổng',
        avatarText: 'DT',
        avatarColor: '007BFF', // Màu xanh dương
        lastMessage: 'Xin chào Đạt! Bạn có thắc mắc gì về dịch vụ Internet của chúng tôi không? Trả lời?', // Đã bổ sung
        time: '3 ngày',
        isUnread: true,
        reaction: null,
    },
    {
        id: 5,
        name: 'Kỳ Khương',
        avatarText: 'K.K',
        avatarColor: '28A745', // Màu xanh lá
        lastMessage: 'Bạn: 6h em mới tới. Em đi xe bus nên hơi chậm một chút, anh thông cảm nhé!', // Đã bổ sung
        time: '3 ngày',
        isUnread: false,
        reaction: null,
    },
    {
        id: 6,
        name: 'Trần Minh',
        avatarText: 'T.M',
        avatarColor: '6C757D', // Màu xám
        lastMessage: 'Bạn: K phải lỗi đó đâu. Anh kiểm tra lại API key cũ xem có bị expired không.', // Đã bổ sung
        time: '4 ngày',
        isUnread: false,
        reaction: null,
    },
    {
        id: 7,
        name: 'nhóm lớp 9a',
        avatarText: '9A',
        avatarColor: 'FFC107', // Màu vàng
        lastMessage: 'Hà: Có bạn nữ nào ở khu vực Thanh Xuân muốn đi cafe chiều nay không nhỉ?', // Đã bổ sung
        time: '1 tuần',
        isUnread: true,
        reaction: null,
    },
    {
        id: 8,
        name: 'Được Dev',
        avatarText: 'D.D',
        avatarColor: '6610f2', // Màu tím
        lastMessage: 'Xin chào Đạt! Bạn có thắc mắc gì về khóa học lập trình web căn bản không?', // Đã bổ sung
        time: '1 tuần',
        isUnread: false,
        reaction: null,
    },
    {
        id: 9,
        name: 'Nguyễn Tiến Đạt',
        avatarText: 'NTĐ',
        avatarColor: '20c997', // Màu xanh ngọc
        lastMessage: 'Bạn đã gửi một ảnh. (Ảnh chụp màn hình lỗi database ngày hôm qua)', // Đã bổ sung
        time: '1 tuần',
        isUnread: true,
        reaction: null,
    },
    {
        id: 10,
        name: 'Cuộc trò chuyện cũ',
        avatarText: 'ABC',
        avatarColor: '6c757d', // Màu xám đậm
        lastMessage: 'Nội dung cuộn lên từ bên dưới. Đây là tin nhắn cuối cùng đã được đọc.', // Đã bổ sung
        time: '1 tháng',
        isUnread: false,
        reaction: null,
    },
];

function MessagerWidget({ handleHideMessagerWidget }) {
    return (
        <div className={cx('wrapper')}>
            {/* Sử dụng cx cho tất cả các class trong khối giao diện */}
            <div className={cx('messenger-widget')}>
                {/* Header */}
                <Header />

                {/* Tabs */}
                <ChatTabs />
                {/* Danh Sách Chat */}
                <ul className={cx('chat-list')}>
                    {/* Item 1: Chưa đọc */}
                    {CHAT_DATA.map((chat) => (
                        <ChatItem key={chat.id} data={chat} handleHideMessagerWidget={handleHideMessagerWidget} />
                    ))}
                    {/* Item 2: Đã đọc */}
                </ul>

                {/* Footer */}
                <div className={cx('chat-footer')}>
                    <button>Xem tất cả trong Messenger</button>
                </div>
            </div>
        </div>
    );
}

export default MessagerWidget;
