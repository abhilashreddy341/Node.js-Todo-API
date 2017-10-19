
var express = require('express');
var bodyParser = require('body-parser')

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{

  var todo = new Todo({
    name : req.body.name,
    age : req.body.age,
  });
  todo.save().then((doc)=>{
    res.send(doc);
  },(err)=>{
    res.status(400).send(err);
  });
});


app.listen(3000,()=>{
  console.log('Server is up on port 3000');
})

module.exports = {app} ;
