export interface FindOptions<T> {
    projection?: {
        [key in keyof T]?: number | string;
    };
}
