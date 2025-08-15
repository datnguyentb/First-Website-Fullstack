export const joinIds = (ids, separator = ',') => {
    if (!Array.isArray(ids)) return '';
    return ids.filter((id) => typeof id === 'string' && id.trim() !== '').join(separator);
};
