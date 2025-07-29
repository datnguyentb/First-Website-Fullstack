export const STATUS_CODE = {
    // ✅ Thành công
    OK: 200, // Yêu cầu thành công, có dữ liệu trả về
    CREATED: 201, // Tạo mới tài nguyên thành công (POST)

    // ⚠️ Lỗi từ phía client
    BAD_REQUEST: 400, // Dữ liệu không hợp lệ (thiếu field, format sai,...)
    UNAUTHORIZED: 401, // Chưa đăng nhập hoặc token không hợp lệ
    FORBIDDEN: 403, // Đã đăng nhập nhưng không có quyền truy cập
    NOT_FOUND: 404, // Không tìm thấy tài nguyên
    CONFLICT: 409, // Xung đột dữ liệu (ví dụ: email đã tồn tại)

    // 🕒 Các lỗi khác phía client
    TOO_MANY_REQUESTS: 429, // Gửi request quá nhiều trong thời gian ngắn (rate limit)

    // ❌ Lỗi từ phía server
    SERVER_ERROR: 500, // Lỗi nội bộ phía server
    NOT_IMPLEMENTED: 501, // API chưa hỗ trợ hoặc chưa được xây dựng
    SERVICE_UNAVAILABLE: 503, // Server quá tải hoặc đang bảo trì
};
