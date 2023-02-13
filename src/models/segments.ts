import {CreateSendSegmentRuleGroup} from './resources.js';

interface CreateSegmentBody {
    title: string;
    ruleGroups: CreateSendSegmentRuleGroup[];
}

interface UpdateSegmentBody {
    title: string;
    ruleGroups?: CreateSendSegmentRuleGroup[];
}

interface SegmentDetails {
    activeSubscribers: number;
    ruleGroups: CreateSendSegmentRuleGroup[];
    listId: string;
    segmentId: string;
    title: string;
}

export type {CreateSegmentBody, UpdateSegmentBody, SegmentDetails};
