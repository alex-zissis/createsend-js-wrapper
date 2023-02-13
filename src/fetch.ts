// A thin shim to use native fetch when available, or fall back to node-fetch (optional dependency) if it's not

import type {RequestInit as RawRequestInit} from 'node-fetch';

type HeadersInit = {[key: string]: string};
type RequestInit = RawRequestInit & {body?: string; headers?: HeadersInit; signal: AbortSignal | null};

const getFetch = async () => {
    let f = globalThis['fetch'];
    if (!f) {
        const nodeFetch = await import('node-fetch');

        // @ts-ignore
        f = nodeFetch.default;
    }

    return f;
};

export {getFetch};
export type {HeadersInit, RequestInit};
