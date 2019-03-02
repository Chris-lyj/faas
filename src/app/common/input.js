app.controller('inputCtrl', ['$scope', 'uibDateParser', function ($scope,uibDateParser) {
    $scope.selectData = [
        "操作1", "操作2", "操作3", "操作4", "操作5", "操作6"
    ];

    $scope.altInputFormats = ['M!/d!/yyyy'];
    $scope.hstep = 1;
    $scope.mstep = 15;
    $scope.totalItems = 64;
    $scope.currentPage = 4;
    $scope.date = {
        opened: false
    };
    $scope.date1 = {
        opened: false
    };
    $scope.date2 = {
        opened: false
    };
    $scope.date3 = {
        opened: false
    };
    $scope.model = {};
    $scope.openDate = function () {
        $scope.date.opened = !$scope.date.opened;
    };
    $scope.openDate1 = function () {
        $scope.date1.opened = !$scope.date1.opened;
    };
    $scope.find = function (search) {
        if(search&&search!="") {
            $.ajax({
                url: 'data/datatable.json',
                async: false,
                success: function (datas) {
                    $scope.datas = (datas);
                    $scope.searchText = "未能找到匹配的数据";
                }
            });
        }
    }

    $scope.check = function (form) {
        debugger
    }

}]);