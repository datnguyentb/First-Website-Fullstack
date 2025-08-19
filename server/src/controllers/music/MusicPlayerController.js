// controllers/music/spotifyController.js
import { okResponse, notFoundResponse, badRequestResponse, serverErrorResponse } from '../../utils/responseHelper.js';
import Songs from '../../models/Songs.js';

class MusicPlayerController {
    getTracksRecomend = async (req, res) => {
        try {
            const tracks = await Songs.aggregate([
                { $match: { type: 'track' } },
                { $sample: { size: 9 } },
                { $project: { spotifyId: 1, _id: 0 } },
            ]);

            // Nếu không có track nào
            if (!tracks || tracks.length === 0) {
                return notFoundResponse(res, 'No tracks found');
            }

            // Trả về thành công
            return okResponse(res, 'Tracks retrieved successfully', tracks);
        } catch (error) {
            console.error(error);
            return serverErrorResponse(res, 'Failed to get tracks');
        }
    };
}

export default new MusicPlayerController();
