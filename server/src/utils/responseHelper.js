import { HTTP_STATUS, ERROR_TYPE, MESSAGE_RESPONSE } from '../constants/index.js';
import { successResponse, errorResponse } from './response.js';

// ✅ Thành công chung
export const okResponse = (res, message, data = null) => successResponse(res, message, data, HTTP_STATUS.OK);

// ✅ Thành công khi tạo mới
export const createdResponse = (res, message, data = null) => successResponse(res, message, data, HTTP_STATUS.CREATED);

// ❌ Lỗi server
export const serverErrorResponse = (res, message = MESSAGE_RESPONSE.COMMON.SERVER_ERROR) =>
    errorResponse(res, message, ERROR_TYPE.SERVER, null, HTTP_STATUS.SERVER_ERROR);

// ❌ Không tìm thấy
export const notFoundResponse = (res, message = MESSAGE_RESPONSE.COMMON.NOT_FOUND) =>
    errorResponse(res, message, ERROR_TYPE.NOT_FOUND, null, HTTP_STATUS.NOT_FOUND);

// ❌ Không có quyền
export const forbiddenResponse = (res, message = MESSAGE_RESPONSE.COMMON.NO_PERMISSION) =>
    errorResponse(res, message, ERROR_TYPE.AUTHORIZATION, null, HTTP_STATUS.FORBIDDEN);

// ❌ Lỗi xác thực
export const unauthorizedResponse = (res, message = MESSAGE_RESPONSE.COMMON.UNAUTHORIZED) =>
    errorResponse(res, message, ERROR_TYPE.AUTHENTICATION, null, HTTP_STATUS.UNAUTHORIZED);

// ❌ Lỗi validate
export const badRequestResponse = (res, message, fieldErrors = {}) =>
    errorResponse(res, message, ERROR_TYPE.VALIDATION, fieldErrors, HTTP_STATUS.BAD_REQUEST);
