interface TemplateDetails {
    templateId: string;
    name: string;
    previewUrl: string;
    screenshotUrl: string;
}

interface CreateOrUpdateTemplateBody {
    name: string;
    htmlPageUrl: string;
    // todo: is this required?
    zipFileUrl: string;
}

export type {TemplateDetails, CreateOrUpdateTemplateBody};
