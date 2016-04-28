;(function() {
  'use strict';

  angular
    .module('chuCooListApp')
    .controller('ListController', ListController);

  ListController.$inject = ['ChuCoo', '$location'];

  function ListController(ChuCoo, $location) {
    var self = this;

    if (!ChuCoo.isAuth) {
      $location.path('/');
    }

    self.listItems = ChuCoo.tasks;

    self.addItem = function(newItemText) {
      ChuCoo.addItem(newItemText)
        .then(function(res) {
          self.getItems();
        }, function(error) {
          console.log(error);
        });
    }

    self.getItems = function() {
      ChuCoo.getItems()
        .then(function(res) {
          self.listItems = ChuCoo.tasks = res.data.tasks;
        }, function(error) {
          console.log(error);
        });
    }

    self.updateItem = function(item) {
      ChuCoo.updateItem(item)
        .then(function(res) {
          self.getItems();
        }, function(error) {
          console.log(error);
        });
    }

    self.deleteItem = function(itemId) {
      ChuCoo.deleteItem(itemId)
        .then(function(res) {
          self.getItems();
        }, function(error) {
          console.log(error);
        });
    }

  }
})();
