(function() {
  'use strict';

  angular
    .module('chuCooListApp', [])
    .config(config);

  config.$inject = ['$httpProvider'];

  function config($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  }

})();
