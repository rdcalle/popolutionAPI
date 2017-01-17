const jwt = require('jwt-simple');  
const moment = require('moment');  
const config = require('../config');

exports.createToken = (user) => {  
  const payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, "days").unix(),
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
};

exports.decode = (token, token_secret) => {
	return jwt.decode(token, token_secret)
}