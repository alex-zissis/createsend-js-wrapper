import {ApiBase, HttpMethod} from '../api-base.js';
import {
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
} from '../models/campaign.js';
import {PagedResponse} from '../models/generic.js';
import {CreateSendResponse} from '../response.js';
import {getPagedRequestQueryParams} from '../utils.js';

class CampaignsArea extends ApiBase {
    createDraftCampaign = (clientId: string, body: CreateDraftCampaignBody): Promise<CreateSendResponse<string>> =>
        this.makeApiCall(`campaigns/${clientId}`, {method: HttpMethod.Post, body});

    createCampaignFromTemplate = (
        clientId: string,
        body: CreateCampaignFromTemplateBody
    ): Promise<CreateSendResponse<string>> =>
        this.makeApiCall(`campaigns/${clientId}/fromtemplate`, {method: HttpMethod.Post, body});

    sendDraftCampaign = (campaignId: string, body: SendDraftCampaignBody): Promise<CreateSendResponse<void>> => {
        if (Array.isArray(body.confirmationEmail)) {
            body.confirmationEmail = body.confirmationEmail.slice(0, 4).join(' ');
        }

        return this.makeApiCall(`campaigns/${campaignId}/send`, {method: HttpMethod.Post, body});
    };

    sendCampaignPreview = (campaignId: string, body: SendCampaignPreviewBody): Promise<CreateSendResponse<void>> => {
        if (!Array.isArray(body.previewRecipients)) {
            body.previewRecipients = [body.previewRecipients];
        }

        return this.makeApiCall(`campaigns/${campaignId}/sendpreview`, {method: HttpMethod.Post, body});
    };

    getCampaignEmailClientUsage = (campaignId: string): Promise<CreateSendResponse<EmailClientUsage[]>> =>
        this.makeApiCall(`campaigns/${campaignId}/emailclientusage`);

    // does this always give both lists and segments
    getCampaignListsAndSegments = (campaignId: string): Promise<CreateSendResponse<CampaignListsAndSegmentsResponse>> =>
        this.makeApiCall(`campaigns/${campaignId}/listsandsegments`);

    getCampaignRecipients = (
        campaignId: string,
        options?: GetCampaignRecipientsOptions
    ): Promise<CreateSendResponse<PagedResponse<CampaignRecipient[]>>> =>
        this.makeApiCall(
            `campaigns/${campaignId}/recipients`,
            {method: HttpMethod.Get},
            getPagedRequestQueryParams(options)
        );

    getCampaignBounces = (
        campaignId: string,
        options?: GetCampaignActivityOptions
    ): Promise<CreateSendResponse<PagedResponse<CampaignRecipientBounce[]>>> =>
        this.makeApiCall(
            `campaigns/${campaignId}/bounces`,
            {method: HttpMethod.Get},
            getPagedRequestQueryParams(options)
        );

    getCampaignOpens = (
        campaignId: string,
        options?: GetCampaignActivityOptions
    ): Promise<CreateSendResponse<PagedResponse<CampaignRecipientOpen[]>>> =>
        this.makeApiCall(
            `campaigns/${campaignId}/opens`,
            {method: HttpMethod.Get},
            getPagedRequestQueryParams(options)
        );

    getCampaignClicks = (
        campaignId: string,
        options?: GetCampaignActivityOptions
    ): Promise<CreateSendResponse<PagedResponse<CampaignRecipientClick[]>>> =>
        this.makeApiCall(
            `campaigns/${campaignId}/clicks`,
            {method: HttpMethod.Get},
            getPagedRequestQueryParams(options)
        );

    getCampaignUnsubscribes = (
        campaignId: string,
        options?: GetCampaignActivityOptions
    ): Promise<CreateSendResponse<PagedResponse<CampaignRecipientUnsubscribe[]>>> =>
        this.makeApiCall(
            `campaigns/${campaignId}/unsubscribes`,
            {method: HttpMethod.Get},
            getPagedRequestQueryParams(options)
        );

    getSpamComplaints = (
        campaignId: string,
        options?: GetCampaignActivityOptions
    ): Promise<CreateSendResponse<PagedResponse<CampaignRecipientSpamComplaint[]>>> =>
        this.makeApiCall(
            `campaigns/${campaignId}/unsubscribes`,
            {method: HttpMethod.Get},
            getPagedRequestQueryParams(options)
        );

    deleteCampaign = (campaignId: string): Promise<CreateSendResponse<void>> =>
        this.makeApiCall(`campaigns/${campaignId}`, {method: HttpMethod.Delete});

    unscheduleCampaign = (campaignId: string): Promise<CreateSendResponse<void>> =>
        this.makeApiCall(`campaigns/${campaignId}/unschedule`, {method: HttpMethod.Post});

    getCampaignSummary = (campaignId: string): Promise<CreateSendResponse<CampaignSummary>> =>
        this.makeApiCall(`campaigns/${campaignId}/summary`);
}

export {CampaignsArea};
