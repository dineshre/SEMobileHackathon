var deviceModule = angular.module('deviceModule', []);

deviceModule.factory('deviceInfo', function(){
    'use strict';
    return {
        myinfo: function () {
        try{
            var myItems = {  "itemlisting": [
                { title: 'Cordova Version', msg: device.cordova},
                {title: 'Model', msg: device.model},
                {title: 'Platform', msg: device.platform},
                {title: 'UUID', msg: device.uuid},
                {title: 'SDK Version', msg: device.version}
            ]};
        }catch(e){
            var myItems = {  "itemlisting": [
                { title: 'ERROR', msg: 'Device plugin not loaded!'}
            ]};
        }
            return myItems;
        }
    };
});