const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result)=>{
//   console.log(result);
// })

// Todo.findOneAndRemove({
//   _id: '59e96605a250db36cba228b7'
// }).then((result)=>{
//   console.log(result);
// });

Todo.findByIdAndRemove('59e96615a250db36cba228c0').then((result)=>{
  console.log(result);
})
