import { ALLOWED_FIELDS } from '../config/ALLOWED_FIELDS.js';
import { badRequestResponse } from '../utils/responseHelper.js';

/**
 * Danh sách các trường cần ép kiểu về Date
 * Việc tách riêng thế này giúp bạn dễ bảo trì hơn là viết cứng trong vòng lặp
 */
const DATE_FIELDS = ['birthdate', 'createdAt', 'updatedAt'];

export const filterAllowedFields = (type) => {
    return (req, res, next) => {
        const allowed = ALLOWED_FIELDS[type];

        if (!allowed) {
            return next();
        }

        const filtered = {};

        // 1. Lọc và Format dữ liệu
        for (const field of allowed) {
            let value = req.body[field];

            if (value !== undefined) {
                // Xử lý format Date tự động cho các trường trong danh sách
                if (DATE_FIELDS.includes(field) && value !== '') {
                    const parsedDate = new Date(value);
                    if (!isNaN(parsedDate.getTime())) {
                        value = parsedDate;
                    }
                }

                filtered[field] = value;
            }
        }

        // 2. Logic kiểm tra tính hợp lệ (Validation)
        const hasFirstName = !!filtered.firstName?.trim();
        const hasLastName = !!filtered.lastName?.trim();

        if (!hasFirstName && !hasLastName) {
            return badRequestResponse(res, 'Please provide at least First Name or Last Name.');
        }

        // 3. Gán kết quả và tiếp tục
        req.filteredBody = filtered;
        next();
    };
};
