app.controller('tableCtrl1', ['$scope', '$timeout','$http', function ($scope, $timeout,$http) {
    // $scope.selectData = [
    //     "操作1", "操作2", "操作3", "操作4", "操作5", "操作6"
    // ];
    //统一同步调用，加载完才展现页面
    $.ajax({
        url: 'data/datatable.json',
        async: false,
        success: function (datas) {
            $scope.datas = datas;
        }
    });
    $scope.maxSize = 5;
    $scope.bigTotalItems = 175;
    $scope.bigCurrentPage = 1;

    $scope.searchShowFuc = function(){
        $scope.searchShow = !$scope.searchShow;
        if($scope.searchShow)
            $scope.fixedHeight = 111;
        else
            $scope.fixedHeight = 64;
    };
    $scope.fixedHeight = 111;
    $scope.searchShow = true;
    $scope.orderBy = [];

    $scope.search = function () {
        $scope.load =true;
        $("table").loading({message: "", zIndex: 999});
        $scope.datas = undefined;
        $http({
            url: 'data/datatable.json'
        }).then(function successCallback(response) {
            // 请求成功执行代码
            $timeout(function () {
                $("table").loading('stop');
                $scope.load =false;
                $scope.datas = response.data;
            },2000)
        }, function errorCallback(response) {
            // 请求失败执行代码
        });
    };

    $scope.loadData = function () {
        $http({
            url: 'data/datatable.json'
        }).then(function successCallback(response) {
            // 请求成功执行代码
            angular.forEach(response.data, function (data) {
                $scope.load =true;
                $timeout(function () {
                    $scope.datas.push(data);
                    $scope.load =false;
                },1000)
            })
        }, function errorCallback(response) {
            // 请求失败执行代码
        });
    };

    // $scope.clear = function(){
    //     $scope.engine = undefined;
        // $scope.app.openLoading();
        // $timeout(function () {
        //     $scope.app.closeLoading();
        // },2000);
    // };

    $scope.table = {};
    $scope.table.sort = {};
    $scope.order={};
    $scope.sort = function(arg){
        $scope.order.name = arg;
        if($scope.table.sort[arg]=="asc"){
            $scope.table.sort[arg]="desc";
            $scope.order.reserved = true
        }else if($scope.table.sort[arg]=="desc"){
            $scope.table.sort[arg]="asc";
            $scope.order.reserved = false;
        }else{
            $scope.table.sort = {};
            $scope.order.reserved = true;
            $scope.table.sort[arg]="desc";
        }
    };

    $scope.$on('scroll',function (event,data) {
        var clone = $("table.clone");
        if(data>($scope.fixedHeight + ($scope.app.settings.headerFixed?0:50))){
            clone.addClass("table-header-fixed-body");
            clone.css("top",$scope.app.settings.headerFixed?50:0);
        }else{
            clone.removeClass("table-header-fixed-body");
            clone.css("top",undefined);
        }
    });

    $scope.check = function (data) {
        if(data.selected==undefined||!data.selected){
            data.selected = true;
        }else{
            data.selected = false;
        }
    }
}]);