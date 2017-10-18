
const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect("mongodb://localhost:27017/TodoApp",(err,db)=>{
  if(err)
  {
    return console.log('Unable to connect to server');
  }

 //deleteMany
 db.collection('Todos').deleteMany({name :'Ramesh'}).then((result)=>{
   console.log(result);
 })

 // //deleteOne
 // // db.collection('Todos').deleteOne({name : "Ramesh"}).then((result)=>{
 // //   console.log(result);
 // // })
 // db.collection('Todos').findOneAndDelete({name :"Ramesh"}).then((result)=>{
 //   console.log(result);
 // })
 })
