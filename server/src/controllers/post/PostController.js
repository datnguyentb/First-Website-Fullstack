import {
    okResponse,
    createdResponse,
    notFoundResponse,
    forbiddenResponse,
    badRequestResponse,
    serverErrorResponse,
} from '../../utils/responseHelper.js';

import { MESSAGE_RESPONSE } from '../../constants/index.js';
import Post from '../../models/Post.js';
import Friendship from '../../models/Friendship.js';
import SavedPost from '../../models/SavedPost.js';
import HiddenPost from '../../models/HiddenPost.js';
import ReportPost from '../../models/Report.js';

import { formatItems, formatItem } from '../../utils/formatter.js';
import { formatPost, formatPosts } from '../../helper/formatPost.js';

class PostController {
    async create(req, res) {
        try {
            const { content, privacy } = req.body;

            if (!content && !req.files) {
                return badRequestResponse(res, MESSAGE_RESPONSE.POST.EMPTY_CONTENT, {
                    content: 'Chưa nhập nội dung',
                });
            }

            const post = new Post({
                content,
                privacy,
                author: req.user._id,
                images: req.files?.map((file) => `/uploads/posts/${file.filename}`) || [],
            });

            await post.save();

            await post.populate('author', '_id avatar firstName lastName');

            return createdResponse(res, MESSAGE_RESPONSE.POST.CREATE_SUCCESS, formatPost(post));
        } catch (err) {
            return serverErrorResponse(res);
        }
    }

    async getAll(req, res) {
        try {
            const currentUserId = req.user._id;

            // 🔹 Lấy danh sách bạn bè từ Friendship (status = accepted)
            const friendships = await Friendship.find({
                status: 'accepted',
                $or: [{ requester: currentUserId }, { recipient: currentUserId }],
            }).select('requester recipient');

            const friends = friendships.map((f) =>
                f.requester.toString() === currentUserId.toString() ? f.recipient.toString() : f.requester.toString(),
            );

            // 🔹 Lấy danh sách bài viết bị ẩn
            const hiddenPostDocs = await HiddenPost.find({ user: currentUserId }).select('post');
            const hiddenPostIds = hiddenPostDocs.map((doc) => doc.post.toString());

            // 🔹 Lấy danh sách bài viết đã bị user báo cáo
            const reportedPostDocs = await ReportPost.find({
                reporter: currentUserId,
                targetType: 'post',
            }).select('targetId');
            const reportedPostIds = reportedPostDocs.map((doc) => doc.targetId.toString());

            // 🔹 Kết hợp cả hidden + reported vào danh sách cần loại bỏ
            const excludedPostIds = [...hiddenPostIds, ...reportedPostIds];

            // 🔹 Filter bài viết theo quyền riêng tư và không bị ẩn
            const filter = {
                $and: [
                    {
                        $or: [
                            { author: currentUserId },
                            { privacy: 'public' },
                            { privacy: 'friends', author: { $in: friends } },
                        ],
                    },
                    {
                        _id: { $nin: excludedPostIds },
                    },
                ],
            };

            // 🔹 Lấy bài viết phù hợp
            const posts = await Post.find(filter)
                .sort({ createdAt: -1 })
                .populate('author', '_id avatar firstName lastName')
                .populate('likes', '_id firstName lastName');

            // 🔹 Lấy danh sách bài viết đã lưu
            const savedPostDocs = await SavedPost.find({ user: currentUserId }).select('post');
            const savedPostIds = savedPostDocs.map((doc) => doc.post.toString());

            // 🔹 Gắn cờ isSaved
            const postsWithSavedStatus = posts.map((post) => ({
                ...post.toObject(),
                isSaved: savedPostIds.includes(post._id.toString()),
            }));

            return okResponse(res, MESSAGE_RESPONSE.POST.FETCH_SUCCESS, formatPosts(postsWithSavedStatus));
        } catch (err) {
            console.error(err);
            return serverErrorResponse(res, MESSAGE_RESPONSE.POST.FETCH_FAILED);
        }
    }

    async deletePost(req, res) {
        try {
            const postId = req.params.id;
            const userId = req.user._id;

            const post = await Post.findOne({ _id: postId });
            if (!post) return notFoundResponse(res, MESSAGE_RESPONSE.POST.NOT_FOUND);

            if (post.author.toString() !== userId.toString()) {
                return forbiddenResponse(res, MESSAGE_RESPONSE.POST.NO_ACCESS);
            }

            await post.delete();

            return okResponse(res, MESSAGE_RESPONSE.POST.DELETE_SUCCESS);
        } catch (err) {
            return serverErrorResponse(res);
        }
    }
}

export default new PostController();
