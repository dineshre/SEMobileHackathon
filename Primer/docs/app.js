'use strict';

function loadTheApp() {


    // Boot AngularJS
    try {
        angular.bootstrap($('body'), ['docs']);
    } catch (e) {
        console.log("Angular didn't load " + e);
    }

}

$( document ).ready(function() {


loadTheApp();

});

var App = angular.module('docs', [ 'ngRoute', 'ngAnimate', 'snap', 'navmenu'  ]);

App.config(function ($routeProvider){
	$routeProvider
        .when('/', {
            templateUrl:'home.html'
        })
        .when('/windows', {
            templateUrl:'windows.html'
        })
        .when('/mac', {
            templateUrl:'mac.html'
        })
        .when('/tips', {
            templateUrl:'tips.html'
        })
        .when('/ui', {
            templateUrl:'ui.html',
            controller:'uiCtrl'
        })
        .when('/icons', {
            templateUrl:'icons.html',
            controller:'iconsCtrl'
        })
	.otherwise({
		redirectTo:'/'
	})

});


App.run(function($rootScope, $window) {

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