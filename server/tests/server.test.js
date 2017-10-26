var expect = require('expect');
var request = require('supertest');
var {ObjectID} = require('mongodb');

var {app} = require('./../server');
var {Todo} = require('./../models/todo');
var {User} = require('./../models/user');
var {name,populateTodos,user,populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POSTS todo',()=>{
  it('should create a new todo',(done)=>{
    var name = 'Pavan';
    request(app)
     .post('/todos')
     .send({name})
     .expect(200)
     .expect((res)=>{
       expect(res.body.name).toBe(name);
     })
     .end((err,res)=>{
       if(err)
       {
         return done(err);
       }
      Todo.find({name}).then((res)=>{
        expect(res.length).toBe(1);
        expect(res[0].name).toBe(name);
        done();
      }).catch((e)=>done(e))
     })
  })

  it('should not create a new todo',(done)=>{
    request(app)
     .post('/todos')
     .send({})
     .expect(400)
     .end((err,res)=>{
       if(err){
         return done(err);
       }

       Todo.find().then((res)=>{
         expect(res.length).toBe(2);
         done();
       }).catch((e)=>done(e))

     })
  })
})

describe('GET / todos',()=>{
  it('should get all todos',(done)=>{
    request(app)
     .get('/todos')
     .expect(200)
     .expect((res)=>{
       expect(res.body.result.length).toBe(2);
     }).end(done);
  })
})

describe('GET / todos/ id',()=>{
  it('should get todo with given id',(done)=>{
    request(app)
     .get(`/todos/${name[0]._id.toHexString()}`)
     .expect(200)
     .expect((res)=>{
       expect(res.body.result.name).toBe(name[0].name);
     })
     .end(done);
  })

  it('should return 404 for null',(done)=>{
    var id = new ObjectID();
    request(app)
     .get(`/todos/${id.toHexString()}`)
     .expect(404)
     .end(done);
  })
  it('should return 404 for invalid id',(done)=>{
    request(app)
     .get('/todos/1234')
     .expect(404)
     .end(done);
  })
})

describe('DELETE / todos/id',()=>{
  it('should delete a document by id',(done)=>{
    var id = name[0]._id.toHexString();
    request(app)
     .delete(`/todos/${id}`)
     .expect(200)
     .expect((res)=>{
       expect(res.body.result._id).toBe(id);
     })
     .end((err,resu)=>{
       if(err){
         return done(err);
      }
    Todo.findById(id).then((res)=>{
      expect(res).toEqual(null)
      done();
    }).catch((e)=>done(e));
  });
})

  it('should return status 404 if no document is deleted',(done)=>{
       request(app)
        .delete('/todos/59e93eb794f75a3638d63c74')
        .expect(404)
        .end(done);
  })

  it('should return status 404 if object ID is invalid',(done)=>{
      request(app)
       .delete('/todos/123')
       .expect(404)
       .end(done);
  })
})

describe('/PATCH/todos/id',()=>{
  it('should update the todo',(done)=>{
    var id = name[0]._id.toHexString();
    request(app)
     .patch(`/todos/${id}`)
     .send({
       name : 'Abhi',
       age : 23
     })
     .expect(200)
     .expect((res)=>{
       expect(res.body.result.name).toBe('Abhi');
       expect(res.body.result.age).toBe(23);
     })
     .end(done);
  })
})

describe('GET / user / me', ()=>{
  it('should return user if authenticated',(done)=>{
    request(app)
     .get('/users/me')
     .set('x-auth',user[0].tokens[0].token)
     .expect(200)
     .expect((res)=>{
       expect(res.body._id).toBe(user[0]._id.toHexString());
       expect(res.body.email).toBe(user[0].email);
     })
     .end(done);
  })

  it('should not return user if not authorized',(done)=>{
    request(app)
    .get('/users/me')
    .expect(401)
    .expect((res)=>{
      expect(res.body).toEqual({});
    }).end(done);
  });
});

describe(' POST / users',()=>{
  it('should return user if user is created',(done)=>{
   var email = 'abhilash123@gmail.com';
   var password = 12345678;
    request(app)
     .post('/users')
     .send({email, password})
     .expect(200)
     .expect((res)=>{
       expect(res.headers['x-auth']).toExist();
       expect(res.body._id).toExist();
       expect(res.body.email).toBe(email)
     })
     .end((err)=>{
       if(err){
         done(err);
       }
       User.findOne({email}).then((res)=>{
         expect(res.email).toBe(email);
         expect(res.password).toNotBe(password);
         done();
       })

     });
  });

  it('should return validation errors if request is invalid',(done)=>{
    var email = 'abhilash123';
    var password = 12345678;
    request(app)
     .post('/users')
     .send({email,password})
     .expect(400)
     .end(done);
  })

  it('should return 404 if email already exists',(done)=>{
    var email = 'akash123@gmail.com';
    var password = 12345678;
    request(app)
     .post('/users')
     .send({email,password})
     .expect(400)
     .end(done);
  })

});

describe('POST / users / login',()=>{
  it('should login user and return auth token',(done)=>{
    request(app)
     .post('/users/login')
     .send({
       email : user[1].email,
       password : user[1].password
     })
     .expect(200)
     .expect((res)=>{
       expect(res.headers['x-auth']).toExist();
     })
     .end((err,res)=>{
       if(err){
         done(err);
       }
       User.findOne({email :user[1].email }).then((user)=>{
         expect(user.tokens[0]).toInclude({
           access : 'auth',
           token : res.headers['x-auth']
         })
         done();
       }).catch((e)=>done(e));
     });
  });

  it('should reject invalid email or password',(done)=>{
    request(app)
     .post('/users/login')
     .send({
       email : user[1].email,
       password : 123456
     })
     .expect(400)
     .expect((res)=>{
       expect(res.headers['x-auth']).toNotExist;
     })
     .end((err,res)=>{
       if(err){
        return  done(err);
       }
       User.findOne({email :user[1].email }).then((user)=>{
         expect(user.tokens.length).toBe(0);
         done();
       }).catch((e)=>done(e));
     });
  });
});

describe('DELETE / users/me/tokens',()=>{
  it('should delete the token from the tokens array',(done)=>{
    request(app)
     .delete('users/me/token')
     .set('x-auth',user[0].tokens[0].token)
     .expect(200)
     .end((err,res)=>{
       if(err){
         return done(err);
       }
       User.findById(user[0]._id).then((user)=>{
         expect(user.tokens.length).toBe(0);
         done()
       }).catch((e)=>done(e))
     });
  });
});
