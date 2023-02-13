const {CreateSend, CreateSendErrorCode} = require('@createsend/client');

const apiKey = process.env.CM_API_KEY ?? '';
const createSend = CreateSend({apiKey});

createSend.account.getCountries().then(countriesResponse => {
    if (!countriesResponse.success) {
        if (countriesResponse.data.code === CreateSendErrorCode.InvalidOAuthToken) {
            console.log('That\'s the wrong token!');
        }
        else if (countriesResponse.data.code === CreateSendErrorCode.InternalServerError) {
            console.log("Oh no!", countriesResponse.data.message);
        } else {
            console.log("other error", countriesResponse.data.code, countriesResponse.data.message);
        }
    
        return;
    }
    
    console.log(countriesResponse.data);
});
