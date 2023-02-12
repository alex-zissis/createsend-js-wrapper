interface CreateClientBody {
    companyName: string;
    timeZone: string;
    country: string;
}

interface BillingDetailsResponse {
    credits: number;
}

interface SystemDateResponse {
    systemDate: string;
}

interface AddOrEditAdministratorBody {
    emailAddress: string;
    name: string;
}

interface AddOrEditAdministratorResponse {
    emailAddress: string;
}

interface PrimaryContactResponse {
    emailAddress: string;
}

export type {
    CreateClientBody,
    BillingDetailsResponse,
    SystemDateResponse,
    AddOrEditAdministratorBody,
    AddOrEditAdministratorResponse,
    PrimaryContactResponse,
};
