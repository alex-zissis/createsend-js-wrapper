import {AccountArea} from './areas/account.js';
import {ClientsArea} from './areas/clients.js';
import {CampaignsArea} from './areas/campaigns.js';
import {JourneysArea} from './areas/journeys.js';
import {ListsArea} from './areas/lists.js';
import {SegmentsArea} from './areas/segments.js';
import {SubscribersArea} from './areas/subscribers.js';
import {TemplatesArea} from './areas/templates.js';
import {TransactionalArea} from './areas/transactional.js';
import {OAuthArea} from './areas/oauth.js';

interface CreateSendOptionsBase {
    apiVersion?: string;
    baseUrl?: string;
    apiKey?: string;
    accessToken?: string;
}

interface CreateSendOptionsApiKey extends CreateSendOptionsBase {
    apiKey: string;
    accessToken?: undefined;
}

interface CreateSendOptionsAccessToken extends CreateSendOptionsBase {
    apiKey?: undefined;
    accessToken: string;
}

type CreateSendOptions = CreateSendOptionsApiKey | CreateSendOptionsAccessToken;

function CreateSend(options: CreateSendOptions) {
    return {
        account: new AccountArea(options),
        clients: new ClientsArea(options),
        campaigns: new CampaignsArea(options),
        journeys: new JourneysArea(options),
        lists: new ListsArea(options),
        segments: new SegmentsArea(options),
        subscribers: new SubscribersArea(options),
        templates: new TemplatesArea(options),
        transactional: new TransactionalArea(options),
    };
}

interface CreateSendOAuthOptions {
    baseUrl?: string;
}

function CreateSendOAuth(options?: CreateSendOAuthOptions) {
    const oauthArea = new OAuthArea(options ?? {});

    return oauthArea;
}

export {CreateSend, CreateSendOAuth};
export type {CreateSendOptions, CreateSendOAuthOptions};
