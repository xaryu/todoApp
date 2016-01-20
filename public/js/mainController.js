function TodoCtrl($scope, $http) {
    $scope.editedTextField = '';
    $scope.userName = '';
    $scope.todoId = '';
    $scope.todoText = '';
    $scope.openInputField = false;
    $scope.todos = [];
    $scope.users = [];

    $http.get('/todo').success(function (data) {
        $scope.todos = data;
        if (data == "") {
            $scope.todos = [];
        }
    }).error(function (data) {
        console.log("No data found!");
    });

    $http.get('/users').success(function (data) {
        $scope.users = data;
        if (data == "") {
            $scope.users = [];
        }
    }).error(function (data) {
        console.log("No users found!");
    });

    $scope.addTodo = function () {
        if ($scope.todoText !== '') {
            $http.post('/todo', {
                text: $scope.todoText,
                done: false,
                UserId: 2
            }).success(function (data) {
                $scope.todos.push(data);
                $scope.todoText = '';
            }).error(function (data) {
                console.log("Error: " + data);
            });
        } else {
            console.log('Please enter something in the \'todo\' field');
        }
    };
    $scope.addUser = function () {
        if ($scope.userName !== '') {
            $http.post('/users', {
                text: $scope.userName
            }).success(function (data) {
                $scope.users.push(data);
                $scope.userName = '';
            }).error(function (data) {
                console.log("Error: " + data);
            });
        } else {
            console.log('Please enter something in the \'name\' field');
        }
    };
    $scope.toggleEditInput = function (todo) {
        $scope.openInputField = !$scope.openInputField;
        $scope.todoId = todo.id;
    };
    $scope.editTodo = function (todo) {
        if (this.editedTextField !== '') {
            $http.put('/todo/' + $scope.todoId, {
                text: this.editedTextField
            }).success(function (data) {
                $scope.todos[$scope.todoId - 1].text = data.text;
            }).catch(function (err) {
                console.log(err);
            })
        } else {
            alert('Please insert data into the field!')
        }
    };
    $scope.remaining = function () {
        var count = 0;
        angular.forEach($scope.todos, function (todo) {
            count += todo.done ? 0 : 1;
        });
        return count;
    };

    $scope.editAddedUser = function (todo, user) {
        $http.put('/todo/' + todo.id + '/user', {userId: user.id})
            .success(function (data) {
                console.log(data)
            }).catch(function (err) {
            console.log(err);
        })
    }
    $scope.archive = function () {
        var oldTodos = $scope.todos;
        $scope.todos = [];
        angular.forEach(oldTodos, function (todo) {
            if (!todo.done)
                $scope.todos.push(todo);
        });
    };
    //delete user
    $scope.deleteUser = function (user) {
        $http.delete('/users/' + user.id)
            .success(function (data) {
                console.log(data);
            })
            .catch(function (res) {
                console.log(res);
            })
    }
}


