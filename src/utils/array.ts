export function arr_remove(array, fn) {
    if (array == null) {
        return;
    }
    for (let i = 0; i < array.length; i++) {
        if (fn(array[i]) === true) {
            array.splice(i, 1);
            i--;
        }
    }
};
