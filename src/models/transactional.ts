import {ConsentToTrackSubscriber} from './subscribers';

enum TransactionalEmailStatus {
    Draft = 'Draft',
    Active = 'Active',
}

enum TransactionEmailStatusFilter {
    Draft = 'Draft',
    Active = 'Active',
    All = 'All',
}

interface SmartTransactionalEmail {
    id: string;
    name: string;
    createdAt: string;
    status: TransactionalEmailStatus;
}

interface TransactionalOptionsBase {
    clientId?: string;
}

interface GetSmartTransactionalListingOptions extends TransactionalOptionsBase {
    status?: TransactionEmailStatusFilter;
}

interface SmartTransactionalEmailContent {
    html: string;
    text: string;
    emailVariables: string[];
    inlineCss: boolean;
}

interface SmartTransactionalEmailDetailProperties {
    from: string;
    replyTo: string;
    subject: string;
    content: SmartTransactionalEmailContent;
    textPreviewUrl: string;
    htmlPreviewUrl: string;
}

interface SmartTransactionalEmailDetails {
    smartEmailId: string;
    createdAt: string;
    status: TransactionalEmailStatus;
    name: string;
    properties: SmartTransactionalEmailDetailProperties;
    addRecipientsToList: string;
}

interface TransactionalEmailAttachment {
    content: string;
    name: string;
    type: string;
}

interface SendTransactionalEmailBodyBase {
    to: string[];
    cc?: string[] | null;
    bcc?: string[] | null;
    attachments?: TransactionalEmailAttachment[];
    consentToTrack: ConsentToTrackSubscriber;
}

interface SendSmartTransactionalEmailBody extends SendTransactionalEmailBodyBase {
    data?: Record<string, string>;
    addRecipientsToList?: boolean;
}

interface SendClassicTransactionalEmailBody extends SendTransactionalEmailBodyBase {
    subject: string;
    from: string;
    // todo: is this optional? other reply to as well
    replyTo: string;
    html: string;
    text?: string;
    trackOpens?: boolean;
    trackClicks?: boolean;
    inlineCss?: boolean;
    addRecipientsToListId?: string;
    group?: string;
}

type SendTransactionalEmailResponseStatus = 'Accepted'; // todo: Rejected?

interface SendTransactionalEmailResponse {
    status: SendTransactionalEmailResponseStatus;
    messageId: string;
    recipient: string;
}

interface ClassicTransactionalEmailGroup {
    group: string;
    createdAt: string;
}

interface TransactionalEmailStatisticsOptions extends TransactionalOptionsBase {
    smartEmailId?: string;
    group?: string;
    from?: string;
    to?: string;
    timeZone?: string;
}

interface TransactionalEmailStatisticsResponse {
    query: Omit<TransactionalEmailStatisticsOptions, 'clientId'>;
    sent: number;
    bounces: number;
    delivered: number;
    opened: number;
    clicked: number;
}

enum TransactionalEmailDeliveryStatus {
    Delivered = 'Delivered',
    Bounced = 'Bounced',
    Spam = 'Spam',
    All = 'All',
}

interface TransactionalMessageTimelineOptions extends TransactionalOptionsBase {
    status?: TransactionalEmailDeliveryStatus;
    count?: number;
    sentBeforeId?: string;
    sentAfterId?: string;
    smartEmailId?: string;
    group?: string;
}

interface TransactionalMessageTimeline {
    messageId: string;
    status: string; // todo: what are these options? one is 'Sent' and 'Bounced'; bounced has extra options on the object "BounceType": "SBMF", BounceCategory: 'Soft';
    sentAt: string;
    recipient: string;
    from: string;
    subject: string;
    totalOpens: number;
    totalClicks: number;
    canBeResent: boolean;
}

interface Geolocation {
    latitude: number;
    longitude: number;
    city: string;
    region: string;
    countryCode: string;
    countryName: string;
}

interface TransactionalMessageActivityBase {
    emailAddress: string;
    date: string;
    ipAddress: string;
    geolocation: Geolocation;
}

interface MailClient {
    name: 'Apple Mail';
    version: 'Apple Mail 8';
}

interface TransactionalMessageOpen extends TransactionalMessageActivityBase {
    mailClient: MailClient;
}

interface TransactionalMessageClick extends TransactionalMessageActivityBase {
    url: string;
}

interface TransactionalMessageDetailsOptions {
    statistics?: boolean;
    excludeBodyOptions?: boolean;
}

interface TransactionalMessageDetails {
    messageID: string;
    status: TransactionalEmailDeliveryStatus;
    sentAt: string;
    smartEmailId?: string;
    canBeResent: boolean;
    recipient: string;
    message: {
        from: string;
        Subject: string;
        to: string[]; // todo: is this always an array
        cc: string[] | null; // todo: can this be omitted? is it always an array
        bcc: string | null; // todo: can this be omitted? can it be an array
        replyTo: string; // todo: can this be omitted?
        attachments: Array<{name: string; type: string}>;
        // todo: is this present for smart and classic emails?
        body: {
            html: string;
            // todo: is this always present?
            text: string;
        };
        // todo: is this always present?
        data: Record<string, string>;
    };
    totalOpens: number;
    totalClicks: number;
    // are these excluded when the param excludeMessageBody is false?
    opens: TransactionalMessageOpen[];
    clicks: TransactionalMessageClick[];
}

export {TransactionalEmailStatus, TransactionEmailStatusFilter};
export type {
    SmartTransactionalEmail,
    TransactionalOptionsBase,
    GetSmartTransactionalListingOptions,
    SmartTransactionalEmailDetails,
    SendTransactionalEmailBodyBase,
    SendSmartTransactionalEmailBody,
    SendTransactionalEmailResponseStatus,
    SendTransactionalEmailResponse,
    SendClassicTransactionalEmailBody,
    ClassicTransactionalEmailGroup,
    TransactionalEmailStatisticsOptions,
    TransactionalEmailStatisticsResponse,
    TransactionalMessageTimelineOptions,
    TransactionalEmailDeliveryStatus,
    TransactionalMessageTimeline,
    TransactionalMessageDetails,
    TransactionalMessageDetailsOptions,
};
