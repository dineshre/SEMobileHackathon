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
                        var myItems = [ {title: 'Connection', msg: 'Initiated!'}];
                        deferred.resolve(myItems);
                    });
                }else {

                    var myItems = [ {title: 'Connection', msg: 'Initiated!'}];
                    deferred.resolve(myItems);
                }

            }, function(error) {
                var myError = [ {title: 'ERROR', msg: 'Invalid app key/app secret'} ];
                deferred.reject(myError);
            });

            return deferred.promise;
        },

        logIn: function (username,password) {

            var deferred = $q.defer();

            if ((username) && (password)) {

                var userLogin = Kinvey.User.login(username, password, {
                    success: function (response) {
                        var user = Kinvey.getActiveUser();
                        deferred.resolve('Successful Login! Logged in as ' + user.username);

                    },
                    error: function (response) {
                        deferred.reject('Invalid Username/Password!');
                    }
                });

            }else{
                deferred.reject('Username/Password Required!');
            }

            return deferred.promise;
        },

        fetchData: function (collection,query) {

            var deferred = $q.defer();

            var promise = Kinvey.DataStore.find(collection, query, {
                success: function (response) {
                    deferred.resolve(response);

                },
                error: function (err) {
                    deferred.reject('Query failed!');
                }
            });

            return deferred.promise;
        },

        saveData: function (collection,data) {

            var deferred = $q.defer();

            var promise = Kinvey.DataStore.save(collection, data, {
                success: function(response) {
                    deferred.resolve('Save Successful!');
                },
                error: function (response) {
                    deferred.reject('Saving Failed!');
                }
            });

            return deferred.promise;
        },

        logOut: function () {

            var deferred = $q.defer();

            var user = Kinvey.getActiveUser();
            if(null !== user) {
                var logout = Kinvey.User.logout({ force: true });
                logout.then(function(){
                    deferred.resolve('Logged Out!');
                });
            }else {
                deferred.reject('Error Logging Out!');
            }



            return deferred.promise;
        }
    };
});