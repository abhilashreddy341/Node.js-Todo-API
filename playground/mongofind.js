
const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect("mongodb://localhost:27017/TodoApp",(err,db)=>{
  if(err)
  {
    return console.log('Unable to connect to server');
  }
  // db.collection('Todos').find({_id: new ObjectID("59e7bd1b8a92bc07e89ac0ce")}).toArray().then((docs)=>{
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs,undefined,3));
  // },(err)=>{
  //   console.log('Unable to fetch the collection');
  // })
  //
  // db.collection('Todos').find().count().then((count)=>{
  //   console.log('Todos count');
  //   console.log(`total no of documents in Todos :${count}`);
  // },(err)=>{
  //   console.log('Unable to fetch the collection');
  // })

 db.collection('Users').find({ name : 'Rakesh'}).toArray().then((docs)=>{
   console.log('Users');
   console.log(JSON.stringify(docs,undefined,3));
 },(err)=>{
   console.log('unable to find the documents');
 })

  db.close();
})
