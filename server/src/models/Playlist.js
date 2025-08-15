import mongoose from 'mongoose';

const playlistSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            default: '',
        },
        type: {
            type: String,
            enum: ['', 'hot', 'new', 'uk', 'pop', 'kpop'],
            default: '',
        },
        tracks: [
            {
                trackId: {
                    type: String, // ID bài hát trên Spotify
                    required: true,
                },
                addedAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        isPublic: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
);

export default mongoose.model('Playlist', playlistSchema);
