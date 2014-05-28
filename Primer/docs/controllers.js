/* ********** MainCtrl *************** */
App.controller('MainCtrl', function($scope) {


});


/* *********** NavigationCtrl ************** */
App.controller('NavigationCtrl', ['$scope', '$location','$rootScope', function ($scope, $location, $rootScope) {

    $rootScope.showMenu = false;
    $rootScope.snapOpts = {disable: 'right',touchToDrag:false};

    $scope.isCurrentPath = function (path) {
        return $location.path() == path;
    };


    $scope.$on('$routeChangeSuccess', update);
    function update() {
        switch ($location.path()) {
            case '/ui':
                $rootScope.showMenu = true;
                $rootScope.snapOpts = {touchToDrag:true};
                break;
            default:
                $rootScope.showMenu = false;
                $rootScope.snapOpts = {touchToDrag:false};
        }
    }

    $scope.menuItems = {
        "itemlisting":[
            {"url": "/ui", "hasicon": true, "icon": "se-icon se-icon-information", "title": "SCHNEIDER UI"},
            {"url": "/ui", "hasicon": true, "icon": "se-icon se-icon-information", "title": "FAKE LINK"}
        ],
        "containers":[
            {"header": true, "search": true, "footer": true}
        ]
    };


}]);

/* *********** iconsCtrl ************** */
App.controller('iconsCtrl', ['$scope', function ($scope) {

    $('.picto li').each(function() {
        var item = $(this).find('span');
        var code = item.attr('class');
        $(this).append('<span class="glyphicon-class">' + code + '</span>');
    });

}]);

/* *********** uiCtrl ************** */
App.controller('uiCtrl', ['$scope', function ($scope) {



}]);