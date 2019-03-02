angular.module('app')
    .directive('uiButterbar', ['$rootScope', '$anchorScroll', '$transitions', '$localStorage', '$state', '$timeout', function ($rootScope, $anchorScroll, $transitions, $localStorage, $state, $timeout) {
        return {
            restrict: 'AC',
            template: '',
            link: function (scope, el, attrs) {
                var historySet = function(name,param,title,scrollTop){
                    var history = $localStorage.history;
                    if(!history||history.length==0){
                        $localStorage.history = [{
                            name:name,
                            param:param,
                            title:title,
                            scrollTop:scrollTop
                        }];
                        return;
                    }
                    var hisTemp = [];
                    angular.forEach(history,function (his) {
                        if(his.name != name||!angular.equals(his.param,param)) {
                            hisTemp.push(his)
                        }
                    });
                    hisTemp.push({
                        name:name,
                        param:param,
                        title:title,
                        scrollTop:scrollTop
                    });
                    var len = hisTemp.length;
                    if(len>100){
                        hisTemp.splice(0,1)
                    }
                    $localStorage.history = hisTemp;
                    scope.app.historys = angular.copy(hisTemp).reverse();
                };
                var hisScorllTopSet = function(name,param,scrollTop){
                    var history = $localStorage.history;
                    if(history&&history.length>0){
                        angular.forEach(history,function (his) {
                            if(his.name == name&&angular.equals(his.param,param)) {
                                his.scrollTop = scrollTop;
                                $localStorage.history = history;
                                return;
                            }
                        })
                    }
                };
                var historyGet = function(name,param){
                    var history = $localStorage.history;
                    if(history&&history.length>0){
                        for(var i=0;i<history.length;i++){
                            if(history[i].name == name&&angular.equals(history[i].param,param)) {
                                return history[i];
                            }
                        }
                    }
                };
                $transitions.onStart({}, function (trans) {
                    el.removeClass('hide').addClass('active');
                    hisScorllTopSet($state.current.name,$state.params,scope.app.clientScrollTop);
                });
                $transitions.onSuccess({}, function (trans) {
                    $anchorScroll();
                    scope.$watch('$viewContentLoaded', function (event) {
                        el.addClass('hide').removeClass('active');
                        var his = historyGet($state.current.name,$state.params);
                        if(his){
                            $timeout(function () {
                                $(window).scrollTop(his.scrollTop);
                            });
                        }
                        historySet($state.current.name,$state.params,scope.app.title);
                        scope.app.menuSet($state.current.name);
                    })
                });

                scope.$watch('$viewContentLoaded', function (event) {
                    var his = historyGet($state.current.name,$state.params);
                    if(his){
                        $timeout(function () {
                            $(window).scrollTop(his.scrollTop);
                        });
                    }
                    historySet($state.current.name,$state.params,scope.app.title);
                    scope.app.menuSet($state.current.name);
                    $(window).on('beforeunload unload', function() {
                        var history = $localStorage.history;
                        var his;
                        if(history&&history.length>0){
                            for(var i=0;i<history.length;i++){
                                if(history[i].name == $state.current.name&&angular.equals(history[i].param,$state.params)) {
                                    his = history[i];
                                    break;
                                }
                            }
                        }
                        his.scrollTop = scope.app.clientScrollTop;
                        window.localStorage.setItem("ngStorage-history",JSON.stringify(history));
                    });
                });

            }
        };
    }]);