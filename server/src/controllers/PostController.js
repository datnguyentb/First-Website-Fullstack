import {
    okResponse,
    createdResponse,
    notFoundResponse,
    forbiddenResponse,
    badRequestResponse,
    serverErrorResponse,
} from '../utils/responseHelper.js';

import { MESSAGE_RESPONSE } from '../constants/index.js';
import Post from '../models/Post.js';
import User from '../models/User.js';
import { formatItems, formatItem } from '../utils/formatter.js';

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
                author: req.user.id,
                images: req.files?.map((file) => `/uploads/posts/${file.filename}`) || [],
            });

            await post.save();
            await post.populate('author', '_id avatarUrl firstName lastName');

            return createdResponse(
                res,
                MESSAGE_RESPONSE.POST.CREATE_SUCCESS,
                formatItem(post, [
                    'author',
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
            return serverErrorResponse(res);
        }
    }

    async likePost(req, res) {
        try {
            const postId = req.params.id;
            const userId = req.user._id;

            const post = await Post.findById(postId);
            if (!post) return notFoundResponse(res, MESSAGE_RESPONSE.POST.NOT_FOUND);

            const hasLiked = post.likes.includes(userId);

            if (hasLiked) {
                post.likes.pull(userId);
                post.likeCount = Math.max(post.likeCount - 1, 0);
            } else {
                post.likes.push(userId);
                post.likeCount += 1;
            }

            await post.save();
            await post.populate('likes', '_id avatarUrl firstName lastName');
            await post.populate('author', '_id avatarUrl firstName lastName');

            return okResponse(
                res,
                hasLiked ? MESSAGE_RESPONSE.POST.UNLIKE_SUCCESS : MESSAGE_RESPONSE.POST.LIKE_SUCCESS,
                formatItem(post, [
                    'author',
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
            return serverErrorResponse(res);
        }
    }

    async getAll(req, res) {
        try {
            const currentUserId = req.user._id;

            const currentUser = await User.findById(currentUserId).select('followers following');
            const friends = currentUser.following.filter((id) => currentUser.followers.includes(id));

            const filter = {
                $or: [
                    { author: currentUserId },
                    { privacy: 'public' },
                    { privacy: 'friends', author: { $in: friends } },
                ],
            };

            const posts = await Post.find(filter)
                .sort({ createdAt: -1 })
                .populate('author', '_id avatarUrl firstName lastName')
                .populate('likes', '_id firstName lastName');

            return okResponse(
                res,
                MESSAGE_RESPONSE.POST.FETCH_SUCCESS,
                formatItems(posts, [
                    'author',
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
