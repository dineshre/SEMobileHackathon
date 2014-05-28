'use strict';

angular.module('configModule', [])

    .constant('APPCONFIG', {
        'APIENDPOINT': 'APIENDPOINT',
        'APPKEY':'APPKEY',
        'APPSECRET':'APPSECRET',
        'USERNAME':'USERNAME',
        'USERPASSWORD':'USERPASSWORD'
    });