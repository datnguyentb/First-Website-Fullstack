import { MESSAGE_RESPONSE } from '../../constants/index.js';
import bannerService from '../../services/banner/bannerService.js';
import { okResponse, serverErrorResponse } from '../../utils/responseHelper.js';

class BannerController {
    //GetAll Banner
    getHomeBanners = async (req, res) => {
        try {
            const banners = await bannerService.getHomeBanners();

            // Trả về response thành công kèm theo dữ liệu banners
            return okResponse(res, MESSAGE_RESPONSE.BANNER.GET_SUCCESS || 'Lấy danh sách banner thành công', banners);
        } catch (error) {
            // Log lỗi ra console để debug khi cần
            console.log(error);
            // Trả về response lỗi server 500
            return serverErrorResponse(res, error.message);
        }
    };

    getAuthBanners = async (req, res) => {
        try {
            const banners = await bannerService.getAuthBanners();

            // Trả về response thành công kèm theo dữ liệu banners
            return okResponse(res, MESSAGE_RESPONSE.BANNER.GET_SUCCESS || 'Lấy danh sách banner thành công', banners);
        } catch (error) {
            // Log lỗi ra console để debug khi cần
            console.log(error);
            // Trả về response lỗi server 500
            return serverErrorResponse(res, error.message);
        }
    };
}

export default new BannerController();
