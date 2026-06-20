import Banner from '../../models/Banner.js';
import { badRequestResponse } from '../../utils/responseHelper.js';

const createBanner = async (data) => {
    try {
        const { title, imageUrl, link } = data;

        const newBanner = new Banner({
            title,
            imageUrl,
            link: link || '',
        });

        return await newBanner.save();
    } catch (error) {
        throw new Error(error.message || 'Lỗi khi tạo mới banner tại Service');
    }
};

const updateBanner = async (id, data) => {
    try {
        const { title, imageUrl, link } = data;

        const updatedBanner = await Banner.findByIdAndUpdate(
            id,
            { title, imageUrl, link: link || '' },
            { new: true, runValidators: true }, // Trả về bản ghi mới sau khi sửa và kiểm tra Schema
        );

        if (!updatedBanner) {
            throw new Error('Không tìm thấy Banner với ID được cung cấp');
        }

        return updatedBanner;
    } catch (error) {
        throw new Error(error.message || 'Lỗi khi cập nhật banner tại Service');
    }
};

const getBanners = async () => {
    try {
        return await Banner.find().sort({ createdAt: -1 });
    } catch (error) {
        throw new Error(error.message || 'Không thể lấy danh sách banner');
    }
};

export default { createBanner, getBanners, updateBanner };
