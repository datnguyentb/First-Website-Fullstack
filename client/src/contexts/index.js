// useModal.js
import { useContext } from 'react';
import { ModalContext } from './ModalContext';
import { PlayerContext } from './PlayerContext';
import { PostContext } from './PostContext';
import { UserContext } from './UserContext';
import { UserAuthContext } from './UserAuthContext';
import { AdminAuthContext } from './AdminAuthContext';

export const usePlayerContext = () => useContext(PlayerContext);
export const useModalContext = () => useContext(ModalContext);
export const usePostsContext = () => useContext(PostContext);
export const useUserContext = () => useContext(UserContext);
export const userAuthContext = () => useContext(UserAuthContext);
export const userAdminAuthContext = () => useContext(AdminAuthContext);
