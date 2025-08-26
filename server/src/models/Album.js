import mongoose from 'mongoose';

const AlbumSchema = new mongoose.Schema(
    {
        spotifyId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        images: [
            {
                url: { type: String, required: true, trim: true },
                height: { type: Number },
                width: { type: Number },
            },
        ],
        type: {
            type: String,
            enum: ['album'],
            default: 'album',
        },
        release_date: {
            type: String, // Spotify trả date dạng string (YYYY / YYYY-MM / YYYY-MM-DD)
            required: true,
        },
        release_date_precision: {
            type: String,
            enum: ['year', 'month', 'day'],
            required: true,
        },
        artists: [
            {
                id: { type: String, required: true, trim: true },
                name: { type: String, required: true, trim: true },
            },
        ],
    },
    { timestamps: true },
);

export default mongoose.model('Album', AlbumSchema);
