
var mongoose = require('mongoose');
var user = mongoose.model('user',{
  email:{
    type : String,
    required : true,
    minlength : 3,
    trim : true
  }
})

module.export = {user}
