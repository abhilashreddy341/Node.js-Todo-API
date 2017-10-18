
const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect("mongodb://localhost:27017/TodoApp",(err,db)=>{
  if(err)
  {
    return console.log('Unable to connect to server');
  }
 // //Delete many
 // db.collection('Users').deleteMany({name :'Rakesh'}).then((result)=>{
 //   console.log(result);
 // })

// //Delete one
//  db.collection('Users').deleteOne({name :'Rakesh'}).then((result)=>{
//    console.log(result);
//  });

//find one and delete
db.collection('Users').findOneAndDelete({name : 'Rakesh'}).then((result)=>{
  console.log(result);
})
 db.close();
 })
