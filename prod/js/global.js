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

(function () {
  'use strict';

  var services = angular.module('ContactsApp.services', []);
  services.factory('ContactsFactory', ['$http', 'Backand', '$q', '$state', function ($http, Backand, $q, $state) {
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
          $state.go('home');
        }, function (data) {
            console.log('it failed :(');
        });
      },
      listContacts: function (sortBy) {
        var sortedItem = sortBy || 'first_name';
        var deferred = $q.defer();

        $http({
          method: 'GET',
          url: Backand.getApiUrl() + '/1/objects/items',
          params: {
            pageSize: 100,
            pageNumber: 1,
            filter: null,
            sort: ''
          }
        }).then(function (response) {
          window.data = response;
          deferred.resolve(response);
          return sortData(response.data, sortedItem);
        });

        return deferred.promise;
      }
    };
  }]);
}());
