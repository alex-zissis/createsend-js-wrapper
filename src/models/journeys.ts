import {
    CampaignRecipientBounce,
    CampaignRecipientClick,
    CampaignRecipientOpen,
    CampaignRecipientUnsubscribe,
} from './campaign.js';
import {PagedRequestOptions} from './generic.js';

type JourneyStatus = 'Not started' | 'Active' | 'Paused';

interface JourneyEmail {
    emailId: string;
    name: string;
    bounced: number;
    clicked: number;
    opened: number;
    sent: number;
    uniqueOpened: number;
    unsubscribed: number;
}

interface JourneyDetails {
    listId: string;
    journeyId: string;
    name: string;
    status: JourneyStatus;
}

interface JourneySummary extends JourneyDetails {
    emails: JourneyEmail[];
    triggerType: 'On Subscription' | 'Enters Segment' | 'Exits Segment' | 'Event'; // todo: confirm values
}

interface JourneyEmailRecipient {
    emailAddress: string;
    /**
     * The sent address in the timezone of the client
     */
    sentDate: string;
}

interface GetJourneyEmailActivityOptions extends PagedRequestOptions {
    date?: string;
}

type JourneyEmailRecipientOpen = Omit<CampaignRecipientOpen, 'listId'>;
type JourneyEmailRecipientClick = Omit<CampaignRecipientClick, 'listId'>;
type JourneyEmailRecipientBounce = Omit<CampaignRecipientBounce, 'listId'>;
type JourneyEmailRecipientUnsubscribe = Omit<CampaignRecipientUnsubscribe, 'listId'>;

export type {
    JourneyStatus,
    JourneyDetails,
    JourneySummary,
    JourneyEmailRecipient,
    GetJourneyEmailActivityOptions,
    JourneyEmailRecipientOpen,
    JourneyEmailRecipientClick,
    JourneyEmailRecipientBounce,
    JourneyEmailRecipientUnsubscribe,
};
