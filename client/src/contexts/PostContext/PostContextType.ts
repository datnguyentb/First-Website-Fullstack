import { Post as PostData } from '~/types';

export type PostContextType = {
    posts: PostData[] | null;
    setPost: React.Dispatch<React.SetStateAction<PostData[] | []>>;
    loading: boolean;
};
