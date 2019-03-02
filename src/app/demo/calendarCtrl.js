app.controller('calendarCtrl', ['$scope','$rootScope','$http', function ($scope,$rootScope,$http) {
    $scope.uiConfig = {
        calendar:{
            height: 'auto',
            editable: true,
            contentHeight:400,
            header:{
                left: 'month basicWeek basicDay',
                center: 'title',
                right: 'today prev,next'
            },
            dayClick:function (date, jsEvent, view) {
                // alert('Clicked on: ' + date.format());
                // alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
                // alert('Current view: ' + view.name);
                // change the day's background color just for fun
                $(this).css('background-color', 'red');
            }
        }
    };
    $scope.eventSources = [];
    $scope.alertEventOnClick = function () {
        alert()
    }
}]);