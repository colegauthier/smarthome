const express = require('express');
require('dotenv').config();
const Account = require('./account/account')
const login = require('./login');
const bodyParser = require('body-parser');
const main = express();

main.use(bodyParser.json());

main.listen(process.env.PORT, () => {
    console.log(`Identity server is online with port ${process.env.PORT}`);
});

main.post('/login', (req, res) => {

    const username = req.body.username;
    const password = req.body.password;
    
    const accessToken = login.generateToken(username, password);

    if(accessToken === "unauthorized") {
        res.status(401).json(
            "Username or password is incorrect"
        );
    } else {
        res.status(200).json(
            {accessToken}
        )
    }
});

main.post('/create/account', (req, res) => {
    
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const role = req.body.role;

    var account = new Account(username, email, password, role);

    account.create()
    .then(
        res.status(200).json (
            {account}
        )
    );
});