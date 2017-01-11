// auth.js
const mongoose = require('mongoose');  
const User = mongoose.model('User');  
const jwtService = require('./services/jwt');

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