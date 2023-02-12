// A thin shim to use native fetch when available, or fall back to node-fetch (optional dependency) if it's not

import type {RequestInit as RawRequestInit} from 'node-fetch';

type HeadersInit = {[key: string]: string};
type RequestInit = RawRequestInit & {body?: string; headers?: HeadersInit; signal: AbortSignal | null};
let f = globalThis['fetch'];
if (!f) {
    // @ts-ignore
    f = (await import('node-fetch')).default;
}

export {f as fetch};
export type {HeadersInit, RequestInit};
