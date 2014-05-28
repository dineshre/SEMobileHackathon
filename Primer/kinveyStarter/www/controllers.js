/* ********** MainCtrl *************** */
App.controller('MainCtrl', function($scope, $location, kinveyServices, APPCONFIG, $rootScope) {

    $scope.kinveySet = false;

    $scope.snapOpts = {
        disable: 'right',touchToDrag:false
    };

      ActivityIndicator.show('Initializing...');

    var promise = kinveyServices.init(APPCONFIG.APIENDPOINT, APPCONFIG.APPKEY,APPCONFIG.APPSECRET);
    promise.then(
        function(response){
                  ActivityIndicator.hide();
        });

    $scope.logMeOut = function () {
        var userLogout = kinveyServices.logOut();
        userLogout.then(
            function (success) {
                     ActivityIndicator.hide();
                window.plugins.toast.showShortBottom(success);
                $rootScope.showLogin = true;
                $scope.snapOpts = {
                    disable: 'right',touchToDrag:false
                };
            },
            function (error) {
                   ActivityIndicator.hide();
                window.plugins.toast.showShortBottom(error);
            });
    };


    $rootScope.login = function(){
        ActivityIndicator.show('Loggin In...');
        if (($scope.username) && ($scope.password)) {
            var userLogin = kinveyServices.logIn($scope.username, $scope.password);
            userLogin.then(
                function (success) {
                         ActivityIndicator.hide();
                    window.plugins.toast.showShortBottom(success);
                    $rootScope.showLogin = false;
                    $scope.snapOpts = {
                        touchToDrag: true
                    };

                    $scope.kinveySet = true;
                    window.location = '#/';
                },
                function (error) {
                       ActivityIndicator.hide();
                    window.plugins.toast.showShortBottom(error);
                    $scope.username = '';
                    $scope.password = '';
                });
        }else{
            ActivityIndicator.hide();
            window.plugins.toast.showShortBottom('Username/Password Required!');
        }

    }

});


/* *********** NavigationCtrl ************** */
App.controller('NavigationCtrl', ['$scope', '$location', function ($scope, $location) {

    $scope.isCurrentPath = function (path) {
        return $location.path() == path;
    };


    $scope.menuItems = {
        "itemlisting":[
            {"url": "/", "hasicon": true, "icon": "se-icon se-icon-information", "title": "READ DATA"},
            {"url": "/masterDetailQuery", "hasicon": true, "icon": "se-icon se-icon-information", "title": "MASTER DETAIL QUERY"},
            {"url": "/nestedDataQuery", "hasicon": true, "icon": "se-icon se-icon-information", "title": "NESTED DATA QUERY"},
            {"url": "/writeData", "hasicon": true, "icon": "se-icon se-icon-information", "title": "WRITE DATA"}
        ],
        "containers":[
            {"header": true, "search": true, "footer": false}
        ]
    };

}]);

/* *********** SecondaryNavigationCtrl ************** */
App.controller('SecondaryNavigationCtrl', ['$scope', '$location', function ($scope, $location) {

    $scope.pageTitle = '';
    $scope.showBack = false;

    $scope.$on('$routeChangeSuccess', update);
    function update() {
        switch ($location.path()) {
            case '/':
                $scope.pageTitle = 'READ DATA';
                $scope.showBack = false;
                break;
            case '/masterDetailQuery':
                $scope.pageTitle = 'MASTER DETAIL QUERY';
                $scope.showBack = true;
                break;
            case '/nestedDataQuery':
                $scope.pageTitle = 'NESTED DATA QUERY';
                $scope.showBack = true;
                break;
            case '/writeData':
                $scope.pageTitle = 'WRITE DATA';
                $scope.showBack = true;
                break;
            default:
                $scope.pageTitle = '';
                $scope.showBack = false;
        }
    }

}]);

/* ********** readDataController *************** */
App.controller('readDataController', function($scope, kinveyServices) {

    $scope.myItems = [];

    $scope.$watch("kinveySet", function(value) {

        if(value === true){

                ActivityIndicator.show('Loading Data...');


            var query = new Kinvey.Query();
            query.descending('alarmDt');

            //pass your collection name and query.  NOTE* if no query, pass null
            var promise = kinveyServices.fetchData('qrScans',query);
            promise.then(
                function(response){
                        $scope.myItems = response;
                        ActivityIndicator.hide();

                },
                function(error){
                       ActivityIndicator.hide();
                    window.plugins.toast.showShortBottom(error);

                });

        }

    });

});

