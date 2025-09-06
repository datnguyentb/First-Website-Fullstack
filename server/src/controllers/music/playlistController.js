// controllers/music/spotifyController.js
import { okResponse, badRequestResponse, serverErrorResponse, createdResponse } from '../../utils/responseHelper.js';
import Playlist from '../../models/Playlist.js';
import User from '../../models/User.js';
import { formatItems, formatItem } from '../../utils/formatter.js';
import { MESSAGE_RESPONSE } from '../../constants/index.js';

class playlistController {
    createPlaylist = async (req, res) => {
        const file = req?.file || null;
        let fileName = '';
        if (file) {
            fileName = `/uploads/playlist-avatars/${file.filename}`;
        }
        try {
            const { playlistName, playlistDescription, isPublic } = req.body;
            if (!playlistName) {
                return badRequestResponse(res, MESSAGE_RESPONSE.PLAYLIST.EMPTY_NAME);
            }

            const playlist = new Playlist({
                owner: req.user._id,
                name: playlistName,
                description: playlistDescription,
                isPublic: isPublic,
                images: fileName,
            });

            await playlist.save();
            await playlist.populate('owner', '_id avatarUrl firstName lastName');

            return createdResponse(
                res,
                MESSAGE_RESPONSE.POST.CREATE_SUCCESS,
                formatItem(playlist, ['_id', 'name', 'owner', 'images', 'description', 'isPublic', 'createdAt']),
            );
        } catch (err) {
            console.error('❌ Create playlist error:', err);
            return serverErrorResponse(res);
        }
    };

    getUserPlaylists = async (req, res) => {
        const userId = req.user._id;

        try {
            // 1️⃣ Lấy playlist của user
            const userPlaylists = await Playlist.find({ owner: userId, type: 'playlist' })
                .populate('owner', '_id avatarUrl firstName lastName')
                .lean();

            // 2️⃣ Lấy saved playlists của user
            const userDoc = await User.findById(userId)
                .populate({
                    path: 'savedPlaylists',
                    populate: { path: 'owner', select: '_id avatarUrl firstName lastName' },
                })
                .lean();
            const savedPlaylists = userDoc?.savedPlaylists || [];

            // 3️⃣ Hợp vào 1 mảng và sắp xếp theo ngày mới nhất
            const allPlaylists = [...userPlaylists, ...savedPlaylists];
            allPlaylists.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            // 4️⃣ Trả về formatItem
            return okResponse(
                res,
                'Successfully fetched playlists',
                formatItems(allPlaylists, ['_id', 'name', 'owner', 'images', 'description', 'isPublic', 'createdAt']),
            );
        } catch (err) {
            console.error(err);
            return serverErrorResponse(res);
        }
    };
}

export default new playlistController();
