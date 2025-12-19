export const formatUser = (user) => {
    if (!user) return null;

    // Nếu user là Mongoose document thì convert sang object
    const u = user.toObject ? user.toObject() : user;

    return {
        _id: u._id,
        firstName: u.firstName,
        lastName: u.lastName,
        fullName: `${u.firstName} ${u.lastName}`.trim(),
        avatar: u.avatarUrl || '/default-avatar.png',
        isOnline: u.isOnline || false,
        lastActive: u.lastActive || null,
    };
};
