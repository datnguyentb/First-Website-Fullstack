import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import mongooseDelete from 'mongoose-delete';
import { nanoid } from 'nanoid'; // ✅ Thêm import nanoid

const RoomSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        slug: { type: String, unique: true }, // ✅ Bỏ required: true vì pre-save mới bắt đầu sinh ra chuỗi này
        hostId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

        roomMode: {
            type: String,
            enum: ['public', 'private'],
            default: 'public',
        },
        playbackMode: {
            type: String,
            enum: ['radio', 'party'],
            default: 'radio',
        },
        password: { type: String, default: null },

        currentTrack: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Song',
            default: null,
        },
        isPlaying: {
            type: Boolean,
            default: false,
        },
        currentTime: {
            type: Number,
            default: 0,
        },

        queue: [
            {
                song: { type: mongoose.Schema.Types.ObjectId, ref: 'Song', required: true },
                addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
                addedAt: { type: Date, default: Date.now },
            },
        ],

        isActive: { type: Boolean, default: true },
    },
    {
        timestamps: true,
    },
);

// ✅ GỘP CHUNG HOOKS: Xử lý cả Slug và Password trước khi lưu để tối ưu hiệu năng
RoomSchema.pre('save', async function (next) {
    const room = this;

    // 1. Chỉ sinh slug khi tạo phòng mới tinh
    if (room.isNew) {
        let isUnique = false;
        let generatedSlug = '';

        while (!isUnique) {
            generatedSlug = `${nanoid(3)}-${nanoid(3)}-${nanoid(3)}`.toLowerCase();
            const existingRoom = await mongoose.models.Room.findOne({ slug: generatedSlug });
            if (!existingRoom) {
                isUnique = true;
            }
        }
        room.slug = generatedSlug;
    }

    // 2. Chỉ mã hóa mật khẩu nếu trường password có thay đổi hoặc có dữ liệu mới
    if (room.isModified('password') && room.password) {
        try {
            const salt = await bcrypt.genSalt(10);
            room.password = await bcrypt.hash(room.password, salt);
        } catch (err) {
            return next(err);
        }
    }

    next();
});

// 🔐 So sánh mật khẩu (Hàm này bạn viết chuẩn rồi)
RoomSchema.methods.comparePassword = async function (candidatePassword) {
    if (!this.password) return false;
    return await bcrypt.compare(candidatePassword, this.password);
};

// 🚫 Ẩn mật khẩu khi chuyển kết quả sang JSON hoặc Object (Bổ sung toObject)
const transformConfig = {
    transform: (doc, ret) => {
        delete ret.password;
        return ret;
    },
};
RoomSchema.set('toJSON', transformConfig);
RoomSchema.set('toObject', transformConfig);

// Tạo index hỗ trợ tìm kiếm slug thần tốc
RoomSchema.index({ slug: 1 });

// Kích hoạt plugin xóa mềm nếu bạn cần dùng
RoomSchema.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true });

export const RoomModel = mongoose.model('Room', RoomSchema);
