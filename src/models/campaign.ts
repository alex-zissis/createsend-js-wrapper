import {AnyString, PagedRequestOptions} from './generic.js';
import {CreateSendList, CreateSendSegment} from './resources.js';

interface CreateCampaignBase {
    name: string;
    subject: string;
    fromName: string;
    fromEmail: string;
    replyTo: string;
    listIds?: string[];
    segmentIds?: string[];
}

interface CreateCampaignBodyListIds extends CreateCampaignBase {
    listIds: string[];
}

interface CreateCampaignBodySegmentIds extends CreateCampaignBase {
    segmentIds: string[];
}

type CreateCampaignBodyBase = CreateCampaignBodyListIds | CreateCampaignBodySegmentIds;

type CreateDraftCampaignBody = CreateCampaignBodyBase & {
    htmlUrl: string;
    textUrl?: string;
};

interface TemplateContentSingleline {
    content: string;
    href?: string;
}

interface TemplateContentMultiline {
    content: string;
}

interface TemplateContentImage {
    content: string;
    alt?: string;
    href?: string;
}

interface TemplateContentRepeaterItem {
    layout?: string;
    singlelines?: TemplateContentSingleline[];
    multiline?: TemplateContentMultiline[];
    images?: TemplateContentImage[];
}

interface TemplateContentRepeaters {
    items: TemplateContentRepeaterItem[];
}

interface TemplateContent {
    singlelines?: TemplateContentSingleline[];
    multilines?: TemplateContentMultiline[];
    images?: TemplateContentImage[];
    repeaters?: TemplateContentRepeaters;
}

type CreateCampaignFromTemplateBody = CreateCampaignBodyBase & {
    templateId: string;
    templateContent: TemplateContent;
};

interface SendDraftCampaignBody {
    /**
     * An email address (or a maximum of five email addresses in an array) to which we'll send a confirmation email once your campaign has been sent.
     */
    confirmationEmail: string[] | string;
    /**
     * Accepts the string 'Immediately' or a date in the format 'YYYY-MM-DD HH:mm' in the client's current timezone
     */
    sendDate: 'Immediately' | AnyString;
}

interface SendCampaignPreviewBody {
    /**
     * An email address (or a multiple email addresses in an array) that will recieve the preview.
     */
    previewRecipients: string[] | string;
}

interface EmailClientUsage {
    client: string;
    version: string;
    percentage: number;
    subscribers: number;
}

interface CampaignListsAndSegmentsResponse {
    lists: CreateSendList[];
    segments: CreateSendSegment[];
}

interface GetCampaignRecipientsOptions extends PagedRequestOptions {
    orderField?: 'email' | 'list';
}

interface CampaignRecipient {
    emailAddress: string;
    listId: string;
}

interface GetCampaignActivityOptions extends PagedRequestOptions {
    orderField?: 'email' | 'list' | 'date';
    date?: string;
}

interface CampaignRecipientBounce extends CampaignRecipient {
    bounceType: 'Soft' | 'Hard';
    date: string;
    reason: string;
}

interface CampaignRecipientOpen extends CampaignRecipient {
    date: string;
    ipAddress?: string;
    latitude?: number;
    longitude?: number;
    city?: string;
    region?: string;
    countryCode?: string;
    countryName?: string;
}

interface CampaignRecipientClick extends CampaignRecipientOpen {
    url: string;
}

interface CampaignRecipientUnsubscribe extends CampaignRecipient {
    date: string;
    ipAddress: string;
}

interface CampaignRecipientSpamComplaint extends CampaignRecipient {
    date: string;
}

interface CampaignSummary {
    name: string;
    recipients: number;
    totalOpened: number;
    clicks: number;
    unsubscribed: number;
    bounced: number;
    uniqueOpened: number;
    spamComplaints: number;
    webVersionUrl: string;
    webVersionTextUrl: string;
    worldviewUrl: string;
    forwards: number;
    likes: number;
    mentions: number;
}

export type {
    CreateDraftCampaignBody,
    CreateCampaignFromTemplateBody,
    SendDraftCampaignBody,
    SendCampaignPreviewBody,
    EmailClientUsage,
    CampaignListsAndSegmentsResponse,
    GetCampaignRecipientsOptions,
    CampaignRecipient,
    GetCampaignActivityOptions,
    CampaignRecipientBounce,
    CampaignRecipientOpen,
    CampaignRecipientClick,
    CampaignRecipientUnsubscribe,
    CampaignRecipientSpamComplaint,
    CampaignSummary,
};
