import {ApiBase, HttpMethod} from '../api-base.js';
import {PagedResponse} from '../models/generic.js';
import {
    JourneyDetails,
    JourneySummary,
    GetJourneyEmailActivityOptions,
    JourneyEmailRecipient,
    JourneyEmailRecipientOpen,
    JourneyEmailRecipientClick,
    JourneyEmailRecipientBounce,
    JourneyEmailRecipientUnsubscribe,
} from '../models/journeys.js';
import {CreateSendResponse} from '../response.js';
import {getPagedRequestQueryParams} from '../utils.js';

class JourneysArea extends ApiBase {
    getJourneys = (clientId: string): Promise<CreateSendResponse<JourneyDetails[]>> =>
        this.makeApiCall(`clients/${clientId}/journeys`);

    getJourneySummary = (journeyId: string): Promise<CreateSendResponse<JourneySummary>> =>
        this.makeApiCall(`journeys/${journeyId}`);

    getJourneyEmailRecipients = (
        journeyEmailId: string,
        options?: GetJourneyEmailActivityOptions
    ): Promise<CreateSendResponse<PagedResponse<JourneyEmailRecipient[]>>> =>
        this.makeApiCall(
            `journeys/email/${journeyEmailId}/recipients`,
            {method: HttpMethod.Get},
            getPagedRequestQueryParams(options)
        );

    getJourneyEmailOpens = (
        journeyEmailId: string,
        options?: GetJourneyEmailActivityOptions
    ): Promise<CreateSendResponse<PagedResponse<JourneyEmailRecipientOpen[]>>> =>
        this.makeApiCall(
            `journeys/email/${journeyEmailId}/opens`,
            {method: HttpMethod.Get},
            getPagedRequestQueryParams(options)
        );

    getJourneyEmailClicks = (
        journeyEmailId: string,
        options?: GetJourneyEmailActivityOptions
    ): Promise<CreateSendResponse<PagedResponse<JourneyEmailRecipientClick[]>>> =>
        this.makeApiCall(
            `journeys/email/${journeyEmailId}/clicks`,
            {method: HttpMethod.Get},
            getPagedRequestQueryParams(options)
        );

    getJourneyEmailBounces = (
        journeyEmailId: string,
        options?: GetJourneyEmailActivityOptions
    ): Promise<CreateSendResponse<PagedResponse<JourneyEmailRecipientBounce[]>>> =>
        this.makeApiCall(
            `journeys/email/${journeyEmailId}/bounces`,
            {method: HttpMethod.Get},
            getPagedRequestQueryParams(options)
        );

    getJourneyEmailUnsubscribes = (
        journeyEmailId: string,
        options?: GetJourneyEmailActivityOptions
    ): Promise<CreateSendResponse<PagedResponse<JourneyEmailRecipientUnsubscribe[]>>> =>
        this.makeApiCall(
            `journeys/email/${journeyEmailId}/unsubscribes`,
            {method: HttpMethod.Get},
            getPagedRequestQueryParams(options)
        );
}

export {JourneysArea};
