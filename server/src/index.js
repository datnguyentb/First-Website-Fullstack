import { createServer } from 'node:http';
import { Server } from 'socket.io';
import app from './app.js';
import handleSocketEvents from './socket/index.js';

const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

handleSocketEvents(io);

// Khởi động server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`✅ Server is running at http://localhost:${PORT}`);
});
