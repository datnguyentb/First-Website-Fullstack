export function getArrayItems(arr, count) {
    if (!count) return arr;
    return arr.slice(0, count);
}
