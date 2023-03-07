import { class_Dfr } from 'atma-utils';

export namespace promise {
    export function toCallback <T extends Promise<any>> (promise: T, cb?: (error: Error, result?: Awaited<T>) => void | any): Promise<[ Error, Awaited<T> ]> {
        let dfr = new class_Dfr();
        promise
            .then(result => {

                dfr.resolve([null, result]);
                cb?.(null, result);
            }, error => {
                dfr.reject(error);
                cb?.(error);
            });
        return dfr as any;
    }

    export function wait (ms) {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, ms);
        })
    }
}
