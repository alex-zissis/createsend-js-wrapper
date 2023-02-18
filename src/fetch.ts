// A thin shim to use native fetch when available, or fall back to node-fetch (optional dependency) if it's not

import type {RequestInit as RawRequestInit} from 'node-fetch';

type RequestInit = RawRequestInit & {body?: string; headers?: HeadersInit; signal: AbortSignal | null};

const resolveFetch = async () => {
    let fetchShim = globalThis['fetch'];
    if (!fetchShim) {
        const nodeFetch = await import('node-fetch');

        // there are minor type differences between native fetch and node-fetch, but they don't affect usability
        // @ts-ignore
        fetchShim = nodeFetch.default;
    }

    return fetchShim;
};

enum HttpMethod {
    Post = 'POST',
    Get = 'GET',
    Delete = 'DELETE',
    Put = 'PUT',
}

type ApiCallOptions<Body> = Partial<{
    method: HttpMethod;
    body: Body;
    extraHeaders: Record<string, string>;
}>;

export {resolveFetch, HttpMethod};
export type {RequestInit, ApiCallOptions};
