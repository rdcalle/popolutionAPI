// auth.js
const mongoose = require('mongoose');  
const User = mongoose.model('User'); 
const ObjectId = mongoose.Types.ObjectId;
const jwtService = require('./services/jwt');
const moment = require('moment');
const config = require('./config');

exports.emailSignup = (req, res) => {
    const user = new User({
        email: req.body.email.toLowerCase(),
        password: req.body.password
    });


    user.save((err) => {
      if (err) {
        console.error(err);
        return res.status(500).send()
      }
      return res
        .status(200)
        .send({token: jwtService.createToken(user)})     
    })

};

exports.emailLogin = (req, res) => {
    User.findOne({email: req.body.email.toLowerCase()}, (err, user) => {
        // Comprobar si hay errores
        // Si el usuario existe o no
        // Y si la contraseña es correcta
        if (err || !user)
            return res
            .status(401)
            .send();
        return res
            .status(200)
            .send({token: jwtService.createToken(user)});
    });
};

exports.checkToken = (req, res) => {
  if(!req.headers.authorization) {
    return res
      .status(403)
      .send({message: "Tu petición no tiene cabecera de autorización"});
  }

  const token = req.headers.authorization;
  const payload = jwtService.decode(token, config.TOKEN_SECRET);

  if(payload.exp <= moment().unix()) {
    return res
    .status(401)
    .send({message: "El token ha expirado"});
  }
  
  User.findOne({_id: new ObjectId(payload.sub)}, (err, user) => {
    // Comprobar si hay errores
    // Si el usuario existe o no
    // Y si la contraseña es correcta
    if (err || !user)
        return res
        .status(401)
        .send();
    return res
        .status(200)
        .send({token: jwtService.createToken(user)});
  });
}