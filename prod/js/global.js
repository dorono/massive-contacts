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
            //console.log(ContactsFactory.listContacts());
            return ContactsFactory.listContacts();
          }
        },
        controller: 'ContactsCtrl'
      })
      .state('addContact', {
        url: '/addContact',
        templateUrl: 'partials/add-contact.html',
        controller: 'AddContactCtrl'
      });
    })
    .run([
      '$rootScope',
      '$state',
      function ($rootScope, $state) {
        $rootScope.$state = $state;
      }
    ]);
})();

(function () {
  'use strict';

  var drctv = angular.module('ContactsApp.directives', ['ui.router']);

  drctv.directive('formBehavior', function ($state) {
    return {
      link: function (scope, element) {
        element.bind('submit', function () {
          scope.contactData = null;
          $state.go('home');
        });
      }
    }
  });

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

(function () {
  'use strict';

  var services = angular.module('ContactsApp.services', []);
  services.factory('ContactsFactory', ['$http', 'Backand', function ($http, Backand) {
    function getApiUrl (objectName, Backand) {
      return Backand.getApiUrl() + '/1/objects/' + objectName;
    }

    var contactsObj = 'items';

    function sortData (data, sortBy) {
      var arrToSort = [];

      angular.forEach(data, function (v, k) {
        angular.forEach(v, function (val, key) {
          arrToSort.push(val);
        });
      });

      arrToSort.sort(function (a, b) {
        return a[sortBy].localeCompare(b[sortBy]);
      });

      return arrToSort;
    }

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
      listContacts: function (sortBy) {
        var sortedItem = sortBy || 'last_name';

        return $http({
          method: 'GET',
          url: Backand.getApiUrl() + '/1/objects/items',
          params: {
            pageSize: 100,
            pageNumber: 1,
            filter: null,
            sort: ''
          }
        }).then(function (response) {
          return sortData(response.data, sortedItem);
        });
      }
    };
  }]);
}());
