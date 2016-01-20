var models = require("../models");

exports.getUsers = function (req, res) {
    models.User.findAll().then(function (users) {
        res.json(users);
    })
};

exports.addUser = function (req, res) {
    models.User.create({
        name: req.body.text
    }).then(function (user) {
        res.json(user);
    }).catch(function (err) {
        console.log("ops: " + error);
        res.status(500).json({error: 'error'});
    })
};

exports.getSingleUser = function (req, res) {
    models.User.find({
        where: {
            id: req.params.id
        }
    }).then(function (user) {
        res.json(user);
    });
}

exports.deleteUser = function (req, res) {
    models.User.find({
        where: {
            id: req.params.id
        }
    }).then(function (user) {
        user.destroy()
            .then(function (data) {
                console.log('smth', data);
            })
            .catch(function (err) {
                console.log(err)
            });
    })
}