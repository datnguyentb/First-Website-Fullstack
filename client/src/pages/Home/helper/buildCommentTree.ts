// 1. Định nghĩa Interface cho dữ liệu phẳng nhận từ API
export interface FlatComment {
    _id: string;
    post: string;
    user: {
        _id: string;
        firstName: string;
        lastName: string;
        avatar: string;
    };
    content: string;
    parentCommentId: string | null;
    likes: string[];
    likesCount: number;
    createdAt: string;
    updatedAt: string;
}

// 2. Định nghĩa Interface cho dữ liệu dạng cây (thêm mảng replies)
export interface CommentTreeNode extends FlatComment {
    replies: CommentTreeNode[];
}

export const buildCommentTree = (flatComments: FlatComment[]): CommentTreeNode[] => {
    const commentMap: Record<string, CommentTreeNode> = {};
    const tree: CommentTreeNode[] = [];

    // Bước 1: Khởi tạo map và mảng replies trống
    flatComments.forEach((comment) => {
        commentMap[comment._id] = { ...comment, replies: [] };
    });

    // Bước 2: Tạo một bản sao và đảo ngược mảng ngay từ đầu
    // Điều này giúp cấu trúc phân cấp xuất hiện ngược lại một cách tự nhiên
    const reversedFlatComments = [...flatComments].reverse();

    // Bước 3: Duyệt qua danh sách đã đảo ngược và sử dụng .push() để đạt hiệu năng tối đa
    reversedFlatComments.forEach((comment) => {
        const mappedComment = commentMap[comment._id];
        const parentId = comment.parentCommentId;

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
