const db = require('../db');
const uniqueId = require('../utilities/random')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const saltRounds = 10

class Account {
  constructor(username,
    firstName,
    lastName,
    email,
    password,
    role) {
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  // Create a new account
  async create() {
    // check if the account already exists

    return verify(this.email).then( async (account) => {
      if (!account) {
          const id = uniqueId.generateUUID();
          const hashedPassword = await bcrypt.hash(this.password, saltRounds);
          const emailLowerCase = this.email.toLowerCase();
    
          await db.query('INSERT INTO account(id, username, email, password, role, firstName, lastName) VALUES($1, $2, $3, $4, $5, $6, $7)', [id, this.username, emailLowerCase, hashedPassword, this.role, this.firstName, this.lastName]);
          return true;
      } else {
        return false;
      }
    })
  }

  async login() {

    return verify(this.email).then( async (account) => {
      if (account) {

        const accountInformation = await getSingleAccountInformation(this.email);

        if (bcrypt.compareSync(this.password, accountInformation.password)) {
          const claims = {
            id: accountInformation.id,
            username: accountInformation.username,
            firstName: accountInformation.firstName,
            lastName: accountInformation.lastName,
            email: accountInformation.email,  
            role: accountInformation.role
          }

          const accessToken = jwt.sign(claims, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '30 days'
        });
          return {'Access token' : accessToken}
        } else {
          return false
        }

      } else {
        return false
      }
    })
  }
};

async function verify(email) {
  const rows = await db.query('SELECT * FROM account WHERE email = $1', [email])

  if (rows.rowCount === 0) {
    return false
  } else {
    return true
  }
}

async function getSingleAccountInformation(email) {
  const { rows } = await db.query('SELECT * FROM account WHERE email = $1', [email])

  return rows[0]
}

module.exports =  Account;
