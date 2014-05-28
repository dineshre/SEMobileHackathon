'use strict';

var App = angular.module('KinveyStarter', [ 'ngRoute', 'ngAnimate', 'kinveyModule', 'configModule', 'snap', 'navmenu' ]);


function loadTheApp() {

    // Initiate FastClick
    FastClick.attach(document.body);

    // Boot AngularJS
    try {
        angular.bootstrap($('body'), ['KinveyStarter']);
    } catch (e) {
        console.log("Angular didn't load " + e);
    }

    setTimeout(function () {
        // Hide splash screen if any
        if (navigator && navigator.splashscreen) {
            navigator.splashscreen.hide();
        }
    },1000);


    if (device.platform === 'android' || device.platform === 'Android') {
        document.addEventListener("backbutton", function (e) {
            e.preventDefault();
        }, false);
    }

}

// Listen to device ready
angular.element(document).ready(function() {
    if (window.cordova) {
        document.addEventListener('deviceready', loadTheApp, false);
    } else {
        loadTheApp();
    }
});

App.config(function ($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl:'views/readData.html',
            controller: 'readDataController'
	})
        .when('/masterDetailQuery', {
            templateUrl:'views/masterDetailQuery.html',
            controller: 'masterDetailQueryController'
        })
        .when('/nestedDataQuery', {
            templateUrl:'views/nestedDataQuery.html',
            controller: 'nestedDataQueryController'
        })
    .when('/writeData', {
            templateUrl:'views/writeData.html',
            controller: 'writeDataController'
    })
	.otherwise({
		redirectTo:'/'
	})

});


App.run(function($rootScope, $window) {

    $rootScope.showLogin = true;
    $rootScope.slide = '';

    $rootScope.$on('$routeChangeStart', function() {

        //event button to move backward
        $rootScope.back = function() {
            $rootScope.slide = 'slide-right';
            $window.history.back();

        };
        //event button item list to move forward
        $rootScope.next = function() {
            $rootScope.slide = 'slide-left';
        }
    });

});