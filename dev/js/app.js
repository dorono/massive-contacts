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

    $urlRouterProvider.otherwise('/');

    $stateProvider.
      state('home', {
        url: '/',
        templateUrl: 'partials/list.html',
        resolve: {
          contactData: function (ContactsFactory) {
            console.log('from the app');
            console.log(ContactsFactory.listContacts());
            return ContactsFactory.listContacts();
          }

          /*ContactsFactory: 'ContactsFactory',
          contactData: function (ContactsFactory) {
            console.log('from the app');
            console.log(ContactsFactory.listContacts());
            return ContactsFactory.listContacts();
          }*/
        },
        controller: 'ContactsCtrl'
      })
      .state('addContact', {
        url: '/addContact',
        templateUrl: 'partials/add-contact.html',
        controller: 'ContactsCtrl'
      });
  });


})();
