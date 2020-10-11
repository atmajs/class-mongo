export interface FindOptions<T> {
    projection?: {
        [key in keyof T]?: number | string;
    };
}
export interface FindOptionsProjected <T extends object, U extends keyof T = keyof T>  {
    projection?: TProjection<T, U>;
}


type TProjection<T extends object, U extends keyof T> = {
    [key in U]?: T[key] extends object ? TProjection<T[key], keyof T[key]> : number;
}

interface FindOptionsProjection<T extends object, U extends keyof T> {
    projection: TProjection<T, U>;
}
