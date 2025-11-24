import classNames from 'classnames/bind';
import styles from './ChatWindown.module.scss';
import { ChatInput, ChatWindownHeader, MessagesArea } from './components';
import { useEffect, useState } from 'react';
import { useSocketContext } from '~/contexts';
const cx = classNames.bind(styles);

function ChatWindown() {
    const [messages, setMessages] = useState([]);
    const [textInput, setTextInput] = useState('');
    const [shouldAutoScroll, setShouldAutoScroll] = useState(false);
    const { socket, realTimeMessages } = useSocketContext();

    //tham gia room
    useEffect(() => {
        if (!socket) return;
        const randomNum = Math.floor(Math.random() * 1000);
        socket.emit('addUser', `user${randomNum}`);
        // Lắng nghe sự kiện test từ server
        socket.on('serverResponse', (data) => {
            console.log('📩 Server phản hồi:', data);
        });

        socket.emit('joinConversation', '123');

        // Dọn dẹp khi rời trang
        return () => {
            console.log('🚪 Rời khỏi phòng chat:', '123');
            socket.emit('leaveConversation', '123');
            socket.off('serverResponse');
        };
    }, [socket]);

    //lấy ApiMessages từ server
    useEffect(() => {
        // Giả lập gọi API lấy tin nhắn ban đầu
    }, []);

    //gửi tin nhắn
    const handleSend = async () => {
        if (!textInput.trim()) return;

        const messagesData = {
            conversationId: '123',
            content: textInput,
            attachments: [],
            replyto: null,
            status: 'sending',
        };

        //gửi tin nhắn lên server

        socket.emit('sendMessage', messagesData);

        //Set lại input
        setTextInput('');
    };

    const handleSendIcon = () => {
        if (textInput.trim()) return;
        const messagesData = {
            conversationId: '123',
            content: '😊',
            attachments: [],
            replyto: null,
            status: 'sending',
        };

        socket.emit('sendMessage', messagesData);
    };

    //

    useEffect(() => {
        if (realTimeMessages.length === 0) return;

        const lastMsg = realTimeMessages[realTimeMessages.length - 1];

        if (lastMsg.conversationId === '123') {
            setMessages((prev) => [...prev, lastMsg]);
        }
        setShouldAutoScroll(true);
    }, [realTimeMessages]);

    //Nhấn Enter để gửi tin nhắn
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            <div className={cx('wrapper')}>
                <ChatWindownHeader />
                <MessagesArea messages={messages} setMessages={setMessages} shouldAutoScroll={shouldAutoScroll} />
                <ChatInput
                    textInput={textInput}
                    setTextInput={setTextInput}
                    handleSend={handleSend}
                    handleSendIcon={handleSendIcon}
                    handleKeyDown={handleKeyDown}
                />
            </div>
        </>
    );
}

export default ChatWindown;
