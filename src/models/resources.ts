interface CreateSendClient {
    name: string;
    clientId: string;
}

interface CreateSendAdmin {
    name: string;
    emailAddress: string;
    status: string;
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
    name: string;
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
    campaignID: string;
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
};
