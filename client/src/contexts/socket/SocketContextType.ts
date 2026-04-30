import { SocketState } from './type';

type SocketContextType = SocketState & {
    socket: any; // override nếu cần
};

export default SocketContextType;
