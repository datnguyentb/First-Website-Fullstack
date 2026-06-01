// 1. Định nghĩa Interface cho dữ liệu phẳng nhận từ API
export interface FlatComment {
    _id: string;
    post: string;
    user: {
        _id: string;
        username: string;
        avatar: string;
    };
    content: string;
    parent_comment_id: string | null;
    createdAt: string;
    updatedAt: string;
}

// 2. Định nghĩa Interface cho dữ liệu dạng cây (thêm mảng replies)
export interface CommentTreeNode extends FlatComment {
    replies: CommentTreeNode[];
}

// 3. Hàm chuẩn hóa sang cấu trúc cây với TypeScript
export const buildCommentTree = (flatComments: FlatComment[]): CommentTreeNode[] => {
    // Sử dụng Record để định nghĩa object map với key là string, value là CommentTreeNode
    const commentMap: Record<string, CommentTreeNode> = {};
    const tree: CommentTreeNode[] = [];

    // Bước 1: Khởi tạo map và copy thuộc tính kèm mảng replies trống
    flatComments.forEach((comment) => {
        commentMap[comment._id] = { ...comment, replies: [] };
    });

    // Bước 2: Duyệt qua danh sách để xếp con vào cha
    flatComments.forEach((comment) => {
        const mappedComment = commentMap[comment._id];
        const parentId = comment.parent_comment_id;

        if (parentId) {
            if (commentMap[parentId]) {
                commentMap[parentId].replies.push(mappedComment);
            }
        } else {
            tree.push(mappedComment);
        }
    });

    return tree;
};
