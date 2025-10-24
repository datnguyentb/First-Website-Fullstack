import { useEffect, useState } from 'react';
import { useSocketContext } from '~/contexts';

function SocketTest() {
    const { socket, realTimeMessages } = useSocketContext();
    const [message, setMessage] = useState('');

    useEffect(() => {
        console.log('✅ SocketTest mounted, socket connected:', socket.connected);
        const randomNum = Math.floor(Math.random() * 1000);
        socket.emit('addUser', `user${randomNum}`);
        // Lắng nghe sự kiện test từ server
        socket.on('serverResponse', (data) => {
            console.log('📩 Server phản hồi:', data);
        });

        socket.emit('joinConversation', 'test_room_1');

        // Dọn dẹp khi rời trang
        return () => {
            socket.off('serverResponse');
        };
    }, [socket]);

    const handleSend = () => {
        if (!message.trim()) return;

        const fakeMessageData = {
            senderId: 'u_me',
            conversationId: 'test_room_1',
            text: message,
            timestamp: new Date().toISOString(),
        };

        socket.emit('sendMessage', fakeMessageData);
        // Đồng thời join phòng nếu chưa
        setMessage('');
    };

    console.log('🔔 Real-time Messages:', realTimeMessages);

    return (
        <div style={{ padding: 20 }}>
            <h2>🧩 Socket.IO Test Page</h2>
            <div style={{ marginBottom: 10 }}>
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Nhập tin nhắn test..."
                    style={{ width: '70%', marginRight: 10 }}
                />
                <button onClick={handleSend}>Gửi</button>
            </div>

            <div style={{ marginTop: 20 }}>
                {!realTimeMessages || realTimeMessages.length === 0 ? (
                    <i>Chưa có tin nhắn nào...</i>
                ) : (
                    realTimeMessages.map((msg, index) => (
                        <div key={index} style={{ marginBottom: 10, padding: 10, border: '1px solid #ccc' }}>
                            <b>{msg.senderId}</b>{' '}
                            <i style={{ fontSize: 12, color: '#888' }}>
                                {new Date(msg.timestamp).toLocaleTimeString()}
                            </i>{' '}
                            <br />
                            {msg.text}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default SocketTest;
