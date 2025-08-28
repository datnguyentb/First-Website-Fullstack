// controllers/music/spotifyController.js
import { okResponse, notFoundResponse, badRequestResponse, serverErrorResponse } from '../../utils/responseHelper.js';
import Song from '../../models/Song.js';
import ListeningHistory from '../../models/ListeningHistory.js';
import { formatItems, formatItem } from '../../utils/formatter.js';

class MusicPlayerController {
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
    addTrackToListeningHistory = async (req, res) => {
        const { trackId } = req.params;
        const userId = req.user._id;

        if (!trackId) {
            return badRequestResponse(res, 'Track ID is required');
        }

        try {
            const track = await Song.findById(trackId);

            if (!track || !track.isReady) {
                return notFoundResponse(res, 'Track not found');
            }

            // Tăng số lần nghe của bài hát
            track.listenCount += 1;
            await track.save();

            // 📌 Kiểm tra history có sẵn không
            const history = await ListeningHistory.findOne({
                user: userId,
                song: trackId,
            });

            if (history) {
                history.playedAt = Date.now();
                await history.save();
            } else {
                await ListeningHistory.create({
                    user: userId,
                    song: trackId,
                    playedAt: Date.now(),
                    action: 'play',
                });
            }

            return okResponse(res);
        } catch (error) {
            console.error(error);
            return serverErrorResponse(res, 'Failed to add track to listening history');
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

    getListeningHistory = async (req, res) => {
        const userId = req.user._id;

        try {
            const history = await ListeningHistory.find({ user: userId })
                .populate({
                    path: 'song',
                    select: '_id name artists album',
                    match: { isReady: true },
                    populate: {
                        path: 'album',
                        select: '_id spotifyId name images',
                    },
                })
                .sort({ playedAt: -1 })
                .limit(15)
                .lean();

            let songsOnly = [];
            if (history && history.length > 0) {
                songsOnly = history.map((item) => item.song).filter((song) => song !== null);
            } else {
                songsOnly = await Song.findOne({ type: 'track', isReady: true })
                    .sort({ listenCount: -1 })
                    .populate('album', '_id spotifyId name images release_date release_date_precision')
                    .lean();
            }
            return okResponse(res, 'successfully', formatItems(songsOnly, ['_id', 'name', 'artists', 'album']));
        } catch (error) {
            console.error(error);
            return serverErrorResponse(res, 'Failed to get listening history');
        }
    };
}

export default new MusicPlayerController();
