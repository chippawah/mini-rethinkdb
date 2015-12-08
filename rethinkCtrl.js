var q = require('q');
var r = require('rethinkdb')
var conn = require('./dbConfig').connection;
var todos = r.db('todo').table('todos');

var handleErr = function(action, err, res){
  console.log('Error while ' + action + ':', err);
  res.status(500).send(err)
}

module.exports = {
  addTodo: function(req, res){ 
    todos.insert(req.body).run(conn, function(err, result){
      if(err){handleErr('inserting todo', err, res)}
      else {
        console.log('Result from inserting todo:', result)
        res.status(201).send(result)
      }
    })
  },
  editTodo: function(req, res){
    todos.get(req.params.id).update(req.body).run(connection, function(err, result){
      if(err) handleErr('editing todo', err, req)
      else{
        res.status(200).send(result)
      }
    })
  },
  getTodos: function(req, res){
    todos.coerceTo('array').run(connection, function(err, todos){
      if(err) handleErr('getting todos', err, res)
      else {
        console.log('Result getting todos', todos);
        res.status(200).send(todos)
      }
    })
  },
  getTodo: function(req, res){
    todos.get(req.params.id).run(connection, function(err, todo){
      if(err) handleErr('getting todo', err, res);
      else if(!todo){
        res.status(404).send('No todo found here :(')
      } else {
        console.log('Result getting todo ', todo);
        res.status(200).send(todo)
      }
    })
  },
  removeTodo: function(req, res){
    todos.get(req.params.id).delete().run(connection, function(err, result){
      if(err) handleErr('removing todo', err, res)
      else {
        console.log('Result from deleting todo:', result);
        res.status(204).end()
      }
    })
  },
}
