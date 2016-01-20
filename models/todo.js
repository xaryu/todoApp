'use strict';
module.exports = function(sequelize, DataTypes) {
  var Todo = sequelize.define('Todo', {
    text : {
      type : DataTypes.STRING,
      allowNull : false,
    },
    done : {
      type : DataTypes.BOOLEAN,
    }
  }, {
    classMethods: {
      associate: function(models) {
        Todo.belongsTo(models.User, {as: "User"});
      }
    }
  });
  return Todo;
};
