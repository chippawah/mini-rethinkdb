var express = require('express');
var bodyParser = require('body-parser');
var rethinkCtrl = require('./rethinkCtrl')

var app = express()
app.use(bodyParser.json());
var port = 9090

require('./dbConfig').establishConn.then(function(){
  app.listen(port, function(err){
    if(err){
      console.log(err);
    }
    else {
      console.log('Server listening on ' + 9090) 
    }
  })
});

app.post('/todo', rethinkCtrl.addTodo);
app.patch('/todo/:id', rethinkCtrl.editTodo);
app.get('/todo', rethinkCtrl.getTodos);
app.get('/todo/:id', rethinkCtrl.getTodo);
app.delete('/todo/:id', rethinkCtrl.removeTodo);