const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

var password = '123abc';

bcryptjs.genSalt(10,(err,salt)=>{
  bcryptjs.hash(password,salt,(err,hash)=>{
    console.log(hash);

  bcryptjs.compare(password,hash,(err,res)=>{
    console.log(res);
  });
  })
});


// var message = 'I am doing good';
// var hash = SHA256(message).toString();
//
// console.log(`message : ${message}`);
// console.log(`hash : ${hash}`);

// var data = {
//   id : 18,
// }
//
// var hash = jwt.sign(data.id,'12345').toString();
// console.log(hash);
// var decode = jwt.verify(hash,'1234');
// console.log(decode);
