
var mongoose = require('mongoose');
var Todo = mongoose.model('Todo',{
  name :{
    type : String,
    minlength : 3,
    required : true,
    trim : true
  },
  age : {
    type : Number,
    default : 10
  },
  male : {
    type : Boolean,
    default : true,
  },
  _creator :{
    type : mongoose.Schema.Types.ObjectId,
    required : true
  }
});
module.exports = {Todo}
