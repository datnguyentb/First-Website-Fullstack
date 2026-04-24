type Callback = (data: any) => void;

const listeners: Record<string, Callback[]> = {};

export const subscribe = (type: string, cb: Callback) => {
    if (!listeners[type]) listeners[type] = [];
    listeners[type].push(cb);

    return () => {
        listeners[type] = listeners[type].filter((fn) => fn !== cb);
    };
};

export const emitEvent = (data: any) => {
    listeners[data.type]?.forEach((cb) => cb(data));
};
