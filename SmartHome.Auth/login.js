const authentication = require('./auth');

function userLoginProcess(username, password) {
    const user = authentication.findUser(username, password);

    console.log(user);

    if (user) {
        return authentication.createToken(user);
    } else {
        return "Username or password is incorrect";
    }

}

module.exports = { userLoginProcess };