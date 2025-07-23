import { success as successResponse } from '../utils/response.js';

class SiteController {
    index(req, res) {
        return successResponse(res, 'Đăng nhập thành công', {
            token: 'abc.def.ghi',
        });
    }

    redirectHome(req, res) {
        res.redirect(process.env.FRONTEND_URL);
    }
}

export default new SiteController();
