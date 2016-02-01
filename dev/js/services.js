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
