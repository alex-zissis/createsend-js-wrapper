import {PagedResponse} from '../models/generic.js';
import {GetSubscribersOptions, SubscriberSummary} from '../models/lists.js';
import {CreateSendSegmentRuleGroup} from '../models/resources.js';
import {CreateSegmentBody, SegmentDetails, UpdateSegmentBody} from '../models/segments.js';
import {CreateSendResponse} from '../response.js';
import {getPagedRequestQueryParams} from '../utils.js';
import {BaseArea, HttpMethod} from './base.js';

class SegmentsArea extends BaseArea {
    // todo: is this a createsend response OR a detailed segment response. or is it always detailed
    /**
     * @returns the id of the new segment created
     */
    createSegment = (listId: string, body: CreateSegmentBody): Promise<CreateSendResponse<string>> =>
        this.makeApiCall(`segments/${listId}`, {method: HttpMethod.Post, body});

    updateSegment = (segmentId: string, body: UpdateSegmentBody): Promise<CreateSendResponse<void>> =>
        this.makeApiCall(`segments/${segmentId}`, {method: HttpMethod.Put, body});

    addRuleGroupToSegment = (segmentId: string, body: CreateSendSegmentRuleGroup): Promise<CreateSendResponse<void>> =>
        this.makeApiCall(`segments/${segmentId}/rules`, {method: HttpMethod.Post, body});

    getSegmentDetails = (segmentId: string): Promise<CreateSendResponse<SegmentDetails>> =>
        this.makeApiCall(`segments/${segmentId}`);

    deleteSegment = (segmentId: string): Promise<CreateSendResponse<void>> =>
        this.makeApiCall(`segments/${segmentId}`, {method: HttpMethod.Delete});

    deleteSegmentRules = (segmentId: string): Promise<CreateSendResponse<void>> =>
        this.makeApiCall(`segments/${segmentId}/rules`, {method: HttpMethod.Delete});

    getActiveSubscribers = (
        segmentId: string,
        options?: GetSubscribersOptions
    ): Promise<CreateSendResponse<PagedResponse<SubscriberSummary[]>>> =>
        this.makeApiCall(`segments/${segmentId}/active`, {method: HttpMethod.Get}, getPagedRequestQueryParams(options));
}

export {SegmentsArea};
