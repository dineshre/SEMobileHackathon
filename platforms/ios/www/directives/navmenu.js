angular.module('navmenu', []);

angular.module('navmenu')
    .directive('senav', function($compile) {
        'use strict';
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="pushy drawer drawer-left"></div>',
            link: function(scope, elem, attrs) {

                if(angular.isDefined(attrs.menuitemlist) && attrs.menuitemlist) {

                    var  menuItems = scope.$eval(attrs.menuitemlist);

                //add header
                    if(menuItems.containers) {
                        if (menuItems.containers[0].header === true) {
                            elem.append(
                                    '<div class="drawer-header">' +
                                    '<i class="app-icon se-icon-information"></i>' +
                                    '<div class="app-name">Kitchen Sink</div>' +
                                    '</div>'
                            );
                        }
                    }

                //add search
                    if(menuItems.containers) {
                        if (menuItems.containers[0].search === true) {
                            elem.append(
                                    '<div class="drawer-search">' +
                                    '<input type="text" class="form-control" placeholder="Search">' +
                                    '<i class="search-icon"></i>' +
                                    '</div>'
                            );
                        }
                    }

                //add menu items
                    if(menuItems.itemlisting) {
                        var obj = '';
                        var icons = '';
                        var tmp = '<ul class="drawer-list-group">';
                        var activeFunction = '';

                        for (var i = 0; i < menuItems.itemlisting.length; i++) {
                            obj = menuItems.itemlisting[i];

                            if (obj.hasicon === true) {
                                icons = '<i class="' + obj.icon + '"></i>'
                            } else icons = '';
                            activeFunction = "pushyActive: isCurrentPath('" + obj.url + "')";

                            tmp += '<li class="list-group-item" ng-class="{ ' + activeFunction + ' }">' +
                                '<a snap-close ng-href="#' + obj.url + '" ng-click="next()" class="next"  >' +
                                icons + obj.title + '</a></li>'
                        }
                        tmp += '</ul>';
                        elem.append(tmp);

                        var pp = angular.element(elem);
                        $compile(pp)(scope);
                    }

                //add footer
                    if(menuItems.containers) {
                        if (menuItems.containers[0].footer === true) {
                            elem.append(
                                    '<div class="drawer-bottom">' +
                                    '<div class="bottom-btn">' +
                                    '<i class="se-icon se-icon-circle-help"></i>Help' +
                                    '</div>' +
                                    '<div class="bottom-btn" snap-close ng-click="showAboutScreen()">' +
                                    '<i class="se-icon se-icon-information"></i>About' +
                                    '</div>' +
                                    '</div>'
                            );
                            var cF = angular.element(elem);
                            $compile(cF)(scope);
                        }
                    }
                //end adding to menu
                }
            }
        };
    });