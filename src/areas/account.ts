import {BaseArea, HttpMethod} from './base.js';
import {
    BillingDetailsResponse,
    SystemDateResponse,
    AddOrEditAdministratorBody,
    AddOrEditAdministratorResponse,
    PrimaryContactResponse,
} from '../models/account.js';
import {CreateSendClient, CreateSendAdmin} from '../models/resources.js';
import {CreateSendResponse} from '../response.js';

class AccountArea extends BaseArea {
    getClients = (): Promise<CreateSendResponse<CreateSendClient[]>> => this.makeApiCall('clients');

    getBillingDetails = (): Promise<CreateSendResponse<BillingDetailsResponse>> => this.makeApiCall('billingdetails');

    getCountries = (): Promise<CreateSendResponse<string[]>> => this.makeApiCall('countries');

    getTimezones = (): Promise<CreateSendResponse<SystemDateResponse>> => this.makeApiCall('timezones');

    addAdministrator = (
        body: AddOrEditAdministratorBody
    ): Promise<CreateSendResponse<AddOrEditAdministratorResponse>> =>
        this.makeApiCall('admins', {method: HttpMethod.Post, body});

    editAdministrator = (
        body: AddOrEditAdministratorBody,
        existingEmail: string
    ): Promise<CreateSendResponse<AddOrEditAdministratorResponse>> =>
        this.makeApiCall('admins', {method: HttpMethod.Put, body}, new URLSearchParams({email: existingEmail}));

    getAdministrators = (): Promise<CreateSendResponse<CreateSendAdmin[]>> => this.makeApiCall('admins');

    getAdministrator = (email: string): Promise<CreateSendResponse<CreateSendAdmin>> =>
        this.makeApiCall('admins', {method: HttpMethod.Get}, new URLSearchParams({email}));

    deleteAdministrator = (email: string): Promise<CreateSendResponse<void>> =>
        this.makeApiCall('admins', {method: HttpMethod.Delete}, new URLSearchParams({email}));

    getPrimaryContact = (): Promise<CreateSendResponse<PrimaryContactResponse>> =>
        this.makeApiCall('primarycontact', {method: HttpMethod.Get});

    setPrimaryContact = (email: string): Promise<CreateSendResponse<PrimaryContactResponse>> =>
        this.makeApiCall('primarycontact', {method: HttpMethod.Put}, new URLSearchParams({email}));
}

export {AccountArea};
