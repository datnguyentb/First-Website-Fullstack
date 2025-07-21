// ✅ Định dạng một item (object) theo field đã chọn + thêm dữ liệu phụ
export const formatItem = (item, fields = [], extra = {}) => {
    const plainItem = item?.toObject?.() ?? item;
    const result = {};

    fields.forEach((field) => {
        if (plainItem?.[field] !== undefined) {
            result[field] = plainItem[field];
        }
    });

    return {
        ...result,
        ...extra,
    };
};

// ✅ Định dạng mảng object với trường cần thiết + dữ liệu phụ sinh động
export const formatItems = (items, fields = [], extraFn = () => ({})) => {
    return items.map((item) => formatItem(item, fields, extraFn(item)));
};