/* ********** masterDetailQueryController *************** */
App.controller('masterDetailQueryController', function($scope, kinveyServices) {

    $scope.myAlarmTitle = '';
    $scope.myAlarmLocation = '';
    $scope.masterDetailQuery = [];


    $scope.$watch("kinveySet", function(value) {

        if (value === true) {
               ActivityIndicator.show('Loading Master Data...');

            /* start query to pull header data */
            var queryHdr = new Kinvey.Query();
            queryHdr.equalTo('alarmDescr', 'HVAC Console');

            //pass your collection name and query.  NOTE* if no query, pass null
            var hdrQuery = kinveyServices.fetchData('alarmMaster', queryHdr);
            hdrQuery.then(
                function (response) {
                    $scope.myAlarmTitle = response[0].alarmDescr;
                    $scope.myAlarmLocation = response[0].location;
                         ActivityIndicator.hide();
                      ActivityIndicator.show('Loading Detail Data...');
                    /* start query to pull detail data - passes the equipId field as a parameter to pull detail */
                    var queryDtl = new Kinvey.Query();
                    queryDtl.descending('alarmDt').equalTo('equipID', response[0].equipId);

                    //pass your collection name and query.  NOTE* if no query, pass null
                    var dtlQuery = kinveyServices.fetchData('qrScans', queryDtl);
                    dtlQuery.then(
                        function (response) {
                            $scope.masterDetailQuery = response;
                                 ActivityIndicator.hide();

                        },
                        function (error) {
                               ActivityIndicator.hide();
                              window.plugins.toast.showShortBottom(error);

                        });

                },
                function (error) {
                       ActivityIndicator.hide();
                      window.plugins.toast.showShortBottom(error);

                });

        }
    });

});


/* ********** nestedDataQueryController *************** */
App.controller('nestedDataQueryController', function($scope, kinveyServices) {

    $scope.nestedDataQuery = [];

    $scope.$watch("kinveySet", function(value) {

        if (value === true) {
               ActivityIndicator.show('Loading Nested Data...');

            /* start query to pull nested data */
            var queryHdr = new Kinvey.Query();
            queryHdr.equalTo('roles', 'View');

            //pass your collection name and query.  NOTE* if no query, pass null
            var hdrQuery = kinveyServices.fetchData('nestedData', queryHdr);
            hdrQuery.then(
                function (response) {
                    $scope.nestedDataQuery = response;
                         ActivityIndicator.hide();

                },
                function (error) {
                       ActivityIndicator.hide();
                      window.plugins.toast.showShortBottom(error);

                });

        }
    });
});

/* ********** writeDataController *************** */
App.controller('writeDataController', function($scope, kinveyServices) {

    $scope.saveForm = function(){
    ActivityIndicator.show('Saving Form Data...');

        var equipID = 1;
        var dttm = '';
        if( $scope.alarmDescr && $scope.alarmType && $scope.alarmDt && $scope.alarmTime && $scope.alarmMsg   ){

            if($scope.alarmDescr == 'HVAC Console'){
                equipID = 2;
            }

            dttm = moment($scope.alarmDt).format('YYYY-MM-DD') + ' ' + moment($scope.alarmTime).format('HH:mm');

        var mySaveData = {
                equipID : equipID,
                alarmDescr : $scope.alarmDescr,
                alarmType : $scope.alarmType,
                alarmDt : dttm,
                alarmMsg : $scope.alarmMsg
            }

            var promise = kinveyServices.saveData('qrScans',mySaveData);
            promise.then(
                function(response){
                        ActivityIndicator.hide();
                    window.plugins.toast.showShortBottom(response);
                    window.location = '#/';
                },
                function(error){
                       ActivityIndicator.hide();
                    window.plugins.toast.showShortBottom(error);

                });

        }else{
            ActivityIndicator.hide();
            window.plugins.toast.showShortBottom('All fields are required!');
        }

    }

});