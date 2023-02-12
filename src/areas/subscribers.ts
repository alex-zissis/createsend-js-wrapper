import {ApiBase, HttpMethod} from '../api-base.js';
import {CreateSendSubscriberDetails} from '../models/resources.js';
import {
    AddSingleSubscriberBody,
    ImportManySubscribersBody,
    ImportManySubscribersFailureDetails,
    ImportManySubscribersResponse,
    SubscriberHistory,
    UpdateSingleSubscriberBody,
} from '../models/subscribers.js';
import {CreateSendErrorWithResultData, CreateSendResponse} from '../response.js';

class SubscribersArea extends ApiBase {
    getSubscriberDetails = (
        listId: string,
        email: string,
        includeTrackingPreference: boolean = false
    ): Promise<CreateSendResponse<CreateSendSubscriberDetails>> =>
        this.makeApiCall(
            `subscribers/${listId}`,
            {method: HttpMethod.Get},
            new URLSearchParams({email, includeTrackingPreference: String(includeTrackingPreference)})
        );

    /**
     * @returns the email address of the subscriber added
     */
    addSingleSubscriber = (listId: string, body: AddSingleSubscriberBody): Promise<CreateSendResponse<string>> =>
        this.makeApiCall(`subscribers/${listId}`, {method: HttpMethod.Post, body});

    updateSingleSubscriber = (
        listId: string,
        currentEmail: string,
        body: UpdateSingleSubscriberBody
    ): Promise<CreateSendResponse<void>> =>
        this.makeApiCall(
            `subscribers/${listId}`,
            {method: HttpMethod.Put, body},
            new URLSearchParams({email: currentEmail})
        );

    importManySubscribers = (
        listId: string,
        body: ImportManySubscribersBody
    ): Promise<
        CreateSendResponse<
            ImportManySubscribersResponse,
            CreateSendErrorWithResultData<
                ImportManySubscribersResponse & {failureDetails: ImportManySubscribersFailureDetails[]}
            >
        >
    > => this.makeApiCall(`subscribers/${listId}/import`, {method: HttpMethod.Post, body});

    getSubscriberHistory = (listId: string, email: string): Promise<CreateSendResponse<SubscriberHistory[]>> =>
        this.makeApiCall(`/subscribers/${listId}/history`, {method: HttpMethod.Get}, new URLSearchParams({email}));

    unsubscribeSubscriber = (listId: string, email: string): Promise<CreateSendResponse<void>> =>
        this.makeApiCall(`subscribers/${listId}/unsubscribe`, {method: HttpMethod.Post, body: {emailAddress: email}});

    deleteSubscriber = (listId: string, email: string): Promise<CreateSendResponse<void>> =>
        this.makeApiCall(`subscribers/${listId}`, {method: HttpMethod.Delete}, new URLSearchParams({email}));
}

export {SubscribersArea};
