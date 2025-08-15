import SavedPost from '../../models/SavedPost.js';
import HiddenPost from '../../models/HiddenPost.js';
import ReportPost from '../../models/Report.js';
import mongoose from 'mongoose';

import {
    okResponse,
    createdResponse,
    notFoundResponse,
    forbiddenResponse,
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
        } catch (error) {
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
        } catch (error) {
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
        } catch (error) {
            return serverErrorResponse(res, MESSAGE_RESPONSE.SERVER_ERROR);
        }
    }

    async reportPost(req, res) {
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
        } catch (error) {
            console.error('Error reporting post:', error);
            return serverErrorResponse(res, MESSAGE_RESPONSE.SERVER_ERROR);
        }
    }
}

export default new PostInteractionController();
