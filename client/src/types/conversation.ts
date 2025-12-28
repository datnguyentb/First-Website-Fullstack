export interface Participant {
    _id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    avatar: string;
    isOnline: boolean;
    lastActive: string | Date | null;
}

export interface ConversationInfo {
    _id: string;
    type: 'private' | 'group';
    name: string;
    avatar: string;
    lastMessage: string;
    participants: Participant[];
    updatedAt: string;
    theme: any;
    customEmoji: string;
}

export interface ConversationTheme {
    _id: string;
    name: string;

    sentBubble: {
        background: string;
        textColor: string;
    };
    receivedBubble: {
        background: string;
        textColor: string;
    };

    primaryColor: string;
    secondaryColor?: string;
    backgroundColor: string;
    backgroundImage?: string;

    isDark?: boolean;
    bubbleOpacity?: number;
}
