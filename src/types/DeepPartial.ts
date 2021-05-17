
export type DeepPartial<T> = {
    [key in keyof T]?: T[key] extends object ? DeepPartial<T[key]> : T[key];
}
