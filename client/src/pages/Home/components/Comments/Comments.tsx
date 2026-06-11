import classNames from 'classnames/bind';
import styles from './Comments.module.scss';
import CommentItem from './CommentItem';
import { useEffect, useState } from 'react';
import { buildCommentTree, CommentTreeNode } from '../../helper/buildCommentTree';

const cx = classNames.bind(styles);

import { FlatComment } from '../../helper/buildCommentTree';
import { useGetAllComments } from '~/hooks/comment/useGetAllComments';

const nestedComments: FlatComment[] = [
    // ==========================================
    // CÂY BÌNH LUẬN 1 (Gốc: Anh Tuấn)
    // ==========================================
    {
        _id: '65c000000000000000000001',
        post: '65a123456789abcdef0000001',
        user: {
            _id: '65b000000000000000000001',
            firstName: 'Tuấn',
            lastName: 'Anh',
            avatar: 'https://i.pravatar.cc/150?u=1',
        },
        content: 'Giao diện nhìn xịn quá bạn ơi! 🚀',
        parentCommentId: null,
        likes: [],
        likesCount: 0,
        createdAt: '2026-06-10T00:00:00.000Z',
        updatedAt: '2026-06-10T00:00:00.000Z',
    },
    {
        _id: '65c000000000000000000011',
        post: '65a123456789abcdef0000001',
        user: {
            _id: '65b000000000000000000003',
            firstName: 'Hoàng',
            lastName: 'Minh',
            avatar: 'https://i.pravatar.cc/150?u=3',
        },
        content: 'Đúng vậy, đặc biệt là phần animation mượt mà cực kỳ.',
        parentCommentId: '65c000000000000000000001',
        likes: [],
        likesCount: 0,
        createdAt: '2026-06-10T00:05:00.000Z',
        updatedAt: '2026-06-10T00:05:00.000Z',
    },
    {
        _id: '65c000000000000000000111',
        post: '65a123456789abcdef0000001',
        user: {
            _id: '65b000000000000000000001',
            firstName: 'Tuấn',
            lastName: 'Anh',
            avatar: 'https://i.pravatar.cc/150?u=1',
        },
        content: 'Chuẩn luôn, chủ thớt tối ưu CSS tốt thật.',
        parentCommentId: '65c000000000000000000011',
        likes: [],
        likesCount: 0,
        createdAt: '2026-06-10T00:10:00.000Z',
        updatedAt: '2026-06-10T00:10:00.000Z',
    },
    {
        _id: '65c000000000000000001111',
        post: '65a123456789abcdef0000001',
        user: {
            _id: '65b000000000000000000015',
            firstName: 'Alex',
            lastName: 'Rivera',
            avatar: 'https://i.pravatar.cc/150?u=15',
        },
        content: 'Totally agree! The frame rates on mobile are rock solid. Pure 60fps experience.',
        parentCommentId: '65c000000000000000000111',
        likes: [],
        likesCount: 0,
        createdAt: '2026-06-10T00:15:00.000Z',
        updatedAt: '2026-06-10T00:15:00.000Z',
    },
    {
        _id: '65c000000000000000000012',
        post: '65a123456789abcdef0000001',
        user: {
            _id: '65b000000000000000000004',
            firstName: 'Linh',
            lastName: 'Thùy',
            avatar: 'https://i.pravatar.cc/150?u=4',
        },
        content: 'Công nhận, mình cũng thích phong cách layout này.',
        parentCommentId: '65c000000000000000000001',
        likes: [],
        likesCount: 0,
        createdAt: '2026-06-10T00:20:00.000Z',
        updatedAt: '2026-06-10T00:20:00.000Z',
    },
    {
        _id: '65c000000000000000000013',
        post: '65a123456789abcdef0000001',
        user: {
            _id: '65b000000000000000000011',
            firstName: 'Sarah',
            lastName: 'Jenkins',
            avatar: 'https://i.pravatar.cc/150?u=11',
        },
        content: 'Stunning work! Is the source code available on GitHub? Would love to contribute.',
        parentCommentId: '65c000000000000000000001',
        likes: [],
        likesCount: 0,
        createdAt: '2026-06-10T00:25:00.000Z',
        updatedAt: '2026-06-10T00:25:00.000Z',
    },
    {
        _id: '65c000000000000000000131',
        post: '65a123456789abcdef0000001',
        user: {
            _id: '65b000000000000000000012',
            firstName: 'Mạnh',
            lastName: 'Duy',
            avatar: 'https://i.pravatar.cc/150?u=12',
        },
        content: 'Not yet, I think the author will open-source it next week.',
        parentCommentId: '65c000000000000000000013',
        likes: [],
        likesCount: 0,
        createdAt: '2026-06-10T00:30:00.000Z',
        updatedAt: '2026-06-10T00:30:00.000Z',
    },

    // ==========================================
    // CÂY BÌNH LUẬN 2 (Gốc: Bảo Ngọc)
    // ==========================================
    {
        _id: '65c000000000000000000002',
        post: '65a123456789abcdef0000001',
        user: {
            _id: '65b000000000000000000002',
            firstName: 'Ngọc',
            lastName: 'Bảo',
            avatar: 'https://i.pravatar.cc/150?u=2',
        },
        content: 'Màu sắc phối hợp hài hòa lắm.',
        parentCommentId: null,
        likes: [],
        likesCount: 0,
        createdAt: '2026-06-10T01:00:00.000Z',
        updatedAt: '2026-06-10T01:00:00.000Z',
    },
    {
        _id: '65c000000000000000000021',
        post: '65a123456789abcdef0000001',
        user: {
            _id: '65b000000000000000000005',
            firstName: 'Anh',
            lastName: 'Quốc',
            avatar: 'https://i.pravatar.cc/150?u=5',
        },
        content: 'Nhìn dịu mắt ghê, có hỗ trợ Dark Mode không ta?',
        parentCommentId: '65c000000000000000000002', // 🛠️ Đã sửa lỗi parentComent gõ sai ở đây
        likes: [],
        likesCount: 0,
        createdAt: '2026-06-10T01:05:00.000Z',
        updatedAt: '2026-06-10T01:05:00.000Z',
    },
    {
        _id: '65c000000000000000000211',
        post: '65a123456789abcdef0000001',
        user: {
            _id: '65b000000000000000000002',
            firstName: 'Ngọc',
            lastName: 'Bảo',
            avatar: 'https://i.pravatar.cc/150?u=2',
        },
        content: 'Hình như có nút toggle ở góc trên bên phải kìa ông.',
        parentCommentId: '65c000000000000000000021', // 🛠️ Đã sửa lỗi parentComent
        likes: [],
        likesCount: 0,
        createdAt: '2026-06-10T01:10:00.000Z',
        updatedAt: '2026-06-10T01:10:00.000Z',
    },
    {
        _id: '65c000000000000000000022',
        post: '65a123456789abcdef0000001',
        user: {
            _id: '65b000000000000000000013',
            firstName: 'Emily',
            lastName: 'Watson',
            avatar: 'https://i.pravatar.cc/150?u=13',
        },
        content: 'The color contrast hits the sweet spot for accessibility. Great job complying with WCAG guidelines!',
        parentCommentId: '65c000000000000000000002', // 🛠️ Đã sửa lỗi parentComent
        likes: [],
        likesCount: 0,
        createdAt: '2026-06-10T01:15:00.000Z',
        updatedAt: '2026-06-10T01:15:00.000Z',
    },

    // ==========================================
    // CÂY BÌNH LUẬN 3 (Gốc: Lan Hương)
    // ==========================================
    {
        _id: '65c000000000000000000003',
        post: '65a123456789abcdef0000001',
        user: {
            _id: '65b000000000000000000008',
            firstName: 'Hương',
            lastName: 'Lan',
            avatar: 'https://i.pravatar.cc/150?u=8',
        },
        content: 'Phần mobile responsive cần chỉnh lại một chút ở menu nhé.',
        parentCommentId: null,
        likes: [],
        likesCount: 0,
        createdAt: '2026-06-10T02:00:00.000Z',
        updatedAt: '2026-06-10T02:00:00.000Z',
    },
    {
        _id: '65c000000000000000000031',
        post: '65a123456789abcdef0000001',
        user: {
            _id: '65b000000000000000000014',
            firstName: 'John',
            lastName: 'Doe',
            avatar: 'https://i.pravatar.cc/150?u=14',
        },
        content: 'Yeah, the hamburger menu overlaps with the logo on iPhone SE screen size.',
        parentCommentId: '65c000000000000000000003', // 🛠️ Đã sửa lỗi parentComent
        likes: [],
        likesCount: 0,
        createdAt: '2026-06-10T02:05:00.000Z',
        updatedAt: '2026-06-10T02:05:00.000Z',
    },
    {
        _id: '65c000000000000000000311',
        post: '65a123456789abcdef0000001',
        user: {
            _id: '65b000000000000000000008',
            firstName: 'Hương',
            lastName: 'Lan',
            avatar: 'https://i.pravatar.cc/150?u=8',
        },
        content: 'Đúng rồi, mình cũng bị lỗi y chang trên màn hình nhỏ.',
        parentCommentId: '65c000000000000000000031', // 🛠️ Đã sửa lỗi parentComent
        likes: [],
        likesCount: 0,
        createdAt: '2026-06-10T02:10:00.000Z',
        updatedAt: '2026-06-10T02:10:00.000Z',
    },

    // ==========================================
    // CÂY BÌNH LUẬN 4 (Gốc: David Kim)
    // ==========================================
    {
        _id: '65c000000000000000000004',
        post: '65a123456789abcdef0000001',
        user: {
            _id: '65b000000000000000000020',
            firstName: 'David',
            lastName: 'Kim',
            avatar: 'https://i.pravatar.cc/150?u=20',
        },
        content: 'Man, this looks incredibly clean! What stack did you use for the backend?',
        parentCommentId: null,
        likes: [],
        likesCount: 0,
        createdAt: '2026-06-10T03:00:00.000Z',
        updatedAt: '2026-06-10T03:00:00.000Z',
    },
    {
        _id: '65c000000000000000000041',
        post: '65a123456789abcdef0000001',
        user: {
            _id: '65b000000000000000000021',
            firstName: 'Long',
            lastName: 'Hoàng',
            avatar: 'https://i.pravatar.cc/150?u=21',
        },
        content: "I guess it's Next.js with NestJS. Super fast!",
        parentCommentId: '65c000000000000000000004', // 🛠️ Đã sửa lỗi parentComent
        likes: [],
        likesCount: 0,
        createdAt: '2026-06-10T03:05:00.000Z',
        updatedAt: '2026-06-10T03:05:00.000Z',
    },
    {
        _id: '65c000000000000000000411',
        post: '65a123456789abcdef0000001',
        user: {
            _id: '65b000000000000000000020',
            firstName: 'David',
            lastName: 'Kim',
            avatar: 'https://i.pravatar.cc/150?u=20',
        },
        content: 'Ah, NestJS is awesome. Explains why the API response is blazing fast.',
        parentCommentId: '65c000000000000000000041', // 🛠️ Đã sửa lỗi parentComent
        likes: [],
        likesCount: 0,
        createdAt: '2026-06-10T03:10:00.000Z',
        updatedAt: '2026-06-10T03:10:00.000Z',
    },

    // ==========================================
    // CÂY BÌNH LUẬN 5 (Gốc: Minh Thư)
    // ==========================================
    {
        _id: '65c000000000000000000005',
        post: '65a123456789abcdef0000001',
        user: {
            _id: '65b000000000000000000030',
            firstName: 'Thư',
            lastName: 'Minh',
            avatar: 'https://i.pravatar.cc/150?u=30',
        },
        content: 'Có ai bị lỗi không load được avatar giống mình không? 😢',
        parentCommentId: null,
        likes: [],
        likesCount: 0,
        createdAt: '2026-06-10T04:00:00.000Z',
        updatedAt: '2026-06-10T04:00:00.000Z',
    },
    {
        _id: '65c000000000000000000051',
        post: '65a123456789abcdef0000001',
        user: {
            _id: '65b000000000000000000031',
            firstName: 'Support',
            lastName: 'Tech',
            avatar: 'https://i.pravatar.cc/150?u=31',
        },
        content:
            'Please try clearing your browser cache or check your internet connection. Pravatar might be temporarily down.',
        parentCommentId: '65c000000000000000000005', // 🛠️ Đã sửa lỗi parentComent
        likes: [],
        likesCount: 0,
        createdAt: '2026-06-10T04:05:00.000Z',
        updatedAt: '2026-06-10T04:05:00.000Z',
    },
    {
        _id: '65c0000000000000000511',
        post: '65a123456789abcdef0000001',
        user: {
            _id: '65b000000000000000000030',
            firstName: 'Thư',
            lastName: 'Minh',
            avatar: 'https://i.pravatar.cc/150?u=30',
        },
        content: 'Mình làm được rồi, cảm ơn ad nhé!',
        parentCommentId: '65c000000000000000000051', // 🛠️ Đã sửa lỗi parentComent
        likes: [],
        likesCount: 0,
        createdAt: '2026-06-10T04:10:00.000Z',
        updatedAt: '2026-06-10T04:10:00.000Z',
    },
];

const renderComments = (comments: CommentTreeNode[], depth = 0, parentCommentId: string | null = null) => {
    return comments.map((item) => (
        <div
            key={item._id}
            className={cx('comment-wrapper', {
                'reply-comment': depth > 0,
            })}
            style={{ '--depth': depth }}
        >
            <CommentItem item={item} parentCommentId={parentCommentId} />

            <div className={cx('comment-replies-container')}>
                {item.replies?.length > 0 && renderComments(item.replies, depth + 1, item._id)}
            </div>
        </div>
    ));
};

function Comments({ postId }: { postId: string }) {
    const [comments, setComments] = useState<CommentTreeNode[]>([]);
    const { getAllComments } = useGetAllComments();

    useEffect(() => {
        //call API
        const fetchComments = async () => {
            try {
                const commentsData = await getAllComments(postId);
                setComments(buildCommentTree(commentsData));
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, []);
    return <div className={cx('comment-list')}>{renderComments(comments)}</div>;
}

export default Comments;
