;(function() {
  'use strict';

  angular
    .module('chuCooListApp')
    .controller('AuthController', AuthController);

  AuthController.$inject = ['ChuCoo', '$location'];

  function AuthController(ChuCoo, $location) {
    var self = this;

    self.auth = function(listName) {
      ChuCoo.auth(listName)
        .then(function(res) {
          ChuCoo.tasks = res.data.tasks;
          ChuCoo.isAuth = true;
          $location.path('/list');
        }, function(error) {
          console.error(error);
        });
    }

  }
})();
