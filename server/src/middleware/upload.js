import multer from 'multer';
import { fileTypeFromBuffer } from 'file-type';
import { v2 as cloudinary } from 'cloudinary';
import { badRequestResponse, serverErrorResponse } from '../utils/responseHelper.js';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 500 * 1024 * 1024 },
});

const uploadToCloudinary = (buffer, folder) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: `my_app/${folder}`,
                resource_type: 'auto',
                // --- THÊM CÁC THAM SỐ TỐI ƯU Ở ĐÂY ---
                transformation: [
                    { quality: 'auto', fetch_format: 'auto' },
                    { width: 1200, crop: 'limit' },
                ],
            },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            },
        );
        stream.end(buffer);
    });
};

function createCloudUploader(subfolder, maxCount = 1, allowedTypes = [], maxSizeMB = 10) {
    return (fieldName) => async (req, res, next) => {
        const multerMiddleware = maxCount === 1 ? upload.single(fieldName) : upload.array(fieldName, maxCount);

        multerMiddleware(req, res, async (err) => {
            if (err) {
                if (err.code === 'LIMIT_FILE_SIZE') {
                    return badRequestResponse(res, `File size should not exceed ${maxSizeMB}MB`);
                }
                return badRequestResponse(res, err.message || 'Upload failed');
            }

            const files = maxCount === 1 ? (req.file ? [req.file] : []) : req.files;
            if (!files || files.length === 0) return next();

            try {
                req.uploadedFiles = [];

                for (const file of files) {
                    const type = await fileTypeFromBuffer(file.buffer);
                    if (!type || !allowedTypes.includes(type.mime)) {
                        return badRequestResponse(res, 'Invalid file type format detected.');
                    }

                    const uploadResult = await uploadToCloudinary(file.buffer, subfolder);
                    req.uploadedFiles.push({
                        url: uploadResult.secure_url,
                        public_id: uploadResult.public_id,
                        format: uploadResult.format,
                        resource_type: uploadResult.resource_type,
                    });
                }

                if (maxCount === 1) {
                    req.file = req.uploadedFiles[0];
                } else {
                    req.files = req.uploadedFiles;
                }

                next();
            } catch (error) {
                return serverErrorResponse(res, 'Cloud upload processing failed');
            }
        });
    };
}

const imageTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/svg+xml',
    'image/avif',
    'image/heic',
    'image/heif',
];
const audioTypes = ['audio/mpeg', 'audio/wav', 'audio/x-wav', 'audio/flac', 'audio/x-flac', 'audio/aac', 'audio/mp4'];

export const uploadAvatar = createCloudUploader('avatar', 1, imageTypes, 5);
export const uploadBannerImage = createCloudUploader('file', 1, imageTypes, 5);
export const uploadPostImage = createCloudUploader('posts', 5, imageTypes, 10);
export const uploadAudio = createCloudUploader('audios', 1, audioTypes, 20);
export const uploadPlaylistAvatar = createCloudUploader('playlist-avatars', 1, imageTypes, 5);
