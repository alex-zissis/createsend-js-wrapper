import {ConsentToTrackSubscriber} from './subscribers';

enum TransactionalEmailStatus {
    Draft = 'draft',
    Active = 'active',
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
    replyTo: string;
    html: string;
    text?: string;
    trackOpens?: boolean;
    trackClicks?: boolean;
    inlineCss?: boolean;
    addRecipientsToListId?: string;
    group?: string;
}

type SendTransactionalEmailResponseStatus = 'Accepted' | 'Rejected';

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
    group?: string;
}

interface TransactionalMessageTimeline {
    messageId: string;
    status: string;
    recipient: string;
    from: string;
    subject: string;
    totalOpens: number;
    totalClicks: number;
    canBeResent: boolean;
    group: string;
    bounceType?: string;
    bounceCategory?: string;
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
        to: string[];
        cc: string[] | null;
        bcc: string | null;
        replyTo: string;
        attachments: Array<{name: string; type: string}>;
        body: {
            html: string;
            text: string;
        };
        data: Record<string, string>;
    };
    totalOpens: number;
    totalClicks: number;
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
