import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true, trim: true, min: 2, max: 255 },
    last_name: { type: String, required: true, trim: true, min: 2, max: 255 },
    email: { type: String, required: true, lowercase: true, trim: true, unique: true, min: 6, max: 255 },
    password: { type: String, required: true, min: 6, max: 255 },
    isActive: { type: Boolean, default: false },
    birthdate: { type: Date, default: null },
    avatar_src: { type: String, default: '' },
    gender: { type: String, enum: ['male', 'female', 'other'] },
    location: { type: String, default: '' },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    bio: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
});

// 👉 Mã hóa mật khẩu trước khi save
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

// 👉 So sánh mật khẩu (dùng khi login)
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// 👉 Đảm bảo email là duy nhất
userSchema.index({ email: 1 }, { unique: true });

export default mongoose.model('User', userSchema);
