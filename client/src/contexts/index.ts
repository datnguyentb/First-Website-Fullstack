// useContexts.ts
import { useContext } from 'react';

// Contexts
import { ModalContext } from './ModalContext';
import { PlayerContext } from './PlayerContext';
import { PostContext } from './PostContext/PostContext';
import { UserContext } from './UserContext/UserContext';
import { UserAuthContext } from './UserAuthContext';
import { AdminAuthContext } from './AdminAuthContext/AdminAuthContext';
import { PlaylistContext } from './PlaylistContext';
import { FavoriteContext } from './FavoriteContext';
import { SocketContext } from './socket/SocketContext';
import { ChatWidgetContext } from './ChatWidgetContext/ChatWidgetContext';
import { ConversationContext } from './conversationContext/ConversationContext';
import { MessageCacheContext } from './messageCache/MessageCacheContext';
import { ToastContext } from './ToastContext/ToastContext';
import { NotificationsContext } from './NotificationsContext/NotificationsContext';

// Types
import { AdminAuthContextType } from './AdminAuthContext/AdminAuthContextTypes';
import { ChatWidgetContextType } from './ChatWidgetContext/ChatWidgetContextTypes';
import { MessageCacheContextType } from './messageCache/MessageCacheContextType';
import { ConversationContextType } from './conversationContext/ConversationContextTypes';

// 🔹 Hooks

//socket
export const useSocketContext = () => useContext(SocketContext);

//modal & toast
export const useToastContext = () => useContext(ToastContext);
export const useModalContext = () => useContext(ModalContext);

//user
export const useUserContext = () => useContext(UserContext);

//post
export const usePostsContext = () => useContext(PostContext);

//auth
export const userAuthContext = () => useContext(UserAuthContext);
export const useAdminAuthContext = () => {
    const context = useContext(AdminAuthContext);
    return context as AdminAuthContextType;
};

//music

export const usePlayerContext = () => useContext(PlayerContext);
export const usePlaylistContext = () => useContext(PlaylistContext);
export const useFavoriteContext = () => useContext(FavoriteContext);

//chat
export const useChatWidgetContext = () => {
    const context = useContext(ChatWidgetContext);
    return context as ChatWidgetContextType;
};

export const useConversationContext = (): ConversationContextType => {
    const context = useContext(ConversationContext);

    if (!context) {
        throw new Error('useConversationContext must be used within ConversationProvider');
    }

    return context;
};

//Message Cache
export const useMessageCacheContext = (): MessageCacheContextType => {
    const context = useContext(MessageCacheContext);

    if (!context) {
        throw new Error('useMessageCacheContext must be used within MessageCacheProvider');
    }

    return context;
};

//Notifications
export const useNotificationsContext = () => useContext(NotificationsContext);
