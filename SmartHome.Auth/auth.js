const jwt = require('jsonwebtoken');
require('dotenv').config();

users = [
    {
        username: 'Cole',
        password: 'Test12345!',
        role: 'admin'
    },
    {
        username: 'Jill',
        password: 'Test12345!',
        role: 'basic'
    }
];

function findUser(username, password) {
    const user = users.find(u => { return u.username === username && u.password === password });
    if (user) {
        return user
    } else {
        return false
    }
}

function createToken(user) {
    const accessToken = jwt.sign({ username: user.username,  role: user.role }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '30 days'
    });
    return accessToken;
}

module.exports = { findUser, createToken };