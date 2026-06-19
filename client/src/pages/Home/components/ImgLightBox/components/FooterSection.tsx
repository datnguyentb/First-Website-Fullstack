import AddCommentInput from '../../Comments/AddCommentInput';
import useSendComment from '~/socket/hook/post/useSendComment';

function FooterSection({ postId }: { postId: string }) {
    const { sendComment } = useSendComment();

    const handleSubmit = (content: string) => {
        const newReply = {
            post: postId,
            parentCommentId: '',
            content,
        };

        sendComment(postId, newReply);
    };
    return (
        <>
            <AddCommentInput onSubmit={handleSubmit} />
        </>
    );
}

export default FooterSection;
