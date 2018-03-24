/*
 *
 *  SPDX-Copyright: Copyright 2018 Capital One Services, LLC
 *  SPDX-License-Identifier: Apache-2.0
 *  Copyright 2018 Capital One Services, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and limitations under the License.
 *
 */

var assert = require('assert');
var moneyMovementService = require('../money-movement-service');

describe('Money Movement Service', function() {

    var transferRequestId;

    //GET /money-movement/accounts
    it('Get Accounts', function(done) {
        moneyMovementService.getAccounts(function(accountsResponse) {
            assert.equal(accountsResponse.accounts.length, 4);
            done();
        });
    });

    //POST /money-monevement/transfer-requests
    it('Post Transfer Request', function(done) {
        let transferRequest = {};
        transferRequest.originMoneyMovementAccountReferenceId = "WQE+mwrgBYGUNYXLOolUO7MElxlcLAm2gtZJW2I6MeKC0=";
        transferRequest.destinationMoneyMovementAccountReferenceId = "XFhWXJQOVdudjhONmdsOV7QpZE5Ba25ut5pa0N75jjoLJh=";
        transferRequest.transferAmount = 1000.45;
        transferRequest.currencyCode = "USD";
        transferRequest.transferDate = new Date().toISOString().slice(0, 10);
        transferRequest.memo = "for investments";
        transferRequest.transferType = "ACH";
        transferRequest.transferFrequency = "OneTime";
        moneyMovementService.initiateTransfer(transferRequest, function(transferResponse) {
            assert.equal(transferResponse.transferRequestStatus, 'Scheduled');
            transferRequestId = transferResponse.transferRequestId;
            done();
        });
    });

    it('Post Transfer Request', function(done) {
        let transferRequest = {};
        transferRequest.originMoneyMovementAccountReferenceId = "YHGRB+zRxznmdsOV7QpZE5Ba25ut5nliF486mFhNgk=";
        transferRequest.destinationMoneyMovementAccountReferenceId = "XFhWXJQOVdudjhONmdsOV7QpZE5Ba25ut5pa0N75jjoLJh=";
        transferRequest.transferAmount = 1000.0;
        transferRequest.currencyCode = "USD";
        transferRequest.transferDate = new Date().toISOString().slice(0, 10);
        transferRequest.memo = "for investments";
        transferRequest.transferType = "Internal";
        transferRequest.transferFrequency = "OneTime";
        moneyMovementService.initiateTransfer(transferRequest, function(transferResponse) {
            assert.equal(transferResponse.transferRequestStatus, 'Scheduled');
            done();
        });
    });

    //GET /money-movement/transfer-requests/{transferRequestId}
    it('Get Transfer Request', function(done) {
        moneyMovementService.getTransferRequest(transferRequestId, function(transferRequestResponse) {
            assert.equal(transferRequestResponse.transferRequestId, transferRequestId);
            done();
        });
    });

    //GET /money-movement/transfer-requests
    it('Get Transfer Requests', function(done) {
        let moneyMovementAccountReferenceId = "XFhWXJQOVdudjhONmdsOV7QpZE5Ba25ut5pa0N75jjoLJh=";
        let filters = {};
        filters.fromDate = "2018-01-01";
        filters.toDate = "2018-04-30";
        filters.transferType = "Internal";
        filters.transferRequestStatus = "Processed";
        moneyMovementService.getTransferRequests(moneyMovementAccountReferenceId, filters, function(transferRequests) {
            assert.equal(transferRequests.transferRequests[0].transferType, "Internal");
            done();
        });
    });

    //PATCH /money-movement/transfer-requests/{transferRequestId}
    it('Update Transfer Request', function(done) {
        moneyMovementService.updateTransferRequest(transferRequestId, "Cancelled", function(updateTransferResponse) {
            done();
        });
    });
});