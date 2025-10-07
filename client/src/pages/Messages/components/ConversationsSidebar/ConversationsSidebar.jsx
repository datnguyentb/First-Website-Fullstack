import classNames from 'classnames/bind';
import styles from './ConversationsSidebar.module.scss';
import { SearchBar, ConversationItem } from './components';
const cx = classNames.bind(styles);

const CONVAERSATIONSlIST = [
    {
        ten_nguoi_dung: 'Nguyễn Tiến Đạt',
        xem_truoc_tin_nhan: 'Last message preview...https...',
        thoi_gian_gui: '2m ago',
    },
    {
        ten_nguoi_dung: 'Trần Thị Thanh',
        xem_truoc_tin_nhan: 'Em gửi tài liệu rồi ạ. Anh check...',
        thoi_gian_gui: '5m ago',
    },
    {
        ten_nguoi_dung: 'Lê Văn An',
        xem_truoc_tin_nhan: 'Họp lúc 9h sáng mai nhé. Nhớ...',
        thoi_gian_gui: '10m ago',
    },
    {
        ten_nguoi_dung: 'Phạm Minh Hằng',
        xem_truoc_tin_nhan: 'Vâng, em đã nhận được thông báo...',
        thoi_gian_gui: '15m ago',
        active: true,
    },
    {
        ten_nguoi_dung: 'Hoàng Xuân Bách',
        xem_truoc_tin_nhan: 'Check lại báo cáo quý 3 giúp anh...',
        thoi_gian_gui: '20m ago',
    },
    {
        ten_nguoi_dung: 'Vũ Ngọc Ánh',
        xem_truoc_tin_nhan: 'Có vẻ là một lỗi nhỏ trong code...',
        thoi_gian_gui: '25m ago',
    },
    {
        ten_nguoi_dung: 'Đặng Quốc Việt',
        xem_truoc_tin_nhan: 'Tối nay đi ăn lẩu không mọi người...',
        thoi_gian_gui: '30m ago',
    },
    {
        ten_nguoi_dung: 'Bùi Thị Mai',
        xem_truoc_tin_nhan: 'Tuyệt vời, ý tưởng này rất hay...',
        thoi_gian_gui: '35m ago',
    },
    {
        ten_nguoi_dung: 'Nguyễn Tiến Đạt',
        xem_truoc_tin_nhan: 'Last message preview...https...',
        thoi_gian_gui: '40m ago',
    },
    {
        ten_nguoi_dung: 'Hồ Sĩ Nam',
        xem_truoc_tin_nhan: 'Deadline dự án là thứ 6 tuần này...',
        thoi_gian_gui: '45m ago',
    },
    {
        ten_nguoi_dung: 'Dương Thùy Linh',
        xem_truoc_tin_nhan: 'Em cần hỗ trợ về phần thiết kế...',
        thoi_gian_gui: '50m ago',
    },
    {
        ten_nguoi_dung: 'Vương Đình Khoa',
        xem_truoc_tin_nhan: 'Anh đã xem xét và đồng ý với kế hoạch...',
        thoi_gian_gui: '1h ago',
    },
    {
        ten_nguoi_dung: 'Trịnh Thu Hương',
        xem_truoc_tin_nhan: 'Mai mình gặp nhau ở quán cà phê cũ...',
        thoi_gian_gui: '1h 5m ago',
    },
    {
        ten_nguoi_dung: 'Lê Hồng Sơn',
        xem_truoc_tin_nhan: 'Gửi anh chi tiết về ngân sách...',
        thoi_gian_gui: '1h 10m ago',
    },
    {
        ten_nguoi_dung: 'Phan Thị Yến',
        xem_truoc_tin_nhan: 'Cảm ơn chị đã giúp đỡ nhiệt tình...',
        thoi_gian_gui: '1h 15m ago',
    },
    {
        ten_nguoi_dung: 'Tô Minh Trí',
        xem_truoc_tin_nhan: 'Vấn đề đã được khắc phục hoàn toàn...',
        thoi_gian_gui: '1h 20m ago',
    },
    {
        ten_nguoi_dung: 'Ngô Gia Bảo',
        xem_truoc_tin_nhan: 'Last message preview...https...',
        thoi_gian_gui: '1h 25m ago',
    },
    {
        ten_nguoi_dung: 'Đào Duy Anh',
        xem_truoc_tin_nhan: 'Last message preview...https...',
        thoi_gian_gui: '1h 30m ago',
    },
    {
        ten_nguoi_dung: 'Nguyễn Thu Hà Đào Duy Anh',
        xem_truoc_tin_nhan: 'Chúc mừng team đã hoàn thành xuất sắc...',
        thoi_gian_gui: '1h 35m ago',
    },
    {
        ten_nguoi_dung: 'Trần Thanh Tú',
        xem_truoc_tin_nhan: 'Last message preview...https...',
        thoi_gian_gui: '1h 40m ago',
    },
];

function ConversationsSidebar() {
    return (
        <div className={cx('wrapper')}>
            <SearchBar />
            <div className={cx('conversation-list', 'scrollbar')}>
                {CONVAERSATIONSlIST.map((item, index) => (
                    <ConversationItem key={index} data={item} active={item.active} />
                ))}
            </div>
        </div>
    );
}

export default ConversationsSidebar;
