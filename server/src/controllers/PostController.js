import { success as successResponse, error as errorResponse } from '../utils/response.js';
import Post from '../models/Post.js';
import User from '../models/User.js';
import { formatItems, formatItem } from '../utils/formatter.js';

class PostController {
    async create(req, res, next) {
        try {
            // Lấy dữ liệu bài viết
            const { content, privacy } = req.body;
            if (!content && !req.files) {
                return errorResponse(res, 'Bạn chưa nhập nội dung');
            }

            // Tạo object bài viết mới
            const post = new Post({
                content,
                privacy,
                authorId: req.user.id,
                images: req.files?.map((file) => `/uploads/posts/${file.filename}`) || [],
            });

            // Lưu vào database
            await post.save();
            await post.populate('authorId', '_id avatarUrl firstName lastName');

            // Trả về kết quả thành công
            return successResponse(
                res,
                'Tạo bài viết thành công',
                formatItem(post, [
                    'authorId',
                    'commentCount',
                    'content',
                    'createdAt',
                    '_id',
                    'images',
                    'likeCount',
                    'likes',
                    'privacy',
                    'tags',
                    'video',
                    'location',
                ]),
            );
        } catch (err) {
            return errorResponse(res, 'Tạo bài viết thất bại');
        }
    }

    async likePost(req, res, next) {
        try {
            const postId = req.params.id;
            const userId = req.user._id;

            const post = await Post.findById(postId);
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }

            const hasLiked = post.likes.includes(userId);

            if (hasLiked) {
                // Đã like → gỡ like
                post.likes.pull(userId);
                post.likeCount = Math.max(post.likeCount - 1, 0);
            } else {
                // Chưa like → thêm like
                post.likes.push(userId);
                post.likeCount += 1;
            }

            await post.save();
            await post.populate('likes', '_id avatarUrl firstName lastName');
            await post.populate('authorId', '_id avatarUrl firstName lastName');

            return successResponse(
                res,
                hasLiked ? 'Unliked successfully' : 'Liked successfully',
                formatItem(post, [
                    'authorId',
                    'commentCount',
                    'content',
                    'createdAt',
                    '_id',
                    'images',
                    'likeCount',
                    'likes',
                    'privacy',
                    'tags',
                    'video',
                    'location',
                ]),
            );
        } catch (error) {
            next(error);
        }
    }

    async getAll(req, res, next) {
        try {
            const currentUserId = req.user._id;

            // Lấy thông tin người dùng hiện tại để có danh sách following & followers
            const currentUser = await User.findById(currentUserId).select('followers following');

            // Tìm bạn bè: người mà vừa follow mình và mình cũng follow lại
            const friends = currentUser.following.filter((id) => currentUser.followers.includes(id));

            const filter = {
                $or: [
                    { authorId: currentUserId }, // Bài viết của mình
                    { privacy: 'public' }, // Công khai
                    {
                        privacy: 'friends', // Của bạn bè
                        author_d: { $in: friends },
                    },
                ],
            };

            const posts = await Post.find(filter)
                .sort({ createdAt: -1 })
                .populate('authorId', '_id avatarUrl firstName lastName')
                .populate('likes', '_id firstName lastName');

            return successResponse(
                res,
                'Lấy danh sách bài viết thành công',
                formatItems(posts, [
                    'authorId',
                    'commentCount',
                    'content',
                    'createdAt',
                    '_id',
                    'images',
                    'likeCount',
                    'likes',
                    'privacy',
                    'tags',
                    'video',
                    'location',
                ]),
            );
        } catch (err) {
            console.error('Get all posts error:', err);
            return errorResponse(res, 'Lấy danh sách bài viết thất bại');
        }
    }

    async deletePost(req, res, next) {
        try {
            const postId = req.params.id;
            const userId = req.user._id;

            const post = await Post.findOne({ _id: postId });

            if (!post) {
                return errorResponse(res, 'Không tìm thấy bài viết.');
            }

            if (post.authorId.toString() !== userId.toString()) {
                return errorResponse(res, 'Không có quyền xóa bài viết này.');
            }

            post.deletedBy = userId;
            await post.delete(); // Xóa mềm

            return successResponse(res, 'Xóa bài viết thành công');
        } catch (error) {
            return errorResponse(error, 'Lỗi server.');
        }
    }
}

export default new PostController();
