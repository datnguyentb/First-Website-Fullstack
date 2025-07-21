import { useContext } from 'react';
import { PostContext } from './PostContext';

export const usePosts = () => useContext(PostContext);
