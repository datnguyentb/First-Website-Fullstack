import { useCreatePostComment } from '~/hooks/comment/useCreatePostComment';
import AddCommentInput from '../../Comments/AddCommentInput';

function FooterSection({ postId }: { postId: string }) {
    const { createComment } = useCreatePostComment();
    const handleAddComment = (commentText: string) => {
        const commentData = {
            content: commentText,
            post: postId,
            parentCommentId: null,
        };
        createComment(commentData);
    };
    return (
        <>
            <AddCommentInput onSubmit={handleAddComment} />
        </>
    );
}

export default FooterSection;
