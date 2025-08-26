import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// Định nghĩa Schema cho lịch sử nghe nhạc
const ListeningHistorySchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        song: {
            type: Schema.Types.ObjectId,
            ref: 'Song',
            required: true,
        },
        playedAt: {
            type: Date,
            default: Date.now,
        },
        progress: {
            type: Number, // thời điểm đã nghe (giây)
        },
        completed: {
            type: Boolean, // true nếu nghe gần hết
        },
        device: {
            type: String, // web, mobile, desktop...
        },
        action: {
            type: String,
            enum: ['play', 'pause', 'skip', 'finish'],
            default: 'play',
        },
    },
    {
        timestamps: true, // tự động thêm createdAt, updatedAt
    },
);

export default mongoose.model('ListeningHistory', ListeningHistorySchema);
