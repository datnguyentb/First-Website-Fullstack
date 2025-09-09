import Friendship from '../../models/Friendship.js';
import {
    okResponse,
    badRequestResponse,
    createdResponse,
    notFoundResponse,
    serverErrorResponse,
} from '../../utils/responseHelper.js';

class FriendshipController {
    sendFriendRequest = async (req, res) => {
        const currentUserId = req.user._id;
        const targetUserId = req.params.id;

        try {
            // 🛑 Không được gửi request cho chính mình
            if (currentUserId.toString() === targetUserId.toString()) {
                return badRequestResponse(res, 'You cannot send a friend request to yourself.');
            }

            // 🔍 Kiểm tra A -> B đã tồn tại
            const existingAB = await Friendship.findOne({
                requester: currentUserId,
                recipient: targetUserId,
            });

            if (existingAB) {
                switch (existingAB.status) {
                    case 'pending':
                        return badRequestResponse(res, 'Friend request already sent.');
                    case 'accepted':
                        return badRequestResponse(res, 'You are already friends.');
                    case 'rejected':
                        return badRequestResponse(res, 'Cannot send friend request at this time.');
                    case 'blocked':
                        return badRequestResponse(res, 'Cannot send friend request at this time.');
                }
            }

            // 🔍 Kiểm tra B -> A (người kia đã gửi trước)
            const existingBA = await Friendship.findOne({
                requester: targetUserId,
                recipient: currentUserId,
            });

            if (existingBA) {
                switch (existingBA.status) {
                    case 'pending':
                        existingBA.status = 'accepted';
                        await existingBA.save();
                        return okResponse(res, 'You are now friends.', { status: 'accepted' });

                    case 'accepted':
                        return badRequestResponse(res, 'You are already friends.');
                    case 'rejected':
                        return badRequestResponse(res, 'Cannot send friend request at this time.');
                    case 'blocked':
                        return badRequestResponse(res, 'Cannot send friend request at this time.');
                }
            }

            // ✅ Tạo mới
            const newRequest = await Friendship.create({
                requester: currentUserId,
                recipient: targetUserId,
                status: 'pending',
            });

            return createdResponse(res, 'Friend request sent.', { status: 'pending' });
        } catch (error) {
            return serverErrorResponse(res);
        }
    };

    unfollowUser = async (req, res) => {
        const currentUserId = req.user._id;
        const targetUserId = req.params.id;

        try {
            if (currentUserId.toString() === targetUserId.toString()) {
                return badRequestResponse(res, 'You cannot unfollow yourself.');
            }

            // A → B
            const existingAB = await Friendship.findOne({
                requester: currentUserId,
                recipient: targetUserId,
            });

            if (existingAB) {
                await existingAB.deleteOne();

                const message =
                    existingAB.status === 'pending' ? 'Friend request cancelled.' : 'Unfollowed successfully.';

                return okResponse(res, message, { status: '' });
            }

            // B → A
            const existingBA = await Friendship.findOne({
                requester: targetUserId,
                recipient: currentUserId,
            });

            if (existingBA) {
                await existingBA.deleteOne();

                const message =
                    existingBA.status === 'pending' ? 'Friend request declined.' : 'Unfollowed successfully.';

                return okResponse(res, message, { status: '' });
            }

            return notFoundResponse(res, 'No active friendship to unfollow.');
        } catch (error) {
            return serverErrorResponse(res);
        }
    };

    getFriendshipStatus = async (req, res) => {
        const currentUserId = req.user._id;
        const targetUserId = req.params.id;

        try {
            const friendship = await Friendship.findOne({
                $or: [
                    { requester: currentUserId, recipient: targetUserId },
                    { requester: targetUserId, recipient: currentUserId },
                ],
            });

            if (!friendship) {
                return okResponse(res, 'No relationship found', { status: '' });
            }

            if (friendship.status === 'accepted') {
                return okResponse(res, 'Friends', { status: 'accepted' });
            }

            if (friendship.status === 'pending' && friendship.requester.equals(currentUserId)) {
                return okResponse(res, 'Request sent', { status: 'pending' });
            }

            return okResponse(res, 'No relationship found', { status: '' });
        } catch (error) {
            return serverErrorResponse(res);
        }
    };

    getFriends = async (req, res) => {};
}

export default new FriendshipController();
