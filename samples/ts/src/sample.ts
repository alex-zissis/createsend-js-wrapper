import {CreateSend, CreateSendErrorCode} from '@createsend/client';
import {CreateClientBody} from '@createsend/client/dist/cjs/models/account';
import {WebhookEvent, WebhookFormat} from '@createsend/client/dist/cjs/models/lists';

const apiKey = process.env.CM_API_KEY ?? '';
const createSend = CreateSend({apiKey});

createSend.account.getCountries().then((countriesResponse) => {
    if (!countriesResponse.success) {
        if (countriesResponse.data.code === CreateSendErrorCode.InvalidOAuthToken) {
            console.log("That's the wrong token!");
        } else if (countriesResponse.data.code === CreateSendErrorCode.InternalServerError) {
            console.log('Oh no!', countriesResponse.data.message);
        } else {
            console.log('other error', countriesResponse.data.code, countriesResponse.data.message);
        }

        process.exit(1);
    }
});

const body: CreateClientBody = {
    companyName: 'The name',
    timeZone: 'Australia',
    country: '(GMT+10:00) Canberra, Melbourne, Sydney',
};
createSend.clients.create(body).then(console.log);

createSend.lists
    .createWebhook(`a1a1a1`, {
        events: [WebhookEvent.Subscribe, WebhookEvent.Deactivate],
        url: 'https://mywebsite.com/webhook',
        payloadFormat: WebhookFormat.Json,
    })
    .then(console.log);
