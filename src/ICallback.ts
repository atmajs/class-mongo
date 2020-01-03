export interface ICallback<T> {
    (error: Error | string, result?: T): void
}