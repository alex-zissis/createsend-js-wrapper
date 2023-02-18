import {PagedRequestOptions} from './generic.js';
import {CreateSendCustomFieldType, SubscriberState} from './resources.js';

enum ListUnsubscribeSetting {
    AllClientLists = 'AllClientLists',
    OnlyThisList = 'OnlyThisList',
}

interface CreateListBody {
    title: string;
    unsubscribeSetting?: ListUnsubscribeSetting;
    confirmedOptIn?: boolean;
    confirmationSuccessPage?: string;
    unsubscribePage?: string;
}

interface UpdateListBody extends CreateListBody {
    addUnsubscribesToSuppList?: true;
    scrubActiveWithSuppList?: true;
}

interface ListDetails {
    listId: string;
    confirmedOptIn: boolean;
    title: string;
    unsubscribeSetting: ListUnsubscribeSetting;
    unsubscribePage: string;
    confirmationSuccessPage: string;
}

interface ListStats {
    totalActiveSubscribers: number;
    newActiveSubscribersToday: number;
    newActiveSubscribersYesterday: number;
    newActiveSubscribersThisWeek: number;
    newActiveSubscribersThisMonth: number;
    newActiveSubscribersThisYear: number;
    totalUnsubscribes: number;
    unsubscribesToday: number;
    unsubscribesYesterday: number;
    unsubscribesThisWeek: number;
    unsubscribesThisMonth: number;
    unsubscribesThisYear: number;
    totalDeleted: number;
    deletedToday: number;
    deletedYesterday: number;
    deletedThisWeek: number;
    deletedThisMonth: number;
    deletedThisYear: number;
    totalBounces: number;
    bouncesToday: number;
    bouncesYesterday: number;
    bouncesThisWeek: number;
    bouncesThisMonth: number;
    bouncesThisYear: number;
}

interface CreateCustomFieldBodyBase {
    fieldName: string;
    dataType: CreateSendCustomFieldType;
    visibleInPreferenceCenter: boolean;
    options?: string[];
}

interface CreateSelectCustomFieldBody extends CreateCustomFieldBodyBase {
    dataType: CreateSendCustomFieldType.MultiSelectMany | CreateSendCustomFieldType.MultiSelectOne;
    options: string[];
}

interface CreateSimpleCustomFieldBody extends CreateCustomFieldBodyBase {
    dataType:
        | CreateSendCustomFieldType.Country
        | CreateSendCustomFieldType.Date
        | CreateSendCustomFieldType.Number
        | CreateSendCustomFieldType.Text
        | CreateSendCustomFieldType.USState;
    options?: undefined;
}

type CreateCustomFieldBody = CreateSelectCustomFieldBody | CreateSimpleCustomFieldBody;

interface UpdateCustomFieldBody {
    fieldName: string;
    visibleInPreferenceCenter: boolean;
}

interface UpdateCustomFieldOptionsBody {
    keepExistingOptions: boolean;
    options: string[];
}

enum WebhookEvent {
    Subscribe = 'Subscribe',
    Deactivate = 'Deactivate',
    Update = 'Update',
}

enum WebhookFormat {
    Json = 'json',
    Xml = 'xml',
}

enum WebhookStatus {
    Active = 'Active',
    Inactive = 'Inactive',
}

interface Webhook {
    webhookId: string;
    events: WebhookEvent[];
    url: string;
    status: WebhookStatus;
    payloadFormat: WebhookFormat;
}

type CreateWebhookBody = Pick<Webhook, 'events' | 'url' | 'payloadFormat'>;

interface GetSubscribersOptions extends PagedRequestOptions {
    orderField?: 'email' | 'name' | 'date';
    date?: string;
    includeTrackingPreference?: boolean;
}

interface SubscriberCustomField {
    key: string;
    value: string;
}

type ConsentToTrack = 'Yes' | 'No' | '';

// todo: does this include mobile?
interface SubscriberSummary {
    emailAddress: string;
    name: string;
    listJoinedDate: string;
    date: string;
    state: SubscriberState;
    customFields: SubscriberCustomField[];
    readsEmailWith: string;
    // todo: make this dynamic based on query params
    consentToTrack?: ConsentToTrack;
}

export {ListUnsubscribeSetting, WebhookEvent, WebhookFormat, WebhookStatus};
export type {
    CreateListBody,
    ListDetails,
    ListStats,
    UpdateListBody,
    CreateCustomFieldBody,
    UpdateCustomFieldBody,
    UpdateCustomFieldOptionsBody,
    Webhook,
    CreateWebhookBody,
    GetSubscribersOptions,
    SubscriberCustomField,
    SubscriberSummary,
};
