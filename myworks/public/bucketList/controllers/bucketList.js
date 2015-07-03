'use strict';
 
angular.module('mean.bucketList').controller('BucketListController', ['$scope', '$stateParams', '$location', 'Global',
  function($scope, $stateParams, $location, Global) {
    $scope.global = Global;

    $scope.create = function() {
      var bucketList = new BucketList({
            title: this.title,
            description: this.description
      });

      bucketList.$save(function(response) {
        $location.path('/bucketList');
      });
  }
]);
