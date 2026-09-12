import { MESSAGE_RESPONSE } from '../../constants/index.js';
import adminBannerService from '../../services/admin/adminBannerService.js';
import { okResponse, serverErrorResponse, badRequestResponse } from '../../utils/responseHelper.js';

class AdminBannerController {
    // Create Banner
    createBanner = async (req, res) => {
        try {
            const { title, link, imageUrl: bodyImageUrl, type } = req.body;

            // Chuẩn hóa thành object có cả url và public_id
            const imageUrl = req.file
                ? {
                      url: req.file.url,
                      public_id: req.file.public_id,
                  }
                : {
                      url: bodyImageUrl,
                      public_id: null,
                  };

            const data = {
                title,
                link,
                imageUrl,
                type,
            };

            // Kiểm tra data.imageUrl.url vì imageUrl lúc này là một object
            if (!data.title || !data.link || !data.imageUrl.url || (data.type !== 'normal' && data.type !== 'auth'))
                return badRequestResponse(res, MESSAGE_RESPONSE.BANNER.EMPTY_CONTENT);

            const newBanner = await adminBannerService.createBanner(data);
            return okResponse(res, MESSAGE_RESPONSE.BANNER.CREATE_SUCCESS, newBanner);
        } catch (error) {
            console.log(error);
            return serverErrorResponse(res, error.message);
        }
    };

    updateBanner = async (req, res) => {
        try {
            const { title, link, imageUrl: bodyImageUrl, _id, type } = req.body;

            const existingBanner = (await adminBannerService.getBannerById)
                ? await adminBannerService.getBannerById(_id)
                : null;

            let imageUrl;
            let isNewImageProvided = false;

            if (req.file) {
                imageUrl = {
                    url: req.file.url,
                    public_id: req.file.public_id,
                };
                isNewImageProvided = true;
            } else if (bodyImageUrl) {
                // Kiểm tra xem URL người dùng gửi lên có khác với URL cũ không
                if (bodyImageUrl !== existingBanner?.imageUrl?.url) {
                    isNewImageProvided = true;
                }
                imageUrl = {
                    url: bodyImageUrl,
                    // Nếu giữ nguyên URL cũ thì giữ lại luôn public_id cũ, ngược lại gán bằng null
                    public_id:
                        bodyImageUrl === existingBanner?.imageUrl?.url ? existingBanner?.imageUrl?.public_id : null,
                };
            } else {
                imageUrl = existingBanner?.imageUrl;
            }

            const data = {
                _id,
                title: title || existingBanner?.title,
                link: link || existingBanner?.link,
                imageUrl,
                type: type || existingBanner?.type,
            };

            if (
                !data.title ||
                !data.link ||
                !data.imageUrl ||
                !data.imageUrl.url ||
                !data._id ||
                (data.type !== 'normal' && data.type !== 'auth')
            ) {
                console.log('update banner running', data);
                return badRequestResponse(res, MESSAGE_RESPONSE.BANNER.EMPTY_CONTENT);
            }

            // Chỉ xóa ảnh cũ trên Cloudinary khi thực sự có ảnh mới được thay thế
            if (isNewImageProvided) {
                const oldPublicId = existingBanner?.imageUrl?.public_id;
                if (oldPublicId) {
                    await cloudinary.uploader.destroy(oldPublicId);
                }
            }

            const updatedBanner = await adminBannerService.updateBanner(data);
            return okResponse(res, MESSAGE_RESPONSE.BANNER.UPDATE_SUCCESS, updatedBanner);
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
