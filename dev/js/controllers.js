// http://nathanleclaire.com/blog/2014/01/31/banging-your-head-against-an-angularjs-issue-try-this/

(function () {
  'use strict';
  var ctrl = angular.module('ContactsApp.controllers', []);

  ctrl.controller('ContactsCtrl', function ($scope, $timeout, ContactsFactory, contactData) {
    console.log('data in the controller');
    console.log(contactData);

    $timeout(function () {
      $scope.contactData = contactData.data.data;
      $scope.index = 0;
      $scope.sortType = 'id';
      $scope.sortReverse = false;
      $scope.searchContacts = '';
    });
  });

  ctrl.controller('AddContactCtrl', function ($scope, ContactsFactory) {
    $scope.processForm = function () {
      console.log($scope.contactData);
      ContactsFactory.submitContact($scope.contactData);
    }
  });
}());
