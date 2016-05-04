angular
  .module('chuCooList')
  .controller('AuthController', AuthController);

  function AuthController(List, $location, $ionicLoading) {
    var self = this;

    self.tasks = List.tasks;

    self.auth = function(listName) {
      $ionicLoading.show({
        template: 'Loading...'
      });
      List.auth(listName)
        .then(function(res) {
          self.tasks = List.tasks = res.data.tasks;
          $ionicLoading.hide();
        }), function(err) {
          console.log(err);
          $ionicLoading.hide();
        }
    };

    self.getTasks = function() {
      $ionicLoading.show({
        template: 'Loading...'
      });
      List.getTasks()
        .then(function(res) {
          self.tasks = List.tasks = res.data.tasks;
          $ionicLoading.hide();
        }), function(err) {
          console.log(err);
          $ionicLoading.hide();
        };
    };

    self.addTask = function(newTaskText) {
      $ionicLoading.show({
        template: 'Loading...'
      });
      List.addTask(newTaskText)
        .then(function(res) {
          self.getTasks();
          $ionicLoading.hide();
        }), function(err) {
          console.log(err);
          $ionicLoading.hide();
        };
    };

    self.updateTask = function(task) {
      $ionicLoading.show({
        template: 'Loading...'
      });
      List.updateTask(task)
        .then(function(res) {
          self.getTasks();
          $ionicLoading.hide();
        }), function(err) {
          console.log(err);
          $ionicLoading.hide();
        };
    };

    self.deleteTask = function(taskId) {
      $ionicLoading.show({
        template: 'Loading...'
      });
      List.deleteTask(taskId)
        .then(function(res) {
          self.getTasks();
          $ionicLoading.hide();
        }), function(err) {
          console.log(err);
          $ionicLoading.hide();
        };
    };
  }
