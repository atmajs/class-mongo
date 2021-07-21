export function deprecated_log(message) {
    if (message in notified) {
        return;
    }
    console.warn(`[Deprecated API] ${message}`);
}

const notified = {};
