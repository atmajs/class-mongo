export function arr_remove(array, fn) {
    var imax = array.length,
        i = -1;
    while (++i < imax) {
        if (fn(array[i]) === true) {
            array.splice(i, 1);
            i--;
            imax--;
        }
    }
};
