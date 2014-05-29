'use strict';

var App = angular.module('helloKinvey', [ 'ngRoute', 'deviceModule', 'kinveyModule', 'configModule' ]);


function loadTheApp() {

    // Initiate FastClick - removes the touch screen click delay on mobile web pages
    FastClick.attach(document.body);

    //prevent scrolling on body so app doesnt slide off of screen
    //  document.body.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);

    // Boot AngularJS
    try {
        angular.bootstrap($('body'), ['KitchenSink']);
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
            templateUrl:'views/headers.html'
        })
        .when('/lists', {
            templateUrl:'views/lists.html'
        })
        .when('/cards', {
            templateUrl:'views/cards.html'
        })
        .when('/tabs', {
            templateUrl:'views/tabs.html',
            controller: 'tabsController'
        })
        .when('/dialog', {
            templateUrl:'views/dialog.html',
            controller: 'dialogController'
        })
        .when('/popin', {
            templateUrl:'index.html',
            controller: 'popinController'
        })
        .when('/forms', {
            templateUrl:'views/forms.html',
            controller: 'formsController'
        })
        .otherwise({
            redirectTo:'/'
        })

});


App.run(function($rootScope, $window) {

    $rootScope.showLogin = true;
    $rootScope.showPopin = false;
    $rootScope.showDialog = false;
    $rootScope.showAbout = false;
    $rootScope.showForgotPassword = false;
    $rootScope.showChangePassword = false;
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

