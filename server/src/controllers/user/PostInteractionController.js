import SavedPost from '../../models/SavedPost.js';
import HiddenPost from '../../models/HiddenPost.js';

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
    async likePost(req, res) {
        try {
            //
        } catch (err) {
            return serverErrorResponse(res);
        }
    }

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

            return createdResponse(res, 'Post hidden successfully', hidden);
        } catch (error) {
            return serverErrorResponse(res, MESSAGE_RESPONSE.SERVER_ERROR);
        }
    }
}

export default new PostInteractionController();
