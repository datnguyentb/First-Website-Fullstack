// models/AdminRecommendPlaylist.js
import mongoose from 'mongoose';

const AdminRecommendPlaylistSchema = new mongoose.Schema(
    {
        playlistId: {
            type: String, // có thể là _id playlist trong DB hoặc ID Spotify
            trim: true,
            required: true,
        },
        type: {
            type: String,
            enum: ['unknown', 'pop', 'k-pop', 'us-uk', 'rock', 'piano'],
            default: 'unknown',
        },
        priority: {
            type: Number,
            default: 0, // số lớn hơn => ưu tiên cao hơn
        },
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active',
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // admin tạo đề xuất
            required: true,
        },
    },
    {
        timestamps: true, // tự thêm createdAt & updatedAt
    },
);

export default mongoose.model('AdminRecommendPlaylist', AdminRecommendPlaylistSchema);
