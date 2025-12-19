// useModal.js
import { useContext } from 'react';
import { ModalContext } from './ModalContext';
import { PlayerContext } from './PlayerContext';
import { PostContext } from './PostContext';
import { UserContext } from './UserContext';
import { UserAuthContext } from './UserAuthContext';
import { AdminAuthContext } from './AdminAuthContext';
import { PlaylistContext } from './PlaylistContext';
import { FavoriteContext } from './FavoriteContext';
import { SocketContext } from './socket/SocketContext';
import { ChatWidgetContext } from './ChatwidgetContext';
import { ConversationContext } from './conversationContext.js/ConversationContext';
import { MessageCacheContext } from './messageCache/MessageCacheContext';

export const useSocketContext = () => useContext(SocketContext);
export const usePlayerContext = () => useContext(PlayerContext);
export const useModalContext = () => useContext(ModalContext);
export const usePostsContext = () => useContext(PostContext);
export const useUserContext = () => useContext(UserContext);
export const userAuthContext = () => useContext(UserAuthContext);
export const userAdminAuthContext = () => useContext(AdminAuthContext);
export const usePlaylistContext = () => useContext(PlaylistContext);
export const useFavoriteContext = () => useContext(FavoriteContext);
export const useChatWidgetContext = () => useContext(ChatWidgetContext);
export const useConversationContext = () => useContext(ConversationContext);
export const useMessageCacheContext = () => useContext(MessageCacheContext);
