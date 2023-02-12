import {ApiBase, HttpMethod} from '../api-base.js';
import {
    ClassicTransactionalEmailGroup,
    GetSmartTransactionalListingOptions,
    SendClassicTransactionalEmailBody,
    SendSmartTransactionalEmailBody,
    SendTransactionalEmailBodyBase,
    SendTransactionalEmailResponse,
    SmartTransactionalEmail,
    SmartTransactionalEmailDetails,
    TransactionalEmailStatisticsOptions,
    TransactionalEmailStatisticsResponse,
    TransactionalMessageDetails,
    TransactionalMessageDetailsOptions,
    TransactionalMessageTimeline,
    TransactionalMessageTimelineOptions,
    TransactionalOptionsBase,
} from '../models/transactional.js';
import {CreateSendResponse} from '../response.js';
import {getQueryParams} from '../utils.js';

class TransactionalArea extends ApiBase {
    private prepareBodyForTransactionalSend = <T extends SendTransactionalEmailBodyBase>(body: T) => {
        if (typeof body.bcc === 'undefined') {
            body.bcc = null;
        }

        if (typeof body.cc === 'undefined') {
            body.cc = null;
        }

        return body;
    };

    getSmartTransactionalEmailList = (
        options: GetSmartTransactionalListingOptions = {}
    ): Promise<CreateSendResponse<SmartTransactionalEmail[]>> =>
        this.makeApiCall(
            `transactional/smartEmail`,
            {method: HttpMethod.Get},
            getQueryParams({clientID: options.clientId, ...options})
        );

    getSmartTransactionEmailDetails = (
        smartEmailId: string
    ): Promise<CreateSendResponse<SmartTransactionalEmailDetails>> =>
        this.makeApiCall(`transactional/smartEmail/${smartEmailId}`);

    sendSmartTransactionalEmail = (
        smartEmailId: string,
        body: SendSmartTransactionalEmailBody
    ): Promise<CreateSendResponse<SendTransactionalEmailResponse[]>> => {
        body = this.prepareBodyForTransactionalSend(body);

        return this.makeApiCall(`/transactional/smartEmail/${smartEmailId}/send`, {method: HttpMethod.Post, body});
    };

    sendClassicTransactionalEmail = (
        body: SendClassicTransactionalEmailBody,
        options?: TransactionalOptionsBase
    ): Promise<CreateSendResponse<SendTransactionalEmailResponse[]>> => {
        body = this.prepareBodyForTransactionalSend(body);

        return this.makeApiCall(
            `/transactional/classicEmail/send`,
            {method: HttpMethod.Post, body},
            getQueryParams({clientID: options?.clientId})
        );
    };

    getClassicTransactionEmailGroupList = (
        options?: TransactionalOptionsBase
    ): Promise<CreateSendResponse<ClassicTransactionalEmailGroup[]>> =>
        this.makeApiCall(
            `transactional/classicEmail/groups`,
            {method: HttpMethod.Get},
            getQueryParams({clientID: options?.clientId})
        );

    getTransactionalEmailStatistics = (
        options?: TransactionalEmailStatisticsOptions
    ): Promise<CreateSendResponse<TransactionalEmailStatisticsResponse>> =>
        this.makeApiCall(
            'transactional/statistics',
            {method: HttpMethod.Get},
            getQueryParams({clientID: options?.clientId, smartEmailID: options?.smartEmailId, ...options})
        );

    getMessageTimeline = (
        options?: TransactionalMessageTimelineOptions
    ): Promise<CreateSendResponse<TransactionalMessageTimeline[]>> =>
        this.makeApiCall(
            'transactional/messages',
            {method: HttpMethod.Get},
            getQueryParams({
                clientID: options?.clientId,
                sentBeforeID: options?.sentBeforeId,
                smartEmailID: options?.smartEmailId,
                sentAfterID: options?.sentAfterId,
                ...options,
            })
        );

    getMessageDetails = (
        messageId: string,
        options?: TransactionalMessageDetailsOptions
    ): Promise<CreateSendResponse<TransactionalMessageDetails>> =>
        this.makeApiCall(`transactional/messages/${messageId}`, {method: HttpMethod.Get}, getQueryParams({...options}));

    resendMessage = (messageId: string): Promise<CreateSendResponse<SendTransactionalEmailResponse>> =>
        this.makeApiCall(`transactional/messages/${messageId}/resend`, {method: HttpMethod.Post});
}

export {TransactionalArea};
