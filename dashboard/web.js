const express = require('express')
const app = express()
const moneyMovementService = require('./money-movement-service')

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => res.sendFile('public/index.html', {root: __dirname }))

app.get('/accounts', (req, res) => {
    // GET /money-movement/accounts
    moneyMovementService.getAccounts(function(accountsResponse) {
        var accounts = accountsResponse.accounts;
        res.json(accounts);
    });
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))