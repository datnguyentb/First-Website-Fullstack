// controllers/music/spotifyController.js
import { okResponse, serverErrorResponse } from '../../utils/responseHelper.js';
import Song from '../../models/Song.js';
import { formatItems } from '../../utils/formatter.js';
import Fuse from 'fuse.js';

class searchController {
    searchTracks = async (req, res) => {
        try {
            const q = req.params.q;
            const maxLimit = 15;
            const limit = Math.min(req.query.limit || 10, maxLimit);

            // Lấy tất cả bài hát + populate album
            const allTracks = await Song.find({ isReady: true }, 'name artists album').populate(
                'album',
                'name images artists',
            );

            // Cấu hình fuzzy search
            const fuse = new Fuse(allTracks, {
                keys: ['name', 'artists.name'],
                threshold: 0.4,
            });

            // Thực hiện search
            const result = fuse
                .search(q)
                .slice(0, limit)
                .map((r) => r.item);

            // formatItems có thể giữ nguyên, vì album giờ đã là object thay vì chỉ _id
            const formatted = formatItems(result, ['name', '_id', 'artists', 'album']);

            return okResponse(res, 'Search results', {
                tracks: {
                    items: formatted,
                },
            });
        } catch (err) {
            return serverErrorResponse(res, 'Failed to search tracks');
        }
    };
}

export default new searchController();
