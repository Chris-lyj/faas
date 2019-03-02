angular.module('app')
    .controller('appCtrl', ['$scope', '$translate', '$localStorage', '$window', '$state', '$http', '$timeout', 'tmhDynamicLocale', '$anchorScroll', 'mainAPI', 'menuAPI',
        function ($scope, $translate, $localStorage, $window, $state, $http, $timeout, tmhDynamicLocale, $anchorScroll, mainAPI, menuAPI) {
            // // add 'ie' classes to html
            var isIE = !!navigator.userAgent.match(/MSIE/i);
            if (isIE) {
                angular.element($window.document.body).addClass('ie');
            }

            // function isSmartDevice($window) {
                // Adapted from http://www.detectmobilebrowsers.com
                // var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
                // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
                // return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
            // }

            // if (isSmartDevice($window)) {
            //     angular.element($window.document.body).addClass('smart')
            // }

            // config
            $scope.app = {
                title: '@@TITLE',
                description: '@@DESCRIPTION',
                keywords: '@@KEYWORDS',
                version: '@@VERSION',
                color: {
                    primary: '#00ACC1',
                    info: '#03a9f4',
                    success: '#4caf50',
                    warning: '#ffeb3b',
                    danger: '#f44336',
                    light: '#f5f5f5',
                    dark: '#595959'
                },
                settings: {
                    themeID: "1",
                    navbarHeaderColor: 'bg-primary',
                    navbarCollapseColor: 'bg-white',
                    asideColor: 'bg-primary',
                    headerFixed: true,
                    asideFixed: true,
                    asideFolded: false
                }
            };
            //title
            $scope.app.title = "主页";
            $scope.app.setTitle = function (title) {
                $scope.app.title = title;
            };
            //menu
            $scope.app.menuSet = function (currentLink) {
                var menuName = "";
                angular.forEach($scope.app.menus, function (menu) {
                    if (menu.link === currentLink) {
                        menuName = menu.name;
                        menu.linked = true;
                    } else {
                        menu.linked = undefined;
                        menu.actived = undefined;
                        if (menu.list && menu.list.length > 0) {
                            angular.forEach(menu.list, function (menu1) {
                                if (menu1.link === currentLink) {
                                    menuName = menu1.name;
                                    menu1.linked = true;
                                    menu.actived = true;
                                } else {
                                    menu1.linked = undefined;
                                    menu1.actived = undefined;
                                    if (menu1.list && menu1.list.length > 0) {
                                        angular.forEach(menu1.list, function (menu2) {
                                            if (menu2.link === currentLink) {
                                                menuName = menu2.name;
                                                menu2.linked = true;
                                                menu1.actived = true;
                                                menu.actived = true;
                                            } else {
                                                menu2.linked = undefined;
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    }
                });
                return menuName;
            };
            $scope.app.menuToggle = function () {
                $scope.app.settings.asideFolded = !$scope.app.settings.asideFolded;
                if (!$scope.app.settings.asideFolded) {
                    $timeout(function () {
                        var linked = $(".aside-wrap .navi-wrap .nav .linked");
                        var parent = linked.parents("li[ui-sref-active]");
                        parent.each(function () {
                            $(this).addClass("active");
                        })
                    });
                } else {
                    $timeout(function () {
                        var active = $(".aside-wrap .nav .active");
                        active.each(function () {
                            $(this).removeClass("active");
                        });
                        var linked = $(".aside-wrap .navi-wrap .nav .linked");
                        var parent = linked.parents("li[ui-sref-active]");
                        parent.each(function () {
                            $(this).addClass("active");
                        })
                    })
                }
            };
            //get the height & width
            var changeWindowSize = function () {
                $scope.app.clientHeight = $(window).height() - 50;
                if ($scope.app.settings.asideFolded) {
                    $scope.app.clientWidth = $(window).width() - 50;
                } else {
                    $scope.app.clientWidth = $(window).width() - 200;
                }
            };
            $(window).resize(function() {
                changeWindowSize();
                $timeout(function () {
                    $scope.$apply()
                });
            });
            // save settings to local storage
            if (angular.isDefined($localStorage.settings)) {
                $scope.app.settings = $localStorage.settings;
            } else {
                $localStorage.settings = $scope.app.settings;
            }
            $scope.$watch('app.settings', function () {
                // if ($scope.app.settings.asideFixed) {
                //     $scope.app.settings.headerFixed = true;
                // }
                // save to local storage
                $localStorage.settings = $scope.app.settings;
                changeWindowSize();
                $timeout(function () {
                    $scope.$apply()
                });
            }, true);
            // angular translate
            $scope.app.baseLang = navigator.language.toLowerCase();
            $scope.app.lang = {isOpen: false};
            $scope.app.langs = {'en': 'English', 'zh-cn': '中文简体'};
            var language = $localStorage.lang;
            $scope.app.selectedLang = $scope.app.langs[language] || $scope.app.langs[$scope.app.baseLang];
            $scope.app.baseLang = language ? language : $scope.app.baseLang;
            $translate.use($scope.app.baseLang);
            tmhDynamicLocale.set($scope.app.baseLang);
            $scope.app.setLang = function (langKey) {
                // set the current lang
                $scope.app.selectedLang = $scope.app.langs[langKey];
                // You can change the language during runtime
                $translate.use(langKey);
                tmhDynamicLocale.set(langKey);
                $localStorage.lang = langKey;
                $scope.app.lang.isOpen = !$scope.app.lang.isOpen;
            };

            //load menu
            $scope.app.menus = menuAPI;

            //load authority
            $http({
                method: 'GET',
                url: mainAPI.authority
            }).then(function successCallback(response) {
                $scope.app.authority = new Set(response.data);
            }, function errorCallback(response) {
            });

            $scope.app.authorized = function (name) {
                if (!name || name === "") {
                    return true;
                } else {
                    if ($scope.app.authority.has("admin")) {
                        return true
                    } else return $scope.app.authority.has(name);
                }
            };

            //the function search load
            $scope.$watch('app.searchSelected',function(newVal,oldVal) {
                if(!newVal){
                    $scope.app.menuSearchs = [];
                    return;
                }
                // debugger
                var menu2Search = function (menu,result) {
                    angular.forEach(menu,function (data) {
                        if(data.list!=undefined&&data.list.length>0){
                            menu2Search(data.list,result);
                        }
                        if(data.link!=undefined&&data.link!=""){
                            result.push({
                                name:data.name,
                                link:data.link,
                                pingyin:data.pingyin
                            })
                        }
                    });
                };
                var result = [];
                $scope.app.menuSearchs = [];
                menu2Search($scope.app.menus,result);
                angular.forEach(result,function (data) {
                    if((data.name!=undefined&&data.name!=""&&data.name.indexOf(newVal)!=-1)||(data.pingyin!=undefined&&data.pingyin!=""&&data.pingyin.indexOf(newVal)!=-1)){
                        $scope.app.menuSearchs.push(data);
                    }
                });
            });
            $scope.app.searchClearText = function(){
                $scope.app.searchSelected=undefined;
                $timeout(function () {
                    $("#appSearch").focus();
                });
            };
            //history
            $scope.app.history = {isopen: false};
            $scope.app.historys = $localStorage.history;
            $scope.app.toHistory = function (his) {
                if (his.name === 'app') {
                    $scope.app.title = "主页";
                }
                $state.go(his.name, his.param);
            };

            //page loading
            $scope.app.openLoading = function () {
                $("body").loading({message: "<img src='./img/loading.gif'>", zIndex: 999});
            };
            $scope.app.closeLoading = function () {
                $("body").loading('stop')
            };

            //get the scroll
            $scope.app.clientScrollTop = $(window).scrollTop();
            $(window).scroll(function () {
                $scope.app.clientScrollTop = $(window).scrollTop();
                $scope.$broadcast('scroll', $scope.app.clientScrollTop);
            });

            //date format
            $scope.app.formatDate = function (time) {
                var date = new Date(time);
                var year = date.getFullYear(),
                    month = date.getMonth() + 1,//月份是从0开始的
                    day = date.getDate();
                return year + '-' +
                    month + '-' +
                    day;
            };

            //to top
            $scope.app.toTop = function(){
                $anchorScroll();
            };

            //img load
            document.addEventListener("error", function (e) {
                var elem = e.target;
                if (elem.tagName.toLowerCase() == 'img') {
                    elem.src = "data:image/jpeg;base64,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";
                }
            }, true);
        }]);
