# Money Movement

## Setup

### Requirements

- Node v6.9.1+

### Running Demo

- Set ```baseUrl, clientId & clientSecret in config.json```
- Run ```npm install; npm test```

## Sample Usage

```javascript
// GET /money-movement/accounts
getAccounts(function(accountsResponse){
    var accounts = accountsResponse.accounts;
    var capitalOneSavings = accounts.get(0);
});

// POST /money-movement/transfer-requests ACH
let transferRequest = {};
transferRequest.originMoneyMovementAccountReferenceId = "WQE+mwrgBYGUNYXLOolUO7MElxlcLAm2gtZJW2I6MeKC0=";
transferRequest.destinationMoneyMovementAccountReferenceId = "XFhWXJQOVdudjhONmdsOV7QpZE5Ba25ut5pa0N75jjoLJh=";
transferRequest.transferAmount = 1000.45; // Upto 2 decimal places
transferRequest.currencyCode = "USD"; //optional Default: USD
transferRequest.transferDate = "2018-04-15";
transferRequest.memo = "for investments";
transferRequest.transferType = "ACH";
transferRequest.transferFrequency = "OneTime";
initiateTransfer(transferRequest, function(transferResponse) {
    
})

// POST /money-movement/transfer-requests Internal
transferRequest.originMoneyMovementAccountReferenceId = "YHGRB+zRxznmdsOV7QpZE5Ba25ut5nliF486mFhNgk=";
transferRequest.destinationMoneyMovementAccountReferenceId = "XFhWXJQOVdudjhONmdsOV7QpZE5Ba25ut5pa0N75jjoLJh=";
transferRequest.transferType = "Internal";
initiateTransfer(transferRequest, function(transferResponseInternal){
    
});

// GET /money-movement/transfer-requests/{transferRequestId}
let transferRequestId = 100000000941444;
getTransferRequest(transferRequestId, function(transferRequestResponse) {
    
});

// GET /money-movement/transfer-requests
let moneyMovementAccountReferenceId = "XFhWXJQOVdudjhONmdsOV7QpZE5Ba25ut5pa0N75jjoLJh=";
let filters = {};
filters["fromDate"] = "2018-01-01";
filters["toDate"] = "2018-04-30";
filters["transferType"] = "Internal";
filters["transferRequestStatus"] = "Processed";
getTransferRequests(moneyMovementAccountReferenceId, filters, function(transferRequestsResponse){
    
});

// PATCH /money-movement/transfer-requests/{transferRequestId}
moneyMovementService.updateTransferRequest(transferRequestId, "Cancelled", function(updateTransferResponse) {

});
```

## License

MIT License