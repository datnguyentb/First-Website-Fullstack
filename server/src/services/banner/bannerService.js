import Banner from '../../models/Banner.js';

const getHomeBanners = async () => {
    try {
        return await Banner.find({
            isDeleted: false,
            isActive: true,
            type: 'normal',
        })
            .select('-isDeleted -__v -createdAt -updatedAt -isActive') //
            .sort({ createdAt: -1 });
    } catch (error) {
        throw new Error(error.message || 'Failed to load banners');
    }
};

const getAuthBanners = async () => {
    try {
        return await Banner.find({
            isDeleted: false,
            isActive: true,
            type: 'auth',
        })
            .select('-isDeleted -__v -createdAt -updatedAt -isActive') //
            .sort({ createdAt: -1 });
    } catch (error) {
        throw new Error(error.message || 'Failed to load banners');
    }
};

export default { getHomeBanners, getAuthBanners };
