;(function() {
  'use strict';

  angular
    .module('chuCooListApp')
    .controller('ListController', ListController);

  ListController.$inject = ['ChuCoo', '$location', '$mdToast'];

  function ListController(ChuCoo, $location, $mdToast) {
    var self = this;
    self.message = "";

    if (!ChuCoo.isAuth) {
      $location.path('/');
    }

    self.listItems = ChuCoo.tasks;

    self.showToast = function(message) {
      $mdToast.show(
        $mdToast.simple()
          .textContent(message)
          .position("top right")
          .hideDelay(1500)
      );
    }

    self.addItem = function(newItemText) {
      ChuCoo.addItem(newItemText)
        .then(function(res) {
          self.getItems();
        }, function(error) {
          self.showToast(error.data.message);
          console.log(error);
        });
      self.newItemText = "";
    }

    self.getItems = function() {
      ChuCoo.getItems()
        .then(function(res) {
          self.listItems = ChuCoo.tasks = res.data.tasks;
        }, function(error) {
          self.listItems = ChuCoo.tasks = [];
          self.showToast(error.data.message);
          console.log(error);
        });
    }

    self.updateItem = function(item) {
      ChuCoo.updateItem(item)
        .then(function(res) {
          self.getItems();
        }, function(error) {
          self.showToast(error.data.message);
          console.log(error);
        });
    }

    self.deleteItem = function(itemId) {
      ChuCoo.deleteItem(itemId)
        .then(function(res) {
          self.getItems();
        }, function(error) {
          self.showToast(error.data.message);
          console.log(error);
        });
    }

  }
})();
