/* ********** MainCtrl *************** */
App.controller('MainCtrl', function($scope, $location, $rootScope) {

    //options for left drawer menu.  keep right menu disabled, sdk has not styled it yet.
    $scope.snapOpts = {
        disable: 'right',touchToDrag:false
    };

    $rootScope.login = function(){
        $rootScope.showLogin = false;
        $scope.snapOpts = {
            touchToDrag:true
        };
    }

    $rootScope.showAboutScreen = function(){
        $rootScope.showAbout = true;
    }

    $rootScope.closeAboutScreen = function(){
        $rootScope.showAbout = false;
    }

    $rootScope.showForgotPass = function(){
        $rootScope.showForgotPassword = true;
    }

    $rootScope.closeForgotPassword = function(){
        $rootScope.showForgotPassword = false;
    }

    $rootScope.showChangePass = function(){
        $rootScope.showChangePassword = true;
    }

    $rootScope.closeChangePassword = function(){
        $rootScope.showChangePassword = false;
    }

    $scope.$on('$routeChangeSuccess', update);
    function update(){
        $rootScope.showPopin = false;
        $rootScope.showDialog = false;
    }

});


/* *********** NavigationCtrl ************** */
App.controller('NavigationCtrl', ['$scope', '$location', function ($scope, $location) {

    //function used inside senav directive.  checks for the current url to set an ACTIVE class on menu item
    $scope.isCurrentPath = function (path) {
        return $location.path() == path;
    };


    $scope.menuItems = {
        "itemlisting":[
            {"url": "/headers", "hasicon": true, "icon": "se-icon se-icon-information", "title": "Headers"},
            {"url": "/lists", "hasicon": true, "icon": "se-icon se-icon-information", "title": "Lists"},
            {"url": "/cards", "hasicon": true, "icon": "se-icon se-icon-information", "title": "Content Cards"},
            {"url": "/tabs", "hasicon": true, "icon": "se-icon se-icon-information", "title": "Tabs"},
            {"url": "/dialog", "hasicon": true, "icon": "se-icon se-icon-information", "title": "Dialog"},
            {"url": "/popin", "hasicon": true, "icon": "se-icon se-icon-information", "title": "Popin"},
            {"url": "/forms", "hasicon": true, "icon": "se-icon se-icon-information", "title": "Forms"}
        ],
        "containers":[
            {"header": true, "search": true, "footer": true}
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
                $scope.pageTitle = 'HEADERS';
                $scope.showBack = false;
                break;
            case '/lists':
                $scope.pageTitle = 'Lists';
                $scope.showBack = true;
                break;
            case '/cards':
                $scope.pageTitle = 'CONTENT CARDS';
                $scope.showBack = true;
                break;
            case '/tabs':
                $scope.pageTitle = 'TABS';
                $scope.showBack = true;
                break;
            case '/dialog':
                $scope.pageTitle = 'DIALOG';
                $scope.showBack = true;
                break;
            case '/popin':
                $scope.pageTitle = 'POPIN';
                $scope.showBack = true;
                break;
            case '/forms':
                $scope.pageTitle = 'FORMS';
                $scope.showBack = true;
                break;
            default:
                $scope.pageTitle = '';
                $scope.showBack = false;
        }
    }

}]);



/* ********** tabsController *************** */
App.controller('tabsController', function($scope) {
    $scope.tabs = 'tab4';

    $scope.switchTabs = function(tab){
        $scope.tabs = tab;
    }

    $scope.isActiveTab = function (tab) {
        return $scope.tabs == tab;
    };
});

/* ********** dialogController *************** */
App.controller('dialogController', function($rootScope) {
    $rootScope.showDialog = false;


    $rootScope.dialogToggle = function(){
        $rootScope.showDialog = (($rootScope.showDialog!=false) ? false : true);

    }
});

/* ********** popinController *************** */
App.controller('popinController', function($rootScope) {
    $rootScope.showPopin = false;

    $rootScope.popinToggle = function(){
        $rootScope.showPopin = (($rootScope.showPopin!=false) ? false : true);

    }
});

/* ********** formsController *************** */
App.controller('formsController', function($scope) {

    $scope.cb1 = false;
    $scope.cb2 = true;

    $scope.setButton = function(cb) {
        if(cb == 'cb1'){
            $scope.cb1 = (($scope.cb1!=false) ? false : true);
        }

        if(cb == 'cb2'){
            $scope.cb2 = (($scope.cb2!=false) ? false : true);
        }

    }

});