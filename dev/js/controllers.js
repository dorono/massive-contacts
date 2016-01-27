(function () {
  'use strict';
  var ctrl = angular.module('ContactsApp.controllers', []);

  ctrl.controller('ContactsCtrl', function ($scope, ContactsFactory, contactData) {
    console.log('data in the controller');
    console.log(contactData.data);
    $scope.contactData = contactData.data;
    $scope.index = 0;


    $scope.processForm = function () {
      console.log($scope.contactData);
      ContactsFactory.submitContact($scope.contactData);
    }

  });

}());
