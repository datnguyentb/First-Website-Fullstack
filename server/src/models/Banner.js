import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        imageUrl: {
            url: {
                type: String,
                required: true,
                trim: true,
            },
            public_id: {
                type: String,
                default: null,
                trim: true,
            },
        },
        link: {
            type: String,
            trim: true,
            default: '',
        },
        type: {
            type: String,
            enum: ['normal', 'auth'],
            default: 'normal',
        },
        isActive: {
            type: Boolean,
            default: false,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Banner', bannerSchema);
