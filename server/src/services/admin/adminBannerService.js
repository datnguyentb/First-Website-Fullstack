import Banner from '../../models/Banner.js';
import { badRequestResponse, notFoundResponse } from '../../utils/responseHelper.js';

const createBanner = async (data) => {
    try {
        const { title, imageUrl, link, type } = data;

        const newBanner = new Banner({
            title,
            imageUrl,
            link: link || '',
            type,
        });

        return await newBanner.save();
    } catch (error) {
        throw new Error(error.message || 'Lỗi khi tạo mới banner tại Service');
    }
};

const updateBanner = async (data) => {
    try {
        const { _id, title, imageUrl, link } = data;

        const updatedBanner = await Banner.findByIdAndUpdate(
            _id,
            { title, imageUrl, link: link || '' },
            {
                new: true,
                runValidators: true,
                select: '-isDeleted', // 🌟 Thêm dòng này để loại bỏ trường isDeleted khỏi kết quả trả về
            },
        );

        if (!updatedBanner) {
            throw new Error('Không tìm thấy Banner với ID được cung cấp');
        }

        return updatedBanner;
    } catch (error) {
        throw new Error(error.message || 'Lỗi khi cập nhật banner tại Service');
    }
};

const getAllBanners = async () => {
    try {
        return await Banner.find({ isDeleted: false }).select('-isDeleted -__v').sort({ createdAt: -1 });
    } catch (error) {
        throw new Error(error.message || 'Failed to load banners');
    }
};

const deleteBanner = async (id, res) => {
    try {
        // Find banner by id and update isDeleted field to true
        const deletedBanner = await Banner.findByIdAndUpdate(id, { isDeleted: true }, { new: true });

        if (!deletedBanner) {
            return notFoundResponse(res, '');
        }

        return deletedBanner;
    } catch (error) {
        throw new Error(error.message || 'Failed to delete banner');
    }
};

const toggleStatus = async (id) => {
    try {
        const banner = await Banner.findById(id);

        if (!banner) {
            throw new Error('Không tìm thấy Banner với ID được cung cấp');
        }

        // 2. Đảo ngược trạng thái isActive và lưu lại
        banner.isActive = !banner.isActive;
        await banner.save();

        // 3. Chuyển thành object và loại bỏ trường isDeleted trước khi trả về
        const bannerObject = banner.toObject();
        delete bannerObject.isDeleted;

        return bannerObject;
    } catch (error) {
        throw new Error(error.message || 'Something went wrong');
    }
};

export default { createBanner, getAllBanners, updateBanner, deleteBanner, toggleStatus };
