import {BaseArea, HttpMethod} from './base.js';
import {CreateClientBody, PrimaryContactResponse} from '../models/account.js';
import {
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
} from '../models/client.js';
import {PagedResponse} from '../models/generic.js';
import {
    CreateSendList,
    CreateSendSubscriberDetails,
    CreateSendSegment,
    CreateSendPerson,
    CreateSendSentCampaign,
    CreateSendScheduledCampaign,
    CreateSendDraftCampaign,
} from '../models/resources.js';
import {CreateSendResponse} from '../response.js';
import {getPagedRequestQueryParams} from '../utils.js';

class ClientsArea extends BaseArea {
    create = (body: CreateClientBody): Promise<CreateSendResponse<string>> =>
        this.makeApiCall('clients', {method: HttpMethod.Post, body});

    setBasicDetails = (body: CreateClientBody): Promise<CreateSendResponse<void>> =>
        this.makeApiCall('clients', {method: HttpMethod.Put, body});

    getDetails = (clientId: string): Promise<CreateSendResponse<ClientDetails>> =>
        this.makeApiCall(`clients/${clientId}`);

    getLists = (clientId: string): Promise<CreateSendResponse<CreateSendList[]>> =>
        this.makeApiCall(`clients/${clientId}/lists`);

    getListsForEmail = (clientId: string, email: string): Promise<CreateSendResponse<CreateSendSubscriberDetails[]>> =>
        this.makeApiCall(`clients/${clientId}/listsforemail`, {method: HttpMethod.Get}, new URLSearchParams({email}));

    getSegments = (clientId: string): Promise<CreateSendResponse<CreateSendSegment>> =>
        this.makeApiCall(`clients/${clientId}/segments`);

    getSuppressionList = (
        clientId: string,
        options?: GetSuppressionListOptions
    ): Promise<CreateSendResponse<PagedResponse<SuppressionListEntry[]>>> =>
        this.makeApiCall(
            `clients/${clientId}/suppressionlist`,
            {method: HttpMethod.Get},
            getPagedRequestQueryParams(options)
        );

    suppressEmailAddresses = (clientId: string, emails: string[]): Promise<CreateSendResponse<void>> =>
        this.makeApiCall(`clients/${clientId}/suppress`, {method: HttpMethod.Post, body: {emails}});

    unsuppressEmailAddresses = (clientId: string, email: string): Promise<CreateSendResponse<void>> =>
        this.makeApiCall(`clients/${clientId}/unsuppress`, {method: HttpMethod.Post}, new URLSearchParams({email}));

    getTemplates = (clientId: string): Promise<CreateSendResponse<CreateSendTemplate[]>> =>
        this.makeApiCall(`clients/${clientId}/templates`);

    setPayBilling = (clientId: string, body: PaygBillingDetails): Promise<CreateSendResponse<void>> =>
        this.makeApiCall(`clients/${clientId}/setpaygbilling`, {method: HttpMethod.Put, body});

    setMonthlyBillingDetails = (clientId: string, body: MonthlyBillingDetails): Promise<CreateSendResponse<void>> =>
        this.makeApiCall(`clients/${clientId}/setmonthlybilling`, {method: HttpMethod.Put, body});

    transferCredits = (
        clientId: string,
        body: TransferCreditsBody
    ): Promise<CreateSendResponse<TransferCreditsResponse>> =>
        this.makeApiCall(`clients/${clientId}/credits`, {method: HttpMethod.Post, body});

    deleteClient = (clientId: string): Promise<CreateSendResponse<void>> =>
        this.makeApiCall(`clients/${clientId}`, {method: HttpMethod.Delete});

    addPerson = (clientId: string, body: AddOrEditPersonBody): Promise<CreateSendResponse<AddOrEditPersonResponse>> =>
        this.makeApiCall(`clients/${clientId}/people`, {method: HttpMethod.Post, body});

    updatePerson = (
        clientId: string,
        body: AddOrEditPersonBody
    ): Promise<CreateSendResponse<AddOrEditPersonResponse>> =>
        this.makeApiCall(`clients/${clientId}/people`, {method: HttpMethod.Put, body});

    getPerson = (clientId: string, email: string): Promise<CreateSendResponse<CreateSendPerson>> =>
        this.makeApiCall(`clients/${clientId}/people`, {method: HttpMethod.Get}, new URLSearchParams({email}));

    getPeople = (clientId: string): Promise<CreateSendResponse<CreateSendPerson[]>> =>
        this.makeApiCall(`clients/${clientId}/people`);

    deletePerson = (clientId: string, email: string): Promise<CreateSendResponse<void>> =>
        this.makeApiCall(`clients/${clientId}/people`, {method: HttpMethod.Delete}, new URLSearchParams({email}));

    getPrimaryContact = (clientId: string, email: string): Promise<CreateSendResponse<PrimaryContactResponse>> =>
        this.makeApiCall(`clients/${clientId}/primarycontact`, {method: HttpMethod.Get}, new URLSearchParams({email}));

    setPrimaryContact = (clientId: string, email: string): Promise<CreateSendResponse<PrimaryContactResponse>> =>
        this.makeApiCall(`clients/${clientId}/primarycontact`, {method: HttpMethod.Put}, new URLSearchParams({email}));

    getTags = (clientId: string): Promise<CreateSendResponse<CreateSendCampaignTag[]>> =>
        this.makeApiCall(`clients/${clientId}/tags`);

    getSentCampaigns = (
        clientId: string,
        options?: GetSentCampaignsOptions
    ): Promise<CreateSendResponse<PagedResponse<CreateSendSentCampaign[]>>> =>
        this.makeApiCall(
            `clients/${clientId}/campaigns`,
            {method: HttpMethod.Get},
            getPagedRequestQueryParams({
                ...options,
                tags: options?.tags?.join(','),
                orderDirection: options?.orderDirection ?? 'desc',
            })
        );

    getScheduledCampaigns = (clientId: string): Promise<CreateSendResponse<CreateSendScheduledCampaign[]>> =>
        this.makeApiCall(`clients/${clientId}/scheduled`);

    getDraftCampaigns = (clientId: string): Promise<CreateSendResponse<CreateSendDraftCampaign[]>> =>
        this.makeApiCall(`clients/${clientId}/drafts`);
}

export {ClientsArea};
