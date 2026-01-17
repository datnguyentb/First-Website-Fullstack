import useCreatePost from '~/hooks/post/useCreatePost';
import { Post } from '~/types/post';

export const useSubmitPost = (
    selectedImages: File[],
    text: string,
    privacyOptionRef: React.RefObject<any>,
    handleSuccess: (result: Post) => void,
) => {
    const { createPost, loading } = useCreatePost();

    const handlePostSubmit = async () => {
        const formData = new FormData();
        formData.append('content', text.trim());
        formData.append('privacy', privacyOptionRef.current?.value);
        selectedImages.forEach((file) => formData.append('posts', file));

        const result = await createPost(formData);
        if (result) handleSuccess(result);
    };
    return { handlePostSubmit, loading };
};
