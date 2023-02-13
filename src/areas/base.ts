import {CreateSendOptions} from '../createsend.js';
import {CreateSendError, CreateSendResponse} from '../response.js';
import {toCamelCase, toPascalCase} from '../utils.js';
import {getFetch} from '../fetch.js';
import type {RequestInit, HeadersInit} from '../fetch.js';

enum HttpMethod {
    Post = 'POST',
    Get = 'GET',
    Delete = 'DELETE',
    Put = 'PUT',
}

type ApiCallOptions<Body> = Partial<{
    method: HttpMethod;
    body: Body;
}>;

let f: typeof fetch;

class BaseArea {
    private headers: HeadersInit;
    private baseUrl: string;

    constructor({apiKey, apiVersion = 'v3.3'}: CreateSendOptions) {
        this.headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'User-Agent': '@createsend/js v0.0.1',
            Authorization: `Basic ${Buffer.from(`${apiKey}:x`).toString('base64')}`,
        };
        this.baseUrl = `https://api.createsend.com/api/${apiVersion}`;
    }

    protected async makeApiCall<Response, Body = undefined, ErrorData extends CreateSendError = CreateSendError>(
        route: string,
        {method = HttpMethod.Get, body}: ApiCallOptions<Body> = {},
        queryParams?: URLSearchParams
    ): Promise<CreateSendResponse<Response, ErrorData>> {
        if (!f) {
            f = await getFetch();
        }

        const init: RequestInit = {
            headers: this.headers,
            method,
            signal: null,
        };
        if (body) {
            init.body = JSON.stringify(toPascalCase(body));
        }

        let url = `${this.baseUrl}/${route}.json`;
        if (queryParams) {
            url = `${url}?${queryParams.toString()}`;
        }

        return f(url, init).then(async (res) => {
            let data: any;
            try {
                data = await res.json();
            } catch {
                data = undefined;
            }

            if (!res.ok) {
                return {
                    success: false,
                    data: toCamelCase<ErrorData>(data),
                    status: res.status,
                };
            }

            return {
                success: res.ok,
                data: typeof data !== 'undefined' ? toCamelCase<Response>(data) : (data as Response),
                status: res.status,
            };
        });
    }
}

export {BaseArea, HttpMethod};
