const express = require('express');
require('dotenv').config();
const register = require('./register');
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
    
    const accessToken = login.userLoginProcess(username, password);

    console.log(accessToken);

    if(accessToken) {
        res.json({
            accessToken
        });
    }
});

main.post('/register', (req, res) => {
    res.send('Hello World!');
});