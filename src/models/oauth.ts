enum CreateSendOAuthScope {
    ViewReports = 'ViewReports',
    ManageLists = 'ManageLists',
    CreateCampaigns = 'CreateCampaigns',
    ImportSubscribers = 'ImportSubscribers',
    SendCampaigns = 'SendCampaigns',
    ViewSubscribersInReports = 'ViewSubscribersInReports',
    ManageTemplates = 'ManageTemplates',
    AdministerPersons = 'AdministerPersons',
    AdministerAccount = 'AdministerAccount',
    ViewTransactional = 'ViewTransactional',
    SendTransactional = 'SendTransactional',
    Automation = 'Automation',
}

interface BuildAuthorizationUrlOptions {
    redirectUri: string;
    scopes: CreateSendOAuthScope[];
    type: 'web_server' | 'user_agent';
    state?: string;
}

interface GetTokenOptions {
    clientSecret: string;
    code: string;
    redirectUri: string;
}

interface GetTokenSuccessResponse {
    access_token: string;
    expires_in: number;
    refresh_token: string;
}

interface GetTokenErrorResponse {
    error: string;
    error_description: string;
}

interface OAuthResponseBase<T> {
    success: boolean;
    status: number;
    data: T;
}

interface OAuthResponseSuccess<T> extends OAuthResponseBase<T> {
    success: true;
}

interface OAuthResponseError<T> extends OAuthResponseBase<T> {
    success: false;
}

type OAuthResponse<T, E> = OAuthResponseSuccess<T> | OAuthResponseError<E>;

export type {
    BuildAuthorizationUrlOptions,
    GetTokenOptions,
    GetTokenErrorResponse,
    GetTokenSuccessResponse,
    OAuthResponse,
};
export {CreateSendOAuthScope};
