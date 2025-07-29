import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { fileTypeFromFile } from 'file-type';
import { badRequestResponse, serverErrorResponse } from '../utils/responseHelper.js'; // ✅ dùng helper chuẩn hóa

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function createStorage(subfolder) {
    const dir = path.join(__dirname, `../uploads/${subfolder}`);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    return multer.diskStorage({
        destination: (req, file, cb) => cb(null, dir),
        filename: (req, file, cb) => {
            const name = Date.now() + '-' + Math.round(Math.random() * 1e9) + `.tmp`;
            cb(null, name);
        },
    });
}

function createSecureUploader(subfolder, maxCount = 1) {
    const storage = createStorage(subfolder);
    const multerUpload = multer({
        storage,
        limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    });

    return (fieldName) => async (req, res, next) => {
        const upload = maxCount === 1 ? multerUpload.single(fieldName) : multerUpload.array(fieldName, maxCount);

        upload(req, res, async (err) => {
            if (err) {
                if (err.code === 'LIMIT_FILE_SIZE') {
                    return badRequestResponse(res, 'File size should not exceed 5MB');
                }
                return badRequestResponse(res, err.message || 'Upload failed');
            }

            const files = maxCount === 1 ? (req.file ? [req.file] : []) : req.files;
            if (!files || files.length === 0 || (files.length === 1 && !files[0])) {
                return next(); // No file uploaded, skip
            }

            const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

            try {
                for (const file of files) {
                    const type = await fileTypeFromFile(file.path);
                    if (!type || !allowedTypes.includes(type.mime)) {
                        fs.unlinkSync(file.path); // Xóa file không hợp lệ
                        return badRequestResponse(res, 'Only JPEG, PNG, and WEBP images under 5MB are allowed.');
                    }

                    const correctExt = '.' + type.ext;
                    const currentExt = path.extname(file.filename);

                    if (correctExt !== currentExt) {
                        const newFilename = file.filename.replace(currentExt, correctExt);
                        const newPath = path.join(path.dirname(file.path), newFilename);

                        fs.renameSync(file.path, newPath);
                        file.filename = newFilename;
                        file.path = newPath;
                    }
                }

                next(); // Tất cả file đều hợp lệ
            } catch (error) {
                return serverErrorResponse(res, 'File verification failed');
            }
        });
    };
}

// ✅ Xuất ra middleware cụ thể
export const uploadAvatar = createSecureUploader('avatars', 1);
export const uploadPostImage = createSecureUploader('posts', 5);
