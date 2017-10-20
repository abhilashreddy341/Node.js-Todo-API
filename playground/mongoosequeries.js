const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id1 = '59e93eb794f75a3638d63c71' ;
var id2 = '59e7f0f5ac6c15229860b8c7';
if(!ObjectID.isValid(id1)){
  console.log('ID is not valid');
}
// Todo.find({
//   _id : id
// }).then((todos)=>{
//   console.log('results is :',todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo)=>{
//   console.log('Result is :',todo)
// });

Todo.findById(id1).then((todo)=>{
  if(!todo)
  {
    return console.log('ID not found');
  }
  console.log('result is ',todo)
}).catch((e)=>console.log(e));

User.findById(id2).then((user)=>{
  if(!user)
  {
    return console.log('no user found');
  }
  console.log('Users are',user.email);
}).catch((e)=>{
  console.log(e);
})
