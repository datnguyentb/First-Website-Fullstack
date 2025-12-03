import classNames from 'classnames/bind';
import styles from '../ChatWidget.module.scss';
import { useEffect, useRef, useState } from 'react';

const fakeMessages = [
    {
        _id: 'msg1',
        sender: {
            _id: 'u1',
            username: 'Eli',
            avatar: 'https://i.pravatar.cc/150?img=32',
        },
        content: 'Hey! Cậu học xong phần React Hook chưa?',
        createdAt: '2025-10-26T10:02:00Z',
    },
    {
        _id: 'msg2',
        sender: {
            _id: 'u2',
            username: 'Đạt',
            avatar: 'https://i.pravatar.cc/150?img=12',
        },
        content: 'Chưa 😅 Tớ đang xem lại useEffect, hơi rối.',
        createdAt: '2025-10-26T10:03:00Z',
    },
    {
        _id: 'msg3',
        sender: {
            _id: 'u1',
            username: 'Eli',
            avatar: 'https://i.pravatar.cc/150?img=32',
        },
        content: 'Haha, công nhận. useEffect mà không cleanup dễ bug lắm.',
        createdAt: '2025-10-26T10:04:00Z',
    },
    {
        _id: 'msg4',
        sender: {
            _id: 'u2',
            username: 'Đạt',
            avatar: 'https://i.pravatar.cc/150?img=12',
        },
        content: 'Ừm, tớ vừa gặp xong vụ infinite re-render đây. 🥲',
        createdAt: '2025-10-26T10:05:00Z',
    },
    {
        _id: 'msg5',
        sender: {
            _id: 'u1',
            username: 'Eli',
            avatar: 'https://i.pravatar.cc/150?img=32',
        },
        content: 'Cố lên, qua phần này là dễ thở hơn nhiều rồi 😁',
        createdAt: '2025-10-26T10:06:00Z',
    },
    {
        _id: 'msg6',
        sender: {
            _id: 'u2',
            username: 'Đạt',
            avatar: 'https://i.pravatar.cc/150?img=12',
        },
        content: 'Ok luôn! Mà tối rảnh không, học chung tý cho vui 😄',
        createdAt: '2025-10-26T10:07:00Z',
    },
    {
        _id: 'msg7',
        sender: {
            _id: 'u1',
            username: 'Eli',
            avatar: 'https://i.pravatar.cc/150?img=32',
        },
        content: 'Rảnh nha! Gọi tớ lúc 8h nhé.',
        createdAt: '2025-10-26T10:08:00Z',
    },
];

const cx = classNames.bind(styles);

function ChatMessages({ conversationData, setIsShowFriendsList }) {
    const chatContainerRef = useRef(null);
    const [isAtBottom, setIsAtBottom] = useState(true);

    if (conversationData) {
        console.log('Conversation Data in ChatMessages:', conversationData);
    }
    // bắt sự kiện scroll để theo dõi vị trí cuộn
    useEffect(() => {
        const handleScroll = () => {
            const el = chatContainerRef.current;
            if (!el) return;

            const distanceToBottom = el.scrollHeight - el.scrollTop - el.clientHeight;

            // Nếu còn cách đáy dưới 100px → coi như "ở gần cuối"
            setIsAtBottom(distanceToBottom < 100);
        };

        const el = chatContainerRef.current;
        el.addEventListener('scroll', handleScroll);

        return () => el.removeEventListener('scroll', handleScroll);
    }, []);

    // tự động cuộn xuống đáy khi có tin nhắn mới, nếu đang ở gần đáy
    useEffect(() => {
        const el = chatContainerRef.current;
        if (el) {
            el.scrollTop = el.scrollHeight;
        }
    }, []);

    return (
        <div ref={chatContainerRef} className={cx('chat-messages', 'scrollbar')}>
            {conversationData?.messages.map((msg) => (
                <div key={msg._id} className={cx('message', msg.sender._id === 'u1' ? 'received' : 'sent')}>
                    <div className={cx('message-content')}>{msg.content}</div>
                </div>
            ))}
        </div>
    );
}

export default ChatMessages;
