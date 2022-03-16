const authentication = require('./auth');

function generateToken(username, password) {

    const user = authentication.findUser(username, password);

    if (user) {
        return authentication.createToken(user);
    } else {
        return "unauthorized";
    }

}

module.exports = { generateToken };