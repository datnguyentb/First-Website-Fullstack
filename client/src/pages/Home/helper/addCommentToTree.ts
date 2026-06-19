import { CommentTreeNode, FlatComment } from './buildCommentTree';

/**
 * Hàm thêm một comment mới vào cây comment hiện tại
 * @param currentTree Cây comment hiện tại ở state (CommentTreeNode[])
 * @param newComment Dữ liệu phẳng của comment mới nhận từ socket (FlatComment)
 * @returns Cây comment mới sau khi đã chèn (trả về mảng mới để React nhận biết thay đổi state)
 */
export const addCommentToTree = (currentTree: CommentTreeNode[], newComment: FlatComment): CommentTreeNode[] => {
    // 1. Tạo node mới chuẩn cấu trúc cây (có sẵn mảng replies trống)
    const newNode: CommentTreeNode = { ...newComment, replies: [] };

    // Trường hợp 1: Nếu là comment gốc (không có parentCommentId)
    // Thêm trực tiếp vào đầu hoặc cuối danh sách gốc tùy theo giao diện của bạn
    if (!newComment.parentCommentId) {
        return [newNode, ...currentTree]; // Đẩy lên đầu danh sách (mới nhất hiện trước)
        // hoặc: return [...currentTree, newNode]; (nếu muốn cũ trước mới sau)
    }

    // Trường hợp 2: Nếu là reply comment (có parentCommentId)
    // Cần clone lại cây và tìm vị trí cha một cách đệ quy
    const findAndInsert = (nodes: CommentTreeNode[]): CommentTreeNode[] => {
        return nodes.map((node) => {
            // Nếu tìm thấy đúng node cha
            if (node._id === newComment.parentCommentId) {
                return {
                    ...node,
                    replies: [...node.replies, newNode], // Chèn reply vào cuối mảng replies của cha
                };
            }

            // Nếu node này có con, tiếp tục tìm đệ quy sâu xuống các tầng dưới
            if (node.replies && node.replies.length > 0) {
                return {
                    ...node,
                    replies: findAndInsert(node.replies),
                };
            }

            return node;
        });
    };

    return findAndInsert(currentTree);
};
