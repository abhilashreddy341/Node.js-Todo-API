const validator = require('validator');
var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
  email:{
    type : String,
    required : true,
    minlength : 3,
    trim : true,
    unique : true,
    validate : {
      validator : validator.isEmail,
      message : '{VALUE} is not an email ID'
    }
  },
  password : {
    type : String,
    minlength : 6,
    required : true
  },
  tokens : [{
    access: {
      type : String,
      required : true,
    },
    token : {
      type : String,
      required : true
    }
  }]
})

UserSchema.statics.findByToken = function(token){
  var user = this;
  var decoded;
  try{
    decoded = jwt.verify(token,"123abc");

  }catch(e){
       return Promise.reject();
  }
  return user.findOne({
    '_id' : decoded._id,
    'tokens.access': 'auth',
    'tokens.token':token
  })
}

UserSchema.methods.toJSON =function(){
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject,['_id','email']);
}

UserSchema.methods.generateAuthToken = function(){
  var user = this;
  var access = 'auth';
  var token =jwt.sign({ _id : user._id.toHexString(),access},'123abc').toString();
  user.tokens.push({access,token});
  return user.save().then(()=>{
    return token;
  })
}

var User = mongoose.model('User',UserSchema);

module.exports = {User}
