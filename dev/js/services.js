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
