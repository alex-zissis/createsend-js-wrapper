# @createsend/client

A modern promise-based wrapper for the [CreateSend API](https://www.campaignmonitor.com/api/), written in TypeScript.

**This package is compatible with the latest version (v3.3) of the CreateSend API.**

It will be updated for versions going forward, but may not be compatible with previous versions.

## Getting started

### Installation
#### Node 18+

We try to use the native Node fetch API in Node 18 to keep the dependencies to a minimum. If you are using Node 18+ (or using Node 16.15+/17.15+ with the `--experimental-fetch` flag) you can install `@createsend/client` like you would any other NPM package.

**Yarn**
```
> yarn add @createsend/client
```

you can also safely run (which will ensure the optional dependency `node-fetch` is ignored)
```
> yarn add --ignore-optional @createsend/client
```

**NPM**
```
> npm install @createsend/client
```

#### Older Node Versions (incl. 12, 14, 16)

The native fetch API is not included in older versions of Node. To use this package, all you need to do is have `node-fetch` installed in your project as well. `node-fetch` is listed as an optional dependency of this project, so your npm client *should* resolve and install it by default. But to be extra safe it's recommended to explicitly install `node-fetch` as a dependency also. We specify `node-fetch@^2.6.9` as the newer `node-fetch@3` has dropped support for CJS. If you are using ESM in your project you can safely install the latest version of `node-fetch`. If you don't know what that means, install the version shown below.

**Yarn**
```
> yarn add @createsend/client node-fetch@^2.6.9
```

**NPM**
```
> npm install @createsend/client node-fetch@^2.6.9
```

For a full example of a project setup with an older Node version see the [node-fetch](./samples/node-fetch/) sample.

### Usage

Instatiate an instance of the api by specifying your ApiKey (either the account-wide or client-specific key).

```ts
import {CreateSend, CreateSendErrorCode} from '@createsend/client';

const apiKey = process.env.CM_API_KEY ?? '';
const createSend = CreateSend({apiKey}); // same as CreateSend({apiKey, version: 'v3.3'});

const clientsResponse = await createSend.account.getClients();
if (!clientsReponse.success) {
    if (countriesResponse.data.code === CreateSendErrorCode.InvalidOAuthToken) {
        console.log('That\'s the wrong token!');
        process.exit(1);
    }

    console.log(`unknown error: ${countriesResponse.data.message}`, countriesResponse.data.code);
    process.exit(1);
}

console.log(clientsResponse.data) // [{"clientId": "a1a1a1", "name": "Bob's Burgers"}, {"clientId": "b1b1b1", "name": "Bob's Marketing Agency"}] ;
```

#### Handling Responses

All methods will return a `CreateSendResponse`. All responses have 2 properties: `success` (boolean) and `status` (number). `success = true` indicates the request recieved a response with a 2xx status code (the actual status code will be surfaced in the `status`) value.

There are 2 types of `CreateSendResponse` - `CreateSendSuccessResponse` and `CreateSendErrorResponse`. 

If `CreateSendResponse.success` is `true`, `CreateSendResponse.data` will have the JSON response from the server if provided (some routes such as deleting / updating a resource don't have a response).

If `CreateSendResponse.success` is `false`, `CreateSendResponse.data` will be an object consisting of 2 fields `code` and `message`. `code` is an enum value `CreateSendErrorCode`. It can be used to handle specific server side errors. A full list of errors can be found in the API Documentation.

```ts
const createClient = async () => {
    const createClientResponse = await createSend.clients.create({timeZone: 'Australia',
        country: '(GMT+10:00) Canberra, Melbourne, Sydney'});

    // first check if the response was successful. If you are using TypeScript, it won't let you access the `createClientResponse.data` value without this check.
    if (!createClientResponse.success) {
        // handle any specific errors like this
        if (createClientResponse.data.code === CreateSendErrorCode.EmptyCompanyName) {
            console.log('Company name not provided');
            return;
        }

        console.log(`unknown error: ${countriesResponse.data.message}`, countriesResponse.data.code);
        return;
    }

    // if we get here, the call was successful! we can now access the clientId at `createClientResponse.data`;
    console.log(`Client created. ClientId = ${createClientResponse.data}`);
}


```

See more usage examples in the [samples](./samples/) directory.

## Not supported
- OAuth authentication. The wrapper only supports Api Key authentication. Support for Oauth authentication is planned for a future update.
- Frameable endpoints

All other routes documented at https://www.campaignmonitor.com/api/ are supported.
