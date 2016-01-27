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

(function () {
  'use strict';

  var services = angular.module('ContactsApp.services', []);
  services.factory('ContactsFactory', ['$http', 'Backand', function ($http, Backand) {
    function getApiUrl (objectName, Backand) {
      return Backand.getApiUrl() + '/1/objects/' + objectName;
    }

    var contactsObj = 'items';

    return {
      submitContact: function (object) {
        $http({
          method: 'POST',
          url: getApiUrl(contactsObj, Backand),
          data: object
        })
        .then(function (data) {
          console.log(data);
          console.log('it worked!');
        }, function (data) {
            console.log('it failed :(');
        });
      },
      listContacts: function ($q) {
        return $http({
          method: 'GET',
          url: Backand.getApiUrl() + '/1/objects/items',
          params: {
            pageSize: 20,
            pageNumber: 1,
            filter: null,
            sort: ''
          }
        }).then(function (response) {
          console.log('here is the response');
          console.log(response.data);
          return response.data;
        });

      }
    };
  }]);
}());
