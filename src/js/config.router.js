/**
 * Config for the router
 */
angular.module('app')
    .run(
        ['$rootScope', '$state', '$stateParams',
            function ($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]
    )
    .config(
        ['$stateProvider', '$urlRouterProvider', 'MODULE_CONFIG', '$locationProvider',
            function ($stateProvider, $urlRouterProvider, MODULE_CONFIG, $locationProvider) {
                $urlRouterProvider.when('', 'app');
                $urlRouterProvider.otherwise('/404');
                $stateProvider
                .state('app', {
                    url: '/app',
                    templateUrl:
                    //@release app/app.html//
                        'app/app.html'
                    //endRelease
                }).state('404', {
                url: '/404',
                templateUrl:
                //@release app/common/404.html//
                    'app/common/404.html'
                    //endRelease
                }).state('app.common', {}).state('app.common.icons', {
                    url: '/common/icons',
                    templateUrl:
                    //@release app/common/icons.html//
                        'app/common/icons.html'
                    //endRelease
                }).state('app.common.other', {
                    url: '/common/other',
                    templateUrl:
                    //@release app/common/other.html//
                        'app/common/other.html'
                    //endRelease
                    ,
                    resolve: load(['fixedHeader'])
                }).state('app.common.input', {
                    url: '/common/input',
                    templateUrl:
                    //@release app/common/input.html//
                        'app/common/input.html'
                    //endRelease
                    ,
                    resolve: load(['bootstrap','select',
                        //@release app/common/input.js//
                        'app/common/input.js'
                        //endRelease
                    ])
                }).state('app.common.button', {
                    url: '/common/button',
                    templateUrl:
                    //@release app/common/buttons.html//
                        'app/common/buttons.html'
                    //endRelease
                }).state('app.common.grid', {
                    url: '/common/grid',
                    templateUrl:
                    //@release app/common/grid.html//
                        'app/common/grid.html'
                    //endRelease
                }).state('app.common.color', {
                    url: '/common/color',
                    templateUrl:
                    //@release app/common/color.html//
                        'app/common/color.html'
                    //endRelease
                }).state('app.common.toaster', {
                    url: '/common/toaster',
                    templateUrl:
                    //@release app/common/toaster.html//
                        'app/common/toaster.html'
                    //endRelease
                    ,
                    resolve: load(['bootstrap','notification', 'sweetalert',
                        //@release app/common/toaster.js//
                        'app/common/toaster.js'
                        //endRelease
                    ])
                }).state('app.common.imagecrop', {
                    url: '/common/imagecrop',
                    templateUrl:
                    //@release app/common/imagecrop.html//
                        'app/common/imagecrop.html'
                    //endRelease
                    ,
                    resolve: load(['ngImgCrop',
                        //@release app/common/imgcrop.js//
                        'app/common/imgcrop.js'
                        //endRelease
                    ])
                }).state('app.common.image', {
                    url: '/common/image',
                    templateUrl:
                    //@release app/common/image.html//
                        'app/common/image.html'
                    //endRelease
                    ,
                    resolve: load(['viewerjs'])
                }).state('app.common.sortable', {
                    url: '/common/sortable',
                    templateUrl:
                    //@release app/common/sortable.html//
                        'app/common/sortable.html'
                    //endRelease
                    ,
                    resolve: load(['sortable', 'nestable'])
                }).state('app.common.tree', {
                    url: '/common/tree',
                    templateUrl:
                    //@release app/common/tree.html//
                        'app/common/tree.html'
                    //endRelease
                    ,
                    resolve: load([
                        //@release app/common/tree.js//
                        'app/common/tree.js'
                        //endRelease
                        , 'angularBootstrapNavTree'])
                }).state('app.common.fileupload', {
                    url: '/common/fileupload',
                    templateUrl:
                    //@release app/common/fileupload.html//
                        'app/common/fileupload.html'
                    //endRelease
                    ,
                    resolve: load(['angularFileUpload',
                        //@release app/common/fileupload.js//
                        'app/common/fileupload.js'
                        //endRelease
                    ])
                }).state('app.common.component', {
                    url: '/common/bootstrap',
                    templateUrl:
                    //@release app/common/bootstrap.html//
                        'app/common/bootstrap.html'
                    //endRelease
                    ,
                    resolve: load(['bootstrap',
                        //@release app/common/bootstrap.js//
                        'app/common/bootstrap.js'
                        //endRelease
                    ])
                }).state('app.demo', {}).state('app.demo.onlyOffice', {
                    url: '/demo/onlyOffice',
                    templateUrl:
                    //@release app/demo/onlyOffice.html//
                        'app/demo/onlyOffice.html'
                    //endRelease
                    ,
                    resolve: load(['bootstrap','onlyOffice', 'angularBootstrapNavTree',
                        //@release app/demo/onlyOfficeCtrl.js//
                        'app/demo/onlyOfficeCtrl.js'
                        //endRelease
                    ])
                }).state('app.demo.grants', {
                    url: '/demo/grants',
                    templateUrl: 'app/demo/grants.html',
                    resolve: load(['bootstrap','gantts',
                        //@release app/demo/grantsCtrl.js//
                        'app/demo/grantsCtrl.js'
                        //endRelease
                    ])
                }).state('app.demo.calendar', {
                    url: '/demo/calendar',
                    templateUrl:
                    //@release app/demo/calendar.html//
                        'app/demo/calendar.html'
                    //endRelease
                    ,
                    resolve: load(['moment', 'calendar',
                        //@release app/demo/calendarCtrl.js//
                        'app/demo/calendarCtrl.js'
                        //endRelease
                    ])
                }).state('app.common.datatable', {
                    url: '/common/datatable',

                    templateUrl:
                    //@release app/common/table.html//
                        'app/common/table.html'
                    //endRelease
                    ,
                    resolve: load(['bootstrap',
                        //@release app/common/table.js//
                        'app/common/table.js'
                        //endRelease
                    ])
                }).state('app.common.datatable1', {
                    url: '/common/datatable1',
                    templateUrl:
                    //@release app/common/table1.html//
                        'app/common/table1.html'
                    //endRelease
                    ,
                    resolve: load(['bootstrap','fixedHeader',
                        //@release app/common/table1.js//
                        'app/common/table1.js'
                        //endRelease
                    ])
                }).state('app.dataCenter', {
                    url: '/common/dataCenter',
                    templateUrl:
                    //@release app/dataCenter/dataCenter.html//
                        'app/dataCenter/dataCenter.html'
                    //endRelease
                    ,
                    resolve: load(['bootstrap',
                        //@release app/dataCenter/dataCenterCtrl.js//
                        'app/dataCenter/dataCenterCtrl.js'
                        //endRelease
                    ])
                });

                function load(srcs, callback) {
                    return {
                        deps: ['$ocLazyLoad', '$q',
                            function ($ocLazyLoad, $q) {
                                var deferred = $q.defer();
                                var promise = false;
                                srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                                if (!promise) {
                                    promise = deferred.promise;
                                }
                                angular.forEach(srcs, function (src) {
                                    promise = promise.then(function () {
                                        var name;
                                        angular.forEach(MODULE_CONFIG, function (module) {
                                            if (module.name == src) {
                                                name = module.name;
                                            } else {
                                                name = src;
                                            }
                                        });
                                        return $ocLazyLoad.load(name);
                                    });
                                });
                                deferred.resolve();
                                return callback ? promise.then(function () {
                                    return callback();
                                }) : promise;
                            }]
                    }
                }


            }
        ]
    );
