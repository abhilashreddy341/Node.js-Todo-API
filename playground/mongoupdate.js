
const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect("mongodb://localhost:27017/TodoApp",(err,db)=>{
  if(err)
  {
    return console.log('Unable to connect to server');
  }

 // db.collection('Todos').findOneAndUpdate({
 //   _id : new ObjectID('59e7bd1b8a92bc07e89ac0ce')
 // },{
 //   $set : {
 //     Name : ' Naveen'
 //   }},{
 //     returnOriginal : false
 //   }).then((result)=>{
 //     console.log(result);
 //   })

db.collection('Todos').findOneAndUpdate({
  _id : new ObjectID('59e7bd1b8a92bc07e89ac0cf')
},{
    $set : {
      name: 'Aravind',
    },
    $inc : {
      age : 3
    }
},{
  returnOriginal : false
}).then((result)=>{
  console.log(result);
})


  db.close();
 })
