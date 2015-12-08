var r = require('rethinkdb');
var q = require('q');
require('rethinkdb-init')(r); //attached .init function to r so we can call it later

var dbDeets = { //setting up all the details for rethinkdb
  host: 'localhost',
  port: 28015,
  db: 'todo'
}
var tables = ['todos', 'lists', 'users'] //the tables we want to be created if they aren't already created

var dfd = q.defer() //so we can return a promise to the server to wait for db connection before starting to listen for requests
var conn //so we can export the connection to a different file

r
  .init(dbDeets, tables)
  .then(function(connection){
    conn = connection
    r.db(dbDeets.db).tableList().run(connection, function(err, tables){
      console.log('Connected to db "' + dbDeets.db + '" with tables ', tables)
      dfd.resolve()
    })
  })


module.exports = {
  conn: conn,
  establishConn: dfd.promise
}