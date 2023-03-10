import {CreateSendError} from '../response';
import {SubscriberCustomField} from './lists';

enum ConsentToTrackSubscriber {
    Yes = 'Yes',
    No = 'No',
    Unchanged = 'Unchanged',
}

interface SubscriberImportPreferences {
    resubscribe?: boolean;
    restartSubscriptionBasedAutoresponders?: boolean;
}

interface AddOrUpdateSingleSubscriberBodyBase<TCustomField> {
    emailAddress: string;
    name?: string;
    mobileNumber?: string;
    customFields?: TCustomField[];
    consentToTrack: ConsentToTrackSubscriber;
}

interface AddSingleSubscriberBody
    extends AddOrUpdateSingleSubscriberBodyBase<SubscriberCustomField>,
        SubscriberImportPreferences {}
interface UpdateSingleSubscriberBody
    extends AddOrUpdateSingleSubscriberBodyBase<SubscriberCustomField & {clear?: boolean}>,
        SubscriberImportPreferences {}

interface ImportManySubscribersBody extends SubscriberImportPreferences {
    subscribers: Array<AddOrUpdateSingleSubscriberBodyBase<SubscriberCustomField & {clear?: boolean}>>;
    queueSubscriptionBasedAutoResponders?: boolean;
}

interface ImportManySubscribersResponse {
    totalUniqueEmailsSubmitted: number;
    totalExistingSubscribers: number;
    totalNewSubscribers: number;
    duplicateEmailsInSubmission: string[];
}

type ImportManySubscribersFailureDetails = CreateSendError & {emailAddress: string};

type SubscriberActionEvent = 'Open' | 'Click';

interface SubscriberAction {
    event: SubscriberActionEvent;
    date: string;
    ipAddress: string;
    detail: string;
}

interface SubscriberHistory {
    id: string;
    type: string;
    name: string;
    actions: SubscriberAction[];
}

export {ConsentToTrackSubscriber};
export type {
    AddSingleSubscriberBody,
    UpdateSingleSubscriberBody,
    ImportManySubscribersBody,
    ImportManySubscribersResponse,
    ImportManySubscribersFailureDetails,
    SubscriberHistory,
    SubscriberAction,
    SubscriberActionEvent,
};
