import { createContext, useEffect, useState } from 'react';
import { connectSocket, disconnectSocket, getSocket } from '../socket/socket';

export const SocketContext = createContext();

export function SocketProvider({ children }) {
    const [socket, setSocket] = useState(null); // 🔹 lưu socket hiện tại
    const [realTimeMessages, setRealTimeMessages] = useState([]);

    const [notifications, setNotifications] = useState([]);

    // Giả định trạng thái cuộc hội thoại đang được mở (ID của Conversation)
    const [activeConversationId, setActiveConversationId] = useState(null);

    //✅ Kêt nối đến socket
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        const newSocket = connectSocket(token);
        setSocket(newSocket);

        return () => {
            disconnectSocket();
        };
    }, []);

    // Lắng nghe các sự kiện từ server
    useEffect(() => {
        if (!socket) return;

        // Xử lý khi nhận được tin nhắn mới
        const handleReceiveMessage = (data) => {
            setRealTimeMessages((prev) => [...prev, data]);
        };

        // Lắng nghe sự kiện nhận tin nhắn
        socket.on('receiveMessage', (data) => {
            handleReceiveMessage(data);
        });

        // --- Dọn dẹp ---
        return () => {
            socket.off('receiveMessage');
        };
    }, [socket]);

    return (
        <SocketContext.Provider
            value={{
                socket: socket || getSocket(),
                realTimeMessages,
                notifications,
                setNotifications,
                activeConversationId,
                setActiveConversationId,
            }}
        >
            {children}
        </SocketContext.Provider>
    );
}
