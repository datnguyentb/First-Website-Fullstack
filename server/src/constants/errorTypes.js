export const ERROR_TYPE = {
    VALIDATION: 'ValidationError', // Dữ liệu đầu vào sai (form, body, query)
    AUTHENTICATION: 'AuthenticationError', // Chưa đăng nhập / token không hợp lệ
    AUTHORIZATION: 'AuthorizationError', // Không có quyền (dù đã login)
    NOT_FOUND: 'NotFoundError', // Tài nguyên không tồn tại (user, post, comment)
    CONFLICT: 'ConflictError', // Trùng lặp (email đã tồn tại, post đã like,...)
    SERVER: 'ServerError', // Lỗi nội bộ phía server
    BAD_REQUEST: 'BadRequestError', // Request thiếu/không hợp lệ (nhưng không phải validate)
    FORBIDDEN: 'ForbiddenError', // Truy cập bị cấm, ví dụ user bị khóa
    TOKEN_EXPIRED: 'TokenExpiredError', // Token đã hết hạn
    UNKNOWN: 'UnknownError', // Lỗi không xác định
};
