export const splitIds = (str, separator = ',') => {
    if (typeof str !== 'string') return [];
    return str
        .split(separator)
        .map((id) => id.trim())
        .filter((id) => id !== '');
};
