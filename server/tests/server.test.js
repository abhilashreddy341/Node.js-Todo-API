var expect = require('expect');
var request = require('supertest');

var {app} = require('./../server');
var {Todo} = require('./../models/todo');

const name = [{
  name :'sairam',
  age : 15
},{
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
