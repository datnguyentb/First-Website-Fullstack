import { MESSAGE_RESPONSE } from '../../constants/index.js';
import adminBannerService from '../../services/admin/adminBannerService.js';
import { okResponse, serverErrorResponse, badRequestResponse } from '../../utils/responseHelper.js';

class AdminBannerController {
    // Create Banner
    createBanner = async (req, res) => {
        try {
            const { title, link, imageUrl, type } = req.body;
            const data = {
                title,
                link,
                imageUrl: imageUrl || `/uploads/banners/${req?.file?.filename}`,
                type,
            };

            console.log(data);

            if (!data.title || !data.link || !data.imageUrl || (data.type !== 'normal' && data.type !== 'auth'))
                return badRequestResponse(res, MESSAGE_RESPONSE.BANNER.EMPTY_CONTENT);

            const newBanner = await adminBannerService.createBanner(data);
            return okResponse(res, MESSAGE_RESPONSE.BANNER.CREATE_SUCCESS, newBanner);
        } catch (error) {
            console.log(error);
            return serverErrorResponse(res, error.message);
        }
    };

    //Update Banner
    updateBanner = async (req, res) => {
        try {
            const { title, link, imageUrl, _id, type } = req.body;
            const data = {
                _id,
                title,
                link,
                imageUrl: imageUrl || `/uploads/banners/${req?.file?.filename}`,
                type,
            };

            if (
                !data.title ||
                !data.link ||
                !data.imageUrl ||
                !data._id ||
                (data.type !== 'normal' && data.type !== 'auth')
            ) {
                console.log('update banner running', data);
                return badRequestResponse(res, MESSAGE_RESPONSE.BANNER.EMPTY_CONTENT);
            }

            const updateBanner = await adminBannerService.updateBanner(data);
            return okResponse(res, MESSAGE_RESPONSE.BANNER.UPDATE_SUCCESS, updateBanner);
        } catch (error) {
            console.log(error);
            return serverErrorResponse(res, error.message);
        }
    };

    //GetAll Banner
    getAllBanners = async (req, res) => {
        try {
            // Gọi service để lấy danh sách tất cả banner từ database
            const banners = await adminBannerService.getAllBanners();

            // Trả về response thành công kèm theo dữ liệu banners
            return okResponse(res, MESSAGE_RESPONSE.BANNER.GET_SUCCESS || 'Lấy danh sách banner thành công', banners);
        } catch (error) {
            // Log lỗi ra console để debug khi cần
            console.log(error);
            // Trả về response lỗi server 500
            return serverErrorResponse(res, error.message);
        }
    };

    //delete Banner
    deleteBanner = async (req, res) => {
        const { id } = req.params;

        try {
            if (!id) return badRequestResponse(res, MESSAGE_RESPONSE.BANNER.ID_REQUIRED);
            await adminBannerService.deleteBanner(id, res);
            return okResponse(res, MESSAGE_RESPONSE.BANNER.DELETE_SUCCESS);
        } catch (error) {
            console.log(error);
            return serverErrorResponse(res, error.message);
        }
    };

    //toggle Status
    toggleStatus = async (req, res) => {
        const { id } = req.params;
        try {
            if (!id) return badRequestResponse(res, MESSAGE_RESPONSE.BANNER.ID_REQUIRED);
            const updatebanner = await adminBannerService.toggleStatus(id);
            return okResponse(res, MESSAGE_RESPONSE.BANNER.UPDATE_SUCCESS, updatebanner);
        } catch (error) {
            console.log(error);
            return serverErrorResponse(res, error.message);
        }
    };
}

export default new AdminBannerController();
