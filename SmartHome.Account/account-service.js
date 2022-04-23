const express = require('express');
require('dotenv').config();
const Account = require('./account/account')
const bodyParser = require('body-parser');
const main = express();

main.use(bodyParser.json());

main.listen(process.env.PORT, () => {
    console.log(`Identity server is online with port ${process.env.PORT}`);
});

main.post('/account/login', (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    var account = new Account('', '', '', email, password, '');

    account.login().then( (loggedIn) => {

        if (loggedIn != false) {
            return res.status(200).json(loggedIn);
        } else {
            return res.status(401).json('Wrong password or account does not exist');
        }
    })
});

main.post('/account/create', (req, res) => {
    
    const username = req.body.username;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
    const email = req.body.email;
    const role = req.body.role;

    var account = new Account(username, firstName, lastName, email, password, role);

    account.create().then( async (created) => {
        if(created) {
            account.login().then( (loggedIn) => {
                if (loggedIn != false) {
                    return res.status(200).json(loggedIn);
                } else {
                    return res.status(401).json('Wrong password or account does not exist');
                }
            })
        } else {
            return res.status(409).json("Account already exists")
        }
    });
});