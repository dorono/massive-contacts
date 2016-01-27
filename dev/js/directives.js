(function () {
  'use strict';

  var drctv = angular.module('ContactsApp.directives', ['ui.router']);

  drctv.directive('formBehavior', function ($state) {
    return {
      link: function (scope, element) {
        element.bind ('submit', function () {
          scope.contactData = null;
          $state.go('home');
        });
      }
    }
  });

}());
