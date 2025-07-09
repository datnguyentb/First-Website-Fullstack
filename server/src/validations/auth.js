import Joi from 'joi';

export const registerValidator = (data) => {
    const rule = Joi.object({
        first_name: Joi.string().min(2).max(225).trim().required(),
        last_name: Joi.string().min(2).max(225).trim().required(),
        email: Joi.string().min(6).max(225).required().trim().email().messages({
            'string.email': 'Email không đúng định dạng',
            'any.required': 'Email là bắt buộc',
        }),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,20}$')).required().messages({
            'string.pattern.base': 'Mật khẩu phải từ 6-20 ký tự, không có ký tự đặc biệt',
            'any.required': 'Mật khẩu là bắt buộc',
        }),
        confirm_password: Joi.any().valid(Joi.ref('password')).required().messages({
            'any.only': 'Xác nhận mật khẩu không khớp',
            'any.required': 'Vui lòng nhập xác nhận mật khẩu',
        }),
    });

    return rule.validate(data, { abortEarly: false }); // validate toàn bộ, không dừng ở lỗi đầu
};

export const loginValidator = (data) => {
    const rule = Joi.object({
        email: Joi.string().min(6).max(225).required().trim().email().messages({
            'string.email': 'Email không đúng định dạng',
            'any.required': 'Email là bắt buộc',
        }),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,20}$')).required().messages({
            'string.pattern.base': 'Mật khẩu phải từ 6-20 ký tự, không có ký tự đặc biệt',
            'any.required': 'Mật khẩu là bắt buộc',
        }),
    });

    return rule.validate(data, { abortEarly: false });
};
