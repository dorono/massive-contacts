(function () {
  'use strict';
  var ctrl = angular.module('ContactsApp.controllers', []);

  ctrl.controller('ContactsCtrl', function ($scope, ContactsFactory) {
    $scope.contactData = {};

    $scope.processForm = function () {
      console.log($scope.contactData);
      ContactsFactory.submitContact($scope.contactData);
    }

  });

}());
