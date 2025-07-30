import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import mongooseDelete from 'mongoose-delete';

// 🧩 Định nghĩa schema cho người dùng
const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 255,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 255,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            minlength: 6,
            maxlength: 255,
        },
        phone: {
            type: String,
            default: '',
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
            maxlength: 255,
        },
        isActive: { type: Boolean, default: false },
        locked: {
            type: String,
            enum: ['active', 'locked'],
            default: 'active',
        },
        lockedAt: { type: Date },
        lockReason: { type: String, default: '' },
        lockHistory: [
            {
                reason: String,
                lockedAt: Date,
                unlockedAt: Date,
            },
        ],
        pinnedPosts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Post',
            },
        ],
        birthdate: { type: Date, default: new Date('2000-01-01') },
        avatarUrl: { type: String, default: '' },
        gender: {
            type: String,
            enum: ['male', 'female', 'other'],
            default: 'other',
        },
        location: { type: String, default: '' },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        bio: { type: String, default: '' },
        followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],
        following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],
        friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],
    },
    {
        timestamps: true,
    },
);

// Kích hoạt plugin
userSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

// 🔐 Mã hóa mật khẩu trước khi lưu
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// 🔐 So sánh mật khẩu
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// 📌 Đảm bảo email là duy nhất
userSchema.index({ email: 1 }, { unique: true });

// 🚫 Ẩn mật khẩu khi chuyển user thành JSON
userSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.password;
        return ret;
    },
});

export default mongoose.model('User', userSchema);
