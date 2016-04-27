(function() {
  'use strict';

  angular
    .module('chuCooListApp')
    .controller('AuthController', AuthController);

  AuthController.$inject = ['ChuCoo'];

  function AuthController(ChuCoo) {
    var self = this;

    self.listItems = [];

    self.auth = function(listName) {
      ChuCoo.auth(listName)
        .then(function(res) {
          self.listItems = res.data.tasks;
        }, function(error) {
          console.error(error);
        });
    }

    self.addItem = function(newItemText) {
      ChuCoo.addItem(newItemText)
        .then(function(res) {
          console.log(res);
          self.getItems();
        }, function(error) {
          console.log(error);
        });
    }

    self.getItems = function() {
      ChuCoo.getItems()
        .then(function(res) {
          console.log(res);
          self.listItems = res.data.tasks;
        }, function(error) {
          console.log(error);
        });
    }

    self.updateItem = function(item) {
      ChuCoo.updateItem(item)
        .then(function(res) {
          console.log("success");
          self.getItems();
        }, function(error) {
          console.log(error);
        });
    }

    self.deleteItem = function(itemId) {
      ChuCoo.deleteItem(itemId)
        .then(function(res) {
          console.log("success");
          self.getItems();
        }, function(error) {
          console.log(error);
        });
    }

  }
})();
