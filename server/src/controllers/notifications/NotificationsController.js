import { getNotifications } from '../../services/notifications/getNotifications.js';
import { okResponse, serverErrorResponse } from '../../utils/responseHelper.js';

class NotificationsController {
    async getNotifications(req, res) {
        try {
            const userId = req.user._id;
            const notifications = await getNotifications({ userId });

            return okResponse(res, 'Notifications retrieved successfully', notifications);
        } catch (error) {
            console.error('Error getting notifications:', error);
            return serverErrorResponse(res, MESSAGE_RESPONSE.SERVER_ERROR);
        }
    }
}

export default new NotificationsController();
