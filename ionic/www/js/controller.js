angular
  .module('chuCooList')
  .controller('AuthController', AuthController);

  function AuthController(List, $location) {
    var self = this;

    self.tasks = List.tasks;

    self.auth = function(listName) {
      List.auth(listName)
        .then(function(res) {
          self.tasks = List.tasks = res.data.tasks;
        }), function(err) {
          console.log(err);
        }
    };

    self.getTasks = function() {
      List.getTasks()
        .then(function(res) {
          console.log(res.data);
          self.tasks = List.tasks = res.data.tasks;
        }), function(err) {
          console.log(err);
        };
    };

    self.addTask = function(newTaskText) {
      List.addTask(newTaskText)
        .then(function(res) {
          self.getTasks();
        }), function(err) {
          console.log(err);
        };
    };

    self.updateTask = function(task) {
      List.updateTask(task)
        .then(function(res) {
          console.log(res.data);
          self.getTasks();
        }), function(err) {
          console.log(err);
        };
    };

    self.deleteTask = function(taskId) {
      List.deleteTask(taskId)
        .then(function(res) {
          self.getTasks();
        }), function(err) {
          console.log(err);
        };
    };
  }
