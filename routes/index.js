var models = require("../models");

exports.index = function (req, res) {
    res.render('index', {
        title: 'Todo SPA app'
    });
};

exports.getTodos = function (req, res) {
    models.Todo.findAll({include: [{all: true, nested:true}]}).then(function (todos) {
        res.json(todos);
    });
};

exports.saveTodos = function (req, res) {
    models.Todo.create({
        text: req.body.text,
        done: req.body.done,
        //UserId: req.body.UserId
    }).then(function (todos) {
        console.log(todos);
        res.json(todos);
    }).catch(function (error) {
        console.log("ops: " + error);
        res.status(500).json({error: 'error'});
    });
};

exports.saveTodosWithUser = function (req,res) {
    console.log('reqqqq',req.body)
    models.Todo.find({
        where: {
            id: req.params.id
        }
    }).then(function (todo) {
        console.log('firstTodo', todo)
        models.User.find({
            where: {
                id:req.body.userId
            }
        }).then(function (user) {
            console.log('firstUser', user)

            todo.setUser(user).then(function (result) {
                console.log(result)
                res.json(result);
            })
        })
    })
}
exports.getSingleTodo = function (req,res) {
    console.log('eeee')
    models.Todo.find({
        where: {
            id: req.params.id
        }
    }).then(function (todo) {
        res.json(todo);
    });
}

exports.updateTodos = function (req, res) {
    models.Todo.find({
        where: {
            id: req.params.id
        }
    }).then(function (todo) {
        if(todo) {
            todo.updateAttributes({
                text: req.body.text,
                done: req.body.done,
            }).then(function (todo) {
                res.json(todo);
            }).catch(function (err) {
                console.log(err);
            });
        }
    }).catch(function (err) {
        console.log(err);
    });
}


