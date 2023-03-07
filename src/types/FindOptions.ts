/** Raw MongoDB Projected*/
export interface FindOptions<T> {
    projection?: {
        [key in keyof T]?: number | string;
    };
}

/** Extended Projection: supports nested properties and type safety */
export interface FindOptionsProjected <T extends object, P extends TProjection<T>> {
    projection?: P;
}

export type TProjection<T extends object> = {
    [K in keyof T]?:
        T[K] extends Array<infer TArr>
        ? (TArr extends object ? (TProjection<TArr> | number) : number)
        : (T[K] extends object ? (TProjection<T[K]> | number) : number)
  };

// export type TDeepPickByProjection<T extends object, P extends TProjection<T>> = {
//     [K in Extract<keyof T, keyof P>]: (
//         P[K] extends number
//             ? (T[K])
//             : (
//                 T[K] extends Array<infer TArr>
//                 ? (TArr extends object
//                     ? TDeepPickByProjection<TArr, P[K]>
//                     : never)[]
//                 : (T[K] extends object
//                     ? TDeepPickByProjection<T[K], P[K]>
//                     : never)
//             )
//     )
// } extends infer O ? { [K in keyof O]: O[K] } : never;


export type TDeepPickByProjection<T extends object, P extends TProjection<T>> = {
    [K in Extract<keyof T, keyof P>]: (
        P[K] extends object
            ? (
                T[K] extends Array<infer TArr>
                ? (TArr extends object
                    ? TDeepPickByProjection<TArr, P[K]>
                    : never)[]
                : (T[K] extends object
                    ? TDeepPickByProjection<T[K], P[K]>
                    : never)
            )
            : (T[K])
    )
} extends infer O ? { [K in keyof O]: O[K] } : never;
