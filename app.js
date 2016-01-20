/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');

var http = require('http');
var path = require('path');
var models = require("./models");
var app = express();

// all environments
app.set('port', 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/todo', routes.getTodos);
app.get('/users', user.getUsers);
app.post('/todo', routes.saveTodos);
app.put('/todo/:id/user', routes.saveTodosWithUser);
app.post('/users', user.addUser);
app.get('/todo/:id', routes.getSingleTodo);
app.get('/users/:id', user.getSingleUser);
app.put('/todo/:id', routes.updateTodos);
app.delete('/users/:id', user.deleteUser);

models.sequelize.sync({force:true}).then(function() {
    http.createServer(app).listen(app.get('port'), function() {
        console.log('Express server listening on port ' + app.get('port'));
    });
});
