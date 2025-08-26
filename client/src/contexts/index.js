// useModal.js
import { useContext } from 'react';
import { ModalContext } from './ModalContext';
import { PlayerContext } from './PlayerContext';
import { PostContext } from './PostContext';
import { UserContext } from './UserContext';

export const usePlayer = () => useContext(PlayerContext);
export const useModal = () => useContext(ModalContext);
export const usePosts = () => useContext(PostContext);
export const useUser = () => useContext(UserContext);
