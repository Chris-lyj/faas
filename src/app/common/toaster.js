app.controller('toasterCtrl', ['$scope', 'SweetAlert', '$uibModal', 'Notification', '$timeout', function ($scope, SweetAlert, $uibModal, Notification, $timeout) {
    $scope.tip = {
        title: "演示标题",
        text: "演示内容",
        type: "success"
    };

    $scope.size = "md";

    $scope.no = {
        type: "primary"
    };

    $scope.pop = function () {
        SweetAlert.swal($scope.tip);
    };

    $scope.close = function(){
    };


    $scope.notify = function () {
        // var handle = Notification.primary({
        //     title: $scope.tip.title,
        //     message: $scope.tip.text+'<br/><button class="btn btn-default btn-xs m-b-xs pull-right" ng-click="close()">回复</button>',
        //     type: $scope.no.type,
        //     scope:$scope
        // });
        Notification({type: $scope.no.type, templateUrl: "custom_template.html", scope: $scope});
    };

    var parent = $scope;
    $scope.open = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            appendTo: $(".app-content-body"),
            templateUrl: 'modal.html',
            controller: function ($scope) {
                $scope.title = parent.tip.title;
                $scope.text = parent.tip.text;
                $scope.ok = function () {
                    $scope.$close("close");
                };
                $scope.cancel = function () {
                    $scope.$close("close");
                }
            },
            size: $scope.size
        });
        modalInstance.result.then(function (selectedItem) {
        }, function (reaseon) {
        });
    }
}]);