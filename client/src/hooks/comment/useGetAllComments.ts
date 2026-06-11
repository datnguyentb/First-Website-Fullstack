import commentApi from '~/api/post/commentApi';

export const useGetAllComments = () => {
    const getAllComments = async (postId: string) => {
        try {
            const res = await commentApi.getAllComments(postId);
            console.log('Comments fetched successfully:', res);
            return res.data.data;
        } catch (error) {
            console.error('Error fetching comments:', error);
            throw error;
        }
    };

    return { getAllComments };
};
