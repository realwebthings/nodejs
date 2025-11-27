// View layer - handles response formatting and presentation logic

export const formatUserResponse = (user) => {
    return {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    };
};

export const formatUsersListResponse = (users) => {
    return {
        count: users.length,
        users: users.map(user => formatUserResponse(user))
    };
};

export const formatErrorResponse = (error, statusCode = 500) => {
    return {
        success: false,
        error: {
            message: error.message,
            statusCode,
            timestamp: new Date().toISOString()
        }
    };
};

export const formatSuccessResponse = (data, message = 'Success') => {
    return {
        success: true,
        message,
        data,
        timestamp: new Date().toISOString()
    };
};