export const validateMessage = (data) => {
    if (!data?.content && data.type === 'text') return null;
    if (!['text', 'image', 'file'].includes(data.type)) return null;
    return data;
};
