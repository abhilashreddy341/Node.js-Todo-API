
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

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

app.get('/todos',(req,res)=>{
  Todo.find().then((result)=>{
    res.send({result});
  },(e)=>{
    res.status(400).send(e);
  })
})

app.get('/todos/:id',(req,res)=>{
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send(`Id is not valid ${id}`);
  }
  Todo.findById(id).then((result)=>{
    if(!result){
    return  res.status(404).send(result);
    }
    res.send(result);
  }).catch((e)=> res.status(404).send({}))
})

app.listen(3000,()=>{
  console.log('Server is up on port 3000');
})

module.exports = {app} ;
