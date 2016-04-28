;(function() {
  'use strict';

  angular
    .module('chuCooListApp')
    .controller('AuthController', AuthController);

  AuthController.$inject = ['ChuCoo', '$location', '$mdToast'];

  function AuthController(ChuCoo, $location, $mdToast) {
    var self = this;

    self.auth = function(event, authForm, listName) {
      if (!authForm.$valid) {
        $mdToast.show(
          $mdToast.simple()
            .content('請完整填寫。')
        );
        event.preventDefault();
      } else {
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

  }
})();
