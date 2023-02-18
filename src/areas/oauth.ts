import {CreateSendOAuthOptions} from '../createsend.js';
import {ApiCallOptions, HttpMethod, resolveFetch} from '../fetch.js';
import {
    BuildAuthorizationUrlOptions,
    GetTokenOptions,
    GetTokenErrorResponse,
    GetTokenSuccessResponse,
    OAuthResponse,
} from '../models/oauth.js';

let fetchShim: typeof fetch;

class OAuthArea {
    private baseUrl: string;
    private headers: Record<string, string>;

    constructor({baseUrl = 'https://api.createsend.com'}: CreateSendOAuthOptions) {
        this.baseUrl = baseUrl;
        this.headers = {
            'User-Agent': '@createsend/js v0.0.1',
        };
    }

    private async makeHttpCall<Response, ErrorResponse, Body = undefined>(
        route: string,
        {method = HttpMethod.Get, body, extraHeaders}: ApiCallOptions<Body>
    ): Promise<OAuthResponse<Response, ErrorResponse>> {
        if (!fetchShim) {
            fetchShim = await resolveFetch();
        }

        const init: RequestInit = {
            headers: {...this.headers, ...extraHeaders},
            method,
            signal: null,
        };

        if (body) {
            init.body = body.toString();
        }

        const url = `${this.baseUrl}${route}`;
        return fetchShim(url, init).then(async (res) => {
            let data;
            try {
                data = await res.json();
            } catch {
                data = undefined;
            }

            if (!res.ok) {
                return {
                    success: false,
                    status: res.status,
                    data: data as ErrorResponse,
                };
            }

            return {
                success: true,
                status: res.status,
                data: data as Response,
            };
        });
    }

    buildAuthorizationUrl = (clientId: string, {redirectUri, scopes, state, type}: BuildAuthorizationUrlOptions) => {
        const params = new URLSearchParams({
            client_id: clientId,
            redirect_uri: redirectUri,
            scope: scopes.join(','),
            type,
        });

        if (state) {
            params.append('state', state);
        }

        return `${this.baseUrl}/oauth?${params.toString()}`;
    };

    getToken = (
        clientId: string,
        {clientSecret, code, redirectUri}: GetTokenOptions
    ): Promise<OAuthResponse<GetTokenSuccessResponse, GetTokenErrorResponse>> => {
        const body = new URLSearchParams({
            grant_type: 'authorization_code',
            client_id: clientId,
            client_secret: clientSecret,
            code,
            redirect_uri: redirectUri,
        });

        return this.makeHttpCall('/oauth/token', {
            method: HttpMethod.Post,
            body,
            extraHeaders: {'Content-Type': 'application/x-www-form-urlencoded'},
        });
    };

    refreshAccessToken = (
        refreshToken: string
    ): Promise<OAuthResponse<GetTokenSuccessResponse, GetTokenErrorResponse>> => {
        const body = new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        });

        return this.makeHttpCall('/oauth/token', {
            method: HttpMethod.Post,
            body,
            extraHeaders: {'Content-Type': 'application/x-www-form-urlencoded'},
        });
    };
}

export {OAuthArea};
