import SavedPost from '../../models/SavedPost.js';
import HiddenPost from '../../models/HiddenPost.js';
import Post from '../../models/Post.js';
import ReportPost from '../../models/Report.js';
import mongoose from 'mongoose';

import {
    okResponse,
    createdResponse,
    notFoundResponse,
    badRequestResponse,
    serverErrorResponse,
} from '../../utils/responseHelper.js';

import { MESSAGE_RESPONSE } from '../../constants/index.js';
import { formatItem } from '../../utils/formatter.js';

class PostInteractionController {
    async savePost(req, res) {
        try {
            const userId = req.user._id;
            const postId = req.params.postId;

            // Check if the post is already saved
            const existing = await SavedPost.findOne({ user: userId, post: postId });

            if (existing) {
                return badRequestResponse(res, 'Post has already been saved');
            }

            // Create a new saved post entry
            const saved = await SavedPost.create({
                user: userId,
                post: postId,
            });

            return createdResponse(res, 'Saved successfully', saved);
        } catch (err) {
            console.error('Error savePost post:', err);
            return serverErrorResponse(res, MESSAGE_RESPONSE.SERVER_ERROR);
        }
    }

    async unsavePost(req, res) {
        try {
            const userId = req.user._id;
            const postId = req.params.postId;

            // Tìm và xoá bản ghi đã lưu
            const deleted = await SavedPost.findOneAndDelete({ user: userId, post: postId });

            if (!deleted) {
                return notFoundResponse(res, 'You have not saved this post yet');
            }

            return okResponse(res, 'Unsaved successfully');
        } catch (err) {
            console.error('Error unsavePost post:', err);
            return serverErrorResponse(res, MESSAGE_RESPONSE.SERVER_ERROR);
        }
    }

    async hidePost(req, res) {
        try {
            const userId = req.user._id;
            const postId = req.params.postId;

            // Check if the post is already hidden
            const existing = await HiddenPost.findOne({ user: userId, post: postId });

            if (existing) {
                return badRequestResponse(res, 'Post has already been hidden');
            }

            // Create a new hidden post entry
            const hidden = await HiddenPost.create({
                user: userId,
                post: postId,
            });

            return createdResponse(res, 'Post hidden successfully');
        } catch (err) {
            console.error('Error hidePost post:', err);
            return serverErrorResponse(res, MESSAGE_RESPONSE.SERVER_ERROR);
        }
    }

    async likePost(req, res) {
        try {
            const userId = req.user._id;
            const postId = req.params.postId;

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
            await post.populate('likes', '_id avatar firstName lastName');
            await post.populate('author', '_id avatar firstName lastName');

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
            console.error('Error likePost post:', err);
            return serverErrorResponse(res);
        }
    }

    async reportPost(req, res) {
        console.log('running');
        try {
            const postId = req.params.postId;
            const reason = req.body.reason;
            const userId = req.user._id;

            if (!mongoose.Types.ObjectId.isValid(postId)) {
                return badRequestResponse(res, 'Invalid post ID');
            }

            if (!reason || !reason.trim()) {
                return badRequestResponse(res, 'Reason for reporting is required');
            }

            const existingReport = await ReportPost.findOne({
                reporter: userId,
                targetType: 'post',
                targetId: postId,
            });

            if (existingReport) {
                return badRequestResponse(res, 'You have already reported this post');
            }

            // Create new report
            const newReport = await ReportPost.create({
                reporter: userId,
                targetType: 'post',
                targetId: postId,
                reason: reason.trim(),
            });

            return createdResponse(res, 'Post reported successfully', newReport);
        } catch (err) {
            console.error('Error reporting post:', err);
            return serverErrorResponse(res, MESSAGE_RESPONSE.SERVER_ERROR);
        }
    }
}

export default new PostInteractionController();
