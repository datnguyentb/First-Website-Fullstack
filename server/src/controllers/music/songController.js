// xử lý CRUD bài hát
// controllers/music/spotifyController.js
import { okResponse, notFoundResponse, badRequestResponse, serverErrorResponse } from '../../utils/responseHelper.js';
import Song from '../../models/Song.js';
import Playlist from '../../models/Playlist.js';
import { formatItem } from '../../utils/formatter.js';

class songController {
    getTracksRecommend = async (req, res) => {
        try {
            const userId = req.user._id;

            // lấy danh sách top tracks
            const tracks = await Song.find({
                type: 'track',
                isReady: true,
            })
                .sort({ listenCount: -1 })
                .limit(9)
                .populate('album', '_id spotifyId name images release_date release_date_precision')
                .lean();

            if (!tracks?.length) {
                return notFoundResponse(res, 'No recommended tracks found');
            }

            // lấy playlist yêu thích (favorite) của user
            const favorite = await Playlist.findOne({ owner: userId, type: 'favorite' }).select('tracks.track').lean();

            const likedTrackIds = favorite ? favorite.tracks.map((t) => t.track.toString()) : [];

            // format + gắn isLiked
            const formatted = tracks.map((track) => ({
                ...formatItem(track, ['_id', 'name', 'artists', 'album']),
                isLiked: likedTrackIds.includes(track._id.toString()),
            }));

            return okResponse(res, 'Recommended tracks retrieved successfully', formatted);
        } catch (error) {
            console.error('[getTracksRecommend] Error:', error);
            return serverErrorResponse(res, 'Failed to retrieve recommended tracks');
        }
    };

    getTrackUrlById = async (req, res) => {
        const { trackId } = req.params;
        if (!trackId || trackId.trim() === '') {
            return badRequestResponse(res, 'Track ID is required');
        }
        try {
            const track = await Song.findById(trackId);

            if (!track || !track.isReady) {
                return notFoundResponse(res, 'Track not found');
            }
            return okResponse(res, 'Track retrieved successfully', formatItem(track, ['_id', 'url']));
        } catch (error) {
            console.error(error);
            return serverErrorResponse(res, 'Failed to get track');
        }
    };
}

export default new songController();
