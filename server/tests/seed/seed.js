const jwt = require('jsonwebtoken');
var {ObjectID} = require('mongodb');
var {Todo} = require('./../../models/todo');
var {User} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const user = [{
  _id: userOneId,
  email : 'akash123@gmail.com',
  password : 'useronepass',
  tokens: [{
    access : 'auth',
    token : jwt.sign({_id : userOneId,access : 'auth'},'123abc').toString()
  }]},{
    _id: userTwoId,
    email : 'prashanth123@gmail.com',
    password : 'usertwopass'
  }];

const name = [{
  _id : new ObjectID('59e93eb794f75a3638d63c70'),
  name :'sairam',
  age : 15
},{
  _id :  new ObjectID('59e93eb794f75a3638d63c71'),
  name : 'ranjan',
  age : 19
}] ;

const populateTodos = (done)=>{
  Todo.remove({}).then(()=>{
 return Todo.insertMany(name)
    }).then(()=>done());
}

const populateUsers = (done)=>{
  User.remove({}).then(()=>{
    var userOne = new User(user[0]).save();
    var userTwo = new User(user[1]).save();

    return Promise.all([userOne,userTwo]);

  }).then(()=>done());
}

module.exports = { name,populateTodos,user,populateUsers};
