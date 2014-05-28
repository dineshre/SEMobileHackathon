var kinveyModule = angular.module('kinveyModule', []);

kinveyModule.factory('kinveyServices', function($q){
    'use strict';

    return {
        init: function (apiEndpoint,appKey,appSecret) {

            var deferred = $q.defer();

            Kinvey.API_ENDPOINT = apiEndpoint;

            var promise = Kinvey.init({
                appKey: appKey,
                appSecret: appSecret
            });

            promise.then(function () {

                var user = Kinvey.getActiveUser();
                if(null !== user) {
                    var logout = Kinvey.User.logout({ force: true });
                    logout.then(function(){
                        var myItems = [ {title: 'App Init', msg: 'App Key Set!'}];
                        deferred.resolve(myItems);
                    });
                }else {

                    var myItems = [ {title: 'App Init', msg: 'App Key Set!'}];
                    deferred.resolve(myItems);
                }

            }, function(error) {
                var myError = [ {title: 'ERROR', msg: 'Invalid app key/app secret'} ];
                deferred.reject(myError);
            });

            return deferred.promise;
        },

        ping: function () {

            var deferred = $q.defer();

            var promise = Kinvey.ping();
            promise.then(function(response) {
                deferred.resolve('Kinvey Ping Success: Kinvey Service is alive, version: ' + response.version + ', response: ' + response.kinvey);
            }, function(error) {
                deferred.reject('Kinvey Ping Failed. Response: ' + error.description);
            });


            return deferred.promise;
        }
    };
});