const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moment = require('moment');  
const crypto = require('crypto');

const User = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }, 
  updated_at: {
    type: Date,
    default: Date.now
  }
});


User.methods.encryptPassword = function(password){ 
  return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
}  


User.methods.checkPassword = function(password){
  return this.encryptPassword(password) === this.hashedPassword;
}

User.virtual('userId')
    .get(function(user){ return this.id});

User.virtual('password')
    .set(function(password) {
        this._plainPassword = password;
        this.salt = crypto.randomBytes(32).toString('hex');
        this.updated = Date.now();
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function(){ return this._plainPassword});

const UserModel = mongoose.model('User', User);
