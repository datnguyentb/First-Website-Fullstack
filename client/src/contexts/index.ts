// useModal.js
import { useContext } from 'react';
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
import { AdminAuthContextType } from './AdminAuthContext/AdminAuthContextTypes';
import { ChatWidgetContextType } from './ChatWidgetContext/ChatWidgetContextTypes';

export const useSocketContext = () => useContext(SocketContext);
export const usePlayerContext = () => useContext(PlayerContext);
export const useModalContext = () => useContext(ModalContext);
export const usePostsContext = () => useContext(PostContext);
export const useUserContext = () => useContext(UserContext);
export const userAuthContext = () => useContext(UserAuthContext);
export const useAdminAuthContext = () => {
    const context = useContext(AdminAuthContext);
    return context as AdminAuthContextType;
};
export const usePlaylistContext = () => useContext(PlaylistContext);
export const useFavoriteContext = () => useContext(FavoriteContext);
export const useChatWidgetContext = () => {
    const context = useContext(ChatWidgetContext);
    return context as ChatWidgetContextType;
};
export const useConversationContext = () => useContext(ConversationContext);
export const useMessageCacheContext = () => useContext(MessageCacheContext);
