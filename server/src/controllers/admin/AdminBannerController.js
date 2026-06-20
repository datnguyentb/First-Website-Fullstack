import { MESSAGE_RESPONSE } from '../../constants/index.js';
import adminBannerService from '../../services/admin/adminBannerService.js';
import { okResponse, serverErrorResponse, badRequestResponse } from '../../utils/responseHelper.js';

class AdminBannerController {
    createBanner = async (req, res) => {
        try {
            const { title, link, imageUrl } = req.body;
            const data = {
                title,
                link,
                imageUrl: imageUrl || `/uploads/banners/${req?.file?.filename}`,
            };

            console.log(data);

            if (!data.title || !data.link || !data.imageUrl)
                return badRequestResponse(res, MESSAGE_RESPONSE.BANNER.EMPTY_CONTENT);

            const newBanner = await adminBannerService.createBanner(data);
            return okResponse(res, MESSAGE_RESPONSE.BANNER.CREATE_SUCCESS, newBanner);
        } catch (error) {
            console.log(error);
            return serverErrorResponse(res, error.message);
        }
    };

    updateBanner = async (req, res) => {
        console.log(req.files);
    };
}

export default new AdminBannerController();
