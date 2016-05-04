angular
  .module('chuCooList')
  .service('List', function($http) {
    this.baseURL = 'https://richegg.top';
    this.tasks = [];

    this.auth = function(listName) {
      var data = {
        listName: listName
      };
      return $http.post(this.baseURL + '/lists', data);
    }

    this.addTask = function(newTaskText) {
      var data = {
        text: newTaskText
      };
      return $http.post(this.baseURL + '/tasks', data);
    }

    this.getTasks = function() {
      return $http.get(this.baseURL + '/tasks');
    }

    this.updateTask = function(task) {
      console.log(task);
      var data = {
        isDone: task.isDone
      };
      return $http.patch(this.baseURL + '/tasks/' + task.id, data);
    }

    this.deleteTask = function(taskId) {
      return $http.delete(this.baseURL + '/tasks/' + taskId);
    }
  });
