const crypto = require('crypto');

function generateUniqueID(){
    return crypto.randomBytes(10).toString('hex');
}

module.exports = generateUniqueID