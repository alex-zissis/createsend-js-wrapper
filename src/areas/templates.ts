import {BaseArea, HttpMethod} from './base.js';
import {CreateOrUpdateTemplateBody, TemplateDetails} from '../models/templates.js';
import {CreateSendResponse} from '../response.js';

class TemplatesArea extends BaseArea {
    getTemplateDetails = (templateId: string): Promise<CreateSendResponse<TemplateDetails>> =>
        this.makeApiCall(`templates/${templateId}`);

    /**
     * @returns the id of the created template
     */
    createTemplate = (clientId: string, body: CreateOrUpdateTemplateBody): Promise<CreateSendResponse<string>> =>
        this.makeApiCall(`templates/${clientId}`, {method: HttpMethod.Post, body});

    updateTemplate = (templateId: string, body: CreateOrUpdateTemplateBody): Promise<CreateSendResponse<void>> =>
        this.makeApiCall(`templates/${templateId}`, {method: HttpMethod.Put, body});

    deleteTemplate = (templateId: string): Promise<CreateSendResponse<void>> =>
        this.makeApiCall(`templates/${templateId}`, {method: HttpMethod.Delete});
}

export {TemplatesArea};
