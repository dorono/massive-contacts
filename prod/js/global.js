/* https://scotch.io/tutorials/submitting-ajax-forms-the-angularjs-way */
(function () {
  'use strict';
  angular.module('ContactsApp', ['backand', 'ContactsApp.controllers', 'ContactsApp.services'])
    .config(function (BackandProvider) {

      BackandProvider.setAppName('contacts').setAnonymousToken('099b9441-ceda-4585-9a04-3b1bd760fe49')
    });

})();

(function () {
  'use strict';
  var ctrl = angular.module('ContactsApp.controllers', []);

  ctrl.controller('ContactsCtrl', function ($scope, ContactsFactory) {
    $scope.contactData = {};

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
      }
    };
  }]);
}());
