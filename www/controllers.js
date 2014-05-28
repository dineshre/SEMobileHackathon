/* ********** page1Controller *************** */
App.controller('page1Controller', function($scope, deviceInfo, kinveyServices, APPCONFIG) {

    $scope.myItems = deviceInfo.myinfo().itemlisting;

    var kinveyInit = kinveyServices.init(APPCONFIG.APIENDPOINT,APPCONFIG.APPKEY,APPCONFIG.APPSECRET);
    kinveyInit.then(
        function (success) {
            $scope.myKinveyInit = success;

            var ping = kinveyServices.ping();
            ping.then(
                function (success2) {
                    $scope.myKinveyPing = success2;

                },
                function (error2) {
                    $scope.myKinveyPing = error2;
                });

        },
        function (error) {
            $scope.myKinveyInit = error;
        });

});

