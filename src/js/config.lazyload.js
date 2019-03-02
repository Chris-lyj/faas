// lazyload config
angular.module('app')
    .constant('MODULE_CONFIG', [
        {
            name: 'screenfull',
            files: [
                //@release libs/screenfull/screenfull.js//
                'libs/screenfull/screenfull.js'
                //endRelease
            ]
        }, {
            name: 'sortable',
            files: [
                //@release libs/html5sortable/jquery.sortable.js//
                'libs/html5sortable/jquery.sortable.js'
                //endRelease
            ]
        }, {
            name: 'bootstrap',
            files: [
                //@release libs/angular-bootstrap/ui-bootstrap-tpls.js//
                'libs/angular-bootstrap/ui-bootstrap-tpls.js'
                //endRelease
            ]
        }, {
            name: 'notification',
            serie: true,
            files: [
                //@release libs/angular-ui-notification/angular-ui-notification.css//
                'libs/angular-ui-notification/angular-ui-notification.css'
                //endRelease
                ,
                //@release libs/angular-ui-notification/angular-ui-notification.js//
                'libs/angular-ui-notification/angular-ui-notification.js'
                //endRelease
                ,
                //@release libs/angular-ui-notification/config.notification.js//
                'libs/angular-ui-notification/config.notification.js'
                //endRelease
            ]
        }, {
            name: 'sweetalert',
            serie: true,
            files: [
                //@release libs/sweetalert/sweetalert.css//
                'libs/sweetalert/sweetalert.css'
                //endRelease
                ,
                //@release libs/sweetalert/sweetalert.min.js//
                'libs/sweetalert/sweetalert.min.js'
                //endRelease
                ,
                //@release libs/ngSweetAlert/SweetAlert.js//
                'libs/ngSweetAlert/SweetAlert.js'
                //endRelease
            ]
        }, {
            name: 'nestable',
            files: [
                //@release libs/nestable/jquery.nestable.js//
                'libs/nestable/jquery.nestable.js'
                //endRelease
            ]
        }, {
            name: 'fixedHeader',
            files: [
                //@release libs/angular-fixed-table-header/fixed-table-header.js//
                'libs/angular-fixed-table-header/fixed-table-header.js'
                //endRelease
            ]
        }, {
            name: 'select',
            files: [
                //@release libs/angular-ui-select/select.css//
                'libs/angular-ui-select/select.css'
                //endRelease
                ,
                //@release libs/angular-ui-select/select.js//
                'libs/angular-ui-select/select.js'
                //endRelease
            ]
        }, {
            name: 'viewerjs',
            files: [
                //@release libs/viewerjs/viewer.css//
                'libs/viewerjs/viewer.css'
                //endRelease
                ,
                //@release libs/viewerjs/viewer.js//
                'libs/viewerjs/viewer.js'
                //endRelease
            ]
        }, {
            name: 'onlyOffice',
            files: [
                'http://192.168.81.139:9000/web-apps/apps/api/documents/api.js'
            ]
        }, {
            name: 'angularBootstrapNavTree',
            files: [
                //@release libs/angular-bootstrap-nav-tree/abn_tree.css//
                'libs/angular-bootstrap-nav-tree/abn_tree.css'
                //endRelease
                ,
                //@release libs/angular-bootstrap-nav-tree/abn_tree_directive.js//
                'libs/angular-bootstrap-nav-tree/abn_tree_directive.js'
                //endRelease
            ]
        }, {
            name: 'echarts',
            files: [
                //@release libs/echarts/echarts.js//
                'libs/echarts/echarts.js'
                //endRelease
            ]
        }, {
            name: 'gantts',
            serie: true,
            files: [
                'js/ganttv6/dhtmlxgantt.js',
                'js/ganttv6/dhtmlxgantt.css',
                // 'js/ganttv6/ext/dhtmlxgantt_undo.js',
                // 'js/ganttv6/locale/locale_cn.js'
            ]
        }, {
            name: 'calendar',
            serie: true,
            files: [
                //@release libs/fullcalendar/fullcalendar.css//
                'libs/fullcalendar/fullcalendar.css'
                //endRelease
                ,
                //@release libs/fullcalendar/fullcalendar.js//
                'libs/fullcalendar/fullcalendar.js'
                //endRelease
                ,
                //@release libs/angular-ui-calendar/calendar.js//
                'libs/angular-ui-calendar/calendar.js'
                //endRelease
            ]
        }, {
            name: 'moment',
            files: [
                //@release libs/moment/moment.js//
                'libs/moment/moment.js'
                //endRelease
            ]
        }, {
            name: 'ngImgCrop',
            files: [
                //@release libs/ng-img-crop/ng-img-crop.css//
                'libs/ng-img-crop/ng-img-crop.css'
                //endRelease
                ,
                //@release libs/ng-img-crop/ng-img-crop.js//
                'libs/ng-img-crop/ng-img-crop.js'
                //endRelease
            ]
        }, {
            name: 'angularFileUpload',
            files: [
                //@release libs/angular-file-upload/angular-file-upload.min.js//
                'libs/angular-file-upload/angular-file-upload.min.js'
                //endRelease
            ]
        }, {
            name: 'gojs',
            files: [
                //@release libs/gojs/go.js//
                'libs/gojs/go.js'
                //endRelease
            ]
        }
    ])
    // oclazyload config
    .config(['$ocLazyLoadProvider', 'MODULE_CONFIG', function ($ocLazyLoadProvider, MODULE_CONFIG) {
        // We configure ocLazyLoad to use the lib script.js as the async loader
        $ocLazyLoadProvider.config({
            debug: false,
            events: true,
            modules: MODULE_CONFIG
        });
    }])
;
