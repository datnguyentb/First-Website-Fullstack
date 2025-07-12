export const userResponse = (user, fields = []) => {
    const plainUser = user?.toObject?.() ?? user;
    const result = {};

    fields.forEach((field) => {
        if (plainUser?.[field] !== undefined) {
            result[field] = plainUser[field];
        }
    });

    return result;
};

export const usersResponse = (users, fields = []) => {
    return users.map((user) => userResponse(user, fields));
};
