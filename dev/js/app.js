/* https://scotch.io/tutorials/submitting-ajax-forms-the-angularjs-way */
(function () {
  'use strict';
  angular.module('ContactsApp', [
    'backand',
    'ui.router',
    'ContactsApp.controllers',
    'ContactsApp.services',
    'ContactsApp.directives'
  ])
  .config(function (BackandProvider, $stateProvider, $urlRouterProvider) {
    BackandProvider
    .setAppName('contacts')
    .setAnonymousToken('099b9441-ceda-4585-9a04-3b1bd760fe49');

    $stateProvider.
      state('home', {
        url: '/',
        templateUrl: 'partials/list.html'
      })
      .state('addContact', {
        url: '/addContact',
        templateUrl: 'partials/add-contact.html',
        controller: 'ContactsCtrl'
      });
  });


})();
