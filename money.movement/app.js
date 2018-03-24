var moneyMovementService = require('./money-movement-service');
 
var http = require('http');  

http.createServer(function(req, res) {  
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.write('<!doctype html>\n<html lang="en">\n' + 
    '\n<meta charset="utf-8">\n<title>Test web page on node.js</title>\n' + 
    '<style type="text/css">* {font-family:arial, sans-serif;}</style>\n' + 
    '\n\n<h1>Euro 2012 teams</h1>\n' + 
    '<div id="content"><p>The teams in Group D for Euro 2012 are:</p><ul><li>England</li><li>France</li><li>Sweden</li><li>Ukraine</li></ul></div>' + 
    '\n\n');
  res.end();
}).listen(8888, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8888');

var transfer;

// GET /money-movement/accounts
moneyMovementService.getAccounts(function(accountsResponse) {
    var accounts = accountsResponse.accounts;
    var fountainAccount = accounts.find(account => account.accountNickname == "My fav savings");
    var userAccount = accounts.find(account => account.accountNickname == "My fav checking");
    console.log(fountainAccount.availableBalance);
    saveMoney(userAccount, fountainAccount);
});

function saveMoney(userAccount, fountainAccount) {
    // POST /money-movement/transfer-requests ACH
    let transferRequest = {};
    transferRequest.originMoneyMovementAccountReferenceId = userAccount.moneyMovementAccountReferenceId;    
    transferRequest.destinationMoneyMovementAccountReferenceId = fountainAccount.moneyMovementAccountReferenceId;   
    transferRequest.transferAmount = 1; 
    transferRequest.currencyCode = "USD"; 
    transferRequest.memo = "Wishing fountain savings";
    transferRequest.transferDate = new Date().toISOString().slice(0, 10);
    transferRequest.transferType = "Internal";
    transferRequest.transferFrequency = "OneTime";
    moneyMovementService.initiateTransfer(transferRequest, function(transferResponse) {
        transfer = transferResponse;
        checkStatus(transfer);
    });
}

function checkStatus(transferRequest) {
    // GET /money-movement/transfer-requests/{transferRequestId}
    if (!transferRequest) return;

    let transferRequestId = transferRequest.transferRequestId;
    moneyMovementService.getTransferRequest(transferRequestId, function(transferRequestResponse) {
        console.log(transferRequestResponse.transferRequestStatus)
    });

    moneyMovementService.getAccounts(function(accountsResponse) {
        var accounts = accountsResponse.accounts;
        var fountainAccount = accounts.find(account => account.accountNickname == "My fav savings");
        var userAccount = accounts.find(account => account.accountNickname == "My fav checking");
        console.log(fountainAccount.availableBalance);
    });
}



// // GET /money-movement/transfer-requests
// let moneyMovementAccountReferenceId = "XFhWXJQOVdudjhONmdsOV7QpZE5Ba25ut5pa0N75jjoLJh=";
// let filters = {};
// filters["fromDate"] = "2018-01-01";
// filters["toDate"] = "2018-04-30";
// filters["transferType"] = "Internal";
// filters["transferRequestStatus"] = "Processed";
// getTransferRequests(moneyMovementAccountReferenceId, filters, function(transferRequestsResponse){
    
// });

// // PATCH /money-movement/transfer-requests/{transferRequestId}
// moneyMovementService.updateTransferRequest(transferRequestId, "Cancelled", function(updateTransferResponse) {

// });
