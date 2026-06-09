import classNames from 'classnames/bind';
import styles from './Comments.module.scss';
import CommentItem from './CommentItem';
import { useState } from 'react';
import AddCommentInput from './AddCommentInput';

const cx = classNames.bind(styles);

const nestedComments = [
    {
        id: 1,
        user: 'Anh Tuấn',
        text: 'Giao diện nhìn xịn quá bạn ơi! 🚀',
        avatar: 'https://i.pravatar.cc/150?u=1',
        replies: [
            {
                id: 11,
                user: 'Minh Hoàng',
                text: 'Đúng vậy, đặc biệt là phần animation mượt mà cực kỳ.',
                avatar: 'https://i.pravatar.cc/150?u=3',
                replies: [
                    {
                        id: 111,
                        user: 'Anh Tuấn',
                        text: 'Chuẩn luôn, chủ thớt tối ưu CSS tốt thật.',
                        avatar: 'https://i.pravatar.cc/150?u=1',
                        replies: [
                            {
                                id: 1111,
                                user: 'Alex Rivera',
                                text: 'Totally agree! The frame rates on mobile are rock solid. Pure 60fps experience.',
                                avatar: 'https://i.pravatar.cc/150?u=15',
                                replies: [],
                            },
                        ],
                    },
                ],
            },
            {
                id: 12,
                user: 'Thùy Linh',
                text: 'Công nhận, mình cũng thích phong cách layout này.',
                avatar: 'https://i.pravatar.cc/150?u=4',
                replies: [],
            },
            {
                id: 13,
                user: 'Sarah Jenkins',
                text: 'Stunning work! Is the source code available on GitHub? Would love to contribute.',
                avatar: 'https://i.pravatar.cc/150?u=11',
                replies: [
                    {
                        id: 131,
                        user: 'Duy Mạnh',
                        text: 'Not yet, I think the author will open-source it next week.',
                        avatar: 'https://i.pravatar.cc/150?u=12',
                        replies: [],
                    },
                ],
            },
        ],
    },
    {
        id: 2,
        user: 'Bảo Ngọc',
        text: 'Màu sắc phối hợp hài hòa lắm.',
        avatar: 'https://i.pravatar.cc/150?u=2',
        replies: [
            {
                id: 21,
                user: 'Quốc Anh',
                text: 'Nhìn dịu mắt ghê, có hỗ trợ Dark Mode không ta?',
                avatar: 'https://i.pravatar.cc/150?u=5',
                replies: [
                    {
                        id: 211,
                        user: 'Bảo Ngọc',
                        text: 'Hình như có nút toggle ở góc trên bên phải kìa ông.',
                        avatar: 'https://i.pravatar.cc/150?u=2',
                        replies: [],
                    },
                ],
            },
            {
                id: 22,
                user: 'Emily Watson',
                text: 'The color contrast hits the sweet spot for accessibility. Great job complying with WCAG guidelines!',
                avatar: 'https://i.pravatar.cc/150?u=13',
                replies: [],
            },
        ],
    },
    {
        id: 3,
        user: 'Lan Hương',
        text: 'Phần mobile responsive cần chỉnh lại một chút ở menu nhé.',
        avatar: 'https://i.pravatar.cc/150?u=8',
        replies: [
            {
                id: 31,
                user: 'John Doe',
                text: 'Yeah, the hamburger menu overlaps with the logo on iPhone SE screen size.',
                avatar: 'https://i.pravatar.cc/150?u=14',
                replies: [
                    {
                        id: 311,
                        user: 'Lan Hương',
                        text: 'Đúng rồi, mình cũng bị lỗi y chang trên màn hình nhỏ.',
                        avatar: 'https://i.pravatar.cc/150?u=8',
                        replies: [],
                    },
                ],
            },
        ],
    },
    {
        id: 4,
        user: 'David Kim',
        text: 'Man, this looks incredibly clean! What stack did you use for the backend?',
        avatar: 'https://i.pravatar.cc/150?u=20',
        replies: [
            {
                id: 41,
                user: 'Hoàng Long',
                text: "I guess it's Next.js with NestJS. Super fast!",
                avatar: 'https://i.pravatar.cc/150?u=21',
                replies: [
                    {
                        id: 411,
                        user: 'David Kim',
                        text: 'Ah, NestJS is awesome. Explains why the API response is blazing fast.',
                        avatar: 'https://i.pravatar.cc/150?u=20',
                        replies: [],
                    },
                ],
            },
        ],
    },
    {
        id: 5,
        user: 'Minh Thư',
        text: 'Có ai bị lỗi không load được avatar giống mình không? 😢',
        avatar: 'https://i.pravatar.cc/150?u=30',
        replies: [
            {
                id: 51,
                user: 'Tech Support',
                text: 'Please try clearing your browser cache or check your internet connection. Pravatar might be temporarily down.',
                avatar: 'https://i.pravatar.cc/150?u=31',
                replies: [
                    {
                        id: 511,
                        user: 'Minh Thư',
                        text: 'Mình làm được rồi, cảm ơn ad nhé!',
                        avatar: 'https://i.pravatar.cc/150?u=30',
                        replies: [],
                    },
                ],
            },
        ],
    },
];

const renderComments = (commentList, depth = 0, parentCommentId = null) => {
    return commentList.map((item) => (
        <div
            key={item.id}
            className={cx('comment-wrapper', {
                'reply-comment': depth > 0,
            })}
            style={{ '--depth': depth }}
        >
            <CommentItem item={item} parentCommentId={parentCommentId} />

            <div className={cx('comment-replies-container')}>
                {item.replies?.length > 0 && renderComments(item.replies, depth + 1, item.id)}
            </div>
        </div>
    ));
};

function Comments() {
    return <div className={cx('comment-list')}>{renderComments(nestedComments)}</div>;
}

export default Comments;
