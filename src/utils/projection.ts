export namespace ProjectionUtil {

    export function handleOpts (opts: { projection?: any }) {
        if (opts?.projection) {
            opts.projection = flattern(opts.projection);
        }
        return opts;
    }

    export function flattern (projection) {
        let obj = Object.create(null);
        flatternByKey('', projection, obj);
        return obj;
    }

    function flatternByKey(path, source, out) {
        let handled = false;
        for (let key in source) {
            if (handled === false && key === '$slice') {
                out[path] = source;
                return;
            }
            handled = true;
            let val = source[key];

            let pathNext = key;
            if (path) {
                pathNext = `${path}.${key}`;
            }
            if (val == null || typeof val !== 'object') {
                out[pathNext] = val;
                continue;
            }
            flatternByKey(pathNext, val, out);
        }
    }
}
