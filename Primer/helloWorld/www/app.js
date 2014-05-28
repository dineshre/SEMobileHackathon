'use strict';

var App = angular.module('helloKinvey', [ 'ngRoute', 'deviceModule', 'kinveyModule', 'configModule' ]);


function loadTheApp() {

    // Initiate FastClick
    FastClick.attach(document.body);

    // Boot AngularJS
    try {
        angular.bootstrap($('body'), ['helloKinvey']);
    } catch (e) {
        console.log("Angular didn't load " + e);
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
            templateUrl:'views/page1.html',
            controller: 'page1Controller'
        })
	.otherwise({
		redirectTo:'/'
	})

});

