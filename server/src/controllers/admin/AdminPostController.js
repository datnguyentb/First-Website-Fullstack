import Post from '../../models/Post.js';
import Log from '../../models/Log.js';
import fs from 'fs';
import path from 'path';
import { okResponse, notFoundResponse, serverErrorResponse } from '../../utils/responseHelper.js';

class AdminPostController {
    getPostsNumber = async (req, res) => {
        try {
            const totalPosts = await Post.countDocumentsWithDeleted();
            const reportedPosts = await Post.countDocuments({
                reportedBy: { $exists: true, $not: { $size: 0 } },
            });

            return okResponse(res, 'Retrieved post statistics successfully', {
                totalPosts,
                reportedPosts,
            });
        } catch {
            return serverErrorResponse(res, 'Failed to retrieve post statistics');
        }
    };

    getAllPost = async (req, res) => {
        try {
            const posts = await Post.findWithDeleted()
                .populate('author', 'firstName lastName email avatar')
                .sort({ createdAt: -1 });

            return okResponse(res, 'Retrieved posts successfully', posts);
        } catch {
            return serverErrorResponse(res, 'Failed to retrieve posts');
        }
    };

    softDelete = async (req, res) => {
        try {
            const postId = req.params.id;
            const userId = req.user._id;
            const { reason } = req.body;

            const post = await Post.findOne({ _id: postId }).populate('author', 'firstName lastName email avatar');

            if (!post) {
                return notFoundResponse(res, 'Post not found');
            }

            post.deletedByAdmin = userId;
            post.deletedReason = reason || '';
            await post.delete();

            await Log.create({
                type: 'delete',
                target: 'Post',
                targetId: postId,
                actionBy: userId,
                reason: reason || '',
            });

            return okResponse(res, 'Post soft-deleted successfully', post);
        } catch {
            return serverErrorResponse(res, 'Server error while soft-deleting post');
        }
    };

    restorePost = async (req, res) => {
        try {
            const postId = req.params.id;

            const post = await Post.findOneDeleted({ _id: postId }).populate(
                'author',
                'firstName lastName email avatar',
            );

            if (!post) {
                return notFoundResponse(res, 'Deleted post not found');
            }

            await post.restore();
            post.deletedByAdmin = null;
            post.deletedReason = '';
            await post.save();

            await Log.create({
                type: 'restore',
                target: 'Post',
                targetId: postId,
                actionBy: req.user._id,
            });

            return okResponse(res, 'Post restored successfully', post);
        } catch {
            return serverErrorResponse(res, 'Server error while restoring post');
        }
    };

    forceDeletePost = async (req, res) => {
        try {
            const postId = req.params.id;
            const post = await Post.findOneWithDeleted({ _id: postId });

            if (!post) {
                return notFoundResponse(res, 'Post not found');
            }

            if (post.images && post.images.length > 0) {
                for (const imageUrl of post.images) {
                    const imagePath = path.join(process.cwd(), 'src', imageUrl);
                    if (fs.existsSync(imagePath)) {
                        fs.unlinkSync(imagePath);
                    }
                }
            }

            await post.deleteOne();

            await Log.create({
                type: 'force-delete',
                target: 'Post',
                targetId: postId,
                actionBy: req.user._id,
            });

            return okResponse(res, 'Post permanently deleted');
        } catch {
            return serverErrorResponse(res, 'Server error while permanently deleting post');
        }
    };
}

export default new AdminPostController();
