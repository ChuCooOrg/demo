;(function() {
  'use strict';

  angular
    .module('chuCooListApp')
    .service('ChuCoo', ChuCoo);

  ChuCoo.$inject = ['$http'];

  /* @ngInject */
  function ChuCoo($http) {
    this.baseUrl = 'https://richegg.top';

    this.tasks = [];
    this.isAuth = false;
    
    this.auth = auth;
    this.getItems = getItems;
    this.addItem = addItem;
    this.updateItem = updateItem;
    this.deleteItem = deleteItem;

    ////////////////

    function auth(listName) {
      var data = {
        listName: listName
      };
      return $http.post(this.baseUrl + '/lists', data);
    }

    function getItems() {
      return $http.get(this.baseUrl + '/tasks');
    }

    function addItem(newItemText) {
      var data = {
        text: newItemText
      };
      return $http.post(this.baseUrl + '/tasks', data);
    }

    function updateItem(item) {
      var data = {
        isDone: item.isDone
      };
      return $http.patch(this.baseUrl + '/tasks/' + item.id, data);
    }

    function deleteItem(itemId) {
      return $http.delete(this.baseUrl + '/tasks/' + itemId);
    }
  }
})();
