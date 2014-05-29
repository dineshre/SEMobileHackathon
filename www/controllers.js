/* ********** page1Controller *************** */
App.controller('page1Controller', function($scope, deviceInfo, kinveyServices, APPCONFIG, $http) {

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
        }).then(function() {


            //logging in for security

            var promise = Kinvey.User.login('ajit', 'schneider');
            promise.then(function() {


                //$http({method: 'GET', url: 'AlarmBacklog.json'}).
                Kinvey.DataStore.find('AlarmBacklog', null, {
                    success: function (data, status, headers, config) {
                        // this callback will be called asynchronously
                        // when the response is available
                        // angular.forEach(data, function(value, key) {
                        /*      console.log(key + ':' + value )

                         });*/

                        //for(var i=0;i < data.length;i++)
                        //{
                        console.log(JSON.stringify(data, null,2));
                        //}
                        var alarmsList = JSON.stringify(data, null,2);
                        var myChart = new FusionCharts("Bubble", "myChartId", "100%", "100%", "0", "1");
                        myChart.setTransparent(true);
                        myChart.setJSONData(alarmsList);
                        myChart.render("chartContainer");
                    },
                    error: function (data, status, headers, config) {

                        console.log("The error is here. ")
                        console.log("Data is : ", data)

                        // or server returns response with an error status.
                    }
                });
            }, function(error) {
                console.log("LOGIN ERROR", error);
            });
        });
});

