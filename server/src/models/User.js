import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// 🧩 Định nghĩa schema cho người dùng
const userSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 255,
        },
        last_name: {
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
        password: {
            type: String,
            required: true,
            minlength: 6,
            maxlength: 255,
        },
        isActive: { type: Boolean, default: false },
        status: {
            type: String,
            enum: ['active', 'locked'],
            default: 'active',
        },
        lockReason: {
            type: String,
            default: '',
        },
        lockedAt: {
            type: Date,
        },
        lockHistory: [
            {
                reason: String,
                lockedAt: Date,
                unlockedAt: Date,
            },
        ],
        birthdate: { type: Date, default: null },
        avatar_url: { type: String, default: '' },
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

// 🔐 So sánh mật khẩu (dùng khi đăng nhập)
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

// ✅ Xuất model
export default mongoose.model('User', userSchema);
