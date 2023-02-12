import {CreateSendOptions} from '../createsend.js';
import {CreateSendError, CreateSendResponse} from '../response.js';
import {toCamelCase, toPascalCase} from '../utils.js';
import {fetch} from '../fetch.js';
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

class BaseArea {
    private headers: Headers;
    private baseUrl: string;

    constructor({apiKey, apiVersion = 'v.3.3'}: CreateSendOptions) {
        this.headers = new Headers({
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'User-Agent': '@createsend/js v0.0.1',
            Authorization: `Basic ${Buffer.from(`${apiKey}:x`).toString('base64')}`,
        });
        this.baseUrl = `https://api.createsend.com/api/${apiVersion}`;
    }

    protected makeApiCall<Response, Body = undefined, ErrorData extends CreateSendError = CreateSendError>(
        route: string,
        {method = HttpMethod.Get, body}: ApiCallOptions<Body> = {},
        queryParams?: URLSearchParams
    ): Promise<CreateSendResponse<Response, ErrorData>> {
        const headers: HeadersInit = Object.fromEntries(this.headers.entries());
        const init: RequestInit = {
            headers,
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

        return fetch(url, init).then(async (res) => {
            const data = await res.json();

            if (!res.ok) {
                return {
                    success: false,
                    data: toCamelCase<ErrorData>(data),
                    status: res.status,
                };
            }

            return {
                success: res.ok,
                data: toCamelCase<Response>(data),
                status: res.status,
            };
        });
    }
}

export {BaseArea, HttpMethod};
