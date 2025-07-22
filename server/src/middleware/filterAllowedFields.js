import { ALLOWED_FIELDS } from '../config/ALLOWED_FIELDS.js';

export const filterAllowedFields = (type) => {
    return (req, res, next) => {
        const allowed = ALLOWED_FIELDS[type];
        const filtered = {};

        for (const field of allowed) {
            const value = req.body[field];
            // Chấp nhận giá trị rỗng (''), chỉ bỏ qua undefined
            if (value !== undefined) {
                filtered[field] = value;
            }
        }

        // Kiểm tra riêng cho firstName và lastName
        const isFirstNameEmpty = !filtered.firstName?.trim();
        const isLastNameEmpty = !filtered.lastName?.trim();

        if (isFirstNameEmpty && isLastNameEmpty) {
            return res.status(400).json({ message: 'Vui lòng nhập ít nhất Họ hoặc Tên.' });
        }

        req.filteredBody = filtered;
        next();
    };
};
