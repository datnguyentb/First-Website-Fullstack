// xử lý CRUD bài hát
// controllers/music/spotifyController.js
import { okResponse, notFoundResponse, badRequestResponse, serverErrorResponse } from '../../utils/responseHelper.js';
import Song from '../../models/Song.js';
import { formatItems, formatItem } from '../../utils/formatter.js';

class songController {
    getTracksRecomend = async (req, res) => {
        try {
            const tracks = await Song.find({ type: 'track', isReady: true })
                .sort({ listenCount: -1 })
                .limit(9)
                .populate('album', '_id spotifyId name images release_date release_date_precision')
                .lean();

            if (!tracks || tracks.length === 0) {
                return notFoundResponse(res, 'No tracks found');
            }

            return okResponse(
                res,
                'Tracks retrieved successfully',
                formatItems(tracks, ['name', '_id', 'artists', 'album']),
            );
        } catch (error) {
            console.error(error);
            return serverErrorResponse(res, 'Failed to get tracks');
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
