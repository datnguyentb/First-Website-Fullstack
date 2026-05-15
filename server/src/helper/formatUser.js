export const formatSimpleUser = (user) => {
    if (!user) return null;

    // Nếu user là Mongoose document thì convert sang object
    const userFormat = user.toObject ? user.toObject() : user;

    return {
        _id: userFormat._id,
        firstName: userFormat.firstName,
        lastName: userFormat.lastName,
        fullName: `${userFormat.firstName} ${userFormat.lastName}`.trim(),
        avatar: userFormat.avatar || '/default-avatar.png',
        isOnline: userFormat.isOnline || false,
        lastActive: userFormat.lastActive || null,
    };
};

export const formatFullUser = (user) => {
    if (!user) return null;
    const userFormat = user.toObject ? user.toObject() : user;

    const basicInfo = formatSimpleUser(userFormat);

    return {
        ...basicInfo,
        bio: userFormat.bio || '',
        address: userFormat.address || '',
        phoneNumber: userFormat.phoneNumber || '',
        email: userFormat.email || '',
        gender: userFormat.gender || 'other',
        location: userFormat.location || '',
        birthdate: userFormat.birthdate || null,
        coverImage: userFormat.coverImageUrl || '/default-cover.jpg',
        createdAt: userFormat.createdAt,
        friendsCount: userFormat.friends?.length || 0,
    };
};

export const formatOtherFullInfor = (user) => {
    if (!user) return null;
    const userFormat = user.toObject ? user.toObject() : user;
    const basicInfo = formatSimpleUser(userFormat);

    return {
        ...basicInfo,
        bio: userFormat.bio || '',
        address: userFormat.address || '',
        phoneNumber: userFormat.phoneNumber || '',
        createdAt: userFormat.createdAt,
    };
};

export const formatUserSimple = (user) => {
    if (!user) return null;
    const userFormat = user.toObject ? user.toObject() : user;

    return {
        _id: userFormat._id,
        firstName: userFormat.firstName,
        lastName: userFormat.lastName,
        fullName: `${userFormat.firstName} ${userFormat.lastName}`.trim(),
        avatar: userFormat.avatar || '/default-avatar.png',
    };
};
