
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err)
  {
    return console.log('Unable to connect to the server');
  }
  console.log('Connection established successfully');

  db.collection('Todos').insertOne({
    Name : "Abhilash",
    Location : "Kansas City"
  },(err,result)=>{
    if(err)
    {
      return console.log('Unable to insert :',err);
    }
    console.log(JSON.stringify(result.ops,undefined,3));
  });

  db.collection('Todos').insertOne({
    name : 'Satish',
    Location : 'New Jearsy',
    age : 24
  },(err,result)=>{
    if(err){
     return  console.log('Unable to insert :',err);
    }
    console.log(result.ops[0]._id.getTimestamp());
  })

  db.close();
})
