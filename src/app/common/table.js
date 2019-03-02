app.controller('tableCtrl', ['$scope', '$timeout','$http', function ($scope, $timeout,$http) {
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

    // $scope.searchShowFuc = function(){
    //     $scope.searchShow = !$scope.searchShow;
    //     if($scope.searchShow)
    //         $scope.fixedHeight = 110;
    //     else
    //         $scope.fixedHeight = 64;
    // };
    // $scope.fixedHeight = 110;
    $scope.searchShow = true;
    $scope.orderBy = [];

    $scope.search = function () {
        $scope.load =true;
        $("table").loading({message: "<img src='./img/loading.gif'>", zIndex: 999});
        $http({
            url: 'data/datatable.json'
        }).then(function successCallback(response) {
            // 请求成功执行代码
            $scope.datas = response.data;
            $timeout(function () {
                $scope.load =false;
                $("table").loading('stop');
            },2000)
        }, function errorCallback(response) {
            // 请求失败执行代码
        });
    };

    // $scope.loadData = function () {
    //     $http({
    //         url: 'data/datatable.json'
    //     }).then(function successCallback(response) {
    //         // 请求成功执行代码
    //         angular.forEach(response.data, function (data) {
    //             $scope.datas.push(data);
    //         })
    //     }, function errorCallback(response) {
    //         // 请求失败执行代码
    //     });
    // };

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

    // $scope.$on('scroll',function (event,data) {
    //     var clone = $("table.clone");
    //     if(data>$scope.fixedHeight){
    //         clone.addClass("table-header-fixed-body");
    //     }else{
    //         clone.removeClass("table-header-fixed-body");
    //     }
    // });

    $scope.check = function (data) {
        if(data.selected==undefined||!data.selected){
            data.selected = true;
        }else{
            data.selected = false;
        }
    }
}]);