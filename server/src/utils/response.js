export const success = (res, message, data = {}) => {
    return res.status(200).json({
        success: true,
        message,
        data,
    });
};

export const error = (res, message, errorCode = null, fieldErrors, statusCode = 400) => {
    return res.status(statusCode).json({
        success: false,
        status: statusCode,
        message,
        errorCode,
        fieldErrors,
    });
};
