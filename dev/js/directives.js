(function () {
  'use strict';

  var drctv = angular.module('ContactsApp.directives', ['ui.router']);

  drctv.directive('preventDupe', function () {
    return {
      link: function (scope, element) {
        element.bind('blur', function () {
          console.log('deduped!');
        });
      }
    }
  });
}());
