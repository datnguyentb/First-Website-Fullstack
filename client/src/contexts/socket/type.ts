export interface SocketEventData {
    type: string;
    payload: any;
    [key: string]: any;
}

export interface SocketState {
    socket: WebSocket | null;
    realTimeMessages: any[];
    notifications: any[];
    activeConversationId: string | null;
}

export interface SocketAction {
    type: string;
    payload?: any;
}
