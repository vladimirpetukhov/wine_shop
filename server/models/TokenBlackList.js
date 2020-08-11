const mongoose = require('mongoose');
const { String } = mongoose.Schema.Types;

const tokenBlackListSchema = new mongoose.Schema({
  token: String,
});

module.exports = mongoose.model('tokenBlackList', tokenBlackListSchema);
