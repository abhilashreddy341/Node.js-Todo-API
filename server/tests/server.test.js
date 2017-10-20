var expect = require('expect');
var request = require('supertest');
var {ObjectID} = require('mongodb');

var {app} = require('./../server');
var {Todo} = require('./../models/todo');

const name = [{
  _id : new ObjectID('59e93eb794f75a3638d63c70'),
  name :'sairam',
  age : 15
},{
  _id :  new ObjectID('59e93eb794f75a3638d63c71'),
  name : 'ranjan',
  age : 19
}] ;

beforeEach((done)=>{
  Todo.remove({}).then(()=>{
 return Todo.insertMany(name)
    }).then(()=>done());
})

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
