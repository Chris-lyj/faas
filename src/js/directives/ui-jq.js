
/**
 * 0.1.1
 * General-purpose jQuery wrapper. Simply pass the plugin name as the expression.
 *
 * It is possible to specify a default set of parameters for each jQuery plugin.
 * Under the jq key, namespace each plugin by that which will be passed to ui-jq.
 * Unfortunately, at this time you can only pre-define the first parameter.
 * @example { jq : { datepicker : { showOn:'click' } } }
 *
 * @param ui-jq {string} The $elm.[pluginName]() to call.
 * @param [ui-options] {mixed} Expression to be evaluated and passed as options to the function
 *     Multiple parameters can be separated by commas
 * @param [ui-refresh] {expression} Watch expression and refire plugin on changes
 *
 * @example <input ui-jq="datepicker" ui-options="{showOn:'click'},secondParameter,thirdParameter" ui-refresh="iChange">
 */
angular.module('app').value('uiJqConfig', {}).directive('uiJq', ['uiJqConfig', '$timeout', function uiJqInjectingFunction(uiJqConfig, $timeout) {
    return {
        restrict: 'A',
        compile: function uiJqCompilingFunction(tElm, tAttrs) {
            if (!angular.isFunction(tElm[tAttrs.uiJq])) {
                throw new Error('ui-jq: The "' + tAttrs.uiJq + '" function does not exist');
            }
            var options = uiJqConfig && uiJqConfig[tAttrs.uiJq];

            return function uiJqLinkingFunction(scope, elm, attrs) {
                function getOptions() {
                    var linkOptions = [];

                    // If ui-options are passed, merge (or override) them onto global defaults and pass to the jQuery method
                    if (attrs.uiOptions) {
                        linkOptions = scope.$eval('[' + attrs.uiOptions + ']');
                        if (angular.isObject(options) && angular.isObject(linkOptions[0])) {
                            linkOptions[0] = angular.extend({}, options, linkOptions[0]);
                        }
                    } else if (options) {
                        linkOptions = [options];
                    }
                    return linkOptions;
                }
                // If change compatibility is enabled, the form input's "change" event will trigger an "input" event
                if (attrs.ngModel && elm.is('select,input,textarea')) {
                    elm.bind('change', function () {
                        elm.trigger('input');
                    });
                }
                var instance;
                // Call jQuery method and pass relevant options
                function callPlugin() {
                    $timeout(function () {
                        instance = elm[attrs.uiJq].apply(elm, getOptions());
                        if(attrs.uiCallback){
                            scope[attrs.uiCallback].apply(scope,[instance,elm]);
                        }
                    }, 0, false);
                }
                function refresh() {
                    // If ui-refresh is used, re-fire the the method upon every change
                    if (attrs.uiRefresh) {
                        scope.$watch(attrs.uiRefresh, function (newValue, oldValue) {
                            if (newValue == oldValue) return;
                            callPlugin();
                        },true);
                    }
                }
                if(attrs.uiRefresh){
                    refresh();
                }else{
                    callPlugin()
                }
                scope.$on("$destroy", function() {
                    if(attrs.uiDestroy){
                        instance[attrs.uiDestroy].apply(instance);
                    }
                })
            };
        }
    };
}]);
