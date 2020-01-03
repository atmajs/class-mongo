
export function cb_createListener(count, cb) {
    var _error;
    return function (error?) {
        if (error)
            _error = error;

        if (--count === 0)
            cb(_error);
    };
};

export function cb_completeDelegate(dfr) {
    return function (error) {
        if (error)
            return dfr.reject(error);
        dfr.resolve();
    }
};

export function cb_toPromise (fn, ...args): Promise<any> {
    return new Promise((resolve, reject) => {

        fn(...args, (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(result);
        });
    })
}