'use strict';
 
//Setting up route
angular.module('mean.bucketList').config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
    // states for my app
    $stateProvider
      .state('all bucket list', {
        url: '/bucketList',
        templateUrl: 'public/bucketList/views/list.html'
      });
      .state('add bucket list', {
        url: '/addBucketList',
        templateUrl: 'public/bucketList/views/create.html'
      })
  }
]);

