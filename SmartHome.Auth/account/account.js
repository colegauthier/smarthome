const db = require('../db');
const uniqueId = require('../utilities/random')
const bcrypt = require('bcrypt')
const saltRounds = 10

function Account (
    username, 
    email, 
    password, 
    role
    ) {
      this.username = username;
      this.email = email;
      this.password = password;
      this.role = role;
  };

  // Create a new account

  Account.prototype.create = async function () {
      try {
        const id = uniqueId.generateUUID();
        const hashedPassword = await bcrypt.hash(this.password, saltRounds);

        db.query('INSERT INTO account(id, username, email, password, role) VALUES($1, $2, $3, $4, $5)', [id, this.username, this.email, hashedPassword, this.role]);
      } catch(error) {
          throw error;
      }
  }

module.exports =  Account;
