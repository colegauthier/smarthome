const Crypto = require('crypto')

function generateUUID() {  
    return Crypto.randomUUID();
  }

  module.exports = { generateUUID };