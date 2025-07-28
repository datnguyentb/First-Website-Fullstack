import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { fileTypeFromFile } from 'file-type';

// Lấy __dirname trong ES module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * ✅ Tạo storage multer lưu file vào thư mục uploads/<subfolder>
 */
function createStorage(subfolder) {
    const dir = path.join(__dirname, `../uploads/${subfolder}`); // Tạo đường dẫn thư mục upload

    // Nếu thư mục chưa tồn tại thì tạo mới
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    return multer.diskStorage({
        // ✅ Thiết lập nơi lưu ảnh
        destination: (req, file, cb) => cb(null, dir),

        // ✅ Đặt tên file ban đầu: dùng đuôi .tmp để chưa tin tưởng định dạng
        filename: (req, file, cb) => {
            const name = Date.now() + '-' + Math.round(Math.random() * 1e9) + `.tmp`;
            cb(null, name); // ví dụ: 17234523123-983274321.tmp
        },
    });
}

/**
 * ✅ Tạo middleware upload + kiểm MIME + sửa lại đuôi file đúng
 * @param {string} subfolder - tên thư mục uploads
 * @param {number} maxCount - số lượng tối đa ảnh cho phép upload (1 hoặc nhiều)
 */
function createSecureUploader(subfolder, maxCount = 1) {
    const storage = createStorage(subfolder); // Dùng storage tạo ở trên

    const multerUpload = multer({
        storage,
        limits: { fileSize: 5 * 1024 * 1024 }, // Giới hạn: mỗi file max 5MB
    });

    // Trả về middleware Express dùng upload
    return (fieldName) => async (req, res, next) => {
        // Chọn middleware: upload 1 file hoặc nhiều file
        const upload = maxCount === 1 ? multerUpload.single(fieldName) : multerUpload.array(fieldName, maxCount);

        // Thực hiện upload
        upload(req, res, async (err) => {
            if (err) return res.status(400).json({ error: err.message });

            // Lấy danh sách file
            const files = maxCount === 1 ? (req.file ? [req.file] : []) : req.files;

            if (!files || files.length === 0 || (files.length === 1 && !files[0])) {
                return next();
            }

            const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']; // MIME hợp lệ

            try {
                // ✅ Duyệt từng file để kiểm tra MIME và sửa lại đuôi đúng
                for (const file of files) {
                    const type = await fileTypeFromFile(file.path); // Kiểm MIME thực sự từ nội dung file

                    // ❌ MIME không đúng hoặc không phải ảnh
                    if (!type || !allowedTypes.includes(type.mime)) {
                        fs.unlinkSync(file.path); // Xoá file
                        return res.status(400).json({ error: `Invalid file: ${file.originalname}` });
                    }

                    // ✅ Nếu đuôi thực tế khác với đuôi tạm (.tmp), thì đổi tên lại
                    const correctExt = '.' + type.ext; // ví dụ ".jpg"
                    const currentExt = path.extname(file.filename); // đuôi hiện tại là ".tmp"

                    if (correctExt !== currentExt) {
                        const newFilename = file.filename.replace(currentExt, correctExt); // đổi ".tmp" → ".jpg"
                        const newPath = path.join(path.dirname(file.path), newFilename);

                        fs.renameSync(file.path, newPath); // đổi tên file thực tế

                        // Cập nhật lại trong req.file
                        file.filename = newFilename;
                        file.path = newPath;
                    }
                }

                next(); // ✅ OK → chuyển tiếp controller
            } catch (error) {
                return res.status(500).json({ error: 'File verification failed' });
            }
        });
    };
}

// 📤 Export các uploader cụ thể để sử dụng trong route
export const uploadAvatar = createSecureUploader('avatars', 1); // Upload 1 ảnh avatar
export const uploadPostImage = createSecureUploader('posts', 5); // Upload tối đa 5 ảnh bài viết
