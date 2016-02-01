(function () {
  'use strict';
  var ctrl = angular.module('ContactsApp.controllers', []);

  ctrl.controller('ContactsCtrl', function ($scope, $state, $timeout, ContactsFactory, contactData) {
    console.log('data in the controller');
    console.log(contactData);

    $scope.contactData = contactData;
    $scope.index = 0;
    $scope.uiRouterState = $state;
    $scope.sortType = 'last_name';
    $scope.sortReverse = false;
    $scope.searchContacts = '';

  });

  ctrl.controller('AddContactCtrl', function ($scope, ContactsFactory) {
    $scope.processForm = function () {
      console.log($scope.contactData);
      ContactsFactory.submitContact($scope.contactData);
    }
  });
}());
