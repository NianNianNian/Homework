'use strict';

angular.module('mean.bucketList').factory('BucketList', ['$resource', function($resource) {
    return $resource('bucketList');
    }
]);
