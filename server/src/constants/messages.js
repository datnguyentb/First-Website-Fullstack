export const MESSAGE = {
    COMMON: {
        SUCCESS: 'Success',
        CREATED: 'Resource created successfully',
        BAD_REQUEST: 'Invalid request',
        UNAUTHORIZED: 'Unauthorized access',
        FORBIDDEN: 'You do not have permission to access this resource',
        NOT_FOUND: 'Resource not found',
        SERVER_ERROR: 'Internal server error',
        CONFLICT: 'Resource already exists',
        UNKNOWN_ERROR: 'An unknown error occurred',
    },

    BANNER: {
        EMPTY_CONTENT: 'You have not entered any content',
        CREATE_SUCCESS: 'Banner created successfully',
        UPDATE_SUCCESS: 'Banner updated successfully',
        EMPTY_CONTENT: 'You have not entered any content',
        CREATE_SUCCESS: 'Banner created successfully',
        UPDATE_SUCCESS: 'Banner updated successfully',
        ID_REQUIRED: 'Banner ID is required',
        NOT_FOUND: 'Banner not found',
        DELETE_SUCCESS: 'Banner deleted successfully',
    },

    AUTH: {
        LOGIN_SUCCESS: 'Login successful',
        REGISTER_SUCCESS: 'Registration successful',
        INVALID_CREDENTIALS: 'Invalid email or password',
        ACCOUNT_INACTIVE: 'Your account is not activated',
        TOKEN_EXPIRED: 'Token has expired',
        TOKEN_VALID: 'Token is valid',
        ACCESS_DENIED: 'Access denied. Please login first.',
        INVALID_DATA: 'Invalid authentication data.',
    },

    USER: {
        NOT_FOUND: 'User not found',
        ALREADY_EXISTS: 'User already exists',
        UPDATE_SUCCESS: 'User updated successfully',
    },

    POST: {
        NOT_FOUND: 'Post not found',
        NO_ACCESS: 'You do not have access to this post',
        ONLY_ME: 'This post is private (only me)',
        FRIENDS_ONLY: 'Only friends can access this post',
        UNKNOWN_PRIVACY: 'Unknown privacy setting',
        CREATE_SUCCESS: 'Post created successfully',
        DELETE_SUCCESS: 'Post deleted successfully',
        EMPTY_CONTENT: 'You have not entered any content',
        LIKE_SUCCESS: 'Liked successfully',
        UNLIKE_SUCCESS: 'Unliked successfully',
        FETCH_FAILED: 'Failed to fetch posts',
    },

    PLAYLIST: {
        EMPTY_NAME: 'Playlist name is required',
        CREATE_SUCCESS: 'Playlist created successfully',
        NOT_FOUND: 'Playlist not found',
    },

    COMMENT: {
        NOT_FOUND: 'Comment not found',
        CREATE_SUCCESS: 'Comment added',
        DELETE_SUCCESS: 'Comment deleted',
        NO_ACCESS: 'You cannot modify this comment',
    },

    TODO: {
        NOT_FOUND: 'Task not found',
        CREATE_SUCCESS: 'Task created successfully',
        UPDATE_SUCCESS: 'Task updated successfully',
        DELETE_SUCCESS: 'Task deleted successfully',
    },

    FILE: {
        UPLOAD_SUCCESS: 'File uploaded successfully',
        UNSUPPORTED_TYPE: 'Unsupported file type',
        TOO_LARGE: 'File size exceeds the allowed limit',
    },
    CO_LISTENING: {
        EMPTY_NAME: 'Room name is required',
        CREATE_SUCCESS: 'Room created successfully',
        NOT_FOUND: 'Room not found',
        INCORRECT_PASSWORD: 'Incorrect room password',
        PASSWORD_REQUIRED: 'Password is required for private rooms',
        HOST_ONLY: 'Only the host can modify this action',
        TRACK_ADDED: 'Track added to queue successfully',
        TRACK_REMOVED: 'Track removed from queue successfully',
        QUEUE_EMPTY: 'The queue is currently empty',
        JOIN_SUCCESS: 'Joined room successfully',
        LEAVE_SUCCESS: 'Left room successfully',
        GET_ALL_SUCCESS: 'Rooms fetched successfully',
        GET_ALL_FAIL: 'Failed to fetch rooms',
    },
};
