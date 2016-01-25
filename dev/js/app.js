/* https://scotch.io/tutorials/submitting-ajax-forms-the-angularjs-way */
(function () {
  'use strict';
  angular.module('ContactsApp', ['backand', 'ContactsApp.controllers', 'ContactsApp.services'])
    .config(function (BackandProvider) {

      BackandProvider.setAppName('contacts').setAnonymousToken('099b9441-ceda-4585-9a04-3b1bd760fe49')
    });

})();
