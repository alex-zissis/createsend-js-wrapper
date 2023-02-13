import {AnyString} from './generic';

interface CreateSendClient {
    name: string;
    clientId: string;
}

type CreateSendAdminStatus = 'Active' | 'Waiting to Accept the Invitation';

interface CreateSendAdmin {
    name: string;
    emailAddress: string;
    status: CreateSendAdminStatus;
}

enum SubscriberState {
    Active = 'Active',
    Unsubscribed = 'Unsubscribed',
    Bounced = 'Bounced',
    Deleted = 'Deleted',
    Unconfirmed = 'Unconfirmed',
}

interface CreateSendSubscriberDetails {
    listId: string;
    listName: string;
    subscriberState: SubscriberState;
    dateSubscriberAdded: string;
}

interface CreateSendSegment {
    listId: string;
    segmentId: string;
    title: string;
}

interface CreateSendList {
    listId: string;
    name: string;
}

interface CreateSendPerson {
    emailAddress: string;
    name: string;
    accessLevel: number; // todo: make this a flag enum?
    status: string;
}

interface CreateSendCampaignBase {
    campaignId: string;
    name: string;
    subject: string;
    fromName: string;
    fromEmail: string;
    replyTo: string;
    tags: string[];
}

interface CreateSendSentCampaign extends CreateSendCampaignBase {
    webVersionUrl: string;
    webVersionTextUrl: string;
    sentDate: string;
    totalRecipients: number;
}

interface CreateSendDraftCampaign extends CreateSendCampaignBase {
    previewUrl: string;
    previewTextUrl: string;
    dateCreated: string;
}

interface CreateSendScheduledCampaign extends CreateSendDraftCampaign {
    dateScheduled: string;
    scheduledTimeZone: string;
}

enum CreateSendCustomFieldType {
    Text = 'Text',
    Number = 'Number',
    Date = 'Date',
    MultiSelectOne = 'MultiSelectOne',
    // todo: is this what it's called? am i missing one? try countires and US states
    MultiSelectMany = 'MultiSelectMany',
    Country = 'Country',
    USState = 'USState',
}

interface CreateSendCustomField {
    fieldName: string;
    key: string;
    dataType: CreateSendCustomFieldType;
    fieldOptions: string[];
    visibleInPreferenceCenter: boolean;
}

type CreateSendRuleType =
    | 'Name'
    | 'EmailAddress'
    | 'DateSubscribed'
    | 'CampaignOpened'
    | 'CampaignClickedAny'
    | 'CampaignClickedSpecific'
    | 'CampaignNotClickedSpecific'
    | 'CampaignOpenedNoClick'
    | 'CampaignNotOpened'
    | AnyString;

interface CreateSendSegmentRule {
    ruleType: CreateSendRuleType;
    clause: string;
}

interface CreateSendSegmentRuleGroup {
    rules: CreateSendSegmentRule[];
}

export {CreateSendCustomFieldType, SubscriberState};
export type {
    CreateSendClient,
    CreateSendAdmin,
    CreateSendSegment,
    CreateSendList,
    CreateSendPerson,
    CreateSendDraftCampaign,
    CreateSendScheduledCampaign,
    CreateSendSentCampaign,
    CreateSendSubscriberDetails,
    CreateSendCustomField,
    CreateSendRuleType,
    CreateSendSegmentRule,
    CreateSendSegmentRuleGroup,
    CreateSendAdminStatus,
};
