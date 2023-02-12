import {ApiBase, HttpMethod} from '../api-base.js';
import {PagedResponse} from '../models/generic.js';
import {
    CreateCustomFieldBody,
    CreateListBody,
    CreateWebhookBody,
    GetSubscribersOptions,
    ListDetails,
    ListStats,
    SubscriberSummary,
    UpdateCustomFieldBody,
    UpdateCustomFieldOptionsBody,
    UpdateListBody,
    Webhook,
} from '../models/lists.js';
import {CreateSendCustomField, CreateSendSegment} from '../models/resources.js';
import {CreateSendResponse} from '../response.js';
import {getPagedRequestQueryParams} from '../utils.js';

class ListsArea extends ApiBase {
    /**
     * @returns the listId of the new list
     */
    createList = (clientId: string, body: CreateListBody): Promise<CreateSendResponse<string>> =>
        this.makeApiCall(`lists/${clientId}`, {method: HttpMethod.Post, body});

    updateList = (listId: string, body: UpdateListBody): Promise<CreateSendResponse<void>> =>
        this.makeApiCall(`lists/${listId}`, {method: HttpMethod.Put, body});

    deleteList = (listId: string): Promise<CreateSendResponse<void>> =>
        this.makeApiCall(`lists/${listId}`, {method: HttpMethod.Delete});

    getListDetails = (listId: string): Promise<CreateSendResponse<ListDetails>> => this.makeApiCall(`lists/${listId}`);

    getListStats = (listId: string): Promise<CreateSendResponse<ListStats>> =>
        this.makeApiCall(`lists/${listId}/stats`);

    getCustomFields = (listId: string): Promise<CreateSendResponse<CreateSendCustomField[]>> =>
        this.makeApiCall(`lists/${listId}/customfields`);

    getSegments = (listId: string): Promise<CreateSendResponse<CreateSendSegment[]>> =>
        this.makeApiCall(`lists/${listId}/segments`);

    /**
     * @returns the key of the custom field, that can be used in emails
     */
    createCustomField = (listId: string, body: CreateCustomFieldBody): Promise<CreateSendResponse<string>> =>
        this.makeApiCall(`lists/${listId}/customfields`, {method: HttpMethod.Post, body});

    /**
     * @returns the key of the custom field, that can be used in emails. If the custom field has been renamed, the key will be changed to reflect the new name
     */
    updateCustomField = (
        listId: string,
        customFieldKey: string,
        body: UpdateCustomFieldBody
    ): Promise<CreateSendResponse<string>> =>
        this.makeApiCall(`lists/${listId}/customfields/${customFieldKey}`, {method: HttpMethod.Put, body});

    updateCustomFieldOptions = (
        listId: string,
        customFieldKey: string,
        body: UpdateCustomFieldOptionsBody
    ): Promise<CreateSendResponse<void>> =>
        this.makeApiCall(`lists/${listId}/customfields/${customFieldKey}/options`, {method: HttpMethod.Put, body});

    deleteCustomField = (listId: string, customFieldKey: string): Promise<CreateSendResponse<void>> =>
        this.makeApiCall(`lists/${listId}/customfields/${customFieldKey}`, {method: HttpMethod.Delete});

    getWebhooks = (listId: string): Promise<CreateSendResponse<Webhook[]>> =>
        this.makeApiCall(`lists/${listId}/webhooks`);

    /**
     * @returns the webhookId
     */
    createWebhook = (listId: string, body: CreateWebhookBody): Promise<CreateSendResponse<string>> =>
        this.makeApiCall(`lists/${listId}/webhooks`, {method: HttpMethod.Post, body});

    testWebhook = (listId: string, webhookId: string): Promise<CreateSendResponse<void>> =>
        this.makeApiCall(`lists/${listId}/webhooks/${webhookId}/test`);

    deleteWebhook = (listId: string, webhookId: string): Promise<CreateSendResponse<void>> =>
        this.makeApiCall(`lists/${listId}/webhooks/${webhookId}`, {method: HttpMethod.Delete});

    activateWebhook = (listId: string, webhookId: string): Promise<CreateSendResponse<void>> =>
        this.makeApiCall(`lists/${listId}/webhooks/${webhookId}/activate`, {method: HttpMethod.Put});

    deactivateWebhook = (listId: string, webhookId: string): Promise<CreateSendResponse<void>> =>
        this.makeApiCall(`lists/${listId}/webhooks/${webhookId}/deactivate`, {method: HttpMethod.Put});

    // todo: check if getPagedRequestQueryParams handles these fields
    // todo: type the response subscriber state
    getActiveSubscribers = (
        listId: string,
        options?: GetSubscribersOptions
    ): Promise<CreateSendResponse<PagedResponse<SubscriberSummary[]>>> =>
        this.makeApiCall(`lists/${listId}/active`, {method: HttpMethod.Get}, getPagedRequestQueryParams(options));

    getUnconfirmedSubscribers = (
        listId: string,
        options?: GetSubscribersOptions
    ): Promise<CreateSendResponse<PagedResponse<SubscriberSummary[]>>> =>
        this.makeApiCall(`lists/${listId}/unconfirmed`, {method: HttpMethod.Get}, getPagedRequestQueryParams(options));

    getUnsubscribedSubscribers = (
        listId: string,
        options?: GetSubscribersOptions
    ): Promise<CreateSendResponse<PagedResponse<SubscriberSummary[]>>> =>
        this.makeApiCall(`lists/${listId}/unsubscribed`, {method: HttpMethod.Get}, getPagedRequestQueryParams(options));

    getBouncedSubscribers = (
        listId: string,
        options?: GetSubscribersOptions
    ): Promise<CreateSendResponse<PagedResponse<SubscriberSummary[]>>> =>
        this.makeApiCall(`lists/${listId}/bounced`, {method: HttpMethod.Get}, getPagedRequestQueryParams(options));

    getDeletedSubscribers = (
        listId: string,
        options?: GetSubscribersOptions
    ): Promise<CreateSendResponse<PagedResponse<SubscriberSummary[]>>> =>
        this.makeApiCall(`lists/${listId}/deleted`, {method: HttpMethod.Get}, getPagedRequestQueryParams(options));
}

export {ListsArea};
