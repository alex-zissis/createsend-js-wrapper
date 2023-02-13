import {PagedRequestOptions} from './generic.js';

interface ClientBasicDetails {
    clientId: string;
    companyName: string;
    country: string;
    timeZone: string;
    // todo: update in docs
    contactName: string;
    contactEmail: string;
}

interface ClientBillingDetails {
    canPurchaseCredits: boolean;
    credits: number;
    markupOnDesignSpamTest: number;
    clientPays: boolean;
    baseRatePerRecipient: number;
    markupPerRecipient: number;
    markupOnDelivery: number;
    baseDeliveryRate: number;
    currency: string;
    baseDesignSpamTestRate: number;
}

interface ClientDetails {
    apiKey: string;
    basicDetails: ClientBasicDetails;
    billingDetails: ClientBillingDetails;
}

interface GetSuppressionListOptions extends PagedRequestOptions {
    orderField?: 'email' | 'date';
}

interface SuppressionListEntry {
    suppressionReason: 'Bounced' | 'Unsubscribed';
    emailAddress: string;
    date: string;
    state: 'Suppressed';
}

interface CreateSendTemplate {
    templateId: string;
    name: string;
    previewUrl: string;
    screenshotUrl: string;
}

type SupportedCurrency = 'AUD' | 'USD' | 'EUR' | 'GBP' | 'CAD' | 'NZD';

interface PaygBillingDetails {
    currency: SupportedCurrency;
    canPurchaseCredits: boolean;
    clientPays: boolean;
    markupPercentage: number;
    markupOnDelivery?: number;
    markupPerRecipient?: number;
    markupOnDesignSpamTest?: number;
}

// todo: update in docs. premier is valid
type MonthlyScheme = 'Basic' | 'Unlimited' | 'Premier';

interface MonthlyBillingDetails {
    currency: SupportedCurrency;
    clientPays: boolean;
    markupPercentage: number;
    monthlyScheme?: MonthlyScheme;
}

interface TransferCreditsBody {
    credits: number;
    canUseMyCreditsWhenTheyRunOut: boolean;
}

interface TransferCreditsResponse {
    accountCredits: number;
    clientCredits: number;
}

interface AddOrEditPersonBody {
    emailAddress: string;
    name: string;
    accessLevel: number; // todo: make this a flag enum?
    password: string;
}

interface AddOrEditPersonResponse {
    emailAddress: string;
}

interface CreateSendCampaignTag {
    name: string;
    numberOfCampaigns: number;
}

interface GetSentCampaignsOptions extends PagedRequestOptions {
    tags?: string[];
    sentFromDate?: string;
    sentToDate?: string;
}

export type {
    ClientDetails,
    GetSuppressionListOptions,
    SuppressionListEntry,
    CreateSendTemplate,
    PaygBillingDetails,
    MonthlyBillingDetails,
    TransferCreditsBody,
    TransferCreditsResponse,
    AddOrEditPersonBody,
    AddOrEditPersonResponse,
    CreateSendCampaignTag,
    GetSentCampaignsOptions,
};
