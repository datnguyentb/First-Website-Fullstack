// utils/response.js

export const successResponse = (res, message = 'Success', data = {}, statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        statusCode,
        message,
        data,
    });
};

export const errorResponse = (
    res,
    message = 'An error occurred',
    errorType = null,
    fieldErrors = null,
    statusCode = 400,
) => {
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errorType, // Tên này thường hay dùng hơn 'errorCode'
        fieldErrors, // Dành cho validation (Joi, Zod,...)
    });
};
