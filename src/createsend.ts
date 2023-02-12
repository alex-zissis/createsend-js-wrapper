import {AccountArea} from './areas/account.js';
import {ClientsArea} from './areas/clients.js';
import {CampaignsArea} from './areas/campaigns.js';
import {JourneysArea} from './areas/journeys.js';
import {ListsArea} from './areas/lists.js';
import {SubscribersArea} from './areas/subscribers.js';
import {TemplatesArea} from './areas/templates.js';
import {TransactionalArea} from './areas/transactional.js';

type CreateSendOptions = {
    apiVersion?: string;
    apiKey: string;
};

function CreateSend(options: CreateSendOptions) {
    return {
        account: new AccountArea(options),
        clients: new ClientsArea(options),
        campaigns: new CampaignsArea(options),
        journeys: new JourneysArea(options),
        lists: new ListsArea(options),
        subscribers: new SubscribersArea(options),
        templates: new TemplatesArea(options),
        transactional: new TransactionalArea(options),
    };
}

export {CreateSend};
export type {CreateSendOptions};
