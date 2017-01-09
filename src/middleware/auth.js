const jwt = require('jwt-simple');  
const moment = require('moment');  
const config = require('../config');

const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId; 

const User = mongoose.model('User');  

exports.ensureAuthenticated = (req, res, next) => {  
  if(!req.headers.authorization) {
    return res
      .status(403)
      .send({message: "Tu petición no tiene cabecera de autorización"});
  }

  const token = req.headers.authorization;
  const payload = jwt.decode(token, config.TOKEN_SECRET);

  if(payload.exp <= moment().unix()) {
     return res
         .status(401)
        .send({message: "El token ha expirado"});
  }

  User.findById(ObjectId(payload.sub),
    function(err, user) {
      console.error(err);
      console.log(user);
      req.user = user;
      next();
    })
}